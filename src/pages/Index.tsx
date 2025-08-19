import { useState, useEffect } from 'react';
import { Header } from '@/components/ui/header';
import { HeroSection } from '@/components/hero-section';
import { CategoriesSection } from '@/components/categories-section';
import { TrendingSection } from '@/components/trending-section';
import { FreshDropsSection } from '@/components/fresh-drops-section';
import { Footer } from '@/components/ui/footer';
import { AuthModal } from '@/components/auth-modal';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true); // Show auth modal on first visit
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHasScrolled(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Add scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Categories Section */}
        <CategoriesSection />

        {/* Trending Section */}
        <TrendingSection />

        {/* Fresh Drops Section */}
        <FreshDropsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      {/* Scroll to Top Button */}
      {hasScrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center btn-neon animate-pulse-glow hover:scale-110 transition-all duration-300"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Index;
