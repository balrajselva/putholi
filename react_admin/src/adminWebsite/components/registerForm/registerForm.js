import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../registerForm/registerForm.css';
import axios from 'axios';

class registerForm extends Component {
    state={
        firstName:null,
        lastName:null,
        gender:null,
        addressLine_1:null,
        addressLine_2:null,
        pincode:null,
        locality:null,
        selectedLocality:null,
        district:null,
        city:null,
        state:null,
        country:null,
        role:null, 
        email:null,
        phoneNumber:null,
        identityProof:null,
        comments:null,
        password:null,
        localImageUrl:null,
        password:null,
        confirmPassword:null,
        createLocalityDropDown:false,
        lastErrorField:null
    }

    submitClicked=()=>{
        if(this.state.lastErrorField!==null)
            document.getElementById(this.state.lastErrorField).style.borderColor="#d2d6de";
        if(this.state.confirmPassword===null || this.state.confirmPassword.length<8 || this.state.password!==this.state.confirmPassword ){
            this.setState({
                lastErrorField:"confirmPassword",
                errorMessage:"Please enter atleast 8 character password or check whether password and confirm passowrd are same."
            });
            document.getElementById('confirmPassword').style.borderColor="red";
        }
        else if(this.state.firstName===null){
            this.setState({
                lastErrorField:"firstName",
                errorMessage:"Please enter First name"
        });
            document.getElementById('firstName').style.borderColor="red";
        }
        else if(this.state.gender===null){
            this.setState({
                lastErrorField:"gender",
                errorMessage:"Please select gender"
            });
            document.getElementById('gender').style.borderColor="red";
        }
        else if(this.state.role===null){
            this.setState({
                lastErrorField:"role",
                errorMessage:"Please select role"
            });
            document.getElementById('role').style.borderColor="red";
        }
        else if(this.state.addressLine_1===null){
            this.setState({
                lastErrorField:"addressLine_1",
                errorMessage:"Please enter Address Line 1"
            });
            document.getElementById('addressLine_1').style.borderColor="red";
        }
        else if(this.state.pincode===null){
            this.setState({
                lastErrorField:"pincode",
                errorMessage:"Please enter pincode"
            });
            document.getElementById('pincode').style.borderColor="red";
        }
        else if(this.state.selectedLocality===null){
            this.setState({
                lastErrorField:"selectedLocality",
                errorMessage:"Please select locality"
            });
            document.getElementById('selectedLocality').style.borderColor="red";
        }
        else if(this.state.state===null){
            this.setState({lastErrorField:"state"});
            document.getElementById('state').style.borderColor="red";
        }
        else if(this.state.city===null){
            this.setState({lastErrorField:"city"});
            document.getElementById('city').style.borderColor="red";
        }
        else if(this.state.district===null){
            this.setState({lastErrorField:"district"});
            document.getElementById('district').style.borderColor="red";
        }
        else if(this.state.country===null){
            this.setState({lastErrorField:"country"});
            document.getElementById('country').style.borderColor="red";
        }
        else if(this.state.identityProof===null){
            this.setState({
                lastErrorField:"identityProof",
                errorMessage:"Please upload Identity Proof"
            });
            document.getElementById('identityProof').style.borderColor="red";
        }
        else if(this.state.email===null){
            this.setState({
                lastErrorField:"email",
                errorMessage:"Please enter valid email ID"
            });
            document.getElementById('email').style.borderColor="red";
        }
        else if(this.state.phoneNumber===null || this.state.phoneNumber.match(/^\d{10}$/)){
            this.setState({
                lastErrorField:"phoneNumber",
                errorMessage:"Please enter valid mobile number"
            });
            document.getElementById('phoneNumber').style.borderColor="red";
        }
        else if(!document.getElementById('checkBox').checked){
            this.setState({
                lastErrorField:"checkBox",
                errorMessage:"Please agree for terms and conditions"
            });
            document.getElementById('checkBox').style.borderColor="red";
        }
        else{
            document.getElementById('confirmPassword').style.borderColor="#d2d6de";
            document.getElementById('firstName').style.borderColor="#d2d6de";
            document.getElementById('gender').style.borderColor="#d2d6de";
            document.getElementById('role').style.borderColor="#d2d6de";
            document.getElementById('addressLine_1').style.borderColor="#d2d6de";
            document.getElementById('pincode').style.borderColor="#d2d6de";
            document.getElementById('selectedLocality').style.borderColor="#d2d6de";
            document.getElementById('state').style.borderColor="#d2d6de";
            document.getElementById('city').style.borderColor="#d2d6de";
            document.getElementById('district').style.borderColor="#d2d6de";
            document.getElementById('country').style.borderColor="#d2d6de";
            document.getElementById('identityProof').style.borderColor="#d2d6de";
            document.getElementById('email').style.borderColor="#d2d6de";
            document.getElementById('phoneNumber').style.borderColor="#d2d6de";
            const user={
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                gender:this.state.gender,
                address:{
                    addressLine1:this.state.addressLine_1,
                    addressLine2:this.state.addressLine_2,
                    pinCode:this.state.pincode,
                    locality:this.state.selectedLocality,
                    district:this.state.district,
                    city:this.state.city,
                    state:this.state.state,
                    country:this.state.country,
                },
                status:"New User",
                role:this.state.role,
                emailAddress:this.state.email,
                phoneNumber:this.state.phoneNumber,
                identityProof:this.state.identityProof,
                comments:this.state.comments,
                password:this.state.password,
                sponsorName:null,
                sponsorEmail:null
            }
            console.log(user);
            this.props.saveUser(user);
        }
    }

