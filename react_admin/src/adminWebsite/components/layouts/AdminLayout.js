import React, { Component } from 'react'
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Menu from '../menu/Menu';
import '../../css/adminIndex.css';

export default class AdminLayout extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <Header currentUser={this.props.location.currentUser}/>
                <Menu currentUser={this.props.location.currentUser}/>
                {this.props.children}
                <Footer/>
            </div>
        )
    }
}
