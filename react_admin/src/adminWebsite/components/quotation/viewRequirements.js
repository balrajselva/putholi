import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import '../../css/workOrder.css'
import './reviewQuotation.css'
class viewRequirements extends Component {

    state={
        requirements:"",
        getRequirementList:true,
        spinner:true,
        companyName:null,
        address_line_1:null,
        street:null,
        city:null,
        pincode:null,
        phoneNumber:null,
        comment:null,
        quotationDate:null,
        quotationValidityDate:null,
        quotationPreparedBy:null,
        discountDetails:null,
        quantity:null,
        itemDescription:null,
        unitPrice:null,
        tax:null,
        shippingCost:null,
        totalAmount:null,
        warranty:null,
        lastErrorField:null,
        fileInput:null,
        errorMessage:null,
        currentReqId:null,  
        quotationRefNum:null,
        preImagesInput:[],
        localPreImageUrl:[],
        quotaionList:[],
        quotationId:null,
        quoCount:0
    }


    handleChange=({target})=>{
        document.getElementById(target.id).style.borderColor="#d2d6de";
        this.setState({
            errorMessage:null
        })
        console.log("handle change",target)
        if(target.id==="fileInput" || (parseInt(target.id.split("/").length) === parseInt(3) && target.id.split("/")[2]==="preImagesInput")){
            console.log("image input");
            for(let i=0;i<target.files.length;i++){
                if(target.files[i] && target.files[i].type.match('image.*') && parseFloat(target.files[i].size/1024).toFixed(2) > 5000){
                    window.alert("Image size should be within 5MB");
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
                        fileInput:null,
                        localImageUrl:null,
                        errorMessage:"",
                        spinner:false
                    })
                }
                reader.onloadend=()=>{
                    if(target.id==="fileInput"){
                        this.setState({
                            fileInput:target.files[i],
                            localImageUrl:reader.result,
                            errorMessage:"",
                            spinner:false
                        })
                    }
                    else {
                        if(this.state.preImagesInput !== [] && this.state.preImagesInput.length >= 4){
                            this.setState({
                                errorMessage:"Can upload only 4 Pre-Images at the max",
                                spinner:false
                            })
                            return
                        }
                        let tempFile=[...this.state.preImagesInput];
                        tempFile.push(target.files[i]);
                        let tempUrls =[...this.state.localPreImageUrl];
                        tempUrls.push(reader.result);
                        this.setState({
                            preImagesInput:tempFile,
                            localPreImageUrl:tempUrls,
                            errorMessage:"",
                            spinner:false
                        })
                    }
                }
                }
            }
        }
        else{
        this.setState({ 
            [target.id]: target.value , 
            lastErrorField:null,
            errorMessage:""
        });
    }
    }    

    submitQuotation=()=>{
        if(parseInt(this.state.quoCount) >= parseInt(this.state.requirements.length)*2){
            axios.put(this.props.config+"/updateSchool/"+this.props.location.school.schoolId+"/"+"QuotationAdded")
            .then(res=>{
                window.alert("Quotations submitted successfully!")
                this.props.history.push({
                    pathname: '/volunteerSchoolCheck',
                    currentUser:this.props.location.currentUser,
                    school:this.props.location.school,
                    ...this.props            
                });
            })
            .catch(error=>{
                window.alert("Failed due to "+ error);
            })
        }
        else{
            this.setState({errorMessage:"Please add atleast 2 quotations for all requirements"})
        }
    }

    requirementList=()=>{
        axios.get(this.props.config+"/"+this.props.location.school.schoolId+"/requirements")
        .then(res=>{
            let resp=res.data;
            for(let i=0;i<resp.length;i++){
                resp[i].quotaionList=[]
            };
            this.setState({
                requirements:resp.filter(r=>r.status!=="PROJECT_CLOSED"),
                getRequirementList:false,
                spinner:false
            })
        })
    }    
    updateCurrentReqId=(e)=>{
        if(this.state.requirements[e.target.id.split("/")[1]].preImages.length === 0 && e.target.ref !=="preImages" && (this.state.preImagesInput === [] || this.state.preImagesInput.length < 2)){
            this.setState({errorMessage:"Please upload atleast 2 Pre-Images of requirement"});
            return;
        }
        this.setState({
            currentReqId:e.target.id.split("/")[0],
            quotationRefNum:e.target.id.split("/")[1],
            errorMessage:null
        })
        document.getElementById('modal-default').style.display='block';
    }
    uploadPreImage=(e)=>{
        this.setState({
            currentReqId:e.target.id.split("/")[0],
            quotationRefNum:e.target.id.split("/")[1]
        })
        document.getElementById('modal-default').style.display='block';
    }
    closeModel=()=>{
        document.getElementById('modal-default').style.display='none';
    }
    deleteQuotation=(e)=>{
        e.preventDefault();
        var quotationId=e.target.id.split("/")[0];
        var reqIndex=e.target.id.split("/")[1];
        var quoIndex=e.target.id.split("/")[2];
        axios.delete(this.props.config+"/quotation/"+quotationId)
        .then(res=>{

        })
        .catch(error=>{
            window.alert("Deletion failed due to "+error)
        })
        var array=[...this.state.requirements[reqIndex].quotaionList];
        array.splice(quoIndex,1);
        if(this.state.requirements[reqIndex].quotaionList.length===1){
            array=[];
        }
        let i=[...this.state.requirements];
        i[reqIndex].quotaionList=array;
        this.setState({
            requirements:i,
        })
     }
    createTable=()=>{
        var rows=[];
        let rowsUpdated=false;
        for(let i=0;i<this.state.requirements.length;i++){
            if(this.state.requirements[i].status==="PROJECT_CLOSED"){
                continue
            }
            rowsUpdated=true;
            rows.push(<tr>
                <td>{i+1}</td>
                <td>{this.state.requirements[i].assetName}</td>
                <td>{this.state.requirements[i].quantity}</td>                                        
                <td>
                     <div className="form-group">
                        <label for={this.state.requirements[i].requirementId+"/"+i+"/preImagesInput"} class="btn btn-default">Add Pre-Image</label>
                        <input class="hidden" type="file" id={this.state.requirements[i].requirementId+"/"+i+"/preImagesInput"} onChange={this.handleChange}/>
                    </div>
                </td>
                <td>
                <button id={this.state.requirements[i].requirementId+"/"+i} ref="quotation" type="button" class="btn btn-default" onClick={(e)=>this.updateCurrentReqId(e)} >
                    Add Quotation
                </button>
                </td>                    
                <td>{this.state.requirements[i].quotaionList.length>0?this.state.requirements[i].quotaionList.map((req,j)=><div>{req.fileInput.name}<button class="btn btn-default" id={req.quotationId+"/"+i+"/"+j} onClick={(e)=>this.deleteQuotation(e)}>Delete</button></div>):null}
                </td>
                <td>{this.state.requirements[i].preImages !==null && this.state.requirements[i].preImages.length>0?this.state.requirements[i].preImages.map((req)=><div>{req.name}</div>):null}
                </td>
            </tr>)			
        }
        if(rowsUpdated==false)
            rows.push(<tr ><td align="center" colSpan="5">No new records found!</td></tr>)
        return rows;
    }
    
    isFutureDate=(idate)=>{
        var today = new Date().getTime();
        var given = idate.split("-");
        var inputDate = new Date(given[0],given[1] - 1, given[2]).getTime();
        console.log(new Date(given[0],given[1] - 1, given[2]),given,today,inputDate)
        return (today - inputDate) < 0;
    }

	saveClicked=()=>{
        var mobNumRegex=/^(\+\d{1,3}[- ]?)?\d{10}$/;
        if(this.state.lastErrorField!==null)
            document.getElementById(this.state.lastErrorField).style.borderColor="#d2d6de";
        if(this.state.companyName===null){
            this.setState({
                lastErrorField:"companyName",
                errorMessage:"Please enter company name"
            })
            document.getElementById('companyName').style.borderColor="red";
        }
        if(this.state.requirements[this.state.quotationRefNum].quotaionList.length===4){
            this.setState({
                errorMessage:"Only four requirements can be added per requirement"
            })
        }
        else if(this.state.address_line_1===null){
            this.setState({
                lastErrorField:"address_line_1",
                errorMessage:"Please enter address line 1"
            });
            document.getElementById('address_line_1').style.borderColor="red";
        }
        else if(this.state.street===null){
            this.setState({
                lastErrorField:"street",
                errorMessage:"Please enter street"
            })
            document.getElementById('street').style.borderColor="red";
        }
        else if(this.state.city===null){
            this.setState({
                lastErrorField:"city",
                errorMessage:"Please enter city"
            })
            document.getElementById('city').style.borderColor="red";
        }
        else if(this.state.pincode===null){
            this.setState({
                lastErrorField:"pincode",
                errorMessage:"Please enter pincode"
            })
            document.getElementById('pincode').style.borderColor="red";
        }
        else if(this.state.quotationValidityDate===null || this.isFutureDate(this.state.quotationValidityDate) === false){
            this.setState({
                lastErrorField:"quotationValidityDate",
                errorMessage:"Please select valid quotationValidityDate"
            });
            document.getElementById('quotationValidityDate').style.borderColor="red";
        }
        else if(this.state.quotationDate===null || this.isFutureDate(this.state.quotationDate) === true){
            this.setState({
                lastErrorField:"quotationDate",
                errorMessage:"Please enter valid Quotation Date"
            });
            document.getElementById('quotationDate').style.borderColor="red";
        }
        else if(this.state.quotationPreparedBy===null){
            this.setState({
                lastErrorField:"quotationPreparedBy",
                errorMessage:"Please select quotationPreparedBy"
            });
            document.getElementById('quotationPreparedBy').style.borderColor="red";
        }
        else if(this.state.discountDetails===null){
            this.setState({
                lastErrorField:"discountDetails",
                errorMessage:"Please enter discount details"
            })
            document.getElementById('discountDetails').style.borderColor="red";
        }
        else if(this.state.phoneNumber===null || !mobNumRegex.test(this.state.phoneNumber)){
            this.setState({
                lastErrorField:"phoneNumber",
                errorMessage:"Please enter valid mobile number"
            });
            document.getElementById('phoneNumber').style.borderColor="red";
        }
        else if(this.state.itemDescription===null){
            this.setState({
                lastErrorField:"itemDescription",
                errorMessage:"Please enter item description"
            })
            document.getElementById('itemDescription').style.borderColor="red";
        }
        else if(this.state.quantity===null || isNaN(this.state.quantity)){
            this.setState({
                lastErrorField:"quantity",
                errorMessage:"Please enter valid quantity"
            })
            document.getElementById('quantity').style.borderColor="red";
        }
        else if(this.state.tax===null){
            this.setState({
                lastErrorField:"tax",
                errorMessage:"Please enter valid tax"
            })
            document.getElementById('quantity').style.borderColor="red";
        }
        else if(this.state.unitPrice===null || isNaN(this.state.unitPrice)){
            this.setState({
                lastErrorField:"unitPrice",
                errorMessage:"Please enter valid unit price"
            })
            document.getElementById('unitPrice').style.borderColor="red";
        }
        else if(this.state.shippingCost===null || isNaN(this.state.shippingCost)){
            this.setState({
                lastErrorField:"shippingCost",
                errorMessage:"Please enter valid shipping cost"
            })
            document.getElementById('shippingCost').style.borderColor="red";
        }
        else if(this.state.totalAmount===null || isNaN(this.state.totalAmount)){
            this.setState({
                lastErrorField:"totalAmount",
                errorMessage:"Please enter valid total amount"
            })
            document.getElementById('totalAmount').style.borderColor="red";
        }
        else if(this.state.fileInput===null){
            this.setState({
                lastErrorField:"fileInput",
                errorMessage:"Please upload quotation file"
            })
        }
        else{
            document.getElementById('modal-default').style.display='none';
            document.getElementById('companyName').style.borderColor="#d2d6de";
            document.getElementById('address_line_1').style.borderColor="#d2d6de";
            document.getElementById('city').style.borderColor="#d2d6de";
            document.getElementById('street').style.borderColor="#d2d6de";
            document.getElementById('pincode').style.borderColor="#d2d6de";
            document.getElementById('phoneNumber').style.borderColor="#d2d6de";
            document.getElementById('quotationPreparedBy').style.borderColor="#d2d6de";        
            document.getElementById('quotationDate').style.borderColor="#d2d6de";
            document.getElementById('quotationValidityDate').style.borderColor="#d2d6de";
            document.getElementById('quantity').style.borderColor="#d2d6de";
            document.getElementById('unitPrice').style.borderColor="#d2d6de";
            document.getElementById('itemDescription').style.borderColor="#d2d6de";
            document.getElementById('tax').style.borderColor="#d2d6de";
            document.getElementById('shippingCost').style.borderColor="#d2d6de";
            const quotation={
                schoolId:this.props.location.school.schoolId,
                requirementId:this.state.currentReqId,
                projectId:this.props.location.school.projects[0].projectId,
                companyName:this.state.companyName,
                address_line_1:this.state.address_line_1,
                city:this.state.city,
                street:this.state.street,
                pincode:this.state.pincode,
                phoneNumber:this.state.phoneNumber,
                comment:this.state.comment,
                quotationPreparedBy:this.state.quotationPreparedBy,
                quotationDate:this.state.quotationDate,
                quotationValidityDate:this.state.quotationValidityDate,
                quantity:this.state.quantity,
                discountDetails:this.state.discountDetails,
                itemDescription:this.state.itemDescription,
                unitPrice:this.state.unitPrice,
                tax:this.state.tax,
                shippingCost:this.state.shippingCost,
                warranty:this.state.warranty,
                totalAmount:this.state.totalAmount,
                proofOfId:{
                    image:this.state.fileInput,
                    comments:"",
                },
            }
            console.log(quotation);
            this.setState({
                spinner:true
            });
            var regFormModel=new FormData();
            regFormModel.set('payload',JSON.stringify(quotation));
            regFormModel.append('files',this.state.fileInput);
            if(this.state.preImagesInput!==[]){
                this.state.preImagesInput.forEach(file=>{
                    regFormModel.append('preImage',file);
                })
            }
            axios.post(this.props.config+'/quotation',regFormModel)
            .then(res=>{
                document.getElementById('modal-default').style.display='none';
                console.log(res);
                let quoCountTemp = parseInt(this.state.quoCount) + 1;
                this.setState({
                    spinner:false,
                    quotationId:res.data,
                    quoCount:quoCountTemp
                })
                updateList(res);
            })
            .catch(error=>{
                window.alert("Failed to save quotation due to "+error);
            })
            let updateList=(res)=>{
                let ql={
                    quotationId:res.data,
                    requirementId:this.state.currentReqId,
                    companyName:this.state.companyName,
                    address_line_1:this.state.address_line_1,
                    city:this.state.city,
                    street:this.state.street,
                    pincode:this.state.pincode,
                    phoneNumber:this.state.phoneNumber,
                    comment:this.state.comment,
                    quotationPreparedBy:this.state.quotationPreparedBy,
                    quotationDate:this.state.quotationDate,
                    quotationValidityDate:this.state.quotationValidityDate,
                    quantity:this.state.quantity,
                    discountDetails:this.state.discountDetails,
                    itemDescription:this.state.itemDescription,
                    quantity:this.state.quantity,
                    unitPrice:this.state.unitPrice,
                    tax:this.state.tax,
                    shippingCost:this.state.shippingCost,
                    totalAmount:this.state.totalAmount,
                    warranty:this.state.warranty,
                    fileInput:this.state.fileInput,
                    localImageUrl:this.state.localImageUrl
                };
                let quoTemp=this.state.requirements[this.state.quotationRefNum].quotaionList;
                quoTemp.push(ql);
                let i=[...this.state.requirements];
                i[this.state.quotationRefNum].quotaionList=quoTemp;
                let preImgTemp=[...this.state.requirements[this.state.quotationRefNum].preImages];
                preImgTemp.push(...this.state.preImagesInput);
                i[this.state.quotationRefNum].preImages= preImgTemp;
                this.setState({
                    requirements:i,
                    preImagesInput:[]
                })
            }
        }
    }
    
    render() {	
        console.log(this.state.requirements);
        return (
            <div>
            <div style={{fontSize:"large"}}>
            {this.state.getRequirementList?this.requirementList():null}
                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>
                        {this.props.location.school.schoolInfo.schoolName}
                        <small>added on</small>
                        </h1>
                        <ol className="breadcrumb">
                        <li><a href="../../index.html"><i className="fa fa-dashboard" /> Home</a></li>
                        <li><a href="#">UI</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row col-xs-12">
                            {this.props.location.school.projects[0].adminComments !== null?
                        <div className="box-body table-responsive no-padding">
                            <table className="table table-hover">
                            <tbody>
                            <tr>
                                    <th>Admin Comments </th>
                                </tr>
                                <tr>
                                    <td><textarea className="input-xlarge" ref ="comment" id="adminComments" value={this.props.location.school.projects[0].adminComments} rows="3" disabled></textarea></td>
                                </tr>
                            </tbody></table>
                        </div>
    :null}
                        </div>
                        <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                            <div className="box-header">
                                <h4 className="box-title">Upload quotation</h4>
                                <div className="box-tools">
                                <div className="input-group input-group-sm" style={{width: 150}}>
                                    <input type="text" name="table_search" className="form-control pull-right" placeholder="Search" />
                                    <div className="input-group-btn">
                                    <button type="submit" className="btn btn-default"><i className="fa fa-search" /></button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="box-body table-responsive no-padding">
                                <table className="table table-hover">
                                    <tbody>
                                        <tr>
                                        <th>ID</th>
                                        <th>Requirements</th>
                                        <th>Units</th>
                                        <th>Pre Image</th>
                                        <th>Quotation</th>
                                        <th>Quotation Details</th>
                                        <th>Pre Image Details</th>
                                        </tr>
                                        {this.state.getRequirementList?null:this.createTable()}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.spinner?<div class="spinner"></div>:null}
                            {this.state.errorMessage!=null?<div className="col-md-12" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}
                            
                            <div className="modal" id="modal-default">
                                <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                    <button type="button" className="close" onClick={this.closeModel} aria-label="Close">
                                        <span aria-hidden="true">×</span></button>
                                    <h4 className="modal-title">Add Quotations</h4>
                                    </div>
                                    <div className="modal-body">
                                    <div className="row">
                                        <section className="content">
                                        <div className="form-group">
                                            <label for="fileInput" className="form-control" style={{cursor:"pointer",border:"1px solid #d2d6de"}}>Click to upload Quotation</label>
                                            <input class="hidden" type="file" id="fileInput" onChange={this.handleChange}/>
                                        </div>
                                        <div className="row">
                                        <div className="col-md-6">
                                            <div className="box box-primary">
                                                <form role="form">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" id="companyName" placeholder="Enter Company name*" onChange={this.handleChange} />
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="address_line_1" placeholder="Enter Address Line 1" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="street"placeholder="Enter street" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="city" placeholder="Enter city" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="pincode" placeholder="Enter pincode" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="phoneNumber"placeholder="Enter phone number" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="comment"placeholder="Comment / Special instructions" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="quotationPreparedBy" placeholder="Quotation Prepared by" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="warranty" placeholder="Warranty" onChange={this.handleChange}/>
                                                    </div>
                                                </form>
                                            </div>
                                            </div>
                                            <div className="col-md-6">
                                            <div className="box box-primary">
                                                <form role="form">
                                                    <div className="form-group">
                                                    <input type="date" className="form-control" id="quotationDate" placeholder="Quotation Date" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="date" className="form-control" id="quotationValidityDate" placeholder="Quotation Valid Date" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="discountDetails" placeholder="Discount Details" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="itemDescription" placeholder="Item Description" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="quantity" pattern= {/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/} placeholder="Quantity" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="unitPrice" pattern= {/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/} placeholder="Unit Price" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="tax" pattern= {/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/} placeholder="Tax in %" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="shippingCost" pattern= {/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/} placeholder="Shipping Cost" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="totalAmount" pattern= {/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/} placeholder="Total amount" onChange={this.handleChange}/>
                                                    </div>
                                                </form>
                                            </div>
                                            </div>
                                            <div className="col-md-12">
                                            {this.state.errorMessage!=null?<div className="col-md-12" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-default pull-left" onClick={()=>this.closeModel}>Close</button>
                                                    <button type="button" className="btn btn-primary" onClick={()=>this.saveClicked()}>Save</button>
                                                </div>
                                            </div>
                                        </div>
                                        </section>
                                    </div>
                                </div>
                            </div>    
                        </div>
                    </div>
                  </div>
                </div>
          </div>
          <div class="timeline-footer">
                                <a class="btn btn-warning btn-flat btn" onClick={()=>this.submitQuotation()}>Submit Quotation</a>
                            </div>
              </section>
              
                  </div>
                  </div>
            </div>
        );
    }	
}

export default withRouter(viewRequirements);
