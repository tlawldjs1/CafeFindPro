import { Eye, Battery, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

const scenarios = [
  {
    icon: Eye,
    title: '눈치보이는 카공',
    description: '오래 앉아있으면 눈치가 보여서 집중이 안 돼요'
  },
  {
    icon: Battery,
    title: '충전기가 없어 곤란',
    description: '콘센트가 없어서 노트북 배터리가 금방 닳아요'
  },
  {
    icon: Clock,
    title: '이용 제한 시간 압박',
    description: '2시간 제한이라 공부하다 쫓겨나기 일쑤예요'
  }
];

export default function ProblemScenarios() {
  return (
    <section className="py-12 px-4 md:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          카공할 때 이런 경험 있으신가요?
        </h2>
        <p className="text-center text-muted-foreground mb-8 text-sm md:text-base">
          카파인드가 해결해드릴게요
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            return (
              <Card key={index} className="p-6 text-center hover-elevate">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{scenario.title}</h3>
                <p className="text-sm text-muted-foreground">{scenario.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
