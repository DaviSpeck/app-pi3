import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
  icon: JSX.Element;
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/home', current: false, icon: <HomeIcon /> },
  { name: 'Produtos', href: '/products', current: false, icon: <ShoppingBagIcon /> },
  { name: 'Comprar', href: '/products?buy=true', current: false, icon: <ShoppingCartIcon /> },
  { name: 'Listas', href: '/lists', current: false, icon: <FormatListBulletedIcon /> },
  { name: 'Ajustes', href: '/settings', current: false, icon: <SettingsIcon /> },
];

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

export const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar bg-white" style={{ boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)' }}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 pt-2 items-center justify-center">
          <div className="flex justify-between w-full">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const hoverStyle = !isActive ? 'hover:text-white' : '';
              const textStyle = isActive ? 'text-white' : 'text-gray-300';

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    'rounded-md px-3 py-2 text-sm font-medium flex flex-col items-center',
                    hoverStyle,
                    textStyle
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className="mb-1">
                    {React.cloneElement(item.icon, {
                      sx: {
                        color: isActive ? '#1DAEFF' : '#B9BCBE',
                        transition: 'color 0.3s ease',
                      },
                    })}
                  </div>
                  <span style={{
                    color: isActive ? '#1DAEFF' : '#B9BCBE',
                    transition: 'color 0.3s ease',
                  }}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}