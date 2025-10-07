import heroImage from '@assets/generated_images/Cafe_study_hero_image_b132455d.png';

export default function HeroSection() {
  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="카페에서 공부하는 학생들" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>
      
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 md:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          카공 걱정 끝!
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8">
          서울 카공 최적 카페를 찾아드려요
        </p>
        <p className="text-base md:text-lg text-white/80">
          콘센트, 좌석 수, 이용시간 제한까지<br />
          카공에 필요한 모든 정보를 한눈에
        </p>
      </div>
    </div>
  );
}
