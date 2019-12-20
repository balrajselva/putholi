import React, { Component } from 'react';
import '../css/Component_CSS/UserDetailsForm.css';
import axios from 'axios';
import Spinner from '../components/spinner/spinner';

class UserDetailsForm extends Component {
    state={
        firstName:this.props.user.firstName,
        lastName:"",
        gender:"",
        addressLine_1:"",
        addressLine_2:"",
        pincode:"",
        locality:"",
        selectedLocality:"",
        district:"",
        city:"",
        state:"",
        country:"",
        role:"", 
        email:this.props.user.emailAddress,
        phoneNumber:"",
        identityProof:"",
        comments:"",
        password:this.props.user.password,
        localImageUrl:"",
        confirmPassword:"",
        createDropDown:false,
        spinner:false
    }
    
    submitClicked=()=>{
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
                identityProof:this.state.identityProof,
                comments:this.state.comments,
                password:this.state.password
            }
        console.log(user);
        this.props.saveUser(user);
    }
    handleChange=({target})=>{
        this.setState({ [target.id]: target.value });
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
                console.log(this.state.localImageUrl,this.state.identityProof);
            }
            reader.readAsDataURL(file)
        }
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
                        <td></td>
                        <td><button type="button" class="btn btn-success" onClick={()=>this.submitClicked()}>Submit</button></td>
                        <td><button type="button" class="btn btn-danger" onclick="resetForm()">Cancel</button></td>
                    </tr>
                    <div class="btn-group" role="group" >
                   
                    </div>
                </table>
                
            </div>

        );
    }
}

export default UserDetailsForm;