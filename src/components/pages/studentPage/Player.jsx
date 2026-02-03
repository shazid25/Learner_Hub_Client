// import React, { useContext, useEffect, useState } from 'react'
// import { AppContext } from '../../context/AppContext'
// import { useParams } from 'react-router-dom'
// import { assets } from '../../../assets/assets'
// import humanizeDuration from 'humanize-duration'
// import YouTube from 'react-youtube'
// import Footer from '../../student/Footer'
// import Rating from '../../student/Rating'
// import Loading from '../../student/Loading'

// const Player = () => {
//   const { enrolledCourses, calculateChapterTime, backendUrl, getToken, userData, fetchUserEnrolledCourses } = useContext(AppContext)

//   const { courseId } = useParams()
//   const [courseData, setCourseData] = useState(null)
//   const [openSections, setOpenSections] = useState({})
//   const [playerData, setPlayerData] = useState(null)
//   const [progressData, setProgressData] = useState(null)
//   const [initialRating, setInitialRating ] = useState(0)


//   const getCourseData = () => {
//   enrolledCourses.map((course) => {
//     if (course._id === courseId) {
//       setCourseData(course)
//       course.courseRatings.map((item) => {
//         if (item.userId === userData._id) {
//           setInitialRating(item.rating)
//         }
//       })
//     }
//   })
// }


//   useEffect(() => {
//     const getCourseData = () => {
//       if (enrolledCourses && Array.isArray(enrolledCourses)) {
//         const foundCourse = enrolledCourses.find((course) => course._id === courseId)
//         if (foundCourse) {
//           setCourseData(foundCourse)
//         }
//       }
//     }
//     getCourseData()
//   }, [enrolledCourses, courseId])

//   const toggleSection = (index) => {
//     setOpenSections((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }))
//   }
  

//   if (!courseData) {
//     return (
//       <>
//         <div className="flex justify-center items-center h-screen">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//         <Footer />
//       </>
//     )
//   }

//   if (!courseData.courseContent || !Array.isArray(courseData.courseContent)) {
//     return (
//       <>
//         <div className="flex justify-center items-center h-screen">
//           <p className="text-gray-600">No course content available</p>
//         </div>
//         <Footer />
//       </>
//     )
//   }

//   const getVideoId = (url) => {
//     if (!url) return ''
//     const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)
//     return match ? match[1] : url.split('/').pop()
//   }

//   return (
//     <>
//       <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
//         <div className='text-gray-800'>
//           <h2 className='text-xl font-semibold'>Course Structure</h2>
//           <div className='pt-5'>
//             {courseData.courseContent.map((chapter, index) => {
//               if (!chapter || !chapter.chapterContent || !Array.isArray(chapter.chapterContent)) {
//                 return null
//               }
//               return (
//                 <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
//                   <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={() => toggleSection(index)}>
//                     <div className='flex items-center gap-2'>
//                       <img
//                         src={assets.down_arrow_icon}
//                         alt='arrow icon'
//                         className={`transition-transform duration-300 ${openSections[index] ? 'rotate-180' : ''}`}
//                       />
//                       <p className='font-medium md:text-base text-sm'>
//                         {chapter.chapterTitle || `Chapter ${index + 1}`}
//                       </p>
//                     </div>
//                     <p className='text-sm md:text-default'>
//                       {chapter.chapterContent.length} Lectures - {calculateChapterTime ? calculateChapterTime(chapter) : '0 min'}
//                     </p>
//                   </div>
//                   <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96' : 'max-h-0'}`}>
//                     <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
//                       {chapter.chapterContent.map((lecture, i) => {
//                         if (!lecture) return null
//                         return (
//                           <li key={i} className='flex items-start gap-2 py-1'>
//                             <img
//                               src={false ? assets.blue_tick_icon : assets.play_icon}
//                               alt='play icon'
//                               className='w-4 h-4 mt-1'
//                             />
//                             <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
//                               <p>{lecture.lectureTitle || `Lecture ${i + 1}`}</p>
//                               <div className='flex gap-2'>
//                                 {lecture.lectureUrl && (
//                                   <p
//                                     onClick={() => setPlayerData({
//                                       ...lecture,
//                                       chapter: index + 1,
//                                       lecture: i + 1
//                                     })}
//                                     className='text-blue-500 cursor-pointer hover:underline'
//                                   >
//                                     Watch
//                                   </p>
//                                 )}
//                                 <p>
//                                   {lecture.lectureDuration
//                                     ? humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })
//                                     : '0 min'
//                                   }
//                                 </p>
//                               </div>
//                             </div>
//                           </li>
//                         )
//                       })}
//                     </ul>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//           <div className='flex items-center gap-2 py-3 mt-10'>
//             <h1 className='text-xl font-bold'>Rate this course</h1>
//             <Rating initialRating={0} />
//           </div>

//         </div>
//         <div className='md:mt-10'>
//           {playerData ? (
//             <div>
//               <YouTube
//                 videoId={getVideoId(playerData.lectureUrl)}
//                 iframeClassName='w-full aspect-video'
//               />
//               <div className='flex justify-between items-center mt-1'>
//                 <p>
//                   {playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}
//                 </p>
//                 <button className='text-blue-600'>
//                   {false ? 'Completed' : 'Mark Complete'}
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <img src={courseData ? courseData.courseThumbnail : ''} alt="" />
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   )
// }

