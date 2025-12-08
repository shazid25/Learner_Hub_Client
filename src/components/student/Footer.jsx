import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0b1220] to-[#070c15] text-gray-400 pt-14">
      <div className="max-w-auto mx-5 my-5 px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Left */}
        <div>
          <div className="flex items-center gap-3">
            <img src={assets.logo} alt="Edemy logo" className="h-8" />
            <span className="text-white text-lg font-semibold">Edemy</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry’s
            standard dummy text.
          </p>
        </div>

        {/* Middle */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About us</li>
            <li className="hover:text-white cursor-pointer">Contact us</li>
            <li className="hover:text-white cursor-pointer">Privacy policy</li>
          </ul>
        </div>

        {/* Right */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Subscribe to our newsletter
          </h3>

          <p className="text-sm mb-4">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-[#111827] px-4 py-2 text-sm rounded-l-md outline-none w-full"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 text-sm text-white rounded-r-md">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-700/40 mt-10"></div>

      {/* Bottom */}
      <p className="text-center text-sm py-6 text-gray-500">
        Copyright © 2024 Edemy. All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer;
