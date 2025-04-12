import React from 'react';
import { User } from '../types/user-types';
import Image from 'next/image';

interface UserCardProps {
  user: User;
  onViewProfile: (userId: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onViewProfile }) => {
  return (
    <div className="border border-deep-gray-200 rounded-xl p-5 frosted-glass shadow-soft hover:shadow-deep transition-shadow">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5">
        <Image
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          width={64}
          height={64}
          className="rounded-full object-cover border-2 border-deep-gray-200"
        />
        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-semibold text-lg text-dark-red-900">{user.name}</h3>
          <p className="text-deep-gray-600">{user.email}</p>
          <p className="text-sm text-deep-gray-500">
            {user.role} • {user.department}
          </p>
        </div>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            user.isActive
              ? 'bg-green-100 text-green-800'
              : 'bg-dark-red-100 text-dark-red-800'
          }`}
        >
          {user.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
      <div className="mt-5 flex justify-end">
        <button
          onClick={() => onViewProfile(user.id)}
          className="px-4 py-2 bg-dark-red-600 text-white rounded-lg hover:bg-dark-red-700"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default UserCard;
