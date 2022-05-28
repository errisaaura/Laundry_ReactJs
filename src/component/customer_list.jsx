
import React from "react";

export default class CustList extends React.Component{
    render(){
        return(
            <div className="card col-sm-12 my-1">
                <div className="card-header row">
                <div className="card card-danger">
                  <div className="card-header col-sm-11 my-2" >
                    <h4>Customer/Member</h4>
                    <div className="card-header-action">
                      <div className="dropdown m-3 btn-lg">
                        <a href="#" data-toggle="dropdown" className="btn btn-warning dropdown-toggle btn-lg">Options</a>
                        <div className="dropdown-menu">
                          
                          <a href="#" className="dropdown-item has-icon" onClick={this.props.onEdit}><i className="far fa-edit"></i> Edit</a>
                          <div className="dropdown-divider"></div>
                          <a href="#" className="dropdown-item has-icon text-danger" onClick={this.props.onDel}><i className="far fa-trash-alt"></i> Delete</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body row">
                  <div className="col-sm-3 ">
                    
                    <a href="#">
                      <img alt="image" src="../assets/img/avatar/avatar-5.png" class="rounded-circle mb-3 ml-5" width="140" data-toggle="title" title="" /> 
                    </a>
                        
                    </div>
                    <div className="col-sm-9">
                    
                        <h5><b>Name : {this.props.name}</b></h5>
                        <h6>Gender : {this.props.gender}</h6>
                        <h6>Phone : {this.props.phone}</h6>
                    </div>
                    
                  </div>
                </div>
                
                </div>

            </div>
        )
    }
}