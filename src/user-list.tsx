import React, { useState } from 'react';
import UserCard from './user-card';
import { User } from '../types/user-types';

interface UserListProps {
  users: User[];
  onViewProfile: (userId: number) => void;
  onAddUser: () => void;
}

const UserList: React.FC<UserListProps> = ({ users, onViewProfile, onAddUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-3 py-2 border border-deep-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-dark-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-deep-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="flex items-center gap-3">
          <select
            className="p-2 border border-deep-gray-300 rounded-lg text-sm focus:ring-dark-red-500 focus:border-dark-red-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
          >
            <option value="all">All Users</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            onClick={onAddUser}
            className="px-4 py-2 bg-dark-red-600 text-white rounded-lg hover:bg-dark-red-700"
          >
            Add User
          </button>
        </div>
      </div>
      {filteredUsers.length === 0 ? (
        <div className="p-10 text-center text-deep-gray-500">
          No users match your search or filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} onViewProfile={onViewProfile} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
