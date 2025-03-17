
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, User, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    return path.charAt(1).toUpperCase() + path.slice(2).replace(/-/g, ' ');
  };

  return (
    <header className="h-16 px-4 border-b border-sportiq-lightgray/30 bg-sportiq-black z-20 flex items-center justify-between animate-fade-in">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-4 p-2 rounded-md text-white/80 hover:text-white hover:bg-sportiq-lightgray/20 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-medium tracking-tight text-white flex items-center gap-2">
          <span className="text-gradient font-bold">SportIQ</span>
          <span className="hidden sm:inline text-white/80">|</span>
          <span className="hidden sm:inline text-white/80 font-normal">{getPageTitle()}</span>
        </h1>
      </div>
      
      <div className="flex items-center gap-1 sm:gap-2">
        <button className="p-2 rounded-full text-white/70 hover:text-white hover:bg-sportiq-lightgray/20 transition-colors">
          <Search size={18} />
        </button>
        <button className="p-2 rounded-full text-white/70 hover:text-white hover:bg-sportiq-lightgray/20 transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-sportiq-red rounded-full"></span>
        </button>
        <button className="ml-1 p-1.5 rounded-full text-white bg-sportiq-lightgray/30 hover:bg-sportiq-lightgray/50 transition-colors">
          <User size={18} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
