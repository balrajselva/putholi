import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../css/School_registration.css';

import Tabs from '../Tabs/Tabs';
import axios from 'axios';

import ReactDOM from 'react-dom';

import '../../css/modal.css'
import './donation_style.css'

class TrackDonation extends Component {
   state = {
      amt: null,
      collectedAmt: null,
      estimatedAmt: null,

      percentage: 0,
      currentIndex: 0,
      translateValue: 0,
      requirements: [],
      expenses: [],
      quotations: [],
      trackingid: null,
      balanceamt: null,
      imageList: [],
      show: false,
      reqId: 0,
      quotationId:0
   };
   constructor(props) {
      super(props);
   }

   showQutotation = ({target}) => {
      this.setState({ quotationId: target.value }, () => {
         this.state.quotations.map((value) => {
            if (this.state.quotationId == value.quotationId) {
               this.setState({ imageList: value.imageDetails });
            }
         })
      });
      this.setState({ show: true });
   };

   showPreImgDetails = ({ target }) => {
      this.setState({ reqId: target.value }, () => {
         this.state.requirements.map((value) => {
            if (this.state.reqId == value.requirementId) {
               this.setState({ imageList: value.imageDetails });
            }
         })
      });
      this.setState({ show: true });
   }


   showPostImgDetails = ({ target }) => {
      this.setState({ reqId: target.value }, () => {
         this.state.requirements.map((value) => {
            if (this.state.reqId == value.requirementId) {
               this.setState({ imageList: value.postImplImageDetails });
            }
         })
      });
    this.setState({ show: true });
   }

   hideModal = () => {
      this.setState({ show: false });
   }

   fileSelectedHandler = (event) => {
      this.fileUploadHandler(event);
   }

   fileUploadHandler = (event) => {
      const fd = new FormData();
      const files = event.target.files;
      var i = 0;
      while (i < files.length) {
         fd.append('files', files[i]);
         i++;
      }
      fd.append('imguplmodule', 'requirements');
      fd.append('moduleid', '1');

      axios.post("http://localhost:6060/puthuyir/uploadImages", fd, {
         headers: { 'content-type': `multipart/form-data; boundary=${fd._boundary}` }
      })
         .then(res => {
            console.log(res.data);
            alert(res.data);
         })

   }

