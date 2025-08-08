import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-16 px-8 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            <span className="text-xl font-bold">GWD Global</span>
          </div>
          <p className="text-gray-400">2-56/33/15/A, Sri Sai Nagar, </p>
          <p className="text-gray-400">Madhapur, Hyderabad, </p>
          <p className="text-gray-400">Telangana 500081</p>
          <p className="text-gray-400 mb-4">India</p>

          <div className="flex justify-between text-gray-400">
            <div>
              <p>Phone number</p>
              <p className="font-semibold">1-800-201-1019</p>
            </div>
            <div>
              <p>Email</p>
              <p className="font-semibold">support@gwdglobal.in</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick links</h3>
          <ul>
            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Resources</a></li>
            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">About us</a></li>
            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Contact us</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Social</h3>
          <ul>
            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Facebook</a></li>
            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Instagram</a></li>
            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">LinkedIn</a></li>
            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Youtube</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul>
            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Terms of service</a></li>
            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Privacy policy</a></li>
            <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Cookie policy</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center text-gray-500 mt-8 pt-8 border-t border-gray-800">
        <p>&copy; 2025 GWD Global Pvt Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;