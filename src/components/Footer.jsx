import React, { useEffect } from 'react'
import { backend_url } from '../config/conf'
import EditButton from './EditButton'

const Footer = () => {
  const [footerData, setFooterData] = React.useState([])

  useEffect(() => {
    const fetchFooter = async () => {
      const res = await fetch(`${backend_url}/get-footer`);
      const data = await res.json();
      setFooterData(data);
    }
    fetchFooter();
  }, [])

  return (
    <div
    id='footer'
  className="footer-cards"
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#f8f8f8',
  }}
>
  {/* Footer Meta */}
  <div
    className="footer-meta"
    style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    }}
  >
    <h2>🔖 Footer Metadata</h2>
    <p><strong>Company Name:</strong>
    <input type="text" value= {footerData.companyName} />
    </p>
    <p><strong>ID:</strong> {footerData._id}</p>
    <p><strong>Created:</strong> {new Date(footerData.createdAt).toLocaleString()}</p>
    <p><strong>Updated:</strong> {new Date(footerData.updatedAt).toLocaleString()}</p>
    <EditButton id={footerData?._id}  text={"Edit"}></EditButton>

    {footerData.logo && (
      <div style={{ marginTop: '10px' }}>
        <strong>Logo:</strong>
        <img
          src={footerData.logo}
          alt="Footer Logo"
          style={{ maxWidth: '200px', marginTop: '10px', borderRadius: '4px' }}
        />
      </div>
    )}
  </div>

  {/* Footer Sections */}
  <div className="footer-sections">
    <h2>📂 Footer Sections</h2>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        marginTop: '10px',
      }}
    >
      {footerData?.sections?.map((section, idx) => (
        <div
          key={section._id}
          className="footer-section-card"
          style={{
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          <h3><strong>{`Section heading ${idx+1}: `}</strong>
          <input type="text" value={section.heading}  />
          <br /><strong>{`Section type: `}</strong>
          <input type="text" value={section.type}/>
          </h3>


          {section.items && section.items.length > 0 ? (
            <ul style={{ paddingLeft: '20px' }}>
              {section.items.map((item) => (
                <li key={item._id}>
                  <strong>Name: </strong>
                  <input type="text" value={item.name} /> 
                  {item.link && <span style={{ color: '#007bff' }}> <br /><strong>Link: </strong>
                  <input type="text"  value={item.link}/>
                  </span>}
                </li>
              ))}
            </ul>
          ) : (
            <p>No items available.</p>
          )}
          <EditButton id={section?._id}  text={"Edit"}></EditButton>
        </div>
      ))}
    </div>
  </div>

  {/* Footer Bottom */}
  <div
    className="footer-bottom"
    style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    }}
  >
    <h2>📌 Footer Bottom</h2>
    <p><strong>Left:</strong>
    <textarea style={{fieldSizing: "content"}} value={footerData?.bottom?.left} >{footerData?.bottom?.left}</textarea>
    </p>
    <p><strong>Right:</strong>
    <textarea style={{fieldSizing: "content"}} value={footerData?.bottom?.right} >{footerData?.bottom?.right}</textarea>
    </p>
    <EditButton id={footerData?._id}  text={"Edit"}></EditButton>
  </div>
</div>

  )
}

export default Footer
