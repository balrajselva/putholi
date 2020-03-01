import React, { Component } from 'react';
import DonationList from '../components/donation/donationList';
import '../components/donation/donation_style.css'
class Donation extends Component {

constructor(){
    super();
    this.state = {
        donationList: [],
        spinner:true,
        searchField:null
    };
}
 
 componentDidMount() {
    fetch('http://localhost:6060/puthuyir/getAllSchools')
     .then(response => 
          response.json()) 
    .then(users => this.setState({ 
        donationList: users,
        spinner:false
     }));
}
 
 render() {
    const { donationList,searchField} = this.state;
    var filteredDonationList = '';
    if(searchField){
    filteredDonationList = donationList.filter
    (donation => donation.schoolInfo.schoolName.includes(searchField))
    }else{
    filteredDonationList = this.state.donationList;
    }
    return (
        <div className="page_container">
            {this.state.spinner?<div class="spinner"></div>:null}
            <div className="breadcrumb">
                <div className="wrap">
                    <div className="container">
                        Welcome Message. Register your school here
                    </div>
                </div>
            </div>
            <div className="wrap">
                <div className="container inner_content">
                    <DonationList donationList = {filteredDonationList}/>
                </div>
            </div>
        </div>    
    )}  
}
export default Donation;

