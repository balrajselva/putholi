import React, { Component } from 'react'
import { withRouter,Link } from 'react-router-dom'
import axios from 'axios'

class ReviewerInvoiceReview extends Component {

state={
  quoList:null,
  spinner:true,
  requirements:null,
  getRequirementList:true,
  invoiceImage:null,
  fund:null,
  invoiceList:null
}

componentDidMount(){
  axios.get(this.props.config+"/invoice")
  .then(res=>{
      console.log("Invoices",res.data)
      this.setState({
        invoiceList:res.data,
        getRequirementList:false,
        spinner:false
      })
  })
  .catch(error=>{
      window.alert("Unable to get details due to "+error)
  })
}

closeModel=()=>{
    document.getElementById('modal-default').style.display='none';
}

handleChange=({target})=>{
  document.getElementById(target.id).style.borderColor="#d2d6de";
  this.setState({
      [target.id]:target.value,
      errorMessage:null
  })
}

selectInvoiceImage=(e)=>{
  this.setState({spinner:true});
  let invoiceId=e.target.id;
  console.log(invoiceId);
  let invoice = this.state.invoiceList.filter(invoice => parseInt(invoice.id) === parseInt(invoiceId))
  console.log(invoice)
  this.setState({
      invoiceImage:invoice[0].invoiceImages[0].image,
      spinner:false
  })
  document.getElementById('modal-default').style.display='block';
}

// onSubmit=(e)=>{
//   e.preventDefault();
//   let newStatus = "ReviewerApprovedInvoice";
//   if(e.target.id==="Reject"){
//       newStatus="ReviewerRejectedInvoice"
//   }
//   this.setState({
//     spinner:true
//   })
//     axios.put(this.props.config+"/updateSchool/"+this.props.location.school.schoolId+"/"+newStatus)
//     .then(res=>{
//       this.setState({
//         spinner:false
//       })
//       window.alert("Status updated successfully!");
//       this.props.history.push({
//               pathname:"/reviewerInvoiceCheck",
//               currentUser:this.props.location.currentUser,
//               ...this.props
//       })
//     })
//     .catch(error=>{
//         this.setState({
//             spinner:false
//         })
//         window.alert("File upload failed due to "+error)
//     })
// }

createTable=()=>{
  var rows=[];
  let rowsUpdated=false;
  for(let i=0;i<this.state.invoiceList.length;i++){
    // var reqId=this.state.requirements[i].requirementId;
    // var quotation=null;
    // var invoice=this.state.invoiceList.filter(invoice => invoice.requirementId === reqId);
    // var fund=this.state.fund.filter(fund => fund.requirementId === reqId);
    // console.log(invoice[0],fund[0])
    // for(let j=0;j<this.state.quoList[reqId].length;j++){
    //   var tempQuo=this.state.quoList[reqId][j];
    //   if(tempQuo.quotationStatus==="QUOTATION_ACCEPTED"){
    //     quotation = tempQuo;
    //     break;
    //   }
    // }
    let nextPage=null;
    if(this.props.location.currentUser.role==="Reviewer")
      nextPage="/reviewerInvoiceCheck"
    if(this.props.location.currentUser.role==="Approver")
      nextPage="/approverInvoiceCheck"
    if(this.state.invoiceList[i].fundMaster === null ){
      continue
    }
    if(this.props.location.currentUser.role==="Admin" && this.state.invoiceList[i].invoiceStatus !== "InvoiceAdded")
      continue
    if(this.props.location.currentUser.role==="Reviewer" && this.state.invoiceList[i].invoiceStatus !== "AdminReviewedInvoice")
      continue
    if(this.props.location.currentUser.role==="Approver" && this.state.invoiceList[i].invoiceStatus !== "ReviewerConfirmedInvoice")
      continue
  

      const newTo = { 
      pathname: nextPage, 
      school:this.state.invoiceList[i].school,
      currentUser:this.props.location.currentUser,
      invoice:this.state.invoiceList[i],
      fund:this.state.invoiceList[i].fundMaster,
      requirement:this.state.invoiceList[i].requirement,
      ...this.props
     };
      rowsUpdated=true;
      rows.push(<tr>
          <td>{this.state.invoiceList[i].school.schoolId}</td>                                        
          <td>{this.state.invoiceList[i].school.schoolInfo.schoolName}</td>                                        
          <td>{this.state.invoiceList[i].requirement.assetName}</td>
          <td>{this.state.invoiceList[i].requirement.quantity}</td>                                        
          <td>{this.state.invoiceList[i].fundMaster.allottedAmount}</td>
          <td>{this.state.invoiceList[i].totalAmount}</td>
          <td>{this.state.invoiceList[i].workStatus}</td>
          <td>{this.state.invoiceList[i].fundMaster.totalAmountPaid}</td>
          <td>{this.state.invoiceList[i].fundMaster.fundStatus}</td>
          <td><a href=""><Link to={newTo}>More Details</Link></a></td>
      </tr>)			
  }
  if(rowsUpdated==false)
      rows.push(<tr ><td align="center" colSpan="5">No new records found!</td></tr>)
  return rows;
}

render() {
  let returnPath = null;
  if(this.props.location.currentUser.role==="Admin"){
    returnPath = "/reviewInvoice"
  }
  else if(this.props.location.currentUser.role==="Approver"){
    returnPath = "/approverInvoiceReview"
  }
  else if(this.props.location.currentUser.role==="Reviewer"){
    returnPath = "/reviewerInvoiceReview"
  }
  const schoolList={
    pathname:"/adminPendingWorkflow",
    currentUser:this.props.location.currentUser,
    ...this.props
  }
    console.log("Props",this.props);
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            Trustee / Approver
            <small />
          </h1>
          <ol className="breadcrumb">
            <li><a href="trustee_Main_Screen.html"><i className="fa fa-dashboard" /> Home</a></li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-lg-3 col-xs-6">
              <div className="small-box bg-aqua">
                <div className="inner">
                  <h4>Total Balance</h4>
                  <p>Rs. 1,00,000</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag" />
                </div>
                <a href="#" className="small-box-footer"> <i className="fa fa-arrow-circle-right" /></a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-xs-6">
              {/* small box */}
              <div className="small-box bg-green">
                <div className="inner">
                  <h4>Donor Collected Fund<sup style={{fontSize: 20}} /></h4>
                  <p>Rs. 50,000</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
                <a href="#" className="small-box-footer"> <i className="fa fa-arrow-circle-right" /></a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-xs-6">
              {/* small box */}
              <div className="small-box bg-yellow">
                <div className="inner">
                  <h4>Interest Fund</h4>
                  <p>Rs.5000</p>
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
                  <h4>Trustee Fund</h4>
                  <p>Rs. 20,000</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph" />
                </div>
                <a href="#" className="small-box-footer"> <i className="fa fa-arrow-circle-right" /></a>
              </div>
            </div>
            {/* ./col */}
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
              <h3 className="box-title">New Requirement details for </h3>
                  <div className="box-tools">
                    <div className="input-group input-group-sm" style={{width: 150}}>
                    
                    </div>
                  </div>
                </div>
                <div className="box-body table-responsive no-padding">
                    <table className="table table-hover">
                      <tbody><tr>
                          <th>School Id</th>
                          <th>School Name</th>
                          <th>Requirement </th>
                          <th>Unit</th>
                          <th>Allotted Amount</th>
                          <th>Invoice Amount</th>
                          <th>Work Status</th>
                          <th>Amount paid, if any</th>
                          <th>Payment Status</th>
                          <th>View Invoice</th>
                        </tr>
                        {this.state.getRequirementList?null:this.createTable()}
                      </tbody></table>
                      <h3>Total amount to be disbursed</h3>
                      {this.state.errorMessage!=null?<div className="errorMessage" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}
                      {this.state.spinner?<div class="spinner"></div>:null}
                  </div>
                </div>
                {/* <div className="timeline-footer">
                 <button type="button" className="btn btn-primary" id="Accept" onClick={(e)=>this.onSubmit(e)}>Confirm</button>
                 <button type="button" className="btn btn-primary" id="Reject" onClick={(e)=>this.onSubmit(e)}>Reject</button>
                  <Link to={schoolList}>
                    <button type="button" className="btn btn-primary">Back</button>
                  </Link>                
                </div> */}
            </div>
          </div>
        </section>
        <div className="modal" id="modal-default">
                      <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModel}>
                                <span aria-hidden="true">×</span></button>
                            </div>
                            <div className="modal-body">
                            <div className="row">
                                <section className="content">
                                <img src={'data:image/png;base64,'+this.state.invoiceImage} id ="image1" alt="" ></img>
                                </section>
                            </div>
                        </div>
                      </div>    
                    </div>
                    </div>
      </div>
    )
}
}
export default withRouter(ReviewerInvoiceReview);
