import CourseForm from '../components/CourseForm';
import CourseList from '../components/CourseList';
import CourseInstanceList from '../components/CourseInstanceList';

const Home = () => (
  <div>
    <h1>Course Management System</h1>
    <CourseForm onCourseCreated={() => window.location.reload()} />
    {/* <CourseInstanceForm onInstanceCreated={() => window.location.reload()} /> */}
    <CourseList />
    <CourseInstanceList year={2023} semester={1} /> {/* Example values */}
  </div>
);

export default Home;
