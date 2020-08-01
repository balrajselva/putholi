import React, { Component } from 'react'
import { withRouter } from 'react-router'

class RejectedUser extends Component {
    render() {
        return (
            <body class="hold-transition register-page">
                <div className="register-box">
                <div className="register-logo">
                    <b>Thankyou for your interest!</b><br/><br/>
                    <b>Your request has been rejected. Please contact the admin.</b>
                </div>
                </div>
            </body>
        )
    }
}
export default withRouter(RejectedUser);