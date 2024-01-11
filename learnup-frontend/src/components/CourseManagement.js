import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [newCourseData, setNewCourseData] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses'); // Adjust the URL
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const createCourse = async () => {
    try {
      const response = await axios.post('/api/courses', newCourseData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data); // Handle success message or response data
      fetchCourses();
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const updateCourse = async (courseId, updatedData) => {
    try {
      const response = await axios.put(`/api/courses/${courseId}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data); // Handle success message or response data
      fetchCourses();
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };
  
  const deleteCourse = async (courseId) => {
    try {
      const response = await axios.delete(`/api/courses/${courseId}`);
      console.log(response.data); // Handle success message or response data
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Course Management</h2>
      <form onSubmit={createCourse}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newCourseData.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newCourseData.description}
          onChange={handleInputChange}
        />
        <button type="submit">Create Course</button>
      </form>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            {/* Add edit and delete functionality */}
            <button onClick={() => updateCourse(course.id, {/* pass updated data */})}>Edit</button>
            <button onClick={() => deleteCourse(course.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseManagement;
