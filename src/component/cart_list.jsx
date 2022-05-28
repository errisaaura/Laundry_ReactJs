
import React from "react"

export default class CartList extends React.Component {
    render() {
        return (
            
                <div class="col">
                    <div class="card h-100">
                        <img alt={this.props.nameImage} src={this.props.image} class="card-img-top" width="150" height="250"/>
                        <div class="card-body">
                            <h5 class="card-title">{this.props.nama}</h5>
                            <p class="card-text">Rp {this.props.price},-</p>
                        </div>

                        <div class="card-footer card text-center">
                                <div className="buttons">
                                    <a href="#" className="btn btn-icon icon-left btn-lg btn-primary rounded-pill" onClick={this.props.onCart}><i className="fas fa-cart-arrow-down"></i>Add To Cart</a>                                                                        
                                </div>
                        </div>
                    </div>
                </div>
           
        )
    }
}