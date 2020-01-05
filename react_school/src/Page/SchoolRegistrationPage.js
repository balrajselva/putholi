import React, { Component } from 'react';
import HeaderComponent from '../components/HeaderComponent.js';
import FooterComponent from '../components/FooterComponent';
import AddSchool from '../components/schoolRegister/addSchool';

class SchoolRegistrationPage extends Component {
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
                    <AddSchool></AddSchool>
                  </div>
                </div>
            </div>
        );
    }
}

export default SchoolRegistrationPage;