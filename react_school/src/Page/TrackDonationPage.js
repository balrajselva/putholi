import React, { Component } from 'react';
import HeaderComponent from '../components/HeaderComponent.js';
import FooterComponent from '../components/FooterComponent';
import TrackDonation from '../components/donation/trackDonation';

class TrackDonationPage extends Component {
    state={
        locality:null,
        selectedLocality:null,
        createLocalityDropDown:false,
        requirements:null,
        requirementsPresent:false
    }
    render() {
        return (
            <div>
                <div className="page_container">
                <div className="breadcrumb">
                    <div className="wrap">
                    <div className="container">
                        Welcome Message. Register your school here
                    </div>
                    </div>
                </div>
               
                <div className="wrap">
                    <TrackDonation></TrackDonation>
                  </div>
                </div>
            </div>
        );
    }
}

export default TrackDonationPage;
