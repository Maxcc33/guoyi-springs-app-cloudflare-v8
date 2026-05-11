import { useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { isLoggedIn, clearToken } from '@/lib/adminApi';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard, Newspaper, Package, Image, LogOut, ExternalLink, Settings
} from 'lucide-react';

const navItems = [
  { path: '/admin', label: '仪表盘', icon: LayoutDashboard, exact: true },
  { path: '/admin/news', label: '新闻管理', icon: Newspaper },
  { path: '/admin/products', label: '产品管理', icon: Package },
  { path: '/admin/banners', label: '轮播图管理', icon: Image },
  { path: '/admin/settings', label: '账号设置', icon: Settings },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn()) navigate('/admin/login');
  }, [navigate]);

  const handleLogout = () => {
    clearToken();
    navigate('/admin/login');
  };

  const username = localStorage.getItem('admin_username') || 'admin';

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-industrial-dark text-white flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold">国益弹簧</h1>
          <p className="text-xs text-white/50 mt-1">运营管理后台</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold">
              {username[0]?.toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium">{username}</p>
              <p className="text-xs text-white/50">管理员</p>
            </div>
          </div>
          <div className="space-y-1">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              查看前台网站
            </a>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              退出登录
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
