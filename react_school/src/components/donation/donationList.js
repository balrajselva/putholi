import React , {Component} from 'react';
import { withRouter } from 'react-router-dom';
import './donation_style.css'
 class DonationList extends Component {
   
  constructor (props){
super(props)

  }

  toDonate = (e)=>{

     const userSelectId = this.props.donationList.filter(
         function(userFilter) {  
             return userFilter.id == e;
         } );

        
      this.props.history.push('donationDetails', { state : userSelectId});
     

}

  render() {
return (
    <div className="card-list">
    {this.props.donationList.map(donationLists =>(
       <div>
           <img 
       src='../kamal.gif' 
       alt="Logo"/>
     <h1 key ={donationLists.id}> 
            
        {donationLists.schoolInfo.schoolName}
    <button onClick={e => this.toDonate(donationLists.id)}>
        Donate
    </button>
  
    </h1>
    </div>
    ))}
    </div>
     
)}
    
    }
    export default withRouter(DonationList);


