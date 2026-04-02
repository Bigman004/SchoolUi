import { useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeacherPage from "./Components/TeacherPage";
import AddStudent from "./Components/add_student";
import Result from "./Components/Result";
import Student from "./Components/Student";
import EditProfile from "./Components/EditProfile";
import ResultList from "./Components/ResultList";
import ChangePassword from "./Components/ChangePassword";
import Attendance from "./Components/Attendance";
import ReviewAttendancePage from "./Components/ReviewAttendancePage";
import ReviewAttendanceDate from "./Components/ReviewAttendanceDate";

function App() {
  const [toggleButton, setToggleButton] = useState(false);

  const toggleBtn = () => {
    if (toggleButton === true) {
      setToggleButton(false);
    } else {
      setToggleButton(true);
    }
  };

  return (
    <>
      <Router>
        <section></section>
        <Routes>
          <Route path="/teacher_page" element={<TeacherPage />} />
          <Route path="/result/:info" element={<Result />} />
          <Route path="/add_student" element={<AddStudent />} />
          <Route path="/student" element={<Student />} />
          <Route path="/edit/:id" element={<EditProfile />} />
          <Route path="/result_page" element={<ResultList />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/review_attendance" element={<ReviewAttendancePage />} />
          <Route
            path="/review_attendance_date/:date"
            element={<ReviewAttendanceDate />}
          />
          <Route path="*" element={<Login />} />
          <Route
            path="/change-password/:teacherRegNo"
            element={<ChangePassword />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
