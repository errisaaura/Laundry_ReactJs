import React from 'react';
// import "../style/login.css"
import axios from "axios"

export default class register extends React.Component {
    // constructor() {
    //     super()
    //     this.state = {
    //         username: "",
    //         password: "",
    //         // logged: false //defaultnya false karena dia belum login
    //     }
    // }
    // handleChange = (e) => {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     })
    // }
    // handleLogin = (e) => {
    //     e.preventDefault()
    //     let data = {
    //         username: this.state.username,
    //         password: this.state.password
    //     }
    //     let url = "http://localhost:8000/admin/auth"
    //     axios.post(url, data)
    //         .then(res => {
    //             if (res.data.logged) {
                  
          
    //                 let nama = res.data.data.nama
    //                 let outletId = res.data.data.id_outlet
    //                 // let outletNAme = res.data.data.outlet.name
    //                 let adminId = res.data.data.id_admin

    //                 //tambah data lagi karena pada postman username ada di dalam data ada tiga logged, data, token
    //                 let role = res.data.data.role
    //                 let admin = res.data.data
    //                 let token = res.data.token

    //                 // localStorage.setItem("outlet_id", outletId)
    //                 localStorage.setItem("name", nama)
    //                 localStorage.setItem("role", role)
    //                 localStorage.setItem("admin_id", adminId)
    //                 // localStorage.setItem("outlet_name", outletNAme)
    //                 localStorage.setItem("outlet_id", outletId)
    //                 localStorage.setItem("admin", JSON.stringify(admin))
    //                 localStorage.setItem("token", token)
    //                 window.location = "/home"


    //             } else {
    //                 window.alert(res.data.message)
    //             }
    //         })
    // }
    render() {
        return (
<div id="app">
    <section class="section">
      <div class="container mt-5">
        <div class="row">
          <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
            <div class="login-brand">
              <img src="../assets/img/stisla-fill.svg" alt="logo" width="100" class="shadow-light rounded-circle" />
            </div>

            <div class="card card-primary">
              <div class="card-header"><h4>Register</h4></div>

              <div class="card-body">
                <form  className="signin-form">

                    <div class="form-group">
                        <label for="text">Nama Lengkap</label>
                        <input id="nama" type="text" class="form-control" name="nama" required autofocus />
                    </div>

                  <div class="form-group">
                    <label for="email">Username</label>
                    <input id="email" type="email" class="form-control" name="username"   tabindex="1" required autofocus />
                    <div class="invalid-feedback">
                        Please fill in your email
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="d-block">
                    	<label for="password" class="control-label">Password</label>
                        <input id="password" type="password" class="form-control" name="password"  tabindex="2" required />
                        <div class="invalid-feedback">
                            please fill in your password
                        </div>  
                    </div>   
                  </div>

                  <div class="form-group">
                    <label for="text">Role</label>
                    <input id="role" type="text" class="form-control" name="role" required autofocus />
                  </div>

                  <div class="form-group">
                    <label for="text">ID Outlet</label>
                    <input id="role" type="text" class="form-control" name="role" required autofocus />
                  </div>

                  <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-lg btn-block" tabindex="4">
                      Register
                    </button>
                  </div>
                </form>
                <div class="text-center text-muted mt-4 mb-3">
                    Do you have account? <a href="auth-register.html">Log In</a>
                </div>
              </div>
            </div>
            <div class="simple-footer">
              Copyright &copy; Laundry 2022
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  )
  }
  }