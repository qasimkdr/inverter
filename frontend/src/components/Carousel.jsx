import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css';

const MainCarousel = ({ images = [] }) => {
  return (
    <div className="carousel-container bg-black/70 py-6 rounded-xl shadow-lg">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        interval={3000}
        transitionEffect="fade"
      >
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={image._id} className="carousel-slide">
              <img
                src={image.imageUrl}
                alt={`Slide ${index}`}
                className="rounded-lg object-cover max-h-[500px] mx-auto"
              />
            </div>
          ))
        ) : (
          <div className="carousel-slide bg-gray-800 flex items-center justify-center text-gray-300 h-64 rounded-lg">
            No images to display.
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default MainCarousel;
