import React, { Component } from 'react';
import RegisterForm from '../adminWebsite/components/registerForm/registerForm';

class trustRegister extends Component {
  saveUser=(user)=>{
      this.props.saveUser(user);
  }
    render() {
        return (
          <body className="hold-transition register-page">
            <div className="register-box">
              <div className="register-logo">
                <b>Welcome to Puthuyir</b>
              </div>
              <div className="register-box-body">
                <p className="login-box-msg"><b>Register a new membership</b></p>
                <div className="row">
                      <div className="form-group has-feedback col-md-6">
                        <input type="text" className="form-control" disabled value={"Default Role : Trust Member"}></input>
                        <span className="glyphicon glyphicon-user form-control-feedback" />
                      </div>
                      <div className="form-group has-feedback col-md-6">
                        <input type="text" className="form-control" disabled value={"Annual membership : 10,000 INR"}/>
                        <span className="glyphicon glyphicon-euro form-control-feedback" />
                    </div>
                  </div>
                <RegisterForm saveUser={(user)=>this.saveUser(user)} roles={["Admin","Approver","Co-ordinator","Fund Raiser","Reviewer","Trust Member"]}/>
              </div>
            </div>
          </body>
        );
    }
}

export default trustRegister;