# 🎓 Learners Hub - Frontend

Learners Hub is a comprehensive Learning Management System (LMS) built with the MERN stack. It provides a dual-interface experience: a sleek, intuitive platform for **Students** to consume content and a robust dashboard for **Educators** to manage and publish courses.

## 🛠️ Tech Stack
* **Core**: React.js (Vite)
* **State Management**: React Context API
* **Styling**: Tailwind CSS
* **Data Fetching**: Axios
* **Icons & UI**: Lucide React / React Icons
* **Notifications**: React Hot Toast

## 📁 Project Structure & Key Modules

### `src/components/`
Organized by role to ensure a clean separation of concerns:
* **`educator/`**: Components like `Sidebar.jsx` and specialized Navbars for the instructor dashboard.
* **`student/`**: UI elements such as `CourseCard.jsx`, `SearchBar.jsx`, `Rating.jsx`, and the `Hero` section.
* **`context/`**: Contains `AppContext.jsx` which handles global state (user auth, global loading, etc.).

### `src/pages/`
* **`educatorPage/`**: 
    * `AddCourse.jsx`: Multi-step form for course creation.
    * `MyCourses.jsx`: Management area for educator-uploaded content.
    * `Dashboard.jsx`: Analytics and overview for instructors.
* **`studentPage/`**:
    * `Home.jsx`: Landing page with featured courses.
    * `CoursesList.jsx`: Searchable directory of all available courses.
    * `MyEnrollments.jsx`: The student's personal library of purchased content.
    * `Player.jsx`: A focused video-learning environment.

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-link>
    cd learners-hub/frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory:
    ```env
    VITE_BACKEND_URL=http://localhost:5000
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## ✨ Features
* **Role-Based Access**: Specialized views for Students and Educators.
* **Dynamic Course Player**: Smooth video switching and progress tracking.
* **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
* **Real-time Feedback**: Integrated toast notifications for enrollment and upload status.

---