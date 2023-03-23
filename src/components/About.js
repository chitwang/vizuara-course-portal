import React from 'react'
import Course from './Course'
import CourseData from "./Coursedata";
const About = () => {
    return (
        <div>
            {! (localStorage.getItem('token') ) ? <h2>You are not authorized to access the page. Kindly Login/Signup and try again.</h2> :
                <div>
                    <div className="input-group">
                        <div className="form-outline">
                            <input id="search-input form1" type="search" className="form-control" />
                            <label className="form-label" for="form1">Search</label>
                        </div>
                        <button id="search-button" type="button" className="btn btn-primary">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                    {CourseData.map((cour, key) => {
                        return <Course id={cour.id} name={cour.name}></Course>
                    })}
                </div>
            }
        </div>
    )
}

export default About
