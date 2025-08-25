import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
//import { Sidebar, SidebarProvider, SidebarInset } from '@/components/ui/sidebar'; // Import SidebarInset
import ProductForm from './ProductForm';
import { useToast } from '@/hooks/use-toast';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Pencil, Trash2 } from 'lucide-react';
import { Product } from '@/types';

const Products = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const { toast } = useToast();

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Product[];
    setProducts(productsList);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setProductToEdit(product);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setProductToEdit(null);
    setIsFormOpen(true);
  };

  const handleDelete = async (productId: string) => {
    if (!productId) return;
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", productId));
        toast({ title: "Product deleted successfully!" });
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product: ", error);
        toast({ title: "Failed to delete product", variant: "destructive" });
      }
    }
  };

  return (
  
        <Card className="glass-card flex-1 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-bebas text-3xl text-gradient">MANAGE STICKERS</CardTitle>
            <Button className="btn-neon" onClick={handleAddNew}>Add New Sticker</Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img src={product.imageUrl} alt={product.name} className="h-12 w-12 object-cover rounded-md" />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>₹{product.price}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(product.id!)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
     
      
  );
};

export default Products;