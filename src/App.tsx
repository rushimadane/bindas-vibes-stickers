import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import NewArrivals from "./pages/NewArrivals";
import AnimeSubcategories from "./pages/AnimeSubcategories";
import GamingSubcategories from "./pages/GamingSubcategories";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import Address from "./pages/Address";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

// Admin Imports
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Customer Facing Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/new-arrivals" element={<NewArrivals />} />

              {/* --- THE FINAL FIX: Specific routes MUST come BEFORE the general :category route --- */}
              <Route path="/categories/anime-manga" element={<AnimeSubcategories />} />
              <Route path="/categories/gaming" element={<GamingSubcategories />} />
              
              {/* This will now only match AFTER checking for anime and gaming */}
              <Route path="/categories/:category" element={<ProductListing />} />
              <Route path="/categories/:category/:subcategory" element={<ProductListing />} />
              
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/address" element={<Address />} />
              <Route path="/checkout" element={<Checkout />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<Products />} />

              {/* Catch-all Not Found Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </FavoritesProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;