'use client';
import gsap from 'gsap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
    <TooltipProvider delayDuration={10}>
      <Tooltip>
        <TooltipTrigger>
          <Link
            className={`flex w-full py-1 transition-all ${
              desktopCollapsed ? `flex justify-center px-0` : `px-${sideBarSettings.x_spacing}`
            } ${pathname.includes(href) ? sideBarSettings.active_link_classes : 'group'} `}
            href={href}
          >
            {icon}
            <span className='sidebar_link w-full overflow-hidden whitespace-nowrap pl-4 text-left text-base font-medium text-slate-500 transition group-hover:text-white'>
              {name}
            </span>
          </Link>
        </TooltipTrigger>
        {desktopCollapsed && (
          <TooltipContent className='rounded bg-[#10191d]' side='right'>
            {name}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default MenuLink;
