import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import SmallBoxCard from './components/smallBoxCard/SmallBoxCard';
import axios from 'axios'

class VolunteerSchoolCheck extends Component {
    state={
        spinner:true,
        school:null
    }
    componentDidMount(){
        axios.get("http://localhost:6060/puthuyir/school/"+this.props.location.user.school_id)
        .then(res=>{
            console.log(res.data)
            this.setState({
                school:res.data,
                spinner:false
            })
        })
    }
    createTable=()=>{
        var rows=[];
        let rowsUpdated=false;
            let newTo=null;
            let pageLink=null;
            if(this.state.school.schoolStatus==="VOLUNTEER_ASSIGNED"){
                newTo = { 
                    pathname: "/volunteerSchoolReview", 
                    school:this.state.school,
                    user:this.props.location.user
                };
                pageLink="More Details";
            }
            if(this.state.school.schoolStatus==="VolunteerAccepted"){
                newTo = { 
                    pathname: "/viewRequirements", 
                    school:this.state.school,
                    user:this.props.location.user
                };
                pageLink="View requirements";
            }
            rowsUpdated=true;
            rows.push(<tr>
                <td>{this.state.school.schoolId}</td>
                <td>{this.state.school.schoolInfo.schoolRegNo}</td>
                <td>{this.state.school.schoolInfo.schoolName}</td>
                <td><span className="label label-warning">{this.state.school.schoolStatus}</span></td>
                <td>{this.state.school.address.district}</td>
                <td><a href=""><Link to={newTo}>{pageLink}</Link></a></td>
            </tr>)			
        if(rowsUpdated==false)
            rows.push(<tr ><td align="center" colSpan="5">No new records found!</td></tr>)
        return rows;
    }
    render() {
        return (
            <div>
                <div className="content-wrapper">
                <section className="content-header">
                    {/* Small boxes (Stat box) */}
                    <div className="row">
                    <SmallBoxCard content={this.props.location.user.role} linkTo="/volunteerSchoolCheck" colour="bg-green"/>
                    {/* ./col */}
                    <SmallBoxCard content="Inbox" linkTo="/volunteer" colour="bg-yellow"/>
                    {/* ./col */}
                    <SmallBoxCard content="Logout" linkTo="/login" colour="bg-red"/>{/* ./col */}
                    </div>
                    <h1>
                    Volunteer
                    <small>screen</small>
                    </h1>
                </section>
                    {/* Main content */}
                    <section className="content">
                        <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                            <div className="box-header">
                                <center><h3 className="box-title">Volunteer - School Assignment Screen</h3></center>
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
                            <div className="box">
                                <div className="box-header">
                                <h3 className="box-title">Accept/Reject the School Assignments</h3>
                                </div>
                                {/* /.box-header */}
                                <div className="box-body no-padding">
                                <table className="table table-striped">
                                    <tbody><tr>
                                        <th>School ID</th>
                                        <th>School reg. no</th>
                                        <th>School Name</th>
                                        <th>Status</th>
                                        <th>District</th>
                                        <th>More Details</th>
                                    </tr>
                                    {this.state.school!==null?this.createTable():<tr><td align="center" colSpan="7">School have not been assigned!</td></tr>}
                                    </tbody></table>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        {this.state.spinner?<div class="spinner"></div>:null}
                    </section>
                    </div>
            </div>
        )
    }
}
export default withRouter(VolunteerSchoolCheck);
