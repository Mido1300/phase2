import '../styles/global-styles.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Management Dashboard',
  description: 'Manage users with ease',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
