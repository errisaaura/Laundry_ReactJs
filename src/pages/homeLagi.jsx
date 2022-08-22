import React from 'react';
// import "../style/login.css"
import axios from "axios"
import Navbar from '../component/navbar';
import Sidebar from '../component/sideBar';
import Footer from '../component/footer';

export default class HomeLagi extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",//untuk akses endpoint
            adminName: "",//menampilkan nama admin yang login
            adminCount: 0,
            memberName: "",
            memberCount: 0,
            paketName: "",
            paketCount: 0,
            tranName: "",
            outletCount: 0,
            outlet: [],
            id_outlet: "",
            id_admin: "",
            nama_outlet: ""

        }
        //pengecekan ada token apa tidak
            //token dibutuhkan setiap saat mau ngakses API, token diambil dari local storage, data login disimpan ke local storage
        if (localStorage.getItem("token")) {

          //ini buat set role admin
          if(localStorage.getItem("role") === "Admin" || localStorage.getItem("role") === "Kasir" || localStorage.getItem("role") === "Owner"){
            this.state.token = localStorage.getItem("token")
            this.state.id_outlet = localStorage.getItem("id_outlet")
            this.state.id_admin = localStorage.getItem("id_admin")

          }else {
            window.alert("Anda bukan salah satu admin outlet kami !")
            window.location = "/home"
          }
            
        } else {
            window.location = "/login"
        }
      }

    //ini buat mengambil token yang nantinya berhubungan dengan auth pada postman
    headerConfig = () => {
        let header = {
            headers: {Authorization : `Bearer ${this.state.token}`}
        }
        return header
    }

    //ini untuk get all admin
    getAdmin = () => {
        let admin = (localStorage.getItem("name"))//json parse karna data yang dibutuhkan string
        let url = "http://localhost:8000/admin/"

        axios.get(url)
            .then(res => {
                this.setState({
                    adminName: admin,
                    adminCount: res.data.count //untuk mengambil jumlah nya
                })

            })
            .catch(err => {
                console.log(err.message)
            })
            
        console.log(admin)
        console.log(this.state.adminCount)

    }

    //ini untuk get all member
    getAllMember = () => {
        let member = (localStorage.getItem("name"))
        let url = "http://localhost:8000/member/"
        axios.get(url)
            .then(res => {
                this.setState({
                    memberName: member,
                    memberCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(member)
        console.log(this.state.memberCount)
    }

    getAllPaket = () => {
        let paket = (localStorage.getItem("name"))
        let url = "http://localhost:8000/paket/"
        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    paketName: paket,
                    paketCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(paket)
        console.log(this.state.paketCount)
    }
    getAllOutlet = () => {
        
        let url = "http://localhost:8000/outlet/"
        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    
                    outletCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
    }

    getOutlet = () => {
      let admin = (localStorage.getItem("name"))
      // let url = "http://localhost:4040/store/admin/id_admin/" + this.state.id_admin
      let url = "http://localhost:8000/admin/tampil/" + this.state.id_admin
      axios.get(url, this.headerConfig())
          .then(res => {
              this.setState({
                  id_outlet: res.data.admin.id_outlet,
                  nama_outlet: res.data.admin.nama
              })

          })
          .catch(err => {
              console.log(err.message)
          })
      console.log(admin)
  }

    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getAdmin()
        this.getOutlet()
        this.getAllMember()
        this.getAllPaket()
        this.getAllOutlet()
    }
    render() {
        return (

            <div id="app">
    <div class="main-wrapper">
    <div class="navbar-bg"></div>

      <Navbar />
     
      <Sidebar />
      
      
      <div class="main-content">
        <section class="section">
        <div class="section-header">
            <h1>Dashboard Admin  Outlet {this.state.nama_outlet} </h1>
            {/* <h6>Outlet {this.state.nama_outlet}</h6>  */}
            

          </div>
          <div class="row">
          <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-6 col-12">
              <div class="card card-statistic-1">
                <div class="card-icon bg-primary">
                  <i class="far fa-user"></i>
                </div>
                <div class="card-wrap">
                  <div class="card-header">
                    <h4>Total Admin</h4>
                  </div>
                  <div class="card-body">
                    {this.state.adminCount}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 col-12">
              <div class="card card-statistic-1">
                <div class="card-icon bg-danger">
                  <i class="fas fa-users"></i>
                </div>
                <div class="card-wrap">
                  <div class="card-header">
                    <h4>Total Customer/Member</h4>
                  </div>
                  <div class="card-body">
                  {this.state.memberCount}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 col-12">
              <div class="card card-statistic-1">
                <div class="card-icon bg-warning">
                  <i class="fas fa-box"></i>
                </div>
                <div class="card-wrap">
                  <div class="card-header">
                    <h4>Total Paket</h4>
                  </div>
                  <div class="card-body">
                  {this.state.paketCount}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 col-12">
              <div class="card card-statistic-1">
                <div class="card-icon bg-success">
                  <i class="fas fa-store"></i>
                </div>
                <div class="card-wrap">
                  <div class="card-header">
                    <h4>Total Outlet</h4>
                  </div>
                  <div class="card-body">
                  {this.state.outletCount}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-20 mb-5" width="100" height="100">
                <div class="hero text-white hero-bg-image hero-bg-parallax " data-background="../assets/img/unsplash/andre-benz-1214056-unsplash.jpg" >
                  <div class="hero-inner">
                    <h2>Welcome, {localStorage.getItem("name")}!</h2>
                    {/* <p class="lead">Silahkan laundry barangmu harga terjangkau dengan hasil yang memuaskan pelanggan!!</p> */}
                    <div class="mt-4">
                      <a href="/profilAdmin" class="btn btn-outline-white btn-lg btn-icon icon-left text-white"><i class="far fa-user"></i> Setup Account</a>
                    </div>
                  </div>
                </div>
              </div>   
          </div>
         
          <div class="row">
            <div class="col-md-8">
              <div class="card">
                <div class="card-header">
                  <h4>Invoices</h4>
                  <div class="card-header-action">
                    <a href="#" class="btn btn-danger">View More <i class="fas fa-chevron-right"></i></a>
                  </div>
                </div>
                <div class="card-body p-0">
                  <div class="table-responsive table-invoice">
                    <table class="table table-striped">
                      <tr>
                        <th>Invoice ID</th>
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Action</th>
                      </tr>
                      <tr>
                        <td><a href="#">INV-87239</a></td>
                        <td class="font-weight-600">Kusnadi</td>
                        <td><div class="badge badge-warning">Unpaid</div></td>
                        <td>July 19, 2018</td>
                        <td>
                          <a href="#" class="btn btn-primary">Detail</a>
                        </td>
                      </tr>
                      <tr>
                        <td><a href="#">INV-48574</a></td>
                        <td class="font-weight-600">Hasan Basri</td>
                        <td><div class="badge badge-success">Paid</div></td>
                        <td>July 21, 2018</td>
                        <td>
                          <a href="#" class="btn btn-primary">Detail</a>
                        </td>
                      </tr>
                      <tr>
                        <td><a href="#">INV-76824</a></td>
                        <td class="font-weight-600">Muhamad Nuruzzaki</td>
                        <td><div class="badge badge-warning">Unpaid</div></td>
                        <td>July 22, 2018</td>
                        <td>
                          <a href="#" class="btn btn-primary">Detail</a>
                        </td>
                      </tr>
                      <tr>
                        <td><a href="#">INV-84990</a></td>
                        <td class="font-weight-600">Agung Ardiansyah</td>
                        <td><div class="badge badge-warning">Unpaid</div></td>
                        <td>July 22, 2018</td>
                        <td>
                          <a href="#" class="btn btn-primary">Detail</a>
                        </td>
                      </tr>
                      <tr>
                        <td><a href="#">INV-87320</a></td>
                        <td class="font-weight-600">Ardian Rahardiansyah</td>
                        <td><div class="badge badge-success">Paid</div></td>
                        <td>July 28, 2018</td>
                        <td>
                          <a href="#" class="btn btn-primary">Detail</a>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card card-hero">
                <div class="card-header">
                  <div class="card-icon">
                    <i class="far fa-question-circle"></i>
                  </div>
                  <h4>14</h4>
                  <div class="card-description">Customers need help</div>
                </div>
                <div class="card-body p-0">
                  <div class="tickets-list">
                    <a href="#" class="ticket-item">
                      <div class="ticket-title">
                        <h4>My order hasn't arrived yet</h4>
                      </div>
                      <div class="ticket-info">
                        <div>Laila Tazkiah</div>
                        <div class="bullet"></div>
                        <div class="text-primary">1 min ago</div>
                      </div>
                    </a>
                    <a href="#" class="ticket-item">
                      <div class="ticket-title">
                        <h4>Please cancel my order</h4>
                      </div>
                      <div class="ticket-info">
                        <div>Rizal Fakhri</div>
                        <div class="bullet"></div>
                        <div>2 hours ago</div>
                      </div>
                    </a>
                    <a href="#" class="ticket-item">
                      <div class="ticket-title">
                        <h4>Do you see my mother?</h4>
                      </div>
                      <div class="ticket-info">
                        <div>Syahdan Ubaidillah</div>
                        <div class="bullet"></div>
                        <div>6 hours ago</div>
                      </div>
                    </a>
                    <a href="features-tickets.html" class="ticket-item ticket-more">
                      View All <i class="fas fa-chevron-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
          <Footer />
    </div>
  </div>
        )
    }
}