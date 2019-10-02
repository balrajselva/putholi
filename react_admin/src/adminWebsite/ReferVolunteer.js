import React, { Component } from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SponsorMenu from './components/menu/SponsorMenu';
import SmallBoxCard from './components/smallBoxCard/SmallBoxCard';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { thisExpression } from '@babel/types';

class ReferVolunteer extends Component {
    state={
        sponsor:this.props.location.user,
        pincode:null,
        locality:null,
        selectedLocality:null,
        district:null,
        city:null,
        state:null,
        country:null,
        createLocalityDropDown:false,
        spinner:false,
        lastErrorField:null,
        errorMessage:null,
        referalEmails:null,
        url:null
    }
    createURL=()=>{
        console.log(this.state.referalEmails);
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr('myTotalySecretKey');
        
        const encryptedName = cryptr.encrypt(this.state.sponsor.firstName);
        const encryptedEmail =cryptr.encrypt(this.state.sponsor.emailAddress);
        const url1 = "http://localhost:3000/volunteerRegister?"+encryptedName+"&"+encryptedEmail;
        this.setState({url:url1});
        if(this.state.pincode===null){
            this.setState({
                lastErrorField:"pincode",
                errorMessage:"Please enter pincode"
            });
            document.getElementById('pincode').style.borderColor="red";
        }
        else if(this.state.selectedLocality===null){
            this.setState({
                lastErrorField:"selectedLocality",
                errorMessage:"Please select locality"
            });
            document.getElementById('selectedLocality').style.borderColor="red";
        }
        else if(this.state.state===null){
            this.setState({lastErrorField:"state"});
            document.getElementById('state').style.borderColor="red";
        }
        else if(this.state.city===null){
            this.setState({lastErrorField:"city"});
            document.getElementById('city').style.borderColor="red";
        }
        else if(this.state.district===null){
            this.setState({lastErrorField:"district"});
            document.getElementById('district').style.borderColor="red";
        }
        else if(this.state.country===null){
            this.setState({lastErrorField:"country"});
            document.getElementById('country').style.borderColor="red";
        }
        else if(this.state.referalEmails===null){
            this.setState({lastErrorField:"referalEmails"});
            document.getElementById('referalEmails').style.borderColor="red";
        }
        else{
            this.setState({spinner:true})
            document.getElementById('pincode').style.borderColor="#d2d6de";
            document.getElementById('selectedLocality').style.borderColor="#d2d6de";
            document.getElementById('state').style.borderColor="#d2d6de";
            document.getElementById('city').style.borderColor="#d2d6de";
            document.getElementById('district').style.borderColor="#d2d6de";
            document.getElementById('country').style.borderColor="#d2d6de";
            document.getElementById('referalEmails').style.borderColor="#d2d6de";
            const volunteers={
                address:{
                    addressLine1:this.state.addressLine_1,
                    addressLine2:this.state.addressLine_2,
                    pinCode:this.state.pincode,
                    locality:this.state.selectedLocality,
                    district:this.state.district,
                    city:this.state.city,
                    state:this.state.state,
                    country:this.state.country,
                },
                referalEmails:this.state.referalEmails,
                sponsorName:this.state.sponsor.firstName,
                sponsorEmail:this.state.sponsor.emailAddress
            }
            axios.post("http://localhost:6060/puthuyir/admin/volunteerReferals",volunteers)
            .then(res=>{
                if(res.status==200){
                    window.alert("Data saved successfully!");
                    this.setState({
                        pincode:"",
                        locality:null,
                        selectedLocality:null,
                        district:"",
                        city:"",
                        state:"",
                        country:"",
                        createLocalityDropDown:false,
                        spinner:false,
                        lastErrorField:null,
                        errorMessage:null,
                        referalEmails:""
                    })
                }
            })
        }
    }
    handleChange=({target})=>{
        document.getElementById(target.id).style.borderColor="#d2d6de";
        this.setState({ 
            [target.id]: target.value , 
            lastErrorField:null,
            errorMessage:""
        });
        if(target.id==="pincode" && target.value.length===6){
            this.setState({spinner:true});
            axios.get("https://api.postalpincode.in/pincode/"+target.value)
            .then(res=>{
                console.log(res);
                if(res.data[0].Message==="No records found"){
                    this.setState({
                        spinner:false,
                        errorMessage:"Please enter valid Pincode or enter address manually."
                    })
                }
                else{                    
                    this.setState({
                        locality:res.data[0].PostOffice,
                        city:res.data[0].PostOffice[0].Division,
                        district:res.data[0].PostOffice[0].District,
                        state:res.data[0].PostOffice[0].State,
                        country:res.data[0].PostOffice[0].Country,
                        createLocalityDropDown:true,
                        spinner:false
                    });
                }
            })
        }
    }
    currentPincode=()=>{
        if(this.state.pincode!=null&&this.state.pincode.length!=6){
            this.setState({pinCode:""});
            document.getElementById("pincode").value="";
        }
    }
    render() {
        return (
            <div>
                <Header currentUser={this.props.location.user}/>
                <SponsorMenu currentUser={this.props.location.user}/>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                        {/* Small boxes (Stat box) */}
                        <div className="row">
                            <SmallBoxCard content="Sponsor" linkTo="/sponsor" colour="bg-green"/>
                            {/* ./col */}
                            <SmallBoxCard content="Inbox" linkTo="/volunteer" colour="bg-yellow"/>
                            {/* ./col */}
                            <SmallBoxCard content="Logout" linkTo="/reviewer" colour="bg-red"/>{/* ./col */}
                        </div>
                        <h1>
                        Sponsor
                        <small>screen</small>
                        </h1>
                    </section>
                    {/* Main content */}
                    <section className="content">
                        {/* Small boxes (Stat box) */}
                        {/* /.row */}
                        {/* Main row */}
                        <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                            <div className="box-header">
                                <h3 className="box-title">Refer volunteer</h3>
                            </div>
                            {/* /.box-header */}
                            <div className="box-body">
                            <div className="row">
                                <div className="form-group has-feedback col-md-6">
                                    <input type="text" className="form-control" id="pincode" placeholder="Pincode" onChange={this.handleChange} onPointerLeave={()=>this.currentPincode()}/>
                                    <span className="glyphicon glyphicon-home form-control-feedback" />
                                </div>
                                <div className="form-group has-feedback col-md-6">
                                    <select className="form-control select2" id="selectedLocality" value={this.state.selectedLocality} onChange={this.handleChange} style={{width: '100%'}}>
                                        <option selected="selected">Select Locality</option>
                                        {this.state.createLocalityDropDown?this.state.locality.map((locality) => <option key={locality.Name} value={locality.Name}>{locality.Name}</option>):null}
                                    </select>
                                    <span className="glyphicon glyphicon-home form-control-feedback" onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group has-feedback col-md-6">
                                    <input type="text" className="form-control" id="city" value={this.state.city} placeholder="City" onChange={this.handleChange}/>
                                    <span className="glyphicon glyphicon-home form-control-feedback" />
                                </div>
                                <div className="form-group has-feedback col-md-6">
                                    <input type="text" className="form-control" id="district" value={this.state.district} placeholder="District" onChange={this.handleChange}/>
                                    <span className="glyphicon glyphicon-home form-control-feedback" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group has-feedback col-md-6">
                                    <input type="text" className="form-control" id="state" value={this.state.state} placeholder="State" onChange={this.handleChange}/>
                                    <span className="glyphicon glyphicon-home form-control-feedback" />
                                </div>
                                <div className="form-group has-feedback col-md-6">
                                    <input type="text" className="form-control" id="country" value={this.state.country} placeholder="Country" onChange={this.handleChange}/>
                                    <span className="glyphicon glyphicon-home form-control-feedback" />
                                </div>
                            </div>
                            <div className="input-group">
                                <span className="input-group-addon">Enter Email id's</span>
                                <textarea className="form-control" rows={3} placeholder="Enter email id's" defaultValue={""} id="referalEmails" value={this.state.referalEmails} onChange={this.handleChange} />
                                </div>
                                <div className="input-group">
                                <br />
                                {this.state.errorMessage!=null?<div className="errorMessage" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}
                                <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#modal-warning">
                                    Cancel
                                </button>&nbsp;
                                <button type="button" onClick={()=>this.createURL()} className="btn btn-success" data-toggle="modal" data-target="#modal-success">
                                    Send Email to contacts
                                    </button>
                                </div>
                            </div>
                            {this.state.url!=null?<div>{this.state.url}</div>:null}
                            {/* /.box-body */}
                            </div>
                            {/* /.box */}
                        </div>
                        </div>
                        {/* /.row (main row) */}
                    </section>
                    {/* /.content */}
                    </div>
                    {this.state.spinner?<div class="spinner"></div>:null}
                <Footer/>
            </div>
        );
    }
}

export default withRouter(ReferVolunteer);