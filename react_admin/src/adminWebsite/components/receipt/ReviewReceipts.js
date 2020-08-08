import React, {Component} from 'react';
import {withRouter,Link} from 'react-router-dom';
import axios from 'axios';
import '../quotation/reviewQuotation.css';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import SmallBoxCard from '../../components/smallBoxCard/SmallBoxCard';

class ReviewReceipts extends Component {

state={
  quoList:null,
  spinner:true,
  requirements:null,
  getRequirementList:true,
  invoiceImage:null,
  receiptCount:0,
  adminComments:null,
  invoiceList:null
}

componentDidMount(){
  console.log("School",this.props.location.school)
  axios.get(this.props.config+"/"+this.props.location.school.schoolId+"/requirements")
  .then(res=>{
    let resp=res.data;
    console.log("Requirements",resp);
    this.setState({
        requirements:resp
  })
  axios.post(this.props.config+"/getQuotations/"+this.props.location.school.schoolId)
  .then(res=>{
      console.log("Quotations",res.data);
      this.setState({
          quoList:res.data
      })
      axios.get(this.props.config+"/invoice/"+this.props.location.school.schoolId)
      .then(res=>{
          console.log("Invoices",res.data)
          this.setState({
            invoiceList:res.data,
            getRequirementList:false,
            spinner:false
          })
        })
      })
  })
  .catch(error=>{
      window.alert("Unable to get details due to "+error)
  })
}

closeModel=()=>{
    document.getElementById('modal-default').style.display='none';
}

selectInvoiceImage=(e)=>{
    this.setState({spinner:true});
    let invoiceId=e.target.id;
    console.log(invoiceId);
    console.log(this.state.invoiceList)

    let invoice = this.state.invoiceList.filter(invoice => parseInt(invoice.id) === parseInt(invoiceId))
    console.log(invoice)

    this.setState({
        invoiceImage:invoice[0].invoiceImages[0].image,
        spinner:false
    })
    document.getElementById('modal-default').style.display='block';
}

handleChange=({target})=>{
  document.getElementById(target.id).style.borderColor="#d2d6de";
  this.setState({
      errorMessage:null
  })
  this.setState({ 
      [target.id]: target.value , 
      lastErrorField:null,
      errorMessage:""
  });
}    

onSubmit=(e)=>{
  e.preventDefault();
  let newStatus = null;
  if(e.target.id==="Accept"){
    this.setState({
      spinner:true
    })
    axios.put(this.props.config+"/updateSchool/"+this.props.location.school.schoolId+"/OPEN_FOR_REQUIREMENTS")
    .then(res=>{
      axios.post(this.props.config+"/project/updateStatus/"+this.props.location.school.projects[0].projectId+"/PROJECT_COMPLETED")
      .then(res=>{
        this.setState({
          spinner:false
        })
        window.alert("Status updated successfully!")
        this.props.history.push({ 
          pathname:"/adminPendingWorkflow", 
          currentUser:this.props.location.currentUser
        });
      })
    })
    .catch(error=>{
        this.setState({
            spinner:false
        })
        window.alert("Filed to update school status due to "+error)
    })
  }
  else if(e.target.id==="Reject"){
    newStatus="ADMIN_REJECTED_RECEIPTS"
    if(this.state.adminComments === null){
      this.setState({
        errorMessage:"Please provide reson for rejection",
        lastErrorField:"adminComments"
      })
      return
    }
    this.setState({
      spinner:true
    })
    axios.put(this.props.config+"/updateSchool/"+this.props.location.school.schoolId+"/"+newStatus)
    .then(res=>{
      let payload={
        adminComments:this.state.adminComments,
        projectId:this.props.location.school.projects[0].projectId
      }
      axios.post(this.props.config+"/project/updateReceiptComments",payload)
      .then(res=>{
        this.setState({
          spinner:false
        })
        window.alert("Status updated successfully!")
        this.props.history.push({ 
          pathname:"/adminPendingWorkflow", 
          currentUser:this.props.location.currentUser
        });
      })
    })
    .catch(error=>{
        this.setState({
            spinner:false
        })
        window.alert("Filed to update school status due to "+error)
    })
  }
}

viewInvoice=(e)=>{
    console.log(e.target.id)
    let invoiceId=e.target.id.split("/")[0];
    let requirementId=e.target.id.split("/")[1];
    var invoice=this.state.invoiceList.filter(invoice => parseInt(invoice.requirement.requirementId) === parseInt(requirementId));
    console.log(invoice) 
    this.setState({
        invoiceImage:invoice[0].invoiceImages[0]
    })
    document.getElementById('modal-default').style.display='block';
}

viewReceipt=(e)=>{
    console.log(e.target.id)
    let invoiceId=e.target.id.split("/")[0];
    let requirementId=e.target.id.split("/")[1];
    var invoice=this.state.invoiceList.filter(invoice => parseInt(invoice.requirement.requirementId) === parseInt(requirementId));
    console.log(invoice) 
    this.setState({
        invoiceImage:invoice[0].receipts[0]
    })
    document.getElementById('modal-default').style.display='block';
}

closeModel=()=>{
    document.getElementById('modal-default').style.display='none';
}

createTable=()=>{
  var rows=[];
  let rowsUpdated=false;
  for(let i=0;i<this.state.requirements.length;i++){
    var reqId=this.state.requirements[i].requirementId;
    // filter will always return a list
    var invoice=this.state.invoiceList.filter(invoice => parseInt(invoice.requirement.requirementId) === parseInt(reqId));
    console.log(invoice)
    rowsUpdated=true;
    rows.push(<tr>
        <td>{this.state.requirements[i].assetName}</td>
        <td>{invoice.length>0?invoice.map((invoice,j)=>invoice.receipts.length !==0 ?<div><button class="btn btn-default" id={invoice.id+"/"+invoice.requirement.requirementId+"/"+j} onClick={(e)=>this.viewInvoice(e)}>{"Invoice " + invoice.id}</button></div>:null):null}</td>
        <td>{invoice.length>0?invoice.map((invoice,j)=>invoice.receipts.length !==0 ?<div><button class="btn btn-default" id={invoice.id+"/"+invoice.requirement.requirementId+"/"+j} onClick={(e)=>this.viewReceipt(e)}>{"Receipt for " + invoice.id}</button></div>:null):null}</td>
        </tr>)			
}
  if(rowsUpdated==false){
      rows.push(<tr ><td align="center" colSpan="5">No new records found!</td></tr>);
  }
  return rows;
}

render() {
  const schoolList={
    pathname:"/reviewReceipts",
    currentUser:this.props.location.currentUser,
    ...this.props
  }
    console.log("Props",this.props);
    return (
      <div className="content-wrapper">
        <section className="content-header">
            <div className="row">
            <SmallBoxCard content={this.props.location.currentUser.role} linkTo="/reviewReceipts" colour="bg-green"/>
            {/* ./col */}
            <SmallBoxCard content="Logout" linkTo="/login" colour="bg-red"/>{/* ./col */}
            </div>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
              <h3 className="box-title">Invoice details for {this.props.location.school.schoolInfo.schoolName}</h3>
                  <div className="box-tools">
                    <div className="input-group input-group-sm" style={{width: 150}}>
                    
                    </div>
                  </div>
                </div>
                <div className="box-body table-responsive no-padding">
                    <table className="table table-hover">
                    <tbody><tr>
                          <th>Requirement </th>
                          <th>View Invoices</th>
                          <th>View Receipt</th>
                        </tr>
                        {this.state.getRequirementList?null:this.createTable()}
                      </tbody></table>
                      {this.state.errorMessage!=null?<div className="errorMessage" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}
                      {this.state.spinner?<div class="spinner"></div>:null}
                  </div>
                </div>
                        <div className="box-body table-responsive no-padding">
                            <table className="table table-hover">
                            <tbody>
                            <tr>
                                    <th>Admin Comments </th>
                                </tr>
                                <tr>
                                    <td><textarea className="input-xlarge" ref ="comment" id="adminComments" value={this.state.adminComments} rows="3" onChange={this.handleChange} placeholder="Compulsory for rejection.."></textarea></td>
                                </tr>
                            </tbody></table>
                        </div>
                <div className="timeline-footer">
                 <button type="button" className="btn btn-primary" id="Accept" onClick={(e)=>this.onSubmit(e)}>Accept</button>&nbsp;
                 <button type="button" className="btn btn-primary" id="Reject" onClick={(e)=>this.onSubmit(e)}>Reject</button>&nbsp;
                  <Link to={schoolList}>
                    <button type="button" className="btn btn-primary">Back</button>
                  </Link>                
                </div>
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
                                {this.state.invoiceImage!==null?
                                <section className="content">
                                <img src={'data:image/png;base64,'+this.state.invoiceImage.image} id ="image1" alt="" ></img>
                                </section>:null}
                            </div>
                        </div>
                      </div>    
                    </div>
            </div>
      </div>
    )
}
}
export default withRouter(ReviewReceipts);