    handleChange=({target})=>{
        document.getElementById(target.id).style.borderColor="#d2d6de";
        this.setState({ 
            [target.id]: target.value , 
            lastErrorField:null,
            errorMessage:""
        });
        if(target.id==="pincode" && target.value.length===6){
            this.setState({spinner:true});
            axios.get("https://api.postalpincode.in/pincode/"+target.value)
            .then(res=>{
                console.log(res);
                if(res.data[0].Message==="No records found"){
                    this.setState({
                        spinner:false,
                        errorMessage:"Please enter valid Pincode or enter address manually."
                    })
                }
                else{                    
                    this.setState({
                        locality:res.data[0].PostOffice,
                        city:res.data[0].PostOffice[0].Division,
                        district:res.data[0].PostOffice[0].District,
                        state:res.data[0].PostOffice[0].State,
                        country:res.data[0].PostOffice[0].Country,
                        createLocalityDropDown:true,
                        spinner:false
                    });
                }
            })
        }
        else if(target.id==="identityProof"){
            this.setState({spinner:true});
            const reader=new FileReader();
            const file=target.files[0];
            
            reader.onloadend=()=>{
                this.setState({
                    identityProof:file,
                    localImageUrl:reader.result,
                    spinner:false
                })
            }
            reader.readAsDataURL(file)
        }
    }
    currentPincode=()=>{
        if(this.state.pincode!=null && this.state.pincode.length!=6){
            this.setState({pinCode:""});
            document.getElementById("pincode").value="";
        }
    }

