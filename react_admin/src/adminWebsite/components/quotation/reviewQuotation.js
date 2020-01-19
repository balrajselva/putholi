import React, { Component } from 'react'
import { withRouter } from 'react-router'
import './reviewQuotation.css'
import Axios from 'axios'

class reviewQuotation extends Component {
    state={
        spinner:false,
        getRequirementList:false,
        requirements:[
            {
                companyName:"ABC",
                city:"Tiruppurasd gagsadgasgasdgsgsd gaggadsgsgaasg dafagadgad gagasdgfgdsgass",
                contact:"9876543210",
                quotationPreparedBy:"Arun",
                quotationDate:"23/2/19",
                quotationValidDate:"23/2//19",
                itemDescription:"table",
                quantity:"10",
                unitPrice:"1000",
                tax:"10",
                shippingCost:"200",
                totalAmount:"1000",
                warranty:"2 yrs"
            },
            {
                companyName:"ABC",
                city:"Tiruppur",
                contact:"8765433219",
                quotationPreparedBy:"Arun",
                quotationDate:"23/2/19",
                quotationValidDate:"23/2//19",
                itemDescription:"table",
                quantity:"10",
                unitPrice:"1000",
                tax:"10",
                shippingCost:"32",
                totalAmount:"325",
                warranty:"2 yrs"
            },
            {
                companyName:"ads",
                city:"Tiruppua dfasfs afdasdfasf asdfasdr",
                contact:"8765432312",
                quotationPreparedBy:"AK",
                quotationDate:"23/2/19",
                quotationValidDate:"23/2//19",
                itemDescription:"table",
                quantity:"10",
                unitPrice:"123",
                tax:"10",
                shippingCost:"200",
                totalAmount:"1000",
                warranty:"2 yrs"
            },
            {
                companyName:"ABzcbC",
                city:"Covaiadsf asdfasfasdfaf adsfasfasd",
                contact:"9876543210",
                quotationPreparedBy:"Arun",
                quotationDate:"23/2/19",
                quotationValidDate:"23/2//19",
                itemDescription:"table",
                quantity:"10",
                unitPrice:"1000",
                tax:"10",
                shippingCost:"200",
                totalAmount:"1000",
                warranty:"2 yrs"
            }
        ]
    }
    componentDidMount(){
        console.log(this.props);
        Axios.get("http://localhost:6060/puthuyir/"+this.props.location.school.schoolId+"/"+this.props.location.school.projects[0].requirements[0].requirementId+"/quotations")
        .then(res=>{
            console.log(res)
            this.setState({
                requirements:res.data
            })
        })
    }
    createTable=()=>{
        var rows=[];
        let rowsUpdated=false;
        for(let i=-1;i<this.state.requirements.length;i++){
            if(i==-1){
                rowsUpdated=true;
                rows.push(
                   
                )
            }
            else{
            rows.push(
                rows.push(
                    <tr>                        
                    <td>{this.state.requirements[i].companyName}</td>
                    <td>{this.state.requirements[i].city}</td>
                    <td>{this.state.requirements[i].contact}</td>
                    <td>{this.state.requirements[i].quotationPreparedBy}</td>
                    <td>{this.state.requirements[i].quotationDate}</td>
                    <td>{this.state.requirements[i].quotationValidDate}</td>
                    <td>{this.state.requirements[i].itemDescription}</td>
                    <td>{this.state.requirements[i].quantity}</td>
                    <td>{this.state.requirements[i].unitPrice}</td>
                    <td>{this.state.requirements[i].tax}</td>
                    <td>{this.state.requirements[i].shippingCost}</td>
                    <td>{this.state.requirements[i].totalAmount}</td>
                    <td>{this.state.requirements[i].warranty}</td>
                    <td><input type="button" value="Show quotation"/></td>
                </tr>
                )
            )		
            }	
        }
        if(rowsUpdated==false)
            rows.push(<tr ><td align="center" colSpan="5">No new records found!</td></tr>)
        return rows;
    }
    render() {
        return (
            <div>
            <div style={{fontSize:"large"}}>
                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>
                        {this.props.location.school.schoolInfo.schoolName}
                        </h1>
                        <h4>
                        {this.props.location.school.projects[0].requirements[0].assetName}
                        </h4>
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
                            <div class="box-body table-responsive no-padding">
                                <table class="table table-hover">
                                    <tbody>
                                <tr>
                                    <th><b>Company name</b></th>
                                    <th><b>City</b></th>
                                    <th><b>Contact</b></th>
                                    <th><b>Quotation prepared by</b></th>
                                    <th><b>Quotation Date</b></th>
                                    <th><b>Quotation valid date</b></th>
                                    <th><b>Item description</b></th>
                                    <th><b>Quantity</b></th>
                                    <th><b>Unit price</b></th>
                                    <th><b>Tax</b></th>
                                    <th><b>Shipping cost</b></th>
                                    <th><b>Total amount</b></th>
                                    <th><b>Warranty</b></th>
                                    </tr>
                                    {this.state.getRequirementList?null:this.createTable()}
                                    </tbody>
                                </table>
                            </div>                            
                        </div>
                    </div>
                </div>
                {/* <div class="timeline-footer">
                    <a class="btn btn-warning btn-flat btn">Submit Quotation</a>
                </div> */}
              </section>
                </div>
            </div>
        </div>
        )
    }
}
export default  withRouter(reviewQuotation);