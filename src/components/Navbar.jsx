import React, { useEffect, useState } from 'react'
import { backend_url } from '../config/conf';
import EditButton from './EditButton';

const Navbar = () => {
  const [nav, setNav] = useState([]);
  const [inputData, setInputData] = useState({
    icon: "",
    label: "",
    key: "",
    _id: ""
  })
  useEffect(() => {
    const fetchNav = async () => {
      const res = await fetch(`${backend_url}/navbar`);

      let data = await res.json();
      setNav(data);
    }
    fetchNav()
  }, [])


  const handleChange  =  () => {;
  };

  const handleSubmit = async (index) => {
    const item  = nav[index];
  }


  return (
   <div
   id='navbar'
  className="cards-container"
  style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
  }}
>
  {nav.map((item) => (
    <div
      key={item?._id}
      className="card"
      style={{
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        width: '100%',
        maxWidth: '300px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      {/* Icon if available */}
      {item.icon && (
        <div style={{ marginBottom: '10px' }}>
          <img
            src={item.icon}
            alt={item.label}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '4px',
            }}
          />
        </div>
      )}

      {/* Label */}
      <div style={{ marginBottom: '6px' }}>
        <strong>Label:</strong>
        <input type="text" value={item.label} onChange={handleChange}/>
      </div>

      {/* Key */}
      <div style={{ marginBottom: '6px' }}>
        <strong>Key:</strong>
        <input type="text" value={item.key} onChange={handleChange}/>
      </div>

      {/* ID */}
      <div style={{ marginBottom: '6px' }}>
        <strong>ID:</strong> {item._id}
        {/* <input type="text" value={item._id} onChange={handleChange}/> */}
      </div>

      {/* Created At */}
      <div style={{ marginBottom: '6px' }}>
        <strong>Created:</strong>{' '}
        {new Date(item.createdAt).toLocaleString()}
      </div>

      {/* Updated At */}
      <div>
        <strong>Updated:</strong>{' '}
        {new Date(item.updatedAt).toLocaleString()}
      </div>
      <EditButton id={item?._id} text={"Edit"}></EditButton>
    </div>
  ))}
</div>



  )
};


export default Navbar
