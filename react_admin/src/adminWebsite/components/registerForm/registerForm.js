import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../registerForm/registerForm.css';
import axios from 'axios';
import '../../css/sliderImage.css';
import MultipleImage from '../multipleImage/MultipleImage';

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
        identityProof:[],
        comments:null,
        password:null,
        localImageUrl:[],
        password:null,
        confirmPassword:null,
        createLocalityDropDown:false,
        lastErrorField:null,
        currentIndex: 0,
        translateValue: 0
    }

    
    submitClicked=()=>{
        //var emailRegex=/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z0-9]+$/;
        var emailRegex=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var mobNumRegex=/^(\+\d{1,3}[- ]?)?\d{10}$/;
        
        if(this.state.lastErrorField!==null)
            document.getElementById(this.state.lastErrorField).style.borderColor="#d2d6de";
        
        if(this.state.firstName===null){
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
        else if(this.state.pincode===null || this.state.pincode===""){
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
        else if(this.state.confirmPassword===null || this.state.confirmPassword.length<8 || this.state.password!==this.state.confirmPassword ){
            this.setState({
                lastErrorField:"confirmPassword",
                errorMessage:"Please enter atleast 8 character password or check whether password and confirm passowrd are same."
            });
            document.getElementById('confirmPassword').style.borderColor="red";
        }
        else if(this.state.identityProof.length===0){
            this.setState({
                lastErrorField:"identityProof",
                errorMessage:"Please upload Identity Proof"
            });
            document.getElementById('identityProof').style.borderColor="red";
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
            let status="PaymentPending";
            if(this.state.role==="Volunteer"){
                status="NewUser"
            }
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
                status:status,
                role:this.state.role,
                emailAddress:this.state.email,
                phoneNumber:this.state.phoneNumber,
                comments:this.state.comments,
                password:this.state.password,
                sponsorName:null,
                sponsorEmail:null,
                proofOfId:{
                    image:this.state.identityProof,
                    comments:"",
                 },
            }
            var regFormModel=new FormData();
            regFormModel.set('payload',JSON.stringify(user));
            this.state.identityProof.forEach(file=>{
                regFormModel.append('files',file);
            })
            console.log(regFormModel);
            this.props.saveUser(regFormModel);
        }
    }

    handleChange=({target})=>{
        if(target.id==="identityProof"){
            for(let i=0;i<target.files.length;i++){
                if(target.files[i] && target.files[i].type.match('image.*') && parseFloat(target.files[i].size/1024).toFixed(2) > 2000){
                    window.alert("Image size should be within 2MB");
                    return
                }
                else{
                    this.setState({spinner:true});
                    const reader=new FileReader();
                    const file=target.files[i]; 
                    if (file && file.type.match('image.*')) {
                        reader.readAsDataURL(file);
                    }
                    else{
                        this.setState({
                            identityProof:null,
                            localImageUrl:null,
                            spinner:false
                        })
                    }
                    reader.onloadend=()=>{
                        console.log(target.files[i])
                        let tempFile=[...this.state.identityProof];
                        tempFile.push(target.files[i]);
                        let tempUrls =[...this.state.localImageUrl];
                        tempUrls.push(reader.result);
                        this.setState({
                            identityProof:tempFile,
                            localImageUrl:tempUrls,
                            spinner:false
                        })
                    }          
                }  
            }
        }
        else{
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
        }
    }
    currentPincode=()=>{
        if(this.state.pincode!=null && this.state.pincode.length!=6){
            this.setState({pinCode:""});
            document.getElementById("pincode").value="";
        }
    }

    

    render() {
        console.log(this.state)
       
        return (
            <div>
               <div className="row">
                    <div className="form-group has-feedback col-md-6">
                        <input type="text" className="form-control" id="firstName" value={this.state.firstName} placeholder="First name" onChange={this.handleChange}/>
                        <span style={{ fontSize: 12, color: "red" }} className="glyphicon glyphicon-user form-control-feedback" />
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
                        <span style={{ fontSize: 12, color: "red" }} className="glyphicon glyphicon-user form-control-feedback" />
                    </div>
                    <div className="form-group has-feedback col-md-6">
                        <select className="form-control select2" style={{width: '100%'}} id="role" value={this.state.role} onChange={this.handleChange}>
                            <option selected="selected">Select Role</option>
                            {this.props.roles.map((role) => <option key={role} value={role}>{role}</option>)}
                        </select>
                        <span style={{ fontSize: 12, color: "red" }} className="glyphicon glyphicon-user form-control-feedback" />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group has-feedback col-md-6">
                        <input type="text" className="form-control" id="addressLine_1" onChange={this.handleChange} placeholder="Address Line 1" onChange={this.handleChange}/>
                        <span style={{ fontSize: 12, color: "red" }} className="glyphicon glyphicon-user form-control-feedback" />
                        
                    </div>
                    <div className="form-group has-feedback col-md-6">
                        <input type="text" className="form-control" id="addressLine_2" onChange={this.handleChange} placeholder="Address Line 2" onChange={this.handleChange}/>
                        <span className="glyphicon glyphicon-home form-control-feedback" />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group has-feedback col-md-6">
                        <input type="text" className="form-control" id="pincode" placeholder="Pincode" onChange={this.handleChange} onMouseLeave={()=>this.currentPincode()}/>
                        <span style={{ fontSize: 12, color: "red" }} className="glyphicon glyphicon-home form-control-feedback" />
                    </div>
                    <div className="form-group has-feedback col-md-6">
                        <select className="form-control select2" id="selectedLocality" value={this.state.selectedLocality} onChange={this.handleChange} style={{width: '100%'}}>
                            <option selected="selected">Select Locality</option>
                            {this.state.createLocalityDropDown?this.state.locality.map((locality) => <option key={locality.Name} value={locality.Name}>{locality.Name}</option>):null}
                        </select>
                        <span style={{ fontSize: 12, color: "red" }} className="glyphicon glyphicon-home form-control-feedback" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group has-feedback col-md-6">
                        <input type="text" className="form-control" id="city" value={this.state.city} placeholder="City" onChange={this.handleChange}/>
                        <span style={{ fontSize: 12, color: "red" }} className="glyphicon glyphicon-home form-control-feedback" />
                    </div>
                    <div className="form-group has-feedback col-md-6">
                        <input type="text" className="form-control" id="district" value={this.state.district} placeholder="District" onChange={this.handleChange}/>
                        <span style={{ fontSize: 12, color: "red" }} className="glyphicon glyphicon-home form-control-feedback" />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group has-feedback col-md-6">
                        <input type="text" className="form-control" id="state" value={this.state.state} placeholder="State" onChange={this.handleChange}/>
                        <span style={{ fontSize: 12, color: "red" }} className="glyphicon glyphicon-home form-control-feedback" />
                    </div>
                    <div className="form-group has-feedback col-md-6">
                        <input type="text" className="form-control" id="country" value={this.state.country} placeholder="Country" onChange={this.handleChange}/>
                        <span style={{ fontSize: 12, color: "red" }} className="glyphicon glyphicon-home form-control-feedback" />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group has-feedback col-md-6">
                        <input type="email" className="form-control" id="email" value={this.state.emailAddress} placeholder="Email" onChange={this.handleChange}/>
                        <span style={{ fontSize: 12, color: "red" }} className="glyphicon glyphicon-envelope form-control-feedback" />
                    </div>
                    <div className="form-group has-feedback col-md-6">
                        <input type="text" className="form-control" id="phoneNumber" onChange={this.handleChange} placeholder="Mobile" onChange={this.handleChange}/>
                        <span style={{ fontSize: 12, color: "red" }} className="glyphicon glyphicon-phone form-control-feedback" />
                    </div>
                </div>
                <div className="form-group has-feedback">
                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handleChange}/>
                    <span style={{ fontSize: 12, color: "red" }} className="glyphicon glyphicon-lock form-control-feedback" />
                </div>
                <div className="form-group has-feedback">
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password" onChange={this.handleChange}/>
                    <span style={{ fontSize: 12, color: "red" }} className="glyphicon glyphicon-log-in form-control-feedback" />
                </div>
                <div className="row">
                    <div className="form-group">
                    <label for="identityProof" id="file" style={{cursor:"pointer",border:"1px solid #d2d6de",marginLeft:"15px"}}>Click here to upload identity proof</label>
                    <span style={{ fontSize: 22, color: "red" }}>*</span>
                        <input class="hidden" type="file" id="identityProof" onChange={this.handleChange}/>
                    </div>
                </div>
                {this.state.localImageUrl.length>0?<div style={{marginLeft:"10px"}}><b>Identity proof preview :</b></div>:null}
                {this.state.localImageUrl.length>0?
               <MultipleImage rawImages={this.state.localImageUrl}/>
                :null}
                <div className="checkbox icheck" style={{marginLeft:'4%'}}>
                    <input type="checkbox" id="checkBox" /> I agree to the <a href="" data-toggle="modal" data-target="#modal-default">terms and conditions</a>
                </div>
                <div className="modal fade " id="modal-default" style={{fontSize:"14px"}}>
                      <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span></button>
                            </div>
                            <div className="modal-body">
                            <div className="row">
                                <section className="content" >
                                &emsp;    By selecting the tick in the checkbox, I agree that I have read and accept the Putholi Terms and Conditions. Privacy Policy and Terms and Conditions of Membership, and I consent to the processing of my data for the purpose of using this service. <br/><br/><b>NOTE: YOU WILL NOT BE ABLE TO CONTINUE IF YOU Don't Select the Checkbox.</b><br/><br/>
    <b>TERMS AND CONDITIONS OF MEMBERSHIP</b>[As created in April 2020]<br/><br/>

Members are expected to comply with all applicable laws and regulations:

<br/><br/>1) MEMBERSHIP RIGHTS AND OBLIGATIONS
Generally. Member agrees to pay the annual fees established for its Membership Class/role, as may be amended from time to time in accordance with the Policies. Dues are yearly and payment is required upon signing (to activate membership) and upon renewal (on the anniversary of membership activation). Putholi will bill Member for dues in advance by written invoice, and payment will be due within thirty (30) days of mailing.

Compliance with Policies. Member agrees to abide by, and shall have all applicable rights and obligations as set forth in, the Privacy Policy(Putholi P&Ps), Payment Policies, Trust Registration_Terms and Conditions and any and all additional policies and procedures adopted by Putholi, as any of these may be amended from time to time.

Members registered through website will be playing the respective roles as selected by them and the same could be modified by the trust authorities.

Volunteers referred by Trust members need not pay membership fee at any point of time.

All the members including voluteers referred by trust member could donate money for schools listed in the website and no restrictions in using the website available for public.

Suspension and Termination. The Putholi Board may terminate membership upon malpractices / bankruptcy or withdrawal from or cessation of business/service by Member. Putholi shall also have the right to (i) suspend participation of Member if it fails to pay its annual fees on time, or (ii) suspend or cancel participation of Member if it violates any of the Putholi P&Ps or engages in conduct seriously prejudicial to the purposes and interests of Putholi and fails to correct that breach within thirty (30) days of notice from Putholi or the Putholi staff. No refunds of Membership fees or other payments will be given. Suspension and termination are subject to Putholi policies and to the sole discretion of trust authorities or members.

<br/><br/>2) GENERAL
Authority to Execute Agreement. The person entering into this Agreement on behalf of Member hereby represents, warrants and covenants to Putholi that (a) it has the authority to enter into this Agreement and to perform its obligations hereunder; (b) the execution and performance of this Agreement does not and will not violate any agreement to which Member is a party or by which it is otherwise bound; and (c) when executed and delivered, this Agreement will constitute a legal, valid and binding obligation of Member, enforceable in accordance with its terms.
No Other Licenses. By executing this Agreement, Member neither grants nor receives, by implication, estoppel, or otherwise, any rights under any copyright, patents or other intellectual property rights of Putholi or another member, except as expressly provided in the Putholi P&Ps (e.g., Putholi's right to disclose and publicize the Member's membership in Putholi, unless requested otherwise in writing by the Member).

