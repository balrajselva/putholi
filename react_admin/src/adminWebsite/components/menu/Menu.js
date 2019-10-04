import React, { Component } from 'react';
import './Menu.css'
import { Link } from 'react-router-dom';

class Menu extends Component {
    render() {
        return (
            <div>
            {/* Left side column. contains the logo and sidebar */}
              <aside className="main-sidebar">
                {/* sidebar: style can be found in sidebar.less */}
                <section className="sidebar">
                  {/* Sidebar user panel */}
                  <div className="user-panel">
                    <div className="pull-left image">
                      <img src="dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                    </div>
                    <div className="pull-left info">
                      <p>Admin</p>
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
                    <li className="header">Admin Previlleges</li>
                    <li className="treeview">
                      <a href="">
                        <i className="fa fa-pie-chart" />
                        <span>Assignments</span>
                        <span className="pull-right-container">
                          <i className="fa fa-angle-left pull-right" />
                        </span>
                      </a>
                      <ul className="treeview-menu">
                      <li><Link to="/adminAccessReview"><i className="fa fa-circle-o" /> Access Reviews</Link></li>
                              <li><Link to="/adminNewSchoolReview"><i class="fa fa-circle-o"></i> School's New requirements </Link></li>
                              <li><a href="admin_maintainence_school_request_list.html"><i className="fa fa-circle-o" /> School's Maintainence requests </a></li>
                        <li><a href="newly_added_schools.html"><i className="fa fa-circle-o" /> Assign Schools to Volunteer </a></li>
                        <li><a href="#"><i className="fa fa-circle-o" /> Manage Users and Roles</a></li>
                        <li><a href="#"><i className="fa fa-circle-o" /> Manage Events</a></li>
                      </ul>
                    </li>
                    <li className="treeview">
                      <a href="">
                        <i className="fa fa-edit" /> <span>Reports</span>
                        <span className="pull-right-container">
                          <i className="fa fa-angle-left pull-right" />
                        </span>
                      </a>
                      <ul className="treeview-menu">
                        <li><a href="#"><i className="fa fa-circle-o" />School-Wise Reports </a></li>
                        <li><a href="#"><i className="fa fa-circle-o" />Retailer Contributions </a></li>
                        <li><a href="#"><i className="fa fa-circle-o" /> Sponsor Contributions</a></li>
                      </ul>
                    </li>
                    <li className="treeview">
                      <a href="">
                        <i className="fa fa-folder" /> <span>Vendor Management</span>
                        <span className="pull-right-container">
                          <i className="fa fa-angle-left pull-right" />
                        </span>
                      </a>
                      <ul className="treeview-menu">
                        <li><a href="admin_invoice_upload.html"><i className="fa fa-circle-o" />Upload Invoice</a></li>
                        <li><a href="#"><i className="fa fa-circle-o" />Manage Vendors</a></li>
                      </ul>
                    </li>
                    <li className="treeview">
                      <a href="">
                        <i className="fa fa-folder" /> <span>Payment Management</span>
                        <span className="pull-right-container">
                          <i className="fa fa-angle-left pull-right" />
                        </span>
                      </a>
                      <ul className="treeview-menu">
                        <li><a href="admin_fund_disbursement.html"><i className="fa fa-circle-o" />Fund Disbursement</a></li>
                        <li><a href="admin_receipt_upload.html"><i className="fa fa-circle-o" />Upload Receipt</a></li>
                        <li><a href="admin_initiate_workorder.html"><i className="fa fa-circle-o" />Initiate Workorder</a></li>
                      </ul>
                    </li>
                    <li className="treeview">
                      <a href="admin_initiate_workorder.html">
                        <i className="fa fa-folder" /> <span>Workflow Management</span>
                        <span className="pull-right-container">
                          <i className="fa fa-angle-left pull-right" />
                        </span>
                      </a>
                      <ul className="treeview-menu">
                        <li><a href="#"><i className="fa fa-circle-o" />Pending Workflows</a></li>
                        <li><a href="#"><i className="fa fa-circle-o" />Project Closure</a></li>
                      </ul>
                    </li>
                  </ul>
                </section>
                {/* /.sidebar */}
              </aside>
            </div>
        );
    }
}

export default Menu;