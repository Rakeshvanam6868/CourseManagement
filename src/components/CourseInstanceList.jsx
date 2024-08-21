import React, { useState } from 'react';
import { fetchCourseInstances, deleteCourseInstance } from '../api';
import { Link } from 'react-router-dom';
import Button from './Button';
import InputBox from './InputBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

const CourseInstanceList = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('1'); // Default to semester 1
  const [instances, setInstances] = useState([]);

  const getInstances = async () => {
    try {
      const response = await fetchCourseInstances(year, semester);
      setInstances(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching course instances:', error);
      setInstances([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCourseInstance(year, semester, id);
      setInstances(instances.filter((instance) => instance.id !== id));
    } catch (error) {
      console.error('Error deleting course instance:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (year && semester) {
      getInstances();
    } else {
      alert('Please enter both year and semester.');
    }
  };

  return (
    <div className="flex items-center flex-col mt-[100px]">
      <form onSubmit={handleSubmit} className="mb-5 flex gap-14 items-center ml-[-400px]">
        <InputBox 
          id="Year"
          name="Year"
          width="130px"
          label="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <select
          id="Semester"
          name="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="ml-4 p-2 text-xl"
        >
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
        </select>
        <Button
          title="List Instances"
          width="222px"
          height="75px"
          padding="20px"
          gap="10px"
          borderRadius="14px"
          background="blue"
          textColor="#ffffff"
          textSize="24px"
          weight="600"
          type="submit"
        />
      </form>
      <div className="w-[80%] mb-20">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-blue-600 text-white text-left p-2">Course Title</th>
              <th className="bg-blue-600 text-white text-left p-2">Year-Semester</th>
              <th className="bg-blue-600 text-white text-left p-2">Code</th>
              <th className="bg-blue-600 text-white text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {instances.length > 0 ? (
              instances.map((instance, index) => (
                <tr key={instance.id} className={index % 2 === 0 ? '' : 'bg-blue-100'}>
                  <td className="border-r border-blue-400 p-2">{instance.course.title}</td>
                  <td className="border-r border-blue-400 p-2">{instance.year + "-" + instance.semester}</td>
                  <td className="border-r border-blue-400 p-2">{instance.course.code}</td>
                  <td className="p-2">
                    <div className="flex items-center justify-around gap-5">
                      <Link to={`/instances/${instance.year}/${instance.semester}/${instance.id}`}>
                        <button className="text-blue-500 hover:text-blue-700">
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(instance.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No instances found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseInstanceList;
