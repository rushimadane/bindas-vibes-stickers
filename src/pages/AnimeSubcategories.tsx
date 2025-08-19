import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const animeSubcategories = [
  { name: 'One Piece', slug: 'one-piece', emoji: '🏴‍☠️' },
  { name: 'Dragon Ball Z', slug: 'dragon-ball-z', emoji: '🐉' },
  { name: 'Demon Slayer', slug: 'demon-slayer', emoji: '⚔️' },
  { name: 'Jujutsu Kaisen', slug: 'jujutsu-kaisen', emoji: '👹' },
  { name: 'Blue Lock', slug: 'blue-lock', emoji: '⚽' },
  { name: 'Naruto', slug: 'naruto', emoji: '🍥' },
  { name: 'Bleach', slug: 'bleach', emoji: '💀' },
  { name: 'Hunter x Hunter', slug: 'hunter-x-hunter', emoji: '🎯' },
];

const AnimeSubcategories = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bebas mb-4">
              <span className="text-gradient">ANIME & MANGA</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your favorite characters, now as stickers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {animeSubcategories.map((subcategory, index) => (
              <Card
                key={subcategory.slug}
                className="glass-card group cursor-pointer hover:scale-105 transition-all duration-300 peel-corner reveal-up"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => navigate(`/categories/anime-manga/${subcategory.slug}`)}
              >
                <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform duration-300">
                    {subcategory.emoji}
                  </div>
                  <h3 className="font-bebas text-xl mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {subcategory.name}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary hover:text-primary hover:bg-primary/10"
                  >
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

export default AnimeSubcategories;