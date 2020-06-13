import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'

class SuperAdminMenu extends Component {
    render() {
        const accessReview={
            pathname:"/superAdminAccessReview",
            currentUser:this.props.currentUser
          }
          const changeRole={
            pathname:"/superAdminChangeRole",
            currentUser:this.props.currentUser,
            ...this.props
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
                        <i className="fa fa-circle text-success" /> Online
                    </div>
                    </div>
                    <form action="#" method="get" className="sidebar-form">
                    </form>
                    <ul className="sidebar-menu" data-widget="tree">
                    <li className="header">Approver Previlleges</li>
                    <li className="active treeview">
                        <ul className="treeview-menu">
                        <li><Link to={accessReview}><i className="fa fa-circle-o" /> Access Reviews</Link></li>
                        <li><Link to={changeRole}><i className="fa fa-circle-o" /> Change Role</Link></li>
                        </ul>
                    </li>
                    </ul>
                </section>
                </aside>
            </div>
        )
    }
}
export default withRouter(SuperAdminMenu);
