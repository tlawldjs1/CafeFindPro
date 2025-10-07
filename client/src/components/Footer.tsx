export default function Footer() {
  return (
    <footer className="bg-card border-t py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">카파인드</h3>
            <p className="text-muted-foreground mb-4">
              서울 카공 최적 카페 찾기 서비스
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">사업자 정보</h4>
            <dl className="space-y-2 text-sm text-muted-foreground">
              <div>
                <dt className="inline font-medium">사업자명:</dt>
                <dd className="inline ml-2">카파인드</dd>
              </div>
              <div>
                <dt className="inline font-medium">개인정보책임자:</dt>
                <dd className="inline ml-2">심지언</dd>
              </div>
              <div>
                <dt className="inline font-medium">주소:</dt>
                <dd className="inline ml-2">성북구 정릉로 77 국민대학교 경영관</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 카파인드. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
