import React from 'react';
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
import SchoolRegistrationPage from '../Page/SchoolRegistrationPage';
import Donation  from '../Page/Donation';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import DonationDetails from '../components/donation/details';
import DonationForm from '../components/donation/donateForm';

function App() {
  
  return (
    <div>   
      
      <Router history={history}>
        <HeaderComponent/>
        <Switch>
          <Route path="/index" component={()=><IndexPage  />}/>
          <Route path="/about" component={()=><AboutPage  />}/>
          <Route path="/features" component={()=><FeaturesPage  />}/>
          <Route path="/blog" component={()=><BlogPage  />}/>
          <Route path="/gallery" component={()=><GalleryPage  />}/>
          <Route path="/schoolregistration" component={()=><SchoolRegistrationPage/>}/>
          <Route path="/registrationPage" component={()=><RegistrationPage/>}/>
          <Route path="/donation" component={()=><Donation/>}/>
          <Route path="/donationDetails" component={()=><DonationDetails/>}/>
          <Route path="/donationRegistrationForm" component={()=><DonationForm/>}/>          
          
        </Switch>
<FooterComponent/>
      </Router>
      
    </div>

  );
}

export default withRouter(App);
