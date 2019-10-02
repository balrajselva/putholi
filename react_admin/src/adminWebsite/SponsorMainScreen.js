import React, { Component } from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SponsorMenu from './components/menu/SponsorMenu';
import SmallBoxCard from './components/smallBoxCard/SmallBoxCard';
import {withRouter} from 'react-router-dom';

class SponsorMainScreen extends Component {
    render() {
        return (
            <div>
                <Header currentUser={this.props.location.user}/>
                <SponsorMenu currentUser={this.props.location.user}/>
                <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    {/* Small boxes (Stat box) */}
                    <div className="row">
                    <SmallBoxCard content={this.props.location.user.role} linkTo="/admin" colour="bg-green"/>
                    {/* ./col */}
                    <SmallBoxCard content="Inbox" linkTo="/volunteer" colour="bg-yellow"/>
                    {/* ./col */}
                    <SmallBoxCard content="Logout" linkTo="/reviewer" colour="bg-red"/>{/* ./col */}
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

                <Footer/>
            </div>
        );
    }
}

export default withRouter(SponsorMainScreen);