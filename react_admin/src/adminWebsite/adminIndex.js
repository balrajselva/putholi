import React, { Component } from 'react';
import SmallBoxCard from './components/smallBoxCard/SmallBoxCard';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Menu from './components/menu/Menu';
import './css/adminIndex.css';
import { Link } from 'react-router-dom';

class adminIndex extends Component {
    render() {
        return (
            <div class="adminContainer" style={{fontSize:"large"}}>
                <Header/>
                <Menu/>
                 {/* Content Wrapper. Contains page content */}
                 <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                        <h1>
                        Dashboard
                        <small>Control panel</small>
                        </h1>
                        <ol className="breadcrumb">
                        <li><Link to="/adminIndex"><i className="fa fa-dashboard" /> Home</Link></li>
                        <li className="active"><medium>Dashboard</medium></li>
                        </ol>
                    </section>
                    {/* Main content */}
                    <section className="content">
                        {/* Small boxes (Stat box) */}
                        <div className="row" style={{paddingLeft:"1%"}}>
                        <SmallBoxCard content="Approver" linkTo="/approver" colour="bg-aqua"/>
                        {/* ./col */}
                        <SmallBoxCard content="Admin" linkTo="/admin" colour="bg-green"/>
                        {/* ./col */}
                        <SmallBoxCard content="Volunteer" linkTo="/volunteer" colour="bg-yellow"/>
                        {/* ./col */}
                        <SmallBoxCard content="Reviewer" linkTo="/reviewer" colour="bg-red"/>
                        {/* ./col */}
                        </div>
                        {/* /.row */}
                        {/* Main row */}
                        {/* /.row (main row) */}
                    </section>
                    {/* /.content */}
                </div>
                {/* /.content-wrapper */}

                <Footer/>
            </div>
        );
    }
}

export default adminIndex;