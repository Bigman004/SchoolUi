import { useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeacherPage from "./Components/Teacher/TeacherPage";
import AddStudent from "./Components/Teacher/add_student";
import Result from "./Components/Teacher/Result";
import Student from "./Components/Teacher/Student";
import EditProfile from "./Components/Teacher/EditProfile";
import ResultList from "./Components/Teacher/ResultList";
import ChangePassword from "./Components/Teacher/ChangePassword";
import Attendance from "./Components/Teacher/Attendance";
import ReviewAttendancePage from "./Components/Teacher/ReviewAttendancePage";
import ReviewAttendanceDate from "./Components/Teacher/ReviewAttendanceDate";
import OwnerPage from "./Components/OwnerPage";
import AddTeacher from "./Components/AddTeacher";
import Error1 from "./Components/Error/Error1";
import Billing from "./Components/Billing";
import CheckPayment from "./Components/CheckPayment";
import ChangePasswordRequest from "./Components/ChangePasswordRequest";
import OwnerChangePassword from "./Components/OwnerChangePassword";

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
        <Route path="/owner_page" element={<OwnerPage />} />
        <Route path="/add_teacher" element={<AddTeacher />} />
        <Route
          path="/review_attendance_date/:date"
          element={<ReviewAttendanceDate />}
        />
        <Route path="*" element={<Login />} />
        <Route
          path="/change-password/:teacherRegNo"
          element={<ChangePassword />}
        />
        <Route path="/error_page" element={<Error1 />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/check_payment" element={<CheckPayment />} />
        <Route
          path="/change-password-request"
          element={<ChangePasswordRequest />}
        />
        <Route
          path="/admin-change-password"
          element={<OwnerChangePassword />}
        />
      </Routes>
    </>
  );
}

export default App;
