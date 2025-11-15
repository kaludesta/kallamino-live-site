import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Cloud, CloudOff, Image } from 'lucide-react';

const AdminSettings: React.FC = () => {
    const { changePassword, changeUsername, username } = useAuth();
    const { siteLogo, updateSiteLogo, resetSiteLogo, isCloudConnected, setConnectionDetails, getInitialJson, isImageHostingConnected, setImageHostingDetails } = useData();

    // Cloud Sync State
    const [apiKey, setApiKey] = useState(() => localStorage.getItem('apiKey') || '');
    const [binUrl, setBinUrl] = useState(() => localStorage.getItem('binUrl') || '');
    const [connectionMessage, setConnectionMessage] = useState<string | null>(null);
    
    // Image Hosting State
    const [cloudName, setCloudName] = useState(() => localStorage.getItem('cloudName') || '');
    const [uploadPreset, setUploadPreset] = useState(() => localStorage.getItem('uploadPreset') || '');
    const [imageHostingMessage, setImageHostingMessage] = useState<string | null>(null);

    // State for password change
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // State for username change
    const [currentPasswordForUname, setCurrentPasswordForUname] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [usernameMessage, setUsernameMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    
    // State for logo change
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [logoMessage, setLogoMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordMessage(null);

        if (newPassword !== confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'New passwords do not match.' });
            return;
        }
        if (newPassword.length < 6) {
            setPasswordMessage({ type: 'error', text: 'New password must be at least 6 characters long.' });
            return;
        }
        const success = changePassword(oldPassword, newPassword);
        if (success) {
            setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            setPasswordMessage({ type: 'error', text: 'Incorrect old password.' });
        }
    };
    
    const handleUsernameSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setUsernameMessage(null);
        if (!newUsername.trim()) {
            setUsernameMessage({ type: 'error', text: 'Username cannot be empty.' });
            return;
        }
        const success = changeUsername(currentPasswordForUname, newUsername);
        if (success) {
            setUsernameMessage({ type: 'success', text: 'Username changed successfully!' });
            setCurrentPasswordForUname('');
            setNewUsername('');
        } else {
            setUsernameMessage({ type: 'error', text: 'Incorrect password.' });
        }
    };
    
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setLogoMessage(null);
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                setLogoMessage({ type: 'error', text: 'File is too large. Max size is 2MB.'});
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogoSave = () => {
        if (logoPreview) {
            updateSiteLogo(logoPreview);
            setLogoPreview(null);
            setLogoMessage({ type: 'success', text: 'Logo updated successfully!'});
        }
    };

    const handleLogoReset = () => {
        resetSiteLogo();
        setLogoPreview(null);
        setLogoMessage({ type: 'success', text: 'Logo has been reset to default.'});
    };

    const handleConnectionSave = () => {
        if (apiKey.trim() && binUrl.trim()) {
            setConnectionDetails(apiKey, binUrl);
            setConnectionMessage("Settings saved! The page will now reload to connect to the database.");
        } else {
            setConnectionMessage("Please provide both an API Key and a Bin URL.");
        }
    };

    const handleImageHostingSave = () => {
        if (cloudName.trim() && uploadPreset.trim()) {
            setImageHostingDetails(cloudName, uploadPreset);
            setImageHostingMessage("Image hosting settings saved successfully!");
        } else {
            setImageHostingMessage("Please provide both Cloud Name and Upload Preset.");
        }
    };

    const copyInitialJson = () => {
        navigator.clipboard.writeText(getInitialJson());
        alert('Initial JSON data copied to clipboard!');
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <div className="space-y-8">
                {/* Cloud Sync Section */}
                <div className="p-6 bg-gray-100 dark:bg-gray-700/50 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold mb-2">Cloud Sync Settings (Text Data)</h3>
                     {isCloudConnected ? (
                        <div className="flex items-center gap-2 text-green-500">
                            <Cloud size={20} />
                            <p>Successfully connected to cloud database. All changes are live.</p>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center gap-2 text-yellow-500 mb-4">
                               <CloudOff size={20}/>
                               <p>Not connected to cloud sync. Data is only saved on this device.</p>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                To sync data across all devices, create a free account at <a href="https://jsonbin.io" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">jsonbin.io</a>, create a new JSON bin, and paste your credentials below.
                            </p>
                            <div className="mb-4">
                                <button onClick={copyInitialJson} className="text-sm bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600">
                                    Copy Initial Data for Bin
                                </button>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Click this to copy the site's starting data, then paste it when you create your new bin on JSONBin.io.</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="binUrl">JSONBin.io Bin URL</label>
                                    <input type="text" id="binUrl" value={binUrl} onChange={(e) => setBinUrl(e.target.value)} placeholder="e.g., https://api.jsonbin.io/v3/b/YOUR_BIN_ID" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="apiKey">JSONBin.io API Key (X-Master-Key)</label>
                                    <input type="password" id="apiKey" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Enter your secret API key" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                                </div>
                                <button onClick={handleConnectionSave} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                    Save Connection
                                </button>
                                {connectionMessage && <p className="text-sm mt-2 text-yellow-400">{connectionMessage}</p>}
                            </div>
                        </div>
                    )}
                </div>

                {/* Image Hosting Section */}
                <div className="p-6 bg-gray-100 dark:bg-gray-700/50 rounded-lg border-l-4 border-green-500">
                    <h3 className="text-lg font-semibold mb-2">Image Hosting Settings (Cloudinary)</h3>
                     {isImageHostingConnected ? (
                        <div className="flex items-center gap-2 text-green-500">
                            <Image size={20} />
                            <p>Image hosting is configured. All image uploads are live.</p>
                        </div>
                    ) : (
                         <div className="flex items-center gap-2 text-yellow-500 mb-4">
                           <Image size={20}/>
                           <p>Image hosting is not configured. Images will not be uploaded.</p>
                        </div>
                    )}
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        For professional image handling, create a free account at <a href="https://cloudinary.com/users/register/free" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Cloudinary</a>. Then find your Cloud Name and create an "Unsigned" Upload Preset.
                    </p>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="cloudName">Cloudinary Cloud Name</label>
                            <input type="text" id="cloudName" value={cloudName} onChange={(e) => setCloudName(e.target.value)} placeholder="Found on your Cloudinary dashboard" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="uploadPreset">Cloudinary Upload Preset</label>
                            <input type="text" id="uploadPreset" value={uploadPreset} onChange={(e) => setUploadPreset(e.target.value)} placeholder="Create an 'unsigned' preset in Settings > Upload" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                        </div>
                        <button onClick={handleImageHostingSave} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                            Save Image Settings
                        </button>
                        {imageHostingMessage && <p className="text-sm mt-2 text-green-400">{imageHostingMessage}</p>}
                    </div>
                </div>


                {/* Site Logo Form */}
                <div className="p-6 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Update Site Logo</h3>
                    <div className="flex items-center gap-6">
                        <div>
                            <p className="block text-sm font-medium mb-2">Current Logo</p>
                            {siteLogo ? (
                                <img src={siteLogo} alt="Current Logo" className="h-20 w-20 object-contain bg-white dark:bg-gray-800 p-1 rounded-md shadow-sm" />
                            ) : (
                                <div className="h-20 w-20 flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-md shadow-sm">
                                    <p className="text-xs text-gray-500">Default</p>
                                </div>
                            )}
                        </div>
                        {logoPreview && (
                            <div>
                                <p className="block text-sm font-medium mb-2">New Logo Preview</p>
                                <img src={logoPreview} alt="New Logo Preview" className="h-20 w-20 object-contain bg-white dark:bg-gray-800 p-1 rounded-md shadow-sm" />
                            </div>
                        )}
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="logoUpload">Upload New Logo</label>
                        <input type="file" id="logoUpload" accept="image/png, image/jpeg, image/svg+xml, image/webp" onChange={handleLogoUpload} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-300 dark:hover:file:bg-blue-900/30"/>
                    </div>
                     {logoMessage && (
                        <p className={`text-sm mt-2 ${logoMessage.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                            {logoMessage.text}
                        </p>
                    )}
                    <div className="mt-4 flex gap-4">
                        <button onClick={handleLogoSave} disabled={!logoPreview} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                            Save Logo
                        </button>
                        <button onClick={handleLogoReset} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                            Reset to Default
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Change Username Form */}
                    <form onSubmit={handleUsernameSubmit} className="space-y-4 p-6 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                        <h3 className="text-lg font-semibold">Change Username</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Current Username: <strong>{username}</strong></p>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="newUsername">New Username</label>
                            <input type="text" id="newUsername" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} required className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="currentPasswordForUname">Current Password</label>
                            <input type="password" id="currentPasswordForUname" value={currentPasswordForUname} onChange={(e) => setCurrentPasswordForUname(e.target.value)} required className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" placeholder="Enter password to confirm" />
                        </div>
                        {usernameMessage && (
                            <p className={`text-sm ${usernameMessage.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                {usernameMessage.text}
                            </p>
                        )}
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            Update Username
                        </button>
                    </form>

                    {/* Change Password Form */}
                    <form onSubmit={handlePasswordSubmit} className="space-y-4 p-6 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                        <h3 className="text-lg font-semibold">Change Password</h3>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="oldPassword">Old Password</label>
                            <input type="password" id="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="newPassword">New Password</label>
                            <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">Confirm New Password</label>
                            <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600" />
                        </div>
                        {passwordMessage && (
                            <p className={`text-sm ${passwordMessage.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                {passwordMessage.text}
                            </p>
                        )}
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;