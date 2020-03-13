import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from "axios";

class DonationPayment extends Component {
  constructor(props) {
    super(props);
    this.submitClick = this.submitClick.bind(this);
  }

  submitClick = (e) => {
    let orderId = new Date().getTime();
    let paymentPayload = {
      order_id:orderId,
      amount:this.props.history.location.user.contribution,
    }
    axios.post('http://localhost:7070/payment/orders', paymentPayload)
    .then(response => {
        console.log(response)
        window.open(response.data.webLink,"width=200,height=200")         
        this.props.history.push("/index");
    });
    this.props.saveUser(this.pr);
  }
  
  render() {
      console.log(this.props);
    const requirements = this.props.history.location.user.requirements;
    return (
      <div className="page_container">
        <div className="breadcrumb">
          <div className="wrap">
            <div className="container">
              <a href="index.html">Summary before </a><span>/</span>3rd Party Site(Payment Gateway)
                </div>
          </div>
        </div>
        <div className="wrap">
          <div className="container">
            <section>
              <div className="row">
                <div className="span12">
                  <div className="row">
                    <div className="span10">
                      <h2>Thanks &amp; Appreciate for your contributions.</h2><h3>Summary of Payment details</h3><table class="table table-bordered table-striped">
                        <colgroup>
                          <col className="span3"></col>
                          <col className="span7"></col>
                        </colgroup>
                        <tbody>
                          <tr>
                            <td>
                              <lable>Donor First Name
                            </lable></td>
                            <td>
                              {this.props.history.location.user.firstName}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <lable>Donor Last Name
                            </lable></td>
                            <td>
                              {this.props.history.location.user.lastName}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <lable>Donor Email ID
                            </lable></td>
                            <td>
                              {this.props.history.location.user.emailAddress}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <lable>Donor Phone Number
                              </lable></td>
                            <td>
                              {this.props.history.location.user.phoneNumber}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <lable>School Name
                            </lable></td>
                            <td>
                              {this.props.history.location.user.schoolName}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <lable>Donoted Amount
                            </lable></td>
                            <td>
                              {this.props.history.location.user.contribution}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <lable>Requirements Description
                            </lable></td>
                            <td>
                              {requirements.map((value, index) =>
                                <li>Needs {value.quantity} {value.assetName}</li>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <h3><button onClick={this.submitClick}>Link to Payment Gateway</button></h3>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

}

export default withRouter(DonationPayment);