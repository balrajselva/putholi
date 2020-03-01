import React, { Component } from 'react';
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
      isRegisteredClicked: "1",
      userLogin: [],
      emailFlag: '',
      LoginInforValidation: ''

    }

  }



  submitClicked = (e) => {

    const { userLogin: [] } = this.state;
    e.preventDefault();

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

        axios.post('http://localhost:6060/puthuyir/donate/findDonationUser', params, { headers: { 'Accept': 'application/json' } })
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
        axios.post('http://localhost:6060/puthuyir/donate/findByEmailId', emailValidation, { headers: { 'Accept': 'application/json' } })
          .then(response => {
            if (response.data === "SUCCESS") {
              this.setState({
                emailError: 'Email Already exist'
              });
            }
            else {
              this.setState({
                emailError: ''
              });

              console.log("Before loading", params);
              axios.post('http://localhost:6060/puthuyir/donate/save', params, { headers: { 'Accept': 'application/json' } })
                .then((response) => {
                  var requestPayload = Object.assign(requestJSON, response.data);
                  this.props.history.push({
                    pathname: '/donationPayment',
                    user: requestPayload,
                  });
                })
            }
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

                      <div className="control-group">
                        <label className="control-label" for="disabledInput">School Name</label>
                        <div className="controls">
                          <input readOnly className="input-xlarge disabled" id="disabledInput" type="text"
                            placeholder={this.props.history.location.state.state[0].schoolInfo.schoolName} disabled=""></input>
                        </div>
                      </div>

                      <div className="control-group">
                        <label className="control-label" for="disabledInput">Estimated Total Amount
</label>
                        <div className="controls">
                          <input readOnly className="input-xlarge disabled" id="disabledInput"
                            type="text" placeholder={this.props.history.location.state.state[0].projects[0].estimate} disabled=""></input>
                        </div>
                      </div>
                      <div className="control-group">
                        <label className="control-label" for="disabledInput">Collected Amount</label>
                        <div className="controls">
                          <input readOnly className="input-xlarge disabled" id="disabledInput" name="collectedAmount" type="text" placeholder={this.props.history.location.state.state[0].projects[0].collectedAmount} disabled=""></input>
                        </div>

                      </div>
                      <div className="control-group">
                        <label className="control-label" for="disabledInput">You can contribute Upto</label>
                        <div className="controls">
                          <input readOnly className="input-xlarge disabled" id="disabledInput" name="yourContribution" type="text"
                            placeholder={this.calculateContribution()} value={this.calculateContribution()}></input>
                        </div>
                      </div>
                      <div className="control-group">
                        <label className="control-label" for="disabledInput">Your Contribution in Rs</label>
                        <div className="controls">
                          <input className="form-control" name="contribution" id="contribution" value={this.state.contribution} type="text"
                            placeholder="" disabled="" ></input>

                          <div style={{ fontSize: 12, color: "red" }}  >
                            {this.state.contributionError}
                          </div>
                        </div>
                      </div>

                      <h3>Already Registered Donor??</h3>
                          <input type="radio" class="bn2" name="bn" value="1" checked={this.state.isClicked === "1"} onClick={e => this.registeredUserEvent(e.target.value)} /> Yes
                          <input type="radio" class="bn3" name="bn" value="2" checked={this.state.isClicked === "2"} onClick={e => this.registeredUserEvent(e.target.value)} /> No
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
                          <div className="form-actions" id="onebn">
                          <button tye="submit" className="btn send_btn">Login</button>
                          <button className="btn dark_btn">Cancel</button>
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