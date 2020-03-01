import React, { Component } from 'react'
import { withRouter } from 'react-router'
import axios from 'axios'
import './css/workOrder.css'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

class AdminInitiateWorkOrder extends Component {
    state={
        quoList:null,
        spinner:false,
        requirements:null,
        getRequirementList:true,
        currentReqId:null,
        currentQuotation:null
      }
      componentDidMount(){
        console.log(this.props.location.school)
        axios.get("http://localhost:6060/puthuyir/"+this.props.location.school.schoolId+"/requirements")
            .then(res=>{
                let resp=res.data;
                console.log(resp);
                this.setState({
                    requirements:resp,
                    spinner:false
                })
        axios.post("http://localhost:6060/puthuyir/getQuotations/"+this.props.location.school.schoolId)
        .then(res=>{
            console.log(res.data);
            this.setState({
                quoList:res.data,
                spinner:false,
                getRequirementList:false
            })
            let currentQuotationTemp = null;
            for(let j=0;j<this.state.quoList[this.state.requirements[0].requirementId].length;j++){
                var tempQuo=this.state.quoList[this.state.requirements[0].requirementId][j];
                if(tempQuo.quotationStatus==="QUOTATION_ACCEPTED"){
                    currentQuotationTemp = tempQuo;
                  break;
                }
              }
            this.setState({
                currentReqId:this.state.requirements[0].requirementId,
                currentQuotation:currentQuotationTemp
            })
        })
        .catch(error=>{
            window.alert("Unable to get quotations due to "+error)
        })
    })
    }
    handleChange=({target})=>{
        this.setState({ 
            [target.id]: target.value 
        });
    }
    updateCurrentReq=({target})=>{
        console.log(target.value);
        let currentQuotationTemp=this.state.quoList[target.value]
        for(let j=0;j<this.state.quoList[target.value].length;j++){
            var tempQuo=this.state.quoList[target.value][j];
            if(tempQuo.quotationStatus==="QUOTATION_ACCEPTED"){
                currentQuotationTemp = tempQuo;
              break;
            }
          }
        this.setState({
            currentReqId:target.value,
            currentQuotation:currentQuotationTemp
        })
    }
    generatePdf=()=>{
        var date=new Date();
        console.log(date);
        var orderId = this.props.location.school.schoolId+""+this.state.currentReqId+this.state.currentQuotation.quotationId+date.getFullYear()+date.getMonth()+date.getDate()+date.getTime();
        console.log(orderId);
        const pdf = new jsPDF();
        html2canvas(document.querySelector("#modalToPdf")).then(canvas=>{
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save("download.pdf");
        })
    }
    render() {
        return (
            <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content-header">
    <ol className="breadcrumb">
      <li><a href="admin_main_Screen.html"><i className="fa fa-dashboard" /> Home</a></li>
      <li className="active" />
    </ol>
  </section>
  {/* Main content */}
  <section className="content">
    <div className="row">
      <div className="col-lg-3 col-xs-6">
        {/* small box */}
        <div className="small-box bg-green">
          <div className="inner">
            <h3>Admin<sup style={{fontSize: 20}} /></h3>
            <p />
          </div>
          <div className="icon">
            <i className="ion ion-stats-bars" />
          </div>
          <a href="admin_main_Screen.html" className="small-box-footer"> <i className="fa fa-arrow-circle-right" /></a>
        </div>
      </div>
      {/* ./col */}
      <div className="col-lg-3 col-xs-6">
        {/* small box */}
        <div className="small-box bg-yellow">
          <div className="inner">
            <h3>Inbox</h3>
            <p />
          </div>
          <div className="icon">
            <i className="ion ion-person-add" />
          </div>
          <a href="#" className="small-box-footer"> <i className="fa fa-arrow-circle-right" /></a>
        </div>
      </div>
      {/* ./col */}
      <div className="col-lg-3 col-xs-6">
        {/* small box */}
        <div className="small-box bg-red">
          <div className="inner">
            <h3>Logout</h3>
            <p />
          </div>
          <div className="icon">
            <i className="ion ion-pie-graph" />
          </div>
          <a href="#" className="small-box-footer"> <i className="fa fa-arrow-circle-right" /></a>
        </div>
      </div>
      {/* ./col */}
    </div>
    {/* Small boxes (Stat box) */}
    {/* /.row */}
    {/* Main row */}
    {/* /.row (main row) */}
    <div className="row">
      <div className="col-xs-12">
        <div className="box">
          <div className="box-header">
            <center><h4 className="box-title">Work Order Template</h4></center>
          </div>
        </div>
      </div>
    </div>
    <div className="box">
      <table className="table table-bordered">
        <tbody><tr>
            <td>
              <div className="form-group">
                <label>Select requirement</label>
                <select className="form-control" id="currentReqId" onChange={this.updateCurrentReq}>
                  {this.state.requirements!==null?this.state.requirements.map(req=><option key={req.requirementId} value={req.requirementId}>{req.assetName}</option>):null}
                </select>
              </div>
            </td>
            <td>
              <div className="form-group">
                <label>Selected quotation</label>
                {this.state.currentQuotation!==null ? <input disabled className="form-control" value={this.state.currentQuotation.companyName}/>:<input className="form-control"/>}
              </div>
            </td>
            <td>
              <div className="form-group">
                <br />
                <button type="button" className="btn btn-success pull-center" data-toggle="modal" data-target="#modal-default"><i className="fa fa-credit-card" /> Generate  Work order
                </button>
              </div>
            </td>
          </tr>
        </tbody></table>
    </div>
    {this.state.currentQuotation!==null?
                            <div className="modal fade" id="modal-default">
                                <div className="modal-dialog">
                                <div className="modal-content" id="modalToPdf">
                                    <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span></button>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h2 className="page-header">
                                            <i className="fa fa-globe" /> Work Order to {this.state.currentQuotation.companyName}
                                            <small className="pull-right">Date: 2/10/2014</small>
                                            </h2>
                                        </div>
                                        {/* /.col */}
                                        </div>
                                        </div>
                                    <div className="modal-body">
                                        {/* /.col */}
                                        {/* info row */}
                                        <div className="row invoice-info">
                                        <div className="col-sm-3 invoice-col">
                                            From
                                            <address>
                                            <strong>Puthuyir Trust</strong><br />
                                            address 1<br />
                                            address 2<br />
                                            9199889898989<br />
                                            Email: info@puthuyir.com
                                            </address>
                                        </div>
                                        {/* /.col */}
                                        <div className="col-sm-3 invoice-col">
                                            To
                                            <address>
                                            <strong>{this.state.currentQuotation.companyName}</strong><br />
                                            {this.state.currentQuotation.address_line_1}<br />
                                            {this.state.currentQuotation.street}<br />
                                            {this.state.currentQuotation.city}<br />
                                            {this.state.currentQuotation.pincode}<br />
                                            {this.state.currentQuotation.phoneNumber}<br />
                                            </address>
                                        </div>
                                        <div className="col-sm-3 invoice-col">
                                            For
                                            <address>
                                            <strong>{this.props.location.school.schoolInfo.schoolName}</strong><br />
                                            {this.props.location.school.address.addressLine1}<br />
                                            {this.props.location.school.address.addressLine2}<br />
                                            {this.props.location.school.address.city}<br />
                                            {this.props.location.school.address.district}<br />
                                            
                                            Contact Person: {this.props.location.school.contacts.primaryConName}<br />
                                            Contact Person number: {this.props.location.school.contacts.primaryConNum}<br />
                                            Email: {this.props.location.school.contacts.primaryConMail}<br />
                                            </address>
                                        </div>
                                        {/* /.col */}
                                        <div className="col-sm-3 invoice-col">
                                            <br />
                                            <b>Quotation #007612</b><br />
                                            <b>Order ID:</b> 4F3S8J<br />
                                            <b>Expected Start Date:</b> 2/22/2014<br />
                                            <b>Expected End Date:</b> 2/24/2014<br />
                                        </div>
                                        {/* /.col */}
                                        </div>
                                        {/* /.row */}
                                        {/* Table row */}
                                        <div className="row">
                                        <div className="col-xs-12 table-responsive">
                                            <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                <th>Qty</th>
                                                <th>Descriptions</th>
                                                <th>Unit</th>
                                                <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                <td>{this.state.currentQuotation.quantity}</td>
                                                <td>{this.state.currentQuotation.itemDescription}</td>
                                                <td>1</td>
                                                <td>Rs.{this.state.currentQuotation.unitPrice}</td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </div>
                                        {/* /.col */}
                                        </div>
                                        {/* /.row */}
                                        <div className="row">
                                        {/* accepted payments column */}
                                        <div className="col-xs-6">
                                            <p className="lead">Terms and Conditions :</p>
                                            <p className="text-muted well well-sm no-shadow" style={{marginTop: 10}}>
                                            To add terms and conditions
                                            </p>
                                        </div>
                                        {/* /.col */}
                                        <div className="col-xs-6">
                                            <p className="lead">Amount Due 2/22/2019</p>
                                            <div className="table-responsive">
                                            <table className="table">
                                                <tbody><tr>
                                                    <th style={{width: '50%'}}>Tax:</th>
                                                    <td>Rs.{this.state.currentQuotation.tax}</td>
                                                </tr>
                                                <tr>
                                                    <th>Shipping:</th>
                                                    <td>Rs.{this.state.currentQuotation.shippingCost}</td>
                                                </tr>
                                                <tr>
                                                    <th>Total:</th>
                                                    <td>Rs.{this.state.currentQuotation.totalAmount}</td>
                                                </tr>
                                                </tbody></table>
                                            </div>
                                        </div>
                                        {/* /.col */}
                                        </div>
                                        {/* /.row */}
                                        {/* this row will not appear when printing */}
                                        <div className="row no-print">
                                        <div className="col-xs-12">
                                            Volunteer name : {this.props.location.school.user.firstName}<br/>  Contact number : {this.props.location.school.user.phoneNumber}<br/>
                                            Email : {this.props.location.school.user.emailAddress}
                                            <button type="button" className="btn btn-success pull-right" onClick={()=>this.generatePdf()}><i className="fa fa-credit-card" /> Submit Work order
                                            </button>
                                            <button type="button" className="btn btn-primary pull-right" style={{marginRight: 5}}>
                                            <i className="fa fa-download" /> Cancel
                                            </button>
                                        </div>
                                        </div>
                                        </div>
                                </div>
                            </div>    
                        </div>
               :null}
            </section>
            {/* /.content */}
            </div>

        )
    }
}
export default withRouter(AdminInitiateWorkOrder);