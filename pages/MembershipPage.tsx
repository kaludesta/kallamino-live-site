
import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const MembershipPage = () => {
    const { addSubmission } = useData();
    const [formData, setFormData] = useState({
        name: '',
        grade: '',
        skills: '',
        telegram: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addSubmission(formData);
        setSubmitted(true);
        setFormData({ name: '', grade: '', skills: '', telegram: '' });
    };

    return (
        <div className="animate-fadeIn py-16 container mx-auto px-6">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Join Our Community</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    Become a member to get access to exclusive workshops, networking events, and project collaborations.
                </p>
            </div>

            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800/50 p-8 rounded-lg shadow-xl">
                {submitted ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-green-500 mb-4">Thank You for Registering!</h2>
                        <p className="text-gray-600 dark:text-gray-300">We've received your application and will be in touch soon. Welcome to the community!</p>
                         <button 
                            onClick={() => setSubmitted(false)}
                            className="mt-6 px-6 py-2 font-semibold text-white bg-[#007bff] rounded-md hover:bg-[#0056b3] transition-colors"
                        >
                            Register Another Member
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#007bff] focus:border-[#007bff]" />
                        </div>
                        <div>
                            <label htmlFor="grade" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Grade / Department</label>
                            <input type="text" name="grade" id="grade" required value={formData.grade} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#007bff] focus:border-[#007bff]" />
                        </div>
                         <div>
                            <label htmlFor="skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Skills & Interests</label>
                            <textarea name="skills" id="skills" rows={3} value={formData.skills} onChange={handleChange} placeholder="e.g., Python, UI/UX Design, Public Speaking" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#007bff] focus:border-[#007bff]"></textarea>
                        </div>
                        <div>
                            <label htmlFor="telegram" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Telegram Username</label>
                            <input type="text" name="telegram" id="telegram" required value={formData.telegram} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#007bff] focus:border-[#007bff]" />
                        </div>
                        <div>
                            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#007bff] hover:bg-[#0056b3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007bff] transition-all duration-300 transform hover:scale-105">
                                Submit Application
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default MembershipPage;