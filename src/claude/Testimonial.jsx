import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, GripVertical, X, User } from 'lucide-react';

export default function TestimonialEditor() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backend_url}/get-testimonials`);
      const data = await response.json();
      setTestimonials(data.items || []);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load testimonials' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTestimonial = () => {
    const newTestimonial = {
      _id: `temp_${Date.now()}`,
      img: '',
      heading: '',
      para: '',
      isNew: true
    };
    setTestimonials([...testimonials, newTestimonial]);
  };

  const handleUpdateTestimonial = (id, field, value) => {
    setTestimonials(testimonials.map(item => 
      item._id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleDeleteTestimonial = (id) => {
    setTestimonials(testimonials.filter(item => item._id !== id));
  };

  const handleSave = async () => {
    const hasEmptyFields = testimonials.some(t => !t.img || !t.heading || !t.para);
    if (hasEmptyFields) {
      setMessage({ type: 'error', text: 'All fields are required for each testimonial' });
      return;
    }

    setSaving(true);
    setMessage({ type: '', text: '' });
    
    try {
      const response = await fetch('/api/testimonials', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: testimonials }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Testimonials updated successfully!' });
        await fetchTestimonials();
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

    const items = [...testimonials];
    const draggedItemContent = items[draggedItem];
    items.splice(draggedItem, 1);
    items.splice(index, 0, draggedItemContent);

    setDraggedItem(index);
    setTestimonials(items);
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
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Testimonial Editor</h1>
              <p className="text-gray-600 mt-1">Manage customer testimonials and reviews</p>
            </div>
            <button
              onClick={handleAddTestimonial}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Add Testimonial
            </button>
          </div>
        </div>

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

        {testimonials.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <User size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg mb-2">No testimonials yet</p>
            <p className="text-gray-400 text-sm">Click "Add Testimonial" to create your first one</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial._id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all ${
                  draggedItem === index ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
                }`}
              >
                <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="cursor-move">
                      <GripVertical size={20} className="text-gray-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      Testimonial #{index + 1}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteTestimonial(testimonial._id)}
                    className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Image *
                    </label>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        {testimonial.img ? (
                          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
                            <img 
                              src={testimonial.img} 
                              alt="Customer" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                            <User size={32} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      <input
                        type="text"
                        value={testimonial.img}
                        onChange={(e) => handleUpdateTestimonial(testimonial._id, 'img', e.target.value)}
                        placeholder="https://example.com/customer-photo.jpg"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Name / Heading *
                    </label>
                    <input
                      type="text"
                      value={testimonial.heading}
                      onChange={(e) => handleUpdateTestimonial(testimonial._id, 'heading', e.target.value)}
                      placeholder="John Doe, CEO at Company"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Testimonial Text *
                    </label>
                    <textarea
                      value={testimonial.para}
                      onChange={(e) => handleUpdateTestimonial(testimonial._id, 'para', e.target.value)}
                      placeholder="This product has transformed our business. Highly recommended!"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                    <div className="mt-1 text-xs text-gray-500 text-right">
                      {testimonial.para.length} characters
                    </div>
                  </div>
                </div>

                {testimonial.img && testimonial.heading && testimonial.para && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 px-6 py-4 border-t border-gray-200">
                    <p className="text-xs font-medium text-gray-500 mb-2">PREVIEW</p>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-start gap-3">
                        <img 
                          src={testimonial.img} 
                          alt={testimonial.heading}
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700 italic mb-2 line-clamp-2">"{testimonial.para}"</p>
                          <p className="text-xs font-medium text-gray-900">{testimonial.heading}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {testimonials.length > 0 && (
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-sm"
            >
              <Save size={20} />
              {saving ? 'Saving...' : 'Save All Changes'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}