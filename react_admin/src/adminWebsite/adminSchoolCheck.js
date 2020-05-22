import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import imageCss from '../adminWebsite/css/imageCss.css';

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
          if(this.props.location.currentUser.role==="Admin")
            this.state.status="AdminReviewed";
          else if(this.props.location.currentUser.role==="Reviewer")
            this.state.status="ReviewerConfirmed";
          else if(this.props.location.currentUser.role==="Approver")
            this.state.status="ApprovedSchool";
        }
        
        else if(target.id==="Rejected"){
          if(this.props.location.currentUser.role==="Admin")
            this.state.status="ReturnedToBeneficiary";
          else if(this.props.location.currentUser.role==="Reviewer")
            this.state.status="ReviewerRejected";
          else if(this.props.location.currentUser.role==="Approver")
            this.state.status="ApproverRejected";
        }
        axios.put("http://localhost:6060/puthuyir/updateSchool/"+this.props.location.school.schoolId+"/"+this.state.status)
        .then(res=>{
          if(res.data!==""){
            console.log(res.data);
            this.setState({spinner:false});
            window.alert("Status updated successfully");
            if(this.props.location.currentUser.role==="Admin"){
              this.props.history.push({ 
                pathname:"/adminNewSchoolReview", 
                currentUser:this.props.location.currentUser,
                school:this.props.location.school
              });
            }
            else if(this.props.location.currentUser.role==="Reviewer"){
              this.props.history.push({ 
                pathname:"/reviewer", 
                currentUser:this.props.location.currentUser,
                school:this.props.location.school
              });
            }
          else if(this.props.location.currentUser.role==="Approver"){
            this.props.history.push({ 
              pathname:"/approver", 
              currentUser:this.props.location.currentUser,
              school:this.props.location.school
            });
          }
          }
        })
        .catch(error=>{
            this.setState({spinner:false});
            window.alert("Status updated failed due to "+error);
        })
      }
    render() {
      let returnLink=null;
      if(this.props.location.currentUser.role==="Admin"){
        returnLink = "adminNewSchoolReview"
      }
      else if(this.props.location.currentUser.role==="Approver"){
        returnLink = "approver"
      }
      else if(this.props.location.currentUser.role==="Reviewer"){
        returnLink = "reviewer"
      }
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                    {this.props.location.school.schoolInfo.schoolName}
                    <small>added on</small>
                    </h1>
                    <ol className="breadcrumb">
                    <li><a href="../../index.html"><i className="fa fa-dashboard" /> Home</a></li>
                    </ol>
                </section>
                <section className="content">
                    <div className="row">
                    <div className="col-md-12">
                        <ul className="timeline">
                        <li className="time-label">
                            <span className="bg-red">
                            {this.props.location.school.createdDate.split("T")[0]}
                            </span>
                        </li>
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
                                <div className="box-body"><h4>Student/Teacher Details Below: </h4>
                                Number of Students: {this.props.location.school.schoolInfo.numberOfStudents}
                                <br></br>
                                Number of Teachers: {this.props.location.school.schoolInfo.numberOfTeachers}
                                <br></br>
                                Student / Teacher Ratio : {Math.round(this.props.location.school.schoolInfo.numberOfStudents/this.props.location.school.schoolInfo.numberOfTeachers)}
                                  &nbsp;(Guideline value to be greater  than 10)
                                </div>
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
                                <button  type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-default">Click to view School Pictures</button>
                                <a id="Rejected" className="btn btn-danger btn-xs" onClick={(target)=>this.updateStatus(target)}>RejectSchool</a>&nbsp;
                                <a id="Accepted" className="btn btn-primary btn-xs" onClick={(target)=>this.updateStatus(target)}>Confirm Requirements</a>&nbsp;
                                <Link to={{pathname:returnLink, currentUser:this.props.location.currentUser}} className="btn btn-primary btn-xs">Back to List</Link>
                            </div>
                            </div>
                        </li>
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
                       
                        <li>
                            <div className="timeline-footer">
                            <a href="#" className="btn btn-xs bg-maroon">Go to Top</a>
                            </div>
                        </li>
                        </ul>
                    </div>
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
                                <img src={'data:image/png;base64,'+this.props.location.school.schoolImages[0].image} id ="image1" alt="" ></img>
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

export default withRouter(adminSchoolCheck);