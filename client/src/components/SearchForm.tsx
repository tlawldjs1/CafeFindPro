import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';

const seoulDistricts = [
  '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구',
  '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구',
  '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'
];

interface SearchFormProps {
  onSearch: (district: string) => void;
  isSearching?: boolean;
}

export default function SearchForm({ onSearch, isSearching = false }: SearchFormProps) {
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const handleSearch = () => {
    if (selectedDistrict) {
      onSearch(selectedDistrict);
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-4xl mx-auto relative">
        <div className="relative flex justify-center mb-4">
          <div className="absolute -inset-8 rounded-2xl blur-xl bg-[#1379f01a]"></div>
          <h2 className="text-3xl md:text-5xl font-bold text-center relative">
            카공하기 좋은 카페 찾기
          </h2>
        </div>
        <p className="text-center text-muted-foreground mb-10 text-lg">
          서울시 행정구역을 선택하고 검색해보세요
        </p>
        
        <Card className="p-8 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-base font-semibold mb-3">
                서울시 행정구역 선택
              </label>
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger data-testid="select-district" className="w-full h-12 text-base">
                  <SelectValue placeholder="구를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {seoulDistricts.map(district => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleSearch}
              disabled={!selectedDistrict || isSearching}
              size="lg"
              className="w-full sm:w-auto gap-2 h-12 px-8 text-base"
              data-testid="button-search"
            >
              <Search className="w-5 h-5" />
              {isSearching ? '검색 중...' : '검색하기'}
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
