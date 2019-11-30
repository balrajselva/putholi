import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './style.css';
import '../../css/School_registration.css';
import Tabs from '../../components/Tabs/Tabs';


class AddSchool extends Component {
    constructor(props) {
        super(props);
    }


  
    render() {
     
         return (
           
<div className="container">
   <section>
      <div className="row">
         <div className="span8">
            <form action="Confirmation_to_add_school.html" className="form-horizontal">
               <fieldset>
                  <legend>Provide school details along with requirements</legend>
                  <Tabs>
      <div label="Add Schools">
      <div className="control-group">
                              <label className="control-label" for="input01">School  Name</label>
                              <div className="controls">
                                 <input type="text" className="input-xlarge" id="input01"></input>
                              </div>
                           </div>
                           <div className="control-group">
                              <label className="control-label" for="multiSelect">Select School Type</label>
                              <div className="controls">
                                 <select multiple="multiple" id="multiSelect">
                                    <option>Nursery</option>
                                    <option>Primary</option>
                                    <option>Middle School</option>
                                    <option>Secondary School</option>
                                    <option>Higher Secondary School</option>
                                 </select>
                              </div>
                           </div>
                           <div className="control-group">
                              <label className="control-label" for="input01">Number of Students</label>
                              <div className="controls">
                                 <input type="text" className="input-small" id="input01"></input>
                              </div>
                           </div>
                           <div className="control-group">
                              <label className="control-label" for="input01">Number of Teachers</label>
                              <div className="controls">
                                 <input type="text" className="input-small" id="input01"></input>
                              </div> 
                              </div>
                              </div>
      <div label="Add Contacts">
                           <div className="row">
                              <div className="span10">
                                 <div className="control-group">
                                    <label className="control-label" for="input01">Primary Contact</label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="input01" placeholder="Get name from user id"></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="input01">Primary Contact Number </label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="input01" placeholder="Get Phone Number"></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="input01">Primary Contact Email </label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="input01" placeholder="Get Email"></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="input01">Secondary Contact</label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="input01" placeholder="Enter name"></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="input01">Secondary Contact Email </label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="input01"></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="input01">Secondary Contact Phone Number </label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="input01"></input>
                                    </div>
                                 </div>
                              </div>
                           </div>
      </div>
      <div label="Add Address">
                           <div className="row">
                              <div className="span10">
                                 <div className="control-group">
                                    <label className="control-label" for="input01">School Address </label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="input01"></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="input01">Street Name</label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="input01"></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="input01">Town/City</label>
                                    <div className="controls">
                                       <input type="text" className="input-xlarge" id="input01"></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="select01">Select District</label>
                                    <div className="controls">
                                       <select id="select01">
                                          <option>Cuddalore</option>
                                          <option>Kanchipuram</option>
                                          <option>Chengalpattu</option>
                                          <option>Thiruvanamalai</option>
                                          <option>Villupuram</option>
                                       </select>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="select01">Select State</label>
                                    <div className="controls">
                                       <select id="select01">
                                          <option>Tamilnadu</option>
                                       </select>
                                    </div>
                                 </div>
                              </div>
                           </div>
      </div>
      <div label="Add Requirements">
                           <div className="row">
                              <div className="span10">
                                 <div className="control-group">
                                    <label className="control-label" for="select01">Requirement Type</label>
                                    <div className="controls">
                                       <select id="projType">
                                          <option>Select</option>
                                          <option>New</option>
                                          <option>Maintainence </option>
                                       </select>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="select01">Asset Type</label>
                                    <div className="controls">
                                       <select id="asstType">
                                          <option selected="">Select</option>
                                          <option>Sports</option>
                                          <option>Infrastructure</option>
                                          <option value="Other">Others</option>
                                       </select>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <div className="controls">
                                       <input type="text" name="other" className="input-xlarge" placeholder="Enter Asset Type here" id="other" ></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="select01">Asset Name</label>
                                    <div className="controls">
                                       <select id="asstName">
                                          <option>Select</option>
                                          <option>Football</option>
                                          <option>Bathroom</option>
                                          <option value="OtherName">Others</option>
                                       </select>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <div className="controls">
                                       <input type="text" name="other" className="input-xlarge" placeholder="Enter Asset Name here" id="otherName"  ></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="input01">Quantity</label>
                                    <div className="controls">
                                       <input type="text" className="input-small" id="qty"></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <input type="button" className="add-row" value="Add Requirement"></input>
                                 </div>
                                 <div className="tab-content">
                                    <table className="table table-bordered table-striped">
                                       <thead>
                                          <tr>
                                             <th>Select</th>
                                             <th>Requirement Type</th>
                                             <th>Asset Type</th>
                                             <th>Asset Name</th>
                                             <th>Quantity</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                       </tbody>
                                    </table>
                                 </div>
                                 <div className="control-group">
                                    <button type="button" className="delete-row">Delete Requirement</button>
                                 </div>
                              </div>
                           </div>
                        </div>
<div label="Upload Pictures">
                           <div className="row">
                              <div className="span10">
                                 <div className="control-group">
                                    <label className="control-label" for="fileInput">Upload proof of identity of the school </label>
                                    <div className="controls">
                                       <input className="input-file" id="fileInput" type="file"></input>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <label className="control-label" for="textarea">Comments / Message to Trust</label>
                                    <div className="controls">
                                       <textarea className="input-xlarge" id="textarea" rows="3"></textarea>
                                    </div>
                                 </div>
                              </div>
                           </div>
     </div>   

    
              
      <div label="Edit Requirements">
     
                           <div className="row">
                              <div className="span10">
                                 <div className="control-group">
                                    <label className="control-label" for="select01">Requirement Type</label>
                                    <div className="controls">
                                       <select id="projType" disabled="">
                                          <option>New</option>
                                       </select>
                                    </div>
                                 </div>
                                 <div className="control-group">
                                    <table className="table table-bordered table-striped">
                                       <thead>
                                          <tr>
                                             <th>S.No</th>
                                             <th>Project Type</th>
                                             <th>Asset Type</th>
                                             <th>Asset Name</th>
                                             <th>Quantity</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          <tr>
                                             <td><button type="button" className="dark_btn">Edit</button>
                                             </td>
                                             <td>New</td>
                                             <td>Sports</td>
                                             <td>Football</td>
                                             <td>10</td>
                                          </tr>
                                          <tr>
                                             <td><button type="button" className="dark_btn">Edit</button>
                                             </td>
                                             <td>New</td>
                                             <td>Infrastructure</td>
                                             <td>Chairs</td>
                                             <td>10</td>
                                          </tr>
                                          <tr>
                                             <td><button type="button" className="dark_btn">Edit</button>
                                             </td>
                                             <td>New</td>
                                             <td>Infrastructure</td>
                                             <td>Bathroom</td>
                                             <td>5</td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                           </div>
                        
      </div>
      </Tabs>
      <div class="form-actions">
                            <button type="submit" class="btn send_btn">Submit</button>
                            <button class="btn dark_btn">Cancel</button>
                          </div>
                </fieldset>
                </form>

</div> 
</div> 
</section>
</div>                     
                        
                        
                       
                      
                 
   
   
        )
    }
}
export default withRouter(AddSchool);
