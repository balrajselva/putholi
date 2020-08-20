import React, { Component } from 'react'
import { withRouter } from 'react-router'
import axios from 'axios'
import '../adminWebsite/css/sliderImage.css';
import MultipleImage from '../adminWebsite/components/multipleImage/MultipleImage'

class ViewSelectedQuotation extends Component {
    state={
        spinner:true,
        currentUser:this.props.location.currentUser,
        getRequirementList:true,
        totalAmount:0,
        reqList:null,
        comment:null,
        temp1:null,
        status:null,
        quotationImage:null,
        adminComments:null,
        approverComments:null,
        reviewerComments:null,
        showImage:false,
        otherQuotations:null,
        otherQuotationImages:[],
        errorMessage:null,
        lastErrorField:null,
        preImages:[],
        currentIndex: 0,
        translateValue: 0,
        currentIndex1: 0,
        translateValue1: 0
    } 

    handleChange=({target})=>{
        this.setState({ 
            [target.id]: target.value , 
            lastErrorField:null,
            errorMessage:""
        });
        document.getElementById(target.id).style.borderColor="#d2d6de";
    }

    approveQuotation=(e)=>{
        let status=null;
        console.log(e.target.id);
        if(e.target.id==="Accepted"){
            if(this.props.location.currentUser.role==="Reviewer"){
                status="ReviewerConfirmed";
                if(this.state.reviewerComments === null || this.state.reviewerComments===""){
                    this.setState({errorMessage:"Please add comments"})
                    document.getElementById(e.target.id).style.borderColor="red";
                    return
                }
            }
            else if(this.props.location.currentUser.role==="Approver"){
                status="ApproverConfirmed";
                if(this.state.approverComments === null || this.state.approverComments===""){
                    this.setState({errorMessage:"Please add comments"})
                    document.getElementById(e.target.id).style.borderColor="red";
                    return
                }
            }
        }
        else{
            if(this.props.location.currentUser.role==="Reviewer"){
                status="ReviewerRejected";
                if(this.state.reviewerComments === null || this.state.reviewerComments===""){
                    this.setState({errorMessage:"Please add comments"})
                    document.getElementById(e.target.id).style.borderColor="red";
                    return
                }
            }
            else if(this.props.location.currentUser.role==="Approver"){
                status="ApproverRejected";
                if(this.state.approverComments === null || this.state.approverComments===""){
                    this.setState({errorMessage:"Please add comments"})
                    document.getElementById(e.target.id).style.borderColor="red";
                    return
                }
            }
        }
        this.setState({spinner:true});
        console.log(status);
        let updatequotation = {
            schoolId:this.props.location.school.schoolId,
            status:status,
            approverComments:this.state.approverComments,
            reviewerComments:this.state.reviewerComments,
            rejectQuotations:this.state.reqList
        }
        axios.post(this.props.config+"/updateSelectedQuotation",updatequotation)
        .then(res=>{
            window.alert("Quotations updated successfully")
            this.setState({spinner:false});
            if(this.state.currentUser.role==="Reviewer"){
                this.props.history.push({
                    pathname:"/reviewer",
                    currentUser:this.props.location.currentUser,
                    ...this.props
                })
            }
            else if(this.state.currentUser.role==="Approver"){
                this.props.history.push({
                    pathname:"/approver",
                    currentUser:this.props.location.currentUser,
                    ...this.props
                })
            }
            
        })
        .catch(error=>{
            this.setState({spinner:false});
            window.alert("Unable to update due to"+error);
        })
    }
    componentDidMount(){
        console.log(this.props.location.school)
        for(let i=0;i<this.props.location.school.projects.length;i++){
            if(this.props.location.school.projects[i].status==="PROJECT_CLOSED"){
                continue
            }
            else{
                project=this.props.location.school.projects[i];
                break;
            }
            }
            if(project === null){
            return
        }
        axios.post(this.props.config+"/getQuotationsByProject/"+project.projectId)
        .then(res=>{
            console.log(res.data);
            this.setState({
                reqList:res.data,
                spinner:false,
                getRequirementList:false
            })
        })
        .catch(error=>{
            window.alert("Unable to get quotations due to "+error)
        })
        if(this.props.location.currentUser.role==="Approver"){
            document.getElementById("adminComments").setAttribute("disabled",true);
            document.getElementById("reviewerComments").setAttribute("disabled",true);
        }
        else if(this.props.location.currentUser.role==="Reviewer"){
            document.getElementById("adminComments").setAttribute("disabled",true);
            document.getElementById("approverComments").setAttribute("disabled",true);
        }
        let project=null;
        for(let i=0;i<this.props.location.school.projects.length;i++){
            if(this.props.location.school.projects[i].status==="PROJECT_CLOSED"){
                continue;
            }
            else{
              project=this.props.location.school.projects[i];
              break;
            }
          }
          if(project === null){
            return
          }
        this.setState({
            adminComments:project.adminComments,
            approverComments:project.approverComments,
            reviewerComments:project.reviewerComments,
            estimate:project.estimate
        })
    }

