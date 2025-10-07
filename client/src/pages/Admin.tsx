import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import type { SearchLog, CafeSubmission, CafeClickLog } from '@shared/schema';

export default function Admin() {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [searchLogs, setSearchLogs] = useState<SearchLog[]>([]);
  const [submissions, setSubmissions] = useState<CafeSubmission[]>([]);
  const [cafeClickLogs, setCafeClickLogs] = useState<CafeClickLog[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      const [logsRes, submissionsRes, clickLogsRes] = await Promise.all([
        fetch('/api/admin/search-logs'),
        fetch('/api/admin/cafe-submissions'),
        fetch('/api/admin/cafe-click-logs')
      ]);

      if (logsRes.ok) {
        const logs = await logsRes.json();
        setSearchLogs(logs);
      }

      if (submissionsRes.ok) {
        const subs = await submissionsRes.json();
        setSubmissions(subs);
      }

      if (clickLogsRes.ok) {
        const clickLogs = await clickLogsRes.json();
        setCafeClickLogs(clickLogs);
      }
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        toast({
          title: '로그인 성공',
          description: '관리자 페이지에 접속했습니다.'
        });
      } else {
        toast({
          title: '로그인 실패',
          description: '아이디 또는 비밀번호가 올바르지 않습니다.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: '로그인 실패',
        description: '로그인 중 오류가 발생했습니다.',
        variant: 'destructive'
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-muted/30">
        <Card className="w-full max-w-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">관리자 로그인</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">아이디</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                data-testid="input-username"
              />
            </div>
            <div>
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="000000"
                required
                data-testid="input-password"
              />
            </div>
            <Button type="submit" className="w-full" data-testid="button-login">
              로그인
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">관리자 대시보드</h1>
          <Button 
            variant="outline" 
            onClick={() => setIsAuthenticated(false)}
            data-testid="button-logout"
          >
            로그아웃
          </Button>
        </div>

        <Tabs defaultValue="searches" className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="searches" data-testid="tab-searches">검색 로그</TabsTrigger>
            <TabsTrigger value="submissions" data-testid="tab-submissions">카페 제보</TabsTrigger>
            <TabsTrigger value="clicks" data-testid="tab-clicks">카페 클릭</TabsTrigger>
          </TabsList>

          <TabsContent value="searches" className="mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">검색 로그</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">구역</th>
                      <th className="text-left py-3 px-4">검색 시간</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchLogs.length === 0 ? (
                      <tr>
                        <td colSpan={2} className="py-8 text-center text-muted-foreground">
                          검색 기록이 없습니다
                        </td>
                      </tr>
                    ) : (
                      searchLogs.map((log) => (
                        <tr key={log.id} className="border-b" data-testid={`row-search-${log.id}`}>
                          <td className="py-3 px-4">{log.district}</td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {new Date(log.timestamp).toLocaleString('ko-KR')}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="submissions" className="mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">카페 제보 목록</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">카페명</th>
                      <th className="text-left py-3 px-4">위치</th>
                      <th className="text-left py-3 px-4">제보자</th>
                      <th className="text-left py-3 px-4">연락처</th>
                      <th className="text-left py-3 px-4">제보 시간</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-muted-foreground">
                          제보된 카페가 없습니다
                        </td>
                      </tr>
                    ) : (
                      submissions.map((submission) => (
                        <tr key={submission.id} className="border-b" data-testid={`row-submission-${submission.id}`}>
                          <td className="py-3 px-4">{submission.cafeName}</td>
                          <td className="py-3 px-4">{submission.cafeLocation}</td>
                          <td className="py-3 px-4">{submission.reporterName}</td>
                          <td className="py-3 px-4">{submission.phoneNumber}</td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {new Date(submission.timestamp).toLocaleString('ko-KR')}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="clicks" className="mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">카페 클릭 로그</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">구역</th>
                      <th className="text-left py-3 px-4">카페명</th>
                      <th className="text-left py-3 px-4">주소</th>
                      <th className="text-left py-3 px-4">클릭 시간</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cafeClickLogs.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-muted-foreground">
                          클릭 기록이 없습니다
                        </td>
                      </tr>
                    ) : (
                      cafeClickLogs.map((log) => (
                        <tr key={log.id} className="border-b" data-testid={`row-click-${log.id}`}>
                          <td className="py-3 px-4">{log.district}</td>
                          <td className="py-3 px-4">{log.cafeName}</td>
                          <td className="py-3 px-4">{log.cafeAddress}</td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {new Date(log.clickedAt).toLocaleString('ko-KR')}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
