import React from 'react'
import Sidebar from '../components/Sidebar'

const Pages = () => {
  return (
    <div className='pages-component'>
        <Sidebar></Sidebar>
        {pagesData.map((page, num) => {
            return <div className={`page${num}`}>
                <div className="page-heading">{page.heading}</div>

            </div>
        })}
    </div>
  )
}

export default Pages