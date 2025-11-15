
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { GalleryImage } from '../../types';
import { Plus, Trash2 } from 'lucide-react';
import Modal from '../common/Modal';

const emptyImage: Omit<GalleryImage, 'id'> = { src: '', alt: '', album: '' };

const AdminGallery: React.FC = () => {
    const { galleryImages, addGalleryImage, deleteGalleryImage, uploadImage } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState<Omit<GalleryImage, 'id'>>(emptyImage);
    const [isUploading, setIsUploading] = useState(false);

    const openModalForNew = () => {
        setCurrentImage(emptyImage);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (currentImage.src && currentImage.alt && currentImage.album) {
            addGalleryImage(currentImage);
            setIsModalOpen(false);
        } else {
            alert('Please fill out all fields.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentImage({ ...currentImage, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            const imageUrl = await uploadImage(file);
            if (imageUrl) {
                setCurrentImage({ ...currentImage, src: imageUrl });
            }
            setIsUploading(false);
        }
    };


    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Gallery</h2>
                <button onClick={openModalForNew} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    <Plus size={18} className="mr-2" /> Add Image
                </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {galleryImages.map(image => (
                    <div key={image.id} className="relative group">
                        <img src={image.src} alt={image.alt} className="w-full h-32 object-cover rounded-md" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button onClick={() => deleteGalleryImage(image.id)} className="p-2 text-white bg-red-600 rounded-full hover:bg-red-700">
                                <Trash2 size={16} />
                            </button>
                        </div>
                         <p className="text-xs text-center mt-1 truncate" title={image.alt}>{image.alt}</p>
                         <p className="text-xs text-center text-gray-500" title={image.album}>{image.album}</p>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <Modal title="Add New Image" onClose={() => setIsModalOpen(false)} onSave={handleSave}>
                    <div className="space-y-4">
                        <div>
                           <label className="block text-sm font-medium mb-1">Image File</label>
                           <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-300 dark:hover:file:bg-blue-900/30"/>
                           {isUploading && <p className="text-sm text-blue-500 mt-2">Uploading image...</p>}
                           {currentImage.src && <img src={currentImage.src} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-md" />}
                        </div>
                        <input name="alt" value={currentImage.alt} onChange={handleChange} placeholder="Alt Text (Description)" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                        <input name="album" value={currentImage.album} onChange={handleChange} placeholder="Album Name" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AdminGallery;
