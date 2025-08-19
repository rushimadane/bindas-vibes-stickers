import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  // Mock product data
  const product = {
    id: id || '',
    name: 'Awesome Sticker',
    price: 25,
    image: 'https://via.placeholder.com/500x500/FF00A8/FFFFFF?text=Product+Image',
    category: 'anime-manga',
    description: 'This is an amazing sticker with vibrant colors and premium quality. Perfect for laptops, water bottles, and more!',
    rating: 4.8,
    reviews: 127,
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const handleToggleFavorite = () => {
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
            {/* Product Image */}
            <div className="space-y-4">
              <div className="glass-card rounded-2xl overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bebas mb-4">
                  <span className="text-gradient">{product.name}</span>
                </h1>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-accent fill-current' : 'text-muted-foreground'}`} 
                      />
                    ))}
                    <span className="text-muted-foreground ml-2">({product.reviews} reviews)</span>
                  </div>
                </div>

                <p className="text-3xl font-bold text-primary mb-6">₹{product.price}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bebas text-foreground">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bebas text-foreground">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10"
                  >
                    -
                  </Button>
                  <span className="text-xl font-medium w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10"
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  variant="outline"
                  size="lg"
                  className={`flex-1 ${isFavorite(product.id) ? 'text-primary border-primary bg-primary/10' : ''}`}
                  onClick={handleToggleFavorite}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                  {isFavorite(product.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
                
                <Button
                  size="lg"
                  className="flex-1 btn-neon-secondary"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </div>

              <Button
                size="lg"
                className="w-full btn-neon"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;