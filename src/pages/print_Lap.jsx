// get item (token, outlet, start, end )

// headerconfig
// get transbyoutlet
// filterdate
// getamount

// componentdidmount(filterdate)

// bawah sendiri => {window.print()}

import React from "react"
import axios from "axios"
import moment from "moment"

export default class PrintLap extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            id_outlet: "",
            transactions: [],
            id_transaksi: "",
            member: "",
            id_member: "",
            cust_name: "",
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
            total: 0,
            dateDMY: moment(Date('YYYY-MM-DD')).format('LL')
        }
        if (localStorage.getItem("token")) {
            if (localStorage.getItem("role") === "Owner" || localStorage.getItem("role") === "Admin" || localStorage.getItem("role") === "Kasir") {
                this.state.token = localStorage.getItem("token")
                this.state.id_member = localStorage.getItem("member")
                this.state.id_admin = localStorage.getItem("admin_id")
                this.state.id_outlet = localStorage.getItem("outlet_id")
                this.state.start = localStorage.getItem("start")
                this.state.end = localStorage.getItem("end")

            } else {

                window.alert("Anda bukan salah satu owner outlet kami !")
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

    // gettrans = () => {
    //     let url = "http://localhost:4040/store/transaksi/transaksi/" + this.state.id_transaksi
    //     axios.get(url, this.headerConfig())
    //         .then(res => {
    //             this.setState({
    //                 transaction: res.data.transaksibyid_transaksi,
    //                 total: res.data.sumTotal

    //             })

    //         })
    //         .catch(err => {
    //             console.log(err.message)
    //         })
    // }
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

    getAdmin = () => {
        let admin = (localStorage.getItem("name"))
        let url = "http://localhost:8000/admin/tampil/" + this.state.id_admin
        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    outlet_address: res.data.admin.outlet.alamat,
                    admin_name: res.data.admin.nama,
                    outlet_name: res.data.admin.outlet.nama
                })
            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(admin)
    }

    fillterDate = () => {
        // e.preventDefault()
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
                    window.print()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    getAmount = detail => {
        let total = 0
        detail.map(it => {
            total += Number(it.subtotal)
        })
        return total
    }
    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        // this.getTransByOutlet()
        this.fillterDate()
        this.getAdmin()
        // this.gettrans()
    }
    render() {
        return (
            <div className="container">
                <h1 className="mt-5 d-flex justify-content-center ">Laundry</h1>
                <h1 className="mb-5 d-flex justify-content-center ">Laporan Transaksi Outlet {this.state.outlet_name}</h1>

                <table class="mb-4" >
                    <thead >
                        <tr>
                            <td>Nama Owner</td>
                            <td>: </td>
                            <td> {this.state.admin_name}</td>
                        </tr>
                        <tr>
                            <td>Nama Outlet</td>
                            <td>: </td>
                            <td> {this.state.outlet_name}</td>
                        </tr>
                        <tr>
                            <td>Alamat Outlet</td>
                            <td>: </td>
                            <td> {this.state.outlet_address}</td>
                        </tr>
                       
                    </thead>

                </table>
                <div class="table-responsive mt-5 mb-5">
                    Tanggal {localStorage.getItem("start")} - {localStorage.getItem("end")}

                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">ID</th>
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
                                            <ol>
                                                {item.detail_transaksi.map((item, index) => (
                                                    <li>{item.paket.price}</li>
                                                ))}
                                            </ol>
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
                <table className="mb-5" width="100%">
                    <tr>
                        <td></td>
                        <td width="200px">
                            <p>Malang , {this.state.dateDMY} <br /> Kasir,</p>


                            <p>__________________________</p>
                        </td>
                    </tr>
                </table>
            </div>

        )
    }
} 