
import React from 'react';

const SocialMediaCard = ({ post }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {post.platform?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {post.platform}
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>

        <div className="text-gray-800 leading-relaxed whitespace-pre-line mb-4">
          {post.post}
        </div>

      </div>
    </div>
  );
};

export default SocialMediaCard;