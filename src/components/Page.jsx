// import React, { useEffect, useState } from 'react'
// import { backend_url_page } from '../config/conf';

// const Page = () => {
//   const [home, setHome] = useState([]);
//   const [formData, setFormData] = useState([]);
//   useEffect(() => {
//     const fetchHome = async () => {
//       const res = await fetch(`${backend_url_page}/get-pages`)
//       const homeData = await res.json();
//       setFormData(homeData?.page || [])
//     }
//     fetchHome();
//   }, [])

//   const handleFieldChange = (pageIndex, path, value) => {
//     setFormData((prev) => {
//       const updated = [...prev];
//       const keys = path.split('.');
//       let ref = updated[pageIndex];

//       for (let i = 0; i < keys.length - 1; i++) {
//         const k = keys[i];
//         if (Array.isArray(ref)) ref = ref[+k];
//         else ref = ref[k];
//       }

//       const lastKey = keys[keys.length - 1];
//       if (Array.isArray(ref)) ref[+lastKey] = value;
//       else ref[lastKey] = value;

//       return updated;
//     });
//   };

//   return (
//     <div
//       id='page'
//       className="cards-container"
//       style={{
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: '20px',
//         padding: '20px',
//         backgroundColor: '#f9f9f9',
//       }}
//     >
//       {home?.page?.map((page) => {
//         const {
//           _id,
//           name,
//           key,
//           serialNumber,
//           section,
//           createdAt,
//           updatedAt,
//         } = page;

//         const {
//           heading,
//           subHeading,
//           description = {},
//         } = section || {};

//         const {
//           paragraphs = [],
//           list = [],
//           buttons = [],
//           imageURL = [],
//         } = description;

//         return (
//           <div
//             key={_id}
//             className="card"
//             style={{
//               backgroundColor: '#fff',
//               border: '1px solid #ddd',
//               borderRadius: '8px',
//               padding: '20px',
//               width: '100%',
//               maxWidth: '500px',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//               display: 'flex',
//               flexDirection: 'column',
//               gap: '10px',
//             }}
//           >
//             {/* Page Meta */}
//             <div style={{ fontSize: '14px', color: '#888' }}>
//               <div><strong>ID:</strong> {_id}</div>
//               <div><strong>Key:</strong>
//                 <input type="text" value={key} 
//                 onChange={(e) => handleFieldChange(index, 'key', e.target.value)}/>
//               </div>
//               <div><strong>Serial No:</strong>
//                 <input type="text" value={serialNumber} 
//                 onChange={(e) => handleFieldChange(index, 'serialNumber', e.target.value)}/>
//               </div>
//               <div><strong>Created:</strong> {new Date(createdAt).toLocaleString()}</div>
//               <div><strong>Updated:</strong> {new Date(updatedAt).toLocaleString()}</div>
//             </div>

//             {/* Titles */}
//             <h2 style={{ margin: '10px 0 0', fontSize: '20px' }}><strong>Page Name:</strong>
//               <input type="text" value={name} />
//             </h2>
//             {heading && <h3 style={{ color: '#444' }}><strong>Heading:</strong>
//               <textarea style={{ fieldSizing: "content" }} >{heading}</textarea>
//             </h3>}
//             {subHeading && <h4 style={{ color: '#666' }}><strong>Sub heading:</strong>
//               <textarea style={{ fieldSizing: "content" }} >{subHeading}</textarea>
//             </h4>}

//             {/* Images */}
//             {imageURL.length > 0 && (
//               <div
//                 className="image-gallery"
//                 style={{
//                   display: 'flex',
//                   flexWrap: 'wrap',
//                   gap: '10px',
//                   marginTop: '10px',
//                 }}
//               >
//                 {key === "home" ? <h2><strong>Carousel images (home)</strong></h2> : <h2><strong>Section images</strong></h2>}
//                 {imageURL.map((img, idx) => (
//                   <div className="img-container">

//                     <img
//                       key={idx}
//                       src={img}
//                       alt={`Image ${idx + 1}`}
//                       style={{
//                         width: '100%',
//                         maxHeight: '200px',
//                         objectFit: 'cover',
//                         borderRadius: '4px',
//                       }}
//                     />
//                   </div>

//                 ))}
//               </div>
//             )}

//             {/* Paragraphs */}
//             {paragraphs.length > 0 && (
//               <div className="paragraphs" style={{ marginTop: '10px' }}>
//                 {paragraphs.map((para, idx) => (
//                   <p key={idx} style={{ lineHeight: '1.6', color: '#333' }}>
//                     <strong>{`Paragraph (${idx + 1})`}:</strong>
//                     <textarea style={{ fieldSizing: "content" }} >{para}</textarea>
//                   </p>
//                 ))}
//               </div>
//             )}

//             {/* Lists */}
//             {list.length > 0 && (
//               <div className="lists" style={{ marginTop: '10px' }}>
//                 {list.map((lst, idx) => (
//                   <div key={lst._id} style={{ marginBottom: '10px' }}>
//                     <strong><strong>{`List title (${idx + 1}):`}</strong>
//                       <input type="text" value={lst.title} />
//                     </strong>
//                     <ul style={{ paddingLeft: '20px' }}>
//                       {lst.items.map((item, idx) => (
//                         <li key={idx}>
//                           <input type="text" value={item} />
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Buttons */}
//             {buttons.length > 0 && (
//               <div className="buttons" style={{ marginTop: '10px' }}>
//                 {buttons.map((btnText, idx) => (
//                   <>
//                     <h2><strong>Buttons on page</strong></h2>
//                     <button
//                       key={idx}
//                       style={{
//                         padding: '8px 16px',
//                         marginRight: '10px',
//                         backgroundColor: '#007bff',
//                         color: '#fff',
//                         border: 'none',
//                         borderRadius: '4px',
//                         cursor: 'pointer',
//                       }}
//                     >

