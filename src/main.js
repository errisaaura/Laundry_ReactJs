import React from "react";
import { Route, Switch } from "react-router-dom";
// import Home from "./pages/home";
import Member from "./pages/member"
import Login from "./pages/login";
// import Register from "./pages/register"
import Paket from "./pages/paket";
import HomeLagi from "./pages/homeLagi";
import AdminList from "./component/adminList";
import PaketList from "./component/paket_list";
import TambahTrans from "./pages/tambah_trans";
import Transaksi from "./pages/transactions";
import ProfilCustomer from "./pages/profil_cust";
import ProfilAdmin from "./pages/profil_admin";
import PaketCart from "./pages/paket_cart";
import Outlet from "./pages/outletAdmin";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Detail from "./pages/detail";
import Laporan from "./pages/laporan";
import PrintLap from "./pages/print_Lap";
import cetakTrans from "./pages/cetakTrans";



//hanya boleh ada 1 exact dimana disitu adalah halaman utama
export default class Main extends React.Component{
    render(){
        return(
            <Switch>
                
                {/* <Route exact path="/" component={Home} /> */}
                <Route exact path="/login" component={Login} />
                {/* <Route patch="/register" component={Register} /> */}
                <Route path="/customer" component={Member} />
                <Route path="/paket" component={Paket} />
                <Route path="/outlet" component={Outlet} />
                <Route path="/home" component={HomeLagi} /> 
                <Route path="/admin" component={AdminList} />
                <Route path="/list" component={PaketList} />  
                <Route path="/tambahtran" component={TambahTrans} />
                <Route path="/cart" component={PaketCart} />
                <Route path="/transCart" component={Cart} />
                <Route path="/tran" component={Transaksi} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/detail" component={Detail} />
                <Route path="/laporan" component={Laporan} />
                <Route path="/printLap" component={PrintLap} />
                <Route path="/cetakTrans" component={cetakTrans} />
                {/* <Route path="/profil" component={ProfilCustomer} />     Ini profil buat Customer */}
                <Route path="/profilAdmin" component={ProfilAdmin} />   {/* Ini profil buat Admin */}
                
            </Switch>
        )
    }
}