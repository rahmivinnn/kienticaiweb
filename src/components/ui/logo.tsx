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
    sm: { logo: 40, text: 'text-xl' },
    md: { logo: 50, text: 'text-2xl' },
    lg: { logo: 60, text: 'text-3xl' }
  };

  // Get dimensions based on size
  const dimensions = sizeMap[size];

  return (
    <Link href="/landing" className={cn("flex flex-col items-center", className)}>
      <div className="flex items-center">
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
      </div>

      {showText && (
        <div className="relative mt-1" style={{ height: dimensions.logo * 0.3, width: dimensions.logo }}>
          <Image
            src="/kinetic-bottom-text.svg"
            alt="KINETIC"
            fill
            className="object-contain"
            priority
          />
        </div>
      )}
    </Link>
  );
}
