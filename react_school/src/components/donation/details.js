import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class DonationDetails extends Component {
    constructor(props){
        super(props);
       }

       onSubmit = (e) => {

        const userSelectId = this.props.history.location.state.state.filter(
             function(userFilter) {  
                 return userFilter.id == e;
             } );

   
    this.props.history.push('donationRegistrationForm',{state:userSelectId})
     
        }
    render(){
        return(
            <div> 
                <div className="page_container">
<div className="breadcrumb">
        <div className="wrap">
        <div className="container">
        {this.props.history.location.state.state[0].schoolInfo.schoolName}
        </div>
        </div>
    </div>
    <img 
       src='../kamal.gif' 
       alt="Logo"/>
       
                    	<p>This School requires following items Request your valuable contribution for the development of the same. </p>
                        <ul className="links">
                            <li>Needs Toilet Facilties for both Male &amp; Female Students </li>
                            <li>Needs Digital Board for Class 3 to 5.</li>
                            <li>Needs 120 Individual Tables &amp; Chairs for Clas 3 to 5.</li>

                        </ul>
                   
    
        <p>Total Amount required for the project {this.props.history.location.state.state[0].projects[0].estimate}</p>
        <p>Contributed Amount :{this.props.history.location.state.state[0].projects[0].collectedAmount}</p>
        <div className="progress progress-striped">
                  <div className="bar" >
                  </div>
                </div>
{ <h1 key ={this.props.history.location.state.state[0].id}> 
        <button onClick={e => this.onSubmit(this.props.history.location.state.state[0].id)}>
        Donate Now
    </button>
    </h1> }
    </div>
                </div>
               
                
                 
        )
    }
}

export default withRouter(DonationDetails);
