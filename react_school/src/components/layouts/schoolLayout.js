import React, { Component } from 'react'
import { withRouter } from 'react-router'
import HeaderComponent from '../HeaderComponent'
import FooterComponent from '../FooterComponent'

class shoolLayout extends Component {
    render() {
        return (
            <div>
                <HeaderComponent {...this.props}/>
                {this.props.children}
                <FooterComponent {...this.props}/>                
            </div>
        )
    }
}
export default withRouter(shoolLayout);
