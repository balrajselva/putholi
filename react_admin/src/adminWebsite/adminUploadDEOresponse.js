import React, { Component } from 'react';
import axios from 'axios';
import {Link,withRouter} from 'react-router-dom';

class adminUploadDEOresponse extends Component {
    state={
        localImageUrl : null,
        status : null,
        schoolId : this.props.location.school.schoolId,
        projectId : this.props.location.school.projects[0].projectId,
        lastErrorField : null,
        errorMessage : null,
        deoFile:null,
        spinner:false
    }
    handleChange=({target})=>{
        this.setState({errorMessage:null});
        if(target.id==="file"){
            this.setState({spinner:true});
            const reader=new FileReader();
            const file=target.files[0];
            
            reader.onloadend=()=>{
                this.setState({
                    deoFile:file,
                    localImageUrl:reader.result,
                    spinner:false
                })
            }
            reader.readAsDataURL(file)
        }
        else if(target.id==="approved"){
            // this.setState({status:"ADMIN_DEO_APPROVED"});
            this.setState({status:"DEO_APPROVED"});
        }
        else if(target.id==="rejected"){
            this.setState({status:"ADMIN_DEO_REJECTED"});
        }
        else{
            document.getElementById(target.id).style.borderColor="#d2d6de";
            this.setState({ 
                [target.id]: target.value , 
                lastErrorField:null,
                errorMessage:""
            });
        }
    }
    onSubmit=(e)=>{
        e.preventDefault();
        if(this.state.status===null){
            this.setState({errorMessage:"Please select whether approve or rejected"})
        }
        else if(this.state.deoFile===null){
            this.setState({errorMessage:"Please upload the DEO file"})
        }
        else{
            this.setState({
                spinner:true,
            })
            let deoResponse={
                school_id:this.state.schoolId,
                project_id:this.state.projectId,
                status:this.state.status
            }
            console.log(deoResponse);
            var regFormModel=new FormData();
            regFormModel.set('payload',JSON.stringify(deoResponse));
            regFormModel.append('files',this.state.deoFile)
            axios.post(this.props.config+"/school/saveDEOresponse",regFormModel)
            .then(res=>{
                console.log(res);
                this.setState({
                        spinner:false,
                    })
                if(res.status===200){
                    window.alert("File uploaded successfully!");
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
            {/* Content Header (Page header) */}
            <section className="content-header">
                <h1>
                Cuddalore Boys School
                <small>added on</small>
                </h1>
                <ol className="breadcrumb">
                <li><a href="../../index.html"><i className="fa fa-dashboard" /> Home</a></li>
                <li><a href="#">UI</a></li>
                </ol>
            </section>
            {/* Main content */}
            <section className="content">
                {/* row */}
                <div className="row">
                <div className="col-xs-12">
                    <div className="box">
                    <div className="box-header">
                        <h2 className="box-title"><b>Upload DEO Response</b></h2>
                        <div className="box-tools">
                        <div className="input-group input-group-sm" style={{width: 150}}>
                            <input type="text" name="table_search" className="form-control pull-right" placeholder="Search" />
                            <div className="input-group-btn">
                            <button type="submit" className="btn btn-default"><i className="fa fa-search" /></button>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="box box-primary">
                        <div className="box-header with-border">
                        <h2 className="box-title"><b>Role details like Beneficiary and name OR admin and name to be displayed</b></h2>
                        </div>
                        {/* /.box-header */}
                        {/* form start */}
                        <form role="form">
                        <div className="box-body">
                            <div className="radio">
                            <label>
                                <input type="radio" name="optionsRadios" id="approved" defaultValue="option1" onChange={this.handleChange}/>
                                DEO APPROVED
                            </label>
                            </div>
                            <div className="radio">
                            <label>
                                <input type="radio" name="optionsRadios" id="rejected" defaultValue="option2" onChange={this.handleChange}/>
                                DEO REJECTED
                            </label>
                            </div>
                            <div className="form-group">
                            <label htmlFor="exampleInputFile">Upload DEO Response here</label>
                            <input type="file" id="file" onChange={this.handleChange}/>
                            <p className="help-block">Display File Name</p>
                            </div>
                            <div className="checkbox">
                            <label>
                                <input type="checkbox" disabled defaultChecked />
                                Notify Beneficiary ( Retrieve Email id's)
                            </label>
                            </div>
                            <div className="checkbox">
                            <label>
                                <input type="checkbox" />
                                Notify Trust Members
                            </label>
                            </div>
                        </div>
                        {this.state.localImageUrl?<div style={{marginLeft:"10px"}}><b>DEO response preview :</b></div>:null}
                        {this.state.localImageUrl?<img style={{marginLeft:"10px"}} width="80%" height="100%" src={this.state.localImageUrl} alt="Identity proof"/>:null}
                        {/* /.box-body */}
                        {this.state.errorMessage!=null?<div className="errorMessage" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}

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
                                        </div></div>
                        <div className="box-footer">
                            <button type="submit" className="btn btn-primary" onClick={(e)=>this.onSubmit(e)}>Submit</button>&nbsp;
                            <Link to={schoolList} className="btn btn-primary">Back to User List</Link>
                        </div>
                        {this.state.spinner?<div class="spinner"></div>:null}
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            </div>

        )
    }
}
export default withRouter(adminUploadDEOresponse);
