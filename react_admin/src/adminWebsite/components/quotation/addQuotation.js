import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';


class addQuotation extends Component {

    state={
        companyName:null,
        address:null,
        city:null,
        state:null,
        pincode:null,
        phone:null,
        quotationDate:null,
        quotationValidDate:null,
        quotationPreparedBy:null,
        quantity:null,
        details:null,
        cost:null,
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
        document.getElementById('companyName').style.borderColor="#d2d6de";
        document.getElementById('address').style.borderColor="#d2d6de";
        document.getElementById('city').style.borderColor="#d2d6de";
        document.getElementById('state').style.borderColor="#d2d6de";
        document.getElementById('pincode').style.borderColor="#d2d6de";
        document.getElementById('phone').style.borderColor="#d2d6de";        
        document.getElementById('quotationDate').style.borderColor="#d2d6de";
        document.getElementById('quotationValidDate').style.borderColor="#d2d6de";
        document.getElementById('quotationPreparedBy').style.borderColor="#d2d6de";
        document.getElementById('quantity').style.borderColor="#d2d6de";
        document.getElementById('details').style.borderColor="#d2d6de";
        document.getElementById('cost').style.borderColor="#d2d6de";
        const quotation={
            companyName:this.state.companyName,
            address:this.state.address,
            city:this.state.city,
            state:this.state.state,
            pincode:this.state.pincode,
            phone:this.state.phone,
            quotationDate:this.state.quotationDate,
            quotationValidDate:this.state.quotationValidDate,
            quotationPreparedBy:this.state.quotationPreparedBy,
            quantity:this.state.quantity,
            details:this.state.details,
            cost:this.state.cost,
            schoolId:this.props.location.school.schoolId
        }
        console.log(quotation);
        this.saveQuotation(quotation);
    }
}

cancelClicked=()=>{
    this.props.history.push({
        pathname:"/viewRequirements",
        user:this.props.location.user,
        school:this.props.location.school,
        ...this.props
    })    
} 

saveQuotation=(quotation)=>{
    axios.post('http://localhost:6060/puthuyir/quotation',quotation)
    .then(res=>{
        console.log(res);
        this.props.history.push({
            pathname: '/viewRequirements',
            quotation: res.data,
            user:this.props.location.user,
            school:this.props.location.school,
            ...this.props            
        });
    })
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
        <div className="content-wrapper">
        <section className="content">
           <div className="row">
                <div className="form-group has-feedback col-md-6">
                    <input type="text" className="form-control" id="companyName" value={this.state.companyName} placeholder="Enter Company Name" onChange={this.handleChange}/>                    
                    <span className="glyphicon glyphicon-user form-control-feedback" />
                    <input type="text" className="form-control" id="address" value={this.state.address} placeholder="Enter Address" onChange={this.handleChange}/>                    
                    <input type="text" className="form-control" id="city" value={this.state.city} placeholder="Enter City" onChange={this.handleChange}/>                    
                    <input type="text" className="form-control" id="state" value={this.state.state} placeholder="Enter State" onChange={this.handleChange}/>                    
                    <input type="text" className="form-control" id="pincode" value={this.state.pincode} placeholder="Enter Pincode" onChange={this.handleChange}/>                    
                    <input type="text" className="form-control" id="phone" value={this.state.phone} placeholder="Enter PhoneNumber" onChange={this.handleChange}/>                    
                </div>                                                                                                           
                <div className="form-group has-feedback col-md-6">
                    <input type="text" className="form-control" id="quotationDate" value={this.state.quotationDate} placeholder="Enter Quotation Date" onChange={this.handleChange}/>                    
                    <input type="text" className="form-control" id="quotationValidDate" value={this.state.quotationValidDate} placeholder="Enter Quotation ValidDate" onChange={this.handleChange}/>
                    <input type="text" className="form-control" id="quotationPreparedBy" value={this.state.quotationPreparedBy} placeholder="Enter Quotation PreparedBy" onChange={this.handleChange}/>
                    <input type="text" className="form-control" id="quantity" value={this.state.quantity} placeholder="Enter Quantity" onChange={this.handleChange}/>
                    <input type="text" className="form-control" id="details" value={this.state.details} placeholder="Enter Details" onChange={this.handleChange}/>
                    <input type="text" className="form-control" id="cost" value={this.state.cost} placeholder="Enter Cost" onChange={this.handleChange}/>
                </div>	                                                					
            </div>
            <div className="col-md-6">
                    <button type="submit" className="btn btn-primary btn-block btn-flat" onClick={()=>this.cancelClicked()}>Cancel</button><br/>
            </div>            
            <div className="col-md-6">
                    <button type="submit" className="btn btn-primary btn-block btn-flat" onClick={()=>this.saveClicked()}>Save</button><br/>
            </div>
            {this.state.errorMessage!=null?<div className="errorMessage" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}
        </section>
        </div>
    );
}
}	

export default withRouter(addQuotation);