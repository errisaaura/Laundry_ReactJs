import React from "react";
import Navbar from '../component/navbar';
import Sidebar from "../component/sideBar";
import Footer from "../component/footer";
import axios from "axios";

// import "../style/home.css"



export default class ProfilCustomer extends React.Component {
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
            address: "",
            gender: "",
            username: "",
            password: "",

            customer:null,
            image: null,//karena objek jadi pake null
            isModalOpen: false,
            action: ""

        }
        if (localStorage.getItem("token")) {
          if(localStorage.getItem("role") === "Admin" || localStorage.getItem("role") === "Kasir" || localStorage.getItem("role") === "Owner"){
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
        let customer = (localStorage.getItem("name"))
        let url = "http://localhost:8000/member/tampil/" + this.state.id_member
        axios.get(url)
            .then(res => {
                this.setState({
                    customers: res.data.customer,
                    // custCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(customer)
        // console.log(this.state.custCount)
    }

    addCust = () => {
        this.setState({
            isModalOpen: true,
            id_member: "",
            name: "",
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
    handleDel = (id_member) => {
        let url = "http://localhost:8000/member/2" + this.state.id_member
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
    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getMember()
    }

    render() {
        return (
            <div>
    <div class="navbar-bg"></div>

                <Navbar />
                <Sidebar />
                
                
                    

        {/* Main Content  */}
      <div class="main-content">
        <section class="section">
          <div class="section-header">
            <h1>Profile</h1>
            <div class="section-header-breadcrumb">
              <div class="breadcrumb-item active"><a href="/home">Dashboard</a></div>
              <div class="breadcrumb-item">Profile</div>
            </div>
          </div>
          {this.state.customers.map(item => {
                // return (
          <div key={item.id_member} class="section-body">
            <h2 class="section-title">Hi, {localStorage.getItem("name")}!</h2>
            <p class="section-lead">
              Looking information about your customer on this page.
            </p>

            <div class="row mt-sm-4">
              <div class="col-12 col-md-12 col-lg-5">
                <div class="card profile-widget">
                  <div class="profile-widget-header">
                    <img alt={item.image} src={"http://localhost:4040/image/customer/" + item.image}  class="img rounded-circle profile-widget-picture" width="100" height="100"/>
                    <div class="profile-widget-items">
                      <div class="profile-widget-item">
                        <div class="profile-widget-item-label">Posts</div>
                        <div class="profile-widget-item-value">187</div>
                      </div>
                      <div class="profile-widget-item">
                        <div class="profile-widget-item-label">Gender</div>
                        <div class="profile-widget-item-value">{item.gender}</div>
                      </div>
                      <div class="profile-widget-item">
                        <div class="profile-widget-item-label">Address</div>
                        <div class="profile-widget-item-value">{item.address}</div>
                      </div>
                    </div>
                  </div>
                  <div class="profile-widget-description">
                    <div class="profile-widget-name">{item.name}<div class="text-muted d-inline font-weight-normal"><div class="slash"></div>Customer</div></div>
                    {item.name} is a customer from <b>{item.address}</b>.You can call him in {item.phone}. His acount username is <b>{item.username}</b>.
                  </div>
                  <div class="card-footer text-center">
                    <div class="font-weight-bold mb-2">Follow {item.name} On</div>
                    <a href="#" class="btn btn-social-icon btn-facebook mr-1">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" class="btn btn-social-icon btn-twitter mr-1">
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="btn btn-social-icon btn-github mr-1">
                      <i class="fab fa-github"></i>
                    </a>
                    <a href="#" class="btn btn-social-icon btn-instagram">
                      <i class="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-12 col-lg-7">
                <div class="card">
                  <form  class="needs-validation" novalidate="">
                    <div class="card-header">
                      <h4> Profile Detail</h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                          <div class="form-group col-md-6 col-12">
                            <label>Name</label>
                            <input type="text" class="form-control" value= {item.name} disabled/>
                            <div class="invalid-feedback">
                           
                            </div>
                          </div>
                          <div class="form-group col-md-6 col-12">
                            <label>Gender</label>
                            <input type="text" class="form-control" value= {item.gender} disabled/>
                            <div class="invalid-feedback">
                              Please fill in the last name
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="form-group col-md-7 col-12">
                            <label>Email</label>
                            <input type="email" class="form-control" value= {item.username} disabled/>
                            <div class="invalid-feedback">
                              Please fill in the email
                            </div>
                          </div>
                          <div class="form-group col-md-5 col-12">
                            <label>Phone</label>
                            <input type="tel" class="form-control" value= {item.phone} disabled/>
                          </div>
                        </div>
                       
                        <div class="row">
                          <div class="form-group mb-0 col-12">
                            <div class="custom-control custom-checkbox">
                              <input type="checkbox" name="remember" class="custom-control-input" id="newsletter" />
                              <label class="custom-control-label" for="newsletter">Subscribe to newsletter</label>
                              <div class="text-muted form-text">
                                You will get new information about products, offers and promotions
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div class="card-footer text-right">
                      <button class="btn btn-primary">This is {item.name} profile</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          //  )
        })}
        <Footer />
        </section>
      </div>

                    
               
            </div>

        )
    }
}
//etarge.value
//etarget.file