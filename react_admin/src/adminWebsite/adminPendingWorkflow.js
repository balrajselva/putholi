import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import SmallBoxCard from './components/smallBoxCard/SmallBoxCard';
import './components/header/Header.css';
import './css/adminMainPage.css';

export default class adminPendingWorkflow extends Component {
    render() {
        return (
            <div class="adminContainer" style={{fontSize:"large"}}>
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
                        <SmallBoxCard content="Logout" linkTo="/logout" colour="bg-red"/>
                        {/* ./col */}
                        </div>
                        {/* /.row */}
                        {/* Main row */}
            
            <div className="row">
            <div className="col-xs-12">
                <div className="box">
                <div className="box-header">
                    <h3 className="box-title">Review Newly Added Schools</h3>
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
                        <td><a href="pages/UI/new_school_admin_check.html">View Requirements</a></td>
                        </tr>
                        <tr>
                        <td>183</td>
                        <td>Cuddalore Boys School</td>
                        <td>11-7-2014</td>
                        <td><span className="label label-success">Inital Review Complete</span></td>
                        <td>Cuddalore</td>
                        <td>Nellikuppam</td>
                        <td><a href="pages/mailbox/admin_mailbox.html">Initiate email to DEO</a></td>
                        </tr>
                        <tr>
                        <td>183</td>
                        <td>Cuddalore Boys School</td>
                        <td>11-7-2014</td>
                        <td><span className="label label-primary">DEO Response Pending</span></td>
                        <td>Trichy</td>
                        <td>Trichy</td>
                        <td><a href="pages/UI/admin_upload_DEO_Response.html">Click to Upload</a></td>
                        </tr>
                        <tr>
                        <td>183</td>
                        <td>Cuddalore Boys School</td>
                        <td>11-7-2014</td>
                        <td><span className="label label-warning">DEO Approved</span></td>
                        <td>Cuddalore</td>
                        <td>Nellikuppam</td>
                        <td><a href="pages/UI/volunteer_assignment_screen.html">Assign to Volunteer</a></td>
                        </tr>
                        <tr>
                        <td>183</td>
                        <td>Cuddalore Boys School</td>
                        <td>11-7-2014</td>
                        <td><span className="label label-success">Volunteer Accepted</span></td>
                        <td>Cuddalore</td>
                        <td>Nellikuppam</td>
                        <td><a href="Volunteer.html">Go to Volunteer</a></td>
                        </tr>
                        <tr>
                        <td>183</td>
                        <td>Cuddalore Boys School</td>
                        <td>11-7-2014</td>
                        <td><span className="label label-info">Volunteer Verfification Complete</span></td>
                        <td>Cuddalore</td>
                        <td>Nellikuppam</td>
                        <td><a href="Volunteer.html">Request for Quotation</a></td>
                        </tr>
                        <tr>
                        <td>183</td>
                        <td>Cuddalore Boys School</td>
                        <td>11-7-2014</td>
                        <td><span className="label label-info">Analyse Quotation</span></td>
                        <td>Cuddalore</td>
                        <td>Nellikuppam</td>
                        <td><a href="pages/UI/admin_review_quotation.html">Click for an Action</a></td>
                        </tr>
                        <tr>
                        <td>183</td>
                        <td>Cuddalore Boys School</td>
                        <td>11-7-2014</td>
                        <td><span className="label label-info">Enable Quotatoin ReSubmission</span></td>
                        <td>Cuddalore</td>
                        <td>Nellikuppam</td>
                        <td><a href="Volunteer.html">Re-assign to Volunteer</a></td>
                        </tr>
                        <tr>
                        <td>183</td>
                        <td>Cuddalore Boys School</td>
                        <td>11-7-2014</td>
                        <td><span className="label label-info">Quotation Approved</span></td>
                        <td>Cuddalore</td>
                        <td>Nellikuppam</td>
                        <td><a href="fund_allotment.html">View Fund Collection</a></td>
                        </tr>
                        <tr>
                        <td>183</td>
                        <td>Cuddalore Boys School</td>
                        <td>11-7-2014</td>
                        <td><span className="label label-success">Fund Collection Status</span></td>
                        <td>Cuddalore</td>
                        <td>Nellikuppam</td>
                        <td><a href="fund_allotment.html">Request for Allotment</a></td>
                        </tr>
                        <tr>
                        <td>183</td>
                        <td>Cuddalore Boys School</td>
                        <td>11-7-2014</td>
                        <td><span className="label label-warning">Fund Collection Status</span></td>
                        <td>Cuddalore</td>
                        <td>Nellikuppam</td>
                        <td>In Progress</td>
                        </tr>
                        <tr>
                        <td>183</td>
                        <td>Cuddalore Boys School</td>
                        <td>11-7-2014</td>
                        <td><span className="label label-success">Fund Allotted</span></td>
                        <td>Cuddalore</td>
                        <td>Nellikuppam</td>
                        <td><a href="Volunteer.html">Send Work Order</a></td>
                        </tr>
                        <tr>
                        <td>183</td>
                        <td>Cuddalore Boys School</td>
                        <td>11-7-2014</td>
                        <td><span className="label label-success">Review Work Completion</span></td>
                        <td>Cuddalore</td>
                        <td>Nellikuppam</td>
                        <td><a href="#">Final Review</a></td>
                        </tr>
                        <tr>
                        <td>183</td>
                        <td>Cuddalore Boys School</td>
                        <td>11-7-2014</td>
                        <td><span className="label label-success">Requirement Closed</span></td>
                        <td>Cuddalore</td>
                        <td>Nellikuppam</td>
                        <td>Complete</td>
                        </tr>
                        <tr>
                        <td>183</td>
                        <td>Cuddalore Boys School</td>
                        <td>11-7-2014</td>
                        <td><span className="label label-danger">Rejected Scenario's to be derived</span></td>
                        <td>Cuddalore</td>
                        <td>Nellikuppam</td>
                        <td><a href="#">Re-assign to Volunteer</a></td>
                        </tr>
                    </tbody></table>
                </div>
                {/* /.box-body */}
                </div>
                {/* /.box */}
            </div>
            </div>
            </section>
                </div>
            </div>
        )
    }
}
