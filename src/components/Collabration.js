import React from 'react'
import handPen from '../images/hand-pen.jpg';
import './Collabration.css'

export default function Collabration() {
  return (
    <div>
      <h1>Empowering Collaborative Research in Science</h1>
      <p>Unlock the potential of collective intelligence and collaborative research to address scientific challenges, every step of the way.</p>

      <div className='container'>
        <div className = 'card'>
            <div className = 'image'>
                <img src = {handPen}/>
            </div>
            <div className='content'>
                <h3>Collaborate on Research</h3>
                <p>Engage with peers to process and share data collaboratively.</p>
            </div>
        </div>  
      </div>
    </div>
  )
}
