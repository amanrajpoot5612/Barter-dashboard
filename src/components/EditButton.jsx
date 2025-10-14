import React from 'react'
import './EditButton.style.css'

const EditButton = ({ id, base_path, text }) => {
    const handleClick = () => {
        console.log(id);
        console.log(base_path);
    }
    return (
        <div className='edit-button-container'>
            <button className='edit-button' onClick={handleClick}>
                <a href={`/${id}`}>
                    {text}</a>
            </button>
        </div>
    )
}

export default EditButton
