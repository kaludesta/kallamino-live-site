import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Resource } from '../../types';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Modal from '../common/Modal';

const emptyResource: Omit<Resource, 'id'> = { title: '', type: 'Link', description: '', url: '' };

const AdminResources: React.FC = () => {
    const { resources, addResource, updateResource, deleteResource, uploadImage } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentResource, setCurrentResource] = useState<Omit<Resource, 'id'> | Resource>(emptyResource);
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const openModalForNew = () => {
        setCurrentResource(emptyResource);
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const openModalForEdit = (resource: Resource) => {
        setCurrentResource(resource);
        setIsEditing(true);
        setIsModalOpen(true);
    };
    
    const handleSave = () => {
        if (isEditing) {
            updateResource(currentResource as Resource);
        } else {
            addResource(currentResource);
        }
        setIsModalOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setCurrentResource({ ...currentResource, [e.target.name]: e.target.value });
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            const fileUrl = await uploadImage(file);
            if (fileUrl) {
                setCurrentResource({ ...currentResource, url: fileUrl });
            }
            setIsUploading(false);
        }
    };


    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Resources</h2>
                <button onClick={openModalForNew} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    <Plus size={18} className="mr-2" /> Add Resource
                </button>
            </div>
            <div className="space-y-4">
                {resources.map(resource => (
                    <div key={resource.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold">{resource.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{resource.type}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => openModalForEdit(resource)} className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-full"><Edit size={16} /></button>
                            <button onClick={() => deleteResource(resource.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-full"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <Modal title={isEditing ? 'Edit Resource' : 'Add Resource'} onClose={() => setIsModalOpen(false)} onSave={handleSave}>
                    <div className="space-y-4">
                        <input name="title" value={currentResource.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                        <select name="type" value={currentResource.type} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600">
                            <option value="PDF">PDF</option>
                            <option value="Slides">Slides</option>
                            <option value="Tutorial">Tutorial</option>
                            <option value="Link">Link</option>
                        </select>
                        <textarea name="description" value={currentResource.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                        <div>
                           <label className="block text-sm font-medium mb-1">Resource URL or File</label>
                            <input name="url" value={currentResource.url} onChange={handleChange} placeholder="Paste external URL or upload a file" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 mb-2" />
                           <input type="file" onChange={handleFileUpload} disabled={isUploading} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-300 dark:hover:file:bg-blue-900/30"/>
                           {isUploading && <p className="text-sm text-blue-500 mt-2">Uploading file...</p>}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AdminResources;