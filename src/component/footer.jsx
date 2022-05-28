
import React from 'react';

export default class Footer extends React.Component{
    render(){
        return(
<footer class="main-footer">
        <div class="footer-left">
          Copyright &copy; 2022 <div class="bullet"></div> Design with <span class="text-danger"><i class="far fa-heart"></i></span> <span class="text-warning"><i class="far fa-heart"></i></span> <i class="far fa-heart"></i> 
        </div>
        <div class="footer-right">
          2.3.0
        </div>
      </footer>
        )
    }
}