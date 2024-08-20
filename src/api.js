import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/', // Update to your backend URL
});

export const fetchCourses = () => api.get('courses');
export const fetchCourse = (id) => api.get(`courses/${id}`);
export const createCourse = async (courseData) => {
  try {
    const response = await fetch('http://localhost:8080/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });

    if (!response.ok) {
      throw new Error('Failed to create course');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
export const deleteCourse = (id) => api.delete(`courses/${id}`);

export const fetchCourseInstances = (year, semester) => api.get(`instances/${year}/${semester}`);
export const fetchCourseInstance = (year, semester, id) => api.get(`instances/${year}/${semester}/${id}`);
export const createCourseInstance = async (courseInstanceData) => {
  try {
    console.log('Creating course instance with data:', courseInstanceData); // Log the data being sent

    const response = await fetch('http://localhost:8080/api/instances', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseInstanceData),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Read the error text from the response
      console.error('Failed to create course instance. Status:', response.status, 'Error:', errorText);
      throw new Error('Failed to create course instance');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating course instance:', error);
    throw error;
  }
};

export const deleteCourseInstance = (year, semester, id) => api.delete(`instances/${year}/${semester}/${id}`);
