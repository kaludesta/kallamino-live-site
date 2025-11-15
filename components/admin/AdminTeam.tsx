
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { TeamMember } from '../../types';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Modal from '../common/Modal';

const emptyMember: Omit<TeamMember, 'id'> = { name: '', role: '', bio: '', image: '' };

const AdminTeam: React.FC = () => {
    const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember, uploadImage } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMember, setCurrentMember] = useState<Omit<TeamMember, 'id'> | TeamMember>(emptyMember);
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const openModalForNew = () => {
        setCurrentMember(emptyMember);
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const openModalForEdit = (member: TeamMember) => {
        setCurrentMember(member);
        setIsEditing(true);
        setIsModalOpen(true);
    };
    
    const handleSave = () => {
        if (isEditing) {
            updateTeamMember(currentMember as TeamMember);
        } else {
            addTeamMember(currentMember);
        }
        setIsModalOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCurrentMember({ ...currentMember, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            const imageUrl = await uploadImage(file);
            if (imageUrl) {
                setCurrentMember({ ...currentMember, image: imageUrl });
            }
            setIsUploading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Team Members</h2>
                <button onClick={openModalForNew} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    <Plus size={18} className="mr-2" /> Add Member
                </button>
            </div>
            <div className="space-y-4">
                {teamMembers.map(member => (
                    <div key={member.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold">{member.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => openModalForEdit(member)} className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-full"><Edit size={16} /></button>
                            <button onClick={() => deleteTeamMember(member.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-full"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <Modal title={isEditing ? 'Edit Member' : 'Add Member'} onClose={() => setIsModalOpen(false)} onSave={handleSave}>
                    <div className="space-y-4">
                        <input name="name" value={currentMember.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                        <input name="role" value={currentMember.role} onChange={handleChange} placeholder="Role" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                        <textarea name="bio" value={currentMember.bio} onChange={handleChange} placeholder="Bio" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                        <div>
                           <label className="block text-sm font-medium mb-1">Photo</label>
                           <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-300 dark:hover:file:bg-blue-900/30"/>
                           {isUploading && <p className="text-sm text-blue-500 mt-2">Uploading photo...</p>}
                           {currentMember.image && <img src={currentMember.image} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-full" />}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AdminTeam;
