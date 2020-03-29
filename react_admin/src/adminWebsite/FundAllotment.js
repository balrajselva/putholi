import React, { Component } from 'react'
import { withRouter,Link } from 'react-router-dom'
import axios from 'axios'

class FundAllotment extends Component {

state={
  quoList:null,
  spinner:true,
  requirements:null,
  getRequirementList:true,
  selectedExpenseCategory:null
}

componentDidMount(){
  console.log("School",this.props.location.school)
  axios.get("http://localhost:6060/puthuyir/"+this.props.location.school.schoolId+"/requirements")
  .then(res=>{
    let resp=res.data;
    console.log("Requirements",resp);
    this.setState({
        requirements:resp
  })
  axios.post("http://localhost:6060/puthuyir/getQuotations/"+this.props.location.school.schoolId)
  .then(res=>{
      console.log("Quotations",res.data);
      this.setState({
          quoList:res.data,
          getRequirementList:false,
          spinner:false
      })
  })
  })
  .catch(error=>{
      window.alert("Unable to get details due to "+error)
  })
}

handleChange=({target})=>{
  document.getElementById(target.id).style.borderColor="#d2d6de";
  this.setState({
      [target.id]:target.value,
      errorMessage:null
  })
}


onSubmit=(e)=>{
  e.preventDefault();
  if(this.state.selectedExpenseCategory === null){
    this.setState({errorMessage:"Please select expense category"})
    document.getElementById('selectedExpenseCategory').style.borderColor="red";
    return
  }
  this.setState({
    spinner:true
  })
  let fundmaster=[];
  for(let i=0;i<this.state.requirements.length;i++){
    let temp={
      expenseCategory:this.state.selectedExpenseCategory,
      projectId:this.props.location.school.projects[0].projectId,
      schoolId:this.props.location.school.schoolId,
      requirementId:this.state.requirements[i].requirementId,
      allottedAmount:this.state.requirements[i].collectedAmount,
      fundStatus:"FUND_ALLOTTED"
    }
    fundmaster.push(temp)
  }
  console.log(fundmaster)
  axios.post("http://localhost:6060/puthuyir/fundAllotment",fundmaster)
  .then(res=>{
    console.log(res);
    axios.put("http://localhost:6060/puthuyir/updateSchool/"+this.props.location.school.schoolId+"/FUND_ALLOTED")
    .then(res=>{
      this.setState({
        spinner:false
      })
      window.alert("Status updated successfully!");
      this.props.history.push({
              pathname:"/adminPendingWorkflow",
              currentUser:this.props.location.currentUser,
              ...this.props
      })
    })
    .catch(error=>{
        this.setState({
            spinner:false
        })
        window.alert("File upload failed due to "+error)
    })
  })
}

createTable=()=>{
  var rows=[];
  let rowsUpdated=false;
  for(let i=0;i<this.state.requirements.length;i++){
    var reqId=this.state.requirements[i].requirementId;
    var quotation=null;
    for(let j=0;j<this.state.quoList[reqId].length;j++){
      var tempQuo=this.state.quoList[reqId][j];
      if(tempQuo.quotationStatus==="QUOTATION_ACCEPTED"){
        quotation = tempQuo;
        break;
      }
    }
      rowsUpdated=true;
      rows.push(<tr>
          <td>{this.state.requirements[i].assetName}</td>
          <td>{this.state.requirements[i].quantity}</td>                                        
          <td>{quotation.totalAmount}</td>
          <td>{this.state.requirements[i].collectedAmount}</td>
      </tr>)			
  }
  if(rowsUpdated==false)
      rows.push(<tr ><td align="center" colSpan="5">No new records found!</td></tr>)
  return rows;
}

render() {
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
              <h3 className="box-title">New Requirement details for {this.props.location.school.schoolInfo.schoolName}</h3>
                  <div className="box-tools">
                    <div className="input-group input-group-sm" style={{width: 150}}>
                    
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" />
                    <table className="table table-hover small-text" id="tb" border={1}>
                      <tbody><tr className="tr-header">
                          <th>Requirement </th>
                          <th>Unit</th>
                          <th>Fund Required</th>
                          <th>Fund Collected</th>
                        </tr>
                        {this.state.getRequirementList?null:this.createTable()}
                      </tbody></table>
                      <select className="form-control" id="selectedExpenseCategory" onChange={this.handleChange}>
                          <option selected disabled>Select Expense Category</option>
                          <option key="School_Expenses" value="School_Expenses">School Expense</option>
                          <option key="Trust_Expenses" value="Trust_Expenses">Trust Expense</option>
                          <option key="Claims" value="Claims">Claims</option>
                      </select>
                      {this.state.errorMessage!=null?<div className="errorMessage" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}
                      {this.state.spinner?<div class="spinner"></div>:null}
                  </div>
                </div>
                <div className="timeline-footer">
                 <button type="button" className="btn btn-primary" onClick={(e)=>this.onSubmit(e)}>Confirm</button>
                  <Link to={schoolList}>
                    <button type="button" className="btn btn-primary">Back</button>
                  </Link>                
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
}
}
export default withRouter(FundAllotment);
