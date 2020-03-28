import React, { Component } from 'react'
import { withRouter } from 'react-router'
import axios from 'axios'

class FundAllotment extends Component {
  state={
    quoList:null,
    spinner:false,
    requirements:null,
    getRequirementList:true
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
    })
    .catch(error=>{
        window.alert("Unable to get quotations due to "+error)
    })
  })

}
createTable=()=>{
  var rows=[];
  let rowsUpdated=false;
  console.log(this.state.requirements)
  console.log(this.state.quoList)
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
          <td>More details</td>
      </tr>)			
  }
  if(rowsUpdated==false)
      rows.push(<tr ><td align="center" colSpan="5">No new records found!</td></tr>)
  return rows;
}
    render() {
        console.log(this.props);
        return (
          <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content-header">
    <h1>
      Trustee / Approver
      <small />
    </h1>
    <ol className="breadcrumb">
      <li><a href="trustee_Main_Screen.html"><i className="fa fa-dashboard" /> Home</a></li>
    </ol>
  </section>
  {/* Main content */}
  <section className="content">
    {/* Small boxes (Stat box) */}
    <div className="row">
      <div className="col-lg-3 col-xs-6">
        {/* small box */}
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
    {/* Small boxes (Stat box) */}
    {/* /.row */}
    {/* Main row */}
    <div className="row">
      <div className="col-xs-12">
        <div className="box">
          <div className="box-header">
        <h3 className="box-title">New Requirement details for {this.props.location.school.schoolInfo.schoolName}</h3>
            <div className="box-tools">
              <div className="input-group input-group-sm" style={{width: 150}}>
                {/* <input type="text" name="table_search" class="form-control pull-right" placeholder="Search">

                  <div class="input-group-btn">
                    <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                  </div>*/}
              </div>
            </div>
          </div>
          {/* /.box-header */}
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
              {/* /.box */}
            </div>
          </div>
          {/* /.box-body */}
          <div className="timeline-footer">
            <a href="Confirm_new_requirement_fund_allotment.html" className="btn btn-primary btn-xs">Confirm</a>
            <a href="fund_allotment.html" className="btn btn-primary btn-xs">Back</a>
          </div>
        </div>
        {/* /.box */}
      </div>
    </div>
    {/* /.row (main row) */}
  </section>
  {/* /.content */}
</div>

        )
    }
}
export default withRouter(FundAllotment);
