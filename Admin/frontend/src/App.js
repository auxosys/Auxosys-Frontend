import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './Layout';

import Dashboard from './Routes/DashboardHome';
import Contact from './Routes/Contact';
import Careers from './Routes/Careers';
import Newsroom from './Routes/Newsroom';
import CreateNewsroom from './Routes/CreateNewsroom';
import EditNewsroom from './Routes/EditNewsroom';

import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './Routes/ProtectedRoute';
import Settings from './Routes/Settings';
import Profile from './Routes/Profile';
import Subscriptions from './Routes/Subscriptions';
import SEO from './Routes/SEO';
import AccessControl from './Routes/AccessControl';
import LegalPages from './Routes/LegalPages';
import LegalPageForm from './Routes/LegalPageForm';

/* CAREERS */
import PostJob from './Routes/PostJob';
import EditJob from './Routes/EditJob';
import CareerApplicants from './Routes/CareerApplicants';

function App() {
  return (
    <HashRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<AdminLogin />} />

        {/* PROTECTED ADMIN AREA */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Admin Pages */}
          <Route path="contact" element={<Contact />} />
          <Route path="careers" element={<Careers />} />

          {/* NEWSROOM */}
          <Route path="newsroom" element={<Newsroom />} />
          <Route path="newsroom/new" element={<CreateNewsroom />} />
          <Route path="newsroom/edit/:id" element={<EditNewsroom />} />

          {/* CAREERS */}
          <Route path="careers/new" element={<PostJob />} />
          <Route path="careers/edit/:id" element={<EditJob />} />
          <Route path="careers/applications/:jobId" element={<CareerApplicants />} />

          {/* SEO & Legal */}
          <Route path="seo" element={<SEO />} />
          <Route path="legal-pages" element={<LegalPages />} />
          <Route path="legal/new" element={<LegalPageForm />} />
          <Route path="legal/edit/:id" element={<LegalPageForm />} />

          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="access-control" element={<AccessControl />} />
          {/* Fixed: was path="/subscriptions" (absolute) which breaks RRv6 nesting */}
          <Route path="subscriptions" element={<Subscriptions />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
