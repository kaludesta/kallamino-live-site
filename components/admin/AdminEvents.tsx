
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Event } from '../../types';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Modal from '../common/Modal';

const emptyEvent: Omit<Event, 'id'> = { title: '', date: '', time: '', location: '', description: '', registrationLink: '#', image: '' };

const AdminEvents: React.FC = () => {
    const { events, addEvent, updateEvent, deleteEvent, uploadImage } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState<Omit<Event, 'id'> | Event>(emptyEvent);
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const openModalForNew = () => {
        setCurrentEvent(emptyEvent);
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const openModalForEdit = (event: Event) => {
        setCurrentEvent(event);
        setIsEditing(true);
        setIsModalOpen(true);
    };
    
    const handleSave = () => {
        if (isEditing) {
            updateEvent(currentEvent as Event);
        } else {
            addEvent(currentEvent);
        }
        setIsModalOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCurrentEvent({ ...currentEvent, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            const imageUrl = await uploadImage(file);
            if (imageUrl) {
                setCurrentEvent({ ...currentEvent, image: imageUrl });
            }
            setIsUploading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Events</h2>
                <button onClick={openModalForNew} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    <Plus size={18} className="mr-2" /> Add Event
                </button>
            </div>
            <div className="space-y-4">
                {events.map(event => (
                    <div key={event.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold">{event.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(event.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => openModalForEdit(event)} className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-full"><Edit size={16} /></button>
                            <button onClick={() => deleteEvent(event.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-full"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <Modal title={isEditing ? 'Edit Event' : 'Add Event'} onClose={() => setIsModalOpen(false)} onSave={handleSave}>
                    <div className="space-y-4">
                        <input name="title" value={currentEvent.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                        <input name="date" type="date" value={currentEvent.date} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                        <input name="time" value={currentEvent.time} onChange={handleChange} placeholder="Time (e.g., 6:00 PM)" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                        <input name="location" value={currentEvent.location} onChange={handleChange} placeholder="Location" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                        <textarea name="description" value={currentEvent.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                        <div>
                           <label className="block text-sm font-medium mb-1">Event Image</label>
                           <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-300 dark:hover:file:bg-blue-900/30"/>
                           {isUploading && <p className="text-sm text-blue-500 mt-2">Uploading image...</p>}
                           {currentEvent.image && <img src={currentEvent.image} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-md" />}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AdminEvents;
