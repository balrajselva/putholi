import React, { Component } from 'react';
import '../css/prettyPhoto.css';
import '../css/camera.css';
import '../css/bootstrap.css';
import '../css/theme.css';
import '../css/bootstrap-responsive.css';
import '../css/skins/tango/skin.css';
import '../css/Page_CSS/IndexPage.css';
import SocialMediaComponent from '../components/SocialMediaComponent.js';

class FooterComponent extends Component {
    render() {
        const socialMedia=['facebook','vimeo','tumbrl','twitter','delicious'];

        const socialMediaList=socialMedia.map(media=>{
            return(<SocialMediaComponent name={media}/>)
        });
        return (
            <div>
                <div id="footer">
                <div className="wrap">
                    <div className="container">
                        <div className="row">
                            <div className="span3">
                                <h2 className="title">Latest tweets</h2>
                                <div className="tweet_block"></div>
                            </div>
                            <div className="span3">
                                <h2 className="title">Get in touch!</h2>
                                <form action="#" method="post">
                                    <input className="span3" type="text" name="name" id="name" value="Name" onFocus="if (this.value == 'Name') this.value = '';" onBlur="if (this.value == '') this.value = 'Name';" />
                                    <input className="span3" type="text" name="email" id="email" value="Email" onFocus="if (this.value == 'Email') this.value = '';" onBlur="if (this.value == '') this.value = 'Email';" />
                                    <textarea name="message" id="message" className="span3" onFocus="if (this.value == 'Message') this.value = '';" onBlur="if (this.value == '') this.value = 'Message';" >Message</textarea>
                                    <div className="clear"></div>
                                    <input type="reset" className="btn dark_btn" value="Clear form" />
                                    <input type="submit" className="btn send_btn" value="Send!" />
                                    <div className="clear"></div>
                                </form>
                            </div>
                            <div className="span3">
                                <h2 className="title">Testimonials</h2>
                                <ul>
                                    <li>
                                        <span className="testimonials_arrow"></span>Sample content for testimonials 1.
                                        <div className="clear"></div>
                                        <div className="author">Ramesh, Texas.</div>
                                    </li>
                                    <li>
                                        <span className="testimonials_arrow"></span>Sample content for testimonials 2..
                                        <div className="clear"></div>
                                        <div className="author">Suresh, California</div>
                                    </li>
                                </ul>
                            </div>
        
                            <div className="span3">
                                <h2 className="title">Access assistance </h2>
                                <div className="flickrs">
                                    <h3>Ramasamy - Admin</h3>(Ramasamy@gmail.com)
                                    <h3>Kumarasamy -Superuser</h3>
                                    (Kumarasamy@yahoo.com)
        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        
                <div className="footer_bottom">
                    <div className="wrap">
                        <div className="container">
                            <div className="row">
                                <div className="span5">
                                    <div className="foot_logo"><a href="index.html"><img src="img/logo.png" alt="" /></a></div>
                                                  <br/>
                                    <div className="copyright">&copy; Managed by Puthuyir Trust, To Revamp all Government Schools in Tamilnadu</div>
                                </div>
                                <div className="span7">
                                    <div className="foot_right_block">
                                        <div className="fright">
                                            <form action="#" method="post">
                                                <input className="inp_search" name="name" type="text" value="Search the Site" onfocus="if (this.value == 'Search the Site') this.value = '';" onblur="if (this.value == '') this.value = 'Search the Site';" />
                                            </form>
                                        </div>
                                        <div className="follow_us">
                                            <ul>
                                            {socialMediaList}
                                            </ul>
                                        </div>
                                        <div className="clear"></div>
                                    </div>
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

export default FooterComponent;