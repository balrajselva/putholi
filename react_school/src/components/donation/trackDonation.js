import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../css/School_registration.css';
import MultipleImage from '../multipleImage/MultipleImage';
import Tabs from '../Tabs/Tabs';


class TrackDonation extends Component {
   state = {
      amt: null,
      collectedAmt: null,
      estimatedAmt: null,
      requirements: [],
      trackingid: null,
      balanceamt:null,
      imageModal:"none",
      preImages:[]
   };
   constructor(props) {
      super(props);
   }

   handleChange = ({ target }) => {
      this.setState({ trackingid: target.value });
   }

   getResult = () => {
      //fetch(this.props.config+'/donation/' + this.state.trackingid)
      // .then((response) => {
      //  this.setState({ responsePayLoad: 'pressed' }, () => console.log(response));
      //})

      fetch(this.props.config+'/donation/' + this.state.trackingid).
         then(response => response.json()).
         then((repos) => {
            this.setState({
               amt: repos.amt,
               collectedAmt: repos.collectedAmt,
               estimatedAmt: repos.estimatedAmt,
               balanceamt:repos.balanceamt,
               requirements: repos.requirements,
            }, () => console.log(this.state));
         });
   }

   viewPreImages=(e)=>{
      let reqId=e.target.value;
      console.log(reqId)
      let temp= this.state.requirements.filter( req => req.requirementId+"" === reqId+"" )
      console.log(temp)
      this.setState({
          preImages:temp[0].preImages,
          imageModal:"block"
      })
  }

  closeModel=()=>{
     this.setState({imageModal:"none"})
  }
   render() {
      return (
         <div className="container">
            <div className="register-box-body">
               <p className="login-box-msg"><b>Enter Tracking Number</b></p>
               <div>
                  <div className="row">
                     <div className="form-group has-feedback col-md-6">
                        <input type="text" value={this.state.trackingid} onChange={this.handleChange}></input>
                        <span className="glyphicon glyphicon-user form-control-feedback" />
                     </div>
                     <div className="form-group has-feedback col-md-6">
                        <input type="checkbox" className="form-control" />
                        <span className="login-box-msg"><b>With school Progress</b></span>
                     </div>
                  </div>
                  <button onClick={this.getResult}>Submit</button><button >BACK</button>
               </div>
            </div>
            <section>
               <div className="row">
                  <div className="span8">
                     <form action="" className="form-horizontal">
                        <fieldset>
                           <legend>Provide school details along with requirements</legend>
                           <Tabs>
                              <div label="School's Actual Requirements">
                                 <div className="row">
                                    <div className="span10">
                                       <div className="control-group">
                                          <table className="table table-bordered table-striped">
                                             <thead>
                                                <tr>
                                                   <th>S.No</th>
                                                   <th>Requirements</th>
                                                   <th>Units</th>
                                                   <th>Pre-Work Images</th>
                                                </tr>
                                             </thead>
                                             <tbody>
                                                {(this.state.requirements !== null) ? this.state.requirements.map((value, index) => {
                                                   return <tr>
                                                      <td>{index+1}</td>
                                                      <td>{this.state.requirements[index].assetName}</td>
                                                      <td>{this.state.requirements[index].quantity}</td>
                                                      <td>
                                                         <button type='button' value={this.state.requirements[index].requirementId} onClick={(e)=>this.viewPreImages(e)} data-toggle="modal" data-target="#modal-default">Open</button>
                                                      </td>
                                                      
                                                   </tr>

                        
                                                }) : null}
s
                                                
                                             </tbody>
                                          </table>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div label="Fund Raised Details">
                                 <div className="row">
                                    <div className="span10">
                                       <div className="control-group">

                                          <table className="table table-bordered table-striped">
                                             <thead>
                                                <tr>
                                                   <th>S.No</th>
                                                   <th>Description</th>
                                                   <th>Amount</th>
                                                   <th>Current Status</th>
                                                   <th>Comments</th>
                                                </tr>
                                             </thead>
                                             <tbody>
                                                <tr>
                                                   <td>1</td>
                                                   <td>Total Amount Estimated</td>
                                                   <td>{this.state.estimatedAmt}</td>
                                                   <td>Found Fully Collected</td>
                                                   <td>Thanks for your contribution</td>
                                                </tr>
                                                <tr>
                                                   <td>2</td>
                                                   <td>Your Contribution</td>
                                                   <td>{this.state.amt}</td>
                                                   <td>Deposited</td>
                                                   <td>Thanks for your contribution</td>
                                                </tr>
                                                <tr>
                                                   <td>3</td>
                                                   <td>Other Donor Contribution</td>
                                                   <td>{this.state.collectedAmt}</td>
                                                   <td>Deposited</td>
                                                   <td>Thanks for your contribution</td>
                                                </tr>
                                                <tr>
                                                      <td>4</td>
                                                      <td>Other Donor Contribution</td>
                                                      <td>{this.state.balanceamt}</td>
                                                      <td>Partially Collected</td>
                                                      <td>Click here to Donate</td>
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
            <div style={{ display: this.state.imageModal }}>
            <div className="modal">
                      <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                Pre work images
                            <button type="button" className="close" aria-label="Close" onClick={this.closeModel}>
                                <span aria-hidden="true">×</span></button>
                            </div>
                            <div className="modal-body">
                            {this.state.preImages.length>0 ?<MultipleImage images={this.state.preImages}/>:null}
                        </div>
                      </div>    
                    </div>
                </div>    
                </div>
         </div>
      )
   }
}
export default withRouter(TrackDonation);