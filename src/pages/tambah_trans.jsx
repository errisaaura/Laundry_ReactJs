import React from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import Navbar from "../component/navbar";
import Sidebar from "../component/sideBar";
import Footer from "../component/footer";


export default class TambahTrans extends React.Component {
    constructor() {
        super()
        this.state = {
            customers: [],
            options: [
                { value: "P", label: "Perempuan" },
                { value: "L", label: "Laki-Laki" },
              ],
            id_member: "",
            name: "",
            phone: "",
            gender: "",
            username: "",
            password: "",
            isModalOpen: false,
            action: ""

        }
        this.state.filterCust = this.state.customers

        if (localStorage.getItem("token")) {
            if( localStorage.getItem("role") === "Kasir" || localStorage.getItem("role") === "Admin"){
                this.state.token = localStorage.getItem("token")
              }else {
                window.alert("Anda bukan salah satu admin / kasir  outlet kami !")
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
            [e.target.name]: e.target.value
        });
    }
    handleFile = (e) => {
        this.setState({
            image: e.target.files[0] //up 1 file saja
        });
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        });
    }

    getCustomer = () => {
        // let customer = (localStorage.getItem("name"))
        let url = "http://localhost:8000/member/"
        axios.get(url)
            .then(res => {
                this.setState({
                    customers: res.data.member,
                    // custCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        // console.log(customer)
        // console.log(this.state.custCount)
    }

    handleEdit = (item) => {
        // let customer = (localStorage.getItem("name"))
        // let url = ""
        // axios.post(url)
        // .then(res => {
        this.setState({
            isModalOpen: true,
            id_member: item.id_member,
            name: item.name,
            phone: item.phone,
            
            gender: item.gender,
            
            username: item.username,
            password: item.password,
            action: "update"
            // selectedItem: item


            // custCount: res.data.count
        })
        // })
    }
    handleSave = (e) => {
        e.preventDefault()
        // console.log("berhasil ")
        let form = new FormData()//
        form.append("name", this.state.name)
        form.append("phone", this.state.phone)
        form.append("gender", this.state.gender)
        form.append("username", this.state.username)
        form.append("password", this.state.password)

        let url = ""
        
        // console.log(data)
        //setting url
        if (this.state.action === "insert") {
            url = "http://localhost:8000/member/"
            axios.post(url, form)
                .then(res => {
                    console.log(res.data.message)
                    this.getCustomer()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err.message)
                })
        } else if (this.state.action === "update") {
            url = "http://localhost:8000/member/" + this.state.id_member
            axios.put(url, form)
                .then(res => {
                    console.log(res.data.message)
                    this.getCustomer()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
        //panggil api backend
    }
    handleDel = (id_member) => {
        let url = "http://localhost:8000/member/" + id_member
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getCustomer()
                    // this.handleClose()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    addToCart = (item) => {
        localStorage.setItem("customer", JSON.stringify(item.id_member))
        window.location = "/cart"
    }
    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getCustomer()
    }
    render() {
        return (
            <div>
                <div className="navbar-bg"></div>

                <Navbar />
                <Sidebar />
                <div className="main-content">
                    <section className="section">
                        <div className="section-body">
                        
                            
                            <div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <h4>Members Table</h4>
                <div class="card-header-action">
                    <form>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search" />
                            <div class="input-group-btn">
                                <button class="btn btn-primary"><i class="fas fa-search"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-striped" id="sortable-table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Phone</th>
                                
                                <th>Username</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.customers.map((item, index) => {
                            return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.nama}</td>
                                <td>{item.gender}</td>
                                <td class="align-middle">
                                {item.phone}
                                </td>
                                <td>{item.username}</td>
                                <td><a href="#" class="btn btn-secondary" onClick={() => this.addToCart(item)}>add to cart</a></td>
                            </tr>
                             )
                            })}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

                            
                            <Footer />

                            {/* modal */}
                            <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Form Admin</Modal.Title>
                                </Modal.Header>
                                <Form className="bg-light bg-opocity-10" onSubmit={e => this.handleSave(e)}>
                                    <Modal.Body>
                                        {/* <Form.Group className="mb-3 text-dark bg-transparent" controlId="nip">
                                    <Form.Label >ID</Form.Label>
                                    <Form.Control className="text-dark" type="text" name="id_member" placeholder="Masukkan ID" value={this.state.id_member} onChange={this.handleChange} />
                                </Form.Group> */}
                                        <Form.Group className="mb-3 text-dark bg-transparent" controlId="name">
                                            <Form.Label className="text-secondary" >Admin Name </Form.Label>
                                            <Form.Control className="text-dark bg-transparent" type="text" name="name" placeholder="Masukkan Nama" value={this.state.name}
                                                onChange={e => this.setState({ name: e.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="username">
                                            <Form.Label className="text-secondary">Username</Form.Label>
                                            <Form.Control className="text-dark bg-transparent" type="text" name="username" placeholder="Masukkan  Username" value={this.state.username}
                                                onChange={e => this.setState({ username: e.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                        {this.state.action === "update" && this.state.fillPassword === false ? (
                                            <Button className="btn btn-sm btn-secondary mb-1 btn-block"
                                                onClick={() => this.setState({ fillPassword: true })}>
                                                Change Password
                                            </Button>

                                        ) : (

                                            <Form.Group className="mb-3" controlId="password">
                                                <Form.Label className="text-secondary">Password</Form.Label>
                                                <Form.Control className="text-dark bg-transparent" type="password" name="password" placeholder="Masukkan Password" value={this.state.password}
                                                    onChange={e => this.setState({ password: e.target.value })}

                                                />
                                            </Form.Group>
                                        )}

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
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}