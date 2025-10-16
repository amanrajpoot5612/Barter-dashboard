import React, { useEffect, useState } from 'react';
import { backend_url } from '../config/conf';
import EditButton from './EditButton.jsx'

const Navbar = () => {
  const [nav, setNav] = useState([]);

  useEffect(() => {
    const fetchNav = async () => {
      const res = await fetch(`${backend_url}/navbar`);
      const data = await res.json();
      setNav(data);
    };
    fetchNav();
  }, []);

  return (
    <div
      id="navbar"
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
        <EditableCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default Navbar;

// 🔄 EditableCard component
const EditableCard = ({ item }) => {
  const [formData, setFormData] = useState({
    icon: item.icon || "",
    label: item.label || "",
    key: item.key || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted data for:", item._id, formData);

    // Optionally: send update request to backend here
    await fetch(`${backend_url}/navbar/item/${item._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  };

  const handleFormReset = (e) => {
    e.preventDefault();
    setFormData({
    icon: item.icon || "",
    label: item.label || "",
    key: item.key || "",
  });

  }

  return (
    <div
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
      <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
        {/* Icon preview */}
        {formData.icon && (
          <div style={{ marginBottom: '10px' }}>
            <img
              src={formData.icon}
              alt={formData.label}
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
          <input
            type="text"
            name="label"
            value={formData.label}
            onChange={handleChange}
          />
        </div>

        {/* Key */}
        <div style={{ marginBottom: '6px' }}>
          <strong>Key:</strong>
          <input
            type="text"
            name="key"
            value={formData.key}
            onChange={handleChange}
          />
        </div>

        {/* ID */}
        <div style={{ marginBottom: '6px' }}>
          <strong>ID:</strong> {item._id}
        </div>

        {/* Timestamps */}
        <div style={{ marginBottom: '6px' }}>
          <strong>Created:</strong> {new Date(item.createdAt).toLocaleString()}
        </div>
        <div>
          <strong>Updated:</strong> {new Date(item.updatedAt).toLocaleString()}
        </div>

        <button type="submit">
          <EditButton text={"Submit"} color={"rgba(26, 26, 153, 1)"} textColor={"white"} ></EditButton>
        </button>
        <button type="reset">
          <EditButton text={"Reset"} color={"rgba(150, 0, 0, 1)"} textColor={"white"} ></EditButton>
        </button>
      </form>
    </div>
  );
};
