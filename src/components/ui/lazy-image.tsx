"use client";

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface LazyImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallback?: React.ReactNode;
  loadingComponent?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  onLoadingComplete?: () => void;
  onLoadingError?: (error: Error) => void;
  className?: string;
  containerClassName?: string;
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  fallback,
  loadingComponent,
  threshold = 0.1,
  rootMargin = '0px',
  onLoadingComplete,
  onLoadingError,
  className,
  containerClassName,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  // Set up intersection observer to detect when image is in viewport
  useEffect(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      // If IntersectionObserver is not supported, load the image immediately
      setIsInView(true);
      return;
    }
    
    const element = document.getElementById(`lazy-image-${alt?.replace(/\s+/g, '-').toLowerCase()}`);
    if (!element) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );
    
    observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  }, [alt, threshold, rootMargin]);
  
  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    onLoadingComplete?.();
  };
  
  // Handle image error
  const handleError = (error: any) => {
    setIsError(true);
    onLoadingError?.(error);
  };
  
  // Generate unique ID for the image container
  const imageId = `lazy-image-${alt?.replace(/\s+/g, '-').toLowerCase()}`;
  
  return (
    <div
      id={imageId}
      className={cn('relative overflow-hidden', containerClassName)}
      style={{ width: typeof width === 'number' ? `${width}px` : width, height: typeof height === 'number' ? `${height}px` : height }}
    >
      {/* Loading state */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800 animate-pulse">
          {loadingComponent || (
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      )}
      
      {/* Image */}
      {isInView && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
      
      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
          {fallback || (
            <div className="text-center p-4">
              <svg
                className="mx-auto h-12 w-12 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Failed to load image</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
