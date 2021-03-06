import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import Header from '../header/Header';
import Footer from '../footer/Footer';
import VolunteerMenu from '../menu/VolunteerMenu';

class VolunteerLayout extends Component {
    render() {
        return (
            <div>
                <Header currentUser={this.props.location.currentUser}/>
                <VolunteerMenu currentUser={this.props.location.currentUser}/>
                {this.props.children}
                <Footer/>
            </div>
        )
    }
}
export default withRouter(VolunteerLayout);