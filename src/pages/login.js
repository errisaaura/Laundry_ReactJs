import React from 'react';
// import "../style/login.css"
import axios from "axios"

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            // logged: false //defaultnya false karena dia belum login
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleLogin = (e) => {
        e.preventDefault()
        let data = {
            username: this.state.username,
            password: this.state.password
        }
        let url = "http://localhost:8000/admin/auth"
        axios.post(url, data)
            .then(res => {
                if (res.data.logged) {
                  
          
                    let nama = res.data.data.nama
                    let outletId = res.data.data.id_outlet
                    let adminId = res.data.data.id_admin

                    //tambah data lagi karena pada postman username ada di dalam data ada tiga logged, data, token
                    let role = res.data.data.role
                    let admin = res.data.data
                    let token = res.data.token

                    localStorage.setItem("name", nama)
                    localStorage.setItem("role", role)
                    localStorage.setItem("admin_id", adminId)
                    localStorage.setItem("outlet_id", outletId)
                    localStorage.setItem("admin", JSON.stringify(admin))
                    localStorage.setItem("token", token)
                    window.location = "/home"


                } else {
                    window.alert(res.data.message)
                }
            })
    }
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
              <div class="card-header"><h4>Login</h4></div>

              <div class="card-body">
                <form onSubmit={(e) =>  this.handleLogin(e)} className="signin-form">
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input id="email" type="email" class="form-control" name="username" value={this.state.username} placeholder="Username" tabindex="1" required autofocus onChange={this.handleChange}/>
                    <div class="invalid-feedback">
                      Please fill in your email
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="d-block">
                    	<label for="password" class="control-label">Password</label>
                      <div class="float-right">
                        <a href="auth-forgot-password.html" class="text-small">
                          Forgot Password?
                        </a>
                      </div>
                    </div>
                    <input id="password" type="password" class="form-control" name="password" value={this.state.password} tabindex="2" required onChange={this.handleChange}/>
                    <div class="invalid-feedback">
                      please fill in your password
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" name="remember" class="custom-control-input" tabindex="3" id="remember-me" />
                      <label class="custom-control-label" for="remember-me">Remember Me</label>
                    </div>
                  </div>

                  <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-lg btn-block" tabindex="4">
                      Login
                    </button>
                  </div>
                </form>
                <div class="mt-5 text-muted text-center">
                  Don't have an account? <a href="auth-register.html">Create One</a>
                </div>
              </div>
            </div>
            
            <div class="simple-footer">
              Copyright &copy; Stisla 2018
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  )
  }
  }