
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Zap, Users, Calendar, Trophy, Settings, LineChart, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const NAVIGATION_ITEMS: { category: string; items: NavItem[] }[] = [
  {
    category: 'Analytics',
    items: [
      { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={18} /> },
      { name: 'Analytics', path: '/analytics', icon: <BarChart3 size={18} /> },
      { name: 'Predictions', path: '/predictions', icon: <Zap size={18} /> },
    ],
  },
  {
    category: 'Management',
    items: [
      { name: 'Teams', path: '/teams', icon: <Users size={18} /> },
      { name: 'Schedules', path: '/schedules', icon: <Calendar size={18} /> },
      { name: 'Leagues', path: '/leagues', icon: <Trophy size={18} /> },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Squad Builder', path: '/squad-builder', icon: <ShieldAlert size={18} /> },
      { name: 'Performance', path: '/performance', icon: <LineChart size={18} /> },
      { name: 'Settings', path: '/settings', icon: <Settings size={18} /> },
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-10 flex w-64 flex-col border-r border-sportiq-lightgray/30 bg-sportiq-black transition-all duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0 sm:w-20'
      )}
    >
      <div className="flex h-16 items-center justify-center border-b border-sportiq-lightgray/30">
        <h1 className={cn(
          "text-xl font-bold text-gradient transition-all duration-300", 
          isOpen ? "opacity-100" : "opacity-0 sm:opacity-100"
        )}>
          {isOpen ? 'SportIQ' : 'SIQ'}
        </h1>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto p-3">
        {NAVIGATION_ITEMS.map((group, idx) => (
          <div key={idx} className="mb-4">
            <h2 className={cn(
              "mb-2 px-2 text-xs font-semibold text-white/50 transition-opacity duration-200",
              isOpen ? "block" : "hidden sm:block sm:text-center sm:px-0 sm:opacity-0"
            )}>
              {group.category}
            </h2>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sportiq-lightgray/20",
                      location.pathname === item.path ? "bg-sportiq-lightgray/20 text-white" : "text-white/70 hover:text-white",
                      !isOpen && "sm:justify-center sm:px-2"
                    )}
                  >
                    <span className="text-sportiq-silver/80">{item.icon}</span>
                    <span className={cn(
                      "transition-opacity duration-200",
                      isOpen ? "opacity-100" : "opacity-0 sm:hidden"
                    )}>
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      
      <div className="glass-dark m-3 p-3 rounded-lg">
        <div className={cn(
          "flex items-center justify-center gap-3",
          !isOpen && "sm:flex-col"
        )}>
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-sportiq-blue to-sportiq-purple flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <div className={cn(
            "transition-opacity duration-200",
            isOpen ? "opacity-100" : "opacity-0 sm:hidden"
          )}>
            <h3 className="text-xs font-medium text-white">AI Powered</h3>
            <p className="text-xs text-white/60">Predictions ready</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
