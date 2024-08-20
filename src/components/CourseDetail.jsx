import { useEffect, useState } from 'react';
import { fetchCourse } from '../api';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const getCourse = async () => {
      const response = await fetchCourse(id);
      setCourse(response.data);
    };
    getCourse();
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.courseCode}</p>
      <p>{course.description}</p>
    </div>
  );
};

export default CourseDetail;
