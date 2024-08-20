import React, { useState } from 'react';
import InputBox from './InputBox';
import Button from './Button';
import { createCourse } from '../api';
import CourseInstanceEntry from './CourseInstanceForm';

const CourseForm = ({ onCourseCreated }) => {
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Course data:", { title, courseCode, description });

    if (!title || !courseCode || !description) {
      console.error("All fields are required");
      return;
    }

    try {
      const result = await createCourse({
        title: title.trim(),
        code: courseCode.trim(),
        description: description.trim(),
      });
      console.log("Course created:", result);
      onCourseCreated();
      setTitle('');
      setCourseCode('');
      setDescription('');
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="flex mt-[150px] justify-around items-center">
      <form onSubmit={handleSubmit} className="flex-col flex items-center gap-10">
        <InputBox
          id="courseTitle"
          name="courseTitle"
          label="Course Title"
          width="500px"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputBox
          id="courseCode"
          name="courseCode"
          label="Course Code"
          width="500px"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        />
        <InputBox
          id="courseDescription"
          name="courseDescription"
          label="Course Description"
          width="500px"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          title="Add Course"
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
      <div>
        <CourseInstanceEntry />
      </div>
    </div>
  );
};

export default CourseForm;
