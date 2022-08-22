import React from "react";
// import Navbar from '../component/navbar';
import axios from "axios";
// import "../style/home.css
import Navbar from "../component/navbar";
import Sidebar from "../component/sideBar";
import Footer from "../component/footer";
import TransaksiList from "../component/trans_list";
import { Modal, Button, Form } from "react-bootstrap";
import swal from "sweetalert";

export default class Transaksi extends React.Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
      pakets: [],
      id_transaksi: "",
      id_member: "",
      id_outlet: "",
      tgl: "",
      batas_waktu: "",
      tgl_bayar: "",
      status: "",
      payment: "",
      admin: "",
      member: "",
      outlet: "",
      detail_transaksi: [],
      isModalOpen: false,
      selectedItem: null,
      // action: ""
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
  handleClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  handleEdit = (item) => {
    let url = "http://localhost:8000/transaksi/" + item.id_transaksi;

    axios
      .get(url, this.headerConfig())

      .then((res) => {
        this.setState({
          isModalOpen: true,
          id_transaksi: item.id_transaksi,
          member: item.member.nama,
          admin: item.admin.nama,
          outlet: item.outlet.nama,
          tgl: item.tgl,
          tgl_bayar: item.tgl_bayar,
          batas_waktu: item.batas_waktu,
          status: item.status,
          payment: item.payment,
          detail_transaksi: item.detail_transaksi,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  handleDetail = (item) => {
    let trans_id = item.id_transaksi;
    localStorage.setItem("id_transaksi", trans_id);
    window.location = "/detail";
  };

  handleSave = (e) => {
    e.preventDefault();
    let tanggal = "";
    if (this.state.payment === "Lunas") {
      tanggal = new Date().toLocaleDateString("en-CA");
    } else if (this.state.payment === "Belum bayar") {
      tanggal = null;
    }
    let form = {
      tgl_bayar: tanggal,
      batas_waktu: this.state.batas_waktu,
      status: this.state.status,
      payment: this.state.payment,
    };

    let url = "http://localhost:8000/transaksi/" + this.state.id_transaksi;
    axios
      .put(url, form, this.headerConfig())
      .then((res) => {
        console.log(res.data.message);
        this.getTransaction();
        this.handleClose();
      })
      .catch((err) => {
        console.log(err.message);
      });

    //panggil api backend
  };

  getTransaction = () => {
    let url = "http://localhost:8000/transaksi/";

    axios
      .get(url, this.headerConfig())

      .then((res) => {
        this.setState({
          transactions: res.data.transaksi,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  getAmount = (pakets) => {
    let total = 0;
    pakets.map((item) => {
      total += Number(item.price) * Number(item.qty);
    });
    return total;
  };

  componentDidMount() {
    this.getTransaction();
  }

  render() {
    return (
      <div>
        <div class="navbar-bg"></div>

        <Navbar />
        <Sidebar />

        <div className="main-content">
          <section className="section">
            <h3 className="text-bold text-primary mt-2">Transactions List</h3>

            <div className="row">
              {this.state.transactions.map((item, index) => {
                return (
                  <TransaksiList
                    key={item.id_transaksi}
                    transaction_id={item.id_transaksi}
                    name={item.member.nama}
                    tgl_bayar={item.tgl_bayar}
                    bts_waktu={item.batas_waktu}
                    status={
                      item.status === "Baru" ? (
                        <button className="w-100 btn btn-danger rounded-pill">
                          {item.status}
                        </button>
                      ) : <button></button> && item.status === "Proses" ? (
                        <button className="w-100 btn btn-warning rounded-pill">
                          {item.status}
                        </button>
                      ) : <button></button> && item.status === "Selesai" ? (
                        <button className="w-100 btn btn-primary rounded-pill">
                          {item.status}
                        </button>
                      ) : <button></button> && item.status === "Diambil" ? (
                        <button className="w-100 btn btn-success rounded-pill">
                          {item.status}
                        </button>
                      ) : (
                        <button></button>
                      )
                    }
                    payment={
                      item.payment === "Belum Bayar" ? (
                        <button className="w-80 btn disabled btn-danger rounded-pill">
                          {item.payment}
                        </button>
                      ) : <button></button> && item.payment === "Lunas" ? (
                        <button class="w-80 btn btn-success rounded-pill">
                          {item.payment}
                        </button>
                      ) : (
                        <button></button>
                      )
                    }
                    admin_name={item.admin.nama}
                    tgl={item.tgl}
                    pakets={item.detail_transaksi}
                    onEdit={() => this.handleEdit(item)}
                    onDetail={() => this.handleDetail(item)}
                  />
                );
              })}
            </div>

            <Footer />

            <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Update Transaction</Modal.Title>
              </Modal.Header>
              <Form
                className="bg-light bg-opocity-10"
                onSubmit={(e) => this.handleSave(e)}
              >
                <Modal.Body>
                  <Form.Group
                    className="mb-3 text-dark bg-transparent"
                    controlId="id_transaksi"
                  >
                    <Form.Label>Transaction ID</Form.Label>
                    <Form.Control
                      className="text-dark"
                      type="text"
                      name="id_transaksi"
                      value={this.state.id_transaksi}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 text-dark bg-transparent"
                    controlId="name"
                  >
                    <Form.Label className="text-dark">member Name</Form.Label>
                    <Form.Control
                      className="text-dark bg-transparent"
                      type="text"
                      name="name"
                      value={this.state.member}
                      onChange={this.handleChange}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 text-dark bg-transparent"
                    controlId="name"
                  >
                    <Form.Label className="text-dark">Outlet Name</Form.Label>
                    <Form.Control
                      className="text-dark bg-transparent"
                      type="text"
                      name="name"
                      value={this.state.outlet}
                      onChange={this.handleChange}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="phone">
                    <Form.Label className="text-dark">
                      Tanggal Transaksi
                    </Form.Label>
                    <Form.Control
                      className="text-dark bg-transparent"
                      type="text"
                      name="tgl"
                      value={this.state.tgl}
                      onChange={this.handleChange}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="phone">
                    <Form.Label className="text-dark">Batas Waktu</Form.Label>
                    <Form.Control
                      className="text-dark bg-transparent"
                      type="text"
                      name="batas_waktu"
                      placeholder="Masukkan Phone Number"
                      value={this.state.batas_waktu}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="status">
                    <Form.Label className="text-sm">Status Order</Form.Label>
                    <Form.Select
                      className="text-dark bg-transparent"
                      type="text"
                      name="status"
                      value={this.state.status}
                      onChange={this.handleChange}
                    >
                      <option value="none" selected>
                        -
                      </option>
                      <option value="Baru">Baru</option>
                      <option value="Proses">Proses</option>
                      <option value="Selesai">Selesai</option>
                      <option value="Diambil">Diambil</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="payment">
                    <Form.Label className="text-sm">
                      Status Pembayaran
                    </Form.Label>
                    <Form.Select
                      className="text-dark bg-transparent"
                      type="text"
                      name="payment"
                      value={this.state.payment}
                      onChange={this.handleChange}
                    >
                      <option value="none" selected>
                        -
                      </option>
                      <option value="Lunas">Lunas</option>
                      <option value="Belum Bayar">Belum bayar</option>
                    </Form.Select>
                  </Form.Group>
                  <div class="card-body">
                    <div class="table-responsive ">
                      <table
                        class="table table-bordered table-sm "
                        id="dataTable"
                        width="100%"
                        cellspacing="0"
                      >
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Paket</th>
                            <th scope="col">Price</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.detail_transaksi.map((item, index) => (
                            <tr key={index}>
                              <td>{`${index + 1}`}</td>
                              <td>
                                <ol>{item.paket.type}</ol>
                              </td>
                              <td>Rp {item.price}</td>
                              <td>{item.qty} kg</td>
                              <td className="text-right">
                                Rp {item.price * item.qty}
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan="4" className="text-danger text-bold">
                              <h5>Total</h5>
                            </td>
                            <td className="text-right text-danger text-bold">
                              <h5>
                                Rp {this.getAmount(this.state.detail_transaksi)}
                              </h5>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={this.handleClose}
                  >
                    Save
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          </section>
        </div>
      </div>
    );
  }
}
