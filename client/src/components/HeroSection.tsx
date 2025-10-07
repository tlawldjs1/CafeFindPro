import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import heroImage from '@assets/generated_images/Cafe_study_hero_image_b132455d.png';

export default function HeroSection() {
  return (
    <div className="relative h-[200px] md:h-[250px] overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="카페에서 공부하는 학생들" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>
      
      <Link href="/admin" className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          size="icon"
          className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white"
          data-testid="link-admin"
        >
          <Shield className="w-5 h-5" />
        </Button>
      </Link>
      
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 md:px-8 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          카공 걱정 끝!
        </h1>
        <p className="text-base md:text-lg text-white/90">
          서울 카공 최적 카페를 찾아드려요
        </p>
      </div>
    </div>
  );
}
