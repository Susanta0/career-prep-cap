import React, { useState, useEffect } from 'react';
// import PostForm from './components/PostForm';
import PostGenerator from './components/PostGenerator';
import SocialMediaCard from './components/SocialMediaCard';

const App = () => {
  const [generatedPosts, setGeneratedPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch('http://localhost:8080/generated-posts');
      const data = await res.json();
      setGeneratedPosts(data.reverse());
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Gemini Post Generator</h1>
      <PostGenerator onSuccess={fetchPosts} />

      <div className="mt-8 space-y-4">
        {generatedPosts.length === 0 ? (
          <p className="text-center text-gray-500">No posts generated yet.</p>
        ) : (
          generatedPosts.map((post, index) => (
            <SocialMediaCard key={index} post={post} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
