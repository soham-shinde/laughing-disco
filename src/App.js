import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './sections/Layout';
import DashboardSection from './sections/DashboardSection';
import ScheduleSection from './sections/ScheduleSection';
import NoPage from './sections/NoPage';


function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardSection />} />
          <Route path="schedule" element={<ScheduleSection />} />
          
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
