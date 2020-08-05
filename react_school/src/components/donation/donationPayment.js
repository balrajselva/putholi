import React, { Component } from 'react';
import { withRouter, Router, MemoryRouter } from 'react-router-dom';
import axios from "axios";
class DonationPayment extends Component {
  state={
    processingFee:null,
    adjustableAmount:null,
    spinner:true
  }
  constructor(props) {
    super(props);
    this.submitClick = this.submitClick.bind(this);
  }

  componentDidMount(){
    axios.get(this.props.config+"/getProcessingFee")
    .then(response=>{
      axios.get(this.props.config+"/getAdjustableAmount")
      .then(response1=>{
        this.setState({
          processingFee:response.data,
          adjustableAmount:response1.data,
          spinner:false
        })
      })
    })
    .catch(error=>{
      this.setState({spinner:false})
      window.alert("Unable to fetch the processing fee due to "+error);
      window.alert("Please contact administrator");
      this.props.history.push("/index");
    })
  }

  submitClick = (e) => {
    this.setState({spinner:true})
    let orderId = "SCHL"+new Date().getTime();
    let projectPayload = {
      project: {
        projectId: this.props.history.location.user.projectId
      }
    };
    let donationUserIdPL = null;
    console.log(this.props.history.location.user)
    if(this.props.history.location.user.donationuserid!==undefined && this.props.history.location.user.donationuserid !== null){
      donationUserIdPL = {
        donationUser: {
          donationuserid: this.props.history.location.user.donationuserid
        }
      }
    }
    else if(this.props.history.location.user.donationOrgId !== undefined && this.props.history.location.user.donationOrgId !== null){
      donationUserIdPL = {
        donationOrg: {
          donationOrgId: this.props.history.location.user.donationOrgId
        }
      }
    }
    console.log(donationUserIdPL)

    let paymentUserPayload = {
      amount: Math.round(Number(this.props.history.location.user.contribution) - (Number(this.props.history.location.user.contribution)*Number(this.state.processingFee))),
      paymentStatus: 'PENDING',
      paymentMode: 'CASH'
    };

    //To create order for bank processing
    let paymentPayload = {
      order_id:orderId,
      amount:this.props.history.location.user.contribution,
    }

    let schoolPayload={
      school:{
        schoolId: this.props.history.location.user.schoolId
      }
    }

let projectUpdatePayload = {}
var finalCollectedAmount = Number(Math.round(Number(this.props.history.location.user.contribution) - (Number(this.props.history.location.user.contribution)*Number(this.state.processingFee)))) + Number(this.props.history.location.user.ContributionAmount);
  console.log(Number(this.props.history.location.user.estimate)-Number(this.props.history.location.user.ContributionAmount) === Number(this.props.history.location.user.contribution))
  console.log(this.props.history.location.user.estimate,this.props.history.location.user.ContributionAmount,this.props.history.location.user.contribution,this.state.adjustableAmount)
  console.log((Number(this.props.history.location.user.contribution)*Number(this.state.processingFee))<Number(this.state.adjustableAmount))
    if((Number(this.props.history.location.user.estimate)-Number(this.props.history.location.user.ContributionAmount) === Number(this.props.history.location.user.contribution)) && (Number(this.props.history.location.user.contribution)*Number(this.state.processingFee))<=Number(this.state.adjustableAmount)){
      projectUpdatePayload={
        projectId: this.props.history.location.user.projectId,
        estimate: this.props.history.location.user.estimate,
        collectedAmount: finalCollectedAmount,
        status:'PROJECT_COMPLETED',
        adjustableAmount:Number(this.props.history.location.user.contribution)*Number(this.state.processingFee),
        isSchoolReadyForAllotment:"Y"
      }
    }
    else if ((Number(Math.round(Number(this.props.history.location.user.contribution) - (Number(this.props.history.location.user.contribution)*Number(this.state.processingFee)))) < Number(this.props.history.location.user.collectedAmount))) {
      projectUpdatePayload={
          projectId: this.props.history.location.user.projectId,
          estimate: this.props.history.location.user.estimate,
          collectedAmount: finalCollectedAmount,
          status:'PROJECT_INCOMPLETED'
      }
    }
    else{
      projectUpdatePayload={
          projectId: this.props.history.location.user.projectId,
          estimate: this.props.history.location.user.estimate,
          collectedAmount: finalCollectedAmount,
          status:'PROJECT_COMPLETED'
      }
    }
    let orderIdPayload={
      orderId:orderId
    }

    var donationUserPayload = Object.assign(projectPayload, donationUserIdPL, paymentUserPayload,orderIdPayload,schoolPayload,projectUpdatePayload);
    console.log(donationUserPayload)
    axios.post(this.props.config+'/donate/paymentDonation', donationUserPayload, { headers: { 'Accept': 'application/json' } })
    .then(response => {
      console.log(response) 
        axios.post('http://localhost:7070/payment/orders', paymentPayload)
        .then(response => {
          console.log(response)
          if(response.data==="api.juspay.in"){
            window.alert("Facing network issue. Please contact admin.")
          }       
          else{
            window.open(response.data.webLink,"width=200,height=200")  
          }
          this.props.history.push("/index");
        })
        .catch(error=>{
          if(error.message==="api.juspay.in"){
            window.alert("Facing network issue. Please contact admin.")
          }
        })
    })
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
                              {this.props.history.location.user.emailAddress!==undefined?this.props.history.location.user.emailAddress:this.props.history.location.user.orgEmail}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <lable>Donor Phone Number
                              </lable></td>
                            <td>
                              {this.props.history.location.user.phoneNumber!==undefined?this.props.history.location.user.phoneNumber:this.props.history.location.user.orgContact}
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
                              <lable>Donor Type
                            </lable></td>
                            <td>
                              {this.props.history.location.user.donarType}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <lable>Donoted Amount details
                            </lable></td>
                            <td>
                              Total Donated Amount : <b>{this.props.history.location.user.contribution} INR</b><br/>
                              Amount to School : <b>{Math.round(Number(this.props.history.location.user.contribution) - (Number(this.props.history.location.user.contribution)*Number(this.state.processingFee)))} INR</b><br/>
                              Bank Processing Fee (<b>{(Number(this.state.processingFee)*100).toFixed(2)}%</b>): <b>{Math.round(Number(this.props.history.location.user.contribution)*Number(this.state.processingFee))} INR</b>
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
                  {this.state.spinner?<div class="spinner"></div>:null}
                  <h3><button onClick={this.submitClick}>Link to Payment Gateway</button></h3>
                  <a className="btn dark_btn" href="/donation">Back to Search Results</a>
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