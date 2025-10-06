import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.style.css'

const Sidebar = () => {
  return (
    <div className='sidebar h-full w-1/5 bg-red-500'>
        <ul className='sidebar-list'>    
            <li>
                <Link to="/">
                    Dashboard
                </Link>
            </li>
            <li>
                <Link to="/pages">
                    Pages
                </Link>
            </li>
            <li>
                <Link to="/media">Media</Link>
            </li>
            {/* <li>
                <Link to="/"></Link>
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