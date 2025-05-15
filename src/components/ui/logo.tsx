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
    sm: { logo: 32, text: 'text-lg' },
    md: { logo: 40, text: 'text-xl' },
    lg: { logo: 48, text: 'text-2xl' }
  };

  // Get dimensions based on size
  const dimensions = sizeMap[size];

  return (
    <Link href="/landing" className={cn("flex items-center", className)}>
      <div className="relative" style={{ width: dimensions.logo, height: dimensions.logo }}>
        <Image
          src="/kinetic-logo-circle.svg"
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
        <div className="relative ml-3" style={{ height: dimensions.logo * 0.7, width: dimensions.logo * 2 }}>
          <Image
            src="/kinetic-text-logo.svg"
            alt="Kinetic AI"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
      )}
    </Link>
  );
}
