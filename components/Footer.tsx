'use client';
import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

const SocialIcon = ({ href, icon: Icon, label }: { href: string, icon: React.ElementType, label: string }) => (
  <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-400 transition-colors duration-300">
    <Icon className="w-6 h-6" />
  </a>
);

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <li>
    <Link href={href} className="text-gray-400 hover:text-white transition-colors duration-300">
      {children}
    </Link>
  </li>
);

const Footer: React.FC = () => {
  return (
    <footer className="glass-panel border-t border-white/10 mt-auto w-full relative z-10">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Branding & Contact */}
          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-bold text-white tracking-wider">GWD Global</h2>
            <p className="text-gray-400 mt-2 text-sm">Your Vision, Our Expertise.</p>
            <div className="mt-6 space-y-4 text-sm">
              <p className="text-gray-300">2-56/33/15/A, Sri Sai Nagar,<br/>Madhapur, Hyderabad, 500081</p>
              <p><span className="font-semibold text-white">Phone:</span> <a href="tel:+917981374451" className="text-red-400 hover:text-red-300">+91 79813 74451</a></p>
              <p><span className="font-semibold text-white">Phone:</span> <a href="tel:+918919469960" className="text-red-400 hover:text-red-300">+91 89194 69960</a></p>
              <p><span className="font-semibold text-white">Email:</span> <a href="mailto:rahman@gwdglobal.in" className="text-red-400 hover:text-red-300">rahman@gwdglobal.in</a></p>
              <p><span className="font-semibold text-white">Email:</span> <a href="mailto:mudabbir@gwdglobal.in" className="text-red-400 hover:text-red-300">mudabbir@gwdglobal.in</a></p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/services">Contact Us</FooterLink>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white">Legal</h3>
            <ul className="mt-4 space-y-3">
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/cookies">Cookie Policy</FooterLink>
            </ul>
          </div>

          {/* Social Media */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold text-white">Connect With Us</h3>
            <div className="flex space-x-5 mt-4">
              <SocialIcon href="#" icon={FaFacebook} label="Facebook" />
              <SocialIcon href="https://www.instagram.com/gwd.in/" icon={FaInstagram} label="Instagram" />
              <SocialIcon href="https://www.linkedin.com/company/gwd-global" icon={FaLinkedin} label="LinkedIn" />
              <SocialIcon href="#" icon={FaTwitter} label="Twitter" />
              <SocialIcon href="#" icon={FaYoutube} label="YouTube" />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} GWD Global Pvt Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
