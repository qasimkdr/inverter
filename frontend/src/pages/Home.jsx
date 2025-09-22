import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import MainCarousel from "../components/Carousel";
import apiClient from "../api/apiClient";

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const [error, setError] = useState(null);

  const { ref: trendingRef, inView: trendingInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: recentRef, inView: recentInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: whyRef } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: reviewsRef } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: citiesRef } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: faqRef } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const carouselRes = await apiClient.get("/carousel");
        setCarouselImages(Array.isArray(carouselRes.data) ? carouselRes.data : []);

        const trendingRes = await apiClient.get("/products/trending");
        setTrendingProducts(Array.isArray(trendingRes.data) ? trendingRes.data : []);

        const recentRes = await apiClient.get("/products");
        setRecentProducts(Array.isArray(recentRes.data) ? recentRes.data.slice(0, 4) : []);

        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please check the backend connection.");
      }
    };
    fetchHomeData();
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 min-h-screen pt-16">
      {/* Hero Carousel with light black background */}
      <div className="bg-black/70 py-6 rounded-xl shadow-lg mx-4">
        <MainCarousel images={carouselImages} />
      </div>

      {/* Error */}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-auto my-4 w-11/12"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {/* Trending Products */}
      <section className="py-20 px-8 text-center bg-gradient-to-r from-indigo-50 via-white to-teal-50 rounded-3xl shadow-xl mx-6 my-12 backdrop-blur-lg">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
          Trending Inverters
          <span className="block w-24 h-1 bg-gradient-to-r from-indigo-500 to-teal-400 mx-auto mt-4 rounded-full"></span>
        </h2>
        <div
          ref={trendingRef}
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ${
            trendingInView ? "animate-fadeInUp" : "opacity-0"
          }`}
        >
          {trendingProducts.length > 0 ? (
            trendingProducts.map((product) => (
              <div key={product._id || product.id} className="transform transition-transform hover:scale-105 duration-300">
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No trending inverters found.</p>
          )}
        </div>
        <div className="mt-10">
          <Link
            to="/products"
            className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:opacity-90 transition"
          >
            See More
          </Link>
        </div>
      </section>

      {/* Inverter Banner after Trending - ✅ Updated with inverter1.png */}
      <div className="w-full h-96 my-16 rounded-3xl shadow-lg bg-black flex items-center justify-center">
  <img
    src="/inverter1.png"
    alt="Inverter 1"
    className="h-full object-contain"
  />
</div>

      {/* Recently Added */}
      <section className="py-20 px-8 text-center bg-gradient-to-r from-teal-50 via-white to-indigo-50 rounded-3xl shadow-xl mx-6 my-12 backdrop-blur-lg">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
          Recently Added Inverters
          <span className="block w-24 h-1 bg-gradient-to-r from-indigo-500 to-teal-400 mx-auto mt-4 rounded-full"></span>
        </h2>
        <div
          ref={recentRef}
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ${
            recentInView ? "animate-fadeInUp" : "opacity-0"
          }`}
        >
          {recentProducts.length > 0 ? (
            recentProducts.map((product) => (
              <div key={product._id || product.id} className="transform transition-transform hover:scale-105 duration-300">
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No recent inverters found.</p>
          )}
        </div>
        <div className="mt-10">
          <Link
            to="/products"
            className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:opacity-90 transition"
          >
            See More
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={whyRef} className="py-20 px-6 text-center bg-gradient-to-r from-indigo-100 via-white to-teal-100">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
          Why Choose Our Inverters?
          <span className="block w-24 h-1 bg-gradient-to-r from-indigo-500 to-teal-400 mx-auto mt-4 rounded-full"></span>
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-8 md:space-y-0">
          <div className="bg-white/40 backdrop-blur-lg border border-white/30 p-8 rounded-2xl shadow-xl max-w-sm">
            <h3 className="text-2xl font-semibold text-indigo-700 mb-2">Reliable Power</h3>
            <p className="text-gray-700">Uninterrupted energy for homes & businesses with advanced inverter technology.</p>
          </div>
          <div className="bg-white/40 backdrop-blur-lg border border-white/30 p-8 rounded-2xl shadow-xl max-w-sm">
            <h3 className="text-2xl font-semibold text-indigo-700 mb-2">Energy Efficient</h3>
            <p className="text-gray-700">Save on bills with high-efficiency inverters designed for sustainability.</p>
          </div>
          <div className="bg-white/40 backdrop-blur-lg border border-white/30 p-8 rounded-2xl shadow-xl max-w-sm">
            <h3 className="text-2xl font-semibold text-indigo-700 mb-2">Trusted Quality</h3>
            <p className="text-gray-700">Backed by 10,000+ installations and excellent customer satisfaction ratings.</p>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section ref={reviewsRef} className="py-20 px-6 bg-gradient-to-r from-white via-indigo-50 to-teal-50 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
          What Our Customers Say
          <span className="block w-24 h-1 bg-gradient-to-r from-indigo-500 to-teal-400 mx-auto mt-4 rounded-full"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-white/40 backdrop-blur-lg border border-white/30 rounded-xl shadow-lg">
            <p className="text-gray-700 italic">“The inverter I bought has been running flawlessly during load-shedding. Truly reliable!”</p>
            <h4 className="mt-4 font-bold text-indigo-700">— Ahmed, Karachi</h4>
          </div>
          <div className="p-6 bg-white/40 backdrop-blur-lg border border-white/30 rounded-xl shadow-lg">
            <p className="text-gray-700 italic">“Our electricity bills dropped significantly after installing their energy-efficient inverter.”</p>
            <h4 className="mt-4 font-bold text-indigo-700">— Sana, Lahore</h4>
          </div>
          <div className="p-6 bg-white/40 backdrop-blur-lg border border-white/30 rounded-xl shadow-lg">
            <p className="text-gray-700 italic">“Great customer service, fast delivery, and an inverter that works like a charm!”</p>
            <h4 className="mt-4 font-bold text-indigo-700">— Bilal, Islamabad</h4>
          </div>
        </div>
      </section>

      {/* Inverter Banner after Reviews - ✅ Updated with inverter2.png */}
      <div className="w-full h-96 my-16 rounded-3xl shadow-lg bg-black flex items-center justify-center">
  <img
    src="/inverter2.png"
    alt="Inverter 2"
    className="h-full object-contain"
  />
</div>

      {/* Cities */}
      <section ref={citiesRef} className="py-20 px-6 text-center bg-gradient-to-r from-teal-100 via-white to-indigo-100">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
          We Are Famous In
          <span className="block w-24 h-1 bg-gradient-to-r from-indigo-500 to-teal-400 mx-auto mt-4 rounded-full"></span>
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-8 md:space-y-0">
          {[{ name: "Karachi", image: "/Karachi.jpg" }, { name: "Lahore", image: "/lahore.png" }, { name: "Islamabad", image: "/islamabad.jpg" }].map(
            (city, index) => (
              <div
                key={index}
                className="relative w-72 h-80 rounded-2xl overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <img src={city.image} alt={city.name} className="absolute inset-0 w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-black/40 flex items-end">
                  <h4 className="w-full text-white text-xl font-bold py-3 text-center bg-gradient-to-r from-indigo-600/80 to-teal-500/80">
                    {city.name}
                  </h4>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} className="py-20 px-8 text-center bg-gradient-to-r from-indigo-50 via-white to-teal-50">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
          Frequently Asked Questions
          <span className="block w-24 h-1 bg-gradient-to-r from-indigo-500 to-teal-400 mx-auto mt-4 rounded-full"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white/40 backdrop-blur-lg border border-white/30 p-6 rounded-xl shadow-md text-left">
            <h3 className="text-lg font-semibold text-indigo-700">Q: What is your return policy?</h3>
            <p className="mt-2 text-gray-700">A: We offer a 30-day return policy on all our products.</p>
          </div>
          <div className="bg-white/40 backdrop-blur-lg border border-white/30 p-6 rounded-xl shadow-md text-left">
            <h3 className="text-lg font-semibold text-indigo-700">Q: How can I track my order?</h3>
            <p className="mt-2 text-gray-700">A: You will receive a tracking number via email once your order has shipped.</p>
          </div>
          <div className="bg-white/40 backdrop-blur-lg border border-white/30 p-6 rounded-xl shadow-md text-left">
            <h3 className="text-lg font-semibold text-indigo-700">Q: Do you provide installation services?</h3>
            <p className="mt-2 text-gray-700">A: Yes, we offer professional installation for all inverters.</p>
          </div>
          <div className="bg-white/40 backdrop-blur-lg border border-white/30 p-6 rounded-xl shadow-md text-left">
            <h3 className="text-lg font-semibold text-indigo-700">Q: What warranty do you offer?</h3>
            <p className="mt-2 text-gray-700">A: All our inverters come with a 2–5 year warranty depending on the model.</p>
          </div>
          <div className="bg-white/40 backdrop-blur-lg border border-white/30 p-6 rounded-xl shadow-md text-left">
            <h3 className="text-lg font-semibold text-indigo-700">Q: Are spare parts available?</h3>
            <p className="mt-2 text-gray-700">A: Yes, we stock genuine spare parts for all inverter models we sell.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
