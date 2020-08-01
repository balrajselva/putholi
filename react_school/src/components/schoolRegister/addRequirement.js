import React, { Component } from 'react'
import { withRouter } from 'react-router'
import axios from "axios"
import './style.css';
import '../../css/School_registration.css';

class addRequirements extends Component {
  state={
    assetName:null,
    assetType:null,
    reqType:null,
    otherAssetName:null,
    otherAssetType:null,
    assetTypeList:null,
    assetNameList:null,
    quantity:null,
    priority:null,
    reqList:[],
    errorMessage:null,
    spinner:false
  }

  componentDidMount(){
    axios.get(this.props.config+"/lookup/getAll")
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
          .catch(error=>{
             this.setState({
                spinner:false
          })
          window.alert("Please enter the address manually")
          })
       }
       else if(target.id==="assetType" && target.value!=="Others"){
          this.setState({spinner:true});
          axios.get(this.props.config+"/lookup/field/"+target.value)
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
}

handleSubmit=(e)=>{
  e.preventDefault();
  let maxPriority = 0;
  for(let i=0;i<this.state.reqList.length;i++){
     if(this.state.reqList[i].priority > maxPriority){
        maxPriority = this.state.reqList[i].priority;
     }
  }
  if(parseInt(maxPriority) !== parseInt(this.state.reqList.length)){
     this.setState({
        errorMessage:"Please select priority in ascending order"
    });
    return;
  }
    
    else if(this.state.reqList.length===0){
     this.setState({
         errorMessage:"Please add atleast one requirement"
     });
     }
    
     this.setState({spinner:true});
     let schoolDetails={
     requirements:this.state.reqList,
     schoolId:this.props.location.school.schoolId,
     user:this.props.location.user
  }
  console.log(schoolDetails);
  var regFormModel=new FormData();
  regFormModel.set('payload',JSON.stringify(schoolDetails));

  axios.post(this.props.config+'/addRequirement',regFormModel,{
     headers:{'Content-Type':'multipart/form-data'}
  })
  .then(res=>{
     console.log(res);
     window.alert("Requirement added sucessfully!");
     this.props.history.push("/index");
  })
  .catch(error=>{
     window.alert("Failed due to "+error);
     this.props.history.push("/index");
  })

}

  addRequirement= (e) =>{
    e.preventDefault();
    let hasError=null;
    this.setState({reqError:null})
    this.state.reqList.map(reqList=>{
       if(reqList.assetName===this.state.assetName || reqList.assetName===this.state.otherAssetName){
          this.setState({reqError:"*Can not have duplicate requirements*"})
          hasError=true;
          return
       }
       if(reqList.priority===this.state.priority){
          this.setState({reqError:"*Select different priority*"})
          hasError=true;
          return
       }
    })
    if(this.state.reqType===null || this.state.assetType===null ||this.state.assetName===null || this.state.quantity===null || this.state.priority===null){
       this.setState({reqError:"*Please provide all the above details*"})
       hasError=true;
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
       if(hasError===null){
          this.setState({
             reqList:[...this.state.reqList,{
                reqType:this.state.reqType,
                assetType:aType,
                assetName:this.state.otherAssetName,
                quantity:this.state.quantity,
                priority:this.state.priority
             }],
             addReq:true
          })
       }
       let lookup={
          key_field:"asset",
          key_value:this.state.otherAssetName,
          parent_key:aType,
          parent_field:"assettype"
       }
       axios.post(this.props.config+"/lookup/save",lookup)
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
          quantity:this.state.quantity,
          priority:this.state.priority
       }],
       addReq:true
    })
  }
 }
 updatePriority=(e)=>{
    this.setState({
       hasError:null,
       priority:e.target.id
    });
 }
 deleteRequirement=(e)=>{
    e.preventDefault();
    var array=[...this.state.reqList];
    array.splice(e.target.id,1);
    this.setState({reqList:array});
 }
  render() {
    console.log(this.props);
    return (
      
      <div className="container">
      <section>
         <div className="row">
            <div className="span8">
               <form className="form-horizontal">
                  <fieldset>
  <div class="breadcrumb">
      <div class="wrap">
            <div class="container">
                <h3>Welcome {this.props.location.user.firstName}, Add Requirements</h3>
            </div>
        </div>
    </div>
    <div label="Requirements">
                           <div className="row">
                              <div className="span10">
                                <h3>{this.props.location.school.schoolInfo.schoolName}</h3>
                                 <div className="control-group">
                                    <label className="control-label" for="select01">Requirement Type</label>
                                    <div className="controls">
                                       <select id="reqType" className="input-xlarge" value={this.state.reqType} onChange={this.handleChange}>
                                          <option selected disabled>Select requirement type</option>
                                          <option>New</option>
                                          <option>Maintainence </option>
                                       </select>
                                       <span style={{ fontSize: 22, color: "red" }}>*</span>
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
                                       <span style={{ fontSize: 22, color: "red" }}>*</span>
                                    </div>
                                 </div>
                                 {this.state.assetType==="Others"?<div className="control-group">
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" value={this.state.otherAssetType} onChange={this.handleChange} id="otherAssetType" placeholder="Enter other asset type"></input>
                                       <span style={{ fontSize: 22, color: "red" }}>*</span>
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
                                       <span style={{ fontSize: 22, color: "red" }}>*</span>
                                    </div>
                                 </div>
                                 {this.state.assetName==="Others"?<div className="control-group">
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="otherAssetName" value={this.state.otherAssetName} onChange={this.handleChange} placeholder="Enter other asset name"></input>
                                       <span style={{ fontSize: 22, color: "red" }}>*</span>
                                    </div>
                                 </div>:null}
                                 <div className="control-group">
                                    <label className="control-label" for="input01">Quantity</label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="quantity" value={this.state.quantity} onChange={this.handleChange}></input>
                                       <span style={{ fontSize: 22, color: "red" }}>*</span>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label">Priority (1-3)</label>
                                    <div className="controls radio-container">
                                       <input type="radio" name="myGroupName" id="1" onChange={(e)=>this.updatePriority(e)}></input>1&nbsp;&nbsp;
                                       <input type="radio" name="myGroupName" id="2" onChange={(e)=>this.updatePriority(e)}></input>2&nbsp;&nbsp;
                                       <input type="radio" name="myGroupName" id="3" onChange={(e)=>this.updatePriority(e)}></input>3
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
                                             <th>Priority</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                       {this.state.addReq?this.state.reqList.map((req,i)=>
                                       <tr>
                                          <th>{req.reqType}</th>
                                          <th>{req.assetType}</th>
                                          <th>{req.assetName}</th>
                                          <th>{req.quantity}</th>
                                          <th>{req.priority}</th>
                                          <th><button className="input-small" id={i} onClick={(e)=>this.deleteRequirement(e)}>Delete</button></th>
                                       </tr>):null}
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                           </div>
                        </div>
                        {this.state.spinner?<div class="spinner"></div>:null}

                      <div class="wrap">
                          <div class="container inner_content">
                              <div class="row">
                  <div class="span10">

                    </div>
                    </div>
                    </div>
                    </div>
                    <div class="form-actions">
                           <div style={{color:"red",fontSize:"15px",marginBottom:"5px"}}>
                                       {this.state.errorMessage}
                                    </div>
                            <button type="submit" class="btn send_btn" onClick={(e)=>this.handleSubmit(e)}>Submit</button>&nbsp;&nbsp;
                            <button class="btn dark_btn">Cancel</button>
                        </div>
</fieldset>
                </form>
               </div> 
            </div> 
            </section>
         </div>     
     )
    
  }
}

export default withRouter(addRequirements);