   handleChange = ({ target }) => {
      this.setState({ trackingid: target.value });
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
      console.log(this.state.imageList.length);

      if (this.state.currentIndex === this.state.imageList.length - 1) {
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

   slideWidth = () => {
      return document.querySelector('.slide').clientWidth
   }

   getResult = () => {
      fetch('http://localhost:6060/puthuyir/donation/' + this.state.trackingid).
         then(response => response.json()).
         then((repos) => {
            console.log(repos);
            this.setState({
               amt: repos.amt,
               collectedAmt: repos.collectedAmt,
               estimatedAmt: repos.estimatedAmt,
               balanceamt: repos.balanceamt,
               translateValue: 0,
               requirements: repos.requirements,
               //imageList: repos.requirements[1].imageDetails,
               expenses: repos.expenses,
               quotations: repos.quotations,
            }, () => console.log(this.state.amt));
         });
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

      const images = require.context('../../img', true);
      return (

         <div className="container">

            <Modal show={this.state.show} handleClose={this.hideModal} >
               <div className="wrap">
                  <div className="container">
                     <div className="row pad25">
                        <div className="span8">

                           <div className="slider">
                              <div className="slider-wrapper"
                                 style={{
                                    transform: `translateX(${this.state.translateValue}px)`,
                                    transition: 'transform ease-out 0.45s'
                                 }}>
                                 {this.state.imageList.map((value, index) =>

                                    <Slide key={index} image={images(value.filePath)} />

                                 )}
                              </div>
                              <LeftArrow
                                 goToPrevSlide={this.goToPrevSlide}
                              />

                              <RightArrow
                                 goToNextSlide={this.goToNextSlide}
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </Modal>

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
                                                      <td>{index}</td>
                                                      <td>{this.state.requirements[index].assetName}</td>
                                                      <td>{this.state.requirements[index].quantity}</td>
                                                      <td>
                                                         <button type='button' value={this.state.requirements[index].requirementId} onClick={this.showPreImgDetails}>Open</button>
                                                      </td>
                                                   </tr>
                                                }) : null}
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
                                                   <td>???</td>
                                                   <td>???</td>
                                                </tr>
                                                <tr>
                                                   <td>2</td>
                                                   <td>?????</td>
                                                   <td>{this.state.amt}</td>
                                                   <td>Deposited</td>
                                                   <td>Thanks for your contribution</td>
                                                </tr>
                                                <tr>
                                                   <td>3</td>
                                                   <td>Balance Amount</td>
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

                              <div label="Expense Details">
                                 <div className="row">
                                    <div className="span10">
                                       <div className="control-group">

                                          <table className="table table-bordered table-striped">
                                             <thead>
                                                <tr>
                                                   <th>Requirement List</th>
                                                   <th>Units</th>
                                                   <th>Amount Spent</th>
                                                   <th>Current Status</th>
                                                   <th>Comments</th>
                                                </tr>
                                             </thead>

                                             <tbody>
                                                {(this.state.expenses !== null) ? this.state.expenses.map((value, index) => {
                                                   return <tr>
                                                      <td>{this.state.expenses[index].assetName}</td>
                                                      <td>{this.state.expenses[index].quantity}</td>
                                                      <td>{this.state.expenses[index].amtSpent}</td>
                                                      <td>{this.state.expenses[index].status}</td>
                                                      <td>{this.state.expenses[index].comments}</td>
                                                   </tr>
                                                }) : null}
                                             </tbody>

                                          </table>

                                       </div>
                                    </div>
                                 </div>
                              </div>

                              <div label="Receipt/Bills">
                                 <div className="row">
                                    <div className="span10">
                                       <div className="control-group">

                                          <table className="table table-bordered table-striped">
                                             <thead>
                                                <tr>
                                                   <th>Requirement List</th>
                                                   <th>Units</th>
                                                   <th>Vendor Name</th>
                                                   <th>Quotation Amount</th>
                                                   <th>Invoice Amount</th>
                                                   <th>Payment Status</th>
                                                   <th>View Receipt/Bills</th>
                                                </tr>
                                             </thead>
                                             <tbody>
                                                {(this.state.quotations !== null) ? this.state.quotations.map((value, index) => {
                                                   return <tr>
                                                      <td>{this.state.quotations[index].itemDescription}</td>
                                                      <td>{this.state.quotations[index].quantity}</td>
                                                      <td>{this.state.quotations[index].companyName}</td>
                                                      <td>{this.state.quotations[index].invoiceAmout}</td>
                                                      <td>{this.state.quotations[index].itemDescription}</td>
                                                      <td>????</td>
                                                      <td>
                                                         <button type='button' value={this.state.quotations[index].quotationId} onClick={this.showQutotation}>Click here to see images</button>
                                                      </td>
                                                   </tr>
                                                }) : null}
                                             </tbody>
                                          </table>
                                       </div>
                                    </div>
                                 </div>
                              </div>

                              <div label="Project Completion">
                                 <div className="row">
                                    <div className="span10">
                                       <div className="control-group">
                                          <table className="table table-bordered table-striped">
                                             <thead>
                                                <tr>
                                                   <th>Requirement List</th>
                                                   <th>Units</th>
                                                   <th>Requested Date</th>
                                                   <th>Current Status</th>
                                                   <th>View Post Implementation Pictures</th>
                                                   <th>Comments</th>
                                                </tr>
                                             </thead>
                                             <tbody>
                                                {(this.state.requirements !== null) ? this.state.requirements.map((value, index) => {
                                                   return <tr>
                                                      <td>{this.state.requirements[index].assetName}</td>
                                                      <td>{this.state.requirements[index].quantity}</td>
                                                      <td>???</td>
                                                      <td>???</td>
                                                      <td>
                                                         <button type='button' value={this.state.requirements[index].requirementId} onClick={this.showPostImgDetails}>Open</button>
                                                      </td>
                                                      <td>All are Completed</td>
                                                   </tr>
                                                }) : null}
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
         </div>

      )
   }
}

const Modal = ({ handleClose, show, children }) => {
   const showHideClassName = show ? 'modal-main display-block' : 'modal-main display-none';

   return (
      <div className={showHideClassName}>
         <section className='modal-main'>
            {children}
            <button
               onClick={handleClose}
            >
               Close
         </button>
         </section>
      </div>
   );
};

export default withRouter(TrackDonation);


/*<td>
<input type="file"
   style={{ display: 'none' }}
   onChange={this.fileSelectedHandler}
   multiple="multiple"
   ref={fileInput => this.fileInput = fileInput} />
<a href="#" onClick={(event) => {
   event.preventDefault();
   this.fileInput.click();
}
}>Click Me</a>
</td>*/