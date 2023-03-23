import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import CourseData from './Coursedata';

const Details = () => {
  const params = useParams();
  const findcourse = (id) => {
  for(let i=0;i<CourseData.length;i++)
  {
    if(CourseData[i].id == id){
      console.log(CourseData[i]);
      return CourseData[i];
    }
  }
}
  return (
    <div>
      <h1>Course Details</h1>
      <h2>{findcourse(params.id).name}</h2>
      <p>{findcourse(params.id).description}</p>
      {findcourse(params.id).tags?.map(tag => {
        return <p>{tag}</p>
      })}
    </div>
  )
}

export default Details
