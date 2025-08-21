import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Import Textarea
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { r2 } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export interface Product {
  id?: string;
  name: string;
  price: number;
  category: string;
  description: string; // Add description field
  imageUrl: string;
}

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onProductUpdate: () => void;
  productToEdit?: Product | null;
}

const ProductForm = ({ isOpen, onClose, onProductUpdate, productToEdit }: ProductFormProps) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState(''); // State for description
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setPrice(String(productToEdit.price));
      setCategory(productToEdit.category);
      setDescription(productToEdit.description || ''); // Set description
      setImageFile(null);
    } else {
      resetForm();
    }
  }, [productToEdit, isOpen]);

  const categories = [
    { slug: 'anime-manga', name: 'Anime & Manga' },
    { slug: 'gaming', name: 'Gaming' },
    { slug: 'gen-z-slang', name: 'Gen Z Slang' },
    { slug: 'meme-culture', name: 'Meme Culture' },
    { slug: 'cars-and-jdm', name: 'Cars & JDM' },
    { slug: 'hypebeast', name: 'Hypebeast' },
    { slug: 'tech-and-coding', name: 'Tech & Coding' },
    { slug: 'y2k-aesthetic', name: 'Y2K Aesthetic' },
  ];

  const resetForm = () => {
    setName('');
    setPrice('');
    setCategory('');
    setDescription('');
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !category || (!imageFile && !productToEdit)) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);

    try {
      let imageUrl = productToEdit?.imageUrl || '';
      
      if (imageFile) {
        const fileKey = `products/${Date.now()}_${imageFile.name}`;
        const arrayBuffer = await imageFile.arrayBuffer();
        const body = new Uint8Array(arrayBuffer);

        await r2.send(
          new PutObjectCommand({
            Bucket: import.meta.env.VITE_CLOUDFLARE_R2_BUCKET_NAME,
            Key: fileKey,
            Body: body,
            ContentType: imageFile.type,
          })
        );
        
        imageUrl = `${import.meta.env.VITE_CLOUDFLARE_R2_PUBLIC_URL}/${fileKey}`;
      }
      
      const productData = {
        name,
        price: Number(price),
        category,
        description, // Include description in data
        imageUrl,
      };

      if (productToEdit) {
        const productRef = doc(db, "products", productToEdit.id!);
        await updateDoc(productRef, productData);
        toast({ title: "Product updated successfully!" });
      } else {
        await addDoc(collection(db, "products"), productData);
        toast({ title: "Product added successfully!" });
      }

      resetForm();
      onProductUpdate();
      onClose();
    } catch (error) {
      console.error("Error saving product: ", error);
      toast({ title: "Failed to save product", description: "Please check the console for errors.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card">
        <DialogHeader>
          <DialogTitle className="font-bebas text-2xl text-gradient">
            {productToEdit ? 'Edit Sticker' : 'Add New Sticker'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Sticker Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="glass-card border-border/30 bg-muted/20" required />
          </div>
           <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="glass-card border-border/30 bg-muted/20" />
          </div>
          <div>
            <Label htmlFor="price">Price (₹)</Label>
            <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} type="number" min="0" step="1" className="glass-card border-border/30 bg-muted/20" required />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select name="category" onValueChange={setCategory} value={category} required>
              <SelectTrigger className="glass-card border-border/30 bg-muted/20">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.slug} value={cat.slug}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="image">Product Image</Label>
            <Input id="image" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} type="file" accept="image/*" className="glass-card border-border/30 bg-muted/20 file:text-primary" required={!productToEdit} />
            {productToEdit && <p className="text-xs text-muted-foreground mt-1">Leave blank to keep the current image.</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" className="btn-neon" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;