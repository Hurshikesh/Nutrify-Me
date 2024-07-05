'use client'
import { useRouter } from 'next/navigation';
import {CheckCircleIcon,  ScaleIcon, SearchIcon, HeartIcon } from '@heroicons/react/outline';

const Dashboard = () => {
  const router = useRouter();

  const options = [
    {
      title: 'Check Harmfulness of a Product',
      description: 'Analyze a product to determine its harmful ingredients.',
      icon: CheckCircleIcon,
      route: '/Search',
    },
    {
      title: 'Compare Two Products',
      description: 'Compare the nutritional and harmful components of two products.',
      icon: ScaleIcon,
      route: '/Compare',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div>
          <h1 className="text-center text-2xl text-gray-600">
            Choose an option below to navigate
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => router.push(option.route)}
              className="cursor-pointer flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex-shrink-0">
                <option.icon className="h-12 w-12 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{option.title}</h3>
                <p className="mt-2 text-base text-gray-500">{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
