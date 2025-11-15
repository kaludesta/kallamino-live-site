import React from 'react';
import { NavLink } from 'react-router-dom';
import { Target, Eye, CheckCircle, Users } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center mb-4">
            <div className="p-3 bg-[#007bff]/20 text-[#00A9FF] rounded-full mr-4">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{children}</p>
    </div>
);


const AboutPage = () => {
  return (
    <div className="animate-fadeIn py-16 container mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">About Us</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          We are the Kallamino Blockchain Community, a student-led organization dedicated to exploring the vast potential of decentralized technologies.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
            <img src="https://picsum.photos/seed/about/600/400" alt="Club members collaborating" className="rounded-lg shadow-2xl"/>
        </div>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 text-[#00A9FF] mt-1"><Target size={24} /></div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300">
                To build a strong, educated community by providing accessible resources, fostering collaboration on innovative projects, and bridging the gap between academic learning and real-world application of blockchain technology.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 text-[#00A9FF] mt-1"><Eye size={24} /></div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We envision a future where our members are at the forefront of the Web3 revolution, equipped with the knowledge and skills to build, lead, and innovate in a decentralized world.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-10">Why Join Our Club?</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard icon={<CheckCircle size={24} />} title="Hands-On Learning">
                Move beyond theory with practical workshops on smart contract development, DApp creation, and more.
            </FeatureCard>
            <FeatureCard icon={<Users size={24} />} title="Community & Networking">
                Connect with like-minded peers, alumni, and industry professionals at our events and socials.
            </FeatureCard>
            <FeatureCard icon={<Target size={24} />} title="Skill Development">
                Gain in-demand technical and soft skills that will set you apart in your future career.
            </FeatureCard>
        </div>
      </div>
      
      <div className="text-center bg-blue-600/10 dark:bg-blue-900/20 py-16 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Dive In?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Become a part of our growing community and start your journey into the world of blockchain today.
          </p>
          <NavLink
            to="/membership"
            className="px-8 py-3 font-semibold text-white bg-[#007bff] rounded-md hover:bg-[#0056b3] transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Join Now
          </NavLink>
      </div>

    </div>
  );
};

export default AboutPage;