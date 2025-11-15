
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Partner } from '../../types';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Modal from '../common/Modal';

const emptyPartner: Omit<Partner, 'id'> = { name: '', description: '', logo: '', website: '' };

const AdminPartners: React.FC = () => {
    const { partners, addPartner, updatePartner, deletePartner, uploadImage } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPartner, setCurrentPartner] = useState<Omit<Partner, 'id'> | Partner>(emptyPartner);
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const openModalForNew = () => {
        setCurrentPartner(emptyPartner);
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const openModalForEdit = (partner: Partner) => {
        setCurrentPartner(partner);
        setIsEditing(true);
        setIsModalOpen(true);
    };
    
    const handleSave = () => {
        if (isEditing) {
            updatePartner(currentPartner as Partner);
        } else {
            addPartner(currentPartner);
        }
        setIsModalOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCurrentPartner({ ...currentPartner, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            const imageUrl = await uploadImage(file);
            if (imageUrl) {
                setCurrentPartner({ ...currentPartner, logo: imageUrl });
            }
            setIsUploading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Partners</h2>
                <button onClick={openModalForNew} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    <Plus size={18} className="mr-2" /> Add Partner
                </button>
            </div>
            <div className="space-y-4">
                {partners.map(partner => (
                    <div key={partner.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <img src={partner.logo} alt={partner.name} className="w-12 h-12 object-contain rounded-full bg-white"/>
                            <div>
                                <h3 className="font-semibold">{partner.name}</h3>
                                <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">{partner.website}</a>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => openModalForEdit(partner)} className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-full"><Edit size={16} /></button>
                            <button onClick={() => deletePartner(partner.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-full"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <Modal title={isEditing ? 'Edit Partner' : 'Add Partner'} onClose={() => setIsModalOpen(false)} onSave={handleSave}>
                    <div className="space-y-4">
                        <input name="name" value={currentPartner.name} onChange={handleChange} placeholder="Partner Name" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                        <textarea name="description" value={currentPartner.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                        <input name="website" value={currentPartner.website} onChange={handleChange} placeholder="Website URL" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                        <div>
                           <label className="block text-sm font-medium mb-1">Partner Logo</label>
                           <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-300 dark:hover:file:bg-blue-900/30"/>
                           {isUploading && <p className="text-sm text-blue-500 mt-2">Uploading logo...</p>}
                           {currentPartner.logo && <img src={currentPartner.logo} alt="Preview" className="mt-4 w-32 h-32 object-contain rounded-md bg-gray-100 dark:bg-gray-700 p-2" />}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AdminPartners;
