import React, { Component } from 'react';
import axios from 'axios';
import {Link,withRouter} from 'react-router-dom';

class trustLogin extends Component {
  state={
    email:null,
    password:null,
    spinner:false,
    errorMessage:null
  }
  handleChange=({target})=>{
      document.getElementById(target.id).style.borderColor="#d2d6de";
      this.setState({ 
          [target.id]: target.value , 
          errorMessage:"",
          spinner:false
      });
  }
  signIn=(e)=>{
    e.preventDefault();
    this.refs.submit_btn.setAttribute("disabled", "disabled");
    this.setState({spinner:true});
    if(this.state.password!==null && this.state.email!==null ){
      const user={
        emailAddress:this.state.email,
        password:this.state.password
      }
      axios.post(this.props.config+"/verify_user",user)
      .then(res=>{
        console.log(res.data)
          if(res.data.status==="PaymentPending"){
            this.props.history.push({
              pathname: '/payment',
              currentUser: res.data,
            });
          }
          else if(res.data!==""&&res.data.role==="Volunteer" && res.data.status==="ApprovedUser"){
            this.props.history.push({
              pathname: '/volunteerSchoolCheck',
              currentUser : res.data
            });
          }
          else if(res.data!==""&&res.data.role==="TrustVolunteer" && res.data.status==="ApprovedUser"){
            this.props.history.push({
              pathname: '/volunteerSchoolCheck',
              currentUser : res.data
            });
          }
          else if(res.data!=="" && (res.data.role==="Admin") && res.data.status==="SuperAdminApproved"){
            this.props.history.push({
              pathname: '/accessReview',
              currentUser: res.data 
            });
          }
          else if(res.data!=="" && res.data.role==="Super User" && res.data.status==="SuperAdminApproved"){
            this.props.history.push({
              pathname: '/superUserAccessReview',
              currentUser: res.data 
            });
          }
          else if(res.data!=="" && res.data.role==="Super Admin" && res.data.status==="SuperAdminApproved"){
            this.props.history.push({
              pathname: '/superAdminAccessReview',
              currentUser: res.data 
            });
          }
          else if(res.data!=="" && res.data.role==="Approver" && res.data.status==="SuperAdminApproved"){
            this.props.history.push({
              pathname: '/approver',
              currentUser: res.data 
            });
          }
          else if(res.data!=="" && res.data.role==="Reviewer" && res.data.status==="SuperAdminApproved"){
            this.props.history.push({
              pathname: '/reviewer',
              currentUser: res.data 
            });
          }
          else if(res.data!=="" && (res.data.role==="Trust Member" ||res.data.role==="Co-ordinator" ||res.data.role==="Fund Raiser" ) && res.data.status==="ApprovedUser"){
            this.props.history.push({
              pathname: '/trustMemberScreen',
              currentUser: res.data
            });
          }
          else if(res.data!=="" && (res.data.status==="NewUser"||res.data.status==="ApproverRejected"||res.data.status==="ReviewerRejected")){
            this.props.history.push({
              pathname: '/newUserLoginConfirm',
              currentUser: res.data
            });
          }
          else if(res.data!=="" && res.data.status==="AdminRejected"){
            this.props.history.push({
              pathname: '/rejectedUser',
              currentUser: res.data
            });
          }
          else{
            document.getElementById("password").style.borderColor="red";
            this.setState({
              errorMessage:"Please enter valid password",
              spinner:false})
            this.refs.submit_btn.removeAttribute("disabled");
          }
      })
    }
    else{
      document.getElementById("password").style.borderColor="red";
      this.setState({errorMessage:"Please enter valid password"})
      this.refs.submit_btn.removeAttribute("disabled");
    }
  }
    render() {
        return (
            <body className="hold-transition login-page">
              <div className="login-box">
                <div className="login-logo">
                  <a href=""><b>Putholi</b></a>
                </div>
                <div className="login-box-body">
                  <p className="login-box-msg">Sign in to start your session</p>
                  <form>
                    <div className="form-group has-feedback">
                      <input type="email" className="form-control" placeholder="Email" id="email" value={this.state.email} onChange={this.handleChange}/>
                      <span className="glyphicon glyphicon-envelope form-control-feedback" />
                    </div>
                    <div className="form-group has-feedback">
                      <input type="password" className="form-control" placeholder="Password" id="password" value={this.state.password} onChange={this.handleChange}/>
                      <span className="glyphicon glyphicon-lock form-control-feedback" />
                    </div>
                    {this.state.errorMessage!=null?<div className="errorMessage" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}
                    <div className="row">
                      <div className=" col-md-12">
                        <button ref="submit_btn" className="btn btn-primary btn-block btn-flat" onClick={(e)=>this.signIn(e)}>Login</button>
                      </div>
                    </div>
                  </form>
                  <a href="#">I forgot my password</a><br />
                  <Link to="/trustRegister" className="text-center">Register a new membership</Link>
                </div>
              </div>
              {this.state.spinner?<div class="spinner"></div>:null}
            </body>
        );
    }
}

export default withRouter(trustLogin);