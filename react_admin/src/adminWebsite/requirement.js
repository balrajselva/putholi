import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import RequirementHome from './components/quotation/viewRequirements';

class Requirement extends Component {
    render() {
        return (<RequirementHome {...this.props}/>)
    }
}


export default Requirement