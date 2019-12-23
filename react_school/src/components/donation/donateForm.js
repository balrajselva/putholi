import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import '../registerForm/registerForm.css';
import '../../../src/css/School_registration.css';

class DonationForm extends Component {
    state={
        schoolName:null,
        estimatedTotalAmt:null,
        collectedAmount:null,    
        contributeLimit:null,
        contribution:null
    }

    constructor(props){
        super(props);
  
    }

    render(){
        return (
            <div>
                <div className="page_container">
                <div className="breadcrumb">
                    <div className="wrap">
                    <div className="container">
                        Home/About
                    </div>
                    </div>
                </div>
                <div className="wrap">
                    <div className="container">
                    <section>
                        <div className="span12">
                      <form className="form-horizontal" action="summary_before_payment_gateway.html">
                        <fieldset>
                          <legend>Appreciate your interest in Donating fund for development of the school. Please use the payment gateway to pay the fund</legend>

                          <div className="control-group">
                            <label className="control-label" for="disabledInput">School Name</label>
                            <div className="controls">
                              <input className="input-xlarge disabled" id="disabledInput" type="text" placeholder={this.props.history.location.state.state[0].schoolInfo.schoolName} disabled=""></input>
                    </div>
                    </div>
                    <div className="control-group">
                            <label className="control-label" for="disabledInput">Estimated Total Amount
</label>
                            <div className="controls">
                              <input className="input-xlarge disabled" id="disabledInput" 
                              type="text" placeholder={this.props.history.location.state.state[0].projects[0].estimate} disabled=""></input>
                    </div>
                    </div>
                    <div className="control-group">
                            <label className="control-label" for="disabledInput">Collected Amount</label>
                            <div className="controls">
                              <input className="input-xlarge disabled" id="disabledInput" type="text" placeholder={this.props.history.location.state.state[0].projects[0].collectedAmount} disabled=""></input>
                    </div>
                    
                    </div>
                    <div className="control-group">
                            <label className="control-label" for="disabledInput">You can contribute Upto</label>
                            <div className="controls">
                              <input className="input-xlarge disabled" id="disabledInput" type="text" placeholder="Cuddalore Boy's School" disabled=""></input>
                    </div>
                    </div>
                    <div className="control-group">
                            <label className="control-label" for="disabledInput">Your Contribution in Rs</label>
                            <div className="controls">
                              <input className="input-xlarge disabled" id="disabledInput" type="text" placeholder="Cuddalore Boy's School" disabled=""></input>
                    </div>
                    </div>
                          
                      </fieldset>
                      </form>
                      </div>
                        </section>
                        </div>
                        </div>
                        </div>
                        </div>
                    

                
                          
                                  
    
    
        );
    }

}
export default withRouter(DonationForm);
