import { Button } from '@/components/ui/button';
import heroBanner from '@/assets/hero-banner.jpg';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBanner}
          alt="Stickers showcase"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/60"></div>
      </div>

      {/* Floating Stickers Animation */}
      <div className="absolute inset-0 z-10">
        <div className="floating-sticker absolute top-20 left-10 w-12 h-12 bg-primary rounded-lg opacity-80"></div>
        <div className="floating-sticker absolute top-40 right-20 w-8 h-8 bg-secondary rounded-lg opacity-60"></div>
        <div className="floating-sticker absolute bottom-40 left-20 w-10 h-10 bg-accent rounded-lg opacity-70"></div>
        <div className="floating-sticker absolute bottom-20 right-10 w-6 h-6 bg-primary rounded-lg opacity-50"></div>
        <div className="floating-sticker absolute top-1/2 left-1/4 w-14 h-14 bg-secondary rounded-lg opacity-40"></div>
        <div className="floating-sticker absolute top-1/3 right-1/3 w-9 h-9 bg-accent rounded-lg opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bebas mb-6 leading-none">
          <span className="text-gradient">YOUR VIBE,</span>
          <br />
          <span className="text-gradient-accent">YOUR STICK</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Don't just say it, stick it! Express yourself with our collection of 
          <span className="text-primary font-semibold"> bindass </span>
          stickers that speak your language.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button className="btn-neon text-lg px-8 py-6 h-auto">
            SHOP NOW
          </Button>
          <Button 
            variant="outline" 
            className="btn-neon-secondary text-lg px-8 py-6 h-auto border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
          >
            EXPLORE CATEGORIES
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse-glow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}