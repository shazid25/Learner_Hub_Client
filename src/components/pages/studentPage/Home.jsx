import React from 'react'
import Hero from '../../student/Hero';
import Companies from '../../student/Companies';
import CoursesSection from '../../student/CoursesSection';

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      <Hero></Hero>
      <Companies></Companies>
      <CoursesSection></CoursesSection>
    </div>
  )
}

export default Home;
