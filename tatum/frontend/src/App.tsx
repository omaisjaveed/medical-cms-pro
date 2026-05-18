import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import './Responsive.css'
import { Toaster } from "react-hot-toast";

// Core Components
import ScrollToTop from "./Components/ScrollToTop";

// Lazy Load Pages
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const MeetTheDoctor = lazy(() => import("./Pages/MeetTheDoctor"));
const ToolsTrade = lazy(() => import("./Pages/ToolsOfTheTrade"));
const MeetTheTeam = lazy(() => import("./Pages/MeetTheTeam"));
const Jessica = lazy(() => import("./Pages/JessicaFields"));
const AngelaAjamie = lazy(() => import("./Pages/AngelaAjamie"));
const MissionaryGallery = lazy(() => import("./Pages/MissionaryGallery"));
const BlogsInner = lazy(() => import("./Pages/BlogsInner"));
const BlogDetail = lazy(() => import("./Pages/BlogsDetails"));
const ServiceDetail = lazy(() => import("./Pages/ServiceDetail"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));
const Testimonials = lazy(() => import("./Pages/Testimonials"));
const Policy = lazy(() => import("./Pages/Policy"));

// Admin Pages (Lazy Load)
const AdminLogin = lazy(() => import("./Admin/AdminLogin"));
const AdminLayout = lazy(() => import("./Admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./Admin/AdminDashboard"));
const AdminPages = lazy(() => import("./Admin/AdminPages"));
const AdminBlogs = lazy(() => import("./Admin/AdminBlogs"));
const AdminInquiries = lazy(() => import("./Admin/AdminInquiries"));
const AdminSettings = lazy(() => import("./Admin/AdminSettings"));
const AdminServices = lazy(() => import("./Admin/AdminServices"));
const AdminGallery = lazy(() => import("./Admin/AdminGallery"));
const AdminTestimonials = lazy(() => import("./Admin/AdminTestimonials"));
const MediaLibrary = lazy(() => import("./Admin/MediaLibrary"));

const LoadingFallback = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100%' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

function App() {
  return (
    <div className="App">
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/meet-the-doctor" element={<MeetTheDoctor />} />
              <Route path="/tools-of-the-trade" element={<ToolsTrade />} />
              <Route path="/meet-the-team" element={<MeetTheTeam />} />
              <Route path="/jessica-fields" element={<Jessica />} />
              <Route path="/angela-ajamie" element={<AngelaAjamie />} />
              <Route path="/gallery" element={<MissionaryGallery />} />
              <Route path="/blogs" element={<BlogsInner />} />
              <Route path="/blogs/:slug" element={<BlogDetail />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/privacy-policy" element={<Policy />} />
              
              {/* Dynamic Service Routes (Catch-all for slugs) */}
              <Route path="/:slug" element={<ServiceDetail />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="pages" element={<AdminPages />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="inquiries" element={<AdminInquiries />} />
              <Route path="media" element={<MediaLibrary />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
