import React from 'react';
import Forum from './Forum';
import CourseManagement from './CourseManagement';
import UserProfile from './UserProfile';
import Courses from './Courses'; // Import the Courses component

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <UserProfile />
      <Forum />
      <CourseManagement />
      <Courses /> {/* Include the Courses component */}
      {/* Add more components or sections here */}
    </div>
  );
};

export default Dashboard;
