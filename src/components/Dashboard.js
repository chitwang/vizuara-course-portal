import React, { useState, useEffect } from 'react';
import Course from './Course';
import CourseData from './Coursedata';

const Dashboard = () => {
  const [user, setuser] = useState({});
  const [courses, setcourses] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userdata = await fetch('http://localhost:5000/api/auth/getuser', {
          headers: {
            'content-type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
          method: 'POST',
        });
        const userdatajson = await userdata.json();
        setuser(userdatajson);
      } catch (error) {
        console.error(error);
      }
    };
    
    const fetchcourse = () => {
      let addedCourses = [];
      user.courses.forEach(courseId => {
        let course = CourseData.find(c => c.id.toString() === courseId.toString());
        if(course) {
          addedCourses.push(course);
        }
      });
      setcourses(addedCourses);
    }
    
    fetchData();
    if(user.courses) {
      fetchcourse();
    }
  }, [user]);
  
  return (
    <div>
      {!localStorage.getItem('token') ? (
        <h2>You are not authorized to access the page. Kindly Login/Signup and try again.</h2>
      ) : (
        <div>
          <h2>{user.name}</h2>
          <h3>{user.email}</h3>
          {courses.map(addedcourse => {
            return <Course id={addedcourse.id} name={addedcourse.name} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
