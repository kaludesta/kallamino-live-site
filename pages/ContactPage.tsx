import React, { useState } from 'react';
import { Mail, Send, MapPin } from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Contact form submitted:", formData);
        setSubmitted(true);
    };

    return (
        <div className="animate-fadeIn py-16 container mx-auto px-6">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Get In Touch</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    Have questions or want to collaborate? We'd love to hear from you.
                </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 rounded-lg">
                        <div className="p-3 bg-[#007bff]/20 text-[#00A9FF] rounded-full"><Mail size={24}/></div>
                        <div>
                            <h3 className="text-xl font-bold">Email Us</h3>
                            <p className="text-gray-600 dark:text-gray-300">Send your inquiries to our team.</p>
                            <a href="mailto:kalebdesta38@gmail.com" className="text-[#007bff] hover:underline">kalebdesta38@gmail.com</a>
                        </div>
                    </div>
                     <div className="flex items-start gap-4 p-4 rounded-lg">
                        <div className="p-3 bg-[#007bff]/20 text-[#00A9FF] rounded-full"><Send size={24}/></div>
                        <div>
                            <h3 className="text-xl font-bold">Join our Telegram</h3>
                            <p className="text-gray-600 dark:text-gray-300">Connect with the community in real-time.</p>
                            <a href="https://t.me/Kallamino_Blockchain" target="_blank" rel="noopener noreferrer" className="text-[#007bff] hover:underline">@Kallamino_Blockchain</a>
                        </div>
                    </div>
                     <div className="flex items-start gap-4 p-4 rounded-lg">
                        <div className="p-3 bg-[#007bff]/20 text-[#00A9FF] rounded-full"><MapPin size={24}/></div>
                        <div>
                            <h3 className="text-xl font-bold">Our Location</h3>
                            <p className="text-gray-600 dark:text-gray-300">Kallamino Special Highschool, Mekelle, Tigray, Ethiopia</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Meetings every Tuesday at 4 PM</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800/50 p-8 rounded-lg shadow-xl">
                    {submitted ? (
                        <div className="text-center h-full flex flex-col justify-center">
                            <h2 className="text-2xl font-bold text-green-500 mb-4">Message Sent!</h2>
                            <p className="text-gray-600 dark:text-gray-300">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                <input type="text" name="name" id="name" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#007bff] focus:border-[#007bff]" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                <input type="email" name="email" id="email" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#007bff] focus:border-[#007bff]" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                <textarea name="message" id="message" rows={5} required onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#007bff] focus:border-[#007bff]"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#007bff] hover:bg-[#0056b3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007bff]">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactPage;