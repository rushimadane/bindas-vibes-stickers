import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, DocumentData } from 'firebase/firestore';

// Define the Product type to match our database structure
interface Product {
  id: string;
  name: string;
  price: number;
  image: string; // Keep for cart/favorites context compatibility
  category: string;
  subcategory?: string;
  imageUrl: string; // This is the new field from Firestore
}

const ProductListing = () => {
  const { category, subcategory } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { toast } = useToast();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) return;
      setIsLoading(true);
      try {
        const productsCollection = collection(db, 'products');
        let productsQuery = query(productsCollection, where("category", "==", category));

        if (subcategory) {
          // Note: Firestore requires an index for compound queries. 
          // If this doesn't work, you'll need to create one in the Firebase console.
          productsQuery = query(productsCollection, where("category", "==", category), where("subcategory", "==", subcategory));
        }
        
        const querySnapshot = await getDocs(productsQuery);
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Product));

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Failed to load products",
          description: "You might need to create a Firestore index. Check the console.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory, toast]);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ ...product, image: product.imageUrl }); // Pass imageUrl as image
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleToggleFavorite = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const favoriteItem = { ...product, image: product.imageUrl }; // Pass imageUrl as image
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
      toast({
        title: "Removed from favorites",
      });
    } else {
      addToFavorites(favoriteItem);
      toast({
        title: "Added to favorites!",
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
                {subcategory ? subcategory.replace(/-/g, ' ').toUpperCase() : category?.replace(/-/g, ' ').toUpperCase()}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover amazing stickers for your collection
            </p>
          </div>

          {isLoading ? (
             <div className="text-center text-muted-foreground py-12">Loading stickers...</div>
          ) : products.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">No stickers found in this category yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <Card
                  key={product.id}
                  className="glass-card group cursor-pointer hover:scale-105 transition-all duration-300 peel-corner"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="relative mb-4 overflow-hidden rounded-lg">
                      <img 
                        src={product.imageUrl} 
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductListing;