import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import imageCss from '../adminWebsite/css/imageCss.css';

class adminInvoiceCheck extends Component {
    state={
        spinner:false,
        status:null,
        comment:null,
        approverComments:null,
        adminComments:null,
        reviewerComments:null,
        errorMessage:null,
        isProjectCompleted:false
    }

    handleChange=({target})=>{
        this.setState({ 
            [target.id]: target.value , 
            lastErrorField:null,
            errorMessage:""
        });
    }

    updateStatus=({target})=>{
      if((this.props.location.currentUser.role==="Admin" && (this.state.adminComments === null || this.state.adminComments === "")) 
      || (this.props.location.currentUser.role==="Reviewer" && (this.state.reviewerComments === null || this.state.reviewerComments === ""))
      || (this.props.location.currentUser.role==="Approver" && (this.state.approverComments === null || this.state.approverComments === ""))){
        this.setState({
            errorMessage:"Please provide proper comment"
        })
        return
      }
        this.setState({
          spinner:true, 
          status:target.id
        });
        let invoiceStatus=null;
        let adminComments=null;
        let approverComments=null;
        let reviewerComments=null;
        let fund=this.props.location.fund;
        let projectCompletion=false;
        if(target.id==="Accept"){
          if(this.props.location.currentUser.role==="Admin"){
            invoiceStatus="AdminReviewedInvoice";
            adminComments=this.state.adminComments;
          }
          else if(this.props.location.currentUser.role==="Reviewer"){
            invoiceStatus="ReviewerConfirmedInvoice";
            reviewerComments=this.state.reviewerComments;
          }
          else if(this.props.location.currentUser.role==="Approver"){
            invoiceStatus="ApprovedInvoice";
            approverComments=this.state.approverComments;
            console.log(this.props.location.invoice.totalAmount,parseInt(this.props.location.invoice.totalAmount));
            fund.totalAmountPaid = ((fund.totalAmountPaid !== null) ? parseInt(fund.totalAmountPaid)+parseInt(this.props.location.invoice.totalAmount):parseInt(this.props.location.invoice.totalAmount));
            for(let i=0;i<this.props.location.school.projects.length;i++){
              let count = 0;
              for(let j=0;j<this.props.location.school.projects[i].requirements.length;j++){
                if(this.props.location.school.projects[i].requirements[j].status==="Fully_Completed"){
                  count++;
                }
              }
              if(this.props.location.school.projects[i].requirements.length > 1 && parseInt(count) === this.props.location.school.projects[i].requirements.length-1){
                this.setState({isProjectCompleted:true})
                projectCompletion=true
              }
              if(this.props.location.school.projects[i].requirements.length == 1 && parseInt(count) === this.props.location.school.projects[i].requirements.length){
                this.setState({isProjectCompleted:true})
                projectCompletion=true
              }
            }
          }
          axios.post(this.props.config+"/invoice/status/"+this.props.location.invoice.id+"/"+this.props.location.currentUser.userid+"/"+invoiceStatus)
          .then(res=>{
            console.log(res)
            let params ={
              fundMasterList:fund,
              invoice:this.props.location.invoice,
              invoiceId:this.props.location.invoice.invoiceId,
              adminComments:this.state.adminComments,
              approverComments:this.state.approverComments,
              reviewerComments:this.state.reviewerComments
            }
            console.log(params)
            axios.post(this.props.config+"/invoice/updateFund",params)
            .then(res=>{
              if(invoiceStatus === "ApprovedInvoice"){
                axios.put(this.props.config+"/updateRequirement/"+this.props.location.invoice.requirement.requirementId+"/"+this.props.location.invoice.workStatus)
                .then(res=>{
                  axios.put(this.props.config+"/updateRequirement/invoiceStatus/"+ this.props.location.invoice.requirement.requirementId+"/INVOICE_APPROVED")
                  .then(res=>{
                    if(projectCompletion === true){
                      axios.put(this.props.config+"/updateSchool/"+this.props.location.school.schoolId+"/ALL_INVOICES_PROCESSED")
                      .then(res=>{
                        this.setState({spinner:false});
                        window.alert("Status updated successfully");
                        if(this.props.location.currentUser.role==="Admin"){
                          this.props.history.push({ 
                            pathname:"/reviewInvoice", 
                            currentUser:this.props.location.currentUser,
                            school:this.props.location.school
                          });
                        }
                        else if(this.props.location.currentUser.role==="Reviewer"){
                          this.props.history.push({ 
                            pathname:"/reviewerInvoiceReview", 
                            currentUser:this.props.location.currentUser,
                            school:this.props.location.school
                          });
                        }
                        else if(this.props.location.currentUser.role==="Approver"){
                          this.props.history.push({ 
                            pathname:"/approverInvoiceReview", 
                            currentUser:this.props.location.currentUser,
                            school:this.props.location.school
                          });
                        }
                      })
                      .catch(error=>{
                        window.alert("Failed to udpate school status due to "+error);
                      })
                    }
                    else{
                      this.setState({spinner:false});
                      window.alert("Status updated successfully");
                      if(this.props.location.currentUser.role==="Admin"){
                        this.props.history.push({ 
                          pathname:"/reviewInvoice", 
                          currentUser:this.props.location.currentUser,
                          school:this.props.location.school
                        });
                      }
                      else if(this.props.location.currentUser.role==="Reviewer"){
                        this.props.history.push({ 
                          pathname:"/reviewerInvoiceReview", 
                          currentUser:this.props.location.currentUser,
                          school:this.props.location.school
                        });
                      }
                      else if(this.props.location.currentUser.role==="Approver"){
                        this.props.history.push({ 
                          pathname:"/approverInvoiceReview", 
                          currentUser:this.props.location.currentUser,
                          school:this.props.location.school
                        });
                      }
                    }
                  })
                })
                  .catch(error=>{
                    this.setState({spinner:false});
                    window.alert("Requirement updation failed due to "+error);
                  })
                }
                else{
                  this.setState({spinner:false});
                    window.alert("Status updated successfully");
                    if(this.props.location.currentUser.role==="Admin"){
                      this.props.history.push({ 
                        pathname:"/reviewInvoice", 
                        currentUser:this.props.location.currentUser,
                        school:this.props.location.school
                      });
                    }
                    else if(this.props.location.currentUser.role==="Reviewer"){
                      this.props.history.push({ 
                        pathname:"/reviewerInvoiceReview", 
                        currentUser:this.props.location.currentUser,
                        school:this.props.location.school
                      });
                    }
                    else if(this.props.location.currentUser.role==="Approver"){
                      this.props.history.push({ 
                        pathname:"/approverInvoiceReview", 
                        currentUser:this.props.location.currentUser,
                        school:this.props.location.school
                      });
                    }
                }
            })
          })
          .catch(error=>{
              this.setState({spinner:false});
              window.alert("Status updated failed due to "+error);
          })
        }
        else if(target.id==="Reject"){
          if(this.props.location.currentUser.role==="Admin"){
            invoiceStatus="AdminRejectedInvoice";
            adminComments=this.state.adminComments;
          }
          else if(this.props.location.currentUser.role==="Reviewer"){
            invoiceStatus="ReviewerRejectedInvoice";
            reviewerComments=this.state.reviewerComments;
          }
          else if(this.props.location.currentUser.role==="Approver"){
            invoiceStatus="ApproverRejectedInvoice";
            approverComments=this.state.approverComments;
          }
          axios.post(this.props.config+"/invoice/status/"+this.props.location.invoice.id+"/"+this.props.location.currentUser.userid+"/"+invoiceStatus)
          .then(res=>{
            axios.put(this.props.config+"/updateRequirement/invoiceStatus/"+ this.props.location.invoice.requirement.requirementId+"/INVOICE_REJECTED")
              .then(res=>{
                let params ={
                  invoiceId:this.props.location.invoice.id,
                  adminComments:this.state.adminComments,
                  approverComments:this.state.approverComments,
                  reviewerComments:this.state.reviewerComments
                }
                  console.log(params)
                  axios.post(this.props.config+"/invoice/updateStatus",params)
                  .then(res=>{
                  this.setState({spinner:false});
                  window.alert("Invoice rejection is successfull");
                  if(this.props.location.currentUser.role==="Admin"){
                    this.props.history.push({ 
                      pathname:"/reviewInvoice", 
                      currentUser:this.props.location.currentUser,
                      school:this.props.location.school
                    });
                  }
                  else if(this.props.location.currentUser.role==="Reviewer"){
                    this.props.history.push({ 
                      pathname:"/reviewerInvoiceReview", 
                      currentUser:this.props.location.currentUser,
                      school:this.props.location.school
                    });
                  }
                  else if(this.props.location.currentUser.role==="Approver"){
                    this.props.history.push({ 
                      pathname:"/approverInvoiceReview", 
                      currentUser:this.props.location.currentUser,
                      school:this.props.location.school
                    });
                  }
                })
              })
          })
          .catch(error=>{
            this.setState({spinner:false});
            window.alert("Invoice rejection failed due to "+error);
          })
        }
        // let fundDisbursement={
        //     invoiceId:this.props.location.invoice.id,
        //     invoiceAmount:this.props.location.invoice.invoiceAmount,
        //     adminComments:adminComments,
        //     reviewerComments:reviewerComments,
        //     approverComments:approverComments,
        //     initiatedBy:this.props.location.currentUser.userid,
        //     bankName:this.props.location.invoice.bankName,
        //     ifscCode:this.props.location.invoice.ifsc,
        //     accountNumber:this.props.location.invoice.accountNum,
        //     paymentMode:this.props.location.invoice.paymentMode
        // }
        // console.log(fundDisbursement)
        // axios.post(this.props.config+"/fundDisbursement",fundDisbursement)
        // .then(res=>{
          // if(res.data!==""){
             
      }

   componentDidMount(){
        if(this.props.location.currentUser.role==="Admin"){
            document.getElementById("reviewerComments").setAttribute('disabled',true)
            document.getElementById("approverComments").setAttribute('disabled',true)
            if(this.props.location.invoice.reviewerComments!==null){
              this.setState({
                reviewerComments:this.props.location.invoice.reviewerComments
              })
            }
            if(this.props.location.invoice.approverComments!==null){
              this.setState({
                reviewerComments:this.props.location.invoice.approverComments
              })
            }
        }
        else if(this.props.location.currentUser.role==="Reviewer"){
            document.getElementById("adminComments").setAttribute('disabled',true)
            document.getElementById("approverComments").setAttribute('disabled',true)
            this.setState({adminComments:this.props.location.invoice.adminComments})
        }
        else if(this.props.location.currentUser.role==="Approver"){
            document.getElementById("reviewerComments").setAttribute('disabled',true)
            document.getElementById("adminComments").setAttribute('disabled',true)
            this.setState({
              reviewerComments:this.props.location.invoice.reviewerComments,
              adminComments:this.props.location.invoice.adminComments
            })
        }
   }
    
    render() {
        console.log(this.props);
      let returnLink=null;
      if(this.props.location.currentUser.role==="Admin"){
        returnLink = "reviewInvoice"
      }
      else if(this.props.location.currentUser.role==="Approver"){
        returnLink = "approverAccessReview"
      }
      else if(this.props.location.currentUser.role==="Reviewer"){
        returnLink = "reviewerAccessReview"
      }
      let disable = parseInt(this.props.location.invoice.totalAmount)+parseInt(this.props.location.fund.totalAmountPaid!==null?this.props.location.fund.totalAmountPaid:0)<=parseInt(this.props.location.fund.allottedAmount);
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                    {this.props.location.school.schoolInfo.schoolName}
                    <small>added on</small>
                    </h1>
                    <ol className="breadcrumb">
                    <li><a href="../../index.html"><i className="fa fa-dashboard" /> Home</a></li>
                    </ol>
                </section>
                <section className="content">
                    <div className="row">
                    <div className="col-md-12">
                        <ul className="timeline">
                        <li className="time-label">
                            <span className="bg-red">
                            {this.props.location.school.createdDate.split("T")[0]}
                            </span>
                        </li>
                        <li>
                            <i className="fa fa-envelope bg-blue" />
                            <div className="timeline-item">
                            <span className="time"><i className="fa fa-clock-o" /> 12:05</span>
                            <h3 className="timeline-header"><a href="#">Requirements</a> listed below</h3>
                            <div className="timeline-body">
                                <div className="box-body">
                                <ul>
                                    <li>Requirement  : {this.props.location.requirement.assetName}</li>
                                    <li>Unit : {this.props.location.requirement.quantity}</li>
                                    {/* <li>Quotation Amount : {this.props.location.quotation.totalAmount}</li> */}
                                    <li>Alloted Amount : {this.props.location.fund.allottedAmount}</li>
                                    <li>Invoice Amount : {this.props.location.invoice.totalAmount}</li>
                                    <li>Work Status : {this.props.location.invoice.workStatus}</li>
                                    <li>Amount paid, if any : {this.props.location.fund.totalAmountPaid}</li>
                                    <li>Payment Status : {this.props.location.fund.fundStatus}</li>
                                    {
                                    this.props.location.currentUser.role==="Admin"?        
                                    <li>Exceeding allotted amount : {disable?<h4>No</h4>:<h4><b>Yes</b></h4>}
                                    {disable?null:document.getElementById("Accept").setAttribute("disabled",true)}</li>
                                    :null
                                    }
                                </ul>
                                <h4>Address of the School</h4>
                                <ul>
                                    <li>
                                        {this.props.location.school.address.addressLine1},
                                        {this.props.location.school.address.addressLine2},
                                        {this.props.location.school.address.locality},
                                        {this.props.location.school.address.city},
                                        {this.props.location.school.address.district},
                                        {this.props.location.school.address.state}.
                                    </li>
                                </ul>
                                <div className="row">
                                    <div className="col-xs-12">
                                    <div className="box">
                                        <div className="box-header">
                                            <h4 className="box-title">Comments</h4>
                                        </div>
                                        <div className="box-body table-responsive no-padding">
                                            <table className="table table-hover">
                                            <tbody>
                                                <tr>
                                                    <th>Admin Comments </th>
                                                    <th>Reviewer Comments </th>
                                                    <th>Approver Comments </th>
                                                </tr>
                                                <tr>
                                                    <td><textarea className="input-xlarge" ref ="comment" id="adminComments" value={this.state.adminComments} onChange={this.handleChange} rows="3"></textarea></td>
                                                    <td><textarea className="input-xlarge" ref ="comment" id="reviewerComments" value={this.state.reviewerComments} onChange={this.handleChange} rows="3"></textarea></td>
                                                    <td><textarea className="input-xlarge" ref ="comment" id="approverComments" value={this.state.approverComments} onChange={this.handleChange} rows="3"></textarea></td>
                                                </tr>
                                            </tbody></table>
                                            {this.state.errorMessage!=null?<div className="errorMessage" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}
                                        </div>
                                        </div>
                                    </div>
                                 </div>
                                </div>
                            </div>
                            <div className="timeline-footer">
                                <a className="btn btn-primary btn-xs" data-toggle="modal" data-target="#modal-default">Show Invoice</a>&nbsp;
                                <div id="Accept" className="btn btn-primary btn-xs" onClick={(target)=>this.updateStatus(target)}>Confirm</div>&nbsp;
                                <div id="Reject" className="btn btn-danger btn-xs" onClick={(target)=>this.updateStatus(target)}>Reject</div>&nbsp;
                                <Link to={{pathname:returnLink, currentUser:this.props.location.currentUser, school:this.props.location.school}} className="btn btn-primary btn-xs">Back to List</Link>
                            </div>
                            </div>
                        </li>
                        </ul>
                    </div>
                    </div>
          
                    <div className="modal fade" id="modal-default">
                      <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span></button>
                            </div>
                            <div className="modal-body">
                            <div className="row">
                                <section className="content">
                                <img src={'data:image/png;base64,'+this.props.location.invoice.invoiceImages[0].image} id ="image1" alt="" ></img>
                                </section>
                            </div>
                        </div>
                      </div>    
                    </div>
                  </div>
                </section>
                {/* /.content */}
                {this.state.spinner?<div class="spinner"></div>:null}
                </div>

        )
    }
}

export default withRouter(adminInvoiceCheck);