No Warranty. EACH PARTY ACKNOWLEDGES THAT, EXCEPT AS OTHERWISE AGREED IN WRITING, ALL SERVICES AND INFORMATION PROVIDED TO OR BY Putholi UNDER THIS AGREEMENT IS PROVIDED "AS IS" WITH NO WARRANTIES OR CONDITIONS WHATSOEVER, WHETHER EXPRESS, IMPLIED, STATUTORY OR OTHERWISE, AND Putholi AND MEMBER EACH EXPRESSLY DISCLAIM ANY WARRANTY OF MERCHANTABILITY, NONINFRINGEMENT, OR FITNESS FOR ANY PARTICULAR PURPOSE WITH RESPECT TO SUCH SERVICES AND INFORMATION.

<br/><br/>3)Limitation of Liability. IN NO EVENT WILL EITHER Putholi OR MEMBER BE LIABLE TO EACH OTHER OR TO ANY OTHER MEMBER OR THIRD PARTY UNDER THIS AGREEMENT FOR THE COST OF PROCURING SUBSTITUTE GOODS OR SERVICES, LOST PROFITS, LOST REVENUE, LOST SALES, LOSS OF USE, LOSS OF DATA OR ANY INCIDENTAL, CONSEQUENTIAL, DIRECT, INDIRECT, PUNITIVE, OR SPECIAL DAMAGES, WHETHER OR NOT SUCH PARTY HAD ADVANCE NOTICE OF THE POSSIBILITY OF SUCH LOSSES OR DAMAGES. EXCEPT FOR MEMBER'S DUES COMMITMENT, OR IN CASES OF WILLFUL MISCONDUCT OR GROSS NEGLIGENCE, OR WHERE REQUIRED BY APPLICABLE LAW, OR AS OTHERWISE AGREED IN WRITING, THE AGGREGATE LIABILITY OF Putholi TO MEMBER AND TO OTHER PARTIES, AND OF MEMBER TO Putholi, TO OTHER Putholi MEMBERS OR TO OTHER PARTIES, SHALL NOT EXCEED THE PAST 12 MONTHS' MEMBERSHIP FEES PAID BY THE MEMBER TO Putholi.
Governing Law. This Agreement shall be construed and controlled by the laws of the Commonwealth of Massachusetts without reference to conflict of laws principles. If any claim or dispute between the parties is not resolved by good faith negotiations, any suits or proceedings pursued by either party shall be brought in the Federal or state courts located in Massachusetts, to whose jurisdiction each party hereby submits.
Complete Agreement; No Waiver. This Agreement, including all attachments, sets forth the entire understanding of Putholi and Member and supersedes all prior agreements and understandings relating hereto, unless otherwise stated in this Agreement. The waiver of any breach or default will not constitute a waiver of any other right hereunder or any subsequent breach or default.

