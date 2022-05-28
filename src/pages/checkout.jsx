import React from "react"
import Navbar from "../component/navbar"
import Sidebar from "../component/sideBar"
import Footer from "../component/footer"
import axios from "axios"

export default class Checkout extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            cart: [],
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
                this.state.id_member = localStorage.getItem("customer")
                this.state.id_admin = localStorage.getItem("admin_id")
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

        getAdmin = () => {
            let admin = (localStorage.getItem("name"))
            let url = "http://localhost:8000/admin/tampil/" + this.state.id_admin
            axios.get(url, this.headerConfig())
                .then(res => {
                    this.setState({
                        id_outlet: res.data.admin.id_outlet,
                        admin_name: res.data.admin.nama,
                        outlet_name: res.data.admin.outlet.nama

                        // custCount: res.data.count
                    })

                })
                .catch(err => {
                    console.log(err.message)
                })
            console.log(admin)
        }

        getMember = () => {
            let admin = (localStorage.getItem("name"))
            let url = "http://localhost:8000/member/tampil/" + this.state.id_member
            axios.get(url, this.headerConfig())
                .then(res => {
                    this.setState({
                        cust_name: res.data.member.nama
                        // custCount: res.data.count
                    })

                })
                .catch(err => {
                    console.log(err.message)
                })
            console.log(admin)
        }

        gettrans = (item) => {
            let url = "http://localhost:8000/transaksi/transaksi/" + item.id_transaksi

            axios.get(url, this.headerConfig())
    
                .then(res => {
                    this.setState({
                        isModalOpen: true,
                        detail_transaksi: item.detail_transaksi
                        // action: "update"
    
                    })
    
                })
                .catch(err => {
                    console.log(err.message)
                })
        }

        

        initCart = () => {
            // memanggil data cart pada localStorage
            let tempCart = []
            if (localStorage.getItem("cart") !== null) {
                tempCart = JSON.parse(localStorage.getItem("cart"))
            }

            // kalkulasi total harga
            let totalHarga = 0;
            tempCart.map(item => {
                totalHarga += (item.price * item.qty)
            })

            // memasukkan data cart, user, dan total harga pada state
            this.setState({
                cart: tempCart,
                total: totalHarga
            })
        }

        checkOut = (e) => {
            e.preventDefault()
            let tempCart = []
            if (localStorage.getItem("cart") !== null) {
                tempCart = JSON.parse(localStorage.getItem("cart"))
            }

            let data = {
                id_member: this.state.id_member,
                id_admin: this.state.id_admin,
                id_outlet: this.state.id_outlet,
                batas_waktu: this.state.bts_waktu,
                tgl_bayar: this.state.tgl_bayar,
                status: this.state.status,
                payment: this.state.payment,
                total: this.state.total,
                detail_transaksi: tempCart
            }

            let url = "http://localhost:8000/transaksi"

            axios.post(url, data, this.headerConfig())
                .then(response => {
                    // clear cart
                    window.alert(response.data.message)
                    localStorage.removeItem("cart")
                    localStorage.removeItem("member")
                    window.location = "/tran"
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status) {
                            window.alert(error.response.data.message)
                            // this.props.history.push("/login")
                        }
                    } else {
                        console.log(error);
                    }
                })      
    }
    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.initCart()
        this.getAdmin()
        this.getMember()
        // this.gettrans()


    }
        render() {
            return (
                <div>
                    <div class="navbar-bg"></div>

                    <Navbar />
                    <Sidebar />
                    <div className="main-content">
                        <section className="section">
                            <form className="forms-sample mt-4" onSubmit={e => this.checkOut(e)}>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Outlet</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="id_admin" className="form-control" value={this.state.outlet_name} disabled />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Admin</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="id_admin" className="form-control" value={this.state.admin_name} disabled />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Customer</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="id_member" className="form-control" value={this.state.cust_name} disabled />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Tanggal Transaksi</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="tgl" className="form-control" value={new Date().toLocaleDateString('en-CA')} disabled />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Batas Waktu Laundry</label>
                                    <div className="col-sm-9">
                                        <input type="date" name="bts_waktu" className="form-control mb-2" onChange={e => this.setState({ bts_waktu: e.target.value })} required />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Tanggal Bayar</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="tgl_bayar" className="form-control mb-2" value="-" disabled />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Status Order</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="status" className="form-control mb-2" value={this.state.status} disabled />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Status Bayar</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="dibayar" className="form-control mb-2" value={this.state.payment} disabled />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <a className="btn btn-dark mr-2" href="/cart">Back</a>
                                    <button className="btn btn-primary" type="submit">Continue</button>
                                </div>
                            </form>
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
                                            {this.state.cart.map((item, index) => (
                                                // item.detail_transaksi.map((item, index) => {
                                                    // return(
                                                <tr key={index}>
                                                    <td>{`${index + 1}`}</td>
                                                    <td>
                                                        <ol>
                                                        {item.nama}
                                                        </ol>
                                                    </td>
                                                    <td>
                                                    {/* <ul style="list-style: none;"> */}
                                                        Rp {item.price}
                                                        </td>
                                                    <td>
                                                    {/* <ul style="list-style: none;"> */}
                                                        {item.qty} kg
                                                        {/* </ul> */}
                                                        </td>
                                                    <td className="text-right">Rp {item.price * item.qty}</td>
                                                </tr>
                                                // })
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
                        </section>
                    </div>


<Footer />
                </div>

            )
        }
    }
