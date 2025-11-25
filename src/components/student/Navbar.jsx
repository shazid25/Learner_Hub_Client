import React from 'react'
import { assets } from '../../assets/assets.js'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center px-6 py-4 bg-gray-800 shadow-lg'>
      {/* Logo */}
      <div className='flex items-center'>
        <img 
          src={assets.logo} 
          alt="Logo" 
          className='w-28 lg:w-32 cursor-pointer hover:opacity-80 transition-opacity' 
        />
      </div>

      {/* Navigation Links */}
      <div className='hidden md:flex'>
        <ul className='flex space-x-6 lg:space-x-10 text-white font-semibold'>
          <li className='cursor-pointer hover:text-gray-300 transition-colors duration-200'>
            Home
          </li>
          <li className='cursor-pointer hover:text-gray-300 transition-colors duration-200'>
            My Courses
          </li>
          <li className='cursor-pointer hover:text-gray-300 transition-colors duration-200'>
            Add Course
          </li>
          <li className='cursor-pointer hover:text-gray-300 transition-colors duration-200'>
            Students Enrolled
          </li>
        </ul>
      </div>

      {/* User Profile/Account Section */}
      <div className='flex items-center space-x-4'>
        <div className='w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-500 transition-colors'>
          <span className='text-white font-semibold'>U</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;