
import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, User, Calendar } from 'lucide-react';
import NotFoundPage from './NotFoundPage';

const BlogDetail = () => {
  const { id } = useParams();
  const { blogPosts } = useData();

  const post = blogPosts.find(p => p.id === Number(id));

  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <div className="animate-fadeIn py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <NavLink to="/blog" className="inline-flex items-center text-[#007bff] hover:text-[#0056b3] mb-8">
          <ArrowLeft size={20} className="mr-2" />
          Back to Blog
        </NavLink>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">{post.title}</h1>
        <div className="flex items-center text-md text-gray-500 dark:text-gray-400 mb-8 space-x-6">
          <span className="flex items-center"><User size={16} className="mr-2" /> {post.author}</span>
          <span className="flex items-center"><Calendar size={16} className="mr-2" /> {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        
        <img src={post.image} alt={post.title} className="w-full h-auto max-h-96 object-cover rounded-lg shadow-lg mb-8" />

        <article 
          className="prose prose-lg dark:prose-invert max-w-none prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-headings:text-gray-800 dark:prose-headings:text-white"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
};

export default BlogDetail;
