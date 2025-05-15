"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import HeroSection from '@/components/landing/hero-section';
import FeaturesSection from '@/components/landing/features-section';
import NavigationMenu from '@/components/landing/navigation-menu';
import Testimonials from '@/components/landing/testimonials';
import CTASection from '@/components/landing/cta-section';
import { AuthModal } from '@/components/landing/auth-modal';
import { TransitionContainer } from '@/components/ui/transition-container';
import { useAuth } from '@/contexts/auth-context';
import { Loader2 } from 'lucide-react';
import { initAnalytics, trackPageView, trackEvent } from '@/lib/analytics';

export default function LandingPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading, user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState<'login' | 'register'>('login');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initialize analytics
  useEffect(() => {
    initAnalytics();
  }, []);

  // Track page view
  useEffect(() => {
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);

  // Track user if authenticated
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      // In a real app, you would track the actual user ID
      trackEvent('user_authenticated', 'authentication', user.id);
    }
  }, [isAuthenticated, user]);

  // Handle successful authentication
  useEffect(() => {
    if (isAuthenticated && !loading) {
      // Start transition to 3D interface
      setIsTransitioning(true);

      // Track transition to 3D interface
      trackEvent('transition_to_3d', 'navigation', 'enhanced_home');

      // Delay navigation to allow for transition animation
      const timer = setTimeout(() => {
        router.push('/enhanced-home');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, loading, router]);

  // Open auth modal with specified type
  const openAuthModal = (type: 'login' | 'register') => {
    setAuthModalType(type);
    setAuthModalOpen(true);

    // Track auth modal open
    trackEvent('open_auth_modal', 'authentication', type);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <TransitionContainer isTransitioning={isTransitioning}>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <NavigationMenu
          onSignInClick={() => openAuthModal('login')}
          onSignUpClick={() => openAuthModal('register')}
        />

        {/* Main Content */}
        <main className="flex-1">
          <HeroSection
            onGetStartedClick={() => openAuthModal('register')}
            onWatchDemoClick={() => {/* Implement demo video modal */}}
          />
          <FeaturesSection />
          <Testimonials />
          <CTASection onSignUpClick={() => openAuthModal('register')} />
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-6 bg-muted/50">
          <div className="container mx-auto text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Kinetic AI. All rights reserved.</p>
          </div>
        </footer>

        {/* Auth Modal */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          type={authModalType}
          onSwitchType={(type) => setAuthModalType(type)}
        />
      </div>
    </TransitionContainer>
  );
}
