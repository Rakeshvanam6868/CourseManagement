import React, { useState } from 'react';
import { fetchCourses, deleteCourse } from '../api';
import Button from './Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [showCourses, setShowCourses] = useState(false); // State to track button click

  const handleListCourses = async () => {
    setShowCourses(true); // Show the courses list
    if (courses.length === 0) {
      // Fetch courses only if not already fetched
      const response = await fetchCourses();
      setCourses(response.data);
    }
  };

  const handleDelete = async (id) => {
    await deleteCourse(id);
    setCourses(courses.filter((course) => course.id !== id));
  };

  return (
    <div className="flex items-center flex-col mt-[100px]">
      <div className="mb-16">
        <Button
          title="List Courses"
          width="222px"
          height="75px"
          padding="20px"
          gap="10px"
          borderRadius="14px"
          background="blue"
          textColor="#ffffff"
          textSize="24px"
          weight="600"
          onClick={handleListCourses} // Attach the click handler to the button
        />
      </div>
      {showCourses && ( // Conditionally render the courses list
        <div className="w-[80%]">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-blue-600 text-white text-left p-2">Course Title</th>
                <th className="bg-blue-600 text-white text-left p-2">Code</th>
                <th className="bg-blue-600 text-white text-left p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={course.id} className={index % 2 === 0 ? '' : 'bg-blue-100'}>
                  <td className="border-r border-blue-400 p-2">{course.title}</td>
                  <td className="border-r border-blue-400 p-2">{course.code}</td>
                  <td className="p-2">
                    <div className="flex items-center justify-around gap-5">
                      <Link to={`/courses/${course.id}`}>
                        <button className="text-blue-500 hover:text-blue-700">
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CourseList;
