import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import SmallBoxCard from './components/smallBoxCard/SmallBoxCard';
import axios from 'axios'

class ReassignVolunteer extends Component {
    state={
        school:null,
        schoolId:null,
        errorMessage:null,
        volunteerList:null,
        oldVolunteer:null,
        newVolunteer:null,
        newVolunteerId:null,
        spinner:false
    }

    handleChange=({target})=>{
        document.getElementById(target.id).style.borderColor="#d2d6de";
        this.setState({ 
            [target.id]: target.value , 
            lastErrorField:null,
            errorMessage:""
        });
        if(target.id==="newVolunteer"){
          this.setState({
            newVolunteer:target.value.split("+")[1],
            newVolunteerId:target.value.split("+")[0]
        })
        }
    }

    componentDidMount(){
        axios.get("http://localhost:6060/puthuyir/volunteer/getAll")
        .then(res=>{
            console.log(res.data)
            this.setState({
                volunteerList:res.data,
                spinner:false
            });
        })
        .catch(error=>{
            this.setState({spinner:false});
            window.alert("Unable to get school details due to "+error)
        })
    }

    closeModel=()=>{
      document.getElementById('modal-default').style.display='none';
    }

    fetchSchool=()=>{
        if(this.state.schoolId === null){
            this.setState({
                errorMessage:"Please enter the school Id"
            })
            document.getElementById("schoolId").style.borderColor="red";
            return
        }
        this.setState({spinner:true})
        axios.get("http://localhost:6060/puthuyir/school/"+this.state.schoolId)
        .then(res=>{
            console.log(res.data)
            if(res.data.length !== 0){
                this.setState({
                    school:res.data
                })
                axios.get("http://localhost:6060/puthuyir/user/"+res.data.volunteerId)
                .then(res=>{
                  this.setState({
                    oldVolunteer: res.data,
                    spinner:false
                  })
                })
                document.getElementById('modal-default').style.display='block';
              }
            else{
                this.setState({
                    errorMessage:"Please enter valid school Id",
                    spinner:false
                })
                document.getElementById('modal-default').style.display='none';
            }
        })
        .catch(error=>{
            window.alert("Couldn't fetch school due to "+error)
            this.setState({spinner:false})
        })
    }

    saveVolunteer=()=>{
      if(this.state.newVolunteerId===null){
        this.setState({
          errorMessage:"Please select new volunteer for this school"
        })
      }
      else{
        this.setState({
          spinner:true,
        })
        axios.post("http://localhost:6060/puthuyir/school/changeVolunteer/"+this.state.school.schoolId+"/"+this.state.school.volunteerId+"/"+this.state.newVolunteerId)
        .then(res=>{
            console.log(res);
            this.setState({
                spinner:false
            })
            if(res.status===200){
                window.alert("Volunteer changed successfully!");
                this.props.history.push({
                        pathname:"/adminPendingWorkflow",
                        currentUser:this.props.location.currentUser,
                        ...this.props
                })
            }
        })
        .catch(error=>{
            this.setState({
                spinner:false
            })
            window.alert("File upload failed due to "+error)
        })
      }
    }
   
    render() {
        return (
            <div className="content-wrapper">
            <section className="content-header">
              <h1>
                Volunteer Re-Assignment Screen
              </h1>
            </section>
              <section className="content">
              <div className="input-group">
                <span className="input-group-addon">Enter School Id</span>
                <input className="form-control" placeholder="Enter school Id" id="schoolId" value={this.state.schoolRegNum} onChange={this.handleChange} />
                </div>
                <div className="input-group">
                <br />
                {this.state.errorMessage!=null?<div className="errorMessage" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}
                <button type="button" onClick={()=>this.fetchSchool()} className="btn btn-success" >
                    Find school
                    </button>
                </div>
              <div className="modal" id="modal-default">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModel}>
                        <span aria-hidden="true">×</span></button>
                      <h4 className="modal-title">Select Available Volunteers</h4>
                    </div>
                    <div className="modal-body">
                    <form>
                    <div className="form-group has-feedback col-md-6">
                      <label for="name">Old Volunteer</label>
                      {this.state.oldVolunteer!==null?<input type="text" className="form-control" value={this.state.oldVolunteer.firstName} placeholder="Old Volunteer" disabled/>:null}
                      <span className="glyphicon glyphicon-user form-control-feedback" />
                    </div>
                    <div className="form-group has-feedback col-md-6">
                        <select className="form-control select2" style={{width: '100%'}} id="newVolunteer" value={this.state.role} onChange={this.handleChange}>
                            <option selected="selected">Select New Volunteer</option>
                            {this.state.volunteerList!==null?this.state.volunteerList.map((volunteer) => <option key={volunteer.userid} value={volunteer.userid+'+'+volunteer.firstName}>{volunteer.firstName}-{volunteer.address.city},{volunteer.address.district}</option>):null}
                        </select>
                        <span className="glyphicon glyphicon-user form-control-feedback" />
                    </div>
                    </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-default pull-left" onClick={this.closeModel}>Close</button>
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
export default withRouter(ReassignVolunteer)