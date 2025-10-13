import React, { useEffect, useState } from 'react'
import { backend_url } from '../config/conf';

const Navbar = () => {
  const [nav, setNav] = useState([]);
  useEffect(() => {
    const fetchNav = async () => {
      const res = await fetch(`${backend_url}/navbar`);

      let data = await res.json();
      setNav(data);
    }
    fetchNav()
  }, [])


  const handleChange  =  (index, field, value) => {
    const updatedNav = [...nav];
    updatedNav[index][field] = value;
    setNav(updatedNav);
  };

  const handleSubmit = async (index) => {
    const item  = nav[index];
  }


  return (
    <div className="navbar-component" style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Navbar</h1>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center"
      }}>
        {nav?.map((item) => (
          <div
            className="nav-card"
            key={item._id}
            style={{
              width: "250px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              textAlign: "center",
              transition: "transform 0.2s",
            }}
          >

            {!item?.icon ? null :
              <img
                src={item?.icon}
                alt={`${item?.label} icon`}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "contain",
                  marginBottom: "10px",
                }}
              />
            }

            <h2 style={{ fontSize: "18px", margin: "10px 0 5px" }}>
              {item?.label}
            </h2>
            <h3 style={{ fontSize: "14px", color: "#666", margin: "0 0 10px" }}>
              {item?.key}
            </h3>
            <p style={{ fontSize: "12px", color: "#aaa" }}>{item?._id}</p>
          </div>
        ))}
      </div>
    </div>

  )
};


export default Navbar
