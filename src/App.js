import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './sections/Layout';
import DashboardSection from './sections/DashboardSection';
import ScheduleSection from './sections/ScheduleSection';
import ScheduleForm from './forms/ScheduleForm';

import StudentSection from './sections/StudentSection';
import SeatingArrangementForm from './forms/SeatingArrangementForm';

import FacultySection from './sections/FacultySection';
import NoPage from './sections/NoPage';

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

        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
