import { useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const trendingStickers = [
  {
    id: 1,
    name: 'Main Character Energy',
    price: 4.99,
    originalPrice: 6.99,
    rating: 4.8,
    reviews: 234,
    image: '/placeholder.svg',
    category: 'Gen Z Slang',
    isHot: true,
  },
  {
    id: 2,
    name: 'JDM Legends Pack',
    price: 12.99,
    originalPrice: 18.99,
    rating: 4.9,
    reviews: 156,
    image: '/placeholder.svg',
    category: 'Cars & JDM',
    isHot: true,
  },
  {
    id: 3,
    name: 'Kawaii Cat Vibes',
    price: 8.99,
    rating: 4.7,
    reviews: 89,
    image: '/placeholder.svg',
    category: 'Anime & Manga',
    isNew: true,
  },
  {
    id: 4,
    name: 'Retro Gaming Icons',
    price: 9.99,
    rating: 4.6,
    reviews: 67,
    image: '/placeholder.svg',
    category: 'Gaming',
    isNew: true,
  },
  {
    id: 5,
    name: 'Y2K Holographic',
    price: 15.99,
    originalPrice: 22.99,
    rating: 4.9,
    reviews: 203,
    image: '/placeholder.svg',
    category: 'Y2K Aesthetic',
    isHot: true,
  },
  {
    id: 6,
    name: 'That Girl Energy',
    price: 6.99,
    rating: 4.5,
    reviews: 78,
    image: '/placeholder.svg',
    category: 'Gen Z Slang',
    isNew: true,
  },
];

export function TrendingSection() {
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

  const toggleLike = (itemId: number) => {
    const newLiked = new Set(likedItems);
    if (newLiked.has(itemId)) {
      newLiked.delete(itemId);
    } else {
      newLiked.add(itemId);
    }
    setLikedItems(newLiked);
  };

  return (
    <section className="py-20 px-4 bg-muted/10">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bebas mb-4">
            <span className="text-gradient">TRENDING</span>
            <br />
            <span className="text-gradient-accent">RIGHT NOW</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            What's hot in the sticker streets - these are flying off our digital shelves
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingStickers.map((sticker, index) => (
            <Card
              key={sticker.id}
              className="glass-card group cursor-pointer hover:scale-[1.02] transition-all duration-300 peel-corner reveal-up overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-0">
                {/* Image Container */}
                <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                  <img
                    src={sticker.image}
                    alt={sticker.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {sticker.isHot && (
                      <Badge className="bg-primary text-primary-foreground animate-pulse-glow">
                        🔥 HOT
                      </Badge>
                    )}
                    {sticker.isNew && (
                      <Badge className="bg-accent text-accent-foreground">
                        ✨ NEW
                      </Badge>
                    )}
                  </div>

                  {/* Quick Actions - Desktop Hover */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-md border-border/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(sticker.id);
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 transition-colors duration-300 ${
                          likedItems.has(sticker.id) ? 'fill-primary text-primary' : 'text-foreground'
                        }`}
                      />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-md border-border/20"
                    >
                      <ShoppingCart className="h-4 w-4 text-foreground" />
                    </Button>
                  </div>

                  {/* Sale Badge */}
                  {sticker.originalPrice && (
                    <div className="absolute bottom-4 right-4">
                      <Badge className="bg-destructive text-destructive-foreground">
                        SALE
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {sticker.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{sticker.rating}</span>
                      <span>({sticker.reviews})</span>
                    </div>
                  </div>

                  <h3 className="font-bebas text-xl mb-3 group-hover:text-primary transition-colors duration-300">
                    {sticker.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        ${sticker.price}
                      </span>
                      {sticker.originalPrice && (
                        <span className="text-lg line-through text-muted-foreground">
                          ${sticker.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    {/* Mobile Add to Cart */}
                    <Button
                      size="sm"
                      className="md:hidden btn-neon text-xs px-4 py-2 h-auto"
                    >
                      ADD TO CART
                    </Button>
                  </div>

                  {/* Desktop Add to Cart */}
                  <Button
                    className="hidden md:block w-full mt-4 btn-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    ADD TO CART
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="btn-neon-secondary text-lg px-8 py-4 h-auto">
            VIEW ALL TRENDING
          </Button>
        </div>
      </div>
    </section>
  );
}