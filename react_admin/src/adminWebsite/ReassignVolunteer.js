import React, { Component } from 'react'

class ReassignVolunteer extends Component {
    render() {
        return (
           <section className="content">
  <div className="row">
    <div className="col-xs-12">
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Reassign Volunteer Screen</h3>
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
            <tbody><tr>
                <th>Select</th>
                <th>School ID</th>
                <th>School Name</th>
                <th>Volunteer </th>
                <th>Status</th>
                <th>District</th>
                <th>Town</th>
                <th>New Volunteer</th>
                <th>Reason</th>
              </tr>
              <tr>
                <td><div className="form-group">
                    <input type="checkbox" className="pull-right" />
                  </div>
                </td>
                <td>183</td>
                <td>Cuddalore Boys School</td>
                <td>Jagan</td>
                <td><span className="label label-warning">Invoice Pending</span></td>
                <td>Cuddalore</td>
                <td>Thirupapaliyur</td>
                <td><select className="form-control">
                    <option>Select</option>
                    <option>Balaji</option>
                    <option>Chandran</option>
                    <option>David</option>
                    <option>Easwar</option>
                  </select></td>
                <td><textarea defaultValue={"Reason for the change"} /></td>
              </tr>
              <tr>
                <td><div className="form-group">
                    <input type="checkbox" className="pull-right" />
                  </div>
                </td>
                <td>185</td>
                <td>Panruti Girls School</td>
                <td>Suresh</td>
                <td><span className="label label-warning">Invoice Pending</span></td>
                <td>Cuddalore</td>
                <td>Panrutit</td>
                <td><div className="form-group">
                    <select className="form-control">
                      <option>Select</option>
                      <option>Balaji</option>
                      <option>Chandran</option>
                      <option>David</option>
                      <option>Easwar</option>
                    </select>
                  </div></td>
                <td><textarea defaultValue={"Reason for the change"} /></td>
              </tr>
              <tr>
                <td><div className="form-group">
                    <input type="checkbox" className="pull-right" />
                  </div>
                </td>
                <td>003</td>
                <td>Chengalpet Boys School</td>
                <td>Ganesh</td>
                <td><span className="label label-success">Quotation Pending</span></td>
                <td>Tirunelveli</td>
                <td>Kaniyakumari</td>
                <td><select className="form-control">
                    <option>Select</option>
                    <option>Balaji</option>
                    <option>Chandran</option>
                    <option>David</option>
                    <option>Easwar</option>
                  </select></td>
                <td><textarea defaultValue={"Reason for the change"} /></td>
              </tr>
            </tbody></table>
        </div>
        {/* /.box-body */}
      </div>
      {/* /.box */}
    </div>
  </div>
  <div className="box-footer">
    <button type="submit" className="btn btn-primary">Submit</button>
    <button type="button" className="btn btn-warning">Cancel</button>
  </div>
</section>

        )
    }
}
export default withRouter(ReassignVolunteer)