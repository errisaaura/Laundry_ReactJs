import React from "react";
import Navbar from '../component/navbar';
import Sidebar from "../component/sideBar";
import Footer from "../component/footer";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
// import "../style/home.css"



export default class Outlet extends React.Component {
    constructor() {
        super()
        this.state = {
            outlets: [],
            id_outlet: "",
            nama: "",
            alamat: "",
            phone: "",
            keyword: "",
            isModalOpen: false,
            action: ""

        }
        if (localStorage.getItem("token")) {
            if (localStorage.getItem("role") === "Admin" ) {
                this.state.token = localStorage.getItem("token")
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

    handleChange = (e) => {
        this.setState({
            [e.target.nama]: e.target.value
        });
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        });
    }

    getOutlet = () => {

        let url = "http://localhost:8000/outlet/"
        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    outlets: res.data.outlet,
                    // custCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        // console.log(this.state.custCount)
    }

    addOutlet = () => {
        this.setState({
            isModalOpen: true,
            id_outlet: "",
            nama: "",
            alamat: "",
            phone: "",
            action: "insert"
        });
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            id_outlet: item.id_outlet,
            nama: item.nama,
            alamat: item.alamat,
            phone: item.phone,
            action: "update"
        })
    }


    handleSave = (e) => {
        e.preventDefault()
        // console.log("berhasil ")
        let form = {
            nama: this.state.nama,
            alamat: this.state.alamat,
            phone: this.state.phone
        }
     

        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:8000/outlet/"
            axios.post(url, form)
                .then(res => {
                    console.log(res.data.message)
                    this.getOutlet()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err.message)
                })
        } else if (this.state.action === "update") {
            url = "http://localhost:8000/outlet/" + this.state.id_outlet
            axios.put(url, form)
                .then(res => {
                    console.log(res.data.message)
                    this.getOutlet()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
        //panggil api backend
    }
    handleDel = (id_outlet) => {
        if (localStorage.getItem("role") === "Admin") {
            this.state.token = localStorage.getItem("token")
            let url = "http://localhost:8000/outlet/" + id_outlet
            if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
                axios.delete(url)
                    .then(res => {
                        console.log(res.data.message)
                        this.getOutlet()
                        // this.handleClose()
                    })
                    .catch(err => {
                        console.log(err.message)
                    })
            }
        } else {
            window.alert("Tidak bisa menghapus, Kamu bukan admin !")
        }
    }

    search = (e) => {
        let url = "http://localhost:8000/outlet/search"
        if (e.keyCode === 13) {
            let data = {
                keyword: this.state.keyword
            }
            axios.post(url, data)
                .then(res => {
                    this.setState({
                        outlets: res.data.outlet
                    })
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getOutlet()
    }

    render() {
        return (
            <div>
                <div class="navbar-bg"></div>

                <Navbar />
                <Sidebar />
                <div className="main-content">
                    <section className="section">

                        <div className="mb-5">
                            <p>Halaman Outlet</p>
                            {console.log(this.state.outlets)}
                        </div>

                        <div className="input-group d-flex justify-content-center">

                            <input type="text" className="form-control rounded-pill col-lg-7" placeholder="Search"
                                name="keyword"
                                value={this.state.keyword}
                                onChange={e => this.setState({ keyword: e.target.value })}
                                onKeyUp={e => this.search(e)} />
                            <div className="input-group-btn">
                                <button className="btn btn-primary rounded-pill"><i className="fas fa-search"></i></button>
                            </div>
                            <div class="buttons d-flex justify-content-end mx-5">
                            <a href="#" className="btn btn-icon icon-left btn-primary " onClick={() => this.addOutlet()}><i class="fas fa-plus "></i> Add Outlet</a>
                        </div>
                        </div>
                    <h6 class="mt-3 mx-5 px-5 text-danger "><small>*Masukkan keyword nama / alamat outlet</small></h6>


                        <div class="row mt-5 d-flex justify-content-center">
                            <div class="col-12 col-md-6 col-lg-10">
                                {this.state.outlets.map((item, index) => {
                                    return (
                                        <div key={index} class="card">
                                            <div class="card-header">
                                                <h4>Outlet</h4>
                                            </div>
                                            <div class="card-body">
                                                <div class="media">
                                                    <img class="mr-3" src="../assets/img/outlet.jpg" alt="Generic placeholder image" width="200" height="200" />
                                                    <div class="media-body">
                                                        <h2 class="lead mt-0"><strong>{item.nama}</strong></h2><br />
                                                        <p class="mb-0"><small>alamat : {item.alamat}</small></p>
                                                        <p class=" mb-0"><small>Phone : {item.phone}</small></p>
                                                        
                                                    </div>
                                                    <div className="buttons mt-5">
                                                        <a href="#" className="btn btn-icon icon-left btn-lg btn-primary rounded-pill" onClick={() => this.handleEdit(item)}><i className="fas fa-edit"></i>Edit</a>
                                                        <a href="#" className="btn btn-icon icon-left btn-lg btn-danger rounded-pill" onClick={() => this.handleDel(item.id_outlet)}><i className="fas fa-times"></i>Delete</a>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <Footer />
                        {/* modal */}
                        <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Form Outlet</Modal.Title>
                                </Modal.Header>
                                <Form className="bg-light bg-opocity-10" onSubmit={e => this.handleSave(e)}>
                                    <Modal.Body>
                                        {/* <Form.Group className="mb-3 text-dark bg-transparent" controlId="nip">
                                    <Form.Label >ID</Form.Label>
                                    <Form.Control className="text-dark" type="text" name="customer_id" placeholder="Masukkan ID" value={this.state.customer_id} onChange={this.handleChange} />
                                </Form.Group> */}
                                        <Form.Group className="mb-3 text-dark bg-transparent" controlId="name">
                                            <Form.Label className="text-secondary" >Outlet Name </Form.Label>
                                            <Form.Control className="text-dark bg-transparent" type="text" name="name" placeholder="Masukkan Nama Outlet" value={this.state.nama}
                                                onChange={e => this.setState({ nama: e.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="alamat">
                                            <Form.Label className="text-secondary">alamat</Form.Label>
                                            <Form.Control className="text-dark bg-transparent" type="text" name="alamat" placeholder="Masukkan alamat" value={this.state.alamat}
                                                onChange={e => this.setState({ alamat: e.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="phone">
                                            <Form.Label className="text-secondary">Phone Number</Form.Label>
                                            <Form.Control className="text-dark bg-transparent" type="text" name="phone" placeholder="Masukkan nomor telp" value={this.state.phone}
                                                onChange={e => this.setState({ phone: e.target.value })}
                                                required
                                            />
                                        </Form.Group>

                                    </Modal.Body>
                                    <Modal.Footer>

                                        <Button variant="secondary" onClick={this.handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" type="submit" onClick={this.handleClose}>
                                            Save
                                        </Button>

                                    </Modal.Footer>
                                </Form>
                            </Modal>
                    </section>
                </div>
            </div>
        )
    }
}