    render() {
        return (
            <div>
               <div className="row">
                    <div className="form-group has-feedback col-md-6">
                        <input type="text" className="form-control" id="firstName" value={this.state.firstName} placeholder="First name" onChange={this.handleChange}/>
                        <span className="glyphicon glyphicon-user form-control-feedback" />
                    </div>
                    <div className="form-group has-feedback col-md-6">
                        <input type="text" className="form-control" id="lastName" value={this.state.lastName} placeholder="Last name" onChange={this.handleChange}/>
                        <span className="glyphicon glyphicon-user form-control-feedback" />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group has-feedback col-md-6">
                        <select className="form-control select2" style={{width: '100%'}} id="gender" value={this.state.gender} onChange={this.handleChange}>
                            <option selected="selected">Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                        <span className="glyphicon glyphicon-user form-control-feedback" />
                    </div>
                    <div className="form-group has-feedback col-md-6">
                        <select className="form-control select2" style={{width: '100%'}} id="role" value={this.state.role} onChange={this.handleChange}>
                            <option selected="selected">Select Role</option>
                            {this.props.roles.map((role) => <option key={role} value={role}>{role}</option>)}
                        </select>
                        <span className="glyphicon glyphicon-star form-control-feedback" />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group has-feedback col-md-6">
                        <input type="text" className="form-control" id="addressLine_1" onChange={this.handleChange} placeholder="Address Line 1" onChange={this.handleChange}/>
                        <span className="glyphicon glyphicon-home form-control-feedback" />
                    </div>
                    <div className="form-group has-feedback col-md-6">
                        <input type="text" className="form-control" id="addressLine_2" onChange={this.handleChange} placeholder="Address Line 2" onChange={this.handleChange}/>
                        <span className="glyphicon glyphicon-home form-control-feedback" />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group has-feedback col-md-6">
                        <input type="text" className="form-control" id="pincode" placeholder="Pincode" onChange={this.handleChange} onMouseLeave={()=>this.currentPincode()}/>
                        <span className="glyphicon glyphicon-home form-control-feedback" />
                    </div>
                    <div className="form-group has-feedback col-md-6">
                        <select className="form-control select2" id="selectedLocality" value={this.state.selectedLocality} onChange={this.handleChange} style={{width: '100%'}}>
                            <option selected="selected">Select Locality</option>
                            {this.state.createLocalityDropDown?this.state.locality.map((locality) => <option key={locality.Name} value={locality.Name}>{locality.Name}</option>):null}
                        </select>
                        <span className="glyphicon glyphicon-home form-control-feedback" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group has-feedback col-md-6">
                        <input type="text" className="form-control" id="city" value={this.state.city} placeholder="City" onChange={this.handleChange}/>
                        <span className="glyphicon glyphicon-home form-control-feedback" />
                    </div>
                    <div className="form-group has-feedback col-md-6">
                        <input type="text" className="form-control" id="district" value={this.state.district} placeholder="District" onChange={this.handleChange}/>
                        <span className="glyphicon glyphicon-home form-control-feedback" />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group has-feedback col-md-6">
                        <input type="text" className="form-control" id="state" value={this.state.state} placeholder="State" onChange={this.handleChange}/>
                        <span className="glyphicon glyphicon-home form-control-feedback" />
                    </div>
                    <div className="form-group has-feedback col-md-6">
                        <input type="text" className="form-control" id="country" value={this.state.country} placeholder="Country" onChange={this.handleChange}/>
                        <span className="glyphicon glyphicon-home form-control-feedback" />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group has-feedback col-md-6">
                        <input type="email" className="form-control" id="email" value={this.state.emailAddress} placeholder="Email" onChange={this.handleChange}/>
                        <span className="glyphicon glyphicon-envelope form-control-feedback" />
                    </div>
                    <div className="form-group has-feedback col-md-6">
                        <input type="phone" className="form-control" id="phoneNumber" onChange={this.handleChange} placeholder="Mobile" onChange={this.handleChange}/>
                        <span className="glyphicon glyphicon-phone form-control-feedback" />
                    </div>
                </div>
                <div className="form-group has-feedback">
                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handleChange}/>
                    <span className="glyphicon glyphicon-lock form-control-feedback" />
                </div>
                <div className="form-group has-feedback">
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password" onChange={this.handleChange}/>
                    <span className="glyphicon glyphicon-log-in form-control-feedback" />
                </div>
                {this.state.errorMessage!=null?<div className="errorMessage" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}
                <div className="row">
                    <div className="form-group">
                    <div className="col-md-3"><b>Upload Identity Proof :</b></div>
                    <div className="col-md-6"><input type="file" id="identityProof" onChange={this.handleChange}/></div>
                    </div>
                </div>
                {this.state.localImageUrl?<div style={{marginLeft:"10px"}}><b>Identity proof preview :</b></div>:null}
                {this.state.localImageUrl?<img style={{marginLeft:"10px"}} width="80%" height="100%" src={this.state.localImageUrl} alt="Identity proof"/>:null}
                <div className="checkbox icheck" style={{marginLeft:'4%'}}>
                    <input type="checkbox" id="checkBox"/> I agree to the <a href="#">terms and conditions</a>
                </div>
                <div className="col-md-12">
                    <button type="submit" className="btn btn-primary btn-block btn-flat" onClick={()=>this.submitClicked()}>Register</button><br/>
                    </div>
                  <Link to="/volunteerLogin" className="text-center" style={{marginLeft:'2%'}}>Already have a membership? Login...</Link>
                  {this.state.spinner?<div class="spinner"></div>:null}
            </div>
        );
    }
}

export default registerForm;