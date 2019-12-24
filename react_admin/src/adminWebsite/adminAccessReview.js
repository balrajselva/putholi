import React, { Component } from 'react';
import SmallBoxCard from './components/smallBoxCard/SmallBoxCard';
import './css/adminMainPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class adminAccessReview extends Component {
    state={
        currentUser:this.props.location.user,
        users:"",
        getUserList:true,
        spinner:true
    }
    userList=()=>{
        axios.get("http://localhost:6060/puthuyir/user")
        .then(res=>{
            console.log(res.data)
            this.setState({
                users:res.data,
                getUserList:false,
                spinner:false
            })
        })
        console.log(this.state.users);
    }
    createTable=()=>{
        var rows=[];
        let rowsUpdated=false;
        for(let i=0;i<this.state.users.length;i++){
            const newTo = { 
                pathname: "/adminRoleCheck", 
                user:this.state.users[i],
                currentUser:this.state.currentUser
            };
            if(this.state.users[i].status==="AdminRejected" || this.state.users[i].status==="ReviewerRejected" || this.state.users[i].status==="ApproverRejected" || this.state.users[i].status==="ApprovedUser"|| this.state.users[i].status==="SuperAdminApproved")
                continue;
            else if(this.state.currentUser.role==="Admin" && (this.state.users[i].role==="Admin" ||this.state.users[i].role==="Reviewer"||this.state.users[i].role==="Approver"|| this.state.users[i].status==="AdminReviewed" || this.state.users[i].status==="ReviewerConfirmed"))
                continue;
            else if(this.state.currentUser.role==="Reviewer" && (this.state.users[i].status==="ReviewerConfirmed" ||this.state.users[i].role==="Admin"|| this.state.users[i].role==="Reviewer" ||this.state.users[i].role==="Approver"||(this.state.users[i].role==="Volunteer"&&this.state.users[i].status==="New User") || (this.state.users[i].role==="Co-ordinator"&&this.state.users[i].status==="New User") || (this.state.users[i].role==="Fund Raiser"&&this.state.users[i].status==="New User") || (this.state.users[i].role==="Trust Member"&&this.state.users[i].status==="New User")))
                continue;
            else if(this.state.currentUser.role==="Approver" && (this.state.users[i].status==="AdminReviewed" || this.state.users[i].role==="Admin"||this.state.users[i].role==="Reviewer"||this.state.users[i].role==="Approver" ||(this.state.users[i].role==="Volunteer"&&this.state.users[i].status==="New User") || (this.state.users[i].role==="Co-ordinator"&&this.state.users[i].status==="New User") || (this.state.users[i].role==="Fund Raiser"&&this.state.users[i].status==="New User") || (this.state.users[i].role==="Trust Member"&&this.state.users[i].status==="New User")))
                continue;
            else if(this.state.currentUser.role==="Super User" && (this.state.users[i].role==="Super User"||this.state.users[i].role==="Super Admin"||this.state.users[i].role==="Trust Member" ||this.state.users[i].role==="Co-ordinator" || this.state.users[i].role==="Fund Raiser" || this.state.users[i].role==="Volunteer" || this.state.users[i].role==="beneficiary" || this.state.users[i].status==="SuperUserReviewed"))
                continue;
            else if(this.state.currentUser.role==="Super Admin" && (this.state.users[i].role==="Super User"||this.state.users[i].role==="Super Admin"||this.state.users[i].role==="Trust Member" ||this.state.users[i].role==="Co-ordinator" || this.state.users[i].role==="Fund Raiser" || this.state.users[i].role==="Volunteer" || this.state.users[i].status==="SuperAdminApproved" || this.state.users[i].role==="beneficiary" || this.state.users[i].status==="New User"))
                continue;
            else{
                rowsUpdated=true;
                rows.push(<tr>
                    <td>{this.state.users[i].userid}</td>
                    <td>{this.state.users[i].firstName}</td>
                    <td>{this.state.users[i].createdDate.split("T")[0]}</td>
                    <td><span className="label label-warning">{this.state.users[i].status}</span></td>
                    <td>{this.state.users[i].role}</td>
                    <td>{this.state.users[i].address.locality}</td>
                    <td>{this.state.users[i].address.district}</td>
                    <td><a href=""><Link to={newTo}>More Details</Link></a></td>
                </tr>)
            }
        }
        if(rowsUpdated==false)
            rows.push(<tr ><td align="center" colSpan="8">No new records found!</td></tr>)
        return rows;
    }   
    render() {
        return (
            <div>
            <div class="adminContainer" style={{fontSize:"large"}}>
                {this.state.getUserList?this.userList():null}
                {/* Content Wrapper. Contains page content */}
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                        <h1>
                        Dashboard
                        <small>Control panel</small>
                        </h1>
                        <ol className="breadcrumb">
                        <li><Link to="/adminIndex"><i className="fa fa-dashboard" /> Home</Link></li>
                        <li className="active"><medium>Access Review</medium></li>
                        </ol>
                    </section>
                    {/* Main content */}
                    <section className="content">
                        {/* Small boxes (Stat box) */}
                        <div className="row" >
                        {/* ./col */}
                        <SmallBoxCard content={this.state.currentUser.role} linkTo="/admin" colour="bg-green"/>
                        {/* ./col */}
                        <SmallBoxCard content="Inbox" linkTo="/volunteer" colour="bg-yellow"/>
                        {/* ./col */}
                        <SmallBoxCard content="Logout" linkTo="/login" colour="bg-red"/>
                        {/* ./col */}
                        </div>
                        {/* /.row */}
                        {/* Main row */}
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="box">
                                    <div className="box-header">
                                        <h3 className="box-title">Review User Access requests</h3>
                                        <div className="box-tools">
                                        <div className="input-group input-group-sm" style={{width: 150}}>
                                            <input type="text" name="table_search" className="form-control pull-right" placeholder="Search" />
                                            <div className="input-group-btn">
                                            <button type="submit" className="btn btn-default"><i className="fa fa-search" /></button>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    {/* /.box-header */}
                                    <div className="box-body table-responsive no-padding">
                                        <table className="table table-hover">
                                        <tbody>
                                            
                                            <tr>
                                                <th>User ID</th>
                                                <th>User Name</th>
                                                <th>Date Added</th>
                                                <th>Status</th>
                                                <th>Role</th>
                                                <th>Town</th>
                                                <th>District</th>
                                                <th>Details</th>
                                            </tr>
                                            {this.state.getUserList?null:this.createTable()}
                                            {this.state.spinner?<div class="spinner"></div>:null}
                                        </tbody>
                                        </table>
                                    </div>
                                {/* /.box-body */}
                                </div>
                                {/* /.box */}
                            </div>
                        </div>
                    </section>
                </div>
                </div>
            </div>
        );
    }
}

export default withRouter(adminAccessReview);