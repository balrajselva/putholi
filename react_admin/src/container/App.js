import React, {Component} from 'react';
import './App.css';
import {withRouter,Router,Switch} from 'react-router-dom';
import history from './history';
import axios from 'axios';

import Route from 'react-router-dom/Route';
import SponsorLayout from '../adminWebsite/components/layouts/SponsorLayout';
import AdminLayout from '../adminWebsite/components/layouts/AdminLayout';
import AdminNewSchoolReview from '../adminWebsite/adminNewSchoolReview';
import AdminAccessReview from '../adminWebsite/adminAccessReview';
import UserReport from '../adminWebsite/userReport';
import VendorReport from '../adminWebsite/vendorReport';
import AdminRoleCheck from '../adminWebsite/adminRoleCheck';
import UserManagement from '../adminWebsite/userManagement';
import TrustRegister from '../adminWebsite/trustRegister';
import TrustLogin from '../adminWebsite/trustLogin';
import VolunteerRegister from '../adminWebsite/VolunteerRegister';
import AdminPendingWorkflow from '../adminWebsite/adminPendingWorkflow';
import SchoolReport from '../adminWebsite/schoolReport';
import AdminSchoolCheck from '../adminWebsite/adminSchoolCheck';
import ReferVolunteer from '../adminWebsite/ReferVolunteer';
import ConfirmatinScreen from '../adminWebsite/confirmationScreen';
import TrustMemberScreen from '../adminWebsite/TrustMemberScreen';
import AdminUploadDEOresponse from '../adminWebsite/adminUploadDEOresponse';
import DEOEmailTrigger from '../adminWebsite/EmailDEOTrigger';
import AssignToVolunteer from '../adminWebsite/AssignToVolunteer';
import VolunteerLayout from '../adminWebsite/components/layouts/VolunteerLayout';
import ReviewerLayout from '../adminWebsite/components/layouts/ReviewerLayout';
import ApproverLayout from '../adminWebsite/components/layouts/ApproverLayout';
import VolunteerSchoolCheck from '../adminWebsite/VolunteerSchoolCheck';
import VolunteerSchoolReview from '../adminWebsite/VolunteerSchoolReview';
import RequirementHome from '../adminWebsite/requirement';
import Payment from '../adminWebsite/payment';
import ReviewQuotation from '../adminWebsite/components/quotation/reviewQuotation';
import ReviewerPendingWorkflow from '../adminWebsite/reviewerPendingWorkflow';
import ApproverPendingWorkflow from '../adminWebsite/approverPendingWorkflow';
import ViewSelectedQuotation from '../adminWebsite/ViewSelectedQuotation';
import FundAllotment from '../adminWebsite/FundAllotment';
import AdminInitiateWorkOrder from '../adminWebsite/AdminInitiateWorkOrder';
import AddInvoice from '../adminWebsite/components/invoice/AddInvoice';
import ReassignVolunteer from '../adminWebsite/ReassignVolunteer';
import AdminInvoiceReview from '../adminWebsite/AdminInvoiceReview';
import ReviewerInvoiceReview from '../adminWebsite/ReviewerInvoiceReview';
import AdminInvoiceCheck from '../adminWebsite/AdminInvoiceCheck';
import EmailDEOTrigger from '../adminWebsite/EmailDEOTrigger';
import SuperAdminLayout from '../adminWebsite/components/layouts/SuperAdminLayout';
import UploadReceipt from '../adminWebsite/components/receipt/UploadReceipt';
import ReviewReceipts from '../adminWebsite/components/receipt/ReviewReceipts';
import NewUserLoginConfirmation from '../adminWebsite/NewUserLoginConfirmation';
import RejectedUser from '../adminWebsite/RejectedUser';
import ReviewDeoResponse from '../adminWebsite/ReviewDeoResponse';

class App extends Component {
  state = {
    user:"",
    spinner:false
  }

  constructor(props){
    super(props);
    this.state={config:"http://localhost:6060/putholi"}
  }

  saveUser=(regFormModel)=>{
    this.setState({user:regFormModel.get("payload"),spinner:true});
    axios.post(this.state.config+'/user',regFormModel,{
      headers:{'Content-Type':'multipart/form-data'}
    })
    .then(res=>{
        console.log(res);
        this.setState({spinner:false});
        if(res.data.role!=="Volunteer"){
          history.push({
            pathname: '/payment',
            currentUser: res.data,
          });
        }
        else{
          history.push("/confirmation");
        }
    })
    .catch(error=>{
      window.alert("Registration failed due to "+error);
      this.setState({spinner:false});
    })
  }
  
