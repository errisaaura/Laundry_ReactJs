import React from "react";
// import Navbar from '../component/navbar';
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import PaketList from "../component/paket_list";
// import "../style/home.css"
import Navbar from "../component/navbar";
import Sidebar from "../component/sideBar";
import Footer from "../component/footer";




export default class Paket extends React.Component {
    constructor() {
        super()
        this.state = {
            pakets: [],
            id_paket: "",
            nama: "",
            price: "",
            image: null,
            search: "",
            keyword: "",
            isModalOpen: false,
            action: ""
            
        }

        if (localStorage.getItem("token")) {
            if(localStorage.getItem("role") === "Admin" ){
                this.state.token = localStorage.getItem("token")
              }else {
                window.alert("Anda bukan salah satu admin outlet kami !")
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

    getPaket = () => {
        let paket = (localStorage.getItem("name"))
        let url = "http://localhost:8000/paket/"
        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    pakets: res.data.paket,
                    // custCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(paket)
        // console.log(this.state.custCount)
    }

    addPaket = () => {
        this.setState({
            isModalOpen: true,
            id_paket: "",
            nama: "",
            price: "",
            image: null,
            action: "insert"
        });
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            id_paket: item.id_paket,
            nama: item.nama,
            price: item.price,
            image: item.image,
            action: "update"
        })

    }

    handleSave = (e) => {
        e.preventDefault()
        // console.log("berhasil ")
        let form = new FormData()//
        form.append("nama", this.state.nama)
        form.append("price", this.state.price)
        form.append("image", this.state.image)

        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:8000/paket/"
            axios.post(url, form)
                .then(res => {
                    console.log(res.data.message)
                    this.getPaket()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err.message)
                })
        } else if (this.state.action === "update") {
            url = "http://localhost:8000/paket/" + this.state.id_paket
            axios.put(url, form)
                .then(res => {
                    console.log(res.data.message)
                    this.getPaket()
                    this.handleClose()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
        //panggil api backend
    }

    handleDel = (id_paket) => {
        let url = "http://localhost:8000/paket/" + id_paket
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getPaket()
                    // this.handleClose()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }
    search = (e) => {
        let url = "http://localhost:8000/paket/search"
        if (e.keyCode === 13) {
            let data = {
                keyword: this.state.keyword
            }
            axios.post(url, data)
                .then(res => {
                    this.setState({
                        pakets: res.data.paket
                    })
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getPaket()
    }


    render() {
        return (
            <div>
                <div class="navbar-bg"></div>

                <Navbar />
                <Sidebar />
                <div className="main-content">
                    <section className="section">

                        <div className="mb-2 mt-2">
                            <h5>Halaman Paket</h5>
                            {console.log(this.state.pakets)}
                            <div class="buttons d-flex justify-content-end mx-5">
                            <a href="#" className="btn btn-icon icon-left btn-primary " onClick={() => this.addPaket()}><i class="fas fa-plus "></i> Add Paket</a>
                            </div>
                        </div>
                        
                        <br />
                        <div className="input-group d-flex">

                            {/* <input nama="text" className="form-control rounded-pill col-lg-7" placeholder="Search"
                                name="keyword"
                                value={this.state.keyword}
                                onChange={e => this.setState({ keyword: e.target.value })}
                                onKeyUp={e => this.search(e)} />
                            <div className="input-group-btn">
                                <button className="btn btn-primary rounded-pill"><i className="fas fa-search"></i></button>
                            </div> */}
                            {/* <div class="buttons d-flex justify-content-end mx-5">
                            <a href="#" className="btn btn-icon icon-left btn-primary " onClick={() => this.addPaket()}><i class="fas fa-plus "></i> Add Paket</a>
                            </div> */}
                        </div>
                    {/* <h6 class="mt-3 mx-5 px-5 text-danger "><small>*Masukkan keyword id / nama paket</small></h6> */}

                        <div className="row">
                            {this.state.pakets.map((item, index) => {
                                return (
                                    <PaketList key={index}
                                        nameImage={item.image}//nma file ngambil dari database
                                        image={"http://localhost:8000/image/paket/" + item.image}//nama file link dari url
                                        nama={item.nama}
                                        price={item.price}
                                        onEdit={() => this.handleEdit(item)}
                                        onDel={() => this.handleDel(item.id_paket)}
                                    />
                                )
                            })}
                        </div>
                        <Footer />

                        <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Form Paket</Modal.Title>
                            </Modal.Header>
                            <Form className="bg-light bg-opocity-10" onSubmit={e => this.handleSave(e)}>
                                <Modal.Body>
                                    {/* <Form.Group className="mb-3 text-dark bg-transparent" controlId="nip">
                                    <Form.Label >ID</Form.Label>
                                    <Form.Control className="text-dark" nama="text" name="customer_id" placeholder="Masukkan ID" value={this.state.customer_id} onChange={this.handleChange} />
                                </Form.Group> */}
                                    <Form.Group className="mb-3 text-dark bg-transparent" controlId="name">
                                        <Form.Label className="text-dark" >Paket Name </Form.Label>
                                        <Form.Control className="text-dark bg-transparent" type="text" name="nama" placeholder="Masukkan Tipe Paket" value={this.state.nama} 
                                        onChange={e => this.setState({ nama: e.target.value })}
                                        required />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="price">
                                        <Form.Label className="text-dark">Price</Form.Label>
                                        <Form.Control className="text-dark bg-transparent" type="text" name="price" placeholder="Masukkan Harga" value={this.state.price} 
                                        onChange={e => this.setState({ price: e.target.value })}
                                        required />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="image">
                                        <Form.Label className="text-dark">Image </Form.Label>
                                        {/* image tidak peru value  */}
                                        <Form.Control className="text-dark bg-transparent" type="file" name="image" placeholder="Masukkan Foto Paket"  onChange={this.handleFile} />
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