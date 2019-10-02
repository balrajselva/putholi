import React, { Component } from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Menu from './components/menu/Menu';

class AccessConfirmationScreen extends Component {
    render() {
        return (
            <div class="adminContainer" style={{fontSize:"large"}}>
                <Header/>
                <Menu/>
                <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                    Access Request's Confirmation Screen
                    <small>Requested on</small>
                    </h1>
                    <ol className="breadcrumb">
                    <li><a href="../../admin_main_screen.html"><i className="fa fa-dashboard" /> Home</a></li>
                    </ol>
                </section>
                {/* Main content */}
                <section className="content">
                    {/* row */}
                    <div className="row">
                    <div className="col-md-12">
                        {/* The time line */}
                        <ul className="timeline">
                        {/* timeline time label */}
                        <li className="time-label">
                            <span className="bg-red">
                            10 Feb. 2014
                            </span>
                        </li>
                        {/* /.timeline-label */}
                        {/* timeline item */}
                        <li>
                            <i className="fa fa-envelope bg-blue" />
                            <div className="timeline-item">
                            <span className="time"><i className="fa fa-clock-o" /> 12:05</span>
                            <h3 className="timeline-header"><a href="#">Access Request for Jagan </a> as "Volunteer" is complete</h3>
                            <div className="timeline-body">
                                <div className="box-body">
                                <h3>User will receive an email with user id and password.</h3>
                                In addition to that appropriate role details &amp; the respective previlege will be explained in detail. Please check your email for more details and thank you registering
                                with us. 
                                </div></div></div></li>
                        {/* END timeline item */}
                        {/* timeline item */}
                        <li>
                            <i className="fa fa-user bg-aqua" />
                            <div className="timeline-item">
                            <span className="time"><i className="fa fa-clock-o" /> 25 mins ago</span>
                            <h3 className="timeline-header no-border">User registered and access confirmation is sent via email on 10-10-2018</h3>
                            </div>
                        </li>
                        {/* END timeline item */}
                        {/* timeline item */}
                        {/* END timeline item */}
                        {/* timeline time label */}
                        {/* /.timeline-label */}
                        {/* timeline item */}
                        {/* END timeline item */}
                        {/* timeline item */}
                        <li>
                            <div className="timeline-footer">
                            <a href="#" className="btn btn-xs bg-maroon">Go to Top</a>
                            </div>
                        </li>
                        {/* END timeline item */}
                        </ul>
                    </div>
                    {/* /.col */}
                    </div>
                    {/* /.row */}
                    {/* /.row */}
                </section>
                {/* /.content */}
                </div>

                <Footer/>
            </div>
        );
    }
}

export default AccessConfirmationScreen;