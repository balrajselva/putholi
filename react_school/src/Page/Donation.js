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
    fetch(this.props.config+'/getAllSchools')
     .then(response => 
          response.json()) 
    .then(users => this.setState({ 
        donationList: users,
        spinner:false
     }));
}
 
 render() {
     console.log(this.state.donationList)
    const { donationList,searchField} = this.state;
    var filteredDonationList = '';
    if(searchField){
    filteredDonationList = donationList.filter
    (donation => donation.schoolInfo.schoolName.includes(searchField))
    }else{
    filteredDonationList = this.state.donationList!==null?this.state.donationList.filter(donation=>
        donation.schoolStatus === "APPROVER_APPROVED_QUOTATION" && donation.enable_donation === "Y"
    ):null;
    }
    return (
        <div className="page_container">
            {this.state.spinner?<div class="spinner"></div>:null}
            <div className="breadcrumb">
                <div className="wrap">
                    <div className="container">
                    The value of a man resides in what he gives and not in what he is capable of receiving. And so does the knowledge.
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

