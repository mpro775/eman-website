import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiFolder,
  FiFileText,
  FiSettings,
  FiMail,
  FiStar,
  FiCode,
  FiUsers,
  FiUser,
  FiChevronDown,
  FiGrid,
  FiBriefcase,
} from 'react-icons/fi';

interface SidebarSubItem {
  path: string;
  label: string;
}

interface SidebarItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  subItems?: SidebarSubItem[];
}

const sidebarItems: SidebarItem[] = [
  { path: '/admin/dashboard', label: 'لوحة التحكم', icon: <FiHome /> },
  {
    path: '/admin/projects',
    label: 'المشاريع',
    icon: <FiFolder />,
    subItems: [
      { path: '/admin/projects', label: 'كل المشاريع' },
      { path: '/admin/projects/categories', label: 'فئات المشاريع' },
    ]
  },
  {
    path: '/admin/blog/posts',
    label: 'المدونة',
    icon: <FiFileText />,
    subItems: [
      { path: '/admin/blog/posts', label: 'المقالات' },
      { path: '/admin/blog/categories', label: 'فئات المدونة' },
      { path: '/admin/blog/tags', label: 'الوسوم' },
    ]
  },
  { path: '/admin/services', label: 'الخدمات', icon: <FiSettings /> },
  { path: '/admin/contact', label: 'الرسائل', icon: <FiMail /> },
  { path: '/admin/testimonials', label: 'اراء العملاء', icon: <FiStar /> },
  { path: '/admin/programs', label: 'البرامج', icon: <FiCode /> },
  { path: '/admin/experiences', label: 'الخبرات العملية', icon: <FiBriefcase /> },
  { path: '/admin/newsletter', label: 'المشتركين', icon: <FiUsers /> },
  { path: '/admin/profile', label: 'الملف الشخصي', icon: <FiUser /> },
];

export const Sidebar = () => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    // Auto-expand the menu that contains the current path
    const currentPath = location.pathname;
    const expanded: string[] = [];
    sidebarItems.forEach(item => {
      if (item.subItems && item.subItems.some(sub => currentPath.startsWith(sub.path))) {
        expanded.push(item.path);
      }
    });
    return expanded;
  });

  const toggleExpand = (path: string) => {
    setExpandedItems(prev =>
      prev.includes(path)
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  const isItemActive = (item: SidebarItem): boolean => {
    if (item.subItems) {
      return item.subItems.some(sub => location.pathname === sub.path || location.pathname.startsWith(sub.path + '/'));
    }
    return location.pathname === item.path || location.pathname.startsWith(item.path + '/');
  };

  return (
    <aside className="fixed right-0 top-0 w-[260px] h-screen glass-effect-strong flex flex-col z-[100] overflow-y-auto"
      style={{
        background: 'linear-gradient(180deg, rgba(13, 13, 26, 0.95) 0%, rgba(21, 21, 37, 0.95) 100%)',
        borderLeft: '1px solid rgba(90, 90, 136, 0.3)',
      }}
    >
      {/* Header with gradient accent */}
      <div className="relative p-6 border-b border-[color:var(--color-admin-border)] overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-20" style={{
          background: 'linear-gradient(90deg, #4a9eff 0%, #9d4edd 50%, #4a9eff 100%)',
          backgroundSize: '200% 100%',
          animation: 'gradientShift 8s ease infinite',
        }} />
        <h2 className="relative m-0 text-xl font-bold text-[color:var(--color-admin-text-primary)] text-center">
          لوحة الإدارة
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {sidebarItems.map((item, index) => (
          <div key={item.path}>
            {item.subItems ? (
              // Item with submenu
              <>
                <button
                  onClick={() => toggleExpand(item.path)}
                  className={`relative w-full flex items-center justify-between gap-3 px-5 py-3.5 text-[color:var(--color-admin-text-secondary)] transition-all duration-300 my-1 group overflow-hidden ${isItemActive(item)
                    ? 'bg-gradient-to-l from-[rgba(74,158,255,0.15)] to-transparent text-[color:var(--color-admin-accent-blue)] font-semibold'
                    : 'hover:bg-gradient-to-l hover:from-[rgba(74,158,255,0.08)] hover:to-transparent hover:text-[color:var(--color-admin-text-primary)]'
                    }`}
                  style={{
                    animation: `slideUp ${0.3 + index * 0.05}s ease-out`
                  }}
                >
                  {/* Active indicator */}
                  <div className={`absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#4a9eff] to-[#6b5eff] transition-all duration-300 ${isItemActive(item) ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                    }`} />

                  <div className="flex items-center gap-3">
                    <span className="text-xl flex items-center justify-center w-6 transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span className="text-sm">{item.label}</span>
                  </div>

                  <FiChevronDown className={`text-sm transition-transform duration-300 ${expandedItems.includes(item.path) ? 'rotate-180' : ''
                    }`} />
                </button>

                {/* Submenu */}
                <div className={`overflow-hidden transition-all duration-300 ${expandedItems.includes(item.path) ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                  {item.subItems.map((subItem) => (
                    <NavLink
                      key={subItem.path}
                      to={subItem.path}
                      end={subItem.path === item.subItems![0].path}
                      className={({ isActive }) =>
                        `relative flex items-center gap-3 pr-14 pl-5 py-2.5 text-[color:var(--color-admin-text-secondary)] no-underline transition-all duration-300 group ${isActive
                          ? 'text-[color:var(--color-admin-accent-blue)] font-medium'
                          : 'hover:text-[color:var(--color-admin-text-primary)]'
                        }`
                      }
                    >
                      <FiGrid className="text-xs" />
                      <span className="text-xs">{subItem.label}</span>
                    </NavLink>
                  ))}
                </div>
              </>
            ) : (
              // Simple item without submenu
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 px-5 py-3.5 text-[color:var(--color-admin-text-secondary)] no-underline transition-all duration-300 my-1 group overflow-hidden ${isActive
                    ? 'bg-gradient-to-l from-[rgba(74,158,255,0.15)] to-transparent text-[color:var(--color-admin-accent-blue)] font-semibold'
                    : 'hover:bg-gradient-to-l hover:from-[rgba(74,158,255,0.08)] hover:to-transparent hover:text-[color:var(--color-admin-text-primary)]'
                  }`
                }
                style={{
                  animation: `slideUp ${0.3 + index * 0.05}s ease-out`
                }}
              >
                {({ isActive }) => (
                  <>
                    <div className={`absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#4a9eff] to-[#6b5eff] transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                      }`} />
                    <span className="text-xl flex items-center justify-center w-6 transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span className="text-sm">{item.label}</span>

                    {/* Hover glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(74,158,255,0.1)] to-transparent transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
                      }`} style={{
                        transform: 'translateX(-100%)',
                        animation: 'shimmer 2s infinite'
                      }} />
                  </>
                )}
              </NavLink>
            )}
          </div>
        ))}
      </nav>

      {/* Footer decorative element */}
      <div className="p-4 border-t border-[color:var(--color-admin-border)]">
        <div className="h-1 rounded-full bg-gradient-to-r from-[#4a9eff] via-[#9d4edd] to-[#4a9eff]"
          style={{
            backgroundSize: '200% 100%',
            animation: 'gradientShift 3s ease infinite'
          }}
        />
      </div>
    </aside>
  );
};
