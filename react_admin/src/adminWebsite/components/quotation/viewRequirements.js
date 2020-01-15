import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

class viewRequirements extends Component {

    state={
        requirements:"",
        getRequirementList:true,
        spinner:true,
        quotationDate:null,
        quotationValidDate:null,
        quotationPreparedBy:null,
        quantity:null,
        description:null,
        cost:null,
        lastErrorField:null,
        currentReqId:null,
        quotaionList:[]
    }

    addQuotationClicked=()=>{
        this.props.history.push({
            pathname:"/addQuotation",
            user:this.props.location.user,
            school:this.props.location.school,
            ...this.props
        })    
    } 


    handleChange=({target})=>{
        document.getElementById(target.id).style.borderColor="#d2d6de";
        if(target.id==="fileInput"){
            this.setState({spinner:true});
            const reader=new FileReader();
            const file=target.files[0];
            
            reader.onloadend=()=>{
                this.setState({
                    fileInput:target.files[0],
                    localImageUrl:reader.result,
                    spinner:false
                })
            }
            reader.readAsDataURL(file)
        }
        else{
        this.setState({ 
            [target.id]: target.value , 
            lastErrorField:null,
            errorMessage:""
        });
    }
    }    

    requirementList=()=>{
        axios.get("http://localhost:6060/puthuyir/"+this.props.location.school.schoolId+"/requirements")
        .then(res=>{
            console.log(res.data)
            let resp=res.data;
            for(let i=0;i<resp.length;i++){
                resp[i].quotaionList=[]
            };
            console.log(resp);
            this.setState({
                requirements:resp,
                getRequirementList:false,
                spinner:false
            })
        })
        console.log(this.state.requirements);

    }    
    updateCurrentReqId=(e)=>{
        this.setState({
            currentReqId:e.target.id
        })
    }
    deleteQuotation=(e)=>{
        e.preventDefault();
        var array=[...this.state.requirements[e.target.id].quotaionList];
        array.splice(e.target.id,1);
        this.setState({
            requirements:[array]
        });
     }
    createTable=()=>{
        var rows=[];
        let rowsUpdated=false;
        for(let i=0;i<this.state.requirements.length;i++){
            const newTo = { 
                quotation:this.state.requirements[i]
            };
			
                rowsUpdated=true;
                rows.push(<tr>
                    <td>{i+1}</td>
                    <td>{this.state.requirements[i].assetName}</td>
                    <td>{this.state.requirements[i].quantity}</td>                                        
                    <td>
                    <button id={i} type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-default" onClick={(e)=>this.updateCurrentReqId(e)} >
                            Add Quotation
                    </button>
                    </td>                    
        <td>{this.state.requirements[i].quotaionList.length>0?this.state.requirements[i].quotaionList.map((req,j)=><div>{req.fileInput.name}<button class="btn btn-default" id={j} onClick={(e)=>this.deleteQuotation(e)}>Delete</button></div>):null}
                    </td>
                </tr>)			
        }
        if(rowsUpdated==false)
            rows.push(<tr ><td align="center" colSpan="5">No new records found!</td></tr>)
        return rows;
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
        else if(this.state.requirements[this.state.currentReqId].quotaionList.length===4){
            this.setState({
                errorMessage:"Only four requirements can be added per requirement"
            })
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
        else if(this.state.fileInput===null){
            this.setState({
                lastErrorField:"fileInput",
                errorMessage:"Please upload quotation"
            })
        }
        else{
            document.getElementById('quotationDate').style.borderColor="#d2d6de";
            document.getElementById('quotationValidDate').style.borderColor="#d2d6de";
            document.getElementById('quotationPreparedBy').style.borderColor="#d2d6de";
            document.getElementById('quantity').style.borderColor="#d2d6de";
            document.getElementById('description').style.borderColor="#d2d6de";
            document.getElementById('cost').style.borderColor="#d2d6de";
            const quotation={
                quotationDate:this.state.quotationDate,
                quotationValidDate:this.state.quotationValidDate,
                quotationPreparedBy:this.state.quotationPreparedBy,
                quantity:this.state.quantity,
                description:this.state.description,
                cost:this.state.cost,
                fileInput:this.state.fileInput,
                localImageUrl:this.state.localImageUrl
            }
            console.log(quotation);
            console.log(this.state.currentReqId);
            let ql={
                ...this.state.requirements[this.state.currentReqId],
                quotaionList:[...this.state.requirements[this.state.currentReqId].quotaionList,{
                quotationDate:this.state.quotationDate,
                quotationValidDate:this.state.quotationValidDate,
                quotationPreparedBy:this.state.quotationPreparedBy,
                quantity:this.state.quantity,
                description:this.state.description,
                cost:this.state.cost,
                fileInput:this.state.fileInput,
                localImageUrl:this.state.localImageUrl
                }]
            };
            console.log(ql);
            this.setState({
                requirements:[ql]
            });
        }
    }
    
    render() {	
        console.log(this.state.requirements);
        return (
            <div>
            <div style={{fontSize:"large"}}>
            {this.state.getRequirementList?this.requirementList():null}
                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>
                        {this.props.location.school.schoolInfo.schoolName}
                        <small>added on</small>
                        </h1>
                        <ol className="breadcrumb">
                        <li><a href="../../index.html"><i className="fa fa-dashboard" /> Home</a></li>
                        <li><a href="#">UI</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                            <div className="box-header">
                                <h3 className="box-title">Upload appropriate documents</h3>
                                <div className="box-tools">
                                <div className="input-group input-group-sm" style={{width: 150}}>
                                    <input type="text" name="table_search" className="form-control pull-right" placeholder="Search" />
                                    <div className="input-group-btn">
                                    <button type="submit" className="btn btn-default"><i className="fa fa-search" /></button>
                                    </div>
                                </div>
                                </div>
                            </div>
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
                            {this.state.errorMessage!=null?<div className="col-md-12" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}
                            <div className="modal fade" id="modal-default">
                                <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span></button>
                                    <h4 className="modal-title">Add Quotations</h4>
                                    </div>
                                    <div className="modal-body">
                                    <div className="row">
                                        <section className="content">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputFile">Upload Quotation</label>
                                            <input type="file" id="fileInput" onChange={this.handleChange}/>
                                        </div>
                                        <div className="row">
                                        <div className="col-md-6">
                                            <div className="box box-primary">
                                                <form role="form">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" id="companyName" placeholder="Enter Company name" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="address_line_1" placeholder="Enter Address Line 1" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="street"placeholder="Enter street" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="city" placeholder="Enter city" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="pincode" placeholder="Enter pincode" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="phoneNumber"placeholder="Enter phone number" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="comment"placeholder="Comment / Special instructions" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="quotationPreparedBy" placeholder="Quotation Prepared by" onChange={this.handleChange}/>
                                                    </div>
                                                </form>
                                            </div>
                                            </div>
                                            <div className="col-md-6">
                                            <div className="box box-primary">
                                                <form role="form">
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="quotationDate" placeholder="Enter Quotation Date" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="quotationValidDate" placeholder="Enter Quotation Valid Date" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="discountDetails" placeholder="Discount Details" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="itemDescription" placeholder="Item Description" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="quantity" placeholder="Quantity" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="unitPrice" placeholder="Unit Price" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="tax" placeholder="Tax" onChange={this.handleChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                    <input type="text" className="form-control" id="shippingCost" placeholder="Shipping Cost" onChange={this.handleChange}/>
                                                    </div>
                                                </form>
                                            </div>
                                            </div>
                                            <div className="row">
                                            <div className="col-md-12">
                                            <div className="box box-primary">
                                            <form role="form">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" id="totalAmount" placeholder="Total Amount" onChange={this.handleChange}/>
                                                 </div>
                                                </form>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                            {this.state.errorMessage!=null?<div className="col-md-12" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}
                                            <div className="col-md-12">
                                                    <button type="submit" id="saveQuotation" className="btn btn-primary btn-block center-block btn-flat" data-dismiss="modal" onClick={()=>this.saveClicked()}>Save</button><br/>
                                                </div>
                                            </div>
                                        </div>
                                        </section>
                                    </div>
                                </div>
                            </div>    
                        </div>
                    </div>
                  </div>
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
