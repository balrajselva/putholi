import React, { Component } from 'react'
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ReviewerMenu from '../menu/ReviewerMenu';
import '../../css/adminIndex.css';

export default class ReviewerLayout extends Component {
    render() {
        return (
            <div>
                <Header currentUser={this.props.location.currentUser}/>
                <ReviewerMenu currentUser={this.props.location.currentUser}/>
                {this.props.children}
                <Footer/>
            </div>
        )
    }
}
