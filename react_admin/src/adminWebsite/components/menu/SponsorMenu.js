import React, { Component } from 'react';
import './Menu.css'
import { Link } from 'react-router-dom';

class SponsorMenu extends Component {
    render() {
        const referVolunteer={
            pathname:"/referVolunteer",
            user:this.props.currentUser
        }
        return (
            <aside className="main-sidebar">
                {/* sidebar: style can be found in sidebar.less */}
                <section className="sidebar">
                    {/* Sidebar user panel */}
                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src="dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                        </div>
                    <div className="pull-left info">
                        <p>{this.props.currentUser.firstName}</p>
                        <a href="#"><i className="fa fa-circle text-success" /> Online</a>
                    </div>
                    </div>
                    {/* search form */}
                    <form action="#" method="get" className="sidebar-form">
                        <div className="input-group">
                            <input type="text" name="q" className="form-control" placeholder="Search..." />
                            <span className="input-group-btn">
                            <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search" />
                            </button>
                            </span>
                        </div>
                    </form>
                    {/* /.search form */}
                    {/* sidebar menu: : style can be found in sidebar.less */}
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="header">|Sponsor Previlleges</li>
                        <li className="active treeview">
                            <a href="#">
                            <i className="fa fa-dashboard" onClick={(e)=>e.preventDefault()}/> <span>Sponsor Management</span>
                            <span className="pull-right-container">
                                <i className="fa fa-angle-left pull-right" />
                            </span>
                            </a>
                            <ul className="treeview-menu">
                            <li><a href="#"><i className="fa fa-circle-o" />Contribute for claims </a></li>
                            <li><a href="#"><i className="fa fa-circle-o" />Events Schedule </a></li>
                            <li><Link to={referVolunteer} ><i className="fa fa-circle-o"/>Refer Volunteer</Link></li>
                            <li><a href="#"><i className="fa fa-circle-o" />View Your Volunteer</a></li>
                            </ul>
                        </li>
                    </ul>
                </section>
                {/* /.sidebar */}
            </aside>

        );
    }
}

export default SponsorMenu;