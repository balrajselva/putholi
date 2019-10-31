import React, { Component } from 'react';
import {withRouter,Router,Route,Switch} from 'react-router-dom';
import history from '../container/history';
import SponsorLayout from './components/layouts/SponsorLayout';
import TrustMemberScreen from './TrustMemberScreen';

class SponsorMainScreen extends Component {
    render() {
        return (
            <div></div>
        );
    }
}

export default withRouter(SponsorMainScreen);