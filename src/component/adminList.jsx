import React from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import Navbar from "./navbar";
import Sidebar from "./sideBar";
import Footer from "./footer";
import swal from "sweetalert";


export default class AdminList extends React.Component {
  constructor() {
    super()
    this.state = {
      token: "",
      admins: [],
      outlets: [],
      outlet: [],
      id_admin: "",
      nama: "",
      username: "",
      password: "",
      role: "",
      id_outlet: "",
      outlet_name: "",
      search: "",
      keyword: "",
      fillPassword: true,
      isModalOpen: false,
      action: ""
    }



    if (localStorage.getItem("token")) {
      if (localStorage.getItem("role") === "Admin") {
        this.state.token = localStorage.getItem("token")
      }
      else {
        swal({
          title: 'Are you sure?',
          text: "You're not an admin in this outlet!",
          type: 'warning',
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          confirmButtonClass: 'btn btn-success',
          cancelButtonClass: 'btn btn-danger',
          buttonsStyling: false,
          reverseButtons: true
        })
          .then((value) => {
            if (value) {
              window.location.href = "/home"
            }
          });;
      }
      //pengecekan ada token apa tidak
      //token dibutuhkan setiap saat mau ngakses API, token diambil dari local storage, data login disimpan ke local storage
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

  handleClose = () => {
    this.setState({
      isModalOpen: false
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  getAdmin = () => {
    let admin = (localStorage.getItem("name"))
    let url = "http://localhost:8000/admin/"
    axios.get(url, this.headerConfig())
      .then(res => {
        this.setState({
          admins: res.data.admin,
          // custCount: res.data.count
        })

      })
      .catch(err => {
        console.log(err.message)
      })
    console.log(admin)
    // console.log(this.state.custCount)
  }

  getOutlet = () => {
    let admin = (localStorage.getItem("name"))
    let url = "http://localhost:8000/outlet/"
    axios.get(url, this.headerConfig())
      .then(res => {
        this.setState({
          outlets: res.data.outlet,
          // custCount: res.data.count
        })
        console.log(this.state.outlets)

      })
      .catch(err => {
        console.log(err.message)
      })
    console.log(admin)
    // console.log(this.state.custCount)
  }



  handleEdit = (item) => {
    this.setState({
      isModalOpen: true,
      id_admin: item.id_admin,
      nama: item.nama,
      username: item.username,
      password: "",
      role: item.role,
      id_outlet: item.id_outlet,
      outlet_name: item.outlet.nama,
      fillPassword: false,
      action: "update",
    })


  }

  Add = () => {
    // $(window).load(function() {
    // $("#modal_admin").modal("show")
    this.setState({
      isModalOpen: true,
      action: "insert",
      id_admin: 0,
      id_outlet: "",
      nama: "",
      username: "",
      password: "",
      role: "",
      fillPassword: true,
    })
    // })
  }

  dropAdmin = id_admin => {
    if (window.confirm("are you sure will delete this admin?")) {
      let url = "http://localhost:8000/admin/" + id_admin
      axios.delete(url, this.headerConfig())
        .then(response => {
          window.alert(response.data.message)
          this.getAdmin()
        })
        .catch(error => console.log(error))
    }
  }



  handleSave = e => {
    e.preventDefault()
    // $("#modal_admin").modal("hide")
    let form = {
      id_admin: this.state.id_admin,
      nama: this.state.nama,
      username: this.state.username,
      role: this.state.role,
      id_outlet: this.state.id_outlet
    }

    if (this.state.fillPassword) {
      form.password = this.state.password
    }
    let url = ""
    if (this.state.action === "insert") {
      url = "http://localhost:8000/admin/"
      axios.post(url, form, this.headerConfig())
        .then(response => {
          window.alert(response.data.message)
          this.getAdmin()
          this.handleClose()
        })
        .catch(error => console.log(error))
    } else if (this.state.action === "update") {
      url = "http://localhost:8000/admin/edit/" + this.state.id_admin
      axios.put(url, form)
        .then(response => {
          window.alert(response.data.message)
          this.getAdmin()
          this.handleClose()
        })
        .catch(error => console.log(error))
    }
  }
  search = (e) => {
    let url = "http://localhost:8000/admin/search"
    if (e.keyCode === 13) {
      let data = {
        keyword: this.state.keyword
      }
      axios.post(url, data)
        .then(res => {
          this.setState({
            admins: res.data.admin
          })
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }


  componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
    this.getAdmin()
    this.getOutlet()
  }
  render() {
    return (
      <div>
        <div className="navbar-bg"></div>

        <Navbar />
        <Sidebar />
        <div className="main-content">
          <section className="section">
            <div class="section-header">
              <h1>Admin</h1>
              <div class="section-header-button">
                <a href="#" class="btn btn-primary" onClick={() => this.Add()}><i className="fas fa-plus-square "></i> Add Admin</a>
              </div>
              <div class="section-header-breadcrumb">
                <div class="breadcrumb-item active"><a href="/home">Dashboard</a></div>
                <div class="breadcrumb-item"><a href="#">Posts</a></div>
                <div class="breadcrumb-item">All Posts</div>
              </div>
            </div>
            <div class="section-body">
              <h2 class="section-title">Halaman Admin</h2>
              <form>
                          <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search"
                              name="keyword"
                              value={this.state.keyword}
                              onChange={e => this.setState({ keyword: e.target.value })}
                              onKeyUp={e => this.search(e)} />
                            <div class="input-group-append">
                              <button class="btn btn-primary"><i class="fas fa-search"></i></button>
                            </div>
                          </div>
                        </form>

              <div class="row mt-4">
                <div class="col-12">
                  <div class="card">
                    <div class="card-header">
                      <h4>Admin Table</h4>
                    </div>
                    <div class="card-body">
                      <div class="float-right">
                        
                      </div>

                      <div class="clearfix mb-3"></div>

                      <div class="table-responsive">
                        <table class="table table-borderless">
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Role</th>
                            <th scope="col">Action</th>
                          </tr>
                          {this.state.admins.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {index + 1}
                                </td>
                                <td>
                                  <a href="#">
                                    <img alt="image" src="../assets/img/avatar/avatar-5.png" class="rounded-circle" width="35" data-toggle="title" title="" /> <div class="d-inline-block ml-1">{item.nama}</div>
                                  </a>
                                </td>
                                <td>
                                  {item.username}
                                  <div class="table-links">
                                    <div class="bullet"></div>
                                    <a href="#" onClick={() => this.handleEdit(item)}>Edit</a>
                                    <div class="bullet"></div>
                                    <a href="#" class="text-danger" onClick={() => this.dropAdmin(item.id_admin)}>Trash</a>
                                  </div>
                                </td>
                                <td>
                                  {item.role}
                                </td>
                                <td className="col-lg-4">
                                  <div className="buttons">
                                    <a href="#" className="btn btn-icon icon-left btn-lg btn-primary rounded-pill" onClick={() => this.handleEdit(item)}><i className="fas fa-edit"></i>Edit</a>
                                    <a href="#" className="btn btn-icon icon-left btn-lg btn-danger rounded-pill" onClick={() => this.dropAdmin(item.id_admin)}><i className="fas fa-times"></i>Delete</a>
                                  </div>
                                </td>

                              </tr>
                            )
                          })}
                        </table>
                      </div>
                      <div class="float-right">
                        <nav>
                          <ul class="pagination">
                            <li class="page-item disabled">
                              <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                              </a>
                            </li>
                            <li class="page-item active">
                              <a class="page-link" href="#">1</a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#">2</a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#">3</a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section-body">
              <Footer />

              {/* modal */}
              <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Form Admin</Modal.Title>
                </Modal.Header>
                <Form className="bg-light bg-opocity-10" onSubmit={e => this.handleSave(e)}>
                  <Modal.Body>
                    <Form.Group className="mb-3 text-dark bg-transparent" controlId="name">
                      <Form.Label className="text-secondary" >Admin Name </Form.Label>
                      <Form.Control className="text-dark bg-transparent" type="text" name="nama" placeholder="Masukkan Nama" value={this.state.nama}
                        onChange={e => this.setState({ nama: e.target.value })}
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
                    {this.state.action === "insert" ? (

                      <Form.Group className="mb-3" controlId="id_outlet">
                        <Form.Label className="text-sm">Outlet</Form.Label>
                        <select className="text-dark bg-transparent" type="text" name="id_outlet"
                          onChange={e => this.setState({ id_outlet: e.target.value })} required >
                          <option></option>
                          {this.state.outlets.map((item, index) => (
                            <option value={item.id_outlet}>{item.nama}</option>
                          ))}
                        </select>
                      </Form.Group>
                    ) : (
                      <Form.Group className="mb-3" controlId="id_outlet">
                        <Form.Label className="text-sm">Outlet</Form.Label>
                        <Form.Select className="text-dark bg-transparent" type="text" name="id_outlet"
                          onChange={e => this.setState({ id_outlet: e.target.value })} required >
                          <option value={this.state.id_outlet}>{this.state.outlet_name}</option>
                          {this.state.outlets.map((item, index) => (
                            <option value={item.id_outlet}>{item.nama}</option>
                          ))}

                        </Form.Select>
                      </Form.Group>
                    )}

                    <Form.Group className="mb-3" controlId="id_outlet">
                      <Form.Label className="text-sm">Ur Role</Form.Label>
                      {/* {this.state.outlet.map((item, index) => { */}
                      <Form.Select className="text-dark bg-transparent" type="text" name="role" value={this.state.role} onChange={this.handleChange}>
                        <option value="none" selected>-</option>
                        <option value="Owner">Owner</option>
                        <option value="Admin">Admin</option>
                        <option value="Kasir">Kasir</option>
                      </Form.Select>
                      {/* })} */}
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
            </div>
          </section>
        </div>
      </div>
    )
  }
}