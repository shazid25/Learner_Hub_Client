import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import uniqid from 'uniqid'
import { 
  ChevronDown, 
  ChevronRight, 
  X, 
  Plus, 
  Upload,
  Link as LinkIcon
} from 'lucide-react'

const AddCourse = () => {
  /* ---------------- STATES ---------------- */
  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [thumbnail, setThumbnail] = useState(null)
  const [chapters, setChapters] = useState([])

  const [showPopup, setShowPopup] = useState(false)
  const [currentChapterId, setCurrentChapterId] = useState(null)

  const [lectureTitle, setLectureTitle] = useState('')
  const [lectureDuration, setLectureDuration] = useState('')
  const [lectureUrl, setLectureUrl] = useState('')
  const [isPreviewFree, setIsPreviewFree] = useState(false)

  /* ---------------- QUILL EDITOR ---------------- */
  const editorRef = useRef(null)
  const quillRef = useRef(null)

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: 'normal' }],
            ['bold', 'italic', 'underline', 'blockquote'],
            [{ align: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            ['clean'],
          ],
        },
      })
    }
  }, [])

  /* ---------------- CHAPTER HANDLER ---------------- */
  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter Chapter Name:')
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: true,
        }
        setChapters([...chapters, newChapter])
      }
    }

    if (action === 'remove') {
      setChapters(chapters.filter(ch => ch.chapterId !== chapterId))
    }

    if (action === 'toggle') {
      setChapters(
        chapters.map(ch =>
          ch.chapterId === chapterId
            ? { ...ch, collapsed: !ch.collapsed }
            : ch
        )
      )
    }
  }

  /* ---------------- LECTURE HANDLER ---------------- */
  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId)
      setShowPopup(true)
    }

    if (action === 'remove') {
      setChapters(
        chapters.map(ch => {
          if (ch.chapterId === chapterId) {
            const updatedContent = [...ch.chapterContent]
            updatedContent.splice(lectureIndex, 1)
            return { ...ch, chapterContent: updatedContent }
          }
          return ch
        })
      )
    }
  }

  const addLecture = () => {
    if (!lectureTitle || !lectureDuration || !lectureUrl) {
      alert('Please fill all required fields')
      return
    }

    setChapters(
      chapters.map(ch => {
        if (ch.chapterId === currentChapterId) {
          return {
            ...ch,
            chapterContent: [
              ...ch.chapterContent,
              {
                lectureTitle,
                lectureDuration,
                lectureUrl,
                isPreviewFree,
              }
            ]
          }
        }
        return ch
      })
    )

    setLectureTitle('')
    setLectureDuration('')
    setLectureUrl('')
    setIsPreviewFree(false)
    setShowPopup(false)
  }

  /* ---------------- THUMBNAIL HANDLER ---------------- */
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        setThumbnail(file)
      } else {
        alert('Please upload an image file')
      }
    }
  }

  /* ---------------- SUBMIT HANDLER ---------------- */
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Get Quill editor content
    const courseDescription = quillRef.current?.root.innerHTML || ''
    
    // Prepare course data for backend
    const courseData = {
      courseTitle,
      courseDescription,
      coursePrice: Number(coursePrice),
      discount: Number(discount),
      thumbnail,
      chapters: chapters.map((chapter, index) => ({
        chapterNumber: index + 1,
        chapterTitle: chapter.chapterTitle,
        lectures: chapter.chapterContent.map((lecture, lectureIndex) => ({
          lectureNumber: lectureIndex + 1,
          ...lecture
        }))
      }))
    }

    console.log('Course Data:', courseData)
    // TODO: Send to backend
    alert('Course added successfully! (Backend integration pending)')
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Create New Course</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
          {/* COURSE TITLE */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Title
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={courseTitle}
              onChange={e => setCourseTitle(e.target.value)}
              required
            />
          </div>

          {/* COURSE DESCRIPTION */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Description
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-white">
                <div ref={editorRef} className="min-h-[200px]" />
              </div>
            </div>
          </div>

          {/* PRICE, DISCOUNT & THUMBNAIL */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* COURSE PRICE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Price ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={coursePrice}
                  onChange={e => setCoursePrice(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* DISCOUNT */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount %
              </label>
              <div className="relative">
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  %
                </span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={e => setDiscount(e.target.value)}
                  className="w-full px-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* THUMBNAIL UPLOAD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Thumbnail
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <label
                  htmlFor="thumbnail-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    {thumbnail ? thumbnail.name : 'Upload Image'}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF up to 5MB
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* CHAPTERS SECTION */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Course Content</h2>
              <div className="text-sm text-gray-500">
                {chapters.reduce((total, chapter) => total + chapter.chapterContent.length, 0)} lectures
              </div>
            </div>

            {/* CHAPTERS LIST */}
            {chapters.map((chapter, index) => (
              <div key={chapter.chapterId} className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
                {/* CHAPTER HEADER */}
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleChapter('toggle', chapter.chapterId)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {chapter.collapsed ? (
                        <ChevronRight className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {index + 1}. {chapter.chapterTitle}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {chapter.chapterContent.length} lectures
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChapter('remove', chapter.chapterId)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* LECTURES LIST */}
                {!chapter.collapsed && (
                  <div className="bg-white p-4">
                    {chapter.chapterContent.map((lecture, i) => (
                      <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            {i + 1}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">{lecture.lectureTitle}</h4>
                            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                              <span>{lecture.lectureDuration} min</span>
                              <span>•</span>
                              <a 
                                href={lecture.lectureUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                              >
                                <LinkIcon className="w-4 h-4" />
                                Link
                              </a>
                              <span>•</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs ${lecture.isPreviewFree ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleLecture('remove', chapter.chapterId, i)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}

                    {/* ADD LECTURE BUTTON */}
                    <button
                      type="button"
                      onClick={() => handleLecture('add', chapter.chapterId)}
                      className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <Plus className="w-5 h-5" />
                      Add Lecture
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* ADD CHAPTER BUTTON */}
            <button
              type="button"
              onClick={() => handleChapter('add')}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Chapter
            </button>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              ADD COURSE
            </button>
          </div>
        </form>
      </div>

      {/* LECTURE POPUP MODAL */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">Add Lecture</h2>
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lecture Title
                </label>
                <input
                  type="text"
                  placeholder="Enter lecture title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={lectureTitle}
                  onChange={e => setLectureTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter duration"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={lectureDuration}
                  onChange={e => setLectureDuration(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lecture URL
                </label>
                <input
                  type="url"
                  placeholder="Enter video URL"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={lectureUrl}
                  onChange={e => setLectureUrl(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="preview-free"
                  checked={isPreviewFree}
                  onChange={e => setIsPreviewFree(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="preview-free" className="ml-2 text-sm text-gray-700">
                  Is Preview Free?
                </label>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="flex gap-3 p-6 border-t">
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={addLecture}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Lecture
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddCourse