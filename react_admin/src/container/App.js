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
import RequirementHome from '../adminWebsite/requirement';
import AddQuotation from '../adminWebsite/quotation'

class App extends Component {
  state = {
    user:"",
    spinner:false
  }

  saveUser=(updatedUser)=>{
    this.setState({user:updatedUser,spinner:true});
    axios.post('http://localhost:6060/puthuyir/user',updatedUser)
    .then(res=>{
        console.log(res);
        this.setState({spinner:false});
        history.push("/confirmation");
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
    return (
      <div>   
        <Router history={history}>
          <Switch>
            <Route path="/confirmation" component={()=><ConfirmatinScreen/>}/>
            <Route path="/trustRegister" history={history}component={()=><TrustRegister saveUser={(user)=>this.saveUser(user)}/>}/>}/>
            <Route exact path="/login" history={history} component={()=><TrustLogin />}/>
            <Route path="/volunteerRegister" history={history} component={(props)=><VolunteerRegister saveUser={(user)=>this.saveUser(user)}{...props}/>}/>
            <AdminLayoutRoute path="/adminNewSchoolReview" history={history} component={()=><AdminNewSchoolReview/>}/>
            <AdminLayoutRoute path="/adminPendingWorkflow" history={history} component={()=><AdminPendingWorkflow/>}/>
            <AdminLayoutRoute path="/accessReview" history={history} component={()=><AdminAccessReview/>}/>
            <AdminLayoutRoute path="/adminSchoolCheck" history={history} component={()=><AdminSchoolCheck/>}/>
            <AdminLayoutRoute path="/adminRoleCheck" history={history} component={(props)=><AdminRoleCheck {...props}/>}/>
            <AdminLayoutRoute path="/adminUploadDEOresponse" history={history} component={(props)=><AdminUploadDEOresponse {...props}/>}/>
            <SponsorLayoutRoute path="/trustMemberScreen" history={history} component={()=><TrustMemberScreen/>}/>
            <SponsorLayoutRoute path="/referVolunteer" history={history} component={()=><ReferVolunteer/>}/>}/>
            <Route path="/viewRequirements" history={history} component={()=><RequirementHome/>}/>}/>
            <Route path="/addQuotation" history={history} component={()=><AddQuotation/>}/>}/>
          </Switch>
        </Router>
        {this.state.spinner?<div class="spinner"></div>:null}
      </div>
    );
  }
}

export default withRouter(App);
