'use client';
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';

const MenuLink = ({ href, icon, name, desktopCollapsed, sideBarSettings }) => {
    useEffect(() => { 
      gsap.to('.sidebar_link', { 
        duration: 1,
        paddingLeft: desktopCollapsed ? 0 : 15,
        width: desktopCollapsed ? 0 : '100%', 
      });
    }, [desktopCollapsed]);
  
    const pathname = usePathname();
    return (
      <Link
      className={`
        flex py-1 transition-all w-full
        ${desktopCollapsed 
          ? `px-0 flex justify-center`
          : `px-${sideBarSettings.x_spacing}`
        }
        ${pathname == href ? sideBarSettings.active_link_classes : 'group'}
      `}
      href={href} 
    >
      {icon}
      <span className='text-base font-medium uppercase text-slate-500 transition group-hover:text-white whitespace-nowrap overflow-hidden sidebar_link w-full pl-4'>
        {name.toUpperCase()}
      </span>
    </Link>
    )
  }

export default MenuLink
