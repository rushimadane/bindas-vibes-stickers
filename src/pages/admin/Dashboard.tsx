import { Sidebar, SidebarProvider, SidebarInset } from '@/components/ui/sidebar'; // Import SidebarInset
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  return (
    <SidebarProvider>
      <Sidebar />
      {/* --- THIS IS THE FIX --- */}
      <SidebarInset className="flex flex-col flex-1 p-8">
        <Card className="glass-card flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="font-bebas text-3xl text-gradient">DASHBOARD</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Welcome to the Bindassticks Admin Panel!</p>
          </CardContent>
        </Card>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;