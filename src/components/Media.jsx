import React, { useEffect, useState } from "react";
import { backend_url_media, backend_url_page, backend_url } from "../config/conf.js";

const Media = () => {

  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchMedia = async () => {
      const res = await fetch(`${backend_url_media}/image-page`);

      let info = await res.json();
      setData(info);
    };
    fetchMedia();
  }, []);
  useEffect(() => {
    console.log("Updated info:", data);
  }, [data]);
 


  return <main>

    <div className="media-component">
      <h1>Media component</h1>
      {data?.page?.map((singlePage) => (
        <div key={singlePage._id}>
          <h1>{singlePage.title}</h1>
          {singlePage?.content?.map((subPage) => (
            <div key={subPage._id}>
              <h3>{subPage.title}</h3>

              <div className="media-images">
                {subPage?.media?.map((media) => (
                  <img
                    key={media._id}
                    src={media.url}
                    alt="media"
                    style={{ width: "200px", margin: "10px" }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>

    
  </main>

};

export default Media;
