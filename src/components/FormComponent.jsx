import React, { useState } from 'react'
import './FormComponent.style.css'

const FormComponent = () => {
        const [inputData, setInputData] = useState({
            name: "Aman",
            email: ""
        });

        const handleChange = (e) => {
            const {name, value} = e.target;
            setInputData({
                ...inputData,
                [name]: value
            })
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log("Form submitted", FormData);
            
        }

  return (
    <div className='form-component'>
        <label htmlFor="name">Name</label>
        <input type="text" id='name' name='name' value={inputData.name} onChange={handleChange} />
    </div>
  )
}

export default FormComponent
