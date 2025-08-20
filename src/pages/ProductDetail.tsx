import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string; // for cart context
  imageUrl: string;
  category: string;
  description?: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }
      try {
        const productDoc = await getDoc(doc(db, "products", id));
        if (productDoc.exists()) {
          setProduct({ id: productDoc.id, ...productDoc.data() } as Product);
        } else {
          console.error("No such product!");
          navigate('/not-found');
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }
  
  if (!product) {
    return (
      <div className="min-h-screen bg-background flex justify-center items-center">
        <p>Product not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ ...product, image: product.imageUrl });
    }
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const handleToggleFavorite = () => {
    const favoriteItem = { ...product, image: product.imageUrl };
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(favoriteItem);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/address');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-4">
              <div className="glass-card rounded-2xl overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bebas mb-4">
                  <span className="text-gradient">{product.name}</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  {product.description || 'Premium quality die-cut sticker perfect for laptops, water bottles, and more.'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-primary">₹{product.price}</span>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
                <span>{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>+</Button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button size="lg" className="flex-1 btn-neon-secondary" onClick={handleAddToCart}>
                  <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
                </Button>
                 <Button variant="outline" size="lg" className={`flex-1 ${isFavorite(product.id) ? 'text-primary border-primary bg-primary/10' : ''}`} onClick={handleToggleFavorite}>
                  <Heart className={`h-5 w-5 mr-2 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                  {isFavorite(product.id) ? 'Favorited' : 'Add to Favorites'}
                </Button>
              </div>
              <Button size="lg" className="w-full btn-neon" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const ProductDetailSkeleton = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-8 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Skeleton className="w-full h-96 lg:h-[500px] rounded-2xl" />
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-10 w-24" />
            <div className="flex gap-4 pt-6">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 flex-1" />
            </div>
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default ProductDetail;