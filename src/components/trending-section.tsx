import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { db } from '@/lib/firebase';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Define the Product type
interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    imageUrl: string;
    // Add other fields you might have like isHot, isNew, etc.
    isHot?: boolean;
    isNew?: boolean;
    originalPrice?: number;
    rating?: number;
    reviews?: number;
  }

export function TrendingSection() {
  const [trendingStickers, setTrendingStickers] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
        try {
            const productsCollection = collection(db, 'products');
            // Example: Fetch 6 products, you can add 'where' clauses for 'isHot' etc.
            const trendingQuery = query(productsCollection, limit(6)); 
            const querySnapshot = await getDocs(trendingQuery);
            const productsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Product));
            setTrendingStickers(productsData);
        } catch (error) {
            console.error("Error fetching trending products:", error);
        }
    };
    fetchTrending();
  }, []);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ ...product, image: product.imageUrl });
    toast({ title: "Added to cart!" });
  };

  const handleToggleFavorite = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const favoriteItem = { ...product, image: product.imageUrl };
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(favoriteItem);
    }
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
              onClick={() => navigate(`/product/${sticker.id}`)}
            >
              <CardContent className="p-0">
                <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                  <img
                    src={sticker.imageUrl}
                    alt={sticker.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-md border-border/20"
                      onClick={(e) => handleToggleFavorite(sticker, e)}
                    >
                      <Heart
                        className={`h-4 w-4 transition-colors duration-300 ${
                          isFavorite(sticker.id) ? 'fill-primary text-primary' : 'text-foreground'
                        }`}
                      />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-md border-border/20"
                      onClick={(e) => handleAddToCart(sticker, e)}
                    >
                      <ShoppingCart className="h-4 w-4 text-foreground" />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bebas text-xl mb-3 group-hover:text-primary transition-colors duration-300">
                    {sticker.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      ₹{sticker.price}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}