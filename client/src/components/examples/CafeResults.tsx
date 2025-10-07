import CafeResults from '../CafeResults';

export default function CafeResultsExample() {
  const mockCafes = [
    {
      id: '1',
      name: '스타벅스 강남역점',
      address: '서울특별시 강남구 강남대로 지하 396',
      hasOutlets: true,
      seatCount: 80,
      studyRating: 4,
      link: 'https://map.naver.com'
    },
    {
      id: '2',
      name: '투썸플레이스 역삼점',
      address: '서울특별시 강남구 테헤란로 152',
      hasOutlets: true,
      seatCount: 60,
      studyRating: 5,
      link: 'https://map.naver.com'
    },
    {
      id: '3',
      name: '카페 온리',
      address: '서울특별시 강남구 논현로 507',
      hasOutlets: false,
      seatCount: 30,
      studyRating: 3,
      link: 'https://map.naver.com'
    }
  ];

  return <CafeResults cafes={mockCafes} district="강남구" />;
}
