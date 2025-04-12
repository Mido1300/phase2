import UserDashboard from '../components/user-dashboard';
import { User } from '../types/user-types';

const initialUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    role: 'Admin',
    department: 'IT',
    location: 'New York',
    joinDate: '2020-01-15',
    isActive: true,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    role: 'Editor',
    department: 'Content',
    location: 'Los Angeles',
    joinDate: '2021-03-20',
    isActive: true,
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    role: 'Viewer',
    department: 'Marketing',
    location: 'Chicago',
    joinDate: '2019-11-05',
    isActive: false,
  },
  {
    id: 4,
    name: 'Sara Williams',
    email: 'sara@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    role: 'Editor',
    department: 'Design',
    location: 'Seattle',
    joinDate: '2022-05-10',
    isActive: true,
  },
  {
    id: 5,
    name: 'Mike Brown',
    email: 'mike@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    role: 'Viewer',
    department: 'Sales',
    location: 'Boston',
    joinDate: '2021-08-15',
    isActive: false,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="frosted-glass p-8 mb-10 rounded-xl shadow-deep">
          <h1 className="text-4xl font-bold text-dark-red-900 text-center">
            User Management Dashboard
          </h1>
          <p className="text-deep-gray-600 mt-3 text-center">
            Manage users with CRUD operations
          </p>
        </div>
        <UserDashboard initialUsers={initialUsers} />
      </div>
    </main>
  );
}