    selectQuotationImage=(e)=>{
        this.setState({spinner:true});
        let reqId=e.target.id.split("/")[0];
        let quoId=e.target.id.split("/")[1];
        console.log(this.state.reqList[reqId],quoId)
        let quotationList=this.state.reqList[reqId];
        for(let i=0;i<quotationList.length;i++){
            let quotation=quotationList[i];
            if(quotation.quotationId+""==quoId+""){
                this.setState({
                    quotationImage:quotation.quotationImages[0].image,
                    showImage:true,
                    spinner:false
                })
                document.getElementById('modal-default').style.display='block';
            }
        }
    }

    closeModel=()=>{
        document.getElementById('modal-default').style.display='none';
    }

    createTable=(iter)=>{
        console.log(iter);
        var rows=[];
        let rowsUpdated=false;
        let quotationList=this.state.reqList[iter];
        for(let i=0;i<quotationList.length;i++){
            let quotation=quotationList[i];
            if(quotation.quotationStatus==="QUOTATION_ACCEPTED"){
            rowsUpdated=true;
            rows.push(
                <tr>   
                    <td><input type="button" class="btn btn-success" id={iter+"/"+quotation.quotationId} value="Selected quotation" onClick={(e)=>this.selectQuotationImage(e)}/></td>
                    <td>{quotation.companyName}</td>
                    <td>{quotation.city}</td>
                    <td>{quotation.contact}</td>
                    <td>{quotation.quotationPreparedBy}</td>
                    <td>{quotation.quotationDate.split("T")[0]}</td>
                    <td>{quotation.quotationValidityDate.split("T")[0]}</td>
                    <td>{quotation.itemDescription}</td>
                    <td>{quotation.quantity}</td>
                    <td>{quotation.unitPrice}</td>
                    <td>{quotation.tax}</td>
                    <td>{quotation.shippingCost}</td>
                    <td>{quotation.totalAmount}</td>
                    <td>{quotation.warranty}</td>
                    </tr>
            )
            }
        }
        if(rowsUpdated==false)
            rows.push(<tr ><td align="center" colSpan="5">No new records found!</td></tr>)
        return rows;
    }

    viewOtherQuotations=(e)=>{
        let reqId=e.target.id;
        let temp= this.state.reqList[reqId].filter( req => req.quotationStatus === "QUOTATION_ADDED" )
        let tempOtherQuoImages= temp.map( req => req.quotationImages[0])
        console.log(tempOtherQuoImages)
        this.setState({
            otherQuotations:temp,
            otherQuotationImages:tempOtherQuoImages
        })
    }

    viewPreImages=(e)=>{
        let reqId=e.target.id;
        let temp= this.state.reqList[reqId].filter( req => req.quotationStatus === "QUOTATION_ACCEPTED" )
        console.log(temp)
        this.setState({
            preImages:temp[0].requirement.preImages
        })
    }

    getContent=()=>{
        var content=[];
        let updated=false;
        let project=null;
        for(let i=0;i<this.props.location.school.projects.length;i++){
            if(this.props.location.school.projects[i].status==="PROJECT_CLOSED"){
              continue
            }
            else{
                project=this.props.location.school.projects[i];
              break;
            }
          }
          if(project === null){
            return
          }
        for(let i=0;i<project.requirements.length;i++){
            updated=true;
            let iter=project.requirements[i].requirementId;
            content.push(
                <div>
                <section className="content-header">
                    <h4>
                    Requirement:{project.requirements[i].assetName}
                    </h4>
                   
                    <button id={iter} type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-default1" onClick={(e)=>this.viewOtherQuotations(e)}>View Other Quotations</button>&nbsp;&nbsp;
                    <button id={iter} type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-default2" onClick={(e)=>this.viewPreImages(e)}>View Preimages</button>  
                    
                    
                    </section>
                    <section className="content">
                        <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                            <div className="box-header">
                            <h2 className="box-title">Selected quotation</h2>
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
                                    <th colSpan="1"></th>
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
                                    {project.requirements[i].requirementId!==null?this.createTable(iter):null}
                                    </tbody>
                                </table>
                            </div>                            
                        </div>
                    </div>
                </div>
              </section>
              </div>
            )
        }
        if(updated==false)
            content.push(<tr ><td align="center" colSpan="5">No new records found!</td></tr>)
        return content;
    }

    goToPrevSlide = () => {
        if (this.state.currentIndex === 0)
          return;
        this.setState(prevState => ({
          currentIndex: prevState.currentIndex - 1,
          translateValue: prevState.translateValue + this.slideWidth()
        }))
    }

    goToNextSlide = () => {
    // Exiting the method early if we are at the end of the images array.
    // We also want to reset currentIndex and translateValue, so we return
    // to the first image in the array.
    if (this.state.currentIndex === this.state.otherQuotations.length - 1) {
        return this.setState({
        currentIndex: 0,
        translateValue: 0
        })
    }

    // This will not run if we met the if condition above
    this.setState(prevState => ({
        currentIndex: prevState.currentIndex + 1,
        translateValue: prevState.translateValue + -(this.slideWidth())
    }));
    }

