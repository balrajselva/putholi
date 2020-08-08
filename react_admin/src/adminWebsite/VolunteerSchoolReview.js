import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import axios from 'axios'
import MultipleImage from './components/multipleImage/MultipleImage'

class VolunteerSchoolReview extends Component {
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
          spinner:true
        });
        if(target.id==="Accepted"){
            this.state.status="VolunteerAccepted";
        }
        else if(target.id==="Rejected"){
            this.state.status="VolunteerRejected";
        }
        axios.put(this.props.config+"/updateSchool/"+this.props.location.school.schoolId+"/"+this.state.status)
        .then(res=>{
          if(res.data!==""){
            console.log(res.data);
            this.setState({spinner:false});
            window.alert("Status updated successfully");
            this.props.history.push({ 
              pathname:"/volunteerSchoolCheck", 
              currentUser:this.props.location.currentUser
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
                        <div className="row">
                                    <div className="col-xs-12">
                                    <div className="box">
                                        <div className="box-body table-responsive no-padding">
                                            <table className="table table-hover">
                                            <tbody>
                                            <tr>
                                                    <th>User Comments </th>
                                                   </tr>
                                                <tr>
                                                    <td><textarea className="input-xlarge" ref ="comment" id="userComments" value={this.state.adminComments} onChange={this.handleChange} rows="3"></textarea></td>
                                                   
                                                </tr>
                                            </tbody></table>
                                            {this.state.errorMessage!=null?<div className="errorMessage" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}
                                        </div>
                                        </div>
                                        </div>
                                        </div>
                        <div className="timeline-footer">
                        <button  type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#modal-default">Click to view School Pictures</button>
                            <a id="Accepted" className="btn btn-danger btn-xs" onClick={(target)=>this.updateStatus(target)}>Accept</a>&nbsp;
                            <a id="Rejected" className="btn btn-primary btn-xs" onClick={(target)=>this.updateStatus(target)}>Reject</a>&nbsp;
                            <Link to={{pathname:"/volunteerSchoolCheck", currentUser:this.props.location.currentUser}} className="btn btn-primary btn-xs">Back to List</Link>
                        </div>
                        </div>
                    </li>
                    <li>
                        <div className="timeline-footer">
                        <a href="#" className="btn btn-xs bg-maroon">Go to Top</a>
                        </div>
                    </li>
                    </ul>
                </div>
                {/* /.col */}
                </div>
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
                                {this.props.location.school.schoolImages!==null?<MultipleImage images={this.props.location.school.schoolImages}/>:null}
                               </section>
                            </div>
                        </div>
                      </div>    
                    </div>
                    </div>
            </section>
            {/* /.content */}
            {this.state.spinner?<div class="spinner"></div>:null}
            </div>

        )
    }
}
export default withRouter(VolunteerSchoolReview);