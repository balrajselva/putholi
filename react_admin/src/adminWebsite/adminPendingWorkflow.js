import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import SmallBoxCard from './components/smallBoxCard/SmallBoxCard';
import './components/header/Header.css';
import './css/adminMainPage.css';
import axios from 'axios';

class adminPendingWorkflow extends Component {
    state={
        schools:null,
        spinner:false
    }
    componentDidMount(){
        axios.get("http://localhost:6060/puthuyir/getAllSchools")
        .then(res=>{
            console.log(res.data)
            this.setState({
                schools:res.data,
                spinner:false
            });
        })
        .catch(error=>{
            this.setState({spinner:false});
            window.alert("Unable to get school details due to "+error)
        })
    }
    createTable=()=>{
        var rows=[];
        let rowsUpdated=false;
        for(let i=0;i<this.state.schools.length;i++){
            let nextPage=null;
            var pageLink=null;
            if(this.state.schools[i].schoolStatus==="ApprovedSchool"){
                nextPage="adminUploadDEOresponse"
                pageLink="Upload DEO response"
            }
            const newTo = { 
                pathname: "/"+nextPage, 
                school:this.state.schools[i],
                user:this.props.location.user,
                ...this.props
            };
            if(this.state.schools[i].schoolStatus!=="ApprovedSchool")
                continue;
            else{
                rowsUpdated=true;
                rows.push(<tr>
                    <td>{this.state.schools[i].schoolId}</td>
                    <td>{this.state.schools[i].schoolInfo.schoolRegNo}</td>
                    <td>{this.state.schools[i].schoolInfo.schoolName}</td>
                    <td>{this.state.schools[i].createdDate.split("T")[0]}</td>
                    <td><span className="label label-warning">{this.state.schools[i].schoolStatus}</span></td>
                    <td>{this.state.schools[i].address.district}</td>
                <td><a href=""><Link to={newTo}>{pageLink}</Link></a></td>
                </tr>)
            }
        }
        if(rowsUpdated==false)
            rows.push(<tr ><td align="center" colSpan="8">No new records found!</td></tr>)
        return rows;
    }   
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
                        <SmallBoxCard content="Logout" linkTo="/login" colour="bg-red"/>
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
                                    <th>Reg no</th>
                                    <th>Name</th>
                                    <th>Date Added</th>
                                    <th>Status</th>
                                    <th>Town</th>
                                    <th>Details</th>
                                </tr>
                                {this.state.schools!==null ? this.createTable():null}
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
        )
    }
}
export default withRouter(adminPendingWorkflow);