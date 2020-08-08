import React, { Component } from 'react'
import { withRouter}  from 'react-router'
import { Link } from 'react-router-dom';
import axios from 'axios'

class BeneficiarySummary extends Component {
  state={
    schools:null
  }
  componentDidMount(){
    axios.get(this.props.config+"/school/user/"+this.props.location.user.userid)
    .then(res=>{
        console.log(res.data)
        this.setState({
          schools:res.data,
            spinner:false
        });
    })
    .catch(error=>{
        this.setState({spinner:false});
        window.alert("Unable to get school details due to "+error)
    })
  }   
  createTable=()=>{
    var rows=[];
    let rowsUpdated=false;
    for(let i=0;i<this.state.schools.length;i++){
        let nextPage=null;
        var pageLink=null;
        if(this.state.schools[i].schoolStatus==="ReturnedToBeneficiary"){
            nextPage="editRequirements"
            pageLink="Edit Requirement"
        }
        else if(this.state.schools[i].schoolStatus==="OPEN_FOR_REQUIREMENTS"){
            nextPage="addRequirements"
            pageLink="Add Requirement"
        }
        else if(this.state.schools[i].schoolStatus==="APPROVER_APPROVED_QUOTATION"){
            nextPage="donation"
            pageLink="Donation in Progress"
        }
        else if(this.state.schools[i].schoolStatus==="SchoolRejected"){
            nextPage="beneficarySummary"
            pageLink="More details"
        }
        else{
            nextPage="beneficarySummary"
            pageLink="More details"
        }
        const newTo = {
            pathname: "/"+nextPage, 
            school:this.state.schools[i],
            user:this.props.location.user,
            ...this.props
        };
        if(this.state.schools[i] !== null){
            rowsUpdated=true;
            rows.push(
            <tr>
              <td>{this.state.schools[i].schoolId}</td>
              <td>{this.state.schools[i].schoolInfo.schoolRegNo}</td>
              <td>{this.state.schools[i].schoolInfo.schoolName}</td>
              <td>{this.state.schools[i].schoolStatus}</td>
              <td><a href=""><Link to={newTo}>{pageLink}</Link></a></td>
            </tr>
            )
        }
    }
    if(rowsUpdated==false)
        rows.push(<tr ><td align="center" colSpan="8">No records found!</td></tr>)
    return rows;
}
  render() {
        console.log(this.props);
        let newTo = {
          pathname: '/schoolRegistration',
          user:this.props.location.user,
        }
        return (
            <div class="page_container">
    	<div class="breadcrumb">
        	<div class="wrap">
                <div class="container">
                    <h3>Welcome {this.props.location.user.firstName}, Know your School Status</h3>
                </div>
            </div>
        </div>
        <div class="wrap">
            <div class="container inner_content">
                <div class="row">
                  <div>
                  <label>Click Below To</label>
                  <h3><a href="" ><label><Link to={newTo}>Add New School & Requirements</Link></label></a></h3>
                  </div>
				  <div>
				      <label>School Summary & Status</label>
				 </div>	
				<div class="span12">
                      <table class="table table-striped  table-condensed">
                        <thead>
                          <tr>
                              <th>School ID</th>
                              <th>Reg no</th>
                              <th>Name</th>
                              <th width="20%">Current Status</th>
                              <th width="25%">Click Below</th>						
                            </tr>
                        </thead>
                        <tbody>
                          {this.state.schools !== null?this.createTable():<tr ><td align="center" colSpan="8">No records found!</td></tr>}
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
