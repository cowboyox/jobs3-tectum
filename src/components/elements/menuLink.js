'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
      <TooltipProvider delayDuration={10}>
        <Tooltip>
          <TooltipTrigger >
            <Link
              className={`
                flex py-1 transition-all w-full
                ${desktopCollapsed 
                  ? `px-0 flex justify-center`
                  : `px-${sideBarSettings.x_spacing}`
                }
                ${pathname.includes(href) ? sideBarSettings.active_link_classes : 'group'}
              `}
              href={href} 
            >
              {icon}
              <span className='text-base font-medium uppercase text-slate-500 transition group-hover:text-white whitespace-nowrap overflow-hidden sidebar_link w-full text-left pl-4'>
                {name.toUpperCase()}
              </span>
            </Link>
          </TooltipTrigger>
          { desktopCollapsed && ( 
            <TooltipContent side="right" className='bg-[#10191d] rounded'>
              {name.toUpperCase()}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    )
  }

export default MenuLink;
