import React,{Component} from 'react';
import '../css/prettyPhoto.css';
import '../css/camera.css';
import '../css/bootstrap.css';
import '../css/theme.css';
import '../css/bootstrap-responsive.css';
import '../css/skins/tango/skin.css';
import '../css/Page_CSS/IndexPage.css';
import '../components/CarouselComponent.js';
import HeaderComponent from '../components/HeaderComponent.js';
import IconComponent from '../components/IconComponent.js';
import CarouselComponent from '../components/CarouselComponent.js';
import {withRouter} from 'react-router-dom';
import FooterComponent from '../components/FooterComponent';
import LoginModal from "react-login-modal-sm";


class indexPage extends Component{
    state = {
        showModal: false
    };

    toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
    };

    handleLoginWithFacebook = () => {
    console.log("Login with Facebook...");
    };

    handleSignupByEmail = (email, username, password) => {
    console.log("Sign up by email...");
    
    };
    render(){

        const icons={
            icon1:{
                img:'icon1',
                title:'Donate to School',
                pageLink:'showAllSchoolsForDonation',
                content:'Click to contribute your fund for development of a selected school '
            },
            icon2:{
                img:'icon2',
                title:'Go Shopping',
                pageLink:'#',
                content:'Click to contribute for maintainence of school through regular shopping'
            },
            icon3:{
                img:'icon3',
                title:'Track your Donation',
                pageLink:'schoolTracking',
                content:'Click here and provide your tracking number to view the status of your contribution and the school progress'
            },
            icon4:{
                img:'icon4',
                title:'Login /  Register',
                pageLink:'registrationPage',
                content:'Click here and provide your tracking number to view the status of your contribution and the school progress'
            }
        };

        const iconList=Object.entries(icons).map(([,icon])=>{
            return(<IconComponent img={icon.img} title={icon.title} content={icon.content} pageLink={icon.pageLink} toggleModal={()=>this.toggleModal()}/>)
        });

        return(
            
            <div>
                <HeaderComponent/>
                <div className="page_container">
                    <CarouselComponent/>
                    <div className="wrap planning">
                        <div className="container">
                            <div className="row">
                                {iconList}
                            </div>
                        </div>
                    </div>
                    
                    <div className="wrap block">
                        <div className="container welcome_block">
                            <div className="welcome_line welcome_t"></div>
                            Subscribe here for Newsletter!  
                            <div className="clear"></div> 
                            <div className="block">
                                <input className="span3 " type="email"/>
                                <input className="btn span2" type="submit" value="Submit"/>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterComponent/>
                <LoginModal showModal={this.state.showModal} 
                    toggleModal={this.toggleModal} 
                    onLoginFacebook={this.handleLoginWithFacebook}
                    onSignupEmail={this.handleSignupByEmail}/>
                <FooterComponent/>
            </div>
        
        );
    }
}

export default withRouter(indexPage);