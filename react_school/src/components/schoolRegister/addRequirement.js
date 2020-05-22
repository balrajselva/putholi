import React, { Component } from 'react'
import { withRouter } from 'react-router'

class addRequirements extends Component {
  render() {
    console.log(this.props);
    return (
        <div class="page_container">
  <div class="breadcrumb">
      <div class="wrap">
            <div class="container">
                <h3>Welcome User Name, Add Requirements</h3>
            </div>
        </div>
    </div>



    <div class="wrap">
        <div class="container inner_content">
            <div class="row">

<div class="span10">

<h3>Cuddalore Boys School, Cuddalore</h3>
  <div class="control-group">
         <label class="control-label" for="select01">Requirement Type</label>
         <div class="controls">
           <select id="projType" disabled>
             <option>New</option>
             </select>
         </div>
       </div>

       <div class="control-group">
            <label class="control-label" for="select01">Asset Type</label>
            <div class="controls">
              <select id="asstType">
                <option selected>Select</option>
                <option>Sports</option>
                <option>Infrastructure</option>
                <option value="Other">Others</option>
              </select>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="select01">Asset Name</label>
            <div class="controls">
              <select id="asstName">
                <option>Select</option>
                <option>Football</option>
                <option>Bathroom</option>
                <option value="OtherName">Others</option>
              </select>
            </div>
            </div>
            <div class="control-group">
            <label class="control-label" for="input01">Quantity</label>
            <div class="controls">
              <input type="text" class="input-small" id="qty"/>
             </div>
        </div>          

        <div class="control-group">
              <label class="control-label" for="select01">Select Priority</label>
              <div class="controls">
                <select id="priority">
                  <option>1st Priority</option>
                  <option>2nd Priority</option>
                  <option>3rd Priority</option>
                  <option value="OtherName">Others</option>
                </select>
              </div>
              </div>
              <div class="control-group">
    	        <input type="button" class="add-row" value="Add Requirement"/>
		          </div>

  <div class="control-group">


                  <table class="table table-bordered table-striped">
                                                                <thead>
                                                                    <tr>
                                                                    <th>Req.No</th>
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
              
                                                                      <td>New</td>
                                                                      <td>Sports</td>
                                                                      <td>Football</td>
																	       <td>1</td>
          															                              <td>10</td>
                                                                    </tr>

                                                                    <tr>
                                                                    <td>2</td>
              
                                                                      <td>New</td>
                                                                      <td>Infrastructure</td>
                                                                      <td>Chairs</td>
																	       <td>2</td>
                                                                      <td>10</td>
                                                                    </tr>

                                                                    <tr>
                                                                    <td>3</td>
              
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
                            <button type="submit" class="btn send_btn">Submit</button>
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

export default withRouter(addRequirements);
