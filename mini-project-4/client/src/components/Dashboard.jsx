
import React, { useState, useEffect, useMemo } from "react";
import {
  PlusCircle,
  Image,
  X,
  Edit,
  Trash2,
  LogOut,
  Search,
  Filter,
  Tag,
  XCircle,
} from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categories: "",
    image: null,
  });
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  // New state for filtering and searching
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let api = import.meta.env.VITE_API_URL;

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api}notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setNotes(response.data.notes || []);
        console.log(response.data);
      } else {
        console.error("Failed to fetch notes");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please fill in title and description");
      return;
    }

    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("categories", formData.categories);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const url = editingNote
        ? `${api}notes/${editingNote._id}`
        : `${api}notes`;
      const method = editingNote ? "PUT" : "POST";

      const response = await axios({
        method,
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formDataToSend,
      });

      if (response.status === 200) {
        const data = response.data;

        if (editingNote) {
          setNotes((prev) =>
            prev.map((note) =>
              note._id === editingNote._id ? data.note : note
            )
          );
        } else {
          setNotes((prev) => [data.newData, ...prev]);
        }

        // Reset form
        setFormData({
          title: "",
          description: "",
          categories: "",
          image: null,
        });
        setShowForm(false);
        setEditingNote(null);
      } else {
        const errorData = await response.data;
        alert(errorData.message || "Failed to save note");
      }
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Error saving note");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      const response = await axios.delete(`${api}notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setNotes((prev) => prev.filter((note) => note._id !== id));
      } else {
        const errorData = await response.data;
        alert(errorData.message || "Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Error deleting note");
    }
  };

  const editNote = (note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      description: note.description,
      categories: Array.isArray(note.categories)
        ? note.categories.join(", ")
        : note.categories,
      image: null,
    });
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingNote(null);
    setFormData({
      title: "",
      description: "",
      categories: "",
      image: null,
    });
    setShowForm(false);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logout());
      navigate("/");
    }
  };

  const getCategoriesArray = (categories) => {
    if (Array.isArray(categories)) return categories;
    if (typeof categories === "string")
      return categories
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c);
    return [];
  };

  // Get all unique categories from notes
  const allCategories = useMemo(() => {
    const categoriesSet = new Set();
    notes.forEach((note) => {
      getCategoriesArray(note.categories).forEach((category) => {
        categoriesSet.add(category);
      });
    });
    return Array.from(categoriesSet).sort();
  }, [notes]);

  // Filter and search notes
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      // Search by title
      const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by categories
      const noteCategories = getCategoriesArray(note.categories);
      const matchesCategories = selectedCategories.length === 0 || 
        selectedCategories.some(category => noteCategories.includes(category));
      
      return matchesSearch && matchesCategories;
    });
  }, [notes, searchTerm, selectedCategories]);

  // Handle category filter toggle
  const toggleCategoryFilter = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">My Notes</h1>
              <span className="ml-3 bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {filteredNotes.length} of {notes.length} notes
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  {showForm ? "Cancel" : "New Note"}
                </button>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 font-medium"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search notes by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter Button */}
            <button
              onClick={() => setShowCategoryFilter(!showCategoryFilter)}
              className={`inline-flex items-center px-4 py-2 rounded-lg border transition duration-200 ${
                showCategoryFilter
                  ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Filter className="w-5 h-5 mr-2" />
              Categories
              {selectedCategories.length > 0 && (
                <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {selectedCategories.length}
                </span>
              )}
            </button>

            {/* Clear Filters Button */}
            {(searchTerm || selectedCategories.length > 0) && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200"
              >
                <XCircle className="w-5 h-5 mr-2" />
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Dropdown */}
          {showCategoryFilter && allCategories.length > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Filter by categories:</h4>
              <div className="flex flex-wrap gap-2">
                {allCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleCategoryFilter(category)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition duration-200 ${
                      selectedCategories.includes(category)
                        ? "bg-indigo-100 text-indigo-800 border-2 border-indigo-200"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {selectedCategories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {selectedCategories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full"
                >
                  {category}
                  <button
                    onClick={() => toggleCategoryFilter(category)}
                    className="ml-2 text-indigo-600 hover:text-indigo-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {editingNote ? "Edit Note" : "Create New Note"}
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  placeholder="Enter note title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 resize-none"
                  placeholder="Enter note description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categories
                </label>
                <input
                  type="text"
                  name="categories"
                  value={formData.categories}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  placeholder="Enter categories separated by commas (e.g., Work, Personal, Ideas)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Image
                </label>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition duration-200">
                  <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <label className="cursor-pointer">
                    <span className="text-indigo-600 hover:text-indigo-700 font-medium">
                      Click to upload image
                    </span>
                    <span className="text-gray-500"> or drag and drop</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF up to 10MB
                  </p>
                  {formData.image && (
                    <p className="text-sm text-green-600 mt-2">
                      Selected: {formData.image.name}
                    </p>
                  )}
                </div>

                {editingNote && editingNote.image && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-700 mb-2">Current image:</p>
                    <img
                      src={editingNote.image}
                      alt="Current"
                      className="w-32 h-24 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={cancelEdit}
                  disabled={submitting}
                  className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200 font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 font-medium disabled:opacity-50"
                >
                  {submitting
                    ? "Saving..."
                    : editingNote
                    ? "Update Note"
                    : "Create Note"}
                </button>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading notes...</p>
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div
                key={note._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 border"
              >
                <div className="relative">
                  {note.image ? (
                    <img
                      src={note.image}
                      alt={note.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <Image className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <button
                      onClick={() => editNote(note)}
                      className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition duration-200"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => deleteNote(note._id)}
                      className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition duration-200"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {note.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {note.description}
                  </p>
                  {getCategoriesArray(note.categories).length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {getCategoriesArray(note.categories).map(
                        (category, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full"
                          >
                            {category}
                          </span>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredNotes.length === 0 && notes.length > 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No notes found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
            >
              <XCircle className="w-5 h-5 mr-2" />
              Clear Filters
            </button>
          </div>
        )}

        {!loading && notes.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <PlusCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No notes yet
            </h3>
            <p className="text-gray-500 mb-4">
              Create your first note to get started
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Create Note
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;