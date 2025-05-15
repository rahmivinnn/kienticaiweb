"use client";

import React from 'react';
import Link from 'next/link';
import { Bell, Search, User, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardHeaderProps {
  user: { email: string; firstName?: string; lastName?: string; profilePicture?: string } | null;
  onLogout: () => void;
}

export function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <span className="text-lg font-semibold text-gray-800">
                <span className="text-blue-600">i</span>-nine.vercel.app
              </span>
            </Link>
          </div>
          <div className="hidden md:flex md:ml-10 md:items-center md:space-x-4">
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Link href="/dashboard" className="hover:text-gray-800">Home</Link>
              <span>/</span>
              <span className="text-gray-800">Dashboard</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-[1.2rem] w-[1.2rem]" />
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              3
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  {user?.profilePicture ? (
                    <AvatarImage src={user.profilePicture} alt={user.firstName || 'User'} />
                  ) : (
                    <AvatarFallback>{user?.email ? getInitials(user.email) : 'U'}</AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
