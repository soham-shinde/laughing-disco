import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './sections/Layout';
import DashboardSection from './sections/DashboardSection';
import ScheduleSection from './sections/ScheduleSection';
import NoPage from './sections/NoPage';
import FacultySection from './sections/FacultySection';
import ScheduleForm from './forms/ScheduleForm';


function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardSection />} />
          <Route path="schedule" element={<ScheduleSection />} />
          <Route path="schedule/create" element={<ScheduleForm />} />
          <Route path="faculty" element={<FacultySection />} />
          
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
