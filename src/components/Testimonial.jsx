import React, { useEffect, useState } from 'react'
import { backend_url } from '../config/conf';
import EditButton from './EditButton';

const Testimonial = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTestimonial = async () => {
      const res = await fetch(`${backend_url}/get-testimonial`)
      const testimonials = await res.json();
      setData(testimonials);
    }
    fetchTestimonial();
  }, [])
  return (
    <div
    id='testimonial'
      className="testimonials-container"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}
    >
      {data?.items?.map((item) => (
        <div
          key={item._id}
          className="testimonial-card"
          style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '20px',
            width: '100%',
            maxWidth: '400px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div className="testimonial-header" style={{ marginBottom: '10px' }}>

            {item?.img.startsWith('http')? (<><strong>🧾 Image:</strong> 
        <img src= {item?.img} alt="" /></>) : null}
          </div>

          <h3 style={{ marginBottom: '10px', color: '#007bff' }}>
            📝 <strong>Heading: </strong>
              <input type="text" value={item.heading} />
          </h3>

          <p style={{ fontSize: '14px', color: '#333', lineHeight: '1.5' }}>
            <strong>Paragraph: </strong>
            <textarea value={item.para} style={{fieldSizing: "content"}} />
          </p>

          <p style={{ fontSize: '14px', color: '#333', lineHeight: '1.5' }}>
            <strong>Id: </strong>{item._id}
          </p>

          <div style={{ marginTop: '20px', fontSize: '12px', color: '#888' }}>
            <p><strong>Created:</strong> {new Date(item.createdAt).toLocaleString()}</p>
            <p><strong>Updated:</strong> {new Date(item.updatedAt).toLocaleString()}</p>
          </div>
          <EditButton  text={"Edit"}></EditButton>
        </div>
      ))}
    </div>

  )
}

export default Testimonial
