import React from 'react'
import { Outlet } from 'react-router-dom';
import EducatorNavbar from '../../educator/EducatorNavbar';
import Sidebar from '../../educator/Sidebar';
import EducatorFooter from '../../educator/EducatorFooter';

const Educator = () => {
  return (
    <div className='text-default min-h-screen bg-white'>
      <EducatorNavbar></EducatorNavbar>

      <div className='flex'>
        <Sidebar></Sidebar>
        <div className='flex-1'>
          {<Outlet />}
        </div>

      </div>
      <EducatorFooter></EducatorFooter>
    </div>
  )
}

export default Educator;
