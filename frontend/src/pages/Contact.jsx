import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-100 min-h-screen pt-20 px-6 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white/50 backdrop-blur-lg rounded-2xl shadow-xl p-10 border border-white/30 text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500 mb-8"
        >
          Contact Us
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg text-gray-700 mb-12"
        >
          We’re here to help you with all inverter and energy solution queries.  
          Reach out to us anytime through phone or email — we’d love to assist you!
        </motion.p>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gradient-to-r from-indigo-50 to-teal-50 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">📞 Call Us</h3>
            <p className="text-gray-800 font-medium">0345-9734873</p>
            <p className="text-gray-800 font-medium">0302-5221883</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gradient-to-r from-teal-50 to-indigo-50 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold text-teal-700 mb-2">📧 Email Us</h3>
            <p className="text-gray-800 font-medium">invdtpvkhanwahan@gmail.com</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
