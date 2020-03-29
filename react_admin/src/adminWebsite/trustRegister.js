import React, { Component } from 'react';
import RegisterForm from '../adminWebsite/components/registerForm/registerForm';
import axios from 'axios';

class trustRegister extends Component {
  state={
    registrationFee:null,
    spinner: true
  }

  saveUser=(user)=>{
    this.props.saveUser(user);
  }

  componentDidMount(){
    axios.get("http://localhost:6060/puthuyir/trustMemberRegistration")
    .then(res=>{
      this.setState({
          registrationFee:res.data,
          spinner:false
      })
    })
    .catch(error=>{
      window.alert("Sorry for inconvinience.Could not proceed due to "+error +"Please try again");
      this.props.history.push("/login");
    })
  }

  render() {
    return (
      <body className="hold-transition register-page">
        <div className="register-box">
          <div className="register-logo">
            <b>Welcome to Puthuyir</b>
          </div>
          {this.state.spinner?<div class="spinner"></div>:null}
          <div className="register-box-body">
            <p className="login-box-msg"><b>Register a new membership</b></p>
            <div className="row">
                  <div className="form-group has-feedback col-md-6">
                    <input type="text" className="form-control" disabled value={"Default Role : Trust Member"}></input>
                    <span className="glyphicon glyphicon-user form-control-feedback" />
                  </div>
                  <div className="form-group has-feedback col-md-6">
                    <input type="text" className="form-control" disabled value={this.state.registrationFee +" INR"}/>
                    <span className="glyphicon glyphicon-euro form-control-feedback" />
                </div>
              </div>
            {/* <RegisterForm saveUser={(user)=>this.saveUser(user)} roles={["Admin","Approver","Co-ordinator","Fund Raiser","Reviewer","Trust Member"]}/> */}
            <RegisterForm saveUser={(user)=>this.saveUser(user)} roles={["Admin","Approver","Reviewer","Volunteer","Trust Member"]}/>
          </div>
        </div>
      </body>
    );
  }
}

export default trustRegister;