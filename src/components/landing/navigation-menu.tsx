"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import {
  Menu,
  X,
  ChevronDown,
  LogIn,
  Home,
  Activity,
  Info,
  FileText,
  MessageSquare,
  Phone
} from 'lucide-react';
import { useMenuState } from '@/lib/hooks/use-menu-state';

interface NavigationMenuProps {
  onSignInClick: () => void;
  onSignUpClick: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  onSignInClick,
  onSignUpClick
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isMenuOpen, toggleMenu, closeMenu } = useMenuState();
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [closeMenu]);

  // Navigation items
  const navItems = [
    { name: 'Features', href: '#features', icon: <Activity className="h-4 w-4 mr-2" /> },
    { name: 'How It Works', href: '#how-it-works', icon: <Info className="h-4 w-4 mr-2" /> },
    { name: 'Success Stories', href: '#success-stories', icon: <FileText className="h-4 w-4 mr-2" /> },
    { name: 'Resources', href: '#resources', icon: <Phone className="h-4 w-4 mr-2" /> },
  ];

  // Features submenu items
  const featuresItems = [
    { name: 'Movement Intelligence', href: '#movement-intelligence' },
    { name: 'Responsive Therapy Plans', href: '#responsive-therapy' },
    { name: 'Progress Tracking', href: '#progress-tracking' },
    { name: 'AI Feedback', href: '#ai-feedback' },
  ];

  // Resources submenu items
  const resourcesItems = [
    { name: 'Documentation', href: '#documentation' },
    { name: 'Research', href: '#research' },
    { name: 'For Clinicians', href: '#for-clinicians' },
    { name: 'Support', href: '#support' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#00052E]/95 backdrop-blur-md shadow-sm'
          : 'bg-[#00052E]'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Logo
            variant="white"
            size="md"
            className="scale-110"
          />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-2 py-1 text-sm font-medium transition-colors ${
                  isScrolled
                    ? 'text-white hover:text-blue-300'
                    : 'text-white hover:text-blue-300'
                }`}
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}

            {/* Features Dropdown */}
            <div className="relative">
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                  isScrolled
                    ? 'text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setFeaturesOpen(!featuresOpen)}
              >
                Features
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${featuresOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {featuresOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 z-50"
                  >
                    <div className="py-1">
                      {featuresItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                          onClick={() => {
                            setFeaturesOpen(false);
                            closeMenu();
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                  isScrolled
                    ? 'text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setResourcesOpen(!resourcesOpen)}
              >
                Resources
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 z-50"
                  >
                    <div className="py-1">
                      {resourcesItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                          onClick={() => {
                            setResourcesOpen(false);
                            closeMenu();
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="xs"
              className="text-white hover:text-blue-300 px-2 py-1"
              onClick={onSignInClick}
            >
              Sign in
            </Button>
            <Button
              size="xs"
              className="bg-[#0047AB] hover:bg-blue-700 text-white px-3 py-1"
              onClick={onSignUpClick}
            >
              Sign up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="text-white hover:bg-white/10"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#00052E] shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/10"
                    onClick={closeMenu}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Features Dropdown */}
                <div>
                  <button
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/10"
                    onClick={() => setFeaturesOpen(!featuresOpen)}
                  >
                    <span className="flex items-center">
                      <Activity className="h-4 w-4 mr-2" />
                      Features
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${featuresOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {featuresOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-6 mt-1 space-y-1"
                      >
                        {featuresItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-3 py-2 rounded-md text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                            onClick={closeMenu}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Resources Dropdown */}
                <div>
                  <button
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/10"
                    onClick={() => setResourcesOpen(!resourcesOpen)}
                  >
                    <span className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Resources
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {resourcesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-6 mt-1 space-y-1"
                      >
                        {resourcesItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-3 py-2 rounded-md text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                            onClick={closeMenu}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Auth Buttons */}
                <div className="pt-2 mt-2 border-t border-white/20 flex flex-col space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-white hover:text-blue-300"
                    onClick={() => {
                      onSignInClick();
                      closeMenu();
                    }}
                  >
                    Sign in
                  </Button>
                  <Button
                    size="sm"
                    className="justify-start bg-[#0047AB] hover:bg-blue-700 text-white"
                    onClick={() => {
                      onSignUpClick();
                      closeMenu();
                    }}
                  >
                    Sign up
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavigationMenu;
