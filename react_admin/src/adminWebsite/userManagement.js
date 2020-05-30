import React, { Component } from 'react';
import './components/header/Header.css';
import './css/adminMainPage.css';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

class userManagement extends Component {
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
          this.state.status="UserDetailsUpdated";
      }
      else{
        if(this.state.currentUser.role==="Admin")
          this.state.status="DeletedUser";        
      }
      axios.put("http://localhost:6060/puthuyir/updateUser/"+this.state.user.userid+"/"+this.state.status)
      .then(res=>{
        if(res.data!==""){
          console.log(res.data);
          this.setState({user:res.data});
          this.setState({spinner:false});
          window.alert("Status updated successfully");
         
          if(this.state.currentUser.role==="Admin"){
            this.props.history.push({ 
              pathname:"/userReport", 
              currentUser:this.state.currentUser
            });
          }
      
        }
        else{
          this.setState({spinner:false});
          window.alert("Status update failed");
        }
      })
    }
  
    render() {
        let returnLink=null;
        if(this.state.currentUser.role==="Admin"){
          returnLink = "userReport"
        }
        let reviewButtonContent="";
        if(this.state.currentUser.role==="Admin"){
          reviewButtonContent="Edit Details";
          returnLink = "userReport"
        }
        return (
            <div class="adminContainer" style={{fontSize:"large"}}>
                {this.state.getUserList?this.userList():null}
                <div className="content-wrapper">
                  <section className="content-header">
                    <h1>
                      {this.props.location.user.firstName}
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
                              
                              <div className="row">
                                    <div className="col-xs-12">
                                    <div className="box">
                                        {/* <div className="box-header">
                                            <h4 className="box-title">Search Users</h4>
                                        </div> */}
                                        <div className="box-body table-responsive no-padding">
                                            <table className="table table-hover">
                                            <tbody>
                                            <tr>
                                                    <th>User Comments </th>
                                                    <th>Admin Comments </th>
                                                    <th>Reviewer Comments </th>
                                                    <th>Approver Comments </th>
                                                </tr>
                                                <tr>
                                                    <td><textarea className="input-xlarge" ref ="comment" id="userComments" value={this.state.userComments} onChange={this.handleChange} rows="3"></textarea></td>
                                                    <td><textarea className="input-xlarge" ref ="comment" id="adminComments" value={this.state.adminComments} onChange={this.handleChange} rows="3"></textarea></td>
                                                    <td><textarea className="input-xlarge" ref ="comment" id="reviewerComments" value={this.state.reviewerComments} onChange={this.handleChange} rows="3"></textarea></td>
                                                    <td><textarea className="input-xlarge" ref ="comment" id="approverComments" value={this.state.approverComments} onChange={this.handleChange} rows="3"></textarea></td>
                                                </tr>
                                            </tbody></table>
                                            {this.state.errorMessage!=null?<div className="errorMessage" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}
                                        </div>
                                        </div>
                                    </div>
                                 </div>

                              
                              <div className="timeline-footer">
                              
                                <button  type="button" class="btn btn-warning" data-toggle="modal" data-target="#modal-default">View User Picture</button>
                                <div className="btn btn-primary btn-xs" id="Accepted" onClick={(target)=>this.updateStatus(target)}>{reviewButtonContent}</div>&nbsp;
                                <div className="btn btn-primary btn-xs" id="Rejected" onClick={(target)=>this.updateStatus(target)}>Delete Access</div>&nbsp;
                                <Link to={{pathname:returnLink, users:this.state.users, currentUser:this.state.currentUser}} className="btn btn-primary btn-xs">Back to User List</Link>
                              </div>
                            </div>
                          </li>

                          <div className="modal fade" id="modal-default">
                      <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span></button>
                            </div>
                            <div className="modal-body">
                            <div className="row">
                                <section className="content">
                                <img src={'data:image/png;base64,'+this.props.location.user.identityProof[0].image} id ="image1" alt="" ></img>
                                
                                </section>
                            </div>
                        </div>
                      </div>    
                    </div>
                  </div>
                  
                           
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
                {this.state.spinner?<div class="spinner"></div>:null}
            </div>
        );
    }
}

export default withRouter(userManagement);