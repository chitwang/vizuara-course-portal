import React from 'react'
import { useHistory } from 'react-router-dom';
import {coursedata} from "./Coursedata";
const Course = (props) => {
  let history =  useHistory();
  const checkpaid = async(id) => {
    let response = await fetch(`http://localhost:5000/api/auth/check/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
  });
  let json = await response.json()
  if((json.success)){
    history.push("/details");
  }
  else{
    history.push(`/pay/${id}`);
  }
  }
  return (
    <div>
     <h2>{props.name}</h2>
     <h2>{props.id}</h2>
     <button onClick={()=>checkpaid(props.id)}>Pay Rs.1</button>
    </div>
  )
}

export default Course
