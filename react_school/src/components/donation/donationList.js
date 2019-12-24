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
                return userFilter.id == e;
            });


        this.props.history.push('donationDetails', { state: userSelectId });


    }

    render() {

        const styleDonation = {
            position: "absolute",
            left: "0px",
            top: "0px",
            transform: "translate3d(0px,0px,0px)"
        };
        const styleDonationP = {
            overflow: "hidden",
            position: "relative",
            height: "1000px"

        };
        const styleChildren = {
            visibility: "visible;",
            opacity: "1;"
        };
        return (

            <div className="row">
                <div className="projects isotope" style={styleDonationP}>
                    {this.props.donationList.map(donationLists => (

                        <div className="span3 element isotope-item" style={styleDonation} >
                            <div className="hover_img">
                                <a className=""><img src={donationLists.proofOfIds.files[0]} alt="" style={styleChildren}></img></a>
                                <span className="portfolio_zoom"><a href={donationLists.proofOfIds.files[0]} rel="prettyPhoto[portfolio1]"></a></span>
                                <span className="portfolio_link"><a href="show_one_school_details_for_donation.html">View item</a></span>
                            </div>
                            <div className="item_description">
                                <h6><a href="show_one_school_details_for_donation.html">{donationLists.schoolInfo.schoolName}</a></h6>
                                <div className="descr">
                                    Needs 
                                {donationLists.requirements.map((value, index) =>
                     <div>{value.quantity} {value.assetName} </div>
                    )}
                   

                                </div>
                                <div className="descr">Click Here to  <button onClick={e => this.toDonate(donationLists.id)}>
                                    Donate
                                 </button>
                                </div>
                            </div>

                        </div>

                    ))}
                </div>
                <div className="clear"></div>
            </div>

        )
    }
}

export default withRouter(DonationList);


