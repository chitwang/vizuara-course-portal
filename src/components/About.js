import React from 'react'
import Course from './Course'
// import  { Coursedata} from "./Coursedata";
const About = () => { 
    return (
        <div>
           {/* {Coursedata.map(data => {

           })} */}
           <Course name = {"Course1"} id={1} />
           <Course name = {"Course2"} id={2} />
           <Course name = {"Course3"} id={3} />
           <Course name = {"Course4"} id={4} />
           <Course name = {"Course5"} id={5} />
        </div>
    )
}

export default About
