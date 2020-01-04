import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './style.css';
import '../../css/School_registration.css';
import Tabs from '../../components/Tabs/Tabs';
import axios from 'axios';
import EditRequirements from './EditRequirements';

class AddSchool extends Component {
    constructor(props) {
        super(props);
    }
    state={
      schoolRegNum:null,
      schoolName:null,
      schoolType:null,
      numOfStudents:null,
      numOfTeachers:null,
      primaryConName:null,
      primaryConMail:null,
      primaryConNum:null,
      secondaryConName:null,
      secondaryConNum:null,
      secondaryConMail:null,
      schoolRegistration:null,
      addressLine_2:null,
      pincode:null,
      locality:null,
      selectedLocality:null,
      district:null,
      city:null,
      state:null,
      country:null,
      reqType:null,
      assetType:null,
      assetName:null,
      otherAssetName:null,
      otherAssetType:null,
      quantity:null,
      comments:null,
      fileInput:null,
      localImageUrl:null,
      errorMessage:null,
      lastErrorField:null,
      spinner:false,
      createLocalityDropDown:false,
      reqList:[],
      addReq:false,
      getLookup:true,
      lastPincode:null,
      assetTypeList:null,
      assetNameList:null,
      reqError:null
    }
    componentDidMount(){
      axios.get("http://localhost:6060/puthuyir/lookup/getAll")
      .then(res=>{
         console.log(res.data);
         this.setState({assetTypeList:res.data});
      })
    }
    handleChange=({target})=>{

      this.setState({ 
          [target.id]: target.value , 
          lastErrorField:null,
          reqError:null,
          errorMessage:null
      });
      if(target.id==="pincode" && target.value.length===6){
          this.setState({spinner:true,lastPincode:target.value});
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
      else if(target.id==="assetType" && target.value!=="Others"){
         this.setState({spinner:true});
         axios.get("http://localhost:6060/puthuyir/lookup/field/"+target.value)
         .then(res=>{
            this.setState({
               assetNameList:res.data,
               spinner:false
            })
         })
      }
      else if(target.id==="assetType" && target.value==="Others"){
         this.setState({assetNameList:[{key_value:"Others"}]});
      }
      else if(target.id==="fileInput"){
          this.setState({spinner:true});
          const reader=new FileReader();
          const file=target.files[0];
          
          reader.onloadend=()=>{
              this.setState({
                  fileInput:target.files[0],
                  localImageUrl:reader.result,
                  spinner:false
              })
          }
          reader.readAsDataURL(file)
      }
  }
  currentPincode= () =>{
      if(this.state.pincode !== null && this.state.pincode.length !== 6){
          this.setState({pincode:""})
      }
      if(this.state.selectedLocality !== null && this.state.pincode.length < 6){
         this.setState({pincode:this.state.lastPincode});
      }
  }
  addRequirement= (e) =>{
      e.preventDefault();
      let hasError=null;
      this.state.reqList.map(reqList=>{
         if(reqList.assetName===this.state.assetName){
            this.setState({reqError:"*Can not have duplicate requirements*"})
            hasError=true;
            return
         }
      })
      if(this.state.reqType===null || this.state.assetType===null ||this.state.assetName===null || this.state.quantity===null){
         this.setState({reqError:"*Please provide all the above details*"})
         return
      }
      if(this.state.reqList.length==3){
         this.setState({reqError:"*Only 3 requirements encouraged at a time*"})
         return
      }
      if(this.state.assetName==="Others"){
         let aType;
         if(this.state.assetType!=="Others")
            aType=this.state.assetType
         else
            aType=this.state.otherAssetType
         this.setState({
            reqList:[...this.state.reqList,{
               reqType:this.state.reqType,
               assetType:aType,
               assetName:this.state.otherAssetName,
               quantity:this.state.quantity
            }],
            addReq:true
         })
         let lookup={
            key_field:"asset",
            key_value:this.state.otherAssetName,
            parent_key:aType,
            parent_field:"assettype"
         }
         axios.post("http://localhost:6060/puthuyir/lookup/save",lookup)
         .then(res=>{
            console.log(res.data);
         })
      } 
      else if(hasError===null){
      this.setState({
         reqList:[...this.state.reqList,{
            reqType:this.state.reqType,
            assetType:this.state.assetType,
            assetName:this.state.assetName,
            quantity:this.state.quantity
         }],
         addReq:true
      })
   }
   }
   deleteRequirement=(e)=>{
      e.preventDefault();
      var array=[...this.state.reqList];
      array.splice(e.target.id,1);
      this.setState({reqList:array});
   }
   handleSubmit=(e)=>{
      e.preventDefault();
      var emailRegex=/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
      var mobNumRegex=/^(\+\d{1,3}[- ]?)?\d{10}$/;
        if(this.state.schoolRegNum===null ){
            this.setState({
                lastErrorField:"schoolRegNum",
                errorMessage:"Please provide School Registration number"
            });
      
        }
        else if(this.state.schoolName===null){
            this.setState({
                lastErrorField:"schoolName",
                errorMessage:"Please enter school name"
        });
      
        }
        else if(this.state.schoolType===null){
            this.setState({
                lastErrorField:"schoolType",
                errorMessage:"Please select school type"
            });
      
        }
        else if(this.state.numOfStudents===null){
            this.setState({
                lastErrorField:"numOfStudents",
                errorMessage:"Please provide number of students"
            });
      
        }
        else if(this.state.numOfTeachers===null){
         this.setState({
             lastErrorField:"numOfTeachers",
             errorMessage:"Please provide number of teachers"
         });
   
         }
         else if(this.state.secondaryConMail===null || !emailRegex.test(this.state.secondaryConMail)){
            this.setState({
               lastErrorField:"secondaryConMail",
               errorMessage:"Please provide valid secondary contact email"
            });
         }
         else if(this.state.secondaryConName===null){
               this.setState({
                  lastErrorField:"secondaryConName",
                  errorMessage:"Please provide secondary contact name"
               });
         }
         else if(this.state.secondaryConNum===null || !mobNumRegex.test(this.state.secondaryConNum)){
            this.setState({
               lastErrorField:"secondaryConNum",
               errorMessage:"Please provide valid secondary contact mobile number"
            });
         }
        else if(this.state.addressLine_1===null){
            this.setState({
                lastErrorField:"addressLine_1",
                errorMessage:"Please enter Address Line 1"
            });
      
        }
        else if(this.state.pincode===null){
            this.setState({
                lastErrorField:"pincode",
                errorMessage:"Please enter pincode"
            });
      
        }
        else if(this.state.selectedLocality===null){
            this.setState({
                lastErrorField:"selectedLocality",
                errorMessage:"Please select locality"
            });
      
         }
        else if(this.state.fileInput===null){
            this.setState({
                lastErrorField:"fileInput",
                errorMessage:"Please upload School Images"
            });
      
        }
        
        else if(this.state.reqList===null){
         this.setState({
             lastErrorField:"req",
             errorMessage:"Please add atleast one requirement"
         });
         }
        else{
         this.setState({spinner:true});
         let schoolDetails={
         schoolInfo:{
            schoolRegNo:this.state.schoolRegNum,
            schoolName:this.state.schoolName,
            schoolType:this.state.schoolType,
            numberOfStudents:this.state.numOfStudents,
            numberOfTeachers:this.state.numOfTeachers
         },
         contacts:{
            primaryConName:this.state.primaryConName,
            primaryConMail:this.state.primaryConMail,
            primaryConNum:this.state.primaryConNum,
            secondaryConName:this.state.secondaryConName,
            secondaryConNum:this.state.secondaryConNum,
            secondaryConMail:this.state.secondaryConMail
         },
         address:{
            addressLine1:this.state.addressLine_1,
            addressLine2:this.state.addressLine_2,
            pinCode:this.state.pincode,
            locality:this.state.selectedLocality,
            district:this.state.district,
            city:this.state.city,
            state:this.state.state,
            country:this.state.country
         },
         proofOfId:{
            image:this.state.fileInput,
            comments:this.state.comments,
         },
         requirements:this.state.reqList,
         user:this.props.location.user
      }
      console.log(schoolDetails);
      var regFormModel=new FormData();
      regFormModel.set('payload',JSON.stringify(schoolDetails));
      regFormModel.append('files',this.state.fileInput)
      axios.post('http://localhost:6060/puthuyir/school',regFormModel,{
         headers:{'Content-Type':'multipart/form-data'}
      })
      .then(res=>{
         console.log(res);
         window.alert("School added sucessfully!");
         this.props.history.push("/index");
      })
      .catch(error=>{
         window.alert("Failed due to "+error);
         this.props.history.push("/index");
      })
   }
   }
   getLookup=()=>{

   }
    render() {
       console.log(this.props.location.user);
         return (
<div className="container">
   <section>
      <div className="row">
         <div className="span8">
            <form action="Confirmation_to_add_school.html" className="form-horizontal">
               <fieldset>
                  <legend>Provide school details along with requirements</legend>
                  <Tabs>
                     <div label="School details">
                     <div className="control-group">
                              <label className="control-label" for="input01">Registration Number</label>
                              <div className="controls">
                                 <input type="text" className="input-xlarge" value={this.state.schoolRegNum} id="schoolRegNum" onChange={this.handleChange}></input>
                              </div>
                           </div>
                           <div className="control-group">
                              <label className="control-label" for="input01">School Name</label>
                              <div className="controls">
                                 <input type="text" className="input-xlarge" value={this.state.schoolName} id="schoolName" onChange={this.handleChange}></input>
                              </div>
                           </div>
                           <div className="control-group">
                              <label className="control-label" for="multiSelect">School Type</label>
                              <div className="controls">
                                 <select className="input-xlarge" id="schoolType" onChange={this.handleChange}>
                                    <option>Select school type</option>
                                    <option value="Nursery">Nursery</option>
                                    <option value="Primary">Primary</option>
                                    <option value="Middle School">Middle School</option>
                                    <option value="Secondary school">Secondary School</option>
                                    <option value="Higher Secondary School">Higher Secondary School</option>
                                 </select>
                              </div>
                           </div>
                           <div className="control-group">
                              <label className="control-label" for="input01">Number of Students</label>
                              <div className="controls">
                                 <input type="text" className="input-xlarge" value={this.state.numOfStudents} id="numOfStudents" onChange={this.handleChange}></input>
                              </div>
                           </div>
                           <div className="control-group">
                              <label className="control-label" for="input01">Number of Teachers</label>
                              <div className="controls">
                                 <input type="text" className="input-xlarge" value={this.state.numOfTeachers} id="numOfTeachers" onChange={this.handleChange}></input>
                              </div> 
                              </div>
                              </div>
                           <div label="Contacts">
                           <div className="row">
                              <div className="span10">
                                 <div className="control-group">
                                    <label className="control-label" for="input01">Primary Contact Name</label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="primaryConName" disabled value={this.props.location.user.firstName} onChange={this.handleChange}></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="input01">Primary Contact Number </label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="primaryConNum" disabled value={this.props.location.user.phoneNumber} onChange={this.handleChange}></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="input01">Primary Contact Email </label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="primaryConMail" disabled value={this.props.location.user.emailAddress} onChange={this.handleChange}></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="input01">Secondary Contact Name</label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="secondaryConName" value={this.state.secondaryConName} onChange={this.handleChange}></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="input01">Secondary Contact Number </label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="secondaryConNum" value={this.state.secondaryConNum} onChange={this.handleChange}></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="input01">Secondary Contact Email </label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="secondaryConMail" value={this.state.secondaryConMail} onChange={this.handleChange}></input>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           </div>
                           <div label="School Address">
                           <div className="row">
                              <div className="span10">
                                 <div className="control-group">
                                    <label className="control-label" for="input01">Address line 1</label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="addressLine_1" value={this.state.addressLine_1} onChange={this.handleChange}></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="input01">Address line 2</label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="addressLine_2" value={this.state.addressLine_2} onChange={this.handleChange}></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="input01">Pincode</label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="pincode" value={this.state.pincode} onChange={this.handleChange} onMouseLeave={()=>this.currentPincode()}></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                              <label className="control-label" for="multiSelect">Locality</label>
                              <div className="controls">
                                 <select className="input-xlarge" id="selectedLocality" value={this.state.selectedLocality} onChange={this.handleChange}>
                                 <option selected="selected">Select Locality</option>
                                 {this.state.createLocalityDropDown?this.state.locality.map((locality) => <option key={locality.Name} value={locality.Name}>{locality.Name}</option>):null}
                                 </select>
                                 </div>
                              </div>
                                 <div className="control-group">
                                    <label className="control-label" for="input01">City</label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="city"value={this.state.city}></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="select01">District</label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="district" value={this.state.district}></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="select01">State</label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="state" value={this.state.state}></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="select01">Country</label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="country" value={this.state.country}></input>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div label="Requirements">
                           <div className="row">
                              <div className="span10">
                                 <div className="control-group">
                                    <label className="control-label" for="select01">Requirement Type</label>
                                    <div className="controls">
                                       <select id="reqType" className="input-xlarge" value={this.state.reqType} onChange={this.handleChange}>
                                          <option selected disabled>Select requirement type</option>
                                          <option>New</option>
                                          <option>Maintainence </option>
                                       </select>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="select01">Asset Type</label>
                                    <div className="controls">
                                       <select id="assetType" className="input-xlarge" value={this.state.assetType} onChange={this.handleChange}>
                                          <option disabled selected>Select asset type</option>
                                          {this.state.assetTypeList!==null?this.state.assetTypeList.map((asset) => <option key={asset} value={asset}>{asset}</option>):null}
                                          <option key="Others" value="Others">Others</option>
                                       </select>
                                    </div>
                                 </div>
                                 {this.state.assetType==="Others"?<div className="control-group">
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" value={this.state.otherAssetType} onChange={this.handleChange} id="otherAssetType" placeholder="Enter other asset type"></input>
                                    </div>
                                 </div>:null}
                                 <div className="control-group">
                                    <label className="control-label" for="select01">Asset Name</label>
                                    <div className="controls">
                                       <select id="assetName" className="input-xlarge" value={this.state.assetName} onChange={this.handleChange}>
                                          <option selected>Select asset name</option>
                                          {this.state.assetNameList!==null?this.state.assetNameList.map((asset) => <option key={asset.key_value} value={asset.key_value}>{asset.key_value}</option>):null}
                                          <option key="Others" value="Others">Others</option>
                                       </select>
                                    </div>
                                 </div>
                                 {this.state.assetName==="Others"?<div className="control-group">
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="otherAssetName" value={this.state.otherAssetName} onChange={this.handleChange} placeholder="Enter other asset name"></input>
                                    </div>
                                 </div>:null}
                                 <div className="control-group">
                                    <label className="control-label" for="input01">Quantity</label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="quantity" value={this.state.quantity} onChange={this.handleChange}></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <button className="input-large" id="req" onClick={(e)=>this.addRequirement(e)}>Add requirement</button>
                                    <div style={{color:"red",fontSize:"15px",marginTop:"5px"}}>
                                       {this.state.reqError}
                                    </div>
                                 </div>
                                 <div className="tab-content">
                                    <table className="table table-bordered table-striped">
                                       <thead>
                                          <tr>
                                             <th>Requirement Type</th>
                                             <th>Asset Type</th>
                                             <th>Asset Name</th>
                                             <th>Quantity</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                       {this.state.addReq?this.state.reqList.map((req,i)=>
                                       <tr>
                                          <th>{req.reqType}</th>
                                          <th>{req.assetType}</th>
                                          <th>{req.assetName}</th>
                                          <th>{req.quantity}</th>
                                          <th><button className="input-small" id={i} onClick={(e)=>this.deleteRequirement(e)}>Delete</button></th>
                                       </tr>):null}
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div label="Upload Pictures">
                           <div className="row">
                              <div className="span10">
                                 <div className="control-group">
                                    <label className="control-label" for="fileInput">Upload proof of identity of the school </label>
                                    <div className="controls">
                                       <input className="input-file" id="fileInput" type="file" onChange={this.handleChange}></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" >Comments / Message to Trust</label>
                                    <div className="controls">
                                       <textarea className="input-xlarge" id="comments" value={this.state.comments} onChange={this.handleChange} rows="3"></textarea>
                                    </div>
                                    {this.state.localImageUrl?<div style={{marginLeft:"10px"}}><b>Identity proof preview :</b></div>:null}
                                    {this.state.localImageUrl?<img style={{marginLeft:"10px"}} width="80%" height="100%" src={this.state.localImageUrl} alt="Identity proof"/>:null}
                                 </div>
                              </div>
                           </div>
                        </div>
                           
                        <EditRequirements {...this.props}/>
                        </Tabs>
                        <div class="form-actions">
                           <div style={{color:"red",fontSize:"15px",marginBottom:"5px"}}>
                                       {this.state.errorMessage}
                                    </div>
                            <button type="submit" class="btn send_btn" onClick={(e)=>this.handleSubmit(e)}>Submit</button>
                            <button class="btn dark_btn">Cancel</button>
                        </div>
                        {this.state.spinner?<div class="spinner"></div>:null}
                </fieldset>
                </form>
               </div> 
            </div> 
            </section>
         </div>                     
        )
    }
}
export default withRouter(AddSchool);
