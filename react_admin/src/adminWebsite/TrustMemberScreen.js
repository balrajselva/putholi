import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import SmallBoxCard from './components/smallBoxCard/SmallBoxCard';

class TrustMemberScreen extends Component {
    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="row">
                        <SmallBoxCard content="Trust Member" linkTo="/trustMemberScreen" colour="bg-green"/>
                        <SmallBoxCard content="Logout" linkTo="/login" colour="bg-red"/>
                    </div>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h4 className="box-title">Welcome Screen for Trust Member</h4>
                                    <div className="box-tools">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default withRouter(TrustMemberScreen)
