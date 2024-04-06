import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './sections/Layout';
import DashboardSection from './sections/DashboardSection';
import ScheduleSection from './sections/ScheduleSection';
import NoPage from './sections/NoPage';
import FacultySection from './sections/FacultySection';
import ScheduleForm from './forms/ScheduleForm';
import ExamSection from './sections/ExamSection';
import ExamForm from './forms/ExamForm';
import StudentSection from './sections/StudentSection';
import SeatingArrangementForm from './forms/SeatingArrangementForm';
function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardSection />} />
          <Route path="schedule" element={<ScheduleSection />} />
          <Route path="schedule/create" element={<ScheduleForm />} />
          <Route path="faculty" element={<FacultySection />} />
          <Route path="student" element={<StudentSection />} />
          <Route path="student/add" element={<SeatingArrangementForm />} />
          <Route path="exam" element={<ExamSection />} />
          <Route path="exam/add" element={<ExamForm />} />
          
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
