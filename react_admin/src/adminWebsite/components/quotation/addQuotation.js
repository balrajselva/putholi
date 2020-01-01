import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';


class addQuotation extends Component {

    state={
        quotationDate:null,
        quotationValidDate:null,
        quotationPreparedBy:null,
        lastErrorField:null
    }

saveClicked=()=>{
    if(this.state.lastErrorField!==null)
        document.getElementById(this.state.lastErrorField).style.borderColor="#d2d6de";
    if(this.state.quotationDate===null){
        this.setState({
            lastErrorField:"quotationDate",
            errorMessage:"Please enter Quotation Date"
    });
        document.getElementById('quotationDate').style.borderColor="red";
    }
    else if(this.state.quotationValidDate===null){
        this.setState({
            lastErrorField:"quotationValidDate",
            errorMessage:"Please select quotationValidDate"
        });
        document.getElementById('quotationValidDate').style.borderColor="red";
    }
    else if(this.state.quotationPreparedBy===null){
        this.setState({
            lastErrorField:"quotationPreparedBy",
            errorMessage:"Please select quotationPreparedBy"
        });
        document.getElementById('quotationPreparedBy').style.borderColor="red";
    }
    else{
        document.getElementById('quotationDate').style.borderColor="#d2d6de";
        document.getElementById('quotationValidDate').style.borderColor="#d2d6de";
        document.getElementById('quotationPreparedBy').style.borderColor="#d2d6de";
        const quotation={
            quotationDate:this.state.quotationDate,
            quotationValidDate:this.state.quotationValidDate,
            quotationPreparedBy:this.state.quotationPreparedBy,
        }
        console.log(quotation);
        this.props.saveQuotation(quotation);
    }
}

handleChange=({target})=>{
    document.getElementById(target.id).style.borderColor="#d2d6de";
    this.setState({ 
        [target.id]: target.value , 
        lastErrorField:null,
        errorMessage:""
    });
}


render() {
    return (
        <div>
           <div className="row">
                <div className="form-group has-feedback col-md-6">
                    <input type="text" className="form-control" id="quotationDate" value={this.state.quotationDate} placeholder="Quotation Date" onChange={this.handleChange}/>                    
                    <span className="glyphicon glyphicon-user form-control-feedback" />
                </div>
                <div className="form-group has-feedback col-md-6">
                    <input type="text" className="form-control" id="quotationValidDate" value={this.state.quotationValidDate} placeholder="Quotation ValidDate" onChange={this.handleChange}/>
                </div>
                <div className="form-group has-feedback col-md-6">
                    <input type="text" className="form-control" id="quotationPreparedBy" value={this.state.quotationPreparedBy} placeholder="Quotation PreparedBy" onChange={this.handleChange}/>
                </div>					
            </div>
            <div className="col-md-6">
                    <button type="submit" className="btn btn-primary btn-block btn-flat" onClick={()=>this.saveClicked()}>Save</button><br/>
            </div>
            {this.state.errorMessage!=null?<div className="errorMessage" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}
        </div>
    );
}
}	

export default withRouter(addQuotation);