  render(){
    const AdminLayoutRoute=({component:Component,...rest})=>{
      return(
        <Route {...rest} render={props=>(
          <AdminLayout {...props}>
            <Component {...props}/>
          </AdminLayout>
        )}/>
      )
    }
    const ReviewerLayoutRoute=({component:Component,...rest})=>{
      return(
        <Route {...rest} render={props=>(
          <ReviewerLayout {...props}>
            <Component {...props}/>
          </ReviewerLayout>
        )}/>
      )
    }
    const ApproverLayoutRoute=({component:Component,...rest})=>{
      return(
        <Route {...rest} render={props=>(
          <ApproverLayout {...props}>
            <Component {...props}/>
          </ApproverLayout>
        )}/>
      )
    }
    const SponsorLayoutRoute=({component:Component,...rest})=>{
      return(
        <Route {...rest} render={props=>(
          <SponsorLayout {...props}>
            <Component {...props}/>
          </SponsorLayout>
        )}/>
      )
    }
    const VolunteerLayoutRoute=({component:Component,...rest})=>{
      return(
        <Route {...rest} render={props=>(
          <VolunteerLayout {...props}>
            <Component {...props}/>
          </VolunteerLayout>
        )}/>
      )
    }
    const SuperAdminLayoutRoute=({component:Component,...rest})=>{
      return(
        <Route {...rest} render={props=>(
          <SuperAdminLayout {...props}>
            <Component {...props}/>
          </SuperAdminLayout>
        )}/>
      )
    }
    return (
      <div>   
        <Router history={history} config={this.state.config}>
          <Switch config={this.state.config}>
            <Route path="/confirmation" component={()=><ConfirmatinScreen config={this.state.config}/>}/>
            <Route path="/trustRegister" history={history}component={()=><TrustRegister saveUser={(user)=>this.saveUser(user)} config={this.state.config}/>}/>
            <Route path="/newUserLoginConfirm" component={()=><NewUserLoginConfirmation/>}/>
            <Route path="/rejectedUser" component={()=><RejectedUser/>}/>
            <Route exact path="/login" history={history} component={()=><TrustLogin config={this.state.config}/>}/>
            <Route path="/emailDEO/:schoolID"  component={()=><DEOEmailTrigger config={this.state.config}/>}/>
            <Route path="/volunteerRegister" history={history} component={(props)=><VolunteerRegister saveUser={(user)=>this.saveUser(user)}{...props}{...this.props} config={this.state.config}/>}/>
            <Route path="/payment" history={history} component={(props)=><Payment {...props}{...this.props} config={this.state.config}/>}/>
            <SuperAdminLayoutRoute path="/superAdminAccessReview" history={history} component={(props)=><AdminAccessReview {...props} config={this.state.config}/>}/>
            <SuperAdminLayoutRoute path="/superUserAccessReview" history={history} component={(props)=><AdminAccessReview {...props} config={this.state.config}/>}/>
            <SuperAdminLayoutRoute path="/superAdminRoleCheck" history={history} component={(props)=><AdminRoleCheck {...props} config={this.state.config}/>}/>
            <SuperAdminLayoutRoute path="/superUserRoleCheck" history={history} component={(props)=><AdminRoleCheck {...props} config={this.state.config}/>}/>
            <AdminLayoutRoute path="/reassignVolunteer" history={history} component={(props)=><ReassignVolunteer {...props}{...this.props} config={this.state.config}/>}/>            
            <AdminLayoutRoute path="/adminNewSchoolReview" history={history} component={(props)=><AdminNewSchoolReview {...props} config={this.state.config}/>} />
            <AdminLayoutRoute path="/adminPendingWorkflow" history={history} component={(props)=><AdminPendingWorkflow {...props} config={this.state.config}/>}/>
            <AdminLayoutRoute path="/schoolReport" history={history} component={(props)=><SchoolReport {...props} config={this.state.config}/>}/>
            <AdminLayoutRoute path="/accessReview" history={history} component={(props)=><AdminAccessReview {...props} config={this.state.config}/>}/>
            <AdminLayoutRoute path="/userReport" history={history} component={(props)=><UserReport {...props} config={this.state.config}/>}/>
            <AdminLayoutRoute path="/vendorReport" history={history} component={(props)=><VendorReport {...props} config={this.state.config}/>}/>
            <AdminLayoutRoute path="/adminSchoolCheck" history={history} component={(props)=><AdminSchoolCheck {...props} config={this.state.config}/>}/>
            <AdminLayoutRoute path="/adminRoleCheck" history={history} component={(props)=><AdminRoleCheck {...props} config={this.state.config}/>}/>
            <AdminLayoutRoute path="/userManagement" history={history} component={(props)=><UserManagement {...props} config={this.state.config}/>}/>
            <AdminLayoutRoute path="/adminUploadDEOresponse" history={history} component={(props)=><AdminUploadDEOresponse {...props} config={this.state.config}/>}/>
            <AdminLayoutRoute path="/assignToVolunteer" history={history} component={(props)=><AssignToVolunteer {...props} config={this.state.config}/>}/>
            <AdminLayoutRoute exact path="/reviewQuotation" component={(props)=><ReviewQuotation {...props} config={this.state.config}/>}/>
            <AdminLayoutRoute exact path="/fundAllotment" component={(props)=><FundAllotment {...props} config={this.state.config}/>}/>
            <AdminLayoutRoute exact path="/workOrder" component={(props)=><AdminInitiateWorkOrder {...props} config={this.state.config}/>}/>
            <AdminLayoutRoute exact path="/reviewInvoice" component={(props)=><AdminInvoiceReview {...props} config={this.state.config}/>}/>
            <AdminLayoutRoute exact path="/adminInvoiceCheck" component={(props)=><AdminInvoiceCheck {...props} config={this.state.config}/>}/>
            <AdminLayoutRoute exact path="/adminDEOtrigger" component={(props)=><EmailDEOTrigger {...props} config={this.state.config}/>}/>
            <AdminLayoutRoute exact path="/reviewReceipts" component={(props)=><ReviewReceipts {...props} config={this.state.config}/>}/>
            <ReviewerLayoutRoute exact path="/reviewerInvoiceCheck" component={(props)=><AdminInvoiceCheck {...props} config={this.state.config}/>}/>
            <ApproverLayoutRoute exact path="/approverInvoiceCheck" component={(props)=><AdminInvoiceCheck {...props} config={this.state.config}/>}/>
            <SponsorLayoutRoute path="/trustMemberScreen" history={history} component={(props)=><TrustMemberScreen {...props} config={this.state.config}/>}/>
            <SponsorLayoutRoute path="/referVolunteer" history={history} component={(props)=><ReferVolunteer {...props} config={this.state.config}/>}/>
            <VolunteerLayoutRoute path="/volunteerSchoolCheck" history={history} component={(props)=><VolunteerSchoolCheck {...props} config={this.state.config}/>}/>
            <VolunteerLayoutRoute path="/volunteerSchoolReview" history={history} component={(props)=><VolunteerSchoolReview {...props} config={this.state.config}/>}/>
            <VolunteerLayoutRoute path="/viewRequirements" history={history} component={(props)=><RequirementHome {...props} config={this.state.config}/>}/>
            <VolunteerLayoutRoute path="/addInvoice" history={history} component={(props)=><AddInvoice {...props} config={this.state.config}/>}/>
            <VolunteerLayoutRoute path="/uploadReceipt" history={history} component={(props)=><UploadReceipt {...props} config={this.state.config}/>}/>
            <ReviewerLayoutRoute exact path="/reviewer" component={(props)=><ReviewerPendingWorkflow {...props} config={this.state.config}/>}/>
            <ReviewerLayoutRoute exact path="/reviewerInvoiceReview" component={(props)=><ReviewerInvoiceReview {...props} config={this.state.config}/>}/>
            <ReviewerLayoutRoute exact path="/approverInvoiceReview" component={(props)=><ReviewerInvoiceReview {...props} config={this.state.config}/>}/>
            <ReviewerLayoutRoute path="/reviewerApproveQuotation" component={(props)=><ViewSelectedQuotation {...props} config={this.state.config}/>}/>
            <ReviewerLayoutRoute path="/reviewerSchoolCheck" history={history} component={(props)=><AdminSchoolCheck {...props} config={this.state.config}/>}/>
            <ReviewerLayoutRoute path="/reviewerRoleCheck" history={history} component={(props)=><AdminRoleCheck {...props} config={this.state.config}/>}/>
            <ReviewerLayoutRoute path="/reviewerApproveInvoice" history={history} component={(props)=><ReviewerInvoiceReview {...props} config={this.state.config}/>}/>
            <ReviewerLayoutRoute path="/reviewerAccessReview" history={history} component={(props)=><AdminAccessReview {...props} config={this.state.config}/>}/>
            <ReviewerLayoutRoute path="/reviewerReviewDEO" history={history} component={(props)=><ReviewDeoResponse {...props} config={this.state.config}/>}/>
            <ApproverLayoutRoute path="/approverAccessReview" history={history} component={(props)=><AdminAccessReview {...props} config={this.state.config}/>}/>
            <ApproverLayoutRoute path="/approverReviewQuotation" component={(props)=><ViewSelectedQuotation {...props} config={this.state.config}/>}/>
            <ApproverLayoutRoute path="/approverSchoolCheck" history={history} component={(props)=><AdminSchoolCheck {...props} config={this.state.config}/>}/>
            <ApproverLayoutRoute path="/approver" component={(props)=><ApproverPendingWorkflow {...props} config={this.state.config}/>}/>
            <ApproverLayoutRoute path="/approverRoleCheck" history={history} component={(props)=><AdminRoleCheck {...props} config={this.state.config}/>}/>
            <ApproverLayoutRoute path="/approveInvoice" history={history} component={(props)=><ReviewerInvoiceReview {...props} config={this.state.config}/>}/>
          </Switch>
        </Router>
        {this.state.spinner?<div class="spinner"></div>:null}
      </div>
    );
  }
}

export default withRouter(App);
