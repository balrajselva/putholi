import React, { Component } from 'react'
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ApproverMenu from '../menu/ApproverMenu';
import '../../css/adminIndex.css';

export default class ApproverLayout extends Component {
    render() {
        return (
            <div>
                <Header currentUser={this.props.location.currentUser}/>
                <ApproverMenu currentUser={this.props.location.currentUser}/>
                {this.props.children}
                <Footer/>
            </div>
        )
    }
}
