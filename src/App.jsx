import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './components/pages/studentPage/Home'
import CoursesList from './components/pages/studentPage/CoursesList'
import CourseDetails from './components/pages/studentPage/CourseDetails'
import MyEnrollments from './components/pages/studentPage/MyEnrollments'
import Player from './components/pages/studentPage/Player'
import Loading from './components/student/Loading'
import Dashboard from './components/pages/educatorPage/Dashboard'
import AddCourse from './components/pages/educatorPage/AddCourse'
import MyCourses from './components/pages/educatorPage/MyCourses'
import StudentsEnrolled from './components/pages/educatorPage/StudentsEnrolled'
import Educator from './components/pages/educatorPage/Educator'
import Navbar from './components/student/Navbar'

const App = () => {
  const isEducatorRoute = useMatch('/educator/*');

  return (

    <div className='text-default min-h-screen bg-white'>
      {!isEducatorRoute && <Navbar />}

      {/* <Navbar /> */}

      <Routes>
        {/* student routes */}
        <Route path='/' element={<Home />} />
        <Route path='/course-list' element={<CoursesList />} />
        <Route path='/course-list/:input' element={<CoursesList />} />
        <Route path='/course/:id' element={<CourseDetails />} />
        <Route path='/my-enrollments' element={<MyEnrollments />} />
        <Route path='/player/:courseId' element={<Player />} />
        <Route path='/loading/:path' element={<Loading />} />

        {/* educator parent route */}

        {/* <Route path='/educator' element={<Educator />}>
          <Route path='educator' element={< Dashboard />} />
          <Route path='add-courses' element={<AddCourse />} />
          <Route path='my-courses' element={<MyCourses />} />
          <Route path='students-enrolled' element={<StudentsEnrolled />} />
        </Route> */}

        <Route path="/educator" element={<Educator />}>
          <Route index element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={<StudentsEnrolled />} />
        </Route>


      </Routes>
    </div>
  )
}

export default App;
