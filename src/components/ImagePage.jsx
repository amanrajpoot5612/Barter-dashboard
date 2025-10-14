import React, { useEffect, useState } from 'react'
import { backend_url_media } from '../config/conf';
import './ImagePage.style.css'
import EditButton from './EditButton';

const ImagePage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchPage = async () => {
      const res = await fetch(`${backend_url_media}/image-page`)
      const pageData = await res.json();
      setData(pageData);
    }
    fetchPage();
  }, [])
  return (
    // <div className='image-page-component'>
    //   {data?.page?.map((singlePage) => (
    //     <div className="image-card">
    //       <p>
    //         <strong>Id: </strong>{singlePage?._id}
    //       </p>
    //       <h2>
    //         <strong>Title: </strong>{singlePage?.title}
    //       </h2>
    //       <h2>
    //         <strong>Key: </strong>{singlePage?.key}
    //       </h2>
    //       {
    //         singlePage?.content.map((subTitle) => (
    //           <div className="sub-component">
    //             <h3>
    //               <strong>Sub heading: </strong>{subTitle?.title}
    //             </h3>

    //             {
    //               subTitle?.media.map((image) => (
    //                 <div className="image-component">
    //                   <p>
    //                     <strong>Id: </strong>{image?._id}
    //                   </p>

    //                   <img src={image?.url} alt="" />
    //                 </div>
    //               ))
    //             }
    //           </div>
    //         ))
    //       }
    //     </div>
    //   ))}
    // </div>
    <div className="image-page-container"
    id='image-page'>
  {data?.page?.map((singlePage) => (
    <div className="image-page-card" key={singlePage._id}>
      <div className="page-header">
        <h2><strong>Title: </strong>{singlePage.title}</h2>
        <p><strong>📄 Page ID:</strong> {singlePage._id}</p>
        <p><strong>Key:</strong> {singlePage.key}</p>
        <EditButton id={singlePage._id}  text={"Edit"}></EditButton>
      </div>

      {singlePage?.content.map((subTitle) => (
        <div className="collection-section" key={subTitle._id}>
          <h3><strong>Collection title: </strong>{subTitle?.title}</h3>
          <EditButton id={subTitle._id}  text={"Edit"}></EditButton>

          <div className="image-grid">
            {subTitle?.media.map((image) => (
              <div className="image-card" key={image._id}>
                <img src={image?.url} alt="Uploaded media" />
                <EditButton id={image._id}  text={"Edit"}></EditButton>
                {/* <p><strong>ID:</strong> {image?._id}</p> */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ))}
</div>

  )
}

export default ImagePage
