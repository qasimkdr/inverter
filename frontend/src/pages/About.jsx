import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-100 min-h-screen pt-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500 mb-12"
        >
          About Us
        </motion.h1>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg text-gray-700 text-center mb-12 leading-relaxed"
        >
          Welcome to <span className="font-bold text-indigo-600">Inverter Solutions</span> —
          Pakistan’s trusted name in power backup and inverter technology.  
          With over <span className="font-semibold">6 years of experience</span>,
          we are a registered and reliable service provider, committed to delivering
          sustainable energy solutions across the nation.
        </motion.p>

        {/* Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/30"
          >
            <h3 className="text-xl font-bold text-indigo-700 mb-3">💼 Reliable Service</h3>
            <p className="text-gray-700">
              Registered and trusted — thousands of happy customers rely on us for
              uninterrupted energy.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/30"
          >
            <h3 className="text-xl font-bold text-teal-700 mb-3">⚡ Spare Parts & Support</h3>
            <p className="text-gray-700">
              We provide genuine spare parts and full after-sales support to keep
              your systems running smoothly.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/30"
          >
            <h3 className="text-xl font-bold text-indigo-700 mb-3">🚚 Nationwide Delivery</h3>
            <p className="text-gray-700">
              No matter where you are in Pakistan — we deliver quality inverters
              and solar solutions right to your doorstep.
            </p>
          </motion.div>
        </div>

        {/* Contact & Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-gradient-to-r from-indigo-50 to-teal-50 p-8 rounded-2xl shadow-lg mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📍 Our Office</h2>
          <p className="text-gray-700 mb-6">
            Main Kotri Kabir Road, Khan Wahan  
            Tehsil Mehrabpur, District Naushahro Feroze, Sindh
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">📞 Contact Us</h2>
          <p className="text-gray-700">0345-9734873 | 0302-5221883</p>
          <p className="text-gray-700">Email: invdtpvkhanwahan@gmail.com</p>
        </motion.div>

        {/* Praise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-indigo-600 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We don’t just sell inverters — we deliver peace of mind.  
            From installation to after-sales support, our expert team ensures you get
            maximum value. With <span className="font-semibold">nationwide delivery</span>,
            top-notch service, and reliable products, we are proud to be Pakistan’s
            go-to choice for energy solutions.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
