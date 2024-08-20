import CourseInstanceList from '../components/CourseInstanceList';

const CourseInstanceManagement = () => (
  <div>
    <h1>Manage Course Instances</h1>
    <CourseInstanceList year={2023} semester={1} /> {/* Example values */}
  </div>
);

export default CourseInstanceManagement;
