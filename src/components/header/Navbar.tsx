import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationItem {
  name: string;
  href: string;
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/home' },
  { name: 'Produtos', href: '/products' },
  { name: 'Comprar', href: '/products?buy=true' },
  { name: 'Listas', href: '/lists' },
  { name: 'Ajustes', href: '/settings' },
];

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

export const Navbar: React.FC = () => {
  const location = useLocation();

  const getIcon = (item: NavigationItem) => {
    switch (item.name) {
      case 'Home':
        if (location.pathname === item.href) {
          return (
            <img src='../.././img/Navbar/home-icon-selected.svg' />
          )
        } else {
          return (
            <img src='../.././img/Navbar/home-icon-unselected.svg' />
          )
        }
      case 'Produtos':
        if (location.pathname === item.href) {
          return (
            <img src='../.././img/Navbar/products-icon-selected.svg' />
          )
        } else {
          return (
            <img src='../.././img/Navbar/products-icon-unselected.svg' />
          )
        }
      case 'Comprar':
        if (location.pathname === item.href) {
          return (
            <img src='../.././img/Navbar/buy-icon-selected.svg' />
          )
        } else {
          return (
            <img src='../.././img/Navbar/buy-icon-unselected.svg' />
          )
        }
      case 'Listas':
        if (location.pathname === item.href) {
          return (
            <img src='../.././img/Navbar/lists-icon-selected.svg' />
          )
        } else {
          return (
            <img src='../.././img/Navbar/lists-icon-unselected.svg' />
          )
        }
      case 'Ajustes':
        if (location.pathname === item.href) {
          return (
            <img src='../.././img/Navbar/settings-icon-selected.svg' />
          )
        } else {
          return (
            <img src='../.././img/Navbar/settings-icon-unselected.svg' />
          )
        }
    }
  }

  return (
    <nav className="navbar bg-white" style={{ boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)' }}>
      <div className="flex h-16 pt-2 max-w-7xl px-8 items-center justify-center">
        <div className="flex justify-between w-full pb-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const hoverStyle = !isActive ? 'hover:text-white' : '';
            const textStyle = isActive ? 'text-white' : 'text-gray-300';

            return (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  'rounded-md py-2 text-sm font-medium flex flex-col items-center',
                  hoverStyle,
                  textStyle
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="mb-1">
                  {getIcon(item)}
                </div>
                <span className="text-xs font-medium" style={{
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
    </nav>
  );
}