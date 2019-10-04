import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class AboutPage extends Component {
    render() {
        return (
            <div>
                <h>About Page</h>
            </div>
        );
    }
}

export default withRouter(AboutPage);