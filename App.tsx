
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import EventsPage from './pages/EventsPage';
import ResourcesPage from './pages/ResourcesPage';
import BlogPage from './pages/BlogPage';
import BlogDetail from './pages/BlogDetail';
import MembershipPage from './pages/MembershipPage';
import PartnersPage from './pages/PartnersPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <AuthProvider>
          <DataProvider>
            <div className="flex min-h-screen flex-col bg-white dark:bg-[#0A0F1A] text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
              <Header />
              <main className="flex-grow pt-20">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/team" element={<TeamPage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:id" element={<BlogDetail />} />
                  <Route path="/membership" element={<MembershipPage />} />
                  <Route path="/partners" element={<PartnersPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </DataProvider>
        </AuthProvider>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