<br/><br/>4) Amendment. All amendments to this Agreement or to any Putholi P&Ps shall be effective upon their stated effective date. Member shall be given at least thirty (30) days prior written notice of the effective date of an amendment to this Agreement, including as a result of any changes to the Putholi P&Ps, which is adopted in accordance with the Policies and that directly and materially affects adversely any of the rights or obligations applicable to Member hereunder (each of the foregoing, an "Amendment"). If Member does not agree to any such Amendment to this Agreement that was approved in accordance with the Policies, then Member shall provide written notice to Putholi of such disagreement prior to the end of the 30-day notice period. If the parties are not able to reach a mutually acceptable accommodation (for example, the parties agree to a phase-in of the Amendment, Putholi determines to withdraw, suspend or modify the Amendment, or Putholi grants Member a waiver or variance), this Agreement and Member's membership in Putholi shall terminate automatically upon expiration of the 30-day notice period, unless Member elects to withdraw by written notice on an earlier date. Amendments shall be prospective only unless otherwise agreed to by the Member and Putholi. No termination or withdrawal pursuant to this paragraph will entitle Member to a refund of Membership dues or other fees, all of which are nonrefundable.

<br/><br/>5)Headings. Putholi and Member acknowledge that the headings to the sections hereof are for reference purposes only and shall not be used in the interpretation of this Agreement.

