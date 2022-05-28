import React from "react";
import Navbar from '../component/navbar';
import Sidebar from "../component/sideBar";
import Footer from "../component/footer";
import axios from "axios";
import CustList from "../component/customer_list";
import { Modal, Button, Form } from "react-bootstrap";
// import "../style/home.css"

export default class member extends React.Component {
    constructor() {
        super()
        this.state = {
            member : [],
            id_member : "",
            nama: "",
            phone: "",
            gender: "",
            username: "",
            password: "",
            keyword:"",
            isModalOpen: false,
            action: ""

        }
        if (localStorage.getItem("token")) {
            if(localStorage.getItem("role") === "Kasir" || localStorage.getItem("role") === "Admin"){
                this.state.token = localStorage.getItem("token")
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

    getMember = () => {
        let member = (localStorage.getItem("name"))
        let url = "http://localhost:8000/member/"
        axios.get(url)
            .then(res => {
                this.setState({
                    member : res.data.member,
                    // custCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(member)
        // console.log(this.state.custCount)
    }

    addMember = () => {
        this.setState({
            isModalOpen: true,
            id_member : "",
            nama: "",
            phone: "",
            gender: "",
            username: "",
            password: "",
            action: "insert"
        });
    }

    handleEdit = (item) => {
        // let customer = (localStorage.getItem("name"))
        // let url = ""
        // axios.post(url)
        // .then(res => {
        this.setState({
            isModalOpen: true,
            id_member : item.id_member ,
            nama: item.nama,
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
        let form = {
            nama: this.state.nama,
            gender: this.state.gender,
            phone: this.state.phone,
            username: this.state.username,
            password: this.state.password
        }

        let url = ""
        // "http://localhost:8080/customer"
        // console.log(data)
        //setting url
        if (this.state.action === "insert") {
            url = "http://localhost:8000/member/"
            axios.post(url, form)
                .then(res => {
                    console.log(res.data.message)
                    this.getMember()
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
                    this.getMember()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
        //panggil api backend
    }
    handleDel = (id_member ) => {
        let url = "http://localhost:8000/member/" + id_member 
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getMember()
                    // this.handleClose()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    search = (e) => {
        let url = "http://localhost:8000/member/search"
        if (e.keyCode === 13) {
            let data = {
                keyword: this.state.keyword
            }
            axios.post(url, data)
                .then(res => {
                    this.setState({
                        member : res.data.member
                    })
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
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
                
        

                        <div className="mb-4">
                            <p>Halaman customer / member</p>
                            {console.log(this.state.member )}
                        </div>
                      
                        <div class="buttons d-flex justify-content-end m-3">
                            <a href="#" className="btn btn-icon icon-left btn-primary " onClick={() => this.addMember()}><i class="fas fa-user-plus "></i> Add Customer/Member</a>
                        </div>
                        <div className="input-group">
                                                        <input type="text" className="form-control" placeholder="Search" 
                                                        name="keyword" 
                                                        value={this.state.keyword}
                                                        onChange={e => this.setState({ keyword: e.target.value })}
                                                        onKeyUp={e => this.search(e)}/>
                                                        <div className="input-group-append">
                                                            <button className="btn btn-primary"><i className="fas fa-search"></i></button>
                                                        </div>
                                                    </div>
                        <div className="row">
                            {this.state.member.map((item, index) => {
                                return (
                                    <CustList key={index}
                                        name={item.nama}
                                        gender={item.gender}
                                        phone={item.phone}
                                        username={item.username}
                                        password={item.password}
                                        onEdit={() => this.handleEdit(item)}
                                        onDel={() => this.handleDel(item.id_member )}

                                    />
                                )
                            })}
                        </div>
                        <Footer />

                        <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Form Member</Modal.Title>
                            </Modal.Header>
                            <Form className="bg-light bg-opocity-10" onSubmit={e => this.handleSave(e)}>
                                <Modal.Body>
                                   
                                    <Form.Group className="mb-3 text-dark bg-transparent" controlId="name">
                                        <Form.Label className="text-white" >Member Name </Form.Label>
                                        <Form.Control className="text-dark bg-transparent" type="text" name="nama" placeholder="Masukkan Nama" value={this.state.nama} onChange={this.handleChange} />
                                    </Form.Group>
                                
                                    
                                    <Form.Group className="mb-3" controlId="address">
                                        <Form.Label className="text-sm">Gender</Form.Label>
                                        <Form.Select className="text-dark bg-transparent" type="text" name="gender"  value={this.state.gender} onChange={this.handleChange}>
                                        <option value="none" selected>-</option>
                                        <option value="Laki-Laki">Laki-Laki</option>
                                        <option value="Perempuan">Perempuan</option> 
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="phone">
                                        <Form.Label className="text-white">Phone</Form.Label>
                                        <Form.Control className="text-dark bg-transparent" type="text" name="phone" placeholder="Masukkan Phone Number" value={this.state.phone} onChange={this.handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="username">
                                        <Form.Label className="text-white">Username</Form.Label>
                                        <Form.Control className="text-dark bg-transparent" type="text" name="username" placeholder="Masukkan  Username" value={this.state.username} onChange={this.handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label className="text-white">Password</Form.Label>
                                        <Form.Control className="text-dark bg-transparent" type="password" name="password" placeholder="Masukkan Password" value={this.state.password} onChange={this.handleChange} />
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
//etarge.value
//etarget.file