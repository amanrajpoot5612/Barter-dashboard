import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, X, ChevronDown, ChevronUp, FileText, Image, List, Type } from 'lucide-react';
import { backend_url_page } from '../config/conf';

export default function PageEditor() {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [expandedSections, setExpandedSections] = useState({ description: true });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backend_url_page}/get-pages`);
      const data = await response.json();
      setPages(data || []);
      if (data.length > 0 && !selectedPage) {
        setSelectedPage(data[0]);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load pages' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePage = () => {
    const newPage = {
      _id: `temp_${Date.now()}`,
      serialNumber: pages.length + 1,
      name: '',
      key: '',
      section: {
        type: 'text',
        preSubHeading: '',
        heading: '',
        subHeading: '',
        description: {
          paragraphs: [],
          list: [],
          carouselImages: [],
          buttons: [],
          imageURL: []
        }
      },
      isNew: true
    };
    setPages([...pages, newPage]);
    setSelectedPage(newPage);
  };

  const handleUpdatePage = (field, value) => {
    setSelectedPage({ ...selectedPage, [field]: value });
    setPages(pages.map(p => p._id === selectedPage._id ? { ...selectedPage, [field]: value } : p));
  };

  const handleUpdateSection = (field, value) => {
    const updatedSection = { ...selectedPage.section, [field]: value };
    handleUpdatePage('section', updatedSection);
  };

  const handleUpdateDescription = (field, value) => {
    const updatedDescription = { ...selectedPage.section.description, [field]: value };
    handleUpdateSection('description', updatedDescription);
  };

  const addParagraph = () => {
    const paragraphs = [...(selectedPage.section.description.paragraphs || []), ''];
    handleUpdateDescription('paragraphs', paragraphs);
  };

  const updateParagraph = (index, value) => {
    const paragraphs = [...selectedPage.section.description.paragraphs];
    paragraphs[index] = value;
    handleUpdateDescription('paragraphs', paragraphs);
  };

  const deleteParagraph = (index) => {
    const paragraphs = selectedPage.section.description.paragraphs.filter((_, i) => i !== index);
    handleUpdateDescription('paragraphs', paragraphs);
  };

  const addList = () => {
    const list = [...(selectedPage.section.description.list || []), { title: '', items: [] }];
    handleUpdateDescription('list', list);
  };

  const updateList = (index, field, value) => {
    const list = [...selectedPage.section.description.list];
    list[index] = { ...list[index], [field]: value };
    handleUpdateDescription('list', list);
  };

  const deleteList = (index) => {
    const list = selectedPage.section.description.list.filter((_, i) => i !== index);
    handleUpdateDescription('list', list);
  };

  const addListItem = (listIndex) => {
    const list = [...selectedPage.section.description.list];
    list[listIndex].items = [...list[listIndex].items, ''];
    handleUpdateDescription('list', list);
  };

  const updateListItem = (listIndex, itemIndex, value) => {
    const list = [...selectedPage.section.description.list];
    list[listIndex].items[itemIndex] = value;
    handleUpdateDescription('list', list);
  };

  const deleteListItem = (listIndex, itemIndex) => {
    const list = [...selectedPage.section.description.list];
    list[listIndex].items = list[listIndex].items.filter((_, i) => i !== itemIndex);
    handleUpdateDescription('list', list);
  };

  const addArrayItem = (field) => {
    const arr = [...(selectedPage.section.description[field] || []), ''];
    handleUpdateDescription(field, arr);
  };

  const updateArrayItem = (field, index, value) => {
    const arr = [...selectedPage.section.description[field]];
    arr[index] = value;
    handleUpdateDescription(field, arr);
  };

  const deleteArrayItem = (field, index) => {
    const arr = selectedPage.section.description[field].filter((_, i) => i !== index);
    handleUpdateDescription(field, arr);
  };

  const handleDeletePage = async (pageId) => {
    if (!confirm('Are you sure you want to delete this page?')) return;
    
    const updatedPages = pages.filter(p => p._id !== pageId);
    setPages(updatedPages);
    
    if (selectedPage?._id === pageId) {
      setSelectedPage(updatedPages[0] || null);
    }
  };

  const handleSave = async () => {
    if (!selectedPage.name || !selectedPage.key || !selectedPage.section.heading) {
      setMessage({ type: 'error', text: 'Name, Key, and Section Heading are required' });
      return;
    }

    setSaving(true);
    setMessage({ type: '', text: '' });
    
    try {
      const method = selectedPage.isNew ? 'POST' : 'PUT';
      const url = selectedPage.isNew ? '/api/pages' : `/api/pages/${selectedPage._id}`;
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedPage),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Page saved successfully!' });
        await fetchPages();
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save page' });
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Pages</h1>
          <button
            onClick={handleCreatePage}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            New Page
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {pages.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <FileText size={48} className="mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No pages yet</p>
            </div>
          ) : (
            <div className="p-4 space-y-2">
              {pages.map(page => (
                <button
                  key={page._id}
                  onClick={() => setSelectedPage(page)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedPage?._id === page._id
                      ? 'bg-blue-50 border-2 border-blue-500'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  <div className="font-medium text-gray-900 truncate">
                    {page.name || 'Untitled Page'}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    #{page.serialNumber} • {page.section.type}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {!selectedPage ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <FileText size={64} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Select a page to edit</p>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto p-8">
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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Page Information</h2>
                <button
                  onClick={() => handleDeletePage(selectedPage._id)}
                  className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
                >
                  <Trash2 size={16} />
                  Delete Page
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Serial Number *
                  </label>
                  <input
                    type="number"
                    value={selectedPage.serialNumber}
                    onChange={(e) => handleUpdatePage('serialNumber', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Page Name *
                  </label>
                  <input
                    type="text"
                    value={selectedPage.name}
                    onChange={(e) => handleUpdatePage('name', e.target.value)}
                    placeholder="About Us"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Page Key *
                  </label>
                  <input
                    type="text"
                    value={selectedPage.key}
                    onChange={(e) => handleUpdatePage('key', e.target.value.toLowerCase().trim())}
                    placeholder="about-us"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Section Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Section Content</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Type *
                  </label>
                  <select
                    value={selectedPage.section.type}
                    onChange={(e) => handleUpdateSection('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="text">Text</option>
                    <option value="imageCardGallery">Image Card Gallery</option>
                    <option value="home">Home</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pre Sub Heading
                  </label>
                  <input
                    type="text"
                    value={selectedPage.section.preSubHeading || ''}
                    onChange={(e) => handleUpdateSection('preSubHeading', e.target.value)}
                    placeholder="Welcome to"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heading *
                  </label>
                  <input
                    type="text"
                    value={selectedPage.section.heading}
                    onChange={(e) => handleUpdateSection('heading', e.target.value)}
                    placeholder="Our Company"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sub Heading
                  </label>
                  <input
                    type="text"
                    value={selectedPage.section.subHeading || ''}
                    onChange={(e) => handleUpdateSection('subHeading', e.target.value)}
                    placeholder="Building the future"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <button
                onClick={() => toggleSection('description')}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <h2 className="text-lg font-semibold text-gray-900">Description Content</h2>
                {expandedSections.description ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {expandedSections.description && (
                <div className="px-6 pb-6 space-y-6 border-t border-gray-200 pt-6">
                  {/* Paragraphs */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Type size={16} />
                        Paragraphs
                      </label>
                      <button
                        onClick={addParagraph}
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                      >
                        <Plus size={16} />
                        Add Paragraph
                      </button>
                    </div>
                    <div className="space-y-2">
                      {(selectedPage.section.description.paragraphs || []).map((para, i) => (
                        <div key={i} className="flex gap-2">
                          <textarea
                            value={para}
                            onChange={(e) => updateParagraph(i, e.target.value)}
                            placeholder={`Paragraph ${i + 1}`}
                            rows={2}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => deleteParagraph(i)}
                            className="text-red-600 hover:text-red-700 p-2"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lists */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <List size={16} />
                        Lists
                      </label>
                      <button
                        onClick={addList}
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                      >
                        <Plus size={16} />
                        Add List
                      </button>
                    </div>
                    <div className="space-y-4">
                      {(selectedPage.section.description.list || []).map((list, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex gap-2 mb-3">
                            <input
                              type="text"
                              value={list.title}
                              onChange={(e) => updateList(i, 'title', e.target.value)}
                              placeholder="List Title"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                              onClick={() => deleteList(i)}
                              className="text-red-600 hover:text-red-700 p-2"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          <div className="space-y-2 ml-4">
                            {list.items.map((item, j) => (
                              <div key={j} className="flex gap-2">
                                <input
                                  type="text"
                                  value={item}
                                  onChange={(e) => updateListItem(i, j, e.target.value)}
                                  placeholder={`Item ${j + 1}`}
                                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                  onClick={() => deleteListItem(i, j)}
                                  className="text-red-600 hover:text-red-700 p-2"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => addListItem(i)}
                              className="text-blue-600 hover:text-blue-700 text-sm"
                            >
                              + Add Item
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-gray-700">Buttons</label>
                      <button
                        onClick={() => addArrayItem('buttons')}
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                      >
                        <Plus size={16} />
                        Add Button
                      </button>
                    </div>
                    <div className="space-y-2">
                      {(selectedPage.section.description.buttons || []).map((btn, i) => (
                        <div key={i} className="flex gap-2">
                          <input
                            type="text"
                            value={btn}
                            onChange={(e) => updateArrayItem('buttons', i, e.target.value)}
                            placeholder="Button Text"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => deleteArrayItem('buttons', i)}
                            className="text-red-600 hover:text-red-700 p-2"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Carousel Images */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Image size={16} />
                        Carousel Images
                      </label>
                      <button
                        onClick={() => addArrayItem('carouselImages')}
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                      >
                        <Plus size={16} />
                        Add Image
                      </button>
                    </div>
                    <div className="space-y-2">
                      {(selectedPage.section.description.carouselImages || []).map((img, i) => (
                        <div key={i} className="flex gap-2">
                          <input
                            type="text"
                            value={img}
                            onChange={(e) => updateArrayItem('carouselImages', i, e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => deleteArrayItem('carouselImages', i)}
                            className="text-red-600 hover:text-red-700 p-2"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Image URLs */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Image size={16} />
                        Image URLs
                      </label>
                      <button
                        onClick={() => addArrayItem('imageURL')}
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                      >
                        <Plus size={16} />
                        Add Image
                      </button>
                    </div>
                    <div className="space-y-2">
                      {(selectedPage.section.description.imageURL || []).map((img, i) => (
                        <div key={i} className="flex gap-2">
                          <input
                            type="text"
                            value={img}
                            onChange={(e) => updateArrayItem('imageURL', i, e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => deleteArrayItem('imageURL', i)}
                            className="text-red-600 hover:text-red-700 p-2"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
              >
                <Save size={20} />
                {saving ? 'Saving...' : 'Save Page'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}