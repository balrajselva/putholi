import React, { Component } from 'react'
import { withRouter,Link } from 'react-router'
import axios from 'axios'
import MultipleImage from './components/multipleImage/MultipleImage';

class ReviewDeoResponse extends Component {
    state={
        deoRes:null,
        spinner:true
    }
    componentDidMount(){
        let project =null;
        console.log(this.props)
        for(let i=0;i<this.props.location.school.projects.length;i++){
            if(this.props.location.school.projects[i].status!=="PROJECT_CLOSED"){
              project=this.props.location.school.projects[i];
              break;
            }
          }
          if(project === null){
              window.alert("There are no active projects")
            return
          }
        axios.get(this.props.config+"/getDeoResponse/"+project.projectId)
        .then(res=>{
            console.log(res.data)
            this.setState({
                deoRes:res.data,
                spinner:false
            });
        })
        .catch(error=>{
            this.setState({spinner:false});
            window.alert("Unable to get school details due to "+error)
        })
    }
    updateStatus=({target})=>{
        this.setState({
          spinner:true, 
          status:target.id
        });
        if(target.id==="Accepted"){
          if(this.props.location.currentUser.role==="Reviewer")
            this.state.status="REVIEWER_DEO_APPROVED";
          else if(this.props.location.currentUser.role==="Approver")
            this.state.status="DEO_APPROVED";
        }
        
        else if(target.id==="Rejected"){
         if(this.props.location.currentUser.role==="Reviewer")
            this.state.status="REVIEWER_DEO_REJECTED";
          else if(this.props.location.currentUser.role==="Approver")
            this.state.status="APPROVER_DEO_REJECTED";
        }
        axios.put(this.props.config+"/updateSchool/"+this.props.location.school.schoolId+"/"+this.state.status)
        .then(res=>{
          if(res.data!==""){
            console.log(res.data);
            this.setState({spinner:false});
            window.alert("Status updated successfully");
            if(this.props.location.currentUser.role==="Reviewer"){
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
        return (
            <div className="content-wrapper">
            <section className="content-header">
                <h1>
                {this.props.location.school.schoolInfo.schoolName}
                </h1>
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
                        <span className="time"></span>
                        <h3 className="timeline-header"><a href="#">DEO</a> reponse and file</h3>
                        <div className="timeline-body">
                            <div className="box-body"><h4>
                            DEO response: <b>{this.state.deoRes!==null?this.state.deoRes.status:null}</b></h4>
                            </div>
                        </div>
                     
                        <div className="timeline-footer">
                            <button  type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#modal-default">Click to view DEO files</button>&nbsp;
                            <a id="Rejected" className="btn btn-danger btn-xs" onClick={(target)=>this.updateStatus(target)}>Reject</a>&nbsp;
                            <a id="Accepted" className="btn btn-primary btn-xs" onClick={(target)=>this.updateStatus(target)}>Confirm</a>&nbsp;
                            {/* <Link to={{pathname:returnLink, currentUser:this.props.location.currentUser}} className="btn btn-primary btn-xs">Back to List</Link> */}
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
                            {this.state.deoRes!==null?<MultipleImage images={this.state.deoRes.deOfiles}/>:null}
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
export default withRouter(ReviewDeoResponse)