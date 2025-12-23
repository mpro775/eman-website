import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Blog from './pages/Blog/Blog';
import BlogDetail from './pages/Blog/BlogDetail';
import PortfolioCategory from './pages/Portfolio/PortfolioCategory';
import { ProtectedRoute } from './admin/components/ProtectedRoute';
import { AdminLayout } from './admin/components/layout/AdminLayout';
import { Login } from './admin/pages/Login';
import { Dashboard } from './admin/pages/Dashboard';
import { ProjectsList } from './admin/pages/Projects/ProjectsList';
import { ProjectForm } from './admin/pages/Projects/ProjectForm';
import { ProjectCategoriesList } from './admin/pages/Projects/ProjectCategoriesList';
import { PostsList } from './admin/pages/Blog/PostsList';
import { PostForm } from './admin/pages/Blog/PostForm';
import { CategoriesList } from './admin/pages/Blog/CategoriesList';
import { TagsList } from './admin/pages/Blog/TagsList';
import { ServicesList } from './admin/pages/Services/ServicesList';
import { ServiceForm } from './admin/pages/Services/ServiceForm';
import { ContactMessages } from './admin/pages/Contact/ContactMessages';
import { TestimonialsList } from './admin/pages/Testimonials/TestimonialsList';
import { TestimonialForm } from './admin/pages/Testimonials/TestimonialForm';
import { ProgramsList } from './admin/pages/Programs/ProgramsList';
import { ProgramForm } from './admin/pages/Programs/ProgramForm';
import { NewsletterSubscribers } from './admin/pages/Newsletter/NewsletterSubscribers';
import { ProfileEdit } from './admin/pages/Profile/ProfileEdit';
import { ExperiencesList } from './admin/pages/Experiences/ExperiencesList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
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
      </div>
    </Router>
  );
}

export default App;
