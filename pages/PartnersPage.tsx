
import React from 'react';
import { Building2, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Partner } from '../types';

const PartnerCard: React.FC<{ partner: Partner }> = ({ partner }) => (
    <div className="bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
        <img src={partner.logo} alt={`${partner.name} logo`} className="w-24 h-24 object-contain mb-4 rounded-full bg-white p-2" />
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{partner.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 my-2 flex-grow">{partner.description}</p>
        <a 
            href={partner.website} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center mt-4 text-sm font-semibold text-[#007bff] hover:text-[#0056b3]"
        >
            Visit Website <ExternalLink size={16} className="ml-2" />
        </a>
    </div>
);

const PartnersPage = () => {
    const { partners } = useData();

    return (
        <div className="animate-fadeIn py-16 container mx-auto px-6">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Partners & Collaborations</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    We believe in the power of collaboration to drive innovation and create opportunities.
                </p>
            </div>

            {partners.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {partners.map(partner => <PartnerCard key={partner.id} partner={partner} />)}
                </div>
            ) : (
                <div className="max-w-4xl mx-auto text-center bg-gray-100 dark:bg-gray-800/50 p-12 rounded-lg">
                    <div className="w-16 h-16 bg-[#007bff]/20 text-[#00A9FF] rounded-full mx-auto flex items-center justify-center mb-6">
                        <Building2 size={32} />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Our Future Partners</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        We are actively seeking collaborations with tech companies, educational institutions, and other student organizations. If you're interested in partnering with us, please get in touch!
                    </p>
                    <a href="mailto:partners@kallamino.org" className="inline-block px-6 py-2.5 font-semibold text-white bg-[#007bff] rounded-md hover:bg-[#0056b3] transition-colors">
                        Contact Us
                    </a>
                </div>
            )}
        </div>
    );
};

export default PartnersPage;
