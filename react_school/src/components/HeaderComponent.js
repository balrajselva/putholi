import React, { Component } from 'react';
import img1 from '../img/logo.png';
import '../css/prettyPhoto.css';
import '../css/camera.css';
import '../css/bootstrap.css';
import '../css/theme.css';
import '../css/bootstrap-responsive.css';
import '../css/skins/tango/skin.css';
import '../css/Page_CSS/IndexPage.css';
import SocialMediaComponent from '../components/SocialMediaComponent.js';
import OnHoverDropDownComponent from '../components/OnHoverDropDownComponent.js';

class HeaderComponent extends Component {
    
    render() {
        const socialMedia=['facebook','vimeo','tumbrl','twitter','delicious'];

        const socialMediaList=socialMedia.map(media=>{
            return(<SocialMediaComponent name={media}/>)
        });

        const dropDowns={
            Features:['Origin','Vision','Mission','Working Model'],
            Gallery:['Pictures','Viodes','Stories'],
            Blog:['Blog Post']};

        const dropDownsList=Object.entries(dropDowns).map(([menu,submenu])=>{
            return(<OnHoverDropDownComponent menu={menu} submenu={submenu}/>)
        });
        return (
            <div>
                <div className="header">
                <div className="wrap">
                    <div className="navbar navbar_ clearfix">
                        <div className="container">
                            <div className="row">
                                <div className="span4">
                                    <div className="logo"><a href="index"><img src={img1} alt="" /></a>
                                </div>
                                </div>
                                <div  className="span4">
                                          <h2>Revamp Government Schools </h2>
                                </div>
                                <div className="span8">
                                    <div className="follow_us">
                                        <ul>
                                            {socialMediaList}
                                        </ul>
                                    </div>
                                    <div className="clear"></div>
                                    <nav id="main_menu">
                                        <div className="menu_wrap">
                                            <ul className="nav sf-menu">
                                              <li><a href="" onClick={()=>this.props.history.push("/index")}>Home</a></li>
                                              <li><a href="" onClick={()=>this.props.history.push('/about')}>About Us</a></li>
                                              {dropDownsList}
                                              <li><a href="" onClick={()=>this.props.history.push('/contact')}>Contact</a></li>
                                            </ul>
                                        </div>
                                     </nav>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            </div>

            </div>
        );
    }
}

export default HeaderComponent;