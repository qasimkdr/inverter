import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css';

const images = [
  'https://images.unsplash.com/photo-1542436152-4749f706d859?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542436152-4749f706d859?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542436152-4749f706d859?q=80&w=2070&auto=format&fit=crop',
];

const MainCarousel = () => {
  return (
    <div className="carousel-container">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        interval={5000}
        transitionEffect="fade"
      >
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MainCarousel;