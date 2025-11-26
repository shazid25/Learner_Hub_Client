// import React from 'react'
// import { assets } from '../../assets/assets.js'

// const Navbar = () => {
//   return (
//     <nav className='flex justify-between items-center px-6 py-4 bg-gray-800 shadow-lg'>
//       {/* Logo */}
//       <div className='flex items-center'>
//         <img 
//           src={assets.logo} 
//           alt="Logo" 
//           className='w-28 lg:w-32 cursor-pointer hover:opacity-80 transition-opacity' 
//         />
//       </div>

//       {/* Navigation Links */}
//       <div className='hidden md:flex'>
//         <ul className='flex space-x-6 lg:space-x-10 text-white font-semibold'>
//           <li className='cursor-pointer hover:text-gray-300 transition-colors duration-200'>
//             Home
//           </li>
//           <li className='cursor-pointer hover:text-gray-300 transition-colors duration-200'>
//             My Courses
//           </li>
//           <li className='cursor-pointer hover:text-gray-300 transition-colors duration-200'>
//             Add Course
//           </li>
//           <li className='cursor-pointer hover:text-gray-300 transition-colors duration-200'>
//             Students Enrolled
//           </li>
//         </ul>
//       </div>

//       {/* User Profile/Account Section */}
//       <div className='flex items-center space-x-4'>
//         <div className='w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-500 transition-colors'>
//           <span className='text-white font-semibold'>U</span>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Navbar;










import React from 'react'
import { assets } from '../../assets/assets.js'
import { Link } from 'react-router-dom';

const Navbar = () => {

const isCourseListPage = location.pathname.includes('/course-list');

  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
      {/* Logo */}
      <div className='flex items-center'>
        <img 
          src={assets.logo} 
          alt="Logo" 
          className='w-28 lg:w-32 cursor-pointer hover:opacity-80 transition-opacity' 
        />
      </div>

      {/* Navigation Links laptop */}
      
    <div className='hidden md:flex items-center gap-5 text-gray-500'>

      <div className='flex items-center gap-5'>
     <button>Become Educator</button>
     | <Link to ='/my-enrollments'>My Enrollments</Link>
      </div>

      <button className='bg-blue-600 text-white px-5 py-2 rounded-full'>Create Account</button>

    </div>

  {/* Nav link mobile */}    

      <div className='md:hidden flex gap-2 sm:gap-5 items-center text-gray-500'></div>


    </div>
  )
}

export default Navbar;