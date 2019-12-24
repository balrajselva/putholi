import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class PaymentConfirmation extends Component {

constructor(props){
    super(props)
}
render(){
    return(
        
    <div className="page_container">
    	<div className="breadcrumb">
        	<div className="wrap">
            	<div className="container">
                    <a href="index.html">Home</a><span>/</span>About
                </div>
            </div>
        </div>

    	<div className="wrap">
        	<div className="container">
                <section>
                    <div className="row">
                        <div className="span12">
                            <h2 className="title"><span>Many Thanks for your contribution. Your Payment is received and here is your Trackind ID : "{this.props.history.location.user.tracking_id}".</span></h2>
                            We will also send you an email with tracking details within 24 hours to your email id. Feel free to reach out to us for any questions. Once again appreciate your contribution and we will keep you posted on the progress of the work that we have taken-up.
                            <h4>Here is a quick link  to <a href="School_Tracking.html">Track Your Donation</a></h4>
</div>
</div>
</section>
</div>
        </div>
   </div>
    );
}

}export default withRouter(PaymentConfirmation)