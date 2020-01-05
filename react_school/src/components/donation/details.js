import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './donation_style.css'
class DonationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 0,
      currentIndex: 0,
      translateValue: 0,
     // imageList: this.props.history.location.state.state[0].proofOfIds.files
      imageList: []
    }
  }

  goToPrevSlide = () => {
    if (this.state.currentIndex === 0)
      return;

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
      translateValue: prevState.translateValue + this.slideWidth()
    }))
  }

  goToNextSlide = () => {
    // Exiting the method early if we are at the end of the images array.
    // We also want to reset currentIndex and translateValue, so we return
    // to the first image in the array.
    if (this.state.currentIndex === this.state.imageList.length - 1) {
      return this.setState({
        currentIndex: 0,
        translateValue: 0
      })
    }

    // This will not run if we met the if condition above
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      translateValue: prevState.translateValue + -(this.slideWidth())
    }));
  }
  slideWidth = () => {
    return document.querySelector('.slide').clientWidth
  }

  onSubmit = (e) => {
    const userSelectId = this.props.history.location.state.state.filter(
      function (userFilter) {
        return userFilter.id == e;
      });


    this.props.history.push('donationRegistrationForm', { state: userSelectId })

  }
  calculateContribution() {
    return this.props.history.location.state.state[0].projects[0].estimate - this.props.history.location.state.state[0].projects[0].collectedAmount

  }


  componentDidMount() {
    if (this.state.percentage === 100) return
    let calculatePercentage = (this.props.history.location.state.state[0].projects[0].collectedAmount * 100) / this.props.history.location.state.state[0].projects[0].estimate;
    this.setState({ percentage: calculatePercentage })
  }


  render() {


    const Slide = ({ image }) => {
      const styles = {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 60%'
      }
      return <div className="slide" style={styles}></div>
    }


    const LeftArrow = (props) => {
      return (
        <div className="backArrow arrow" onClick={props.goToPrevSlide} >
          <i className="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
        </div>
      );
    }


    const RightArrow = (props) => {
      return (
        <div className="nextArrow arrow" onClick={props.goToNextSlide}>
          <i className="fa fa-arrow-right fa-2x" aria-hidden="true"></i>
        </div>
      );
    }


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

    const requirements = this.props.history.location.state.state[0].projects[0].requirements;
    return (
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

                  <div className="slider">
                    <div className="slider-wrapper"
                      style={{
                        transform: `translateX(${this.state.translateValue}px)`,
                        transition: 'transform ease-out 0.45s'
                      }}>
                      {this.state.imageList.map((value, index) =>
                        <Slide key={index} image={value} />
                      )}
                    </div>
                    <LeftArrow
                      goToPrevSlide={this.goToPrevSlide}
                    />

                    <RightArrow
                      goToNextSlide={this.goToNextSlide}
                    />
                  </div>

                  <div className="span11"><h4 className="title">Total Amount required for the project Rs. {this.props.history.location.state.state[0].projects[0].estimate}  </h4> </div>


                </div>
                <div className="span4">
                  <p>This School requires following items Request your valuable contribution for the development of the same. </p>
                  <ul className="links">
                    {requirements.map((value, index) =>
                      <li>Needs {value.quantity} {value.assetName}</li>
                    )}
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
                <a className="btn dark_btn marg20" href="/donation">Back to Search Results</a>
                {this.calculateContribution() != 0 &&
                  <a onClick={e => this.onSubmit(this.props.history.location.state.state[0].id)} className="btn dark_btn marg20" >Donate Now</a>
                }
              </div>
            </div>
          </div>


        </div>
      </div>


    )
  }
}

export default withRouter(DonationDetails);
