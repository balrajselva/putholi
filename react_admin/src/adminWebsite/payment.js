import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class payment extends Component {
    state={
        registrationFee:null,
        spinner:false
    }

    componentDidMount(){
        axios.get("http://localhost:6060/puthuyir/trustMemberRegistration")
        .then(res=>{
          let resp=res.data;
          console.log(resp);
          this.setState({
              registrationFee:res.data,
              spinner:false
          })
        })
        .catch(error=>{
          window.alert("Sorry for inconvinience.Could not proceed due to "+error +"Please try again");
        })
    }

    payment=(e)=>{
        e.preventDefault();
        this.setState({spinner:true})
        let orderId = "TRST"+new Date().getTime();
        let paymentPayload = {
            order_id:orderId,
            amount:this.state.registrationFee
        }
        console.log(paymentPayload)
        let donationUserPayload={
          orderId: orderId,
          user:this.props.location.currentUser,
          amount:this.state.registrationFee
        }
        axios.post('http://localhost:6060/puthuyir/donate/trustDonation', donationUserPayload, { headers: { 'Accept': 'application/json' } })
        .then(response=>{
          axios.post('http://localhost:7070/payment/orders', paymentPayload)
          .then(response => {
              console.log(response)
            window.open(response.data.webLink,"width=200,height=200")         
            this.props.history.push("/login");
          });
       });
    }

    render() {
        return (
            <body className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                  <a href=""><b>Putholi</b></a>
                </div>
                {this.state.registrationFee!==null?(
                <div className="login-box-body">
                  <form>
                    <div className="form-group has-feedback">
                      <label for="name">Name</label>
                      <input type="text" className="form-control" placeholder="Name" id="name" value={this.props.location.currentUser.firstName} disabled/>
                      <span className="glyphicon glyphicon-envelope form-control-feedback" />
                    </div>
                    <div className="form-group has-feedback">
                      <label for="registrationFee">Registration Fee</label>
                      <input type="text" className="form-control" placeholder="Registration fee" id="registrationFee" value={this.state.registrationFee} disabled/>
                      <span className="glyphicon glyphicon-lock form-control-feedback" />
                    </div>
                    <div className="row">
                      {/* /.col */}
                      <div className=" col-md-12">
                        <button ref="submit_btn" className="btn btn-primary btn-block btn-flat" onClick={(e)=>this.payment(e)}>Procced to Payment</button>
                      </div>
                    </div>
                  </form>
                </div>):null}
                {this.state.spinner?<div class="spinner"></div>:null}
              </div>
              </body>
        )
    }
}
export default withRouter(payment);