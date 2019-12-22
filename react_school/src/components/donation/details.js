import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './donation_style.css'
class DonationDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            percentage: 0
          }
       }

       onSubmit = (e) => {
        const userSelectId = this.props.history.location.state.state.filter(
             function(userFilter) {  
                 return userFilter.id == e;
             } );

   
    this.props.history.push('donationRegistrationForm',{state:userSelectId})
     
        }
        calculateContribution () {
            return this.props.history.location.state.state[0].projects[0].estimate -   this.props.history.location.state.state[0].projects[0].collectedAmount
          
          }
         
         
          componentDidMount() {
            if(this.state.percentage === 100) return 
            let calculatePercentage= (this.props.history.location.state.state[0].projects[0].collectedAmount*100)/this.props.history.location.state.state[0].projects[0].estimate;
            console.log(calculatePercentage);
            this.setState({ percentage: calculatePercentage })
          }  
          
    render(){
      console.log("Return test",this.props.history)
        
        const ProgressBar = (props) => {
            return (
                <div className="progress-bar">
                  <Filler percentage={props.percentage} />
                </div>
              )
          }
          
          const Filler = (props) => {
            return <div className="filler" style={{ width: `${props.percentage}%` }} />
          }
        return(
            <div> 
                <div className="page_container">
<div className="breadcrumb">
        <div className="wrap">
        <div className="container">
        {this.props.history.location.state.state[0].schoolInfo.schoolName}
        </div>
        </div>
        </div>

        <div className="wrap">
            <div className="container">
                <div className="row pad25">
                	<div className="span8">
                    	<div id="portfolio_carousel" className="carousel slide">
                                <div className="carousel-inner">
                                  <div className="item">
                                      <img src={this.props.history.location.state.state[0].proofOfIds.files[0]} alt=""></img>
                                  </div>
                                  <div className="item active">
                                  <img src={this.props.history.location.state.state[0].proofOfIds.files[1]} alt=""></img>
                                  </div>
                                </div>
                                <a class="left carousel-control" data-slide="prev"></a>
                                <a class="right carousel-control" data-slide="next"></a>
                          </div>
						<div className="span11"><h4 className="title">Total Amount required for the project Rs. {this.props.history.location.state.state[0].projects[0].estimate}  </h4> </div>


                    </div>
                    <div className="span4">
                    	<p>This School requires following items Request your valuable contribution for the development of the same. </p>
                        <ul className="links">
                            <li>Needs Toilet Facilties for both Male &amp; Female Students</li>
                            <li>Needs Digital Board for Class 3 to 5.</li>
                            <li>Needs {this.props.history.location.state.state[0].requirements[0].quantity} Individual {this.props.history.location.state.state[0].requirements[0].assetName} for Clas 3 to 5.</li>

                        </ul>
                    </div>
                </div>

                <div className="row">
                    <div className="span5">
                      <label>Contributed Amount :Rs.{this.props.history.location.state.state[0].projects[0].collectedAmount}</label>
                    </div>
                    <div className="span5">
        <label>Can Contribute Upto :Rs.{this.calculateContribution()}</label>
                    </div>

                  </div>
                  
                  <ProgressBar percentage={this.state.percentage} />
           
              <div>
                <a className="btn dark_btn marg20" href="javascript:history.back()">Back to Search Results</a>
				      {this.calculateContribution()!=0  &&
                <a onClick={e => this.onSubmit(this.props.history.location.state.state[0].id)}className="btn dark_btn marg20" >Donate Now</a>
              }
              </div>
            </div>
        </div>
       
    
       
    
    {/* <img 
       src='../kamal.gif' 
       alt="Logo"/>
       
                    	<p>This School requires following items Request your valuable contribution for the development of the same. </p>
                        <ul className="links">
                            <li>Needs Toilet Facilties for both Male &amp; Female Students </li>
                            <li>Needs Digital Board for Class 3 to 5.</li>
                            <li>Needs 120 Individual Tables &amp; Chairs for Clas 3 to 5.</li>

                        </ul>
                   
    
        <p>Total Amount required for the project {this.props.history.location.state.state[0].projects[0].estimate}</p>
        <p>Contributed Amount :{this.props.history.location.state.state[0].projects[0].collectedAmount}</p>
        <div className="progress progress-striped">
                  <div className="bar" >
                  </div>
                </div>
{ <h1 key ={this.props.history.location.state.state[0].id}> 
        <button onClick={e => this.onSubmit(this.props.history.location.state.state[0].id)}>
        Donate Now
    </button>
    </h1> }
    </div>
                </div>
              
                */
                }
                </div>
                </div>
                
                 
        )
    }
}

export default withRouter(DonationDetails);
