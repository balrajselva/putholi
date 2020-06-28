import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import '../quotation/reviewQuotation.css';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

class AddInvoice extends Component {

    state={
        quotations:"",
        getQuotationList:true,
        spinner:true,
        companyName:null,
        address_line_1:null,
        street:null,
        city:null,
        pincode:null,
        phoneNumber:null,
        comment:null,
        invoiceDate:null,
        invoicePreparedBy:null,
        discountDetails:null,
        quantity:null,
        itemDescription:null,
        unitPrice:null,
        tax:null,
        shippingCost:null,
        totalAmount:null,
        lastErrorField:null,
        errorMessage:null,
        currentReqId:null,
        invoiceRefNum:null,
        invoiceList:[],
        invoiceId:null,
        workStatus:null,
        paymentMode:null,
        postImage:[],
        fileInput:null,
        ifsc:null,
        accountType:null,
        vendorCode:null,
        oldInvoices:[],
        bankName:null,
        accountNum:null,
        commentsTable:false,
        localPostImageUrl:[],
        oldInvoicesComments:true
    }

    handleChange=({target})=>{
        console.log(target)
        document.getElementById(target.id).style.borderColor="#d2d6de";
        if(target.id==="fileInput"){
            if(target.files[0] && target.files[0].type.match('image.*') && parseFloat(target.files[0].size/1024).toFixed(2) > 5000){
                window.alert("Image size should be within 5MB");
                return
             }
             else{
              this.setState({spinner:true});
              const reader=new FileReader();
              const file=target.files[0]; 
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
                  this.setState({
                      fileInput:target.files[0],
                      localImageUrl:reader.result,
                      errorMessage:"",
                      spinner:false
                  })
              }
            }
        }
        else if(target.id==="postImage"){
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
                        postImage:[],
                        localPostImageUrl:[],
                        errorMessage:"",
                        spinner:false
                    })
                }
                reader.onloadend=()=>{
                    if(this.state.postImage !== [] && this.state.postImage.length >= 4){
                        this.setState({
                            errorMessage:"Can upload only 4 Post-Images at the max",
                            spinner:false
                        })
                        return
                    }
                    let tempFile=[...this.state.postImage];
                    tempFile.push(target.files[i]);
                    let tempUrls =[...this.state.localImageUrl];
                    tempUrls.push(reader.result);                    
                    this.setState({
                        postImage:tempFile,
                        localPostImageUrl:tempUrls,
                        errorMessage:"",
                        spinner:false
                    })
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

    submitInvoice=()=>{
        if(this.state.invoiceId !== null){
            axios.put(this.props.config+"/updateSchool/"+this.props.location.school.schoolId+"/"+"InvoiceAdded")
            .then(res=>{
                window.alert("Invoices submitted successfully!")
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
            this.setState({errorMessage:"Please add atleast one invoice"})
        }   
    }

    quotationList=()=>{
        axios.get(this.props.config+"/"+this.props.location.school.schoolId+"/selectedQuotations")
        .then(res=>{
            let resp=res.data;
            console.log(res.data)
            for(let i=0;i<resp.length;i++){
                resp[i].invoiceList=[]
            };
            for(let j=0;j<resp.length;j++){
                console.log(resp[j].requirement.requirementId)
                if(resp[j].requirement.invoiceStatus === "INVOICE_REJECTED"){
                    axios.get(this.props.config+"/invoice/requirement/"+resp[j].requirement.requirementId)
                    .then(res=>{
                        console.log("Invoices",res.data)
                        let invList=[...this.state.oldInvoices,...res.data];
                        this.setState({
                            oldInvoices:invList,
                            quotations:resp,
                            getQuotationList:false,
                            spinner:false
                        })
                    })
                }
                else{
                    this.setState({
                        quotations:resp,
                        getQuotationList:false,
                        spinner:false
                    })
                }
            }
        })
    }    
    updateCurrentReqId=(e)=>{
        console.log(e.target.id)
        this.setState({
            currentReqId:e.target.id.split("/")[0],
            invoiceRefNum:e.target.id.split("/")[1]
        })
    }
    deleteInvoice=(e)=>{
        e.preventDefault();
        var invoiceId=e.target.id.split("/")[0];
        var reqIndex=e.target.id.split("/")[1];
        var invIndex=e.target.id.split("/")[2];
        axios.delete(this.props.config+"/invoice/"+invoiceId)
        .then(res=>{

        })
        .catch(error=>{
            window.alert("Deletion failed due to "+error)
        })
        var array=[...this.state.quotations[reqIndex].invoiceList];
        array.splice(invIndex,1);
        if(this.state.quotations[reqIndex].invoiceList.length===1){
            array=[];
        }
        let i=[...this.state.quotations];
        i[reqIndex].invoiceList=array;
        this.setState({
            quotations:i,
        })
     }

    createTable=()=>{
        var rows=[];
        let rowsUpdated=false;
        for(let i=0;i<this.state.quotations.length;i++){
            if(this.state.quotations[i].requirement.invoiceStatus === "INVOICE_IN_PROGRESS" || this.state.quotations[i].requirement.status === "Fully_Completed"){
                continue;
            }	
            rowsUpdated=true;
            rows.push(<tr>
                <td>{this.state.quotations[i].requirementId}</td>
                <td>{this.state.quotations[i].itemDescription}</td>
                <td>{this.state.quotations[i].quantity}</td>      
                <td>{this.state.quotations[i].totalAmount}</td>   
                <td>{this.state.quotations[i].quotationValidityDate.split("T")[0]}</td>                                                                 
                <td>
                <button id={this.state.quotations[i].requirementId+"/"+i} type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-default" onClick={(e)=>this.updateCurrentReqId(e)} >
                    Add Invoice
                </button>
                </td>                    
                <td>{this.state.quotations[i].invoiceList.length>0?this.state.quotations[i].invoiceList.map((req,j)=><div>{req.fileInput.name}<button class="btn btn-default" id={req.invoiceId+"/"+i+"/"+j} onClick={(e)=>this.deleteInvoice(e)}>Delete</button></div>):null}
                </td>
                <td>{this.state.quotations[i].invoiceList.length>0?this.state.quotations[i].invoiceList.map((req,j)=><div>{req.postImage.name}<button class="btn btn-default" id={req.invoiceId+"/"+i+"/"+j} onClick={(e)=>this.deletePostImage(e)}>Delete</button></div>):null}
                </td>
            </tr>)
        }
        if(rowsUpdated==false)
            rows.push(<tr ><td align="center" colSpan="5">No new records found!</td></tr>)
        return rows;
    }

    createCommentsTable=()=>{
        var rows=[];
        let rowsUpdated=false;
        for(let i=0;i<this.state.oldInvoices.length;i++){
            if(this.state.oldInvoices[i].status!=="AdminRejectedInvoice"){
                continue
            }
            rowsUpdated=true;
            rows.push(    
                <tr>
                    <td>{this.state.oldInvoices[i].id}</td>
                    <td>{this.state.oldInvoices[i].requirement.requirementId}</td>
                    <td>{this.state.oldInvoices[i].adminComments}</td>
                </tr>
            )
        }
        if(rowsUpdated==false)
            rows.push(<tr ><td align="center" colSpan="5">No rejected quotations!</td></tr>)
        return rows;
    }

    isFutureDate=(idate)=>{
        var today = new Date().getTime();
        var given = idate.split("-");
        var inputDate = new Date(given[0],given[1] - 1, given[2]).getTime();
        console.log(new Date(given[0],given[1] - 1, given[2]),given,today,inputDate)
        return (today - inputDate) < 0;
    }
    closeModel=()=>{
        document.getElementById('modal-default').style.display='none';
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
        if(this.state.quotations[this.state.invoiceRefNum].invoiceList.length===1){
            this.setState({
                errorMessage:"Only one invoice can be added per requirement"
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
        else if(this.state.pincode===null || isNaN(this.state.pincode)){
            this.setState({
                lastErrorField:"pincode",
                errorMessage:"Please enter valid pincode"
            })
            document.getElementById('pincode').style.borderColor="red";
        }
        else if(this.state.invoiceDate===null || this.isFutureDate(this.state.invoiceDate) === true){
            console.log(this.state.invoiceDate,this.isFutureDate(this.state.invoiceDate))
            this.setState({
                lastErrorField:"invoiceDate",
                errorMessage:"Please enter valid Invoice Date"
            });
            document.getElementById('invoiceDate').style.borderColor="red";
        }
        else if(this.state.invoicePreparedBy===null){
            this.setState({
                lastErrorField:"invoicePreparedBy",
                errorMessage:"Please enter Person / Vendor Name"
            });
            document.getElementById('invoicePreparedBy').style.borderColor="red";
        }
        else if(this.state.discountDetails===null){
            this.setState({
                lastErrorField:"discountDetails",
                errorMessage:"Please enter discount details"
            })
            document.getElementById('discountDetails').style.borderColor="red";
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
        else if(this.state.phoneNumber===null || !mobNumRegex.test(this.state.phoneNumber)){
            this.setState({
                lastErrorField:"phoneNumber",
                errorMessage:"Please enter valid mobile number"
            });
            document.getElementById('phoneNumber').style.borderColor="red";
        }
        else if(this.state.fileInput===null){
            this.setState({
                lastErrorField:"fileInput",
                errorMessage:"Please upload invoice"
            })
        }
        else if(this.state.postImage===[]){
            this.setState({
                lastErrorField:"postImage",
                errorMessage:"Please upload post image"
            })
        }
        else if(this.state.postImage.length < 2){
            this.setState({
                lastErrorField:"postImage",
                errorMessage:"Please upload atleast 2 Post-Images"
            })
        }
        else if(this.state.bankName===null){
            this.setState({
                lastErrorField:"bankName",
                errorMessage:"Please Select Bank Name"
            })
        }
        else if(this.state.ifsc===null){
            this.setState({
                lastErrorField:"ifsc",
                errorMessage:"Please enter IFSC code"
            })
        }
        else if(this.state.paymentMode===null){
            this.setState({
                lastErrorField:"paymentMode",
                errorMessage:"Please selct payment mode"
            })
        }
        else if(this.state.accountNum===null || isNaN(this.state.totalAmount)){
            this.setState({
                lastErrorField:"accountNum",
                errorMessage:"Please enter account number"
            })
        }
        
        else if(this.state.workStatus===null){
            this.setState({
                lastErrorField:"workStatus",
                errorMessage:"Please select work status"
            })
        }
        else if(this.state.accountType===null){
            this.setState({
                lastErrorField:"accountType",
                errorMessage:"Please select Account Type"
            })
        }
        else if(this.state.vendorCode===null){
            this.setState({
                lastErrorField:"vendorCode",
                errorMessage:"Please Enter VendorCode"
            })
        }

        else{
            document.getElementById("modal-default").style.display="none";
            document.getElementById("mainContent").class="skin-blue sidebar-mini";
            document.getElementById('companyName').style.borderColor="#d2d6de";
            document.getElementById('address_line_1').style.borderColor="#d2d6de";
            document.getElementById('city').style.borderColor="#d2d6de";
            document.getElementById('street').style.borderColor="#d2d6de";
            document.getElementById('pincode').style.borderColor="#d2d6de";
            document.getElementById('phoneNumber').style.borderColor="#d2d6de";
            document.getElementById('invoiceDate').style.borderColor="#d2d6de";
            document.getElementById('quantity').style.borderColor="#d2d6de";
            document.getElementById('unitPrice').style.borderColor="#d2d6de";
            document.getElementById('itemDescription').style.borderColor="#d2d6de";
            document.getElementById('tax').style.borderColor="#d2d6de";
            document.getElementById('shippingCost').style.borderColor="#d2d6de";
            document.getElementById('bankName').style.borderColor="#d2d6de";
            document.getElementById('ifsc').style.borderColor="#d2d6de";
            document.getElementById('paymentMode').style.borderColor="#d2d6de";
            document.getElementById('workStatus').style.borderColor="#d2d6de";
            document.getElementById('accountNum').style.borderColor="#d2d6de";
            document.getElementById('accountType').style.borderColor="#d2d6de";
            document.getElementById('vendorCode').style.borderColor="#d2d6de";
            document.getElementById('postImage').style.borderColor="#d2d6de";
            confirmAlert({
                title: 'Confirm to submit',
                message: 'Are you sure to do this.',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => this.saveForm()
                  },
                  {
                    label: 'No',
                    onClick: () => {}
                  }
                ]
            });
        }
    }

    saveForm=()=>{
        const invoice={
            school:this.props.location.school.schoolId+"",
            requirement:this.state.currentReqId,
            projectId:this.props.location.school.projects[0].projectId,
            companyName:this.state.companyName,
            address_line_1:this.state.address_line_1,
            city:this.state.city,
            street:this.state.street,
            pincode:this.state.pincode,
            phoneNumber:this.state.phoneNumber,
            comment:this.state.comment,
            invoiceDate:this.state.invoiceDate,
            quantity:this.state.quantity,
            discountDetails:this.state.discountDetails,
            itemDescription:this.state.itemDescription,
            unitPrice:this.state.unitPrice,
            tax:this.state.tax,
            shippingCost:this.state.shippingCost,
            totalAmount:this.state.totalAmount,
            invoicePreparedBy:this.state.invoicePreparedBy,
            workStatus:this.state.workStatus,
            accountType:this.state.accountType,
            vendorCode:this.state.vendorCode,
            bankName:this.state.bankName,
            ifsc:this.state.ifsc,
            paymentMode:this.state.paymentMode,
            accountNum:this.state.accountNum,
            invoiceStatus:"InvoiceAdded",
            proofOfId:{
                image:this.state.fileInput,
                comments:"",
            },
        }
        this.setState({
            spinner:true
        });
        var regFormModel=new FormData();
        regFormModel.set('payload',JSON.stringify(invoice));
        regFormModel.append('files',this.state.fileInput);
        if(this.state.postImage!==[]){
            this.state.postImage.forEach(image=>{
                regFormModel.append('postImage',image);
            })
        }
        console.log(regFormModel);
        axios.post(this.props.config+'/invoiceUpload',regFormModel)
        .then(res=>{ 
            console.log(res);
            this.setState({
                spinner:false,
                invoiceId:res.data
            })
            updateList(res);
            window.alert("Succesfully uploaded invoice!!!");
        })
        .catch(error=>{
            window.alert("Failed to save invoice due to "+error);
        })
        let updateList=(res)=>{
            let ql={
                invoiceId:res.data,
                requirementId:this.state.currentReqId,
                companyName:this.state.companyName,
                address_line_1:this.state.address_line_1,
                city:this.state.city,
                street:this.state.street,
                pincode:this.state.pincode,
                phoneNumber:this.state.phoneNumber,
                comment:this.state.comment,
                invoicePreparedBy:this.state.invoicePreparedBy,
                invoiceDate:this.state.invoiceDate,
                quantity:this.state.quantity,
                discountDetails:this.state.discountDetails,
                itemDescription:this.state.itemDescription,
                quantity:this.state.quantity,
                unitPrice:this.state.unitPrice,
                tax:this.state.tax,
                shippingCost:this.state.shippingCost,
                vendorCode:this.state.vendorCode,
                accountType:this.state.accountType,
                totalAmount:this.state.totalAmount,
                postImage:this.state.postImage,
                fileInput:this.state.fileInput,
                invoiceStatus:"InvoiceAdded",
                localImageUrl:this.state.localImageUrl
            };
            let a=this.state.quotations[this.state.invoiceRefNum].invoiceList;
            a.push(ql);
            let i=[...this.state.quotations];
            i[this.state.invoiceRefNum].invoiceList=a;
            i[this.state.invoiceRefNum].requirement.invoiceStatus="INVOICE_IN_PROGRESS"
            console.log(i);
            this.setState({
                quotations:i,
            })
            console.log(i)
        }
    }
    
    render() {	
        console.log(this.state);
        console.log(this.props);
        return (
            <div>
            <div style={{fontSize:"large"}}>
            <div className="content-wrapper">
                    <section className="content-header">
                        {this.state.getQuotationList?this.quotationList():null}
                        <h1>
                        {this.props.location.school.schoolInfo.schoolName}
                        <small>added on</small>
                        </h1>
                    </section>
                    <section className="content">
                        <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                            <div className="box-header">
                                <h4 className="box-title">Upload Invoice for following requirements</h4>
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
                                        <th>Requirement ID</th>
                                        <th>Requirement</th>
                                        <th>Units</th>
                                        <th>Quoted Amount</th>
                                        <th>Quotation valid date</th>
                                        <th>Add Invoice</th>
                                        <th>File Details</th>
                                        <th>Post Image Details</th>
                                        </tr>
                                        {this.state.getQuotationList?null:this.createTable()}
                                    </tbody>
                                </table>
                            </div>
                            </div>
                            </div>
                            </div>
                            </section>
                            
                    <section className="content">
                        <div className="row">
                        <div className="col-xs-12">
                        <div className="box">
                            <div className="box-header">
                                <h4 className="box-title">Rejected Invoices</h4>
                            <div className="box-body table-responsive no-padding">
                                <table className="table table-hover">
                                    <tbody>
                                        <tr>
                                            <th>Invoice ID</th>
                                            <th>Requirement ID</th>
                                            <th>Admin Comments</th>
                                        </tr>
                                        {this.state.getQuotationList?null:this.createCommentsTable()}
                                    </tbody>
                                </table>
                            </div>
                            <h4>Please re-upload/add invoice with appropriate information</h4>
                            </div>
                        
                            {this.state.errorMessage!=null?<div className="col-md-12" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}
                            {this.state.spinner?<div class="spinner"></div>:null}
                            <div className="modal fade" id="modal-default">
                                <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span></button>
                                    <h4 className="modal-title">Add Invoice</h4>
                                    </div>
                                    <div className="modal-body">
                                    <div className="row">
                                        <section className="content">
                                        <div className="row">
                                        <div className="col-md-6">
                                            <div className="box box-primary">
                                                <form role="form">
                                                    <div className="form-group">
                                                    <label for="fileInput" className="form-control" style={{cursor:"pointer",border:"1px solid #d2d6de"}}>Upload Invoice Image</label>
                                                    <input class="hidden" type="file" id="fileInput" onChange={this.handleChange}/>
                                                    <input type="text" className="form-control" id="companyName" placeholder="Enter Company name" onChange={this.handleChange}/>
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
                                                    <select className="form-control select2" style={{width: '100%'}} id="accountType" value={this.state.accountType} onChange={this.handleChange}>
                                                        <option selected="selected" disabled>Select Account Type</option>
                                                        <option key="Savings" value="Savings Account">Savings</option>
                                                        <option key="Current" value="Current Account">Current</option>
                                                        <option key="CashCredit" value="Current Account">Cash Credit</option>
                                                    </select>                                                    
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="invoicePreparedBy" placeholder="Invoice Prepared by" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <select className="form-control select2" style={{width: '100%'}} id="workStatus" value={this.state.workStatus} onChange={this.handleChange}>
                                                        <option selected="selected" disabled>Select Work Status</option>
                                                        <option key="Fully_Completed" value="Fully_Completed">Fully Completed</option>
                                                        <option key="Partially_Completed" value="Partially_Completed">Partially Completed</option>
                                                    </select>                                                    
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="discountDetails" placeholder="Discount Details" onChange={this.handleChange}/>
                                                    </div>
                                                </form>
                                            </div>
                                            </div>
                                            <div className="col-md-6">
                                            <div className="box box-primary">
                                                <form role="form">
                                                    <div className="form-group">
                                                    <label for="postImage" className="form-control" style={{cursor:"pointer",border:"1px solid #d2d6de"}}>Upload Post Image</label>
                                                    <input class="hidden" type="file" id="postImage" onChange={this.handleChange}/>
                                                    <input type="date" className="form-control" id="invoiceDate" placeholder="Invoice Date" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="quantity" placeholder="Quantity" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="unitPrice" placeholder="Unit Price" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="tax" placeholder="Tax" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="shippingCost" placeholder="Shipping Cost" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="totalAmount" placeholder="Total amount" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <select className="form-control select2" style={{width: '100%'}} id="bankName" value={this.state.bankName} onChange={this.handleChange}>
                                                        <option selected="selected" disabled>Select Bank Name</option>
                                                        <option key="Axis" value="Axis">Axis</option>
                                                        <option key="ICICI" value="ICICI">ICICI</option>
                                                        <option key="HDFC" value="HDFC">HDFC</option>
                                                        <option key="SBI" value="SBI">SBI</option>
                                                        <option key="KVB" value="KVB">KVB</option>
                                                        <option key="Others" value="Others">Others</option>
                                                    </select>                                                    
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="vendorCode" placeholder="Vendor Code" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="ifsc" placeholder="IFSC code" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <select className="form-control select2" style={{width: '100%'}} id="paymentMode" value={this.state.paymentMode} onChange={this.handleChange}>
                                                        <option selected="selected" disabled>Select Payment Mode</option>
                                                        <option key="NEFT" value="NEFT">NEFT</option>
                                                        <option key="RTGS" value="RTGS">RTGS</option>
                                                    </select>                                                    
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="accountNum" placeholder="Account Number" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    </div>
                                                </form>
                                            </div>
                                            </div>
                                            <div className="col-md-12">
                                            <div className="form-group">
                                                    <input type="text" className="form-control" id="itemDescription" placeholder="Item Description" onChange={this.handleChange}/>
                                                    </div>
                                            </div>
                                            <div className="col-md-12">
                                            {this.state.errorMessage!=null?<div className="col-md-12" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>this.saveClicked()}>Save</button>
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
              </section>
              
                  </div>
                  </div>
            </div>
        );
    }	
}

export default withRouter(AddInvoice);
