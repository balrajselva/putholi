import React, { Component, useImperativeHandle } from 'react';
import { withRouter } from 'react-router-dom';
import '../registerForm/registerForm.css';
import '../../../src/css/School_registration.css';
import axios from "axios";

class DonationForm extends Component {

  constructor(props) {
    super(props);
    this.registeredUserEvent = this.registeredUserEvent.bind(this);
    this.submitClicked = this.submitClicked.bind(this);
    this.state = {
      isRegisteredUser: 'none',
      isAlreadyRegistered: 'block',
      isDonorRegistered: 'none',
      isAlreadyDonorRegistered: 'block',
      isOrganizationalDonation: 'none',
      isIndividualDonation: 'block',
      isRegisteredOrg: 'none',
      isNewOrg: 'none',
      estimatedTotalAmt: null,
      collectedAmount: null,
      contributeLimit: null,
      contribution: null,
      contributionError: "",
      loginCredentialError: '',
      username: null,
      usernameError: '',
      password: null,
      passwordError: '',
      passwordOption: null,
      firstName: null,
      firstNameError: '',
      lastName: null,
      lastNameError: '',
      phoneNumber: null,
      phoneNumberError: '',
      email: null,
      emailError: '',
      isClicked: "1",
      isIndivClicked: "1",
      isRegisteredClicked: "1",
      isOrgClicked:null,
      userLogin: [],
      emailFlag: '',
      LoginInforValidation: '',
      orgName:null,
      orgAddress:null,
      orgCountry:null,
      orgEmail:null,
      orgNumber:null,
      orgRegNum:null,
      orgRole:null,
      orgType:null,
      orgFirstName:null,
      orgLastName:null,
      entityType:null,
      haveBranchInOtherCountries:null,
      password:null,
      confirmPassword:null,
      errorMessage:null,
      lastErrorField:null,
      ismoneyInRupeesClicked:"1"
    }
  }

