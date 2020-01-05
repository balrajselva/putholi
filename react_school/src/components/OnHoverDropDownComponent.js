import React,{Component} from 'react';
import '../css/Component_CSS/OnHoverDropDownComponent.css';
import {withRouter} from 'react-router-dom';

class OnHoverDropDownComponent extends Component {
  render() {
      const menu=this.props.menu.toLowerCase()+'';
    const submenu=[this.props.submenu];
    const subMenuList=submenu.map(submenu=>{
        return(<li><a href=''>{submenu}</a></li>)
    });
    return (
        <li>
        <a href='' class="dropdown" onClick={()=>this.props.history.push('/'+menu)}>
            <div class="sub-menu">{this.props.menu}</div>
            <div class="dropdown-content">
                <ul>
                {subMenuList}
                </ul>
            </div>
        </a>
        </li>
    );
  }
}

export default withRouter(OnHoverDropDownComponent);