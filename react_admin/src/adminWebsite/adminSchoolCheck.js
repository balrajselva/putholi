import React, { Component } from 'react'

export default class adminSchoolCheck extends Component {
    render() {
        return (
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h1>
                    Cuddalore Boys School
                    <small>added on</small>
                    </h1>
                    <ol className="breadcrumb">
                    <li><a href="../../index.html"><i className="fa fa-dashboard" /> Home</a></li>
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
                            <h3 className="timeline-header"><a href="#">Requirements</a> listed below</h3>
                            <div className="timeline-body">
                                <div className="box-body">
                                <ul>
                                    <li>100 Chairs &amp; Tables</li>
                                    <li>3 Digital Boards</li>
                                    <li>2 Toilets</li>
                                </ul>
                                <h3>Address of the School</h3>
                                Cuddalore Boys School
                                24, Nethaji Street
                                Cuddalore -1
                                Contact number - 093445 43223
                                </div>
                            </div>
                            <div className="timeline-footer">
                                <a className="btn btn-default">Click to view School Pictures</a>
                                <a href="beneficiary_edit_project_link.html" className="btn btn-danger btn-xs">Return to Beneficiary</a>
                                <a href="../../newly_added_schools.html" className="btn btn-primary btn-xs">Confirm Requirements</a>
                                <a href="../../newly_added_schools.html" className="btn btn-primary btn-xs">Back to School List</a>
                            </div>
                            </div>
                        </li>
                        {/* END timeline item */}
                        {/* timeline item */}
                        <li>
                            <i className="fa fa-user bg-aqua" />
                            <div className="timeline-item">
                            <span className="time"><i className="fa fa-clock-o" /> 25 mins ago</span>
                            <h3 className="timeline-header no-border">Beneficiary to resubmit the requirements</h3>
                            </div>
                        </li>
                        <li>
                            <i className="fa fa-user bg-aqua" />
                            <div className="timeline-item">
                            <span className="time"><i className="fa fa-clock-o" /> 25 mins ago</span>
                            <h3 className="timeline-header no-border"><a href="#">Admin History - </a> Initial Check complete</h3>
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

        )
    }
}
