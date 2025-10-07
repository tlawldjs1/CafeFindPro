import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, TrendingUp } from 'lucide-react';

interface CafeRanking {
  cafeName: string;
  cafeAddress: string;
  clickCount: number;
}

export default function CafeRankingSection() {
  const { data: rankings, isLoading } = useQuery<CafeRanking[]>({
    queryKey: ['/api/top-cafes'],
  });

  if (isLoading || !rankings || rankings.length === 0) {
    return null;
  }

  return (
    <section className="py-12 px-4 md:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <h3 className="text-2xl md:text-3xl font-bold">실시간 카공 카페 랭킹</h3>
          <TrendingUp className="w-6 h-6 text-primary" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {rankings.map((cafe, index) => (
            <Card
              key={`${cafe.cafeName}-${index}`}
              className="p-5 hover-elevate"
              data-testid={`card-ranking-${index + 1}`}
            >
              <div className="flex items-start justify-between mb-3">
                <Badge 
                  variant={index === 0 ? "default" : "secondary"}
                  className="text-lg font-bold"
                  data-testid={`badge-rank-${index + 1}`}
                >
                  {index + 1}위
                </Badge>
                <span className="text-sm text-muted-foreground" data-testid={`text-clicks-${index + 1}`}>
                  {cafe.clickCount}회
                </span>
              </div>
              
              <h4 className="font-semibold text-lg mb-2 line-clamp-2" data-testid={`text-cafe-name-${index + 1}`}>
                {cafe.cafeName}
              </h4>
              
              <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-cafe-address-${index + 1}`}>
                {cafe.cafeAddress}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
