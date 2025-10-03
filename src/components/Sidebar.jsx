import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <ul>    
            <li>
                <Link to="/">
                    Home
                </Link>
            </li>
            <li>
                <Link to="/about">
                    About
                </Link>
            </li>
            <li>
                <Link to="/services">Services</Link>
            </li>
            {/* <li>
                <Link></Link>
            </li>
            <li>
                <Link></Link>
            </li>
            <li>
                <Link></Link>
            </li>
            <li>
                <Link></Link>
            </li>
            <li>
                <Link></Link>
            </li>
            <li>
                <Link></Link>
            </li> */}
        </ul>
    </div>
  )
}

export default Sidebar