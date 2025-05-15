"use client";

import { useState, useCallback, useEffect } from 'react';

interface UseMenuStateReturn {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  openMenu: () => void;
  closeMenu: () => void;
}

export function useMenuState(initialState: boolean = false): UseMenuStateReturn {
  const [isMenuOpen, setIsMenuOpen] = useState(initialState);
  
  // Toggle menu state
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);
  
  // Open menu
  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);
  
  // Close menu
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);
  
  // Close menu on escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };
    
    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen, closeMenu]);
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);
  
  return {
    isMenuOpen,
    toggleMenu,
    openMenu,
    closeMenu
  };
}
