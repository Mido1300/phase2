import React, { useState } from 'react';
import { User } from '../types/user-types';
import Image from 'next/image';

interface UserProfileProps {
  user: User;
  onEdit: () => void;
  onBack: () => void;
  onDelete: (userId: number) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onEdit, onBack, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const confirmDelete = () => {
    onDelete(user.id);
    setShowDeleteModal(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 frosted-glass rounded-xl shadow-deep">
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-elevated max-w-sm w-full">
            <h3 className="text-lg font-semibold text-dark-red-900 mb-4">Confirm Deletion</h3>
            <p className="text-deep-gray-600 mb-6">Are you sure you want to delete this user?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-deep-gray-300 rounded-lg text-deep-gray-700 hover:bg-deep-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-dark-red-600 text-white rounded-lg hover:bg-dark-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-start mb-8">
        <h2 className="text-3xl font-bold text-dark-red-900">User Profile</h2>
        <div className="flex space-x-3">
          <button
            onClick={onBack}
            className="px-4 py-2 border border-deep-gray-300 rounded-lg text-deep-gray-700 hover:bg-deep-gray-100"
          >
            Back
          </button>
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-dark-red-600 text-white rounded-lg hover:bg-dark-red-700"
          >
            Edit
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 bg-dark-red-800 text-white rounded-lg hover:bg-dark-red-900"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-shrink-0 text-center">
          <Image
            src={user.avatar}
            alt={`${user.name}'s avatar`}
            width={120}
            height={120}
            className="rounded-full border-4 border-deep-gray-200"
          />
          <div className="mt-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                user.isActive
                  ? 'bg-green-100 text-green-800'
                  : 'bg-dark-red-100 text-dark-red-800'
              }`}
            >
              {user.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
        <div className="flex-1 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <h3 className="text-sm font-medium text-deep-gray-500">Name</h3>
              <p className="text-lg text-dark-red-900">{user.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-deep-gray-500">Email</h3>
              <p className="text-lg text-dark-red-900">{user.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-deep-gray-500">Role</h3>
              <p className="text-lg text-dark-red-900">{user.role}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-deep-gray-500">Department</h3>
              <p className="text-lg text-dark-red-900">{user.department}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-deep-gray-500">Location</h3>
              <p className="text-lg text-dark-red-900">{user.location}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-deep-gray-500">Join Date</h3>
              <p className="text-lg text-dark-red-900">
                {new Date(user.joinDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
