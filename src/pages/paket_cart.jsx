import React from "react";
// import Navbar from '../component/navbar';
import axios from "axios";
// import "../style/home.css"
import Navbar from "../component/navbar";
import Sidebar from "../component/sideBar";
import Footer from "../component/footer";
import CartList from "../component/cart_list";

export default class PaketCart extends React.Component {
  constructor() {
    super();
    this.state = {
      pakets: [],
      id_paket: "",
      nama: "",
      price: "",
      image: null,
      search: "",
      filterPaket: [],
      isModalOpen: false,
      action: "",
    };

    if (localStorage.getItem("token")) {
      if (
        localStorage.getItem("role") === "Kasir" ||
        localStorage.getItem("role") === "Admin"
      ) {
        this.state.token = localStorage.getItem("token");
      } else {
        window.alert("Anda bukan salah satu admin / kasir outlet kami !");
        window.location = "/home";
      }
      //pengecekan ada token apa tidak
      //token dibutuhkan setiap saat mau ngakses API, token diambil dari local storage, data login disimpan ke local storage
      this.state.token = localStorage.getItem("token");
    } else {
      window.location = "/login";
    }
    this.state.filterPaket = this.state.pakets;
  }

  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` },
    };
    return header;
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleFile = (e) => {
    this.setState({
      image: e.target.files[0], //up 1 file saja
    });
  };

  handleClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  getPaket = () => {
    let paket = localStorage.getItem("name");
    let url = "http://localhost:8000/paket/";
    axios
      .get(url, this.headerConfig())
      .then((res) => {
        this.setState({
          pakets: res.data.paket,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
    console.log(paket);
  };

  addToCart = (selectedItem) => {
    // membuat sebuah variabel untuk menampung cart sementara
    let tempCart = [];

    // cek eksistensi dari data cart pada localStorage
    if (localStorage.getItem("cart") !== null) {
      tempCart = JSON.parse(localStorage.getItem("cart"));
      // JSON.parse() digunakan untuk mengonversi dari string -> array object
    }
    // cek data yang dipilih user ke keranjang belanja
    let existItem = tempCart.find(
      (item) => item.id_paket === selectedItem.id_paket
    );
    console.log(existItem);

    if (existItem) {
      // jika item yang dipilih ada pada keranjang belanja
      window.alert(`Anda telah memilih paket laundry ${selectedItem.nama}`);
    } else {
      // user diminta memasukkan jumlah item yang dibeli
      let promptJumlah = window.prompt(
        `Masukkan jumlah ${selectedItem.nama} (kg) `,
        ""
      );
      if (
        promptJumlah !== null ||
        promptJumlah !== "" ||
        promptJumlah !== "0"
      ) {
        // jika user memasukkan jumlah item yg dibeli

        // menambahkan properti "jumlahBeli" pada item yang dipilih
        selectedItem.qty = promptJumlah;
        selectedItem.subtotal = selectedItem.price * promptJumlah;

        // masukkan item yg dipilih ke dalam cart
        tempCart.push(selectedItem);

        // simpan array tempCart ke localStorage
        localStorage.setItem("cart", JSON.stringify(tempCart));
      }
    }
  };

  handleSave = (e) => {
    e.preventDefault();
    // console.log("berhasil ")
    let form = new FormData(); //
    form.append("nama", this.state.nama);
    form.append("price", this.state.price);
    form.append("image", this.state.image);

    let url = "";
    if (this.state.action === "insert") {
      url = "http://localhost:8000/paket/";
      axios
        .post(url, form)
        .then((res) => {
          console.log(res.data.message);
          this.getPaket();
          this.handleClose();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else if (this.state.action === "update") {
      url = "http://localhost:8000/paket/" + this.state.id_paket;
      axios
        .put(url, form)
        .then((res) => {
          console.log(res.data.message);
          this.getPaket();
          this.handleClose();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    //panggil api backend
  };

  handleDel = (id_paket) => {
    let url = "http://localhost:8000/paket/" + id_paket;
    if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
      axios
        .delete(url)
        .then((res) => {
          console.log(res.data.message);
          this.getPaket();
          // this.handleClose()
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  search = (e) => {
    if (e.keyCode === 13) {
      let search = this.state.search.toLowerCase();
      //lowercase mencari dengan huruf kecil
      let paket = this.state.pakets;
      let result = paket.filter((item) => {
        return item.nama.toLowerCase().includes(search);
      });

      this.setState({
        filterPaket: result,
      });
      console.log("search");
    }
  };

  componentDidMount = () => {
    //dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
    this.getPaket();
  };
  render() {
    return (
      <div>
        <div class="navbar-bg"></div>

        <Navbar />
        <Sidebar />
        <div className="main-content">
          <section className="section">
            <h3 className="text-bold text-light mt-2">Product List</h3>
            <div class="row row-cols-1 row-cols-md-3 g-4">
              {this.state.pakets.map((item) => (
                <CartList
                  key={item.id_paket}
                  nama={item.nama}
                  price={item.price}
                  nameImage={item.image} //nma file ngambil dari database
                  image={"http://localhost:8000/image/paket/" + item.image}
                  onCart={() => this.addToCart(item)}
                />
              ))}
            </div>
            <Footer />
          </section>
        </div>
      </div>
    );
  }
}
