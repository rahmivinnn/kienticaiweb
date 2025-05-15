"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart2, 
  Calendar, 
  Home, 
  MessageSquare, 
  Settings, 
  User, 
  Video,
  Dumbbell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';

export function DashboardSidebar() {
  const pathname = usePathname();
  
  const navItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      active: pathname === '/dashboard'
    },
    {
      title: 'Exercise Plan',
      href: '/exercises',
      icon: Dumbbell,
      active: pathname === '/exercises'
    },
    {
      title: 'Video Library',
      href: '/videos',
      icon: Video,
      active: pathname === '/videos'
    },
    {
      title: 'Appointments',
      href: '/appointments',
      icon: Calendar,
      active: pathname === '/appointments'
    },
    {
      title: 'Messages',
      href: '/messages',
      icon: MessageSquare,
      active: pathname === '/messages'
    },
    {
      title: 'Analytics',
      href: '/analytics',
      icon: BarChart2,
      active: pathname === '/analytics'
    },
    {
      title: 'Profile',
      href: '/profile',
      icon: User,
      active: pathname === '/profile'
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: Settings,
      active: pathname === '/settings'
    }
  ];

  return (
    <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-50 lg:w-72 lg:border-r lg:border-gray-200 lg:bg-[#00052E] lg:pb-4">
      <div className="flex h-16 items-center border-b border-gray-800 px-6">
        <Link href="/dashboard" className="flex items-center">
          <Logo variant="white" size="sm" />
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid items-start px-4 text-sm font-medium">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                item.active 
                  ? "bg-blue-500 text-white" 
                  : "text-gray-300 hover:bg-blue-500/10 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
