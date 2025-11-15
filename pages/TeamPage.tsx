
import React from 'react';
import { useData } from '../context/DataContext';
import { TeamMember } from '../types';

const TeamMemberCard = ({ member }: { member: TeamMember }) => (
  <div className="text-center p-4">
    <div className="relative w-48 h-48 mx-auto mb-4">
      <img
        src={member.image}
        alt={member.name}
        className="rounded-full w-full h-full object-cover shadow-lg border-4 border-white dark:border-gray-700"
      />
      <div className="absolute inset-0 rounded-full border-2 border-[#00A9FF]/50 transform scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4">{member.name}</h3>
    <p className="text-[#007bff] font-semibold">{member.role}</p>
    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-xs mx-auto">{member.bio}</p>
  </div>
);

const TeamPage = () => {
  const { teamMembers } = useData();

  return (
    <div className="animate-fadeIn py-16 container mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Meet the Team</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          The driving force behind the Kallamino Blockchain Community.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {teamMembers.map((member) => (
          <div key={member.id} className="group flex justify-center">
            <TeamMemberCard member={member} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
