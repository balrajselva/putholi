import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './donation_style.css'
class DonationList extends Component {

    constructor(props) {
        super(props)

    }


    toDonate = (e) => {

        const userSelectId = this.props.donationList.filter(
            function (userFilter) {
                return userFilter.schoolId == e;
            });
        console.log("userSelectId",userSelectId);

        this.props.history.push('donationDetails', { state: userSelectId });


    }

    render() {
        
    console.log(this.props)
        return (

            <div className="row">
                <div className="projects isotope" >
                    {this.props.donationList.map(donationLists => {
                    if(donationLists.enable_donation === "Y"){
                    return(<div className="span3 element isotope-item" >
                            <div className="hover_img">
                            {donationLists.schoolImages.map(images => (
                                
                                   <a className=""><img src={'data:image/png;base64,'+ images.image} alt="" ></img></a>
                                ))}  
                                <span className="portfolio_zoom"><a href="" rel="prettyPhoto[portfolio1]"></a></span>
                                <span className="portfolio_link"><a href="show_one_school_details_for_donation.html">View item</a></span>
                            </div>
                            <div className="item_description">
                                <h6><a href="show_one_school_details_for_donation.html">
                              
                                    {donationLists.schoolInfo.schoolName}</a></h6>
                                <div className="descr">
                                    Needs 
                                {donationLists.projects.map(projectData => (
                                              projectData.requirements.map((value,index) =>
                                    <div>{value.quantity} {value.assetName} </div>
                                              )
                                ))}  
                   

                                </div>
                                <div className="descr">Click Here to  <button onClick={e => this.toDonate(donationLists.schoolId)}>
                                    Donate
                                 </button>
                                </div>
                            </div>

                        </div>

                    )}})}
                            
                </div>
                <div className="clear"></div>
            </div>

        )
    }
}

export default withRouter(DonationList);


