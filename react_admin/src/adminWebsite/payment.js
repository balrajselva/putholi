import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class payment extends Component {
    state={
        totalAmount:null,
        registrationFee:null,
        processingFee:null,
        interest:null,
        spinner:false
    }

    componentDidMount(){
      let totalAmount = null;
      let processingFee = null;
      let registrationFee = null;
        axios.get(this.props.config+"/trustMemberRegistration")
        .then(res=>{
          totalAmount = res.data;
          axios.get(this.props.config+"/getProcessingFee")
            .then(response=>{
              processingFee = Math.round(Number(totalAmount) * Number(response.data));
              registrationFee = Math.round(Number(totalAmount) - Number(processingFee))
              this.setState({
                interest:response.data,
                totalAmount:totalAmount,
                processingFee:processingFee,
                registrationFee:registrationFee,
                spinner:false
              })
            })
            .catch(error=>{
              this.setState({spinner:false})
              window.alert("Unable to fetch the processing fee due to "+ error);
              window.alert("Please contact administrator");
              this.props.history.push("/trustRegister");
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
            amount:this.state.totalAmount
        }
        console.log(paymentPayload)
        let donationUserPayload={
          orderId: orderId,
          user:this.props.location.currentUser,
          amount:this.state.registrationFee
        }
        axios.post(this.props.config+'/donate/trustDonation', donationUserPayload, { headers: { 'Accept': 'application/json' } })
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
                      <span className="glyphicon glyphicon-user form-control-feedback" />
                    </div>
                    <div className="form-group has-feedback">
                      <label for="registrationFee">Total Amount</label>
                      <input type="text" className="form-control" placeholder="Total Amount" id="totalAmount" value={this.state.totalAmount+" INR"} disabled/>
                      <span className="glyphicon glyphicon-euro form-control-feedback" />
                    </div>
                    <div className="form-group has-feedback">
                      <label for="registrationFee">Registration Fee</label>
                      <input type="text" className="form-control" placeholder="Registration fee" id="registrationFee" value={this.state.registrationFee+" INR"} disabled/>
                      <span className="glyphicon glyphicon-euro form-control-feedback" />
                    </div>
                    <div className="form-group has-feedback">
                      <label for="registrationFee">Bank Processing Fee {(Number(this.state.interest)*100).toFixed(2)} %</label>
                      <input type="text" className="form-control" placeholder="Bank Processing Fee" id="bankProcessingFee" value={this.state.processingFee+" INR"} disabled/>
                      <span className="glyphicon glyphicon-euro form-control-feedback" />
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