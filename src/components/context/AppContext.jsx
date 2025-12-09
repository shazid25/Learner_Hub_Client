import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);

  //Fetch All Courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses || []);
  };

  //function to calculate avg rating
  const calculateRating = (course) => {
    if (!course.courseRatings || course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  };

  // Function to calculate Course Chapter Time
  const calculateChapterTime = (chapter) => {
    if (!chapter.chapterContent) return "0m";
    let time = 0;
    chapter.chapterContent.forEach((lecture) => (time += lecture.lectureDuration || 0));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  //Calculate the course duration
  const calculateCourseDuration = (course) => {
    if (!course.courseContent) return "0m";
    let time = 0;
    course.courseContent.forEach((chapter) =>
      (chapter.chapterContent || []).forEach(
        (lecture) => (time += lecture.lectureDuration || 0)
      )
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  //Function to calculate number of lectures in course
  const calculateNoOfLectures = (course) => {
    if (!course.courseContent) return 0;
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};