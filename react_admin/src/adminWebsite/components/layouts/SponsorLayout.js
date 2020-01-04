import React, { Component } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import SponsorMenu from '../menu/SponsorMenu';
import { withRouter } from 'react-router';

class SponsorLayout extends Component {
    render() {
        return (
            <div>
                <Header currentUser={this.props.location.user}/>
                <SponsorMenu currentUser={this.props.location.user}/>
                {this.props.children}
                <Footer/>
            </div>
        )
    }
}
export default withRouter(SponsorLayout);