    goToNextSlide1 = () => {
        // Exiting the method early if we are at the end of the images array.
        // We also want to reset currentIndex and translateValue, so we return
        // to the first image in the array.
        if (this.state.currentIndex1 === this.state.preImages - 1) {
            return this.setState({
            currentIndex1: 0,
            translateValue1: 0
            })
        }
        this.setState(prevState => ({
            currentIndex1: prevState.currentIndex1 + 1,
            translateValue1: prevState.translateValue1 + -(this.slideWidth())
        }));
    }
    slideWidth = () => {
    return document.querySelector('.slide').clientWidth
    }

    render() {
        const Slide = ({ image }) => {
            const styles = {
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '50% 60%'
            }
            return <div className="slide" style={styles}></div>
          }
      
          const LeftArrow = (props) => {
            return (
              <div className="backArrow arrow" onClick={props.goToPrevSlide} >
                <i className="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
              </div>
            );
          }
      
          const RightArrow = (props) => {
            return (
              <div className="nextArrow arrow" onClick={props.goToNextSlide}>
                <i className="fa fa-arrow-right fa-2x" aria-hidden="true"></i>
              </div>
            );
          }
        return (
            <div>
            <div style={{fontSize:"large"}}>
                <div className="content-wrapper">
                    <h4>
                        School Name : {this.props.location.school.schoolInfo.schoolName}
                        
                    </h4>
                {this.state.getRequirementList?null:this.getContent()}
                <section className="content">
                <div className="row">
                    <div className="form-group has-feedback col-md-3">
                        <h4>  Total Amount : </h4>
                    </div>
                    <div className="form-group has-feedback col-md-6">
                        <input type="input" className="form-control" id="country" value={this.state.estimate} onChange={this.handleChange} disabled/>
                    </div>
                </div>

                <div className="row">
                                    <div className="col-xs-12">
                                    <div className="box">
                                        <div className="box-body table-responsive no-padding">
                                            <table className="table table-hover">
                                            <tbody>
                                            <tr>
                                                    <th>Admin Comments </th>
                                                    <th>Reviewer Comments </th>
                                                    <th>Approver Comments </th>
                                                </tr>
                                                <tr>
                                                    <td><textarea className="input-xlarge" ref ="comment" id="adminComments" value={this.state.adminComments} onChange={this.handleChange} rows="3"></textarea></td>
                                                    <td><textarea className="input-xlarge" ref ="comment" id="reviewerComments" value={this.state.reviewerComments} onChange={this.handleChange} rows="3"></textarea></td>
                                                    <td><textarea className="input-xlarge" ref ="comment" id="approverComments" value={this.state.approverComments} onChange={this.handleChange} rows="3"></textarea></td>
                                                </tr>
                                            </tbody></table>
                                            {this.state.errorMessage!=null?<div className="errorMessage" style={{color:"Red",textAlign:"center"}}>{this.state.errorMessage}</div>:null}
                                        </div>
                                        </div>
										</div>
                                        </div>

                <div className="row">
                    <div className="input-group-btn form-group has-feedback">
                        &nbsp;<button type="submit" className="btn btn-warning form-control" id="Accepted" onClick={(e)=>this.approveQuotation(e)}>Approve</button>
                    </div> 
                    <div className="input-group-btn">
                        <button type="submit" className="btn btn-danger form-control" id="Rejected" onClick={(e)=>this.approveQuotation(e)}>Reject</button>
                    </div>
                </div>
                {this.state.spinner?<div class="spinner"></div>:null}
                </section>
                <div className="modal" id="modal-default">
                      <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                Selected quotation
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModel}>
                                <span aria-hidden="true">×</span></button>
                            </div>
                            <div className="modal-body">
                            <div className="row">
                                <section className="content">
                                <img src={'data:image/png;base64,'+this.state.quotationImage} id ="image1" alt="" ></img>
                                </section>
                            </div>
                        </div>
                      </div>    
                    </div>
                </div>    
                <div className="modal" id="modal-default2">
                      <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModel}>
                                <span aria-hidden="true">×</span></button>
                            </div>
                            <div className="modal-body">
                            <div className="row">
                                <section className="content">
                                    {this.state.preImages!==null?<MultipleImage images={this.state.preImages}/>:null}
                               </section>
                            </div>
                        </div>
                      </div>    
                    </div>
                </div>    

                <div className="modal" id="modal-default1">
                      <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                Other quotations
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModel}>
                                <span aria-hidden="true">×</span></button>
                            </div>
                            <div className="modal-body">
                            {this.state.otherQuotationImages.length>0 ?<MultipleImage images={this.state.otherQuotationImages}/>:null}
                        </div>
                      </div>    
                    </div>
                </div>    
                
                </div>
            </div>
        </div>
        )
    }
}
export default withRouter(ViewSelectedQuotation);