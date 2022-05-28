import React from "react"
import Navbar from "../component/navbar"
import Sidebar from "../component/sideBar"
import Footer from "../component/footer"
import axios from "axios"

export default class Cart extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            cart: [],
            id_member: "",
            transactions: [],
            id_transaksi: "",
            member: [],
            total: 0
        }
        if (localStorage.getItem("token")) {
            if( localStorage.getItem("role") === "Kasir" || localStorage.getItem("role") === "Admin"){
                this.state.token = localStorage.getItem("token")
                this.state.id_member = localStorage.getItem("customer")

              }else {
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
    getMember = () => {
        let url = "http://localhost:8000/member/tampil/" + this.state.id_member
        axios.get(url)
            .then(res => {
                this.setState({
                    member : res.data.member
                    // custCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        // console.log(this.state.custCount)
    }
    initCart = () => {
        // memanggil data cart pada localStorage
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        // if (localStorage.getItem("customer") !== null) {
        //     let customer = JSON.parse(localStorage.getItem("customer"))
        //     this.setState({
        //         id_member: customer.id_member,
        //         customer_name: customer.name
        //     })
        // }

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

    editItem = selectedItem => {
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        let index = tempCart.findIndex(it => it.id_paket === selectedItem.id_paket)
        let promptJumlah = window.prompt(`Masukkan jumlah ${selectedItem.nama} dengan batas berat 1 - 5 kg`, selectedItem.qty)
        if (promptJumlah === null || promptJumlah === "" || promptJumlah === "0") {
            window.alert("Tidak boleh kosong")
        } else {
            tempCart[index].qty = promptJumlah
            tempCart[index].subtotal = selectedItem.price * promptJumlah

        }


        // update localStorage
        localStorage.setItem("cart", JSON.stringify(tempCart))

        // refersh cart
        this.initCart()
    }
    dropItem = selectedItem => {
        if (window.confirm(`Apakah anda yakin menghapus ${selectedItem.nama} dari cart?`)) {
            let tempCart = []
            if (localStorage.getItem("cart") !== null) {
                tempCart = JSON.parse(localStorage.getItem("cart"))
                //json ke string
            }

            let index = tempCart.findIndex(it => it.id_paket === selectedItem.id_paket)
            tempCart.splice(index, 1)

            // update localStorage
            localStorage.setItem("cart", JSON.stringify(tempCart))

            // refersh cart
            this.initCart()
        }
    }

    checkOut = () => {
        window.location = "/checkout"

        
            
    }



    componentDidMount() {
        this.initCart()
        this.getMember()

    }


    render() {
        return (
            <div>
                <div class="navbar-bg"></div>

                <Navbar />
                <Sidebar />
                <div className="main-content">
                    <section className="section">
                        <h1>Ini Halaman Cart</h1>
                        <div className="card col-12 mt-2">
                           
                            <div class="section-title">Cart List</div>
                            <div className="card-body">
                          
                                <h5 className="text-primary">
                                    Member: {this.state.member.nama}
                                </h5>
                                <h5 className="text-primary">
                                    Admin: {localStorage.getItem("name")}
                                </h5>

                                
                                <div class="table-responsive ">
                                    <table class="table table-sm ">
                                        <thead>
                                            <tr>
                                                <th scope="col">Paket</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Qty</th>
                                                <th scope="col">Total</th>
                                                <th scope="col">Option</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.cart.map((item, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{item.nama}</th>
                                                    <td>Rp {item.price}</td>
                                                    <td>{item.qty}</td>
                                                    <td className="text-center"> Rp {item.price * item.qty}</td>
                                                    <td>
                                                        <div class="buttons">
                                                            <a href="#" class="btn btn-icon btn-primary" data-toggle="tooltip" title="edit" onClick={() => this.editItem(item)}><i class="far fa-edit"></i></a>
                                                            <a href="#" class="btn btn-icon btn-danger" data-toggle="tooltip" title="hapus" onClick={() => this.dropItem(item)}><i class="fas fa-times"></i></a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <th colSpan="3">Total</th>
                                                <td className="text-center">Rp {this.state.total}</td>
                                                <td>
                                                    <div class="buttons">
                                                        <a href="#" class="btn btn-icon icon-left btn-success btn-block m-1" onClick={() => this.checkOut()}
                                                            disabled={this.state.cart.length === 0}><i class="fas fa-dollar-sign"></i> Checkout</a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </section>
                </div>
            </div>
        )
    }
}
