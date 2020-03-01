import React, { Component } from 'react'
import { withRouter } from 'react-router'
import HeaderComponent from '../HeaderComponent'
import FooterComponent from '../FooterComponent'
import axios from 'axios'

class transactionResponse extends Component {
    componentDidMount(){
        console.log(window.location.href)
        let orderId=window.location.href.split("?")[1].split("&")[0].split("=")[1];
        axios.get('http://localhost:6060/puthuyir/donate/paymentDonation/'+orderId)
        .then(res=>{
            console.log(res.data)
            let emailPayload ={
                from:'puthyiradminteam@putholi.com',
                toEmailAddress:res.data.donationUser.emailAddress,
                name:res.data.donationUser.firstName + res.data.donationUser.lastName,
                yourContirbutionAmount: res.data.amount,
                subject:'Thanks !!! Your Tracking Id:'+ res.data.tracking_id,
                trackId:res.data.tracking_id,
                schoolName :res.data.school.schoolInfo.schoolName
              }
              const headersPassing = {
                'Content-Type': 'application/json',
              }
              console.log(emailPayload);
              axios.post('http://localhost:5050/email/sendmail', emailPayload, { headers: headersPassing})
              .then(response => {
                console.log(response)
                this.props.history.push({
                  pathname: '/donationPaymentConfirmation',
                  user: res.data,
              });
            });
        })
    }
    render() {
        return (
            <div>
                 <HeaderComponent {...this.props}/>
                 <div className="page_container">
                    <div className="breadcrumb">
                    <div className="wrap">
                        <div className="container">
                        <h2>Thanks &amp; Appreciate for your contributions.</h2><br/><h3>Please wait until the transaction gets processed</h3>
                        </div>
                    </div>
                    </div>
                </div>
                <FooterComponent {...this.props}/>
            </div>
        )
    }
}
export default withRouter(transactionResponse);