import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import { AppLayout } from './app/AppLayout';
import { Dashboard } from './app/pages/Dashboard';
import { Projects } from './app/pages/Projects';
import { Blog } from './app/pages/Blog';
import { SystemDesign } from './app/pages/SystemDesign';
import { Lab } from './app/pages/Lab';
import { About } from './app/pages/About';
import Contact from './app/pages/Contact';

// Admin pages
import { AdminLogin } from './app/pages/admin/Login';
import { AdminDashboard } from './app/pages/admin/AdminDashboard';
import { ProfileEditor } from './app/pages/admin/ProfileEditor';
import { ProjectsManager } from './app/pages/admin/ProjectsManager';
import { BlogManager } from './app/pages/admin/BlogManager';
import ContactMessagesManager from './app/pages/admin/ContactMessagesManager';

import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="blog" element={<Blog />} />
            <Route path="system-design" element={<SystemDesign />} />
            <Route path="lab" element={<Lab />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<ProfileEditor />} />
          <Route path="/admin/projects" element={<ProjectsManager />} />
          <Route path="/admin/blog" element={<BlogManager />} />
          <Route path="/admin/contact" element={<ContactMessagesManager />} />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
