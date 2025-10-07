import CafeCard from '../CafeCard';

export default function CafeCardExample() {
  const mockCafe = {
    id: '1',
    name: '스타벅스 강남역점',
    address: '서울특별시 강남구 강남대로 지하 396',
    hasOutlets: true,
    seatCount: 80,
    studyRating: 4,
    link: 'https://map.naver.com'
  };

  return <CafeCard cafe={mockCafe} />;
}
