import React from "react";
import Navbar from "../component/navbar";
import Sidebar from "../component/sideBar";
import Footer from "../component/footer";
import axios from "axios";


export default class ProfilAdmin extends React.Component {

  constructor() {
    super()
    this.state = {
      token: "",
      admins: [],
      outlet: "",
      id_admin: "",
      name: "",
      username: "",
      password: "",
      role: "",
      id_outlet: "",
      fillPassword: true,
      isModalOpen: false,
      action: ""
    }
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("role") === "Admin" || localStorage.getItem("role") === "Kasir" || localStorage.getItem("role") === "Owner") {
        this.state.token = localStorage.getItem("token")
      } else {
        window.alert("Anda bukan salah satu admin/kasir/owner outlet kami !")
        window.location = "/home"
      }//pengecekan ada token apa tidak
      //token dibutuhkan setiap saat mau ngakses API, token diambil dari local storage, data login disimpan ke local storage
    } else {
      window.location = "/login"
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleClose = () => {
    this.setState({
      isModalOpen: false
    });
  }

  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` }
    }
    return header
  }
  getAdmin = () => {

    let url = "http://localhost:8000/admin/tampil/" + this.state.id_admin
    axios.get(url, this.headerConfig())
      .then(res => {
        this.setState({
          admins: res.data.admin
        })
      })
      .catch(err => {
        console.log(err.message)
      })

  }

  componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
    this.getAdmin()
  }
  render() {
    return (
      <div>
        <div class="navbar-bg"></div>

        <Navbar />
        <Sidebar />
        <div className="main-content">
          <section className="section">
            <div class="section-header">
              <h1>{localStorage.getItem("role")}</h1>
              <div class="section-header-breadcrumb">
                <div class="breadcrumb-item active"><a href="/home">Dashboard</a></div>
                <div class="breadcrumb-item"><a href="#">Components</a></div>
                <div class="breadcrumb-item">User</div>
              </div>
            </div>
            {/* {this.state.admins.map((item, index) => {
              return ( */}
            <div className="section-body d-flex justify-content-center">
              <div class="col-12 col-sm-10 col-lg-8">
                <div class="card profile-widget">
                  <div class="profile-widget-header d-flex justify-content-center">
                    <img alt="image" src="../assets/img/avatar/avatar-1.png" class="rounded-circle profile-widget-picture " />
                    {/* <div class="profile-widget-items">
                      <div class="profile-widget-item">
                        <div class="profile-widget-item-label">Posts</div>
                        <div class="profile-widget-item-value">187</div>
                      </div>
                      <div class="profile-widget-item">
                        <div class="profile-widget-item-label">Followers</div>
                        <div class="profile-widget-item-value">6,8K</div>
                      </div>
                      <div class="profile-widget-item">
                        <div class="profile-widget-item-label">Following</div>
                        <div class="profile-widget-item-value">2,1K</div>
                      </div>
                    </div> */}
                  </div>

                  <div class="profile-widget-description pb-0" >
                    <div class="profile-widget-name">{localStorage.getItem("name")}<div class="text-muted d-inline font-weight-normal"><div class="slash"></div>{localStorage.getItem("role")}</div></div>
                    {this.state.admins.map((item, index) => {
                      return (
                        <div key={item.id_admin}>
                          <p>Lorem ipsum {item.name} dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat.</p>
                        </div>
                      )
                    })}
                  </div>

                  <div class="card-footer text-center pt-0">
                    <div class="font-weight-bold mb-2 text-small">Follow {localStorage.getItem("name")} On</div>
                    <a href="#" class="btn btn-social-icon mr-1 btn-facebook">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" class="btn btn-social-icon mr-1 btn-twitter">
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="btn btn-social-icon mr-1 btn-github">
                      <i class="fab fa-github"></i>
                    </a>
                    <a href="#" class="btn btn-social-icon mr-1 btn-instagram">
                      <i class="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* //   )
            // })} */}
            <Footer />
          </section>
        </div>

      </div>

    )
  }

}