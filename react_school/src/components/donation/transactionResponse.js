import React, { Component } from 'react'
import { withRouter } from 'react-router'
import HeaderComponent from '../HeaderComponent'
import FooterComponent from '../FooterComponent'
import axios from 'axios'

class transactionResponse extends Component {
    componentDidMount(){
        console.log(window.location.href)
        let orderId=window.location.href.split("?")[1].split("&")[0].split("=")[1];
        let status=window.location.href.split("?")[1].split("&")[1].split("=")[1];
        if(orderId.startsWith("SCHL") && status==='CHARGED'){
            axios.get('http://localhost:6060/puthuyir/donate/paymentDonation/'+orderId+"/SUCCESS")
            .then(res=>{
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
                axios.post('http://localhost:5050/email/sendmail/school', emailPayload, { headers: headersPassing})
                .then(response => {
                    this.props.history.push({
                    pathname: '/donationPaymentConfirmation',
                    user: res.data,
                });
                });
            })
        }   
        else if(orderId.startsWith("TRST") && status==='CHARGED'){
            axios.get('http://localhost:6060/puthuyir/donate/trustDonation/trust/'+orderId+"/SUCCESS")
            .then(res=>{
                console.log(res.data)
                let emailPayload ={
                    from:'puthyiradminteam@putholi.com',
                    toEmailAddress:res.data.user.emailAddress,
                    name:res.data.user.firstName + res.data.user.lastName,
                    yourContirbutionAmount: res.data.amount,
                    subject:'Your registration is success'
                }
                const headersPassing = {
                    'Content-Type': 'application/json',
                }
                console.log(emailPayload);
                axios.put('http://localhost:6060/puthuyir/updateUser/'+res.data.user.userid+"/NewUser")
                axios.post('http://localhost:5050/email/sendmail/trust', emailPayload, { headers: headersPassing})
                .then(response => {
                    this.props.history.push({
                        pathname: '/confirmation'
                    });
                });
            })
        }   
        else if(orderId.startsWith("SCHL")){
            axios.get('http://localhost:6060/puthuyir/donate/paymentDonation/'+orderId+"/FAILURE")
            .then(res=>{
                console.log(res.data)
                window.alert("Payment failed due to "+status)
                this.props.history.push({
                    pathname: '/index'
                })
            })
        }
        else if(orderId.startsWith("TRST")){
            axios.get('http://localhost:6060/puthuyir/donate/trustDonation/trust/'+orderId+"/FAILURE")
            .then(res=>{
                console.log(res.data)
                window.alert("Payment failed due to "+status)
                this.props.history.push({
                    pathname: '/index'
                })
            })
        }
    }
    render() {
        return (
            <div>
                 <div className="page_container" style={{textAlign:"center"}}>
                    <div className="breadcrumb">
                    <div className="wrap">
                        <div className="container">
                        <h2>Thanks &amp; Appreciate for your contributions.</h2><br/><h3>Please wait until the transaction gets processed</h3>
                        </div>
                    </div>
                    </div>
                    <div class="spinner"></div>
                </div>
            </div>
        )
    }
}
export default withRouter(transactionResponse);