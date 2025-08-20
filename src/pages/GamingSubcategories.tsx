import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const gamingSubcategories = [
  { name: 'GTA Series', slug: 'gta-series', emoji: '🏎️' },
  { name: 'Valorant', slug: 'valorant', emoji: '🎯' },
  { name: 'CS2', slug: 'cs2', emoji: '🔫' },
  { name: 'Apex Legends', slug: 'apex-legends', emoji: '🏆' },
  { name: 'PUBG', slug: 'pubg', emoji: '🏹' },
  { name: 'Fortnite', slug: 'fortnite', emoji: '🏰' },
  { name: 'Minecraft', slug: 'minecraft', emoji: '⛏️' },
  { name: 'Among Us', slug: 'among-us', emoji: '🚀' },
];

const GamingSubcategories = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bebas mb-4">
              <span className="text-gradient">GAMING</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Level up your setup with gaming stickers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gamingSubcategories.map((subcategory) => (
              <Card
                key={subcategory.slug}
                className="glass-card group cursor-pointer hover:scale-105 transition-all duration-300 peel-corner"
                onClick={() => navigate(`/categories/gaming/${subcategory.slug}`)}
              >
                <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                  <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform duration-300">
                    {subcategory.emoji}
                  </div>
                  <h3 className="font-bebas text-xl mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {subcategory.name}
                  </h3>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
                    Shop Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GamingSubcategories;