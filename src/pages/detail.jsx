import React from "react"
import Navbar from "../component/navbar"
import Sidebar from "../component/sideBar"
import Footer from "../component/footer"
import axios from "axios"

export default class Detail extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            transaction: [],
            detail_transaksi: [],
            id_transaksi: "",
            total: 0,
            id_member: "",
            cust_name: "",
            id_admin: "",
            admin_name: "",
            id_outlet: "",
            outlet_name: "",
            bts_waktu: "",
            tgl_bayar: null,//
            status: "Baru",//karena objek jadi pake null
            payment: "Belum bayar"
        }
        if (localStorage.getItem("token")) {
            if ( localStorage.getItem("role") === "Kasir" || localStorage.getItem("role") === "Admin") {
                this.state.token = localStorage.getItem("token")
                this.state.id_member = localStorage.getItem("member")
                this.state.id_admin = localStorage.getItem("id_admin")
                this.state.id_transaksi = localStorage.getItem("id_transaksi")
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

        getTrans = () => {
            let url = "http://localhost:8000/transaksi/transaksi/" + this.state.id_transaksi
            axios.get(url, this.headerConfig())
                .then(res => {
                    this.setState({
                        transaction: res.data.transaksibyid_transaksi,
                        total: res.data.sumTotal
                    })
                    
                    console.log(this.state.transaction)
                })
                .catch(err => {
                    console.log(err.message)
                })
        }

    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        // this.initCart()
        // this.getAdmin()
        this.getTrans()
    }
        render() {
            return (
                <div>
                    <div class="navbar-bg"></div>

                    <Navbar />
                    <Sidebar />
                    <div className="main-content">
                        <section className="section">
                            <form className="forms-sample mt-4">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Outlet</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="id_admin" className="form-control" value={this.state.transaction.map((item, index) => {
                                                    return (
                                                        item.outlet.nama
                                                    )
                                                })} disabled />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Admin</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="id_admin" className="form-control" value={this.state.transaction.map((item, index) => {
                                                    return (
                                                        item.admin.nama

                                                    )
                                                })} disabled />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Customer</label>
                                    <div className="col-sm-9">
                                    <input type="text" name="customer" className="form-control" value={this.state.transaction.map((item, index) => {
                                                    return (
                                                        item.member.nama
                                                    )
                                                })} disabled />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Tanggal Transaksi</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="tgl" className="form-control" value={this.state.transaction.map((item, index) => {
                                                    return (
                                                        item.tgl
                                                    )
                                                })} disabled />
                                    </div>
                                </div>
                                
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Batas Waktu Laundry</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="batas_waktu" className="form-control mb-2" value={this.state.transaction.map((item, index) => {
                                                    return (
                                                        item.batas_waktu
                                                    )
                                                })} disabled />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Tanggal Bayar</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="tgl_bayar" className="form-control mb-2" value={this.state.transaction.map((item, index) => {
                                                    return (
                                                        item.tgl_bayar
                                                    )
                                                })} disabled />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Status Order</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="status" className="form-control mb-2" value={this.state.transaction.map((item, index) => {
                                                    return (
                                                        item.status
                                                    )
                                                })} disabled />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Status Bayar</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="dibayar" className="form-control mb-2" value={this.state.transaction.map((item, index) => {
                                                    return (
                                                        item.payment
                                                    )
                                                })} disabled />
                                    </div>
                                </div>
                                <div class="card-body">
                                        <div class="table-responsive ">
                                            <table class="table table-bordered table-sm " id="dataTable" width="100%" cellspacing="0">
                                            <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Paket</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Qty</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.transaction.map((item, index) => (
                                                item.detail_transaksi.map((item, index) => {
                                                    return(
                                                <tr key={index}>
                                                    <td>{`${index + 1}`}</td>
                                                    <td>
                                                        <ol>
                                                        {item.paket.nama}
                                                        </ol>
                                                    </td>
                                                    <td>
                                                    {/* <ul style="list-style: none;"> */}
                                                        Rp {item.paket.price}
                                                        </td>
                                                    <td>
                                                    {/* <ul style="list-style: none;"> */}
                                                        {item.qty} kg
                                                        {/* </ul> */}
                                                        </td>
                                                    <td className="text-right">Rp {item.price * item.qty}</td>
                                                </tr>)
                                                })
                                            ))}
                                            {/* {this.state.transaction.map((item, index) => ( */}

                                            <tr>
                                                <td colSpan="4" className="text-danger text-bold">
                                                    <h5>Total</h5>
                                                </td>
                                                <td className="text-right text-danger text-bold">
                                                    <h5>
                                                        Rp {this.state.total}
                                                    </h5>
                                                </td>
                                            </tr>
                                            {/* ))} */}

                                        </tbody>
                                            </table>
                                        </div>
                                        
                                    </div>
                                <div className="d-flex justify-content-center">
                                    <a className="btn btn-dark mr-2" href="/cart">Back</a>
                                    <a className="btn btn-primary mr-2" href="/cetakTrans" target="_blank">Cetak Trans</a>
                                    {/* <button className="btn btn-primary" type="submit">Cetak Trans</button> */}
                                </div>
                            </form>
                            
                        </section>
                    </div>


<Footer />
                </div>

            )
        }
    }