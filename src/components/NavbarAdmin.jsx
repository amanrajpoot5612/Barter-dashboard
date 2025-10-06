import { useEffect, useState } from "react";

const backend_url = "http://localhost:3000/api/barter/v1/navbar";

export default function NavbarAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchNavbar();
  }, []);

  const fetchNavbar = async () => {
    try {
      const res = await fetch(backend_url);
      const data = await res.json();
      setItems(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching navbar:", err);
      setLoading(false);
    }
  };

  const handleChange = (key, field, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, [field]: value } : item
      )
    );
  };

  const updateItem = async (key) => {
    const item = items.find((i) => i.key === key);
    if (!item) return;

    setUpdating(key);

    try {
      const res = await fetch(`${backend_url}/item/${key}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label: item.label,
          icon: item.icon,
          style: item.style,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Item updated successfully!");
      } else {
        alert(`Error: ${data.message || data.error}`);
      }
    } catch (err) {
      console.error("Error updating item:", err);
      alert("Update failed!");
    } finally {
      setUpdating(null);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 font-medium">
        Loading navbar items...
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Navbar Admin Panel
      </h1>

      {items.map((item) => (
        <div
          key={item.key}
          className="border rounded-lg p-6 mb-6 shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center mb-4 justify-between">
            <h2 className="text-xl font-semibold capitalize">{item.key}</h2>
            {item.icon && (
              <img
                src={item.icon}
                alt={`${item.key} icon`}
                className="w-10 h-10 object-contain rounded"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Label */}
            <div>
              <label className="block mb-1 font-medium">Label:</label>
              <input
                type="text"
                value={item.label}
                onChange={(e) =>
                  handleChange(item.key, "label", e.target.value)
                }
                className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Icon URL */}
            <div>
              <label className="block mb-1 font-medium">Icon URL:</label>
              <input
                type="text"
                value={item.icon || ""}
                onChange={(e) =>
                  handleChange(item.key, "icon", e.target.value)
                }
                className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Style JSON */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Style (JSON):</label>
            <textarea
              value={JSON.stringify(item.style || {}, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  handleChange(item.key, "style", parsed);
                } catch {
                  // ignore invalid JSON
                }
              }}
              className="border rounded px-3 py-2 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 font-mono text-sm"
            />
          </div>

          <button
            onClick={() => updateItem(item.key)}
            disabled={updating === item.key}
            className={`px-5 py-2 rounded font-semibold text-white transition-colors duration-300 ${
              updating === item.key
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {updating === item.key ? "Updating..." : "Update Item"}
          </button>
        </div>
      ))}
    </div>
  );
}
