import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import logo from '@/assets/logo.png';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a temporary login check. We will replace this with secure Firebase auth later.
    if (email === 'admin@bindassticks.com' && password === 'admin') {
      toast({
        title: "Login Successful",
        description: "Redirecting to dashboard...",
      });
      navigate('/admin/dashboard');
    } else {
      toast({
        title: "Login Failed",
        description: "Please check your email and password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-sm glass-card">
        <CardHeader className="text-center">
          <img src={logo} alt="bindassticks" className="h-10 w-auto mx-auto mb-4" />
          <CardTitle className="font-bebas text-3xl text-gradient">
            ADMIN PANEL
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@bindassticks.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="glass-card border-border/30 bg-muted/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="glass-card border-border/30 bg-muted/20"
              />
            </div>
            <Button type="submit" className="w-full btn-neon">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;