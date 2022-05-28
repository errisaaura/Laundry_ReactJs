
import React from "react";

export default class PaketList extends React.Component {

    converTime = time => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }
    render() {
        return (
            <div className="card col-sm-12 my-1 " >
                <div className="card-body row">
                    <div className="card mb-3 rounded-pill bg-primary bg-opacity-10"  >
                        <div className="row g-0">
                            <div className="col-sm-3">
                                <img alt={this.props.nameImage} src={this.props.image} className="img-fluid rounded-start" />
                            </div>
                            <div className="col-sm-5 me-2">
                                <div className="card-body">
                                    <h5 className="card-title text-dark"> {this.props.nama}</h5>
                                    <p className="card-text text-muted">Rp {this.props.price},-</p>
                                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago{this.converTime}</small></p>


                                </div>
                            </div>
                            <div className=" col-sm-3 mt-5 ">
                                <button className="btn btn-lg btn-secondary m-1 " onClick={this.props.onEdit}>Edit</button>
                                <button className="btn btn-lg btn-danger " onClick={this.props.onDel}>Delete</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>



        )
    }
}