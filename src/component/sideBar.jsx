import React from 'react';
// import "../style/login.css"
import axios from "axios"
import {Link} from 'react-router-dom';


export default class Sidebar extends React.Component {
    render() {
        return (
        <div>
<div class="main-sidebar">
        <aside id="sidebar-wrapper">
          <div class="sidebar-brand">
            <a href="index.html">Laundry</a>
          </div>
          <div class="sidebar-brand sidebar-brand-sm">
            <a href="index.html">L</a>
          </div>
          <ul class="sidebar-menu">
              <li class="menu-header">Pages</li>
              <li class="nav-item active"><a class="nav-link" href="/home"><i class="fas fa-fire"></i> <span>Dashboard</span></a></li>
              <li ><a class="nav-link" href="/customer"><i className="fas fa-users"></i> <span>Customer</span></a></li>
              <li ><a class="nav-link" href="/admin"><i class="fas fa-address-card"></i> <span>Admin</span></a></li>
              <li ><a class="nav-link" href="/outlet"><i class="fas fa-store"></i> <span>Outlet</span></a></li>
              <li ><a class="nav-link" href="/paket"><i class="fas fa-box-open"></i> <span>Paket</span></a></li>
              <li class="nav-item dropdown">
                <a href="#" class="nav-link has-dropdown"><i class="fas fa-cart-plus"></i> <span>Chart</span></a>
                <ul class="dropdown-menu">
                  <li><a href="/tambahtran">Tambah Chart</a></li>
                  <li><a class="nav-link" href="/transCart">Transaction Chart</a></li>
                </ul>
              </li>
              <li ><a class="nav-link" href="/tran"><i class="fas fa-hand-holding-usd"></i> <span>History Transaksi</span></a></li>
              <li ><a class="nav-link" href="/laporan"><i class="fas fa-hand-holding-usd"></i> <span>Laporan Transaksi</span></a></li>
            </ul>
        </aside>
      </div>
      </div>
        )
    }
}