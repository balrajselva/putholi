import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img2 from '../img/slider/1.jpg';
import img3 from '../img/slider/2.jpg';
import img4 from '../img/slider/3.jpg';
import '../css/Component_CSS/CarouselComponent.css';

class CarousalComponent extends Component {
    render() {
        return (
            <Carousel showArrows="true" autoPlay="true" showIndicators="false" showStatus="false" >
                <div>
                    <img src={img2} />
                </div>
                <div>
                    <img src={img3} />
                </div>
                <div>
                    <img src={img4} />
                </div>
            </Carousel>
        );
    }
}

export default CarousalComponent;

