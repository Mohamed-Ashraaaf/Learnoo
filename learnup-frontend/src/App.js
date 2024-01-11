import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SignUpPage from './components/SignUpPage';
import Forum from './components/Forum';
import CourseManagement from './components/CourseManagement';
import AuthForm from './components/AuthForm';
import UserProfile from './components/UserProfile';
import Header from './components/Header';
import Courses from './components/Courses';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard'; // Import the Dashboard component

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/forum">Forum</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/course-management">Course Management</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/login" component={AuthForm} />
          <Route exact path="/profile" component={UserProfile} />
          <Route exact path="/courses">
            <Courses 
              // Pass necessary props or state variables here for API calls
              // Example: fetchData={fetchCourses} courses={courses}
            />
          </Route>
          <Route exact path="/register" component={RegistrationForm} />
          <Route exact path="/forum" component={Forum} />
          <Route exact path="/course-management" component={CourseManagement} />
          <Route exact path="/dashboard" component={Dashboard} /> {/* Include the Dashboard route */}
          {/* Add more routes for other components */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
