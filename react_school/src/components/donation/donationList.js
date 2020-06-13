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
                                <img src={'data:image/png;base64,'+ images.image} alt="" ></img>
                            ))}  
                            </div>
                            <div className="item_description">
                                <h4><b>{donationLists.schoolInfo.schoolName}</b></h4>
                                <div className="descr">
                                    <h5><i>Requirements</i></h5>
                                {donationLists.projects.map(projectData => (
                                              projectData.requirements.map((value,index) =>
                                    <div>{value.quantity} {value.assetName} </div>
                                )))}  
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


