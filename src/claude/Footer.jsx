import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, GripVertical, X, ChevronDown, ChevronUp, Image } from 'lucide-react';

export default function FooterEditor() {
  const [footer, setFooter] = useState({
    logo: '',
    companyName: '',
    sections: [],
    bottom: {
      left: '',
      right: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [expandedSections, setExpandedSections] = useState(new Set());

  useEffect(() => {
    fetchFooter();
  }, []);

  const fetchFooter = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/barter/v1/get-footer');
      const data = await response.json();
      
      // Handle both direct object and array responses
      const footerData = Array.isArray(data) ? data[0] : data;
      
      setFooter(footerData || {
        logo: '',
        companyName: '',
        sections: [],
        bottom: { left: '', right: '' }
      });
      
      // Auto-expand first section if data exists
      if (footerData?.sections?.length > 0) {
        setExpandedSections(new Set([0]));
      }
    } catch (error) {
      console.error('Footer fetch error:', error);
      setMessage({ type: 'error', text: 'Failed to load footer data' });
    } finally {
      setLoading(false);
    }
  };

  const handleBasicInfoChange = (field, value) => {
    setFooter({ ...footer, [field]: value });
  };

  const handleBottomChange = (side, value) => {
    setFooter({
      ...footer,
      bottom: { ...footer.bottom, [side]: value }
    });
  };

  const toggleSection = (index) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const handleAddSection = () => {
    const newSection = {
      _id: `temp_${Date.now()}`,
      heading: '',
      type: 'links',
      items: []
    };
    setFooter({
      ...footer,
      sections: [...footer.sections, newSection]
    });
    setExpandedSections(new Set([...expandedSections, footer.sections.length]));
  };

  const handleUpdateSection = (index, field, value) => {
    const newSections = [...footer.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setFooter({ ...footer, sections: newSections });
  };

  const handleDeleteSection = (index) => {
    const newSections = footer.sections.filter((_, i) => i !== index);
    setFooter({ ...footer, sections: newSections });
    const newExpanded = new Set(expandedSections);
    newExpanded.delete(index);
    setExpandedSections(newExpanded);
  };

  const handleAddItem = (sectionIndex) => {
    const newSections = [...footer.sections];
    const newItem = {
      _id: `temp_${Date.now()}`,
      name: '',
      link: '',
      icon: ''
    };
    newSections[sectionIndex].items = [...newSections[sectionIndex].items, newItem];
    setFooter({ ...footer, sections: newSections });
  };

  const handleUpdateItem = (sectionIndex, itemIndex, field, value) => {
    const newSections = [...footer.sections];
    newSections[sectionIndex].items[itemIndex] = {
      ...newSections[sectionIndex].items[itemIndex],
      [field]: value
    };
    setFooter({ ...footer, sections: newSections });
  };

  const handleDeleteItem = (sectionIndex, itemIndex) => {
    const newSections = [...footer.sections];
    newSections[sectionIndex].items = newSections[sectionIndex].items.filter((_, i) => i !== itemIndex);
    setFooter({ ...footer, sections: newSections });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });
    
    try {
      const response = await fetch('/api/footer', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(footer),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Footer updated successfully!' });
        await fetchFooter();
      } else {
        const errorData = await response.text();
        console.error('Save error:', errorData);
        throw new Error('Failed to update');
      }
    } catch (error) {
      console.error('Save error:', error);
      setMessage({ type: 'error', text: `Failed to save changes: ${error.message}` });
    } finally {
      setSaving(false);
    }
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
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Footer Editor</h1>
              <p className="text-gray-600 mt-1">Manage your website footer content</p>
            </div>
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

        {/* Basic Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo URL *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={footer.logo}
                  onChange={(e) => handleBasicInfoChange('logo', e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {footer.logo && (
                  <div className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                    <Image size={20} className="text-gray-400" />
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                value={footer.companyName}
                onChange={(e) => handleBasicInfoChange('companyName', e.target.value)}
                placeholder="Your Company"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Footer Sections</h2>
            <button
              onClick={handleAddSection}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus size={18} />
              Add Section
            </button>
          </div>

          {footer.sections.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No sections yet. Click "Add Section" to create one.</p>
          ) : (
            <div className="space-y-4">
              {footer.sections.map((section, sectionIndex) => (
                <div key={section._id} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Section Header */}
                  <div className="bg-gray-50 p-4 flex items-center justify-between">
                    <button
                      onClick={() => toggleSection(sectionIndex)}
                      className="flex items-center gap-3 flex-1 text-left"
                    >
                      {expandedSections.has(sectionIndex) ? (
                        <ChevronUp size={20} className="text-gray-500" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-500" />
                      )}
                      <div>
                        <span className="font-medium text-gray-900">
                          {section.heading || 'Untitled Section'}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          ({section.type}) • {section.items.length} items
                        </span>
                      </div>
                    </button>
                    <button
                      onClick={() => handleDeleteSection(sectionIndex)}
                      className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Section Content */}
                  {expandedSections.has(sectionIndex) && (
                    <div className="p-4 space-y-4">
                      {/* Section Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Heading *
                          </label>
                          <input
                            type="text"
                            value={section.heading}
                            onChange={(e) => handleUpdateSection(sectionIndex, 'heading', e.target.value)}
                            placeholder="Quick Links"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Type *
                          </label>
                          <select
                            value={section.type}
                            onChange={(e) => handleUpdateSection(sectionIndex, 'type', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="links">Links</option>
                            <option value="contact">Contact</option>
                            <option value="social">Social</option>
                          </select>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-medium text-gray-900">Items</h3>
                          <button
                            onClick={() => handleAddItem(sectionIndex)}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                          >
                            <Plus size={16} />
                            Add Item
                          </button>
                        </div>

                        {section.items.length === 0 ? (
                          <p className="text-gray-500 text-sm py-4 text-center">No items yet</p>
                        ) : (
                          <div className="space-y-3">
                            {section.items.map((item, itemIndex) => (
                              <div key={item._id} className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex gap-3">
                                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div>
                                      <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => handleUpdateItem(sectionIndex, itemIndex, 'name', e.target.value)}
                                        placeholder="Name *"
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                    </div>
                                    <div>
                                      <input
                                        type="text"
                                        value={item.link}
                                        onChange={(e) => handleUpdateItem(sectionIndex, itemIndex, 'link', e.target.value)}
                                        placeholder="Link"
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                    </div>
                                    <div>
                                      <input
                                        type="text"
                                        value={item.icon}
                                        onChange={(e) => handleUpdateItem(sectionIndex, itemIndex, 'icon', e.target.value)}
                                        placeholder="Icon"
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => handleDeleteItem(sectionIndex, itemIndex)}
                                    className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Text */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Bottom Bar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Left Text
              </label>
              <input
                type="text"
                value={footer.bottom.left}
                onChange={(e) => handleBottomChange('left', e.target.value)}
                placeholder="© 2025 Your Company. All rights reserved."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Right Text
              </label>
              <input
                type="text"
                value={footer.bottom.right}
                onChange={(e) => handleBottomChange('right', e.target.value)}
                placeholder="Privacy Policy • Terms of Service"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Save size={20} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}