import React, { Component } from 'react';
import HeaderComponent from '../components/HeaderComponent.js';
import FooterComponent from '../components/FooterComponent';
import '../css/School_registration.css';

class SchoolRegistrationPage extends Component {
    state={
        locality:null,
        selectedLocality:null,
        createLocalityDropDown:false,
        requirements:null,
        requirementsPresent:false
    }
    render() {
        return (
            <div>
                <HeaderComponent/>
                <div className="page_container">
                <div className="breadcrumb">
                    <div className="wrap">
                    <div className="container">
                        Welcome Message. Register your school here
                    </div>
                    </div>
                </div>
               
                <div className="wrap">
                    <div className="container">
                    <section>
                        <div className="row">
                        <div className="span8">
                            <h3>  If Beneficiary already added a school, show this link to view current status</h3><h3>
                            <h3>Beneficiary Link -  <a href="Track_School_Status.html">Click here to view School Status</a></h3>
                            </h3><h3>Otherwise, enter below details</h3>
                        </div>
                        <div className="span8">
                            <form action="Confirmation_to_add_school.html" className="form-horizontal">
                            <fieldset>
                                <div className="tabbable" style={{marginBottom: 9}}>
                                   <div className="tab-content">
                                    <p><h3>School details:</h3></p>
                                    <div className="row">
                                        <div className="control-group span3">
                                            <div className="controls">
                                            <input type="text" className="input-xlarge" id="input01" placeholder="School name"/>
                                            </div>
                                        </div>
                                        <div className="control-group span3">
                                            <div className="controls">
                                            <input type="text" className="input-xlarge" id="input01" placeholder="School registration number"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="control-group span3">
                                            <div className="controls">
                                            <select id="multiSelect" className="input-xlarge">
                                                <option selected disabled>Select school type</option>
                                                <option>Nursery</option>
                                                <option>Primary</option>
                                                <option>Middle School</option>
                                                <option>Secondary School</option>
                                                <option>Higher Secondary School</option>
                                            </select>
                                            </div>
                                        </div>
                                        <div className="control-group span3">
                                            <div className="controls">
                                            <input type="text" className="input-xlarge" id="input01" placeholder="Number of students"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="control-group span3">
                                            <div className="controls">
                                            <input type="text" className="input-xlarge" id="input01" placeholder="Number of teachers"/>
                                            </div>
                                        </div>
                                    </div>
                                    <p><h3>Contact details:</h3></p>
                                    <div className="row">
                                        <div className="control-group span3">
                                            <div className="controls">
                                                <input type="text" className="input-xlarge" id="input01" placeholder="Primary Contact Person Name" />
                                            </div>
                                        </div>
                                        <div className="control-group span3">
                                            <div className="controls">
                                                <input type="text" className="input-xlarge" id="input01" placeholder="Secondary Contact Person Name" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="control-group span3">
                                            <div className="controls">
                                                <input type="text" className="input-xlarge" id="input01" placeholder="Primary Contact Person Number" />
                                            </div>
                                        </div>
                                        <div className="control-group span3">
                                            <div className="controls">
                                            <input type="text" className="input-xlarge" id="input01" placeholder="Secondary Contact Person Number" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="control-group span3">
                                            <div className="controls">
                                            <input type="text" className="input-xlarge" id="input01" placeholder="Primary Contact Email"/>
                                            </div>
                                        </div>
                                        <div className="control-group span3">
                                            <div className="controls">
                                            <input type="text" className="input-xlarge" id="input01" placeholder="Secondary Contact Email" />
                                            </div>
                                        </div>
                                    </div>
                                    <p><h3>Address details:</h3></p>
                                    <div className="row">
                                        <div className="control-group span3">
                                            <div className="controls">
                                                <input type="text" className="input-xlarge" id="input01" placeholder="Address Line 1" />
                                            </div>
                                        </div>
                                        <div className="control-group span3">
                                            <div className="controls">
                                                <input type="text" className="input-xlarge" id="input01" placeholder="Address Line 2"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="control-group span3">
                                            <div className="controls">
                                                <input type="text" className="input-xlarge" id="input01" placeholder="Pincode"/>
                                            </div>
                                        </div>
                                        <div className="control-group span3">
                                            <div className="controls">
                                                <select id="select01" className="input-xlarge">
                                                    <option selected="selected">Select Locality</option>
                                                    {this.state.createLocalityDropDown?this.state.locality.map((locality) => <option key={locality.Name} value={locality.Name}>{locality.Name}</option>):null}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="control-group span3">
                                            <div className="controls">
                                                <input type="text" className="input-xlarge" id="input01" placeholder="City"/>
                                            </div>
                                        </div>
                                        <div className="control-group span3">
                                            <div className="controls">
                                                <input type="text" className="input-xlarge" id="input01" placeholder="District"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="control-group span3">
                                            <div className="controls">
                                                <input type="text" className="input-xlarge" id="input01" placeholder="State"/>
                                            </div>
                                        </div>
                                        <div className="control-group span3">
                                            <div className="controls">
                                                <input type="text" className="input-xlarge" id="input01" placeholder="Country"/>
                                            </div>
                                        </div>
                                    </div>
                                    <p><h3>Requirement details:</h3></p>
                                    <div className="row">
                                        <div className="control-group span3">
                                            <div className="controls">
                                            <select id="projType" className="input-xlarge">
                                                <option disabled selected>Requirement Type</option>
                                                <option>New</option>
                                                <option>Maintainence </option>
                                            </select>
                                            </div>
                                        </div>
                                    </div>    
                                    <div className="row">
                                        <div className="control-group span3">
                                            <div className="controls">
                                                <select id="asstType" className="input-xlarge">
                                                    <option selected disabled>Asset Type</option>
                                                    <option>Sports</option>
                                                    <option>Infrastructure</option>
                                                    <option value="Other">Others</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="control-group span3">
                                            <div className="controls">
                                                <input type="text" className="input-xlarge" id="input01" placeholder="Enter Asset type here"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="control-group span3">
                                            <div className="controls">
                                                <select id="asstName" className="input-xlarge">
                                                    <option selected disabled>Asset Name</option>
                                                    <option>Football</option>
                                                    <option>Bathroom</option>
                                                    <option value="OtherName">Others</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="control-group span3">
                                            <div className="controls">
                                                <input type="text" name="other" className="input-xlarge" placeholder="Enter Asset Name here" id="otherName"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="control-group span3">
                                            <div className="controls">
                                            <input type="text" className="input-xlarge" id="qty" placeholder="Quantity"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="control-group span6 pull-right">
                                            <input type="button" className="add-row" defaultValue="Add Requirement" />
                                        </div>
                                    </div>
                                    {/* <p><h3>Edit Requirements:</h3></p>
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
                                    <div className="row">
                                        <div className="control-group span6 pull-right">
                                            <button type="button" className="delete-row">Delete Requirement</button>
                                        </div>
                                    </div> */}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="span10">
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
                                                {this.state.requirementsPresent?this.state.requirements.map((req)=>
                                                    <tr>
                                                        <td><button type="button" className="dark_btn">Edit</button></td>
                                                        <td>{req.projectType}</td>
                                                        <td>{req.assetType}</td>
                                                        <td>{req.assetName}</td>
                                                        <td>{req.quantity}</td>
                                                    </tr>):null}
                                            </tbody>
                                            </table>
                                            </div>
                                        </div>
                                    </div>
                                    <p><h3>Identity Proof:</h3></p>
                                    <div className="row">
                                        <div className="control-group span2">
                                            <p style={{fontSize:"120%"}}>Upload school ID proof</p>
                                        </div>
                                        <div className="control-group span4 pull-left">
                                        <input className="control-group" type="file" id="identityProof" accept="image/x-png,image/jpeg" onChange={this.handleChange}/>
                                        {this.state.localImageUrl?<div style={{fontSize:"120%"}}>Id proof preview:</div>:null}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="control-group span2">
                                            <p style={{fontSize:"120%"}}>Comments / Message to Trust</p>
                                        </div>
                                        <div className="control-group span3 pull-left">
                                            <textarea className="input-xlarge" id="textarea" rows={3} defaultValue={""} />
                                        </div>
                                    </div>
                                    <div className="form-actions">
                                    <button type="submit" className="btn send_btn">Submit</button>&nbsp;
                                    <button className="btn dark_btn">Cancel</button>
                                    </div>
                                </fieldset></form>
                        </div>
                        </div>
                    </section>
                    </div>
                </div>
                </div>

                <FooterComponent/>
            </div>
        );
    }
}

export default SchoolRegistrationPage;