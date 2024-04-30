import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import React, { useState } from 'react';

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
  const [currentTab, setCurrentTab] = useState<string>('/');

  const handleClick = (href: string) => {
    setCurrentTab(href);
  };

  return (
    <nav className="navbar bg-gray-700">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-center ">
          <div className="flex justify-between w-full">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => handleClick(item.href)}
                className={classNames(
                  currentTab === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'rounded-md px-3 py-2 text-sm font-medium flex flex-col items-center'
                )}
                aria-current={currentTab === item.href ? 'page' : undefined}
              >
                <div className="mb-1">{item.icon}</div>
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

