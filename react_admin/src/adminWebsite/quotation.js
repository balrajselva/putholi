import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import AddQuotation from './components/quotation/addQuotation';

class Quotation extends Component {
    render() {       
        return (<AddQuotation/>)
    }
}


export default Quotation