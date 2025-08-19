import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { CategoriesSection } from '@/components/categories-section';

const Categories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bebas mb-4">
              <span className="text-gradient">CATEGORIES</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find your perfect aesthetic
            </p>
          </div>
        </div>
        <CategoriesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Categories;