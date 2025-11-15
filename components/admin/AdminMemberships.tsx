
import React from 'react';
import { useData } from '../../context/DataContext';
import { Trash2 } from 'lucide-react';

const AdminMemberships: React.FC = () => {
    const { submissions, deleteSubmission } = useData();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Memberships</h2>
            </div>
             {submissions.length > 0 ? (
                <div className="space-y-4">
                    {submissions.map(sub => (
                        <div key={sub.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md flex justify-between items-start">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-sm w-full">
                                <div>
                                    <strong className="block text-gray-800 dark:text-gray-200">Name:</strong>
                                    <span>{sub.name}</span>
                                </div>
                                <div>
                                    <strong className="block text-gray-800 dark:text-gray-200">Grade/Dept:</strong>
                                    <span>{sub.grade}</span>
                                </div>
                                <div>
                                    <strong className="block text-gray-800 dark:text-gray-200">Telegram:</strong>
                                    <span>@{sub.telegram}</span>
                                </div>
                                <div>
                                    <strong className="block text-gray-800 dark:text-gray-200">Submitted:</strong>
                                    <span>{new Date(sub.date).toLocaleString()}</span>
                                </div>
                                <div className="col-span-full">
                                    <strong className="block text-gray-800 dark:text-gray-200">Skills:</strong>
                                    <p className="whitespace-pre-wrap">{sub.skills || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="flex-shrink-0 ml-4">
                                <button onClick={() => deleteSubmission(sub.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-full"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No membership submissions yet.</p>
            )}
        </div>
    );
};

export default AdminMemberships;