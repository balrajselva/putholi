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
import VolunteerSchoolCheck from '../adminWebsite/VolunteerSchoolCheck';
import VolunteerSchoolReview from '../adminWebsite/VolunteerSchoolReview';
import RequirementHome from '../adminWebsite/requirement';
import AddQuotation from '../adminWebsite/quotation'

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
    this.setState({user:regFormModel.user,spinner:true});
    console.log(regFormModel);
    axios.post(this.state.config+'/puthuyir/user',regFormModel,{
      headers:{'Content-Type':'multipart/form-data'}
    })
    .then(res=>{
        console.log(res);
        this.setState({spinner:false});
        history.push("/confirmation");
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
          <Switch>
            <Route path="/confirmation" component={()=><ConfirmatinScreen/>}/>
            <Route path="/trustRegister" history={history}component={()=><TrustRegister saveUser={(user)=>this.saveUser(user)}/>}/>}/>
            <Route exact path="/login" history={history} component={()=><TrustLogin config={this.state.config}/>}/>
            <Route path="/emailDEO/:schoolID"  component={()=><DEOEmailTrigger/>}/>
            <Route path="/volunteerRegister" history={history} component={(props)=><VolunteerRegister saveUser={(user)=>this.saveUser(user)}{...props}/>}/>
            <AdminLayoutRoute path="/adminNewSchoolReview" history={history} component={(props)=><AdminNewSchoolReview {...props}/>} />
            <AdminLayoutRoute path="/adminPendingWorkflow" history={history} component={(props)=><AdminPendingWorkflow {...props}/>}/>
            <AdminLayoutRoute path="/accessReview" history={history} component={(props)=><AdminAccessReview {...props}/>}/>
            <AdminLayoutRoute path="/adminSchoolCheck" history={history} component={(props)=><AdminSchoolCheck {...props}/>}/>
            <AdminLayoutRoute path="/adminRoleCheck" history={history} component={(props)=><AdminRoleCheck {...props}/>}/>
            <AdminLayoutRoute path="/adminUploadDEOresponse" history={history} component={(props)=><AdminUploadDEOresponse {...props}/>}/>
            <AdminLayoutRoute path="/assignToVolunteer" history={history} component={(props)=><AssignToVolunteer {...props}/>}/>
            <SponsorLayoutRoute path="/trustMemberScreen" history={history} component={(props)=><TrustMemberScreen {...props}/>}/>
            <SponsorLayoutRoute path="/referVolunteer" history={history} component={(props)=><ReferVolunteer {...props}/>}/>}/>
            <VolunteerLayoutRoute path="/volunteerSchoolCheck" history={history} component={(props)=><VolunteerSchoolCheck {...props}/>}/>}/>
            <VolunteerLayoutRoute path="/volunteerSchoolReview" history={history} component={(props)=><VolunteerSchoolReview {...props}/>}/>}/>
            <VolunteerLayoutRoute path="/viewRequirements" history={history} component={(props)=><RequirementHome {...props}/>}/>}/>
            <VolunteerLayoutRoute path="/addQuotation" history={history} component={(props)=><AddQuotation {...props}/>}/>}/>
          </Switch>
        </Router>
        {this.state.spinner?<div class="spinner"></div>:null}
      </div>
    );
  }
}

export default withRouter(App);
