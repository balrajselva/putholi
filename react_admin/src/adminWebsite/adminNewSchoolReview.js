import React, { Component } from 'react';
import SmallBoxCard from './components/smallBoxCard/SmallBoxCard';
import './components/header/Header.css';
import './css/adminMainPage.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class adminNewSchoolReview extends Component {
    state={
        getSchools:true,
        schools:null
    }
    getSchools=()=>{
        Axios.get("http://localhost:6060/puthuyir/getAllSchools")
        .then(res=>{
            console.log(res.data)
        })
        this.setState({getSchools:false})
    }
    render() {
        const newTo = { 
            pathname: "/adminSchoolCheck", 
            currentUser:this.props.currentUser,
            user:this.props.currentUser,
            ...this.props
        };
        return (
            <div class="adminContainer" style={{fontSize:"large"}}>
                {this.state.getSchools?this.getSchools():null}
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
                        <li className="active"><medium>Dashboard</medium></li>
                        </ol>
                    </section>
                    {/* Main content */}
                    <section className="content">
                        {/* Small boxes (Stat box) */}
                        <div className="row" >
                        <SmallBoxCard content="Admin"  linkTo="/admin" colour="bg-green"/>
                        {/* ./col */}
                        <SmallBoxCard content="Inbox" linkTo="/inbox" colour="bg-yellow"/>
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
                        <center><h3 className="box-title">Admin Home Screen</h3></center>
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
                    <div className="row">
                        <div className="col-xs-12" >
                        <div className="box" >
                            <div className="box-body table-responsive no-padding">
                            <table className="table table-hover">
                                <tbody><tr>
                                    <th>School ID</th>
                                    <th>School Name</th>
                                    <th>Date Added</th>
                                    <th>Status</th>
                                    <th>District</th>
                                    <th>Town</th>
                                    <th>Details</th>
                                </tr>
                                <tr>
                                    <td>111</td>
                                    <td>Government Boys School</td>
                                    <td>11-7-2014</td>
                                    <td><span className="label label-warning">Initial Admin Check</span></td>
                                    <td>Tiruppur</td>
                                    <td>Nellikuppam</td>
                                    <td><a href=""><Link to={newTo}>Click for Details</Link></a></td>
                                </tr>
                                </tbody></table>
                            </div>
                            {/* /.box-header */}
                            {/*<div class="box-body table-responsive no-padding">
                        <table class="table table-hover">
                        <tr>
                            <th>School ID</th>
                            <th>School Name</th>
                            <th>Date Added</th>
                            <th>Status</th>
                    <th>District</th>
                    <th>Town</th>
                            <th>Details</th>
                        </tr>

                        <tr>
                            <td>183</td>
                            <td>Cuddalore Boys School</td>
                            <td>11-7-2014</td>
                    <td><span class="label label-warning">Finalize Quotations</span></td>
                            <td>Cuddalore</td>
                    <td>Nellikuppam</td>
                    <td><a href="pages/UI/trustee_approver.html">Click for Details</a></td>
                        </tr>
                        <tr>
                            <td>183</td>
                            <td>Cuddalore Boys School</td>
                            <td>11-7-2014</td>
                    <td><span class="label label-success">Vendor Selection Complete</span></td>
                            <td>Cuddalore</td>
                    <td>Nellikuppam</td>
                    <td>Click for Details</td>
                        </tr>

                        </table>
                    </div>*/}
                            {/* /.box-body */}
                        </div>
                        {/* /.box */}
                        </div>
                    </div>
                    {/* /.box-body */}
                    </div>
                    {/* /.box */}
                </div>
                </div>

                </section>
                </div>
            </div>
        );
    }
}

export default adminNewSchoolReview;