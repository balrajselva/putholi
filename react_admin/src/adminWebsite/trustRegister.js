import React, { Component } from 'react';
import RegisterForm from '../adminWebsite/components/registerForm/registerForm';

class trustRegister extends Component {
  saveUser=(user)=>{
    if(!document.getElementById('checkBox1').checked){
      document.getElementById('checkBox1').style.borderColor="red";
    }
    else
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
                  <div className="row">
                  <div className="form-group has-feedback col-md-6">
                        <select className="form-control select2" id="selectedLocality" style={{width: '100%'}}>
                            <option selected="selected">Payment option</option>
                            <option>Bi-Monthly (2000 INR)</option>
                            <option>Yearly (10,000 INR + service tax)</option>
                            </select>
                        <span className="glyphicon glyphicon-euro form-control-feedback"/>
                    </div>
                    <div className="form-group has-feedback col-md-6">
                    <div className="checkbox icheck" style={{marginLeft:'4%'}}>
                          <input type="checkbox" id="checkBox1"/> I agree to the <a href="#">terms and conditions</a>
                      </div>
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