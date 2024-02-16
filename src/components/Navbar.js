import React from 'react';
import './Nav.css'

export default function Navbar() {
  return (
    <nav id='navbar'>
        <div className="logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-atom"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/></svg>
          <a href="/">SciCollab</a>
        </div>
        <div className="features">
          <a href="/">Projects</a>
          <a href="/">Data Sharing</a>
          <a href="/">Discussions</a>
          <a href="/">Collaborators</a>
          <div class="dropdown">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dropdown-toggle lucide lucide-list-collapse" data-bs-toggle="dropdown" aria-expanded="false">
              <path d="m3 10 2.5-2.5L3 5"/><path d="m3 19 2.5-2.5L3 14"/><path d="M10 6h11"/><path d="M10 12h11"/><path d="M10 18h11"/>
            </svg>

            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/">Resources</a></li>
              <li><a class="dropdown-item" href="/">Community</a></li>
              <li><a class="dropdown-item" href="/">Research Models</a></li>
              <li><a class="dropdown-item" href="/">Workshops/Events</a></li>
              <li><a class="dropdown-item" href="/">Support/Help</a></li>
            </ul>
          </div>
        </div>
        <div className="search">
          <input type="text" placeholder='search...'/>
        </div>
        <div className="sign_reg">
          <div><a href="/">Sign In</a></div>
          
          <div><button type="button" class="btn">Register</button></div>
        </div>
    </nav>
  )
}
