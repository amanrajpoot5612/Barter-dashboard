import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, GripVertical, X } from 'lucide-react';

export default function NavbarEditor() {
  const [navbarItems, setNavbarItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [draggedItem, setDraggedItem] = useState(null);

  // Fetch navbar items on mount
  useEffect(() => {
    fetchNavbarItems();
  }, []);

  const fetchNavbarItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backend_url}/get-navbar`);
      const data = await response.json();
      setNavbarItems(data.items || []);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load navbar items' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = () => {
    const newItem = {
      _id: `temp_${Date.now()}`,
      label: '',
      key: '',
      link: '',
      icon: '',
      isNew: true
    };
    setNavbarItems([...navbarItems, newItem]);
  };

  const handleUpdateItem = (id, field, value) => {
    setNavbarItems(navbarItems.map(item => 
      item._id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleDeleteItem = (id) => {
    setNavbarItems(navbarItems.filter(item => item._id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });
    
    try {
      const response = await fetch('/api/navbar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: navbarItems }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Navbar updated successfully!' });
        await fetchNavbarItems();
      } else {
        throw new Error('Failed to update');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save changes' });
    } finally {
      setSaving(false);
    }
  };

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;

    const items = [...navbarItems];
    const draggedItemContent = items[draggedItem];
    items.splice(draggedItem, 1);
    items.splice(index, 0, draggedItemContent);

    setDraggedItem(index);
    setNavbarItems(items);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Navbar Editor</h1>
              <p className="text-gray-600 mt-1">Manage your navigation menu items</p>
            </div>
            <button
              onClick={handleAddItem}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Add Item
            </button>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-center justify-between ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            <span>{message.text}</span>
            <button onClick={() => setMessage({ type: '', text: '' })}>
              <X size={18} />
            </button>
          </div>
        )}

        {/* Items List */}
        <div className="space-y-4">
          {navbarItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-500">No navbar items yet. Click "Add Item" to create one.</p>
            </div>
          ) : (
            navbarItems.map((item, index) => (
              <div
                key={item._id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all ${
                  draggedItem === index ? 'opacity-50' : 'opacity-100'
                }`}
              >
                <div className="flex gap-4">
                  {/* Drag Handle */}
                  <div className="flex items-start pt-2 cursor-move">
                    <GripVertical size={20} className="text-gray-400" />
                  </div>

                  {/* Form Fields */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Label *
                      </label>
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => handleUpdateItem(item._id, 'label', e.target.value)}
                        placeholder="Home"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Key *
                      </label>
                      <input
                        type="text"
                        value={item.key}
                        onChange={(e) => handleUpdateItem(item._id, 'key', e.target.value.toLowerCase())}
                        placeholder="home"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Link
                      </label>
                      <input
                        type="text"
                        value={item.link}
                        onChange={(e) => handleUpdateItem(item._id, 'link', e.target.value)}
                        placeholder="/home"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Icon
                      </label>
                      <input
                        type="text"
                        value={item.icon}
                        onChange={(e) => handleUpdateItem(item._id, 'icon', e.target.value)}
                        placeholder="home-icon"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Delete Button */}
                  <div className="flex items-start pt-2">
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Save Button */}
        {navbarItems.length > 0 && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}