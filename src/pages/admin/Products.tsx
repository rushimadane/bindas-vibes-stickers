import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/ui/header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import ProductForm, { Product } from "./ProductForm";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products: ", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddProduct = () => {
    setProductToEdit(null);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8 pb-20">
        <div className="container mx-auto px-4">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-bebas text-3xl text-gradient">Manage Products</CardTitle>
              <Button className="btn-neon" onClick={handleAddProduct}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Sticker
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">Loading products...</TableCell>
                    </TableRow>
                  ) : products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        You haven't added any products yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map(product => (
                      <TableRow key={product.id}>
                        <TableCell><img src={product.imageUrl} alt={product.name} className="h-12 w-12 object-cover rounded-md" /></TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>₹{product.price}</TableCell>
                        <TableCell>
                          {/* Edit and Delete buttons will be added in a future step */}
                          <Button variant="outline" size="sm" disabled>Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <ProductForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onProductUpdate={fetchProducts}
        productToEdit={productToEdit}
      />
    </div>
  );
};

export default Products;