import CafeCard from './CafeCard';
import type { CafeResult } from '@shared/schema';

interface CafeResultsProps {
  cafes: CafeResult[];
  district: string;
}

export default function CafeResults({ cafes, district }: CafeResultsProps) {
  if (cafes.length === 0) {
    return null;
  }

  return (
    <section className="py-12 px-4 md:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">
          {district} 카공 추천 카페
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cafes.map(cafe => (
            <CafeCard key={cafe.id} cafe={cafe} />
          ))}
        </div>
      </div>
    </section>
  );
}
