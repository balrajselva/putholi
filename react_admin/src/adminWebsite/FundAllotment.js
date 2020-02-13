import React, { Component } from 'react'
import { withRouter } from 'react-router'

class FundAllotment extends Component {
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
            <h3 className="box-title">New Requirement details for Cuddalore High School, Nellikuppam, Cuddalore.</h3>
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
                    <th>More Details</th>
                  </tr><tr>
                    <td>Tables</td>
                    <td>10</td>
                    <td>Rs. 75,000</td>
                    <td>Rs. 75,000</td>
                    <td><a href>Click Here</a></td>
                  </tr>
                  <tr>
                    <td>Chair</td>
                    <td>44</td>
                    <td>Rs. 1,00,000</td>
                    <td>Rs. 1,00,000</td>
                    <td><a href>Click Here</a></td>
                  </tr>
                  <tr>
                    <td>Digital Board</td>
                    <td>1</td>
                    <td>Rs. 1,00,000</td>
                    <td>Rs. 1,00,000</td>
                    <td><a href>Click Here</a></td>
                  </tr>
                </tbody></table>
              {/* /.box */}
            </div>
          </div>
          {/* /.box-body */}
          <div className="timeline-footer">
            <a href="Confirm_new_requirement_fund_allotment.html" className="btn btn-primary btn-xs">Confirm</a>
            <a className="btn btn-danger btn-xs">Reject</a>
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
