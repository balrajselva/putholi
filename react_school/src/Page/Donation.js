import React, { Component } from 'react';
import HeaderComponent from '../components/HeaderComponent.js';
import FooterComponent from '../components/FooterComponent';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';
import DonationList from '../components/donation/donationList';
import {SearchBox} from '../components/search/searchComponent';
import '../components/donation/donation_style.css'
class Donation extends Component {

    constructor(){
        super();
         this.state = {
             donationList: [],
             searchField:null
         };
       
     }
 
 componentDidMount() {
    fetch('http://localhost:8088/puthuyir/school')
     .then(response => 
          response.json()) 
 .then(users => this.setState({ donationList: users }));
 
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
        <div className="breadcrumb">
        <div className="wrap">
        <div className="container">
            Welcome Message. Register your school here
        </div>
        </div>
    </div>
    <div className="wrap">
           <div className="container inner_content">
         
   {/* <SearchBox placeholder = 'Donation'
           handleEvent = {e => this.setState({searchField : e.target.value})}/>
     */}
        <DonationList donationList = {filteredDonationList}/>
      
        
 </div>
 </div>
 </div>
 
        
     )
 }  

}
export default Donation;

