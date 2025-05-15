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
    sm: { logo: 48, text: 'text-xl' },
    md: { logo: 64, text: 'text-2xl' },
    lg: { logo: 96, text: 'text-3xl' }
  };

  // Get dimensions based on size
  const dimensions = sizeMap[size];

  return (
    <Link href="/landing" className={cn("flex items-center", className)}>
      <div className="relative mr-2" style={{ width: dimensions.logo, height: dimensions.logo }}>
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
        <div className="relative" style={{ height: dimensions.logo, width: dimensions.logo * 3 }}>
          <Image
            src="/kinetic-text-logo.svg"
            alt="Kinetic"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
      )}
    </Link>
  );
}
