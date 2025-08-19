import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/hooks/use-toast';

// Mock product data
const generateProducts = (category: string, subcategory?: string) => {
  const products = [];
  for (let i = 1; i <= 12; i++) {
    products.push({
      id: `${category}-${subcategory || 'default'}-${i}`,
      name: `${subcategory || category} Sticker ${i}`,
      price: Math.floor(Math.random() * 50) + 10,
      image: `https://via.placeholder.com/300x300/FF00A8/FFFFFF?text=Sticker+${i}`,
      category,
      subcategory,
    });
  }
  return products;
};

const ProductListing = () => {
  const { category, subcategory } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { toast } = useToast();
  
  const products = generateProducts(category || '', subcategory);

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleToggleFavorite = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
      toast({
        title: "Removed from favorites",
        description: `${product.name} has been removed from your favorites.`,
      });
    } else {
      addToFavorites(product);
      toast({
        title: "Added to favorites!",
        description: `${product.name} has been added to your favorites.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bebas mb-4">
              <span className="text-gradient">
                {subcategory ? subcategory.replace('-', ' ').toUpperCase() : category?.replace('-', ' ').toUpperCase()}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover amazing stickers for your collection
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className="glass-card group cursor-pointer hover:scale-105 transition-all duration-300 peel-corner reveal-up"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <CardContent className="p-4">
                  <div className="relative mb-4 overflow-hidden rounded-lg">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        isFavorite(product.id) ? 'text-primary bg-primary/20' : 'text-muted-foreground bg-background/80'
                      }`}
                      onClick={(e) => handleToggleFavorite(product, e)}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-bebas text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-primary font-semibold text-lg">₹{product.price}</p>
                    
                    <Button
                      className="w-full btn-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={(e) => handleAddToCart(product, e)}
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

export default ProductListing;