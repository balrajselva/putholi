import React, { PureComponent, Component } from 'react'
import { withRouter } from 'react-router'

class MultipleImage extends Component {
    state={
        currentIndex: 0,
        translateValue: 0
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
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
export default withRouter(MultipleImage);