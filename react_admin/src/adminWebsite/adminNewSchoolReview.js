import React, { Component } from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Menu from './components/menu/Menu';
import SmallBoxCard from './components/smallBoxCard/SmallBoxCard';
import './components/header/Header.css';
import './css/adminMainPage.css';
import { Link } from 'react-router-dom';

class adminNewSchoolReview extends Component {
    render() {
        return (
            <div class="adminContainer" style={{fontSize:"large"}}>
                <Header />
                <Menu />
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
                        <SmallBoxCard content="Approver" linkTo="/approver" colour="bg-aqua"/>
                        {/* ./col */}
                        <SmallBoxCard content="Admin" linkTo="/admin" colour="bg-green"/>
                        {/* ./col */}
                        <SmallBoxCard content="Volunteer" linkTo="/volunteer" colour="bg-yellow"/>
                        {/* ./col */}
                        <SmallBoxCard content="Reviewer" linkTo="/reviewer" colour="bg-red"/>
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
                                    <td>183</td>
                                    <td>Cuddalore Boys School</td>
                                    <td>11-7-2014</td>
                                    <td><span className="label label-warning">Initial Admin Check</span></td>
                                    <td>Cuddalore</td>
                                    <td>Nellikuppam</td>
                                    <td><a href="newly_added_schools.html">Click for Details</a></td>
                                </tr>
                                <tr>
                                    <td>782324</td>
                                    <td>Villupuram Boys School</td>
                                    <td>22-3-2018</td>
                                    <td><span className="label label-success">Inital Review Complete</span></td>
                                    <td>Cuddalore</td>
                                    <td>Nellikuppam</td>
                                    <td><a href="newly_added_schools.html">Click for Details</a></td>
                                </tr>
                                <tr>
                                    <td>3333</td>
                                    <td>Panruti Girls School</td>
                                    <td>29-5-2017</td>
                                    <td><span className="label label-warning">DEO Approved</span></td>
                                    <td>Cuddalore</td>
                                    <td>Nellikuppam</td>
                                    <td><a href="newly_added_schools.html">Click for Details</a></td>
                                </tr>
                                <tr>
                                    <td>29090</td>
                                    <td>Chidambaram Boys School</td>
                                    <td>11-7-2014</td>
                                    <td><span className="label label-success">Initiate workorder</span></td>
                                    <td>Chidambarram</td>
                                    <td>Cuddalore</td>
                                    <td><a href="admin_initiate_workorder.html">Click for Details</a></td>
                                </tr>
                                <tr>
                                    <td>2383</td>
                                    <td>Sholinganallur Boys School</td>
                                    <td>11-7-2014</td>
                                    <td><span className="label label-success">Project Completed</span></td>
                                    <td>Cuddalore</td>
                                    <td>Nellikuppam</td>
                                    <td>Closed</td>
                                </tr>
                                <tr>
                                    <td>58223</td>
                                    <td>Comibatore Boys School</td>
                                    <td>22-5-2016</td>
                                    <td><span className="label label-danger">Rejected Scenario's to be derived</span></td>
                                    <td>Cuddalore</td>
                                    <td>Nellikuppam</td>
                                    <td><a href="pages/UI/volunteer_assignment_screen.html">Re-assign to Volunteer</a></td>
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
                <Footer/>
            </div>
        );
    }
}

export default adminNewSchoolReview;