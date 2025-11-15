
import React, { createContext, useState, ReactNode, useContext, useEffect, useCallback } from 'react';
import { Event, TeamMember, BlogPost, Resource, GalleryImage, MembershipSubmission, Partner } from '../types';
import { initialEvents, initialTeamMembers, initialBlogPosts, initialResources, initialGalleryImages, initialSubmissions, initialPartners } from '../data/mockData';

const initialData = {
    events: initialEvents,
    teamMembers: initialTeamMembers,
    blogPosts: initialBlogPosts,
    resources: initialResources,
    galleryImages: initialGalleryImages,
    submissions: initialSubmissions,
    partners: initialPartners,
    siteLogo: null
};

interface AppData {
  events: Event[];
  teamMembers: TeamMember[];
  blogPosts: BlogPost[];
  resources: Resource[];
  galleryImages: GalleryImage[];
  submissions: MembershipSubmission[];
  partners: Partner[];
  siteLogo: string | null;
}

interface DataContextType extends AppData {
  isCloudConnected: boolean;
  isImageHostingConnected: boolean;
  setConnectionDetails: (apiKey: string, binUrl: string) => void;
  setImageHostingDetails: (cloudName: string, uploadPreset: string) => void;
  uploadImage: (file: File) => Promise<string | null>;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (id: number) => void;
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: number) => void;
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (member: TeamMember) => void;
  deleteTeamMember: (id: number) => void;
  addResource: (resource: Omit<Resource, 'id'>) => void;
  updateResource: (resource: Resource) => void;
  deleteResource: (id: number) => void;
  addSubmission: (submission: Omit<MembershipSubmission, 'id' | 'date'>) => void;
  deleteSubmission: (id: number) => void;
  addPartner: (partner: Omit<Partner, 'id'>) => void;
  updatePartner: (partner: Partner) => void;
  deletePartner: (id: number) => void;
  addGalleryImage: (image: Omit<GalleryImage, 'id'>) => void;
  deleteGalleryImage: (id: number) => void;
  updateSiteLogo: (logo: string) => Promise<void>;
  resetSiteLogo: () => void;
  getInitialJson: () => string;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  
  // Cloud Sync State
  const [apiKey, setApiKey] = useState<string | null>(() => localStorage.getItem('apiKey'));
  const [binUrl, setBinUrl] = useState<string | null>(() => localStorage.getItem('binUrl'));
  const isCloudConnected = !!(apiKey && binUrl);

  // Image Hosting State
  const [cloudName, setCloudName] = useState<string | null>(() => localStorage.getItem('cloudName'));
  const [uploadPreset, setUploadPreset] = useState<string | null>(() => localStorage.getItem('uploadPreset'));
  const isImageHostingConnected = !!(cloudName && uploadPreset);

  const getInitialJson = () => JSON.stringify(initialData, null, 2);

  const setConnectionDetails = (newApiKey: string, newBinUrl: string) => {
    localStorage.setItem('apiKey', newApiKey);
    localStorage.setItem('binUrl', newBinUrl);
    setApiKey(newApiKey);
    setBinUrl(newBinUrl);
    window.location.reload();
  };
  
  const setImageHostingDetails = (newCloudName: string, newUploadPreset: string) => {
      localStorage.setItem('cloudName', newCloudName);
      localStorage.setItem('uploadPreset', newUploadPreset);
      setCloudName(newCloudName);
      setUploadPreset(newUploadPreset);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!isImageHostingConnected) {
        alert("Image Hosting is not configured. Please set it up in Admin > Settings.");
        return null;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset!);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        if (result.secure_url) {
            return result.secure_url;
        } else {
            throw new Error(result.error?.message || "Image upload failed.");
        }
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        alert(`Error uploading image: ${error}`);
        return null;
    }
  };


  const saveDataToCloud = useCallback(async (updatedData: AppData) => {
    if (!isCloudConnected) return;

    try {
      await fetch(binUrl!, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': apiKey!,
          'X-Bin-Versioning': 'false'
        },
        body: JSON.stringify(updatedData)
      });
    } catch (error) {
      console.error("Failed to save data to cloud:", error);
      alert("Error: Could not sync data to the cloud. Please check your connection and credentials.");
    }
  }, [apiKey, binUrl, isCloudConnected]);

  useEffect(() => {
    const fetchData = async () => {
      if (isCloudConnected) {
        try {
          const response = await fetch(binUrl!, {
            headers: { 'X-Master-Key': apiKey! }
          });
          if (!response.ok) throw new Error(`Failed to fetch data, status: ${response.status}`);
          const cloudData = await response.json();
          setData(cloudData.record || cloudData); 
        } catch (error) {
          console.error("Failed to fetch cloud data, falling back to initial data.", error);
          alert("Could not connect to the cloud database. Please check your Cloud Sync settings. The site is running with local data for now.");
          setData(initialData);
        }
      } else {
        setData(initialData);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [apiKey, binUrl, isCloudConnected]);

  const updateAndSync = (updateFn: (prevData: AppData) => AppData) => {
    const updatedData = updateFn(data);
    setData(updatedData);
    saveDataToCloud(updatedData);
  };

  // CRUD functions
  const addEvent = (event: Omit<Event, 'id'>) => updateAndSync(d => ({ ...d, events: [{ ...event, id: Date.now() }, ...d.events] }));
  const updateEvent = (updatedEvent: Event) => updateAndSync(d => ({ ...d, events: d.events.map(e => e.id === updatedEvent.id ? updatedEvent : e) }));
  const deleteEvent = (id: number) => updateAndSync(d => ({ ...d, events: d.events.filter(e => e.id !== id) }));
  
  const addBlogPost = (post: Omit<BlogPost, 'id'>) => updateAndSync(d => ({ ...d, blogPosts: [{ ...post, id: Date.now() }, ...d.blogPosts] }));
  const updateBlogPost = (updatedPost: BlogPost) => updateAndSync(d => ({ ...d, blogPosts: d.blogPosts.map(p => p.id === updatedPost.id ? updatedPost : p) }));
  const deleteBlogPost = (id: number) => updateAndSync(d => ({ ...d, blogPosts: d.blogPosts.filter(p => p.id !== id) }));
  
  const addTeamMember = (member: Omit<TeamMember, 'id'>) => updateAndSync(d => ({ ...d, teamMembers: [...d.teamMembers, { ...member, id: Date.now() }] }));
  const updateTeamMember = (updatedMember: TeamMember) => updateAndSync(d => ({ ...d, teamMembers: d.teamMembers.map(m => m.id === updatedMember.id ? updatedMember : m) }));
  const deleteTeamMember = (id: number) => updateAndSync(d => ({ ...d, teamMembers: d.teamMembers.filter(m => m.id !== id) }));

  const addResource = (resource: Omit<Resource, 'id'>) => updateAndSync(d => ({ ...d, resources: [{ ...resource, id: Date.now() }, ...d.resources] }));
  const updateResource = (updatedResource: Resource) => updateAndSync(d => ({ ...d, resources: d.resources.map(r => r.id === updatedResource.id ? updatedResource : r) }));
  const deleteResource = (id: number) => updateAndSync(d => ({ ...d, resources: d.resources.filter(r => r.id !== id) }));

  const addSubmission = (submission: Omit<MembershipSubmission, 'id' | 'date'>) => updateAndSync(d => ({ ...d, submissions: [{ ...submission, id: Date.now(), date: new Date().toISOString() }, ...d.submissions] }));
  const deleteSubmission = (id: number) => updateAndSync(d => ({ ...d, submissions: d.submissions.filter(s => s.id !== id) }));

  const addPartner = (partner: Omit<Partner, 'id'>) => updateAndSync(d => ({ ...d, partners: [{ ...partner, id: Date.now() }, ...d.partners] }));
  const updatePartner = (updatedPartner: Partner) => updateAndSync(d => ({ ...d, partners: d.partners.map(p => p.id === updatedPartner.id ? updatedPartner : p) }));
  const deletePartner = (id: number) => updateAndSync(d => ({ ...d, partners: d.partners.filter(p => p.id !== id) }));
  
  const addGalleryImage = (image: Omit<GalleryImage, 'id'>) => updateAndSync(d => ({ ...d, galleryImages: [{ ...image, id: Date.now() }, ...d.galleryImages] }));
  const deleteGalleryImage = (id: number) => updateAndSync(d => ({ ...d, galleryImages: d.galleryImages.filter(img => img.id !== id) }));

  const updateSiteLogo = async (logoDataUrl: string) => {
     // This is a special case. Since the logo is a small, single image,
     // we will continue to store it as a base64 Data URL in the JSON
     // for simplicity and to avoid an extra network request on every page load.
     // Professional image hosting is more critical for the many, larger images in the gallery, blog, etc.
     updateAndSync(d => ({ ...d, siteLogo: logoDataUrl }));
  };
  const resetSiteLogo = () => updateAndSync(d => ({ ...d, siteLogo: null }));


  if (isLoading) {
      return <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#0A0F1A] text-gray-800 dark:text-gray-200">Loading site data...</div>;
  }

  return (
    <DataContext.Provider value={{
      ...data,
      isCloudConnected,
      isImageHostingConnected,
      setConnectionDetails,
      setImageHostingDetails,
      uploadImage,
      addEvent, updateEvent, deleteEvent,
      addBlogPost, updateBlogPost, deleteBlogPost,
      addTeamMember, updateTeamMember, deleteTeamMember,
      addResource, updateResource, deleteResource,
      addSubmission, deleteSubmission,
      addPartner, updatePartner, deletePartner,
      addGalleryImage, deleteGalleryImage,
      updateSiteLogo, resetSiteLogo,
      getInitialJson
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
