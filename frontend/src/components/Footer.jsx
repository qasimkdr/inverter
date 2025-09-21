import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-200 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-wide">
            INVDT
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Your modern reliable INVERTER. <br /> Shop smarter, live
            better.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-600 inline-block pb-1">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <a href="/" className="hover:text-teal-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="hover:text-teal-400 transition-colors"
              >
                Products
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-teal-400 transition-colors">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-teal-400 transition-colors">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Developer Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-600 inline-block pb-1">
            Developer Contact
          </h3>
          <ul className="space-y-3">
            <li>
              <a
                href="tel:03163273012"
                className="block text-teal-400 font-semibold text-lg hover:text-white transition-all transform hover:scale-105"
              >
                📞 Call: 03163273012
              </a>
            </li>
          </ul>
          <p className="mt-3 text-sm text-gray-400">
            Reach out if you want a website like this.
          </p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-600 inline-block pb-1">
            Follow Us
          </h3>
          <div className="flex space-x-5 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 transition-transform transform hover:scale-110"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-400 transition-transform transform hover:scale-110"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-500 transition-transform transform hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-300 transition-transform transform hover:scale-110"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition-transform transform hover:scale-110"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-teal-400">INVDT</span>. All rights
        reserved.
      </div>
    </footer>
  );
}
