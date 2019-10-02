import React, {Component} from 'react';
import './App.css';
import {withRouter,Router,Switch} from 'react-router-dom';
import history from './history';
import axios from 'axios';

import Route from 'react-router-dom/Route';
import AdminIndex from '../adminWebsite/adminIndex';
import AdminNewSchoolReview from '../adminWebsite/adminNewSchoolReview';
import AdminAccessReview from '../adminWebsite/adminAccessReview';
import AdminRoleCheck from '../adminWebsite/adminRoleCheck';
import TrustRegister from '../adminWebsite/trustRegister';
import TrustLogin from '../adminWebsite/trustLogin';
import VolunteerRegister from '../adminWebsite/VolunteerRegister';
import SponsorMainScreen from '../adminWebsite/SponsorMainScreen';
import ReferVolunteer from '../adminWebsite/ReferVolunteer';
import ConfirmatinScreen from '../adminWebsite/confirmationScreen';

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
    return (
      <div>   
        <Router history={history}>
          <Switch>
            <Route path="/confirmation" component={()=><ConfirmatinScreen/>}/>
            <Route path="/adminNewSchoolReview" component={()=><AdminNewSchoolReview/>}/>
            <Route exact path="/accessReview" history={history} component={()=><AdminAccessReview/>}/>
            <Route path="/adminRoleCheck" history={history} component={(props)=><AdminRoleCheck {...props}/>}/>
            <Route path="/trustRegister" history={history}component={()=><TrustRegister saveUser={(user)=>this.saveUser(user)}/>}/>}/>
            <Route exact path="/login" history={history} component={()=><TrustLogin />}/>
            <Route path="/volunteerRegister" history={history} component={(props)=><VolunteerRegister saveUser={(user)=>this.saveUser(user)}{...props}/>}/>
            <Route path="/trustMemberScreen" history={history} component={()=><SponsorMainScreen/>}/>
            <Route path="/referVolunteer" history={history} component={()=><ReferVolunteer/>}/>}/>
          </Switch>
        </Router>
        {this.state.spinner?<div class="spinner"></div>:null}
      </div>
    );
  }
}

export default withRouter(App);
