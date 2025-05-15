"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import HeroSection from '@/components/landing/hero-section';
import NavigationMenu from '@/components/landing/navigation-menu';
import RehabilitationEcosystem from '@/components/landing/rehabilitation-ecosystem';
import HowItWorks from '@/components/landing/how-it-works';
import ForPractitioners from '@/components/landing/for-practitioners';
import SuccessStories from '@/components/landing/testimonials';
import RecoveryJourneyCTA from '@/components/landing/recovery-journey-cta';
import Footer from '@/components/landing/footer';
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
      <div className="min-h-screen flex flex-col landing-page">
        {/* Navigation */}
        <NavigationMenu
          onSignInClick={() => openAuthModal('login')}
          onSignUpClick={() => openAuthModal('register')}
        />

        {/* Main Content */}
        <main className="flex-1">
          <HeroSection
            onGetStartedClick={() => openAuthModal('register')}
            onWatchDemoClick={() => {/* Video modal is handled internally */}}
          />
          <RehabilitationEcosystem />
          <HowItWorks />
          <ForPractitioners />
          <SuccessStories />
          <RecoveryJourneyCTA onBeginJourneyClick={() => openAuthModal('register')} />
        </main>

        {/* Footer */}
        <Footer />

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
