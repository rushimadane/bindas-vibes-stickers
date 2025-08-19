import { useState, useEffect } from 'react';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [shippingAddress, setShippingAddress] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const deliveryCharge = 50;
  const totalPrice = getTotalPrice();
  const finalTotal = totalPrice + deliveryCharge;
  const isCheckoutEnabled = totalPrice >= 200;

  useEffect(() => {
    // Get shipping address from localStorage
    const savedAddress = localStorage.getItem('shippingAddress');
    if (savedAddress) {
      setShippingAddress(JSON.parse(savedAddress));
    } else {
      // Redirect to address page if no address is found
      navigate('/address');
    }

    // Redirect if cart is empty or doesn't meet minimum requirement
    if (items.length === 0 || !isCheckoutEnabled) {
      navigate('/cart');
    }
  }, [items, isCheckoutEnabled, navigate]);

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase. You'll receive a confirmation email shortly.",
    });
    
    // Clear cart and redirect
    clearCart();
    localStorage.removeItem('shippingAddress');
    setIsProcessing(false);
    navigate('/');
  };

  if (!shippingAddress) {
    return null; // Will redirect to address page
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-6xl font-bebas mb-4">
                <span className="text-gradient">CHECKOUT</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Review your order and complete your purchase
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Details */}
              <div className="space-y-6">
                {/* Shipping Address */}
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <h3 className="font-bebas text-xl text-foreground mb-4">Shipping Address</h3>
                    <div className="text-muted-foreground space-y-1">
                      <p className="font-medium text-foreground">{shippingAddress.fullName}</p>
                      <p>{shippingAddress.address}</p>
                      <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.pincode}</p>
                      <p>{shippingAddress.phone}</p>
                      {shippingAddress.email && <p>{shippingAddress.email}</p>}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => navigate('/address')}
                    >
                      Edit Address
                    </Button>
                  </CardContent>
                </Card>

                {/* Order Items */}
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <h3 className="font-bebas text-xl text-foreground mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-4 bg-muted/10 rounded-lg">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-primary">₹{item.price * item.quantity}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary & Payment */}
              <div className="space-y-6">
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <h3 className="font-bebas text-xl text-foreground mb-4">Order Summary</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                        <span>₹{totalPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Charges</span>
                        <span>₹{deliveryCharge}</span>
                      </div>
                      <div className="border-t border-border/20 pt-3">
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total Amount</span>
                          <span className="text-primary">₹{finalTotal}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardContent className="p-6">
                    <h3 className="font-bebas text-xl text-foreground mb-4">Payment Method</h3>
                    <div className="bg-muted/10 rounded-lg p-4 mb-4">
                      <p className="text-center text-muted-foreground">
                        💳 Cash on Delivery (COD)
                      </p>
                    </div>
                    
                    <Button
                      className="w-full btn-neon"
                      onClick={handleCheckout}
                      disabled={isProcessing || !isCheckoutEnabled}
                    >
                      {isProcessing ? (
                        "Processing..."
                      ) : (
                        `Place Order - ₹${finalTotal}`
                      )}
                    </Button>

                    {!isCheckoutEnabled && (
                      <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 mt-4">
                        <p className="text-sm text-accent text-center">
                          Minimum order value ₹200 required
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;