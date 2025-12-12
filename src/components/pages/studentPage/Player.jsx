import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import { assets } from '../../../assets/assets'
import humanizeDuration from 'humanize-duration'
import YouTube from 'react-youtube'
import Footer from '../../student/Footer'

const Player = () => {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext)
  const { courseId } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})
  const [playerData, setPlayerData] = useState(null)

  useEffect(() => {
    const getCourseData = () => {
      if (enrolledCourses && Array.isArray(enrolledCourses)) {
        const foundCourse = enrolledCourses.find((course) => course._id === courseId)
        if (foundCourse) {
          setCourseData(foundCourse)
        }
      }
    }
    getCourseData()
  }, [enrolledCourses, courseId])

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  if (!courseData) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </>
    )
  }

  if (!courseData.courseContent || !Array.isArray(courseData.courseContent)) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-600">No course content available</p>
        </div>
        <Footer />
      </>
    )
  }

  const getVideoId = (url) => {
    if (!url) return ''
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)
    return match ? match[1] : url.split('/').pop()
  }

  return (
    <>
      <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
        <div className='text-gray-800'>
          <h2 className='text-xl font-semibold'>Course Structure</h2>
          <div className='pt-5'>
            {courseData.courseContent.map((chapter, index) => {
              if (!chapter || !chapter.chapterContent || !Array.isArray(chapter.chapterContent)) {
                return null
              }
              return (
                <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                  <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={() => toggleSection(index)}>
                    <div className='flex items-center gap-2'>
                      <img
                        src={assets.down_arrow_icon}
                        alt='arrow icon'
                        className={`transition-transform duration-300 ${openSections[index] ? 'rotate-180' : ''}`}
                      />
                      <p className='font-medium md:text-base text-sm'>
                        {chapter.chapterTitle || `Chapter ${index + 1}`}
                      </p>
                    </div>
                    <p className='text-sm md:text-default'>
                      {chapter.chapterContent.length} Lectures - {calculateChapterTime ? calculateChapterTime(chapter) : '0 min'}
                    </p>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                      {chapter.chapterContent.map((lecture, i) => {
                        if (!lecture) return null
                        return (
                          <li key={i} className='flex items-start gap-2 py-1'>
                            <img
                              src={false ? assets.blue_tick_icon : assets.play_icon}
                              alt='play icon'
                              className='w-4 h-4 mt-1'
                            />
                            <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                              <p>{lecture.lectureTitle || `Lecture ${i + 1}`}</p>
                              <div className='flex gap-2'>
                                {lecture.lectureUrl && (
                                  <p
                                    onClick={() => setPlayerData({
                                      ...lecture,
                                      chapter: index + 1,
                                      lecture: i + 1
                                    })}
                                    className='text-blue-500 cursor-pointer hover:underline'
                                  >
                                    Watch
                                  </p>
                                )}
                                <p>
                                  {lecture.lectureDuration
                                    ? humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })
                                    : '0 min'
                                  }
                                </p>
                              </div>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className='md:mt-10'>
          {playerData ? (
            <div>
              <YouTube 
                videoId={getVideoId(playerData.lectureUrl)} 
                iframeClassName='w-full aspect-video' 
              />
              <div className='flex justify-between items-center mt-1'>
                <p>
                  {playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}
                </p>
                <button className='text-blue-600'>
                  {false ? 'Completed' : 'Mark Complete'}
                </button>
              </div>
            </div>
          ) : (
            <img src={courseData ? courseData.courseThumbnail : ''} alt="" />
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Player;