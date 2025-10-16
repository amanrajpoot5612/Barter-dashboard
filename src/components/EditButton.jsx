import React from 'react'
import './EditButton.style.css'

const EditButton = ({ id, base_path, text, color, textColor }) => {
    // const handleClick = () => {
    //     // console.log(id);
    //     // console.log(base_path);
    // }
    return (
        <div className='edit-button-container'>
            <div className='edit-button'
                style={{backgroundColor: color, color: textColor}}
            // onClick={handleClick}
            >
                    {text}
            </div>
        </div>
    )
}

export default EditButton
