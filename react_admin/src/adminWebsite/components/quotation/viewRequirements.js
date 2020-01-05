import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

class viewRequirements extends Component {

    state={
        requirements:"",
        getRequirementList:true,
        spinner:true
    }

    addQuotationClicked=()=>{
        this.props.history.push({
            pathname:"/addQuotation",
            user:this.props.location.user,
            school:this.props.location.school,
            ...this.props
        })    
    }    

    requirementList=()=>{
        axios.get("http://localhost:6060/puthuyir/"+this.props.location.school.schoolId+"/requirements")
        .then(res=>{
            console.log(res.data)
            this.setState({
                requirements:res.data,
                getRequirementList:false,
                spinner:false
            })
        })
        console.log(this.state.requirements);
    }    

    createTable=()=>{
        var rows=[];
        let rowsUpdated=false;
        for(let i=0;i<this.state.requirements.length;i++){
            console.log(this.state.requirements[i]);
            const newTo = { 
                quotation:this.state.requirements[i]
            };
			
                rowsUpdated=true;
                rows.push(<tr>
                    <td>{this.state.requirements[i].schoolId}</td>
                    <td>{this.state.requirements[i].assetName}</td>
                    <td>{this.state.requirements[i].quantity}</td>                                        
                    <td>
                    <button type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-default"  onClick={()=>this.addQuotationClicked()}>
                            Add Quotation
                    </button>
                    {/* <Link to={{pathname:"/addQuotation", users:this.state.users, currentUser:this.state.currentUser}} className="btn btn-primary btn-xs">Add Quotation</Link> */}
                    </td>                    
                    <td><input type="text" className="form-control" id="cost" value={this.state.requirements[i].details} placeholder="Details"/></td>
                </tr>)			
        }
        if(rowsUpdated==false)
            rows.push(<tr ><td align="center" colSpan="5">No new records found!</td></tr>)
        return rows;
    }
	
    render() {	
        return (
            <div>
            <div style={{fontSize:"large"}}>
            {this.state.getRequirementList?this.requirementList():null}
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    {/* Main content */}
                    <section className="content">
                        <div className="row" >
                        </div>
                        {/* /.row */}
                        {/* Main row */}
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="box">
                                    {/* /.box-header */}
                                    <div className="box-body table-responsive no-padding">
                                        <table className="table table-hover">
                                        <tbody>
                                            
                                            <tr>
                                                <th>ID</th>
                                                <th>Requirements</th>
                                                <th>Units</th>
                                                <th>Status</th>
                                                <th>Details</th>                                                
                                            </tr>
                                            {this.state.getRequirementList?null:this.createTable()}
                                        </tbody>
                                        </table>
                                    </div>
                                {/* /.box-body */}
                                </div>
                                {/* /.box */}
                            </div>
                        </div>
                    </section>
                </div>
                </div>
            </div>
        );
    }	
}

export default withRouter(viewRequirements);
