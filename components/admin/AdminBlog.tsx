
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { BlogPost } from '../../types';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Modal from '../common/Modal';

const emptyPost: Omit<BlogPost, 'id'> = { title: '', author: '', date: new Date().toISOString().split('T')[0], summary: '', content: '', image: '' };

const AdminBlog: React.FC = () => {
    const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost, uploadImage } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState<Omit<BlogPost, 'id'> | BlogPost>(emptyPost);
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const openModalForNew = () => {
        setCurrentPost(emptyPost);
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const openModalForEdit = (post: BlogPost) => {
        setCurrentPost(post);
        setIsEditing(true);
        setIsModalOpen(true);
    };
    
    const handleSave = () => {
        if (isEditing) {
            updateBlogPost(currentPost as BlogPost);
        } else {
            addBlogPost(currentPost);
        }
        setIsModalOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCurrentPost({ ...currentPost, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            const imageUrl = await uploadImage(file);
            if (imageUrl) {
                setCurrentPost({ ...currentPost, image: imageUrl });
            }
            setIsUploading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Blog Posts</h2>
                <button onClick={openModalForNew} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    <Plus size={18} className="mr-2" /> Add Post
                </button>
            </div>
            <div className="space-y-4">
                {blogPosts.map(post => (
                    <div key={post.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold">{post.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">By {post.author}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => openModalForEdit(post)} className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-full"><Edit size={16} /></button>
                            <button onClick={() => deleteBlogPost(post.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-full"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <Modal title={isEditing ? 'Edit Post' : 'Add Post'} onClose={() => setIsModalOpen(false)} onSave={handleSave}>
                    <div className="space-y-4">
                        <input name="title" value={currentPost.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                        <input name="author" value={currentPost.author} onChange={handleChange} placeholder="Author" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                        <textarea name="summary" value={currentPost.summary} onChange={handleChange} placeholder="Summary" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                        <textarea name="content" value={currentPost.content} onChange={handleChange} placeholder="Content (HTML allowed)" rows={5} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                         <div>
                           <label className="block text-sm font-medium mb-1">Post Image</label>
                           <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-300 dark:hover:file:bg-blue-900/30"/>
                           {isUploading && <p className="text-sm text-blue-500 mt-2">Uploading image...</p>}
                           {currentPost.image && <img src={currentPost.image} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-md" />}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AdminBlog;
