import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Preloader from './Preloader';

const Course = (props) => {
  let history = useHistory();
  const [showPopup, setShowPopup] = useState(false)

  const checkpaid = async(id) => {
    let response = await fetch(`http://localhost:5000/api/auth/check/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    let json = await response.json()
    if(json.success){
      history.push(`/details/${id}`);
    }
    else{
      setShowPopup(true);

    // delay the redirection for 2 seconds
    setTimeout(() => {
      history.push(`/pay/${id}`);
    }, 1400);
    }
    
  }
  
  return (
    <div style={{border: "1px solid black", margin:"20px", padding:"12px"}}>
      <h2>{props.name}</h2>
      <button onClick={()=>checkpaid(props.id)}>View Course</button>
      {showPopup &&
        <div style={{ backgroundColor: 'black', padding: '20px', color:'white' }}>
          <p>You have not purchased the course. Redirecting to the payment page...</p>
        </div>
      }
    </div>
  )
}

export default Course
