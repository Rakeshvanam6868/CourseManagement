import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CourseDetail from './components/CourseDetail';
import CourseInstanceDetail from './components/CourseInstanceDetail';
import CourseManagement from './pages/CourseManagement';
import CourseInstanceManagement from './pages/CourseInstanceManagement';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="/instances/:year/:semester/:id" element={<CourseInstanceDetail />} />
      <Route path="/manage-courses" element={<CourseManagement />} />
      <Route path="/manage-instances" element={<CourseInstanceManagement />} />
    </Routes>
  </Router>
);

export default App;
