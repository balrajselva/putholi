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
import AdminRoleCheck from '../adminWebsite/adminRoleCheck';
import TrustRegister from '../adminWebsite/trustRegister';
import TrustLogin from '../adminWebsite/trustLogin';
import VolunteerRegister from '../adminWebsite/VolunteerRegister';
import AdminPendingWorkflow from '../adminWebsite/adminPendingWorkflow';
import AdminSchoolCheck from '../adminWebsite/adminSchoolCheck';
import ReferVolunteer from '../adminWebsite/ReferVolunteer';
import ConfirmatinScreen from '../adminWebsite/confirmationScreen';
import TrustMemberScreen from '../adminWebsite/TrustMemberScreen';
import AdminUploadDEOresponse from '../adminWebsite/adminUploadDEOresponse';
import DEOEmailTrigger from '../adminWebsite/emailDEOTrigger';
import AssignToVolunteer from '../adminWebsite/AssignToVolunteer';
import VolunteerLayout from '../adminWebsite/components/layouts/VolunteerLayout';
import ReviewerLayout from '../adminWebsite/components/layouts/ReviewerLayout';
import ApproverLayout from '../adminWebsite/components/layouts/ApproverLayout';
import VolunteerSchoolCheck from '../adminWebsite/VolunteerSchoolCheck';
import VolunteerSchoolReview from '../adminWebsite/VolunteerSchoolReview';
import RequirementHome from '../adminWebsite/requirement';
import AddQuotation from '../adminWebsite/quotation';
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

class App extends Component {
  state = {
    user:"",
    spinner:false
  }

  constructor(props){
    super(props);
    this.state={config:"http://localhost:6060"}
  }

  saveUser=(regFormModel)=>{
    this.setState({user:regFormModel.get("payload"),spinner:true});
    axios.post(this.state.config+'/puthuyir/user',regFormModel,{
      headers:{'Content-Type':'multipart/form-data'}
    })
    .then(res=>{
        console.log(res);
        this.setState({spinner:false});
        // history.push("/confirmation");
        if(res.data.role!=="Volunteer"){
          history.push({
            pathname: '/payment',
            currentUser: res.data,
          });
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
    return (
      <div>   
        <Router history={history}>
          <Switch config={this.state.config}>
            <Route path="/confirmation" component={()=><ConfirmatinScreen/>}/>
            <Route path="/trustRegister" history={history}component={()=><TrustRegister saveUser={(user)=>this.saveUser(user)}/>}/>}/>
            <Route exact path="/login" history={history} component={()=><TrustLogin config={this.state.config}/>}/>
            <Route path="/emailDEO/:schoolID"  component={()=><DEOEmailTrigger/>}/>
            <Route path="/volunteerRegister" history={history} component={(props)=><VolunteerRegister saveUser={(user)=>this.saveUser(user)}{...props}{...this.props}/>}/>
            <Route path="/payment" history={history} component={(props)=><Payment {...props}{...this.props}/>}/>
            <AdminLayoutRoute path="/reassignVolunteer" history={history} component={(props)=><ReassignVolunteer {...props}{...this.props}/>}/>            
            <AdminLayoutRoute path="/adminNewSchoolReview" history={history} component={(props)=><AdminNewSchoolReview {...props}/>} />
            <AdminLayoutRoute path="/adminPendingWorkflow" history={history} component={(props)=><AdminPendingWorkflow {...props}/>}/>
            <AdminLayoutRoute path="/accessReview" history={history} component={(props)=><AdminAccessReview {...props}/>}/>
            <AdminLayoutRoute path="/adminSchoolCheck" history={history} component={(props)=><AdminSchoolCheck {...props}/>}/>
            <AdminLayoutRoute path="/adminRoleCheck" history={history} component={(props)=><AdminRoleCheck {...props}/>}/>
            <AdminLayoutRoute path="/adminUploadDEOresponse" history={history} component={(props)=><AdminUploadDEOresponse {...props}/>}/>
            <AdminLayoutRoute path="/assignToVolunteer" history={history} component={(props)=><AssignToVolunteer {...props}/>}/>
            <AdminLayoutRoute exact path="/reviewQuotation" component={(props)=><ReviewQuotation {...props}/>}/>
            <AdminLayoutRoute exact path="/fundAllotment" component={(props)=><FundAllotment {...props}/>}/>
            <AdminLayoutRoute exact path="/workOrder" component={(props)=><AdminInitiateWorkOrder {...props}/>}/>
            <AdminLayoutRoute exact path="/reviewInvoice" component={(props)=><AdminInvoiceReview {...props}/>}/>
            <SponsorLayoutRoute path="/trustMemberScreen" history={history} component={(props)=><TrustMemberScreen {...props}/>}/>
            <SponsorLayoutRoute path="/referVolunteer" history={history} component={(props)=><ReferVolunteer {...props}/>}/>}/>
            <VolunteerLayoutRoute path="/volunteerSchoolCheck" history={history} component={(props)=><VolunteerSchoolCheck {...props}/>}/>}/>
            <VolunteerLayoutRoute path="/volunteerSchoolReview" history={history} component={(props)=><VolunteerSchoolReview {...props}/>}/>}/>
            <VolunteerLayoutRoute path="/viewRequirements" history={history} component={(props)=><RequirementHome {...props}/>}/>}/>
            <VolunteerLayoutRoute path="/addQuotation" history={history} component={(props)=><AddQuotation {...props}/>}/>}/>
            <VolunteerLayoutRoute path="/addInvoice" history={history} component={(props)=><AddInvoice {...props}/>}/>}/>
            <ReviewerLayoutRoute exact path="/reviewer" component={(props)=><ReviewerPendingWorkflow {...props}/>}/>
            <ReviewerLayoutRoute exact path="/reviewerInvoiceReview" component={(props)=><ReviewerInvoiceReview {...props}/>}/>
            <ApproverLayoutRoute path="/approver" component={(props)=><ApproverPendingWorkflow {...props}/>}/>
            <ReviewerLayoutRoute path="/reviewerApproveQuotation" component={(props)=><ViewSelectedQuotation {...props}/>}/>
            <ReviewerLayoutRoute path="/reviewerAccessReview" history={history} component={(props)=><AdminAccessReview {...props}/>}/>
            <ApproverLayoutRoute path="/approverAccessReview" history={history} component={(props)=><AdminAccessReview {...props}/>}/>
            <ApproverLayoutRoute path="/approverReviewQuotation" component={(props)=><ViewSelectedQuotation {...props}/>}/>
            <ApproverLayoutRoute path="/approverSchoolCheck" history={history} component={(props)=><AdminSchoolCheck {...props}/>}/>
            <ReviewerLayoutRoute path="/reviewerSchoolCheck" history={history} component={(props)=><AdminSchoolCheck {...props}/>}/>
            <ApproverLayoutRoute path="/approverRoleCheck" history={history} component={(props)=><AdminRoleCheck {...props}/>}/>
            <ReviewerLayoutRoute path="/reviewerRoleCheck" history={history} component={(props)=><AdminRoleCheck {...props}/>}/>
            <ReviewerLayoutRoute path="/reviewerApproveInvoice" history={history} component={(props)=><ReviewerInvoiceReview {...props}/>}/>
            <ApproverLayoutRoute path="/approveInvoice" history={history} component={(props)=><ReviewerInvoiceReview {...props}/>}/>
          </Switch>
        </Router>
        {this.state.spinner?<div class="spinner"></div>:null}
      </div>
    );
  }
}

export default withRouter(App);
