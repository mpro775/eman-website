import { lazy, Suspense, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ViewProvider } from './context/ViewContext';
import { LoadingProvider } from './context/LoadingContext';
import { ErrorBoundary } from './components/common';
import { ProtectedRoute } from './admin/components/ProtectedRoute';
import { AdminLayout } from './admin/components/layout/AdminLayout';
import { initSoundKit, playSwipe, playTap, stopProgressLoop } from './utils/soundManager';

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

const SoundBridge = () => {
  const location = useLocation();
  const pathnameRef = useRef(location.pathname);
  const lastHoverRef = useRef<{ el: Element | null; at: number }>({ el: null, at: 0 });
  const prevPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    pathnameRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    // Route-to-route navigation sound (public only)
    if (location.pathname.startsWith('/admin')) {
      prevPathnameRef.current = location.pathname;
      return;
    }

    // Skip on first mount
    if (prevPathnameRef.current === null) {
      prevPathnameRef.current = location.pathname;
      return;
    }

    if (prevPathnameRef.current !== location.pathname) {
      // Slight delay so it feels tied to the transition
      playSwipe({ volume: 0.35, delay: 0.02 });
      prevPathnameRef.current = location.pathname;
    }
  }, [location.pathname]);

  useEffect(() => {
    // Kick off async kit load on public pages for best UX (first click has sound)
    if (!location.pathname.startsWith('/admin')) {
      void initSoundKit();
    } else {
      // Safety: ensure no public loops keep running on admin routes.
      stopProgressLoop();
    }
  }, [location.pathname]);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const pathname = pathnameRef.current;
      if (pathname.startsWith('/admin')) return;

      // mouse: only left click
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      const target = e.target as HTMLElement | null;
      const clickable = target?.closest?.('button, a, [role="button"]') as HTMLElement | null;
      if (!clickable) return;

      // allow opting out anywhere up the tree
      if (clickable.closest('[data-snd="off"]')) return;

      // ignore disabled
      if (clickable instanceof HTMLButtonElement && clickable.disabled) return;
      if (clickable.getAttribute('aria-disabled') === 'true') return;

      playTap();
    };

    document.addEventListener('pointerdown', onPointerDown, true);
    return () => document.removeEventListener('pointerdown', onPointerDown, true);
  }, []);

  useEffect(() => {
    const onPointerOver = (e: PointerEvent) => {
      const pathname = pathnameRef.current;
      if (pathname.startsWith('/admin')) return;

      // Hover sound should be mouse-only (avoid touch/stylus spam)
      if (e.pointerType !== 'mouse') return;

      const target = e.target as HTMLElement | null;
      const el = target?.closest?.('button, a, [role="button"]') as HTMLElement | null;
      if (!el) return;

      const isInHeader = Boolean(el.closest('header'));
      const isAnchor = el.tagName.toLowerCase() === 'a';

      // For hover sounds on anchors, limit to header only (reduce noise across the site)
      if (isAnchor && !isInHeader) return;

      // allow opting out anywhere up the tree
      if (el.closest('[data-snd="off"]')) return;

      // ignore disabled
      if (el instanceof HTMLButtonElement && el.disabled) return;
      if (el.getAttribute('aria-disabled') === 'true') return;

      const now = performance.now();

      // Avoid repeating when moving within the same button or hovering too fast between elements
      if (lastHoverRef.current.el === el && now - lastHoverRef.current.at < 600) return;
      if (now - lastHoverRef.current.at < 80) return;

      lastHoverRef.current = { el, at: now };

      // Header hover: force the first tap variation (index 0)
      if (isInHeader) {
        playTap({ index: 0, volume: 0.25 });
        return;
      }

      // Elsewhere: slightly quieter than click, allow random variation
      playTap({ volume: 0.25 });
    };

    document.addEventListener('pointerover', onPointerOver, true);
    return () => document.removeEventListener('pointerover', onPointerOver, true);
  }, []);

  return null;
};

function App() {
  return (
    <ErrorBoundary>
      <LoadingProvider>
        <Router>
          <ViewProvider>
            <SoundBridge />
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
