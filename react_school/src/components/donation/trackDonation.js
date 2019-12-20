import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../css/School_registration.css';

import Tabs from '../Tabs/Tabs';


class TrackDonation extends Component {
    state = {
        responsePayLoad: null,
        trackingid:null
    };
    constructor(props) {
      super(props);
    }

    handleChange=({target})=> {
      this.setState({trackingid: target.value});
    }


    getResult=()=> {
      console.log(this.state.trackingid);
      fetch('http://localhost:6060/puthuyir/donation/'+this.state.trackingid)
         .then((response) => {
            this.setState({ responsePayLoad: response.data })
      })
    }


    render() {

      return (
         <div className="container">
            <div className="register-box-body">
                <p className="login-box-msg"><b>Enter Tracking Number</b></p>
                <div>
                    <div className="row">
                        <div className="form-group has-feedback col-md-6">
                        <input type="text"  value={this.state.trackingid} onChange={this.handleChange}></input>
                        <span className="glyphicon glyphicon-user form-control-feedback" />
                        </div>
                        <div className="form-group has-feedback col-md-6">
                        <input type="checkbox" className="form-control" /> 
                        <span className="login-box-msg"><b>With school Progress</b></span>
                    </div>
                </div>
                <button onClick = {this.getResult}>Submit</button><button >BACK</button>
            </div>
            </div>

            <section>
               <div className="row">
                  <div className="span8">
                     <form action="Confirmation_to_add_school.html" className="form-horizontal">
                        <fieldset>
                           <legend>Provide school details along with requirements</legend>

                           {/* <Tabs>
                              <div label="Actual Requirements">
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

                                                {this.state.responsePayLoad!==null?this.state.responsePayLoad.requirements.map((value, index) => {
                                                   return <tr>
                                                      <td>{index}</td>
                                                      <td>{this.state.responsePayLoad.requirements[index].assetName}</td>
                                                      <td>{this.state.responsePayLoad.requirements[index].quantity}</td>
                                                      <td>Coming soon</td>
                                                   </tr>
                                                }):null}

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
                                            <h3 class="display-3">So far we collected {this.state.responsePayLoad.collectedAmt}, and your donation is {this.state.responsePayLoad.amt}.
                                            Estimated amount to complete this project is {this.state.responsePayLoad.estimatedAmt}.</h3>       
                                       </div>
                                    </div>
                                 </div>
                              </div> 
                           </Tabs> */}

                           <div class="form-actions">
                              <button type="submit" class="btn send_btn">Submit</button>
                              <button class="btn dark_btn">Cancel</button>
                           </div>
                        </fieldset>
                     </form>

                  </div>
               </div>
            </section>
         </div>
      )
   }
}
export default withRouter(TrackDonation);