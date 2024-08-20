import { useEffect, useState } from 'react';
import { fetchCourseInstance } from '../api';
import { useParams } from 'react-router-dom';

const CourseInstanceDetail = () => {
  const { year, semester, id } = useParams();
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    const getInstance = async () => {
      const response = await fetchCourseInstance(year, semester, id);
      setInstance(response.data);
    };
    getInstance();
  }, [year, semester, id]);

  if (!instance) return <div>Loading...</div>;

  return (
    <div>
      <h2>Course ID: {instance.courseId}</h2>
      <p>Year: {instance.year}</p>
      <p>Semester: {instance.semester}</p>
    </div>
  );
};

export default CourseInstanceDetail;
