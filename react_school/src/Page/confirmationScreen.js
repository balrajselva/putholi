import React, { Component } from 'react';
import { withRouter } from 'react-router';

class ConfirmationScreen extends Component {
    render() {
        return (
            <div className="page_container" style={{textAlign:"center",lineHeight:"2"}}>
                <div className="breadcrumb">
                  <div className="wrap">
                      <div className="container">
                        <b>Thankyou for your interest!</b><br/>
                        <b>You will get an update within 7 days!!</b>
                      </div>
                  </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ConfirmationScreen);