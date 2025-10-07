import { Eye, Battery, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import scenario1 from '@assets/generated_images/Feeling_watched_scenario_illustration_6640c397.png';
import scenario2 from '@assets/generated_images/No_outlets_scenario_illustration_ceda55c3.png';
import scenario3 from '@assets/generated_images/Time_limit_scenario_illustration_b5aaa80f.png';

const scenarios = [
  {
    icon: Eye,
    image: scenario1,
    title: '눈치보이는 카공',
    description: '오래 앉아있으면 눈치가 보여서 집중이 안 돼요'
  },
  {
    icon: Battery,
    image: scenario2,
    title: '충전기가 없어 곤란',
    description: '콘센트가 없어서 노트북 배터리가 금방 닳아요'
  },
  {
    icon: Clock,
    image: scenario3,
    title: '이용 제한 시간 압박',
    description: '2시간 제한이라 공부하다 쫓겨나기 일쑤예요'
  }
];

export default function ProblemScenarios() {
  return (
    <section className="py-16 px-4 md:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          카공할 때 이런 경험 있으신가요?
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          카파인드가 해결해드릴게요
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            return (
              <Card key={index} className="p-6 text-center hover-elevate">
                <div className="w-48 h-48 mx-auto mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={scenario.image} 
                    alt={scenario.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">{scenario.title}</h3>
                </div>
                <p className="text-muted-foreground">{scenario.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