<br/><br/>6)Assignment. Member may not assign its rights or obligations under this Agreement without the prior written consent of Putholi or as otherwise set forth in the Policies. For purposes of this Agreement, an assignment shall be deemed to include a transfer or sale of all or substantially all of the business of Member, or a merger, consolidation or other transaction that results in a change in control of Member.

<br/><br/>7)Neither Putholi nor Member shall be liable hereunder by reason of any failure or delay in the performance of its obligations hereunder on account of strikes, shortages, riots, insurrection, fires, flood, storm, explosions, acts of God, war, governmental action, labor conditions, earthquakes or any other cause which is beyond the reasonable control of such party.

<br/><br/>8)Logos and Names. You grant Putholi the right to use your organization's name and logo on the Putholi website and on related marketing materials, solely to indicate your membership in Putholi. As long as you remain a member in good standing, you may use Putholi's name and logo, in the format and with the notices provided or requested by Putholi, solely to indicate your membership in Putholi.

<br/><br/>9)This official website of the Putholi Trust has been developed to disseminate information to the general public. Though all efforts have been made to ensure the accuracy and correctness of the content on this website, the same should not be construed as a statement of law or used for any legal purposes. The web contents are subject to change without any prior notice from the Putholi Trust website.
<br/><button type="submit" className="btn btn-primary btn-block btn-flat"  data-dismiss="modal">Continue</button>
                                </section>
                            </div>
                        </div>
                        </div>
                        </div>
                        </div>
                {this.state.errorMessage!=null?<div className="errorMessage" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}
                <div className="col-md-12">
                    <button type="submit" className="btn btn-primary btn-block btn-flat" onClick={()=>this.submitClicked()}>Register</button>
                    <br/>
                    </div>
                  <Link to="/login" className="text-center" style={{marginLeft:'2%'}}>Already have a membership? Login...</Link>
                  {this.state.spinner?<div class="spinner"></div>:null}
            </div>
        );
    }
}

export default registerForm;