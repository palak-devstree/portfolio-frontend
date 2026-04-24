import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import { Home } from './app/pages/Home';

// Admin pages — must remain completely untouched.
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
          {/* Public single-page app */}
          <Route path="/" element={<Home />} />

          {/* Legacy public section routes redirect to the single-page anchors */}
          <Route path="/projects" element={<Navigate to="/#projects" replace />} />
          <Route path="/blog" element={<Navigate to="/#writing" replace />} />
          <Route path="/system-design" element={<Navigate to="/#designs" replace />} />
          <Route path="/lab" element={<Navigate to="/#lab" replace />} />
          <Route path="/about" element={<Navigate to="/#about" replace />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />

          {/* Admin routes — untouched */}
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
