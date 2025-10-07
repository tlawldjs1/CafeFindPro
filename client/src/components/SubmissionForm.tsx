import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SubmissionFormProps {
  onSubmit: (data: {
    cafeName: string;
    cafeLocation: string;
    reporterName: string;
    phoneNumber: string;
  }) => void;
}

export default function SubmissionForm({ onSubmit }: SubmissionFormProps) {
  const [formData, setFormData] = useState({
    cafeName: '',
    cafeLocation: '',
    reporterName: '',
    phoneNumber: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      cafeName: '',
      cafeLocation: '',
      reporterName: '',
      phoneNumber: ''
    });
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          카페 제보하기
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          카공하기 좋은 카페를 알려주세요
        </p>

        <Card className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="cafeName">카페 이름</Label>
                <Input
                  id="cafeName"
                  value={formData.cafeName}
                  onChange={(e) => setFormData({ ...formData, cafeName: e.target.value })}
                  placeholder="예: 스타벅스 강남역점"
                  required
                  data-testid="input-cafe-name"
                />
              </div>
              <div>
                <Label htmlFor="cafeLocation">카페 위치</Label>
                <Input
                  id="cafeLocation"
                  value={formData.cafeLocation}
                  onChange={(e) => setFormData({ ...formData, cafeLocation: e.target.value })}
                  placeholder="예: 서울특별시 강남구"
                  required
                  data-testid="input-cafe-location"
                />
              </div>
              <div>
                <Label htmlFor="reporterName">제보자 이름</Label>
                <Input
                  id="reporterName"
                  value={formData.reporterName}
                  onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                  placeholder="이름을 입력하세요"
                  required
                  data-testid="input-reporter-name"
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">전화번호</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="010-0000-0000"
                  required
                  data-testid="input-phone-number"
                />
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full" data-testid="button-submit-cafe">
              제보하기
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
