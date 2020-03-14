import React, { Component } from 'react';
import RegisterForm from '../adminWebsite/components/registerForm/registerForm';
import axios from 'axios';

const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const url=window.location.href;

class VolunteerRegister extends Component {
    state={
      sponsor:{
        name : cryptr.decrypt(url.split("?")[1].split("&")[0]),
        email : cryptr.decrypt(url.split("?")[1].split("&")[1])
      }
    }
    saveUser=(user)=>{
      let email=JSON.parse(user.get("payload")).emailAddress;
      console.log(email);
      axios.get("http://localhost:6060/puthuyir/admin/verifyReferals/"+this.state.sponsor.email+"/"+email)
      .then(res=>{
        if(res.data===true){
          user.sponsorName=this.state.sponsor.name;
          user.sponsorEmail=this.state.sponsor.email;
          this.props.saveUser(user);
        }
        else
          window.alert("Please use mail ID refered by Sponsor");
      })
      .catch(error=>{
        window.alert("Could verify referals details due to "+error)
        this.setState({spinner:false})
      })
    }
    render() {
        return (
            <body class="hold-transition register-page">
              <div className="register-box">
                <div className="register-logo">
                  <b>Welcome to Putholi</b>
                </div>
                <div className="register-box-body">
                  <p className="login-box-msg"><b>Register as Volunteer</b></p>
                  <div>
                    <div className="row">
                      <div className="form-group has-feedback col-md-6">
                        <input type="text" className="form-control" disabled value={"Sponsor name : "+this.state.sponsor.name}></input>
                        <span className="glyphicon glyphicon-user form-control-feedback" />
                      </div>
                      <div className="form-group has-feedback col-md-6">
                        <input type="text" className="form-control" disabled value={"Sponsor Email  : "+this.state.sponsor.email}/>
                        <span className="glyphicon glyphicon-envelope form-control-feedback" />
                      </div>
                    </div>
                    <RegisterForm saveUser={(user)=>this.saveUser(user)} roles={["Volunteer"]}/>
                   </div>
                   </div>
                {/* /.form-box */}
              </div>
          </body>

        );
    }
}

export default VolunteerRegister;