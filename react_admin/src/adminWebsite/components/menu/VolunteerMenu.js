import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'

class VolunteerMenu extends Component {
    render() {
        const accessReview={
            pathname:"/volunteerSchoolCheck",
            currentUser:this.props.currentUser
        }
        return (
            <div>
                <aside className="main-sidebar">
                <section className="sidebar">
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
                    <li className="header">Volunteer Previlleges</li>
                    <li className="active treeview">
                     {/*   <a href="#">
                        <i className="fa fa-dashboard" /> <span>Volunteer Management</span>
                        <span className="pull-right-container">
                            <i className="fa fa-angle-left pull-right" />
                        </span>
        </a> */}
                        <ul className="treeview-menu">
                        <li><Link to={accessReview}><i className="fa fa-circle-o" /> View Assigned Schools</Link></li>
                        <li><Link to={accessReview}><i className="fa fa-circle-o" />Pending Workflow</Link></li>
                        {/* <li><a href="#"><i className="fa fa-circle-o" />Calendar </a></li>
                        <li><a href="#"><i className="fa fa-circle-o" />Claim Expenses </a></li> */}
                        </ul>
                    </li>
                    </ul>
                </section>
                {/* /.sidebar */}
                </aside>
            </div>
        )
    }
}
export default withRouter(VolunteerMenu);