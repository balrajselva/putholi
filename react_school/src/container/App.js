import React,{Component} from 'react';
import './App.css';
import {withRouter,Router,Switch} from 'react-router-dom';
import history from './history';
import Route from 'react-router-dom/Route';

import IndexPage from '../Page/IndexPage';
import FeaturesPage from '../Page/FeaturesPage';
import AboutPage from '../Page/AboutPage';
import BlogPage from '../Page/BlogPage';
import GalleryPage from '../Page/GalleryPage';
import RegistrationPage from '../Page/RegistrationPage';
import Donation  from '../Page/Donation';
import DonationDetails from '../components/donation/details';
import DonationForm from '../components/donation/donateForm';
import DonationPayment from '../components/donation/donationPayment';
import DonationConfirmationPage from '../components/donation/paymentConfirmationPage';
import AddSchool from '../components/schoolRegister/addSchool';
import TrackDonation from '../components/donation/trackDonation';
import ConfirmationPage from '../Page/ConfirmationPage';
import ConfirmatinScreen from '../Page/ConfirmationScreen';
import SchoolLayout from '../components/layouts/schoolLayout';
import TransactionResponse from '../components/donation/transactionResponse';

class App extends Component {
  render(){
  const SchoolLayoutRoute=({component:Component,...rest})=>{
    return(
      <Route {...rest} render={props=>(
        <SchoolLayout {...props}>
          <Component {...props}/>
        </SchoolLayout>
      )}/>
    )
  }
  return (
    <div>   
      <Router history={history}>
        <Switch>
          <Route exact path="/confirmation" component={()=><ConfirmatinScreen/>}/>
          <Route path="/transactionResponse" component={()=><TransactionResponse/>}/>  
          <SchoolLayoutRoute path="/index" component={()=><IndexPage  />}/>
          <SchoolLayoutRoute path="/about" component={()=><AboutPage  />}/>
          <SchoolLayoutRoute path="/features" component={()=><FeaturesPage  />}/>
          <SchoolLayoutRoute path="/blog" component={()=><BlogPage  />}/>
          <SchoolLayoutRoute path="/gallery" component={()=><GalleryPage  />}/>
          <SchoolLayoutRoute path="/schoolregistration" history={history} component={(props)=><AddSchool {...props}/>}/>
          <SchoolLayoutRoute path="/registrationPage" history={history} component={(props)=><RegistrationPage {...props}/>}/>
          <SchoolLayoutRoute path="/confirm" component={()=><ConfirmationPage/>}/>
          <SchoolLayoutRoute path="/donation" component={()=><Donation/>}/>
          <SchoolLayoutRoute path="/donationDetails" component={()=><DonationDetails/>}/>
          <SchoolLayoutRoute path="/donationRegistrationForm" component={()=><DonationForm/>}/> 
          <SchoolLayoutRoute path="/donationPayment" component={()=><DonationPayment paymentFlow={(paymentPayload,donationUserPayload,projectUpdatePayload,user)=>this.paymentFlow(paymentPayload,donationUserPayload,projectUpdatePayload,user)}/>}/>         
          <SchoolLayoutRoute path="/donationPaymentConfirmation" component={()=><DonationConfirmationPage/>}/>  
          <SchoolLayoutRoute path="/trackDonation" component={()=><TrackDonation/>}/>             
        </Switch>
      </Router>
    </div>
  );
  }
}

export default withRouter(App);
