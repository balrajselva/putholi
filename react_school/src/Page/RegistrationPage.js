import React, { Component } from 'react';
import '../css/prettyPhoto.css';
import '../css/camera.css';
import '../css/bootstrap.css';
import '../css/theme.css';
import '../css/bootstrap-responsive.css';
import '../css/skins/tango/skin.css';
import '../css/Page_CSS/IndexPage.css';
import {withRouter} from 'react-router-dom';
import LoginModal from "react-login-modal-sm";
import axios from 'axios';
import UserDetailsForm from '../contact_form/UserDetailsForm';


class RegistrationPage extends Component {
    state = {
        showModal: true,
        user:{
            firstName:"",
            lastName:"",
            gender:"",
            address:{
                addressLine_1:"",
                addressLine_2:"",
                pincode:"",
                locality:"",
                district:"",
                city:"",
                state:"",
                country:"",
            },
            role:"",
            emailAddress:"",
            phoneNumber:"",
            identityProof:"",
            comments:"",
            password:"",
        },
        userDetailsForm:false,
        spinner:false
        };
    toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
    };
    
    handleLoginWithFacebook = () => {
    console.log("Login with Facebook...");
    };

    handleSignupByEmail = (email, username, password) => {
        this.setState({
            user:{
                ...this.state.user,
                firstName:username,
                emailAddress:email,
                password:password,
            },
            userDetailsForm:true,
            showModal:false
        })
        
    };
    saveUser=(updatedUser)=>{
        this.setState({user:updatedUser,spinner:true});
        axios.post('http://localhost:6060/puthuyir/user',updatedUser)
        .then(res=>{
            console.log(res);
            this.props.history.push({
                pathname: '/confirm',
                user: res.data
            });
        })
    }
    handleSubmit=(email, password)=>{
        console.log(password);
        let user={
            emailAddress:email,
            password:password
        }
        axios.post('http://localhost:6060/puthuyir/verify_user',user)
        .then(res=>{
            console.log(res);
            if(res.data.status === "ApprovedUser" && res.data.role==="beneficiary"){
                this.props.history.push({
                    pathname: '/schoolRegistration',
                    user: res.data
                });
            }
            else if(res.data.status !== "ApprovedUser" && res.data.role==="beneficiary"){
                this.props.history.push({
                    pathname: '/confirm'
                });
            }
            else{
                window.alert("Please provide valid credentials");
            }
        })
    }
    render() {
        return (
            <div>
                <LoginModal showModal={this.state.showModal} 
                    toggleModal={this.toggleModal} 
                    onLoginFacebook={this.handleLoginWithFacebook}
                    onSignupEmail={this.handleSignupByEmail}
                    onLoginEmail={this.handleSubmit}
                    emailRegex={/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/}
                />
                {
                    this.state.userDetailsForm?<UserDetailsForm {...this.props} user={this.state.user} saveUser={(user)=>this.saveUser(user)}/>:null
                }
                {this.state.spinner?<div class="spinner" ></div>:null}
            </div>
        );
    }
}

export default withRouter(RegistrationPage);