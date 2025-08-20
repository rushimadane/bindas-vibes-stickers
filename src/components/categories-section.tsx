import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Anime & Manga', slug: 'anime-manga', description: 'Your favorite characters', emoji: '🎌', color: 'bg-primary' },
  { name: 'Gaming', slug: 'gaming', description: 'Level up your setup', emoji: '🎮', color: 'bg-secondary' },
  { name: 'Gen Z Slang', slug: 'gen-z-slang', description: 'IYKYK, No Cap vibes', emoji: '💬', color: 'bg-accent' },
  { name: 'Meme Culture', slug: 'meme-culture', description: 'Internet humor at its finest', emoji: '😂', color: 'bg-primary' },
  { name: 'Cars & JDM', slug: 'cars-and-jdm', description: 'Ride with style', emoji: '🏎️', color: 'bg-secondary' },
  { name: 'Hypebeast', slug: 'hypebeast', description: 'Stay fresh, stay fly', emoji: '👟', color: 'bg-accent' },
  { name: 'Tech & Coding', slug: 'tech-and-coding', description: 'For the digital natives', emoji: '💻', color: 'bg-primary' },
  { name: 'Y2K Aesthetic', slug: 'y2k-aesthetic', description: 'Retro futuristic vibes', emoji: '✨', color: 'bg-secondary' },
];

export function CategoriesSection() {
  const navigate = useNavigate();

  const handleCategoryClick = (slug: string) => {
    // This now simply navigates to the correct slug path.
    // The logic is now entirely handled by the router in App.tsx.
    navigate(`/categories/${slug}`);
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bebas mb-4">
            <span className="text-gradient">FIND YOUR</span>
            <br />
            <span className="text-gradient-accent">AESTHETIC</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From anime to Y2K, we've got stickers that match your energy
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card
              key={category.name}
              className="glass-card group cursor-pointer hover:scale-105 transition-all duration-300 peel-corner reveal-up"
              onClick={() => handleCategoryClick(category.slug)}
            >
              <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform duration-300`}>
                  {category.emoji}
                </div>
                <h3 className="font-bebas text-xl mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  {category.description}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary hover:text-primary hover:bg-primary/10"
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}