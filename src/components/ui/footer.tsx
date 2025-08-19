import { Instagram, MessageCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

export function Footer() {
  const footerLinks = {
    Shop: ['All Stickers', 'Categories', 'New Arrivals', 'Sale'],
    Support: ['Contact Us', 'FAQs', 'Shipping Info', 'Returns'],
    Company: ['About Us', 'Privacy Policy', 'Terms of Service', 'Careers'],
  };

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-primary' },
    { name: 'TikTok', icon: MessageCircle, href: '#', color: 'hover:text-secondary' },
    { name: 'Discord', icon: Users, href: '#', color: 'hover:text-accent' },
  ];

  return (
    <footer className="glass border-t border-border/20 mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="bindassticks" className="h-8 w-auto" />
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Express yourself with our collection of bindass stickers. 
              From anime to Y2K, we've got the vibes that match your energy.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="icon"
                  className={`transition-colors duration-300 ${social.color}`}
                  asChild
                >
                  <a href={social.href}>
                    <social.icon className="h-5 w-5" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bebas text-lg mb-4 text-foreground">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-border/20 mt-12 pt-8">
          <div className="text-center mb-8">
            <h3 className="font-bebas text-2xl mb-2 text-gradient">
              JOIN THE SQUAD
            </h3>
            <p className="text-muted-foreground mb-4">
              Get first dibs on new drops and exclusive discounts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your.email@vibes.com"
                className="flex-1 px-4 py-3 rounded-full glass-card border-border/30 bg-muted/20 focus:bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              />
              <Button className="btn-neon px-8">
                SUBSCRIBE
              </Button>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/20 text-sm text-muted-foreground">
            <p>© 2024 bindassticks. All rights reserved.</p>
            <p className="mt-2 md:mt-0">
              Made with ⚡ for the Gen Z squad
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}