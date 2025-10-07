import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import ProblemScenarios from '@/components/ProblemScenarios';
import SearchForm from '@/components/SearchForm';
import CafeResults from '@/components/CafeResults';
import SubmissionForm from '@/components/SubmissionForm';
import Footer from '@/components/Footer';
import type { CafeResult } from '@shared/schema';

export default function Home() {
  const [searchResults, setSearchResults] = useState<CafeResult[]>([]);
  const [searchedDistrict, setSearchedDistrict] = useState('');

  const handleSearch = (district: string) => {
    setSearchedDistrict(district);
    
    // TODO: remove mock functionality
    // Mock data for demo - will be replaced with actual Naver API
    const mockResults: CafeResult[] = [
      {
        id: '1',
        name: '스타벅스 ' + district + '점',
        address: '서울특별시 ' + district + ' 테스트로 123',
        hasOutlets: true,
        seatCount: 80,
        studyRating: 4,
        link: `https://map.naver.com/v5/search/${encodeURIComponent(district + ' 카페')}`
      },
      {
        id: '2',
        name: '투썸플레이스 ' + district + '점',
        address: '서울특별시 ' + district + ' 샘플로 456',
        hasOutlets: true,
        seatCount: 60,
        studyRating: 5,
        link: `https://map.naver.com/v5/search/${encodeURIComponent(district + ' 카페')}`
      },
      {
        id: '3',
        name: '메가커피 ' + district + '점',
        address: '서울특별시 ' + district + ' 예시길 789',
        hasOutlets: false,
        seatCount: 30,
        studyRating: 3,
        link: `https://map.naver.com/v5/search/${encodeURIComponent(district + ' 카페')}`
      }
    ];
    
    setSearchResults(mockResults);
  };

  const handleSubmit = (data: any) => {
    console.log('Cafe submission:', data);
  };

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProblemScenarios />
      <SearchForm onSearch={handleSearch} />
      <CafeResults cafes={searchResults} district={searchedDistrict} />
      <SubmissionForm onSubmit={handleSubmit} />
      <Footer />
    </div>
  );
}
