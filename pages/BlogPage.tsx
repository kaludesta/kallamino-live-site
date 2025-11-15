
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { BlogPost } from '../types';
import { ArrowRight, User, Calendar } from 'lucide-react';

// FIX: Changed component definition to use React.FC to correctly handle `key` prop.
const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow-lg overflow-hidden flex flex-col group">
    <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{post.title}</h3>
      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2 space-x-4">
        <span className="flex items-center"><User size={14} className="mr-1" /> {post.author}</span>
        <span className="flex items-center"><Calendar size={14} className="mr-1" /> {new Date(post.date).toLocaleDateString()}</span>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow line-clamp-3">{post.summary}</p>
      <NavLink to={`/blog/${post.id}`} className="self-start mt-auto inline-flex items-center font-semibold text-[#007bff] hover:text-[#0056b3] group-hover:translate-x-1 transition-transform duration-300">
        Read More <ArrowRight size={20} className="ml-2" />
      </NavLink>
    </div>
  </div>
);

const BlogPage = () => {
  const { blogPosts } = useData();

  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="animate-fadeIn py-16 container mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Club Blog & News</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Stay updated with our latest articles, announcements, and event recaps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPosts.map(post => <BlogPostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default BlogPage;
