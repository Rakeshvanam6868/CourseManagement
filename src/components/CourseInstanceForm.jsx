import React, { useState, useEffect } from 'react';
import Button from './Button';
import InputBox from './InputBox';
import { createCourseInstance, fetchCourses } from '../api';

const CourseInstanceForm = ({ onInstanceCreated }) => {
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [courseId, setCourseId] = useState('');
    const [courses, setCourses] = useState([]);
    const [courseTitle, setCourseTitle] = useState('');

    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await fetchCourses();
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        getCourses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!courseId) {
            alert("Please select a course before submitting.");
            return;
        }
    
        try {
            const result = await createCourseInstance({ 
                year: year.trim(),
                semester: semester.trim(),
                course: {
                    id: parseInt(courseId, 10)
                }
            });
            console.log("Course instance created:", result);
    
            // Check if onInstanceCreated is provided and is a function
            if (typeof onInstanceCreated === 'function') {
                onInstanceCreated(result);
            }
    
            // Reset form fields
            setYear('');
            setSemester('');
            setCourseId('');
            setCourseTitle('');
        } catch (error) {
            console.error('Error creating course instance:', error);
            alert('Failed to create course instance. Please try again.');
        }
    };
    

    return (
        <form 
            onSubmit={handleSubmit} 
            className="flex flex-col items-center gap-10 justify-center"
        >
            <div className="flex gap-10">
                <select
                    id="course-select"
                    value={courseId}
                    onChange={(e) => {
                        const selectedCourseId = e.target.value;
                        const selectedCourse = courses.find(course => course.id.toString() === selectedCourseId);
                        setCourseId(selectedCourseId);
                        setCourseTitle(selectedCourse ? selectedCourse.title : '');
                    }}
                    className="text-lg"
                >
                    <option value="">Select Course</option>
                    {courses.length > 0 ? (
                        courses.map((course) => (
                            <option key={course.id} value={course.id.toString()}>
                                {course.title}
                            </option>
                        ))
                    ) : (
                        <option disabled>No courses available</option>
                    )}
                </select>
                <Button
                    title="Refresh"
                    width="180px"
                    height="40px"
                    padding="5px"
                    gap="10px"
                    borderRadius="7px"
                    background="blue"
                    textColor="#ffffff"
                    textSize="18px"
                    weight="600"
                    type="button"
                    onClick={() => window.location.reload()} // Refreshes the page to reload courses
                />
            </div>
            <div className="flex items-center gap-10">
                <InputBox
                    id="year-input"
                    name="Year"
                    label="Year"
                    width="130px"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <InputBox
                    id="semester-input"
                    name="Semester"
                    label="Semester"
                    width="130px"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-10">
                <span className="text-gray-700">Selected Course: {courseTitle}</span>
            </div>
            <div className="">
                <Button
                    title="Add Instance"
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
            </div>
        </form>
    );
};

export default CourseInstanceForm;
