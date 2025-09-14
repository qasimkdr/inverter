import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import MainCarousel from '../components/Carousel';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the new CSS file

// Placeholder for city data
const cities = [
  { name: 'Karachi', image: 'https://images.unsplash.com/photo-1627931398867-b5b0d0d8f0f0' },
  { name: 'Lahore', image: 'https://images.unsplash.com/photo-1627931398867-b5b0d0d8f0f0' },
  { name: 'Islamabad', image: 'https://images.unsplash.com/photo-1627931398867-b5b0d0d8f0f0' }
];

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const trendingRes = await axios.get('http://localhost:5000/api/products/trending');
        setTrendingProducts(trendingRes.data);
        const recentRes = await axios.get('http://localhost:5000/api/products');
        setRecentProducts(recentRes.data.slice(0, 4));
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      <MainCarousel />
      
      {/* Trending Products Section */}
      <section className="home-section">
        <h2>Trending Products</h2>
        <div className="product-grid">
          {trendingProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="view-more-container">
          <Link to="/products" className="view-more-button">See More</Link>
        </div>
      </section>

      {/* Full-width Photo Section 1 */}
      <div className="full-width-photo" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1587831998592-3d854e4c297c')` }}></div>

      {/* Recently Added Products Section */}
      <section className="home-section">
        <h2>Recently Added Products</h2>
        <div className="product-grid">
          {recentProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="view-more-container">
          <Link to="/products" className="view-more-button">See More</Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="home-section">
        <h2>Why Choose Us?</h2>
        <div className="info-cards-container">
          <div className="info-card animated-left">
            <h3>Why We are Best</h3>
            <p>Our commitment to quality, innovative products, and exceptional customer service makes us a leader in the industry.</p>
          </div>
          <div className="info-card">
            <h3>What Our Customers Are Saying</h3>
            <p>"Outstanding service and fast delivery! Highly recommend." - A Happy Customer</p>
          </div>
          <div className="info-card animated-right">
            <h3>Overall Deliveries & Ratings</h3>
            <p>10,000+ Successful Deliveries | 4.9/5 Star Rating</p>
          </div>
        </div>
      </section>

      {/* Famous Cities Section */}
      <section className="home-section cities-section">
        <h2>We Are Famous In</h2>
        <div className="city-cards-container">
          {cities.map((city, index) => (
            <div key={index} className="city-card">
              <img src={city.image} alt={city.name} />
              <h4>{city.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Full-width Photo Section 2 */}
      <div className="full-width-photo" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1549429402-9908865a7707')` }}></div>

      {/* FAQ Section */}
      <section className="home-section faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>Q: What is your return policy?</h3>
          <p>A: We offer a 30-day return policy on all our products.</p>
        </div>
        <div className="faq-item">
          <h3>Q: How can I track my order?</h3>
          <p>A: You will receive a tracking number via email once your order has shipped.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;