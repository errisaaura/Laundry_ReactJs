import React from 'react';
// import "../style/login.css"
import axios from "axios"

export default class Navbar extends React.Component {
  Logout = () => {
    window.location = "/login"
    localStorage.clear()
  }
    render() {
        return (
        <div>
<nav class="navbar navbar-expand-lg main-navbar col-lg-12 ">
<form class="form-inline mr-auto mt-3">
  
</form>
{/* <ul class="navbar-nav"> */}
  <li class="dropdown mx-5"><a href="#" data-toggle="dropdown" class="nav-link dropdown-toggle nav-link-lg nav-link-user m-5">
    <img alt="image" src="../assets/img/avatar/avatar-1.png" class="rounded-circle mr-1" />
    <div class="d-sm-none d-lg-inline-block">Hi, {localStorage.getItem("name")}</div></a>
    <div class="dropdown-menu dropdown-menu-right">
      <div class="dropdown-title">Logged in 5 min ago</div>
      <a href="/profilAdmin" class="dropdown-item has-icon">
        <i class="far fa-user"></i> Profile
      </a>
      <div class="dropdown-divider"></div>
      <a href="#" class="dropdown-item has-icon text-danger" onClick={() => this.Logout()}>
        <i class="fas fa-sign-out-alt"></i> Logout
      </a>
    </div>
  </li>
{/* </ul> */}
</nav>
</div>
        )
    }
}