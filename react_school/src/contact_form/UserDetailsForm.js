import React, { Component } from 'react';
import '../css/Component_CSS/UserDetailsForm.css';
import axios from 'axios';
import Spinner from '../components/spinner/spinner';
import { withRouter } from 'react-router';

class UserDetailsForm extends Component {
    state={
        firstName:this.props.user.firstName,
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
        email:this.props.user.emailAddress,
        phoneNumber:null,
        identityProof:null,
        comments:null,
        password:this.props.user.password,
        localImageUrl:null,
        confirmPassword:null,
        createDropDown:false,
        spinner:false,
        lastErrorField:null,
        errorMessage:null
    }
    
    submitClicked=(e)=>{
        e.preventDefault();
        var emailRegex=/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        var mobNumRegex=/^(\+\d{1,3}[- ]?)?\d{10}$/;
        
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
        else if(this.state.identityProof===null){
            this.setState({
                lastErrorField:"identityProof",
                errorMessage:"Please upload Identity Proof"
            });
            document.getElementById('identityProof').style.borderColor="red";
        }
        else if(this.state.email===null || !emailRegex.test(this.state.email)){
            this.setState({
                lastErrorField:"email",
                errorMessage:"Please enter valid email ID"
            });
            document.getElementById('email').style.borderColor="red";
        }
        else if(this.state.phoneNumber===null || !mobNumRegex.test(this.state.phoneNumber)){
            this.setState({
                lastErrorField:"phoneNumber",
                errorMessage:"Please enter valid mobile number"
            });
            document.getElementById('phoneNumber').style.borderColor="red";
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
                firstName:this.props.user.firstName,
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
                role:this.state.role,
                status:"New User",
                emailAddress:this.props.user.emailAddress,
                phoneNumber:this.state.phoneNumber,
                proofOfId:{
                    image:this.state.fileInput,
                    comments:this.state.comments,
                 },
                comments:this.state.comments,
                password:this.state.password
            }
            var regFormModel=new FormData();
            regFormModel.set('payload',JSON.stringify(user));
            regFormModel.append('files',this.state.identityProof);
            console.log(regFormModel);
            this.props.saveUser(regFormModel);
        }
    }
    handleChange=({target})=>{
        this.setState({ [target.id]: target.value });
        if(this.state.lastErrorField!==null){
            document.getElementById(this.state.lastErrorField).style.borderColor="#d2d6de";
            this.setState({errorMessage:null})
        }
        if(target.id==="pincode" && target.value.length===6){
            this.setState({spinner:true});
            axios.get("https://api.postalpincode.in/pincode/"+target.value)
            .then(res=>{
                if(res.data[0].Message==="No records found"){
                    window.alert("Please enter valid Pincode or\n Manually enter the address");
                    this.setState({
                        spinner:false
                    })
                }
                else{                    
                    this.setState({
                        locality:res.data[0].PostOffice,
                        city:res.data[0].PostOffice[0].Division,
                        district:res.data[0].PostOffice[0].District,
                        state:res.data[0].PostOffice[0].State,
                        country:res.data[0].PostOffice[0].Country,
                        createDropDown:true,
                        spinner:false
                    });
                }
            })
        }
        else if(target.id==="identityProof"){
            const reader=new FileReader();
            const file=target.files[0];
            reader.onloadend=()=>{
                this.setState({
                    identityProof:file,
                    localImageUrl:reader.result
                })
            }
            reader.readAsDataURL(file)
        }
    }
    onCancel=(e)=>{
        e.preventDefault();
        this.props.history.push("/index");
    }

    render() {
        return (
            
            <div class="user-info card">
                
                <table>
                <caption><b>Provide all the details</b></caption>
                    <tr>
                        <td>
                            First Name : 
                        </td>
                        <td><input class="form-control" type="text" id="firstName" value={this.props.user.firstName} disabled/></td>
                    </tr>
                    <tr>
                        <td>
                            Last Name : 
                        </td>
                        <td><input class="form-control" type="text" id="lastName" value={this.state.lastName} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>
                            Gender : 
                        </td>
                        <td>
                            <select class="form-control" id="gender" placeholder="Select gender" onChange={this.handleChange}>
                                <option value="" hidden selected>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                        </td>                   
                    </tr>
                    <tr>
                        <td> 
                            Address line 1 :
                        </td>
                        <td><input class="form-control" type="text" id="addressLine_1" onChange={this.handleChange}/></td>
                    </tr>
                    <tr>
                        <td>
                            Address line 2 :
                        </td>
                        <td><input class="form-control" type="text" id="addressLine_2" onChange={this.handleChange}/></td>
                    </tr>
                    <tr>
                        <td>Pincode :</td>
                        <td><input class="form-control" type="text" id="pincode" onChange={this.handleChange}/></td>
                        <td>Localtiy : </td>
                        <select class="dropdown" id="selectedLocality" value={this.state.selectedLocality} onChange={this.handleChange}>
                                <option value="" selected hidden>Select Locality</option>
                                {this.state.createDropDown?this.state.locality.map((locality) => <option key={locality.Name} value={locality.Name}>{locality.Name}</option>):null}
                        </select>
                    </tr>
                                           
                    <tr>
                        <td>City :</td>
                        <td><input class="form-control" type="text" id="city" value={this.state.city} onChange={this.handleChange}/></td>
                        <td>District :</td>
                        <td><input class="form-control" type="text" id="district" value={this.state.district} onChange={this.handleChange}/></td>
                        {this.state.spinner?<Spinner/>:null}
                    </tr>
                    <tr>
                        <td>State : </td>
                        <td><input class="form-control" type="text" id="state" value={this.state.state} onChange={this.handleChange}/></td>
                        <td>Country : </td>
                        <td><input class="form-control" type="text" id="country" value={this.state.country} onChange={this.handleChange}/></td>
                    </tr>
                    
                    <tr>
                        <td>Role : </td>
                        <td>
                            <select class="form-control" id="role" value={this.selected} onChange={this.handleChange} >
                                <option value="" selected hidden>Select Role</option>
                                <option value="beneficiary">Beneficiary</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Email : </td>
                        <td><input class="form-control" type="email" id="email" value={this.props.user.emailAddress} disabled/>
                        </td>
                    </tr>
                    <tr>
                        <td>Mobile : </td>
                        <td><input class="form-control" type="text" id="phoneNumber" onChange={this.handleChange}/></td>
                    </tr>
                    <tr>
                        <td>Confirm password : </td>
                        <td><input class="form-control" type="password" id="confirmPassword" onChange={this.handleChange}/></td>
                    </tr>
                    <tr>
                        <td>Upload Identity proof : </td>
                        <td><input class="form-control" type="file" id="identityProof" accept="image/x-png,image/jpeg" onChange={this.handleChange}/></td>
                        <td colSpan="2">{this.state.localImageUrl?<div>Id proof preview:</div>:null}</td>
                    </tr>
                    <tr>
                        <td>Comments : </td>
                        <td><textarea  class="comments" id="comments" onChange={this.handleChange}/></td>
                        <td colSpan="2">{this.state.localImageUrl?<img width="80%" height="100%" src={this.state.localImageUrl} alt="pic"/>:null}</td>
                    </tr>
                    <tr>
                    <td colSpan="3"><div style={{color:"red",fontSize:"15px",marginBottom:"5px"}}>
                                       {this.state.errorMessage}
                                    </div></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><button type="button" class="btn btn-success" onClick={(e)=>this.submitClicked(e)}>Submit</button></td>
                        <td><button type="button" class="btn btn-danger" onClick={()=>this.onCancel()}>Cancel</button></td>
                    </tr>
                    <div class="btn-group" role="group" >
                   
                    </div>
                </table>
                
            </div>

        );
    }
}

export default withRouter(UserDetailsForm);
