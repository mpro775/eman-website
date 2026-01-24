import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ViewProvider } from './context/ViewContext';
import { LoadingProvider } from './context/LoadingContext';
import { ErrorBoundary } from './components/common';
import { ProtectedRoute } from './admin/components/ProtectedRoute';
import { AdminLayout } from './admin/components/layout/AdminLayout';

// Lazy load public pages
const Home = lazy(() => import('./pages/Home/Home'));
const Blog = lazy(() => import('./pages/Blog/Blog'));
const BlogDetail = lazy(() => import('./pages/Blog/BlogDetail'));
const PortfolioCategory = lazy(() => import('./pages/Portfolio/PortfolioCategory'));
const About = lazy(() => import('./pages/About/About'));
const Experience = lazy(() => import('./pages/Experience/Experience'));
const Contact = lazy(() => import('./pages/Contact/Contact'));

// Lazy load admin pages
const Login = lazy(() => import('./admin/pages/Login').then(module => ({ default: module.Login })));
const Dashboard = lazy(() => import('./admin/pages/Dashboard').then(module => ({ default: module.Dashboard })));
const ProjectsList = lazy(() => import('./admin/pages/Projects/ProjectsList').then(module => ({ default: module.ProjectsList })));
const ProjectForm = lazy(() => import('./admin/pages/Projects/ProjectForm').then(module => ({ default: module.ProjectForm })));
const ProjectCategoriesList = lazy(() => import('./admin/pages/Projects/ProjectCategoriesList').then(module => ({ default: module.ProjectCategoriesList })));
const PostsList = lazy(() => import('./admin/pages/Blog/PostsList').then(module => ({ default: module.PostsList })));
const PostForm = lazy(() => import('./admin/pages/Blog/PostForm').then(module => ({ default: module.PostForm })));
const CategoriesList = lazy(() => import('./admin/pages/Blog/CategoriesList').then(module => ({ default: module.CategoriesList })));
const TagsList = lazy(() => import('./admin/pages/Blog/TagsList').then(module => ({ default: module.TagsList })));
const ServicesList = lazy(() => import('./admin/pages/Services/ServicesList').then(module => ({ default: module.ServicesList })));
const ServiceForm = lazy(() => import('./admin/pages/Services/ServiceForm').then(module => ({ default: module.ServiceForm })));
const ContactMessages = lazy(() => import('./admin/pages/Contact/ContactMessages').then(module => ({ default: module.ContactMessages })));
const TestimonialsList = lazy(() => import('./admin/pages/Testimonials/TestimonialsList').then(module => ({ default: module.TestimonialsList })));
const TestimonialForm = lazy(() => import('./admin/pages/Testimonials/TestimonialForm').then(module => ({ default: module.TestimonialForm })));
const ProgramsList = lazy(() => import('./admin/pages/Programs/ProgramsList').then(module => ({ default: module.ProgramsList })));
const ProgramForm = lazy(() => import('./admin/pages/Programs/ProgramForm').then(module => ({ default: module.ProgramForm })));
const NewsletterSubscribers = lazy(() => import('./admin/pages/Newsletter/NewsletterSubscribers').then(module => ({ default: module.NewsletterSubscribers })));
const ProfileEdit = lazy(() => import('./admin/pages/Profile/ProfileEdit').then(module => ({ default: module.ProfileEdit })));
const ExperiencesList = lazy(() => import('./admin/pages/Experiences/ExperiencesList').then(module => ({ default: module.ExperiencesList })));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-bg-primary flex items-center justify-center" dir="rtl">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-accent-pink/20 border-t-accent-pink rounded-full animate-spin mx-auto mb-4" />
      <p className="text-text-secondary font-arabic">جاري التحميل...</p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <LoadingProvider>
        <Router>
          <ViewProvider>
            <div className="App">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/experience" element={<Experience />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogDetail />} />
                  <Route path="/portfolio" element={<Navigate to="/portfolio/ux-ui" replace />} />
                  <Route path="/portfolio/:category" element={<PortfolioCategory />} />

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="projects" element={<ProjectsList />} />
              <Route path="projects/new" element={<ProjectForm />} />
              <Route path="projects/:id" element={<ProjectForm />} />
              <Route path="projects/categories" element={<ProjectCategoriesList />} />
              <Route path="blog" element={<Navigate to="/admin/blog/posts" replace />} />
              <Route path="blog/posts" element={<PostsList />} />
              <Route path="blog/posts/new" element={<PostForm />} />
              <Route path="blog/posts/:id" element={<PostForm />} />
              <Route path="blog/categories" element={<CategoriesList />} />
              <Route path="blog/tags" element={<TagsList />} />
              <Route path="services" element={<ServicesList />} />
              <Route path="services/new" element={<ServiceForm />} />
              <Route path="services/:id" element={<ServiceForm />} />
              <Route path="contact" element={<ContactMessages />} />
              <Route path="testimonials" element={<TestimonialsList />} />
              <Route path="testimonials/new" element={<TestimonialForm />} />
              <Route path="testimonials/:id" element={<TestimonialForm />} />
              <Route path="programs" element={<ProgramsList />} />
              <Route path="programs/new" element={<ProgramForm />} />
              <Route path="programs/:id" element={<ProgramForm />} />
              <Route path="newsletter" element={<NewsletterSubscribers />} />
              <Route path="experiences" element={<ExperiencesList />} />
                  <Route path="profile" element={<ProfileEdit />} />
                </Route>
              </Routes>
              </Suspense>
            </div>
      </ViewProvider>
    </Router>
      </LoadingProvider>
    </ErrorBoundary>
  );
}

export default App;
