
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, FileText, Users, BookOpen, UserCheck, Building2, Settings, Image as ImageIcon } from 'lucide-react';
import AdminEvents from '../components/admin/AdminEvents';
import AdminBlog from '../components/admin/AdminBlog';
import AdminTeam from '../components/admin/AdminTeam';
import AdminResources from '../components/admin/AdminResources';
import AdminMemberships from '../components/admin/AdminMemberships';
import AdminPartners from '../components/admin/AdminPartners';
import AdminSettings from '../components/admin/AdminSettings';
import AdminGallery from '../components/admin/AdminGallery';

type AdminTab = 'events' | 'blog' | 'team' | 'resources' | 'memberships' | 'partners' | 'gallery' | 'settings';

const AdminPage = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('events');

  const renderContent = () => {
    switch (activeTab) {
      case 'events': return <AdminEvents />;
      case 'blog': return <AdminBlog />;
      case 'team': return <AdminTeam />;
      case 'resources': return <AdminResources />;
      case 'memberships': return <AdminMemberships />;
      case 'partners': return <AdminPartners />;
      case 'gallery': return <AdminGallery />;
      case 'settings': return <AdminSettings />;
      default: return null;
    }
  };

  const tabs = [
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'blog', name: 'Blog Posts', icon: FileText },
    { id: 'team', name: 'Team', icon: Users },
    { id: 'resources', name: 'Resources', icon: BookOpen },
    { id: 'memberships', name: 'Memberships', icon: UserCheck },
    { id: 'partners', name: 'Partners', icon: Building2 },
    { id: 'gallery', name: 'Gallery', icon: ImageIcon },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="animate-fadeIn py-12 container mx-auto px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-1/4">
          <nav className="flex flex-row md:flex-col gap-2">
            {tabs.map(tab => (
                 <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as AdminTab)}
                    className={`flex items-center w-full text-left p-3 rounded-md transition-colors text-sm font-medium ${
                    activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                    <tab.icon size={18} className="mr-3" />
                    {tab.name}
                </button>
            ))}
          </nav>
        </aside>
        <main className="flex-1 bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow-md">
            {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
