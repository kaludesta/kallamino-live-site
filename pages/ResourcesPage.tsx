
import React from 'react';
import { useData } from '../context/DataContext';
import { Resource } from '../types';
import { FileText, Presentation, Film, Link as LinkIcon } from 'lucide-react';

const ResourceIcon = ({ type }: { type: Resource['type'] }) => {
  switch (type) {
    case 'PDF':
      return <FileText className="text-red-500" size={24} />;
    case 'Slides':
      return <Presentation className="text-yellow-500" size={24} />;
    case 'Tutorial':
      return <Film className="text-blue-500" size={24} />;
    case 'Link':
      return <LinkIcon className="text-green-500" size={24} />;
    default:
      return null;
  }
};

// FIX: Changed component definition to use React.FC to correctly handle `key` prop.
const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => (
  <a
    href={resource.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block p-6 bg-white dark:bg-gray-800/50 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
  >
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <ResourceIcon type={resource.type} />
      </div>
      <div>
        <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{resource.title}</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{resource.description}</p>
        <span className="mt-4 inline-block text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">{resource.type}</span>
      </div>
    </div>
  </a>
);


const ResourcesPage = () => {
  const { resources } = useData();

  return (
    <div className="animate-fadeIn py-16 container mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Learning Resources</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Curated content to accelerate your blockchain journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;
