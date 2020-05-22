import React, { Component } from 'react'
import { withRouter } from 'react-router'

class BeneficiarySummary extends Component {
    render() {
        console.log(this.props);
        return (
            <div class="page_container">
    	<div class="breadcrumb">
        	<div class="wrap">
                <div class="container">
                    <h3>Welcome User Name, Know your School Status</h3>
                </div>
            </div>
        </div>


		
        <div class="wrap">
            <div class="container inner_content">
                <div class="row">
				
				<div>
				<label>Click Below To</label>
				  <h3><a href="" ><label>Add New School & Requirements</label></a></h3>
				  </div>
				  <div>
				      <label>School Summary & Status</label>
				 </div>	
				<div class="span12">
                      <table class="table table-striped  table-condensed">
                        <thead>
                          <tr>
                            <th width="10%">Regn No</th>
							<th width="25%">School Name</th>
							<th width="20%">Town, District</th>
							<th width="20%">Current Status</th>
							<th width="25%">Click Below</th>						
                            </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1212</td>
                            <td>St Josephs School</td>
                            <td>Manjakuppam, CUddalore</td>
							  <td> Donation in Progress</td>
							  <td><a href={'/donation'}> Donate to Schools</a></td>
                          </tr>
                         <tr>
                            <td>34</td>
                            <td>St Marys School</td>
                            <td>Manjakuppam, CUddalore</td>
							  <td> Project Completed</td>
							  <td><a href={'/addRequirements'}> Add Requirements</a></td>
                          </tr>
							 <tr>
                            <td>655</td>
                            <td>St Peters School</td>
                            <td>Thirupapaliyur, CUddalore</td>
							  <td> Returned to Beneficiary </td>
							  <td><a href={'/editRequirements'}> Edit Requirements</a></td>
                          </tr>
						  <tr>
                            <td >9898</td>
                            <td>CUddalore Boys  School</td>
                            <td>Semandalam, CUddalore</td>
							  <td>School Rejected </td>
							  <td><a href="#"> More Details & Delete School</a></td>
                          </tr>
						   <tr>
                            <td>409</td>
                            <td>ARLM School</td>
                            <td>Semandalam, CUddalore</td>
							  <td>Project Rejected </td>
							  <td><a href="#"> Call Putholi Trust</a></td>
                          </tr>
						  
                        </tbody>
                      </table>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>

     )
    }
}

export default withRouter(BeneficiarySummary);
