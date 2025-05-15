"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'default' | 'white';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({
  variant = 'default',
  size = 'md',
  showText = true,
  className
}: LogoProps) {
  // Size mappings
  const sizeMap = {
    sm: { logo: 24, text: 'text-lg' },
    md: { logo: 32, text: 'text-xl' },
    lg: { logo: 48, text: 'text-2xl' }
  };
  
  // Get dimensions based on size
  const dimensions = sizeMap[size];
  
  // Text color based on variant
  const textColor = variant === 'white' ? 'text-white' : 'text-slate-900 dark:text-white';
  
  return (
    <Link href="/landing" className={cn("flex items-center", className)}>
      <div className="relative mr-2" style={{ width: dimensions.logo, height: dimensions.logo }}>
        <Image
          src="/kinetic-logo.png"
          alt="Kinetic AI"
          fill
          className="object-contain"
          priority
          onError={(e) => {
            // Fallback if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      </div>
      
      {showText && (
        <span className={cn("font-bold", dimensions.text, textColor)}>
          Kinetic AI
        </span>
      )}
    </Link>
  );
}
