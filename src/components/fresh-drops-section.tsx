import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const freshDrops = [
  {
    id: 1,
    name: 'Cyber Punk Cat',
    price: 7.99,
    image: '/placeholder.svg',
    description: 'Neon future meets kawaii culture',
    justDropped: true,
  },
  {
    id: 2,
    name: 'No Cap Pack',
    price: 11.99,
    image: '/placeholder.svg',
    description: 'Pure truth, no lies sticker set',
    justDropped: true,
  },
  {
    id: 3,
    name: 'Holographic Dreams',
    price: 13.99,
    image: '/placeholder.svg',
    description: 'Iridescent vibes that shift with light',
    justDropped: true,
  },
];

export function FreshDropsSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bebas mb-4">
            <span className="text-gradient">FRESH</span>
            <br />
            <span className="text-gradient-accent">DROPS</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Just landed! Get them before everyone else does
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {freshDrops.map((drop, index) => (
            <Card
              key={drop.id}
              className="glass-card group cursor-pointer hover:scale-[1.02] transition-all duration-300 overflow-hidden reveal-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative h-80 bg-gradient-to-br from-accent/20 to-primary/20">
                  <img
                    src={drop.image}
                    alt={drop.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {drop.justDropped && (
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground animate-pulse-glow">
                      ⚡ JUST DROPPED
                    </Badge>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-bebas text-2xl mb-2 group-hover:text-primary transition-colors duration-300">
                    {drop.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {drop.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      ${drop.price}
                    </span>
                    <Button className="btn-neon">
                      GRAB IT
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button className="btn-neon-secondary text-lg px-8 py-4 h-auto">
            SEE ALL NEW ARRIVALS
          </Button>
        </div>
      </div>
    </section>
  );
}