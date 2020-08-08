import React, { PureComponent, Component } from 'react'
import { withRouter } from 'react-router';
import './sliderImage.css';

class MultipleImage extends Component {
    state={
        currentIndex: 0,
        translateValue: 0,
        images:null
    }

    componentDidMount(){
      console.log("Props",this.props,this.props.images)
      if(this.props.images !== undefined && this.props.images.length > 0){
        this.setState({
          images:this.props.images
        })
      }
      else if(this.props.rawImages !== undefined && this.props.rawImages.length > 0){
        this.setState({images:this.props.rawImages})
      }
    }

    componentDidUpdate(){
      console.log("Props",this.props,this.props.images)
      if(this.props.images !== undefined && this.props.images.length > 0){
        if(this.props.images === this.state.images){
          return
        }
        this.setState({
          images:this.props.images
        })
      }
      else if(this.props.rawImages !== undefined && this.props.rawImages.length > 0){
        if(this.props.rawImages === this.state.images){
          return
        }
        this.setState({images:this.props.rawImages})
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
    if (this.state.currentIndex === this.state.images.length - 1) {
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
          console.log("state",this.state)
        return (
            <div className="page_container">
                {this.state.images !==null ?<div><b>No. of images : {this.state.images.length}</b><br/><br/></div>:null}
                <div className="wrap">
                    <div className="container">
                        <div className="row pad25">
                            <div className="span6">
                                <div className="slider">
                                    <div className="slider-wrapper"
                                    style={{
                                        transform: `translateX(${this.state.translateValue}px)`,
                                        transition: 'transform ease-out 0.45s'
                                    }}>
                                    {this.props.images!==undefined ?this.props.images.map((value, index) =>
                                        <Slide key={index} image={'data:image/png;base64,'+value.image} />
                                    ):null}
                                    {this.props.rawImages!==undefined ?this.props.rawImages.map((value, index) =>
                                        <Slide key={index} image={value} />
                                    ):null}
                                    </div>
                                    <LeftArrow
                                    goToPrevSlide={this.goToPrevSlide}
                                    />
                                    <RightArrow
                                    goToNextSlide={this.goToNextSlide}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(MultipleImage);