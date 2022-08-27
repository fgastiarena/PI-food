import React from 'react';
import { useNavigate } from "react-router-dom";
import './LandingPage.css'

export default function LandingPage() {
    const navigate = useNavigate();
    
    function handleClick(e){
        e.preventDefault();
        navigate('/home');
    }

  return (
    <div className='container-img'>
      <fragment className='main-title'>
        <h1 className='title'> Foods App </h1>
        <button className='landing-btn' onClick={e => handleClick(e)}>Home</button>
      </fragment>
    </div>
  )
}
