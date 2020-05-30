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

View Admin Comments: <textarea class="input-large" id="textarea" disabled ></textarea>
</div>
</table>
</div>

<div class="span10">

  <div class="control-group">
  <legend>Old Value is below</legend>
  </div>
  
  <div class="control-group">

                  <table class="table table-bordered table-striped">
                                                                <thead>
                                                                    <tr>
                                                                      <th width="20%">Action</th>
                                                                      <th>Project Type</th>
                                                                      <th>Asset Type</th>
                                                                      <th>Asset Name</th>
																	  <th>Priority</th>
                                                                      <th>Quantity</th>

                                                                    </tr>
                                                                  </thead>
                                                                  <tbody>
                                                                    <tr>
                                                                     <td>
																	 
																<div>
																	Select if Change Required:
																	<input type="checkbox" id="terms_and_conditions" value="1" onclick="terms_changed(this)" />
																</div>
																<div>
																	<button type="submit" id="submit_button" disabled>Edit</button>
																	<button type="submit" id="submit_button1" disabled>Delete</button>
																</div>
																	 </td>

                                                                      <td>New</td>
                                                                      <td>Sports</td>
                                                                      <td>Football</td>
																	       <td>1</td>
          															                              <td>10</td>
                                                                    </tr>

                                                                    <tr>
                                                                    <td>
																	<div>
																	Select if Change Required:
																	<input type="checkbox" id="terms_and_conditions" value="1" onclick="terms_changed1(this)" />
																</div>
																<div>
																	<button type="submit" id="submit_button2" disabled>Edit</button>
																	<button type="submit" id="submit_button3" disabled>Delete</button>
																</div>
																
                                                                     </td>
                                                                      <td>New</td>
                                                                      <td>Infrastructure</td>
                                                                      <td>Bathroom</td>
																	       <td>3</td>
                                                                      <td>5</td>
                                                                    </tr>

                                                                    <tr>
                                                                     <td>
																	 <div>
                                   Select if Change Required:
																	<input type="checkbox" id="terms_and_conditions" value="1" onclick="terms_changed2(this)" />
																</div>
																<div>
																	<button type="submit" id="submit_button4" disabled>Edit</button>
																	<button type="submit" id="submit_button5" disabled>Delete</button>
																</div>

                                                                     </td>
                                                                      <td>New</td>
                                                                      <td>Infrastructure</td>
                                                                      <td>Bathroom</td>
																	       <td>3</td>
                                                                      <td>5</td>
                                                                    </tr>


                                                                  </tbody>
                </table>
                            </div>
</div>

<div class="control-group">
		 <div class="control-group">
            <div class="controls">
              <select id="projType">
                <option>Select Project Type</option>
                <option>New</option>
                <option>Maintainence </option>
              </select>
            </div>
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
                  <div class="controls">

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
                  <div class="controls">
                    
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
    	<input type="button" class="add-row" value="Submit Changes" />
		</div>
    
<legend>New Value</legend>
	<table class="table table-bordered table-striped">
                                                      <thead>
                                                          <tr>
                                                            <th>Select</th>
                                                            <th>Requirement Type</th>
                                                            <th>Asset Type</th>
                                                            <th>Asset Name</th>
                                                            <th>Quantity</th>
                                                            <th>Priority</th>
                                                          </tr>
                                                        </thead>
                                                        <tbody>



                                                        </tbody>
</table>



</div>


</div>

</div>
<div class="form-actions">
						   <input type="checkbox" id="inputSuccess" /> Disclaimer
               
               <div class="form-actions"></div>
						    <button type="submit" class="btn send_btn">Submit</button>
                            <button class="btn dark_btn">Cancel</button>
                          </div>
</div>

     )
    }
}

export default withRouter(editRequirement);
