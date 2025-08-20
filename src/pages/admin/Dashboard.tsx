import { Header } from '@/components/ui/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bebas mb-4">
              <span className="text-gradient">ADMIN DASHBOARD</span>
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="glass-card hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <CardTitle className="font-bebas text-2xl">Manage Products</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Add, edit, or delete stickers from your store.</p>
                <Button className="btn-neon" onClick={() => navigate('/admin/products')}>
                  Go to Products
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <CardTitle className="font-bebas text-2xl">View Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Check customer orders and manage fulfillment.</p>
                <Button variant="outline" disabled>Coming Soon</Button>
              </CardContent>
            </Card>

            <Card className="glass-card hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <CardTitle className="font-bebas text-2xl">Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">View sales data and website traffic.</p>
                <Button variant="outline" disabled>Coming Soon</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;