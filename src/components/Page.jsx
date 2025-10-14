import React, { useEffect, useState } from 'react'
import { backend_url_page } from '../config/conf';

const Page = () => {
  const [home, setHome] = useState([]);
  useEffect(() => {
    const fetchHome = async () => {
      const res = await fetch(`${backend_url_page}/get-pages`)
      const homeData = await res.json();
      setHome(homeData)
    }
    fetchHome();
  }, [])
  return (
    <div
    id='page'
      className="cards-container"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}
    >
      {home?.page?.map((page) => {
        const {
          _id,
          name,
          key,
          serialNumber,
          section,
          createdAt,
          updatedAt,
        } = page;

        const {
          heading,
          subHeading,
          description = {},
        } = section || {};

        const {
          paragraphs = [],
          list = [],
          buttons = [],
          imageURL = [],
        } = description;

        return (
          <div
            key={_id}
            className="card"
            style={{
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              width: '100%',
              maxWidth: '500px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {/* Page Meta */}
            <div style={{ fontSize: '14px', color: '#888' }}>
              <div><strong>ID:</strong> {_id}</div>
              <div><strong>Key:</strong> {key}</div>
              <div><strong>Serial No:</strong> {serialNumber}</div>
              <div><strong>Created:</strong> {new Date(createdAt).toLocaleString()}</div>
              <div><strong>Updated:</strong> {new Date(updatedAt).toLocaleString()}</div>
            </div>

            {/* Titles */}
            <h2 style={{ margin: '10px 0 0', fontSize: '20px' }}><strong>Page Name:</strong> {name}</h2>
            {heading && <h3 style={{ color: '#444' }}><strong>Heading:</strong>{heading}</h3>}
            {subHeading && <h4 style={{ color: '#666' }}><strong>Sub heading:</strong>{subHeading}</h4>}

            {/* Images */}
            {imageURL.length > 0 && (
              <div
                className="image-gallery"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  marginTop: '10px',
                }}
              >
                {key === "home" ? <h2><strong>Carousel images (home)</strong></h2> : <h2><strong>Section images</strong></h2>}
                {imageURL.map((img, idx) => (
                  <div className="img-container">

                    <img
                    key={idx}
                    src={img}
                    alt={`Image ${idx + 1}`}
                    style={{
                      width: '100%',
                      maxHeight: '200px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                  />
                  </div>
                  
                ))}
              </div>
            )}

            {/* Paragraphs */}
            {paragraphs.length > 0 && (
              <div className="paragraphs" style={{ marginTop: '10px' }}>
                {paragraphs.map((para, idx) => (
                  <p key={idx} style={{ lineHeight: '1.6', color: '#333' }}>
                    <strong>{`Paragraph (${idx+1})`}:</strong>{para}
                  </p>
                ))}
              </div>
            )}

            {/* Lists */}
            {list.length > 0 && (
              <div className="lists" style={{ marginTop: '10px' }}>
                {list.map((lst, idx) => (
                  <div key={lst._id} style={{ marginBottom: '10px' }}>
                    <strong><strong>{`List title (${idx+1}):`}</strong>{lst.title}</strong>
                    <ul style={{ paddingLeft: '20px' }}>
                      {lst.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Buttons */}
            {buttons.length > 0 && (
              <div className="buttons" style={{ marginTop: '10px' }}>
                {buttons.map((btnText, idx) => (
                  <>
                  <h2><strong>Buttons on page</strong></h2>
                  <button
                    key={idx}
                    style={{
                      padding: '8px 16px',
                      marginRight: '10px',
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    
                    {btnText}
                  </button>
                  </>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>


  )
}

export default Page