//                       <input type="text" value={btnText} />
//                     </button>
//                   </>
//                 ))}
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>


//   )
// }

// export default Page



import React, { useEffect, useState } from 'react';
import { backend_url_page } from '../config/conf';

const Page = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchHome = async () => {
      const res = await fetch(`${backend_url_page}/get-pages`);
      const homeData = await res.json();
      setFormData(homeData?.page || []);
    };
    fetchHome();
  }, []);

  const handleFieldChange = (pageIndex, path, value) => {
    setFormData((prev) => {
      const updated = [...prev];
      const keys = path.split('.');
      let ref = updated[pageIndex];

      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        ref = Array.isArray(ref) ? ref[+k] : ref[k];
      }

      const lastKey = keys[keys.length - 1];
      if (Array.isArray(ref)) ref[+lastKey] = value;
      else ref[lastKey] = value;

      return updated;
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${backend_url_page}/update-pages`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pages: formData }),
      });

      const data = await res.json();
      alert(data.message || 'Pages updated successfully');
    } catch (error) {
      console.error(error);
      alert('Error updating pages');
    }
  };

  return (
    <div style={{ padding: '20px' }} id='page'>
      <h1>Pages</h1>
      <button onClick={handleSubmit} style={{
        padding: '10px 20px',
        backgroundColor: 'green',
        color: 'white',
        borderRadius: '5px',
        marginBottom: '20px',
        cursor: 'pointer'
      }}>
        Save All Changes
      </button>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {formData.map((page, index) => {
          const {
            _id,
            name,
            key,
            serialNumber,
            section = {},
            createdAt,
            updatedAt,
          } = page;

          const {
            heading = '',
            subHeading = '',
            description = {},
          } = section;

          const {
            paragraphs = [],
            list = [],
            buttons = [],
            imageURL = [],
          } = description;

          return (
            <div
              key={_id}
              style={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                maxWidth: '500px',
                width: '100%',
              }}
            >
              <div style={{ fontSize: '14px', color: '#888' }}>
                <div><strong>ID:</strong> {_id}</div>
                <div>
                  <strong>Key:</strong>
                  <input
                    type="text"
                    value={key}
                    onChange={(e) => handleFieldChange(index, 'key', e.target.value)}
                  />
                </div>
                <div>
                  <strong>Serial No:</strong>
                  <input
                    type="text"
                    value={serialNumber}
                    onChange={(e) => handleFieldChange(index, 'serialNumber', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <strong>Page Name:</strong>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                />
              </div>

              <div>
                <strong>Heading:</strong>
                <textarea
                  value={heading}
                  style={{fieldSizing: "content"}}
                  onChange={(e) => handleFieldChange(index, 'section.heading', e.target.value)}
                />
              </div>

              <div>
                <strong>Sub Heading:</strong>
                <textarea
                style={{fieldSizing: "content"}}
                  value={subHeading}
                  onChange={(e) => handleFieldChange(index, 'section.subHeading', e.target.value)}
                />
              </div>

              {/* Paragraphs */}
              {paragraphs.map((para, pIdx) => (
                <div key={pIdx}>
                  <strong>Paragraph {pIdx + 1}:</strong>
                  <textarea
                  style={{fieldSizing: "content"}}
                    value={para}
                    onChange={(e) => handleFieldChange(index, `section.description.paragraphs.${pIdx}`, e.target.value)}
                  />
                </div>
              ))}

              {/* List Items */}
              {list.map((lst, lIdx) => (
                <div key={lst._id}>
                  <strong>List Title {lIdx + 1}:</strong>
                  <input
                    type="text"
                    value={lst.title}
                    onChange={(e) => handleFieldChange(index, `section.description.list.${lIdx}.title`, e.target.value)}
                  />
                  <ul>
                    {lst.items.map((item, iIdx) => (
                      <li key={iIdx}>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleFieldChange(index, `section.description.list.${lIdx}.items.${iIdx}`, e.target.value)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Buttons */}
              {buttons.map((btn, bIdx) => (
                <div key={bIdx}>
                  <strong>Button {bIdx + 1}:</strong>
                  <input
                    type="text"
                    value={btn}
                    onChange={(e) => handleFieldChange(index, `section.description.buttons.${bIdx}`, e.target.value)}
                  />
                </div>
              ))}

              {/* Images */}
              {imageURL.map((img, iIdx) => (
                <div key={iIdx}>
                  <img src={img} alt="" style={{ width: '100px' }} />
                  <input
                    type="text"
                    value={img}
                    onChange={(e) => handleFieldChange(index, `section.description.imageURL.${iIdx}`, e.target.value)}
                  />
                </div>
              ))}

              <div style={{ marginTop: '10px', color: '#999' }}>
                Created: {new Date(createdAt).toLocaleString()} <br />
                Updated: {new Date(updatedAt).toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
