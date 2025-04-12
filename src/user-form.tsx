import React, { useState, useEffect } from 'react';
import { UserFormData } from '../types/user-types';

interface UserFormProps {
  initialData?: UserFormData;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    role: 'Viewer',
    department: '',
    location: '',
    isActive: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 frosted-glass rounded-xl shadow-deep">
      <h2 className="text-2xl font-bold text-dark-red-900 mb-6">
        {initialData?.id ? 'Edit User' : 'Create User'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-deep-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 w-full p-3 border rounded-lg focus:ring-dark-red-500 focus:border-dark-red-500 ${
              errors.name ? 'border-dark-red-500' : 'border-deep-gray-300'
            }`}
          />
          {errors.name && <p className="mt-1 text-sm text-dark-red-600">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-deep-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 w-full p-3 border rounded-lg focus:ring-dark-red-500 focus:border-dark-red-500 ${
              errors.email ? 'border-dark-red-500' : 'border-deep-gray-300'
            }`}
          />
          {errors.email && <p className="mt-1 text-sm text-dark-red-600">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-deep-gray-700">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-deep-gray-300 rounded-lg focus:ring-dark-red-500 focus:border-dark-red-500"
          >
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-deep-gray-700">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={`mt-1 w-full p-3 border rounded-lg focus:ring-dark-red-500 focus:border-dark-red-500 ${
              errors.department ? 'border-dark-red-500' : 'border-deep-gray-300'
            }`}
          />
          {errors.department && (
            <p className="mt-1 text-sm text-dark-red-600">{errors.department}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-deep-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`mt-1 w-full p-3 border rounded-lg focus:ring-dark-red-500 focus:border-dark-red-500 ${
              errors.location ? 'border-dark-red-500' : 'border-deep-gray-300'
            }`}
          />
          {errors.location && <p className="mt-1 text-sm text-dark-red-600">{errors.location}</p>}
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 text-dark-red-600 focus:ring-dark-red-500 border-deep-gray-300 rounded"
          />
          <label htmlFor="isActive" className="ml-2 text-sm text-deep-gray-700">
            Active User
          </label>
        </div>
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-deep-gray-300 rounded-lg text-deep-gray-700 hover:bg-deep-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-dark-red-600 text-white rounded-lg hover:bg-dark-red-700"
          >
            {initialData?.id ? 'Update' : 'Create'} User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
