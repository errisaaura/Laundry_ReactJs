import React from "react";



export default class TransaksiList extends React.Component {
    getAmount = (pakets) => {
        let total = 0
        pakets.map(item =>{
            total += Number(item.price) * Number(item.qty)
        })
        return total
    }

    getDetail = () => {
        window.location ="/detail"
     }

    render(){
        return(
            <div>
             
                <div className="card col-sm-16 my-1">
                    <div className="card-body row">
                        <div className="col-lg-2 col-sm-16">
                            <small className="text-primary">Member</small>
                            <h6>{this.props.name}</h6>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                            <small className="text-primary">Total Amount</small>
                            <h6 className="text-danger">Rp {this.getAmount(this.props.pakets) }</h6>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                            <small className="text-primary">Tanggal Bayar</small>
                            <h6 className="text-danger">{this.props.tgl_bayar }</h6>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                            <small className="text-primary">Batas Waktu </small>
                            <h6 className="text-danger">{this.props.bts_waktu}</h6>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                            <small className="text-primary">Status Order</small>
                            <h6 className="text-danger"> {this.props.status}</h6>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                            <small className="text-primary">Status Bayar</small>
                            <h6 className="text-danger"> {this.props.payment}</h6>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                            <small className="text-primary"> Admin Name</small>
                            <h6 >{this.props.admin_name}</h6>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                        <small className="text-primary">Edit Transaksi</small>
                        <div class="buttons">
                                    <a href="#" class="btn btn-icon icon-left btn-lg btn-primary rounded-pill" onClick={this.props.onEdit}><i class="fas fa-edit"></i>Edit</a>                                                                      
                                </div>
                                </div>
                        <div className="col-lg-3 col-sm-12">
                            <small className="text-bold text-primary">
                                Tgl Transaksi: {(this.props.tgl) }
                            </small>
                            <button className=" col-lg-9 btn btn-sm btn-block btn-success" onClick={(this.props.onDetail)}>
                                Details
                            </button>
                        </div>
                    </div>
                </div>

                {/* modal component */}
   

            </div>
        )
    }
}

//dfd (rancang sebuah program, kelas diagram, flowchart oop)