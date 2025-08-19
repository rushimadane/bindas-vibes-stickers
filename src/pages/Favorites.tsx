import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingCart } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddToCart = (item: any) => {
    addToCart(item);
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const handleRemoveFromFavorites = (item: any) => {
    removeFromFavorites(item.id);
    toast({
      title: "Removed from favorites",
      description: `${item.name} has been removed from your favorites.`,
    });
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bebas mb-8">
                <span className="text-gradient">YOUR FAVORITES</span>
              </h1>
              <div className="glass-card rounded-2xl p-12">
                <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-xl text-muted-foreground mb-8">No favorites yet</p>
                <Button 
                  className="btn-neon"
                  onClick={() => navigate('/shop')}
                >
                  Discover Stickers
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bebas mb-4">
              <span className="text-gradient">YOUR FAVORITES</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              All your loved stickers in one place
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {favorites.map((item, index) => (
              <Card
                key={item.id}
                className="glass-card group cursor-pointer hover:scale-105 transition-all duration-300 peel-corner reveal-up"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <CardContent className="p-4">
                  <div className="relative mb-4 overflow-hidden rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full text-primary bg-primary/20 opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromFavorites(item);
                      }}
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-bebas text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-primary font-semibold text-lg">₹{item.price}</p>
                    
                    <Button
                      className="w-full btn-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
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

export default Favorites;