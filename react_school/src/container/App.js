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
import RejectionPage from '../Page/RejectionPage';
import ConfirmatinScreen from '../Page/confirmationScreen';
import SchoolLayout from '../components/layouts/schoolLayout';
import TransactionResponse from '../components/donation/transactionResponse';
import BeneficiarySummary from '../components/schoolRegister/BeneficiarySummary';
import EditRequirement from '../components/schoolRegister/editRequirement';
import AddRequirement from '../components/schoolRegister/addRequirement';


class App extends Component {
  constructor(props){
    super(props);
    this.state={config:"http://localhost:6060/putholi"}
  }
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
      <Router history={history} config={this.state.config}>
        <Switch config={this.state.config}>
          <Route exact path="/confirmation" component={()=><ConfirmatinScreen config={this.state.config}/>}/>
          <Route path="/transactionResponse" component={()=><TransactionResponse config={this.state.config}/>}/>  
          <SchoolLayoutRoute path="/index" component={()=><IndexPage  config={this.state.config}/>}/>
          <SchoolLayoutRoute path="/about" component={()=><AboutPage  config={this.state.config}/>}/>
          <SchoolLayoutRoute path="/features" component={()=><FeaturesPage  config={this.state.config}/>}/>
          <SchoolLayoutRoute path="/blog" component={()=><BlogPage  config={this.state.config}/>}/>
          <SchoolLayoutRoute path="/gallery" component={()=><GalleryPage  config={this.state.config}/>}/>
          <SchoolLayoutRoute path="/schoolregistration" history={history} component={(props)=><AddSchool {...props} config={this.state.config}/>}/>
          <SchoolLayoutRoute path="/beneficarySummary" history={history} component={(props)=><BeneficiarySummary {...props} config={this.state.config}/>}/>
          <SchoolLayoutRoute path="/registrationPage" history={history} component={(props)=><RegistrationPage {...props} config={this.state.config}/>}/>
          <SchoolLayoutRoute path="/confirm" component={()=><ConfirmationPage config={this.state.config}/>}/>
          <SchoolLayoutRoute path="/rejectScreen" component={()=><RejectionPage config={this.state.config}/>}/>
          <SchoolLayoutRoute path="/donation" component={()=><Donation config={this.state.config}/>}/>
          <SchoolLayoutRoute path="/donationDetails" component={()=><DonationDetails config={this.state.config}/>}/>
          <SchoolLayoutRoute path="/donationRegistrationForm" component={()=><DonationForm config={this.state.config}/>}/> 
          <SchoolLayoutRoute path="/donationPayment" component={()=><DonationPayment paymentFlow={(paymentPayload,donationUserPayload,projectUpdatePayload,user)=>this.paymentFlow(paymentPayload,donationUserPayload,projectUpdatePayload,user)} config={this.state.config}/>}/>         
          <SchoolLayoutRoute path="/donationPaymentConfirmation" component={()=><DonationConfirmationPage config={this.state.config}/>}/>  
          <SchoolLayoutRoute path="/trackDonation" component={()=><TrackDonation config={this.state.config}/>}/>             
          <SchoolLayoutRoute path="/editRequirements" component={()=><EditRequirement config={this.state.config}/>}/>             
          <SchoolLayoutRoute path="/addRequirements" component={()=><AddRequirement config={this.state.config}/>}/>             
        </Switch>
      </Router>
    </div>
  );
  }
}

export default withRouter(App);
