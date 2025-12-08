import React from 'react'
import Hero from '../../student/Hero';
import Companies from '../../student/Companies';
import CoursesSection from '../../student/CoursesSection';
import TestimonialsSection from '../../student/TestimonialsSection';
import CallToAction from '../../student/CallToAction';
import Footer from '../../student/Footer';

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      <Hero></Hero>
      <Companies></Companies>
      <CoursesSection></CoursesSection>
      <TestimonialsSection></TestimonialsSection>
      <CallToAction></CallToAction>
      <Footer></Footer>
    </div>
  )
}

export default Home;
