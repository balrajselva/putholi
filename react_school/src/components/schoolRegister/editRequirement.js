import React, { Component } from 'react'
import { withRouter } from 'react-router'

class editRequirement extends Component {
  render() {
    console.log(this.props);
    return (
        <div class="page_container">
  <div class="breadcrumb">
      <div class="wrap">
            <div class="container">
                <h3>Welcome User Name, Edit Requirements</h3>
            </div>
        </div>
    </div>



    <div class="wrap">
        <div class="container inner_content">
            <div class="row">

<div class="span10">
  <table>
    
<h3>Cuddalore Boys School, Cuddalore</h3>
<div class="control-group success" id="multibn">

Admin Comments: <textarea class="input-large" id="textarea"  disabled ></textarea>
</div>
</table>


  <div class="control-group">


                  <table class="table table-bordered table-striped">
                                                                <thead>
                                                                    <tr>
                                                                    <th>Req.No</th>
                                                                      <th>Action</th>
                                                                      <th>Project Type</th>
                                                                      <th>Asset Type</th>
                                                                      <th>Asset Name</th>
																	  <th>Priority</th>
                                                                      <th>Quantity</th>

                                                                    </tr>
                                                                  </thead>
                                                                  <tbody>
                                                                    <tr>
                                                                      <td>1</td>
                                                                     <td><button type="button" class="dark_btn">Edit</button>
                                                                     <button type="button" class="dark_btn">DELETE</button>
                                                                     </td>
                                                                      <td>New</td>
                                                                      <td>Sports</td>
                                                                      <td>Football</td>
																	       <td>1</td>
          															                              <td>10</td>
                                                                    </tr>

                                                                    <tr>
                                                                    <td>2</td>
                                                                     <td><button type="button" class="dark_btn">Edit</button>
                                                                     <button type="button" class="dark_btn">DELETE</button>
                                                                     </td>
                                                                      <td>New</td>
                                                                      <td>Infrastructure</td>
                                                                      <td>Chairs</td>
																	       <td>2</td>
                                                                      <td>10</td>
                                                                    </tr>

                                                                    <tr>
                                                                    <td>3</td>
                                                                     <td><button type="button" class="dark_btn">Edit</button>
                                                                     <button type="button" class="dark_btn">DELETE</button>
                                                                     </td>
                                                                      <td>New</td>
                                                                      <td>Infrastructure</td>
                                                                      <td>Bathroom</td>
																	       <td>3</td>
                                                                      <td>5</td>
                                                                    </tr>


                                                                  </tbody>
                </table>
                <div class="form-actions">
                  <div>
						   <input type="checkbox" id="inputSuccess"/> Disclaimer
						   
						   </div>
                            <button type="submit" class="btn send_btn">Re-Submit</button>
                            <button class="btn dark_btn">Cancel</button>
                          </div>

                            </div>
</div>
</div>
</div>
</div>
</div>
     )
    }
}

export default withRouter(editRequirement);
