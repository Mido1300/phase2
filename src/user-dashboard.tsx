'use client';
import React, { useState, useEffect } from 'react';
import UserList from './user-list';
import UserForm from './user-form';
import UserProfile from './user-profile';
import { User, UserFormData, ViewMode } from '../types/user-types';

interface UserDashboardProps {
  initialUsers: User[];
}

const UserDashboard: React.FC<UserDashboardProps> = ({ initialUsers }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingUser, setEditingUser] = useState<UserFormData | null>(null);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const viewProfile = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setViewMode('profile');
    }
  };

  const addUser = () => {
    setEditingUser(null);
    setViewMode('form');
  };

  const editUser = () => {
    if (selectedUser) {
      const { id, ...data } = selectedUser;
      setEditingUser({ ...data, id });
      setViewMode('form');
    }
  };

  const submitUser = (data: UserFormData) => {
    if (data.id) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === data.id ? { ...u, ...data, avatar: u.avatar, joinDate: u.joinDate } : u
        )
      );
    } else {
      const newUser: User = {
        ...data,
        id: Math.max(0, ...users.map((u) => u.id)) + 1,
        avatar: `https://randomuser.me/api/portraits/${
          Math.random() > 0.5 ? 'men' : 'women'
        }/${Math.floor(Math.random() * 50)}.jpg`,
        joinDate: new Date().toISOString().split('T')[0],
      };
      setUsers((prev) => [...prev, newUser]);
    }
    setViewMode('list');
  };

  const deleteUser = (userId: number) => {
    if (window.confirm('Confirm user deletion?')) {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      setViewMode('list');
    }
  };

  const cancel = () => {
    setViewMode(selectedUser ? 'profile' : 'list');
  };

  return (
    <div className="container mx-auto p-6 frosted-glass">
      {viewMode === 'list' && (
        <UserList users={users} onViewProfile={viewProfile} onAddUser={addUser} />
      )}
      {viewMode === 'profile' && selectedUser && (
        <UserProfile
          user={selectedUser}
          onEdit={editUser}
          onBack={() => setViewMode('list')}
          onDelete={deleteUser}
        />
      )}
      {viewMode === 'form' && (
        <UserForm
          initialData={editingUser}
          onSubmit={submitUser}
          onCancel={cancel}
        />
      )}
    </div>
  );
};

export default UserDashboard;
