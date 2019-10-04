import React, { Component } from 'react';
import './Footer.css'

class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="main-footer">
                <div className="pull-right hidden-xs">
                    <b>Version</b> 2.4.0
                </div>
                <strong>Copyright © 2019-2020. All rights
                reserved.</strong>
                </footer>
            </div>
        );
    }
}

export default Footer;