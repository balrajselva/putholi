import React, {Component} from 'react';
import {withRouter,Link} from 'react-router-dom';
import axios from 'axios';
import '../quotation/reviewQuotation.css';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import SmallBoxCard from '../../components/smallBoxCard/SmallBoxCard';

class UploadReceipt extends Component {

state={
  quoList:null,
  spinner:true,
  requirements:null,
  getRequirementList:true,
  invoiceImage:null,
  localReceiptImageUrl:[],
  receiptCount:0,
  receipts:[],
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
  // TODO: get all the below only for active projects

  axios.post(this.props.config+"/getQuotations/"+this.props.location.school.schoolId)
  .then(res=>{
      console.log("Quotations",res.data);
      this.setState({
          quoList:res.data
      })
      axios.get(this.props.config+"/invoice/getPaid/"+this.props.location.school.schoolId)
      .then(res=>{
          console.log("Invoices",res.data)
          // for(let i=0;i<res.length;i++){
          //   if(res.receipts === undefined || res.receipts === null){
          //     res[i].receipts=[]
          //   }
          // };
          res.data.map(data=>{
            if(data.receipts === undefined || data.receipts === null){
              data.receipts=[]
            }
          })
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

handleChange=({target})=>{
    console.log(target)
    let invoiceId=target.id.split("/")[0];
    let requirementId=target.id.split("/")[1];
    document.getElementById(target.id).style.borderColor="#d2d6de";
    if(target.type==="file"){
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
              receipts:[],
              localReceiptImageUrl:[],
              errorMessage:"",
              spinner:false
          })
      }
      reader.onloadend=()=>{                
          this.setState({
              receipts:target.files[0],
              localReceiptImageUrl:reader.result,
              errorMessage:"",
              spinner:false
          })
          this.saveReceipt(invoiceId,requirementId,target.files[0]);
      }
    }
  }
}

saveReceipt=(invoiceId,requirementId,receipt)=>{
  const invoice={
      id:invoiceId,
      requirement:{
        requirementId:requirementId
      }
  }
  this.setState({
      spinner:true
  });
  var regFormModel=new FormData();
  regFormModel.set('payload',JSON.stringify(invoice));
  regFormModel.append('receipts',receipt);
  console.log(regFormModel);
  axios.post(this.props.config+'/invoiceReceipt',regFormModel)
  .then(res=>{ 
      console.log(res);
      let receiptCountTemp = parseInt(this.state.receiptCount) + 1;
      this.setState({
          spinner:false,
          receiptCount:receiptCountTemp
      })
      updateList(receipt,invoiceId);
      window.alert("Succesfully uploaded receipt!!!");
  })
  .catch(error=>{
      window.alert("Failed to save receipt due to "+error);
  })
  let updateList=(receipt,invoiceId)=>{
      let invoice = this.state.invoiceList.filter(invoice => parseInt(invoice.id) === parseInt(invoiceId))
      console.log(invoice)
      let ql=invoice[0];
      ql.receipts=receipt;
      let a=this.state.invoiceList;
      a[invoiceId]=ql;
      console.log(a,ql);
      this.setState({
          invoiceList:a,
      })
  }
}

closeModel=()=>{
    document.getElementById('modal-default').style.display='none';
}

createTable=()=>{
  var rows=[];
  let rowsUpdated=false;
  let invCount = 0;
  let receiptsCount =0;

  if(this.state.invoiceList.length === 0){
    rows.push(<tr ><td align="center" colSpan="5">Paid invoices are not there!</td></tr>);
    return rows;
  }
  for(let i=0;i<this.state.requirements.length;i++){
    var reqId=this.state.requirements[i].requirementId;
    // filter will always return a list
    var invoice=this.state.invoiceList.filter(invoice => parseInt(invoice.requirement.requirementId) === parseInt(reqId));
    console.log(invoice)  
    let count =0;
    invoice.map(inv=>{
      if(inv.receipts.length >0)
        count ++;
    })
    if(count === invoice.length){
      continue
    }
    rowsUpdated=true;
    invCount += invoice.length;
    var receipts=this.state.invoiceList.filter(invoice => invoice.receipts !== [] || invoice.receipts !== null );
    receiptsCount += receipts.length;
    rows.push(<tr>
        <td>{invoice.length>0?invoice.map((invoice,j)=>invoice.receipts.length ===0 ?this.state.requirements[i].assetName:null):null}</td>
        <td>{invoice.length>0?invoice.map((invoice,j)=>invoice.receipts.length ===0 ?<div><button class="btn btn-default" id={invoice.id+"/"+invoice.requirement.requirementId+"/"+j} onClick={(e)=>this.viewInvoice(e)}>{"Invoice " + invoice.id}</button></div>:null):null}</td>
        <td>{invoice.length>0?invoice.map((invoice,j)=>invoice.receipts.length ===0 ?<div>
            <label for={invoice.id+"/"+invoice.requirement.requirementId} className="btn btn-default" style={{cursor:"pointer",border:"1px solid #d2d6de"}}>{"Upload receipt for invoice "+invoice.id}</label>
            <input class="hidden" type="file" id={invoice.id+"/"+invoice.requirement.requirementId} onChange={this.handleChange}/></div>:null):null}</td>
    </tr>)			
  }
  console.log(invCount,receiptsCount)
  if(rowsUpdated === false){
      rows.push(<tr ><td align="center" colSpan="5">No new records found!</td></tr>);
      if(invCount==receiptsCount){
        axios.put(this.props.config+"/updateSchool/"+this.props.location.school.schoolId+"/RECEIPTS_UPLOADED")
      .then(res=>{
        this.setState({
          spinner:false
        })
        this.props.history.push({ 
          pathname:"/volunteerSchoolCheck", 
          currentUser:this.props.location.currentUser,
          school:this.props.location.school
        });
      })
      .catch(error=>{
          this.setState({
              spinner:false
          })
          window.alert("File update school due to "+error)
      })
    }
  }
  return rows;
}

render() {
  const schoolList={
    pathname:"/volunteerSchoolCheck",
    currentUser:this.props.location.currentUser,
    ...this.props
  }
    console.log("Props",this.props);
    return (
      <div className="content-wrapper">
        <section className="content-header">
            <div className="row">
            <SmallBoxCard content={this.props.location.currentUser.role} linkTo="/volunteerSchoolCheck" colour="bg-green"/>
            {/* ./col */}
            <SmallBoxCard content="Logout" linkTo="/login" colour="bg-red"/>{/* ./col */}
            </div>
            {/* <h1>
            Volunteer
            <small>screen</small>
            </h1> */}
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
                          <th>Upload Receipt</th>
                        </tr>
                        {this.state.getRequirementList?null:this.createTable()}
                      </tbody></table>
                      {this.state.errorMessage!=null?<div className="errorMessage" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}
                      {this.state.spinner?<div class="spinner"></div>:null}
                  </div>
                </div>
                <div className="timeline-footer">
                 {/* <button type="button" className="btn btn-primary" id="Accept" onClick={(e)=>this.onSubmit(e)}>Submit</button> */}
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
export default withRouter(UploadReceipt);
