
import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';

const GalleryPage = () => {
  const { galleryImages } = useData();
  const [selectedAlbum, setSelectedAlbum] = useState('All');

  const albums = useMemo(() => {
    const albumSet = new Set(galleryImages.map(img => img.album));
    return ['All', ...Array.from(albumSet)];
  }, [galleryImages]);

  const filteredImages = useMemo(() => {
    if (selectedAlbum === 'All') {
      return galleryImages;
    }
    return galleryImages.filter(img => img.album === selectedAlbum);
  }, [galleryImages, selectedAlbum]);

  return (
    <div className="animate-fadeIn py-16 container mx-auto px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Event Gallery</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          A glimpse into our vibrant community activities and events.
        </p>
      </div>
      
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {albums.map(album => (
          <button
            key={album}
            onClick={() => setSelectedAlbum(album)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              selectedAlbum === album 
                ? 'bg-[#007bff] text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {album}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image, index) => (
          <div key={image.id} className="group overflow-hidden rounded-lg shadow-lg aspect-w-1 aspect-h-1" style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}>
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                <p className="text-white text-sm font-semibold">{image.alt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
