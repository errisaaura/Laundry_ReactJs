import React from "react"
import Navbar from "../component/navbar"
import Sidebar from "../component/sideBar"
import Footer from "../component/footer"
import axios from "axios"

export default class Laporan extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            id_outlet: "",
            transactions: [],
            id_transaksi: "",
            member: "",
            admin: "",
            outlet: "",
            tgl: "",
            bts_waktu: "",
            tgl_bayar: "",
            status: "",
            payment: "",
            detail_transaksi: [],
            isModalOpen: false,
            start: "",
            end: "",
            total: 0
        }
        if (localStorage.getItem("token")) {
            if (localStorage.getItem("role") === "Owner" || localStorage.getItem("role") === "Admin" || localStorage.getItem("role") === "Kasir") {
                this.state.token = localStorage.getItem("token")
                this.state.member_id = localStorage.getItem("member")
                this.state.id_outlet = localStorage.getItem("outlet_id")


            } else {
                window.alert("Anda bukan salah satu admin / kasir outlet kami !")
                window.location = "/home"
            }
            //pengecekan ada token apa tidak
            //token dibutuhkan setiap saat mau ngakses API, token diambil dari local storage, data login disimpan ke local storage
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }
    
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getTransByOutlet = () => {
        let admin = (localStorage.getItem("name"))
        let url = "http://localhost:8000/transaksi/" + this.state.id_outlet
        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    transactions: res.data.transaksibyOutlet_id,
                    total: res.data.sumTotal
                    // custCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(admin)
    }

    fillterDate = (e) => {
        e.preventDefault()
        if (this.state.start === "" && this.state.end === "") {
            this.getTransByOutlet()
        } else {
            let url = "http://localhost:8000/transaksi/date/" + this.state.id_outlet
            let data = {
                start: this.state.start,
                end: this.state.end
            }
            axios.post(url, data)
            .then(res => {
                this.setState({
                    transactions: res.data.transaksi,
                    total: res.data.sumTotal
                    // custCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }

    print = () => {
        localStorage.setItem("start", this.state.start)
        localStorage.setItem("end", this.state.end)
        window.open("/printLap", "_blank")
    }

    getAmount = detail => {
        let total = 0
        detail.map(it => {
            total += Number(it.subtotal)
        })
        return total
    }
    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getTransByOutlet()
    }


    render() {
        return (
            <div >
                <div class="navbar-bg"></div>

                <Navbar />
                <Sidebar />
                <div className="main-content">
                    <section className="section">
                        <h6 className="mb-3">Filter transaksi by date :</h6>
                        <form onSubmit={(e) => this.fillterDate(e)}>
                            <div className="row mb-5">
                                <div className="col-3">
                                    <div className="d-flex">
                                        <label className="mt-2">Start</label>
                                        <input type="date" name="start" className="form-control mx-3"
                                            value={this.state.start}
                                            onChange={e => this.setState({ start: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="d-flex">
                                        <label className="mt-2">End</label>
                                        <input type="date" name="end" className="form-control mx-3"
                                            value={this.state.end}
                                            onChange={e => this.setState({ end: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-primary" type="submit" >Set</button>
                                        <button className="btn btn-sm btn-primary"
                                            onClick={() => this.print()}>
                                            <span className="mx-1"></span>Cetak Laporan
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </form>
                        <div class="section-title">Responsive</div>
                        <div class="table-responsive">
                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Id Transaksi</th>
                                        <th scope="col">Admin</th>
                                        <th scope="col">member</th>
                                        <th scope="col">Tgl Transaksi</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Paket</th>
                                        <th scope="col">Harga</th>
                                        <th scope="col">Qty</th>
                                        <th scope="col">Subtotal</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.transactions.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.id_transaksi}</td>
                                                <td>{item.admin.nama}</td>
                                                <td>{item.member.nama}</td>
                                                <td>{item.tgl}</td>
                                                <td>{item.status}</td>
                                                <td>
                                                    <ol>
                                                        {item.detail_transaksi.map((item, index) => (
                                                            <li>{item.paket.nama}</li>
                                                        ))}
                                                    </ol>
                                                </td>
                                                <td>
                                                    {/* <ol> */}
                                                        {item.detail_transaksi.map((item, index) => (
                                                            <p>Rp {item.paket.price},-</p>
                                                        ))}
                                                    {/* </ol> */}
                                                </td>
                                                <td>
                                                    {/* <ol> */}
                                                        {item.detail_transaksi.map((item, index) => (
                                                            <p>{item.qty}</p>
                                                        ))}
                                                    {/* </ol> */}
                                                </td>
                                                <td>
                                                    {/* <ol> */}
                                                        {item.detail_transaksi.map((item, index) => (
                                                            <p>{item.subtotal}</p>
                                                        ))}
                                                    {/* </ol> */}
                                                </td>
                                                <td>{this.getAmount(item.detail_transaksi)}</td>

                                            </tr>
                                        )
                                    })}
                                    <tr>
                                        <td colSpan="10">Total Pendapatan</td>
                                        <td>{this.state.total}</td>


                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}
