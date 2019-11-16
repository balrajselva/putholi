import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import SmallBoxCard from './components/smallBoxCard/SmallBoxCard';

class TrustMemberScreen extends Component {
    render() {
        return (
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    {/* Small boxes (Stat box) */}
                    <div className="row">
                    <SmallBoxCard content={this.props.location.user.role} linkTo="/trustMemberScreen" colour="bg-green"/>
                    {/* ./col */}
                    <SmallBoxCard content="Inbox" linkTo="/volunteer" colour="bg-yellow"/>
                    {/* ./col */}
                    <SmallBoxCard content="Logout" linkTo="/login" colour="bg-red"/>{/* ./col */}
                    </div>
                    <h1>
                    Sponsor
                    <small>screen</small>
                    </h1>
                </section>
                {/* Main content */}
                <section className="content">
                    {/* Small boxes (Stat box) */}
                    {/* /.row */}
                    {/* Main row */}
                    <div className="row">
                    <div className="col-xs-12">
                        <div className="box">
                        <div className="box-header">
                            <h4 className="box-title">Welcome Screen for Sponsor</h4>
                            <div className="box-tools">
                            </div>
                        </div>
                        {/* /.box-header */}
                        {/* /.box-body */}
                        </div>
                        {/* /.box */}
                    </div>
                    </div>
                    {/* /.row (main row) */}
                </section>
                {/* /.content */}
            </div>
        )
    }
}
export default withRouter(TrustMemberScreen)
