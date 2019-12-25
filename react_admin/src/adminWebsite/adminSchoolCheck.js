import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

class adminSchoolCheck extends Component {
    state={
        spinner:false,
        status:null
    }
    createReqList=()=>{
        let rows=[];
        for(let i=0;i<this.props.location.school.projects[0].requirements.length;i++){
        rows.push(<li>{this.props.location.school.projects[0].requirements[i].reqType}-{this.props.location.school.projects[0].requirements[i].assetName}-{this.props.location.school.projects[0].requirements[i].quantity}</li>)
        }
        return rows;
    }
    updateStatus=({target})=>{
        this.setState({
          spinner:true, 
          status:target.id
        });
        if(target.id==="Accepted"){
          if(this.props.location.user.role==="Admin")
            this.state.status="AdminReviewed";
          else if(this.props.location.user.role==="Reviewer")
            this.state.status="ReviewerConfirmed";
          else if(this.props.location.user.role==="Approver")
            this.state.status="ApprovedSchool";
        }
        else{
          if(this.props.location.user.role==="Admin")
            this.state.status="AdminRejected";
          else if(this.props.location.user.role==="Reviewer")
            this.state.status="ReviewerRejected";
          else if(this.props.location.user.role==="Approver")
            this.state.status="ApproverRejected";
        }
        axios.put("http://localhost:6060/puthuyir/updateSchool/"+this.props.location.school.schoolId+"/"+this.state.status)
        .then(res=>{
          if(res.data!==""){
            console.log(res.data);
            this.setState({spinner:false});
            window.alert("Status updated successfully");
            this.props.history.push({ 
              pathname:"/adminNewSchoolReview", 
              user:this.props.location.user
            });
          }
        })
        .catch(error=>{
            this.setState({spinner:false});
            window.alert("Status updated failed due to "+error);
        })
      }
    render() {
        return (
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                    {this.props.location.school.schoolInfo.schoolName}
                    <small>added on</small>
                    </h1>
                    <ol className="breadcrumb">
                    <li><a href="../../index.html"><i className="fa fa-dashboard" /> Home</a></li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content">
                    {/* row */}
                    <div className="row">
                    <div className="col-md-12">
                        {/* The time line */}
                        <ul className="timeline">
                        {/* timeline time label */}
                        <li className="time-label">
                            <span className="bg-red">
                            {this.props.location.school.createdDate.split("T")[0]}
                            </span>
                        </li>
                        {/* /.timeline-label */}
                        {/* timeline item */}
                        <li>
                            <i className="fa fa-envelope bg-blue" />
                            <div className="timeline-item">
                            <span className="time"><i className="fa fa-clock-o" /> 12:05</span>
                            <h3 className="timeline-header"><a href="#">Requirements</a> listed below</h3>
                            <div className="timeline-body">
                                <div className="box-body">
                                <ul>
                                    {this.createReqList()}
                                </ul>
                                <h4>Address of the School</h4>
                                <ul>
                                    <li>
                                        {this.props.location.school.address.addressLine1},
                                        {this.props.location.school.address.addressLine2},
                                        {this.props.location.school.address.locality},
                                        {this.props.location.school.address.city},
                                        {this.props.location.school.address.district},
                                        {this.props.location.school.address.state}.
                                    </li>
                                </ul>
                                </div>
                            </div>
                            <div className="timeline-footer">
                                <a className="btn btn-default">Click to view School Pictures</a>&nbsp;
                                <a id="Returned" className="btn btn-danger btn-xs" onClick={(target)=>this.updateStatus(target)}>Return to Beneficiary</a>&nbsp;
                                <a id="Accepted" className="btn btn-primary btn-xs" onClick={(target)=>this.updateStatus(target)}>Confirm Requirements</a>&nbsp;
                                <Link to={{pathname:"/adminNewSchoolReview", user:this.props.location.user}} className="btn btn-primary btn-xs">Back to List</Link>
                            </div>
                            </div>
                        </li>
                        {/* END timeline item */}
                        {/* timeline item */}
                        <li>
                            <i className="fa fa-user bg-aqua" />
                            <div className="timeline-item">
                            <span className="time"><i className="fa fa-clock-o" /> 25 mins ago</span>
                            <h3 className="timeline-header no-border">Beneficiary to resubmit the requirements</h3>
                            </div>
                        </li>
                        <li>
                            <i className="fa fa-user bg-aqua" />
                            <div className="timeline-item">
                            <span className="time"><i className="fa fa-clock-o" /> 25 mins ago</span>
                            <h3 className="timeline-header no-border"><a href="#">Admin History - </a> Initial Check complete</h3>
                            </div>
                        </li>
                        {/* END timeline item */}
                        {/* timeline item */}
                        {/* END timeline item */}
                        {/* timeline time label */}
                        {/* /.timeline-label */}
                        {/* timeline item */}
                        {/* END timeline item */}
                        {/* timeline item */}
                        <li>
                            <div className="timeline-footer">
                            <a href="#" className="btn btn-xs bg-maroon">Go to Top</a>
                            </div>
                        </li>
                        {/* END timeline item */}
                        </ul>
                    </div>
                    {/* /.col */}
                    </div>
                    {/* /.row */}
                    {/* /.row */}
                </section>
                {/* /.content */}
                {this.state.spinner?<div class="spinner"></div>:null}
                </div>

        )
    }
}

export default withRouter(adminSchoolCheck);