// export default Player;











import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import { assets } from '../../../assets/assets'
import humanizeDuration from 'humanize-duration'
import YouTube from 'react-youtube'
import Footer from '../../student/Footer'
import Rating from '../../student/Rating'
import Loading from '../../student/Loading'
import axios from 'axios'
import { toast } from 'react-toastify'

const Player = () => {
  const { 
    enrolledCourses, 
    calculateChapterTime, 
    backendUrl, 
    getToken, 
    userData, 
    fetchUserEnrolledCourses 
  } = useContext(AppContext)

  const { courseId } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})
  const [playerData, setPlayerData] = useState(null)
  const [progressData, setProgressData] = useState(null)
  const [initialRating, setInitialRating] = useState(0)

  // Fetch Course Data from Enrolled Courses
  const getCourseDetails = () => {
    const foundCourse = enrolledCourses.find(course => course._id === courseId)
    if (foundCourse) {
      setCourseData(foundCourse)
      // Set initial rating if user has already rated
      const userRating = foundCourse.courseRatings.find(item => item.userId === userData?._id)
      if (userRating) {
        setInitialRating(userRating.rating)
      }
    }
  }

  // Fetch Progress from Backend
  const getCourseProgress = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.post(
        backendUrl + '/api/user/get-course-progress', 
        { courseId }, 
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        setProgressData(data.progressData)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseDetails()
    }
  }, [enrolledCourses, courseId, userData])

  useEffect(() => {
    getCourseProgress()
  }, [courseId])

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const markLectureAsCompleted = async (lectureId) => {
    try {
      const token = await getToken()
      const { data } = await axios.post(
        backendUrl + '/api/user/update-course-progress', 
        { courseId, lectureId }, 
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        getCourseProgress() // Refresh progress
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleRate = async (rating) => {
    try {
      const token = await getToken()
      const { data } = await axios.post(
        backendUrl + '/api/user/add-rating', 
        { courseId, rating }, 
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        fetchUserEnrolledCourses() // Refresh global state
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getVideoId = (url) => {
    if (!url) return ''
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)
    return match ? match[1] : url.split('/').pop()
  }

  // Check if a lecture is completed
  const isLectureCompleted = (lectureId) => {
    return progressData?.lectureCompleted?.includes(lectureId)
  }

  if (!courseData) return <Loading />

  return (
    <>
      <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
        
        {/* Left Side: Course Structure */}
        <div className='text-gray-800'>
          <h2 className='text-xl font-semibold'>Course Structure</h2>
          <div className='pt-5'>
            {courseData.courseContent.map((chapter, index) => (
              <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                <div 
                  className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' 
                  onClick={() => toggleSection(index)}
                >
                  <div className='flex items-center gap-2'>
                    <img
                      src={assets.down_arrow_icon}
                      alt=''
                      className={`transition-transform duration-300 ${openSections[index] ? 'rotate-180' : ''}`}
                    />
                    <p className='font-medium md:text-base text-sm'>
                      {chapter.chapterTitle}
                    </p>
                  </div>
                  <p className='text-sm md:text-default'>
                    {chapter.chapterContent.length} Lectures - {calculateChapterTime(chapter)}
                  </p>
                </div>

                <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                    {chapter.chapterContent.map((lecture, i) => (
                      <li key={i} className='flex items-start gap-2 py-1'>
                        <img
                          src={isLectureCompleted(lecture.lectureId) ? assets.blue_tick_icon : assets.play_icon}
                          alt=''
                          className='w-4 h-4 mt-1'
                        />
                        <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                          <p>{lecture.lectureTitle}</p>
                          <div className='flex gap-2'>
                            {lecture.lectureUrl && (
                              <p
                                onClick={() => setPlayerData({ ...lecture, chapter: index + 1, lecture: i + 1 })}
                                className='text-blue-500 cursor-pointer hover:underline'
                              >
                                Watch
                              </p>
                            )}
                            <p>
                              {humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className='flex items-center gap-2 py-3 mt-10'>
            <h1 className='text-xl font-bold'>Rate this course:</h1>
            <Rating initialRating={initialRating} onRate={handleRate} />
          </div>
        </div>

        {/* Right Side: Player */}
        <div className='md:mt-10'>
          {playerData ? (
            <div>
              <YouTube
                videoId={getVideoId(playerData.lectureUrl)}
                iframeClassName='w-full aspect-video'
              />
              <div className='flex justify-between items-center mt-4'>
                <p className='text-lg font-medium'>
                  {playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}
                </p>
                <button 
                  onClick={() => markLectureAsCompleted(playerData.lectureId)}
                  className={`px-4 py-1.5 rounded-full border ${isLectureCompleted(playerData.lectureId) ? 'text-green-600 border-green-600 bg-green-50' : 'text-blue-600 border-blue-600'}`}
                >
                  {isLectureCompleted(playerData.lectureId) ? 'Completed' : 'Mark Complete'}
                </button>
              </div>
            </div>
          ) : (
            <div className='w-full'>
              <img src={courseData.courseThumbnail} alt="" className='w-full rounded shadow-lg' />
              <p className='mt-4 text-center text-gray-500'>Select a lecture to start watching</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Player;