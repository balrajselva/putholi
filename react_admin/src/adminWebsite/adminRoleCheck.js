import React, { Component } from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Menu from './components/menu/Menu';
import './components/header/Header.css';
import './css/adminMainPage.css';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

class adminRoleCheck extends Component {
    state={
        user:this.props.location.user,
        currentUser:this.props.location.currentUser,
        status:null,
        spinner:false
    }

    updateStatus=({target})=>{
      this.setState({
        spinner:true, 
        status:target.id
      });
      if(target.id==="Accepted"){
        if(this.state.currentUser.role==="Admin")
          this.state.status="AdminReviewed";
        else if(this.state.currentUser.role==="Reviewer")
          this.state.status="ReviewerConfirmed";
        else if(this.state.currentUser.role==="Approver")
          this.state.status="ApprovedUser";
      }
      else{
        if(this.state.currentUser.role==="Admin")
          this.state.status="AdminRejected";
        else if(this.state.currentUser.role==="Reviewer")
          this.state.status="ReviewerRejected";
        else if(this.state.currentUser.role==="Approver")
          this.state.status="ApprovedRejected";
      }
      axios.put("http://localhost:6060/puthuyir/updateUser/"+this.state.user.userid+"/"+this.state.status)
      .then(res=>{
        if(res.data!==""){
          console.log(res.data);
          this.setState({user:res.data});
          this.setState({spinner:false});
          window.alert("Status updated successfully");
          this.props.history.push({ 
            pathname:"/accessReview", 
            user:this.state.currentUser
          });
        }
        else{
          window.alert("Status update failed");
        }
      })
    }
  
    render() {
        let reviewButtonContent="";
        if(this.state.currentUser.role==="Admin")
          reviewButtonContent="Send for Review";
        else if(this.state.currentUser.role==="Reviewer")
          reviewButtonContent="Recommend to Approve";
        else if(this.state.currentUser.role==="Approver")
          reviewButtonContent="Approve";
        return (
            <div class="adminContainer" style={{fontSize:"large"}}>
                {this.state.getUserList?this.userList():null}
                <Header currentUser={this.state.currentUser}/>
                <Menu currentUser={this.state.currentUser}/>
                <div className="content-wrapper">
                  <section className="content-header">
                    <h1>
                      Jagan kumar
                      <small>added on</small>
                    </h1>
                    <ol className="breadcrumb">
                      <li><a href="../../admin_main_screen.html"><i className="fa fa-dashboard" /> Home</a></li>
                      <li><a href="#">UI</a></li>
                      <li className="active">Timeline</li>
                    </ol>
                  </section>
                  <section className="content">
                    <div className="row">
                      <div className="col-md-12">
                        <ul className="timeline">
                          <li className="time-label">
                            <span className="bg-red">
                              {this.props.location.user.createdDate.split('T')[0]}
                            </span>
                          </li>
                          <li>
                            <i className="fa fa-envelope bg-blue" />
                            <div className="timeline-item">
                              <h3 className="timeline-header"><strong>User Details</strong> listed below</h3>
                              <div className="timeline-body">
                                <div className="box-body">
                                  <ul>
                                    <li>Gender - {this.props.location.user.gender}</li>
                                    <li>Email - {this.props.location.user.emailAddress}</li>
                                    <li>Role Requested -  <b><i>{this.props.location.user.role}</i></b></li>
                                    <li>Contact number - {this.props.location.user.phoneNumber}</li>
                                    <li>Address -
                                        {this.props.location.user.address.addressLine1},
                                        {this.props.location.user.address.addressLine2},
                                        {this.props.location.user.address.locality},
                                        {this.props.location.user.address.city},
                                        {this.props.location.user.address.district},
                                        {this.props.location.user.address.state}.
                                    </li>
                                  </ul>     
                                </div>
                              </div>
                              <div className="timeline-footer">
                                <div className="btn btn-primary btn-xs" id="Accepted" onClick={(target)=>this.updateStatus(target)}>{reviewButtonContent}</div>&nbsp;
                                <div className="btn btn-primary btn-xs" id="Rejected" onClick={(target)=>this.updateStatus(target)}>Reject Access</div>&nbsp;
                                <Link to={{pathname:"/accessReview", users:this.state.users, currentUser:this.state.currentUser}} className="btn btn-primary btn-xs">Back to User List</Link>
                              </div>
                            </div>
                          </li>
                          <li>
                            <i className="fa fa-user bg-aqua" />
                            <div className="timeline-item">
                              <h3 className="timeline-header no-border">User to resubmit the required details</h3>
                            </div>
                          </li>
                          <li>
                            <i className="fa fa-user bg-aqua" />
                            <div className="timeline-item">
                              <h3 className="timeline-header no-border"><a href="#">User request History - </a> Access Granted</h3>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-footer">
                              <a href="#" className="btn btn-xs bg-maroon">Go to Top</a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>
                <Footer/>
                {this.state.spinner?<div class="spinner"></div>:null}
            </div>
        );
    }
}

export default withRouter(adminRoleCheck);