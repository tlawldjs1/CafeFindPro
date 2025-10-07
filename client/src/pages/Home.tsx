import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import ProblemScenarios from '@/components/ProblemScenarios';
import SearchForm from '@/components/SearchForm';
import CafeResults from '@/components/CafeResults';
import CafeRankingSection from '@/components/CafeRankingSection';
import SubmissionForm from '@/components/SubmissionForm';
import Footer from '@/components/Footer';
import type { CafeResult } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const { toast } = useToast();
  const [searchResults, setSearchResults] = useState<CafeResult[]>([]);
  const [searchedDistrict, setSearchedDistrict] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (district: string) => {
    setSearchedDistrict(district);
    setIsSearching(true);
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ district }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: '검색 실패',
        description: '카페 검색 중 오류가 발생했습니다.',
        variant: 'destructive'
      });
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/submit-cafe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      toast({
        title: '제보 완료',
        description: '카페 정보가 성공적으로 제출되었습니다.'
      });
    } catch (error) {
      console.error('Submit error:', error);
      toast({
        title: '제보 실패',
        description: '카페 제보 중 오류가 발생했습니다.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProblemScenarios />
      <SearchForm onSearch={handleSearch} isSearching={isSearching} />
      <CafeResults cafes={searchResults} district={searchedDistrict} />
      <CafeRankingSection />
      <SubmissionForm onSubmit={handleSubmit} />
      <Footer />
    </div>
  );
}
