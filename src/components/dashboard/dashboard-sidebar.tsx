"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BarChart2,
  Video,
  MessageSquare,
  Activity,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      title: 'Home',
      href: '/dashboard',
      icon: Home,
      active: pathname === '/dashboard'
    },
    {
      title: 'Exercise',
      href: '/exercises',
      icon: Activity,
      active: pathname === '/exercises'
    },
    {
      title: 'Video',
      href: '/videos',
      icon: Video,
      active: pathname === '/videos'
    },
    {
      title: 'Message',
      href: '/messages',
      icon: MessageSquare,
      active: pathname === '/messages'
    },
    {
      title: 'Analysis',
      href: '/analytics',
      icon: BarChart2,
      active: pathname === '/analytics'
    }
  ];

  return (
    <aside className="flex flex-col fixed inset-y-0 left-0 z-50 w-[60px] bg-gradient-to-b from-[#00052E] to-[#001A5E]">
      <div className="flex flex-col items-center py-4 space-y-6">
        {/* Home icon at the top */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="flex items-center justify-center w-10 h-10 text-white"
          >
            <Home className="w-6 h-6" />
          </Link>
        </div>

        {/* Navigation items */}
        <nav className="flex flex-col items-center space-y-6 w-full">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full px-2 py-2 text-xs font-medium transition-colors",
                item.active
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