  submitClicked = (e) => {
    e.preventDefault();
    const { userLogin: [] } = this.state;
    const data = new FormData(e.target);
    const isValid = this.validate(data);
    let params = {};
    let flagOption = "";
    let requestJSON = {};

    if (this.state.isClicked === "1") {
      params = {
        emailAddress: data.get('username'),
        password: data.get('password'),
      }
      let requestJSON =
      {
        "contribution": data.get('contribution'),
        "schoolName": this.props.history.location.state.state[0].schoolInfo.schoolName,
        "schoolId" :this.props.history.location.state.state[0].schoolId,
        "projectId": this.props.history.location.state.state[0].projects[0].projectId,
        "estimate" : this.props.history.location.state.state[0].projects[0].estimate,
        "collectedAmount":data.get('yourContribution'),
        "ContributionAmount" :this.props.history.location.state.state[0].projects[0].collectedAmount,
        "requirements": this.props.history.location.state.state[0].projects[0].requirements
      }

      if (isValid) {
        axios.post(this.props.config+'/donate/findDonationUser', params, { headers: { 'Accept': 'application/json' } })
          .then((response) => {
            if (response.data.emailAddress === "email") {
              this.setState({
                loginCredentialError: 'Please Enter registered Username and Credentials'
              });
            } else {
              this.setState({
                loginCredentialError: ''
              });
              var requestPayload = Object.assign(requestJSON, response.data);
              this.props.history.push({
                pathname: '/donationPayment',
                user: requestPayload,
              });
            }
          });
      }
      flagOption = "1";
    }
    if (this.state.isClicked === "2") {
      let requestJSON =
      {
        "contribution": data.get('contribution'),
        "schoolName": this.props.history.location.state.state[0].schoolInfo.schoolName,
        "schoolId" :this.props.history.location.state.state[0].schoolId,
        "projectId": this.props.history.location.state.state[0].projects[0].projectId,
        "estimate" : this.props.history.location.state.state[0].projects[0].estimate,
        "collectedAmount": data.get('yourContribution'),
        "ContributionAmount" :this.props.history.location.state.state[0].projects[0].collectedAmount,
        "requirements": this.props.history.location.state.state[0].projects[0].requirements
      }

      if (isValid) {
        let emailValidation = {
          emailAddress: data.get('email'),
        }
        axios.post(this.props.config+'/donate/findByEmailId', emailValidation, { headers: { 'Accept': 'application/json' } })
          .then(response => {
            if (response.data !== null) {
              Object.assign(params,response.data)
            }
            console.log("Before loading", params);
            axios.post(this.props.config+'/donate/save', params, { headers: { 'Accept': 'application/json' } })
            .then((response) => {
              var requestPayload = Object.assign(requestJSON, response.data);
              this.props.history.push({
                pathname: '/donationPayment',
                user: requestPayload,
              });
            })
          })
      }
      flagOption = "2";
    }
    if (isValid) {
      this.setState({
        contributionError: "",
        userNameError: "",
        passwordError: "",
        emailError: "",
        firstNameError: "",
        lastNameError: "",
        phoneNumberError: ""
      });
      if (flagOption === "2") {
        if (this.state.isRegisteredClicked === "1") {
          params = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            emailAddress: data.get('email'),
            phoneNumber: data.get('phoneNumber'),
            password: data.get('passwordOption')
          }
        } else {
          console.log("Entreing into elso confidio");
          params = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            emailAddress: data.get('email'),
            phoneNumber: data.get('phoneNumber'),
            password: ''
          }
        }
      }
    }
  };

  handleChange=({target})=>{
    document.getElementById(target.id).style.borderColor="#d2d6de";
    this.setState({ 
        [target.id]: target.value , 
        lastErrorField:null,
        errorMessage:""
    });
  }

  validate = (data) => {
    let userNameError = "";
    let contributionError = "";
    let passwordError = "";
    let firstNameError = "";
    let lastNameError = "";
    let emailError = "";
    let phoneNumberError = "";
    if (data.get('contribution').length === 0) {
      contributionError = "Please enter Contribution Amount";
    }
    if (!(Number(data.get('yourContribution')) >= Number(data.get('contribution')))) {
      contributionError = `Your Contribution Amount not more than ${data.get('yourContribution')}`;
    }
    if (contributionError) {
      this.setState({
        contributionError,
      });
      return false;
    }
    if (this.state.isClicked === "1") {
      if (data.get('username').length === 0) {
        userNameError = "Please enter the username";
      }
      else if (data.get('password').length === 0) {
        passwordError = "Please enter the password";
      }
      if (userNameError) {
        this.setState({
          userNameError,
        });
        return false;
      }
      if (passwordError) {
        this.setState({
          passwordError,
        });
        return false;
      }
      return true;
    }
    if (this.state.isClicked === "2") {
      if (data.get('firstName').length === 0) {
        firstNameError = "Please enter the firstName";
      }
      else if (data.get('lastName').length === 0) {
        lastNameError = "Please enter the SurName";
      }
      else if (data.get('phoneNumber').length === 0) {
        phoneNumberError = "Please enter the phoneNumber";
      }
      else if (data.get('email').length === 0) {
        emailError = "Please enter the email";
      }
      else if (data.get('email').length === 0) {
        emailError = "Please enter the email";
      }
      else if (this.state.isRegisteredClicked === "1" && data.get('passwordOption').length === 0) {
        passwordError = "Please enter the password";
      }
      if (firstNameError) {
        this.setState({
          firstNameError,
        });
        return false;
      }
      if (lastNameError) {
        this.setState({
          lastNameError,
        });
        return false;
      }
      if (phoneNumberError) {
        this.setState({
          lastNameError,
        });
        return false;
      }
      if (emailError) {
        this.setState({
          emailError,
        });
        return false;
      }
      if (passwordError) {
        this.setState({
          passwordError,
        });
        return false;
      }
    }
    return true;
  }

  calculateContribution() {
    return this.props.history.location.state.state[0].projects[0].estimate - this.props.history.location.state.state[0].projects[0].collectedAmount
  }

  registeredUserEvent(e) {
    if (e === "1") {
      this.setState({ isAlreadyRegistered: 'block' });
      this.setState({ isRegisteredUser: 'none' });
      this.setState({ isClicked: e })
    } else if (e === "2") {
      this.setState({ isRegisteredUser: 'block' });
      this.setState({ isAlreadyRegistered: 'none' });
      this.setState({ isClicked: e })
    } else {
      this.setState({ isRegisteredUser: 'none' });
      this.setState({ isAlreadyRegistered: 'none' });
      this.setState({ isClicked: null })
    }
  }

  registeredOrgEvent(e) {
    if (e === "1") {
      this.setState({ isRegisteredOrg: 'block' });
      this.setState({ isNewOrg: 'none' });
      this.setState({ isOrgClicked: e })
    } else if (e === "2") {
      this.setState({ isRegisteredOrg: 'none' });
      this.setState({ isNewOrg: 'block' });
      this.setState({ isOrgClicked: e })
    }
  }

  individualOrOrgEvent(e) {
    if (e === "Indiv") {
      this.setState({ isIndividualDonation: 'block' });
      this.setState({ isOrganizationalDonation: 'none' });
      this.setState({ isIndivClicked: "1" })
    } else if (e === "Org") {
      this.setState({ isIndividualDonation: 'none' });
      this.setState({ isOrganizationalDonation: 'block' });
      this.setState({ isIndivClicked: "0" })
    } else {
      this.setState({ isIndividualDonation: 'none' });
      this.setState({ isOrganizationalDonation: 'none' });
      this.setState({ isIndivClicked: null })
    }
  }

  moneyInRupeesEvent(e) {
    if (e === "1") {
      this.setState({ ismoneyInRupeesClicked: "1" })
    } else if (e === "0") {
      this.setState({ ismoneyInRupeesClicked: "0" })
    }
  }

  registeredDonorEvent(e) {
    if (e === "1") {
      this.setState({ isAlreadyDonorRegistered: 'block' });
      this.setState({ isDonorRegistered: 'none' });
      this.setState({ isRegisteredClicked: e })
    } else if (e === "2") {
      this.setState({ isDonorRegistered: 'block' });
      this.setState({ isAlreadyDonorRegistered: 'none' });
      this.setState({ isRegisteredClicked: e })
    } else {
      this.setState({ isDonorRegistered: 'none' });
      this.setState({ isAlreadyDonorRegistered: 'none' });
      this.setState({ isRegisteredClicked: null })
    }
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <div className="page_container">
          <div className="breadcrumb">
            <div className="wrap">
              <div className="container">
                Home/About
                </div>
            </div>
          </div>
          <div className="wrap">
            <div className="container">
              <section>
                <div className="span12">
                  <form onSubmit={this.submitClicked} className="form-horizontal">
                    <fieldset>
                      <legend>Appreciate your interest in Donating fund for development of the school. Please use the payment gateway to pay the fund</legend>
                      {/* style={{float:"right",border:"1px solid black",marginRight:"5%"}} */}
                      <div>
                      <div className="control-group">
                        <label className="control-label" for="disabledInput">School Name</label>
                        <div className="controls">
                          <input readOnly className="input disabled" id="disabledInput" type="text"
                            placeholder={this.props.history.location.state.state[0].schoolInfo.schoolName} disabled=""></input>
                        </div>
                      </div>
                      <div className="control-group">
                        <label className="control-label" for="disabledInput">Estimated Total Amount</label>
                        <div className="controls">
                          <input readOnly className="input disabled" id="disabledInput"
                            type="text" placeholder={this.props.history.location.state.state[0].projects[0].estimate} disabled=""></input>
                        </div>
                      </div>
                      <div className="control-group">
                        <label className="control-label" for="disabledInput">Collected Amount</label>
                        <div className="controls">
                          <input readOnly className="input disabled" id="disabledInput" name="collectedAmount" type="text" placeholder={this.props.history.location.state.state[0].projects[0].collectedAmount} disabled=""></input>
                        </div>
                      </div>
                      <div className="control-group">
                        <label className="control-label" for="disabledInput">You can contribute Upto</label>
                        <div className="controls">
                          <input readOnly className="input disabled" id="disabledInput" name="yourContribution" type="text"
                            placeholder={this.calculateContribution()} value={this.calculateContribution()}></input>
                        </div>
                      </div>
                      <div className="control-group">
                        <label className="control-label" for="disabledInput">Your Contribution in Rs</label>
                        <div className="controls">
                          <input className="form-control" name="contribution" id="contribution" value={this.state.contribution} type="text"
                            placeholder="" disabled="" ></input><span style={{ fontSize: 22, color: "red" }}>*</span>
                          <div style={{ fontSize: 12, color: "red" }}  >
                            {this.state.contributionError}
                          </div>
                        </div>
                      </div>
                      </div>
                      <h3>Donor Type</h3>
                          <input type="radio" class="bn22" name="bndontype" value="Indiv" style={{marginTop:"-3px"}} checked={this.state.isIndivClicked === "1"} onClick={e => this.individualOrOrgEvent(e.target.value)}/> Individual &nbsp;
                          <input type="radio" class="bn33" name="bndontype" value="Org" style={{marginTop:"-3px"}} checked={this.state.isIndivClicked === "0"} onClick={e => this.individualOrOrgEvent(e.target.value)}/> Organization   
                      <div style={{display:this.state.isIndividualDonation}}>                       
                      <h3>Already Registered Donor??</h3>
                          <input type="radio" class="bn2" name="bnReg" value="1" style={{marginTop:"-3px"}} checked={this.state.isClicked === "1"} onClick={e => this.registeredUserEvent(e.target.value)} /> Yes &nbsp;
                          <input type="radio" class="bn3" name="bnNotReg" value="2" style={{marginTop:"-3px"}} checked={this.state.isClicked === "2"} onClick={e => this.registeredUserEvent(e.target.value)} /> No
                        <div style={{ display: this.state.isAlreadyRegistered }}>
                        <div id="onebn">
                          <div style={{ fontSize: 12, color: "red" }}  >
                            {this.state.loginCredentialError}
                            {this.state.userNameError}
                            {this.state.passwordError}
                          </div>
                          </div>
                          <div className="control-group">
                          <label className="control-label" for="inputSuccess">User id / Email </label>
                          <div className="controls">
                            <input type="text" id="username" name="username" value={this.state.username}></input>
                          </div>
                          </div>
                          <div className="control-group">
                          <label className="control-label" for="inputSuccess">Password</label>
                          <div className="controls">
                            <input type="password" id="password" name="password" value={this.state.password}></input>
                          </div>
                          </div>
                        </div>
                      <div style={{ display: this.state.isRegisteredUser }}>
                        <div class="control-group success" id="multibn">
                          <label className="control-label" for="inputSuccess">First Name</label>
                          <div className="controls">
                            <input type="text" id="firstName" name="firstName" value={this.state.firstName}></input>
                            <div style={{ fontSize: 12, color: "red" }}  >
                              {this.state.firstNameError}
                            </div>
                          </div>
                        </div>
                        <div className="control-group success" id="multibn">
                          <label className="control-label" for="inputSuccess">Sur  Name</label>
                          <div className="controls">
                            <input type="text" id="lastName" name="lastName" value={this.state.lastName}></input>
                            <div style={{ fontSize: 12, color: "red" }}  >
                              {this.state.lastNameError}
                            </div>
                          </div>
                        </div>
                        <div className="control-group success" id="multibn">
                          <label className="control-label" for="inputSuccess">Email</label>
                          <div className="controls">
                            <input type="text" id="email" name="email" value={this.state.email}></input>
                            <div style={{ fontSize: 12, color: "red" }}  >
                              {this.state.emailError}
                            </div>
                          </div>
                        </div>
                        <div className="control-group success" id="multibn">
                          <label className="control-label" for="inputSuccess">Phone number</label>
                          <div className="controls">
                            <input type="text" id="phoneNumber" name="phoneNumber" value={this.state.phoneNumber}></input>
                            <span class="help-inline"></span>
                            <div style={{ fontSize: 12, color: "red" }}  >
                              {this.state.phoneNumberError}
                            </div>
                          </div>

                          <div className="control-group" id="multibn">
                            <h5>Select if you wish to be a Registered Donor</h5>
                            <div className="controls">
                              <label >
                                <input type="radio"  name="resgiteredYES" value="1" checked={this.state.isRegisteredClicked === "1"} onClick={e => this.registeredDonorEvent(e.target.value)} /> Yes
                              </label>
                              <label >
                                <input type="radio"  name="resgiteredNO" value="2" checked={this.state.isRegisteredClicked === "2"} onClick={e => this.registeredDonorEvent(e.target.value)} /> No
                              </label>
                            </div>
                          </div>
                          <div style={{ display: this.state.isAlreadyDonorRegistered }}>
                            <div className="control-group success" id="multibn">
                              <label className="control-label" for="inputSuccess">Password</label>
                              <div className="controls">
                                <input type="password" id="passwordOption" name="passwordOption" value={this.state.passwordOption}></input>
                                <div style={{ fontSize: 12, color: "red" }}  >
                                  {this.state.passwordError}
                                </div>
                              </div>
                            </div>
                          </div>
                          </div>
                          </div>
                          </div>
                          <div style={{ display: this.state.isOrganizationalDonation}}>
                          <br/>
                          <h3>Already Registered Organization??</h3>
                          <input type="radio" class="bn2" name="orgReg" value="1" style={{marginTop:"-3px"}} checked={this.state.isOrgClicked === "1"} onClick={e => this.registeredOrgEvent(e.target.value)} /> Yes &nbsp;
                          <input type="radio" class="bn3" name="orgNotReg" value="2" style={{marginTop:"-3px"}} checked={this.state.isOrgClicked === "2"} onClick={e => this.registeredOrgEvent(e.target.value)} /> No
                          </div>
                          <div style={{ display: this.state.isRegisteredOrg }}>
                        <div id="onebn">
                          <div style={{ fontSize: 12, color: "red" }}  >
                            {this.state.loginCredentialError}
                            {this.state.userNameError}
                            {this.state.passwordError}
                          </div>
                          </div>
                          <div className="control-group">
                          <label className="control-label" for="inputSuccess">Email </label>
                          <div className="controls">
                            <input type="text" id="username" name="username" value={this.state.username}></input>
                          </div>
                          </div>
                          <div className="control-group">
                          <label className="control-label" for="inputSuccess">Password</label>
                          <div className="controls">
                            <input type="password" id="password" name="password" value={this.state.password}></input>
                          </div>
                          </div>
                        </div>
                          <div style={{ display: this.state.isNewOrg}}>
                          <h3>Organization details:</h3>
                          <div className="control-group">
                          <label className="control-label" for="inputSuccess">Organization name </label>
                          <div className="controls">
                            <input type="text" id="orgName" name="orgName" value={this.state.orgName} onChange={this.handleChange}></input><span style={{ fontSize: 22, color: "red" }}>*</span>
                          </div>
                          </div>
                          <div className="control-group">
                          <label className="control-label" for="inputSuccess">Email</label>
                          <div className="controls">
                            <input type="text" id="orgEmail" name="orgEmail" value={this.state.orgEmail} onChange={this.handleChange}></input><span style={{ fontSize: 22, color: "red" }}>*</span>
                          </div>
                          </div>
                          <div className="control-group">
                          <label className="control-label" for="inputSuccess">Contact</label>
                          <div className="controls">
                            <input type="text" id="orgNumber" name="orgNumber" value={this.state.orgNumber} onChange={this.handleChange}></input><span style={{ fontSize: 22, color: "red" }}>*</span>
                          </div>
                          </div>
                          <div className="control-group">
                          <label className="control-label" for="inputSuccess">Organization Address</label>
                          <div className="controls">
                            <input type="text" id="orgAddress" name="orgAddress" value={this.state.orgAddress} onChange={this.handleChange}></input><span style={{ fontSize: 22, color: "red" }}>*</span>
                          </div>
                          </div>
                          <div className="control-group">
                          <label className="control-label" for="inputSuccess">Organization country</label>
                          <div className="controls">
                            <input type="text" id="orgCountry" name="orgCountry" value={this.state.orgCountry} onChange={this.handleChange}></input><span style={{ fontSize: 22, color: "red" }}>*</span>
                          </div>
                          </div>
                          <div className="control-group">
                          <label className="control-label" for="inputSuccess">Organization type</label>
                          <div className="controls">
                          <select className="orgType" id="orgType" value={this.state.orgType} onChange={this.handleChange} style={{width: '100%'}}>
                            <option key="Coporate" value="Coporate" selected="selected">Coporate</option>
                            <option key="Registered" value="Registered" >Registered</option>
                            <option key="UnRegistered" value="UnRegistered" >UnRegistered</option>
                          </select><span style={{ fontSize: 22, color: "red" }}>*</span>
                          </div>
                          </div>
                          <div className="control-group">
                          <label className="control-label" for="inputSuccess">Entity type</label>
                          <div className="controls">
                          <select className="orgType" id="entityType" value={this.state.entityType} onChange={this.handleChange} style={{width: '100%'}}>
                          <option key="Private" value="Private" selected="selected">Private</option>
                            <option key="Public" value="Public" >Public</option>
                            <option key="NGO" value="NGO" >NGO</option>                          
                            </select><span style={{ fontSize: 22, color: "red" }}>*</span>               
                          </div>
                          </div>
                          <div className="control-group">
                          <label className="control-label" for="inputSuccess">Registration number</label>
                          <div className="controls">
                            <input type="text" id="orgRegNum" name="orgRegNum" value={this.state.orgRegNum} onChange={this.handleChange}></input><span style={{ fontSize: 22, color: "red" }}>*</span>
                          </div>
                          </div>
                          <div className="control-group">
                          <label className="control-label" for="inputSuccess">Your First name</label>
                          <div className="controls">
                            <input type="text" id="orgFirstName" name="orgFirstName" value={this.state.orgFirstName} onChange={this.handleChange}></input><span style={{ fontSize: 22, color: "red" }}>*</span>
                          </div>
                          </div>
                          <div className="control-group">
                          <label className="control-label" for="inputSuccess">Your Last name</label>
                          <div className="controls">
                            <input type="text" id="orgLastName" name="orgLastName" value={this.state.orgLastName} onChange={this.handleChange}></input>
                          </div>
                          </div>
                          <div className="control-group">
                          <label className="control-label" for="inputSuccess">Role/Designation</label>
                          <div className="controls">
                            <input type="text" id="orgRole" name="orgRole" value={this.state.orgRole} onChange={this.handleChange}></input><span style={{ fontSize: 22, color: "red" }}>*</span>
                          </div>
                          </div>
                          <div className="control-group">
                          <label className="control-label" for="inputSuccess">Password</label>
                          <div className="controls">
                            <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange}></input><span style={{ fontSize: 22, color: "red" }}>*</span>
                          </div>
                          </div>
                          <div className="control-group">
                          <label className="control-label" for="inputSuccess">Confirm Password</label>
                          <div className="controls">
                            <input type="password" id="confirmPassword" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange}></input><span style={{ fontSize: 22, color: "red" }}>*</span>
                          </div>
                          </div>
                          <div className="control-group">
                          <label className="control-label" for="inputSuccess">Have branches in other countries?</label>
                          <div className="controls">
                          <select className="orgType" id="v" value={this.state.b} onChange={this.handleChange} style={{width: '100%'}}>
                            <option selected="selected" disabled>Select Yes/no</option>
                            <option key="Yes" value="Yes" >Yes</option>
                            <option key="No" value="No" >No</option>
                          </select><span style={{ fontSize: 22, color: "red" }}>*</span>
                          </div>
                          </div>
                          <div className="control-group">
                          <label className="control-label" for="inputSuccess">Money to be transferred in Indian Rupees Only?</label>
                          <div className="controls">
                          <input type="radio" class="bn2" name="bnInRup" value="1" style={{marginTop:"-3px"}} checked={this.state.ismoneyInRupeesClicked === "1"} onClick={e => this.moneyInRupeesEvent(e.target.value)} /> Yes &nbsp;
                          <input type="radio" class="bn3" name="bnNotInRup" value="0" style={{marginTop:"-3px"}} checked={this.state.ismoneyInRupeesClicked === "0"} onClick={e => this.moneyInRupeesEvent(e.target.value)} /> No <span style={{ fontSize: 22, color: "red" }}>*</span>
                          </div>
                          </div>
                        </div>
                        {this.state.errorMessage!==null?<div style={{ fontSize: 12, color: "red" }}  >
                            {this.state.errorMessage}
                            </div>:null}
                          <div className="form-actions" id="onebn">
                          <button tye="submit" className="btn send_btn">Login</button>&nbsp;&nbsp;
                          <a className="btn dark_btn" href="/donation">Back to Search Results</a>
                        </div>
                    </fieldset>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
export default withRouter(DonationForm);