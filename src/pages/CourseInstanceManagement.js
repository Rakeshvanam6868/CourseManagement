import React, { useState } from 'react';
import CourseInstanceList from '../components/CourseInstanceList';
import CourseInstanceForm from '../components/CourseInstanceForm';

const CourseInstanceManagement = () => {
    const [instances, setInstances] = useState([]);

    const handleInstanceCreated = (newInstance) => {
        console.log('New course instance created:', newInstance);
        // Update the state to include the new instance
        setInstances((prevInstances) => [...prevInstances, newInstance]);
    };

    return (
        <div>
            {/* Pass the callback function to the form */}
            <CourseInstanceForm onInstanceCreated={handleInstanceCreated} />
            
            {/* Render the list of instances, including the newly created ones */}
            <CourseInstanceList year={2023} semester={1} instances={instances} /> {/* Example values */}
        </div>
    );
};

export default CourseInstanceManagement;
