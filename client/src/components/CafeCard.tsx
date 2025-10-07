import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Plug, Star } from 'lucide-react';
import type { CafeResult } from '@shared/schema';

interface CafeCardProps {
  cafe: CafeResult;
}

export default function CafeCard({ cafe }: CafeCardProps) {
  const handleClick = () => {
    window.open(cafe.link, '_blank');
  };

  return (
    <Card 
      className="p-6 cursor-pointer hover-elevate active-elevate-2"
      onClick={handleClick}
      data-testid={`card-cafe-${cafe.id}`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold flex-1" data-testid="text-cafe-name">
          {cafe.name}
        </h3>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < cafe.studyRating 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'text-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-start gap-2 text-muted-foreground mb-4">
        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <p className="text-sm" data-testid="text-cafe-address">{cafe.address}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="gap-1">
          <Plug className="w-3 h-3" />
          {cafe.hasOutlets ? '콘센트 있음' : '콘센트 없음'}
        </Badge>
        <Badge variant="secondary" className="gap-1">
          <Users className="w-3 h-3" />
          좌석 {cafe.seatCount}석
        </Badge>
        <Badge variant="outline">카공 추천</Badge>
      </div>
    </Card>
  );
}
