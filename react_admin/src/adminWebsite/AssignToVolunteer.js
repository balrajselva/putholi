import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom';
import axios from 'axios';

class AssignToVolunteer extends Component {
    state={
        district:null,
        spinner:false,
        volunteerList:null,
        selectedVolunteer:null,
        selectedVolunteerId:null,
        statement:null,
        errorMessage:null,
        spinner:false
    }

    handleChange=({target})=>{
        this.setState({
            [target.id]:target.value,
            errorMessage:null
        })
        if(target.id==="selectedVolunteer"){
          this.setState({
            selectedVolunteer:target.value.split("+")[1],
            selectedVolunteerId:target.value.split("+")[0]
        })
        }
    }


    saveVolunteer=()=>{
        this.setState({
            statement:"Selected '"+this.state.selectedVolunteer+"' as Volunteer for this school"
        })
    }
    
    getUsers=(e)=>{
        e.preventDefault();
        this.setState({spinner:true})
        axios.get(this.props.config+"/volunteer/"+this.props.location.school.address.district)
        .then(res=>{
            console.log(res.data)
            if(res.data.length !== 0){
              this.setState({
                  spinner:false,
                  volunteerList:res.data
              });
            }
            else{
              window.alert("Couldn't find volunteers associated to the school district. Displaying all the available volunteers")
              axios.get(this.props.config+"/volunteer/getAll")
              .then(res=>{
                if(res.data.length === 0){
                  window.alert("There are no active volunteers right now")
                  this.setState({
                    spinner:false
                  })
                }
                else{
                  this.setState({
                    spinner:false,
                    volunteerList:res.data
                });
                }
              })
            }
        })
        .catch(error=>{
            this.setState({spinner:false})
            window.alert("Could not fetch volunteer due to "+error)
        })
    }

    onSubmit=(e)=>{
      e.preventDefault();
      if(this.state.selectedVolunteerId===null){
        this.setState({
          errorMessage:"Please select volunteer for this school"
        })
      }
      else{
        this.setState({
          spinner:true,
        })
        var schoolId=this.props.location.school.schoolId
        var userId=this.state.selectedVolunteerId
        console.log(schoolId,userId);
        axios.post(this.props.config+"/school/assignSchool/"+schoolId+"/"+userId)
        .then(res=>{
            console.log(res);
            this.setState({
                spinner:false,
            })
            if(res.status===200){
                window.alert("Status updated successfully!");
                this.props.history.push({
                        pathname:"/adminPendingWorkflow",
                        currentUser:this.props.location.currentUser,
                        ...this.props
                })
            }
        })
        .catch(error=>{
            this.setState({
                spinner:false,
            })
            window.alert("File upload failed due to "+error)
        })
      }
    }
    render() {
      const schoolList={
        pathname:"/adminPendingWorkflow",
        currentUser:this.props.location.currentUser,
        ...this.props
      }
        return (
          <div className="content-wrapper">
            <section className="content-header">
              <h1>
                Volunteer Assignment Screen
              </h1>
              <ol className="breadcrumb">
                <li><a href="../../admin_main_screen.html"><i className="fa fa-dashboard" /> Home</a></li>
              </ol>
            </section>
              <section className="content">
              <div className="row">
                <div className="col-xs-12">
                  <div className="box box-default">
                    <div className="box-header with-border">
                      <h2 className="box-title">Select Volunteers</h2>
                    </div>
                    <div className="box-body">
                      <div className="form-group">
                        <h2>{this.props.location.school.schoolInfo.schoolName}</h2>
                  <h5>{this.props.location.school.address.city},{this.props.location.school.address.district}</h5>
                      </div>

                      <div className="row">
                                    <div className="col-xs-12">
                                    <div className="box">
                                        {/* <div className="box-header">
                                            <h4 className="box-title">Search Users</h4>
                                        </div> */}
                                        <div className="box-body table-responsive no-padding">
                                            <table className="table table-hover">
                                            <tbody>
                                            <tr>
                                                    <th>User Comments </th>
                                                    <th>Admin Comments </th>
                                                </tr>
                                                <tr>
                                                    <td><textarea className="input-xlarge" ref ="comment" id="adminComments" value={this.state.adminComments} onChange={this.handleChange} rows="3"></textarea></td>
                                                    <td><textarea className="input-xlarge" ref ="comment" id="adminComments" value={this.state.adminComments} onChange={this.handleChange} rows="3"></textarea></td>
                                                </tr>
                                            </tbody></table>
                                            {this.state.errorMessage!=null?<div className="errorMessage" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}
                                        </div>
                                        </div>
                                        </div>
                                        </div>

                      <button type="button" className="btn btn-default" data-toggle="modal" data-target="#modal-default" onClick={(e)=>this.getUsers(e)}>
                        View avaliable Volunteers
                      </button>
                    </div>
                    <div className="form-group">
                      <br />
                      <pre>{"            "}<label>{this.state.statement}</label></pre>
                      <br />
                      <br />
                      {this.state.errorMessage!=null?<div className="errorMessage" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}
                      <a><button type="submit" className="btn btn-info" onClick={(e)=>this.onSubmit(e)}>
                          Confirm Volunteer to this school
                        </button></a>&nbsp;&nbsp;
                      <Link to={schoolList}><button type="button" className="btn btn-primary">
                          Back
                        </button></Link>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
              <div className="modal fade" id="modal-default">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span></button>
                      <h4 className="modal-title">Select Available Volunteers</h4>
                    </div>
                    <div className="modal-body">
                      <div className="form-group">
                        <label>Select Volunteer</label>
                        <select className="form-control" id="selectedVolunteer" onChange={this.handleChange}>
                          <option selected disabled>Select volunteer</option>
                          {this.state.volunteerList!==null?this.state.volunteerList.map((volunteer) => <option key={volunteer.userid} value={volunteer.userid+'+'+volunteer.firstName}>{volunteer.firstName}-{volunteer.address.city},{volunteer.address.district}</option>):null}
                        </select>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>&nbsp;&nbsp;
                      <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>this.saveVolunteer()}>Save Changes</button>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.spinner?<div class="spinner"></div>:null}
            </section>
          </div>
        )
    }
}
export default withRouter(AssignToVolunteer);