import React, { Component } from 'react';
import '../css/prettyPhoto.css';
import '../css/camera.css';
import '../css/bootstrap.css';
import '../css/theme.css';
import '../css/bootstrap-responsive.css';
import '../css/skins/tango/skin.css';
import '../css/Page_CSS/IndexPage.css';
import HeaderComponent from '../components/HeaderComponent.js';
import FooterComponent from '../components/FooterComponent';
import {withRouter} from 'react-router-dom';
import LoginModal from "react-login-modal-sm";
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserDetailsForm from '../contact_form/UserDetailsForm';
import RegisterForm from '../components/registerForm/registerForm';


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
        userDetailsForm:false
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
        this.setState({user:updatedUser});
        axios.post('http://localhost:6060/puthuyir/user',updatedUser)
        .then(res=>{
            console.log(res);
        })
    }
    render() {
        return (
            <div>
                <LoginModal showModal={this.state.showModal} 
                    toggleModal={this.toggleModal} 
                    onLoginFacebook={this.handleLoginWithFacebook}
                    onSignupEmail={this.handleSignupByEmail}
                />
                {
                    this.state.userDetailsForm?<UserDetailsForm user={this.state.user} saveUser={(user)=>this.saveUser(user)}/>:null
                }
                {this.state.progressVisible?window.alert(<CircularProgress class="class"/>):null}
            </div>
        );
    }
}

export default withRouter(RegistrationPage);