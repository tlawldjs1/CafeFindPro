import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSearchLogSchema, insertCafeSubmissionSchema, type CafeResult } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Naver Search API endpoint
  app.post("/api/search", async (req, res) => {
    try {
      const { district } = z.object({ district: z.string() }).parse(req.body);
      
      // Save search log to database
      await storage.createSearchLog({ district });

      const clientId = process.env.NAVER_CLIENT_ID;
      const clientSecret = process.env.NAVER_CLIENT_SECRET;

      if (!clientId || !clientSecret) {
        return res.status(500).json({ error: "Naver API credentials not configured" });
      }

      // Search queries for different types of cafes (프랜차이즈와 스터디카페 우선)
      const searchQueries = [
        `${district} 스터디카페`,
        `${district} 스타벅스`,
        `${district} 투썸플레이스`,
        `${district} 메가커피`,
        `${district} 이디야`,
        `${district} 할리스`,
        `${district} 카공카페`,
        `${district} 감성카페`,
        `${district} 카페`,
      ];

      const priorityResults: CafeResult[] = [];
      const fallbackResults: CafeResult[] = [];
      const seenIds = new Set<string>();

      for (const query of searchQueries) {
        try {
          const response = await fetch(
            `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(query)}&display=15`,
            {
              headers: {
                'X-Naver-Client-Id': clientId,
                'X-Naver-Client-Secret': clientSecret,
              },
            }
          );

          if (!response.ok) {
            console.error(`Naver API error for query "${query}":`, response.statusText);
            continue;
          }

          const data = await response.json();
          
          if (data.items && Array.isArray(data.items)) {
            for (const item of data.items) {
              // HTML 태그 제거 및 HTML 엔티티 디코딩
              let cleanName = item.title.replace(/<[^>]*>/g, '');
              cleanName = cleanName
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'");
              
              const address = item.roadAddress || item.address || '';
              
              const uniqueId = `${cleanName}-${address}`;
              if (seenIds.has(uniqueId)) {
                continue;
              }
              seenIds.add(uniqueId);

              // 콘센트 여부: 프랜차이즈와 스터디카페는 대부분 있음
              const hasOutlets = ['스타벅스', '투썸', '메가커피', '이디야', '할리스', '커피빈', '파스쿠찌', '엔제리너스', '스터디', '카공'].some(
                brand => cleanName.includes(brand)
              );

              // 좌석 수: 카페 유형에 따라 다양하게 설정
              let seatCount = 25;
              if (cleanName.includes('스터디카페')) {
                seatCount = 50;
              } else if (cleanName.includes('스타벅스')) {
                seatCount = 60;
              } else if (cleanName.includes('투썸플레이스') || cleanName.includes('투썸')) {
                seatCount = 55;
              } else if (cleanName.includes('메가커피')) {
                seatCount = 35;
              } else if (['이디야', '할리스', '커피빈', '파스쿠찌'].some(b => cleanName.includes(b))) {
                seatCount = 40;
              } else if (cleanName.includes('카공') || cleanName.includes('공부')) {
                seatCount = 45;
              }

              let studyRating = 3;
              if (cleanName.includes('스터디') || cleanName.includes('카공')) {
                studyRating = 5;
              } else if (['스타벅스', '투썸', '메가커피'].some(b => cleanName.includes(b))) {
                studyRating = 4;
              }

              const cafeResult: CafeResult = {
                id: uniqueId,
                name: cleanName,
                address: address,
                hasOutlets,
                seatCount,
                studyRating,
                link: `https://map.naver.com/v5/search/${encodeURIComponent(cleanName)}`
              };

              // Prioritize results with district in address
              if (address.includes(district)) {
                priorityResults.push(cafeResult);
              } else {
                fallbackResults.push(cafeResult);
              }
            }
          }
        } catch (error) {
          console.error(`Error fetching from Naver API for query "${query}":`, error);
        }
      }

      // Combine priority results first, then fallback if needed
      const combinedResults = [...priorityResults, ...fallbackResults];
      const uniqueResults = combinedResults.slice(0, 8);
      
      res.json(uniqueResults);
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ error: "Search failed" });
    }
  });

  // Submit cafe endpoint
  app.post("/api/submit-cafe", async (req, res) => {
    try {
      const validated = insertCafeSubmissionSchema.parse(req.body);
      const submission = await storage.createCafeSubmission(validated);
      res.json(submission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Submit cafe error:", error);
      res.status(500).json({ error: "Failed to submit cafe" });
    }
  });

  // Admin login endpoint
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = z.object({
        username: z.string(),
        password: z.string()
      }).parse(req.body);

      if (username === "admin" && password === "000000") {
        res.json({ success: true });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });

  // Get search logs endpoint
  app.get("/api/admin/search-logs", async (req, res) => {
    try {
      const logs = await storage.getAllSearchLogs();
      res.json(logs);
    } catch (error) {
      console.error("Get search logs error:", error);
      res.status(500).json({ error: "Failed to fetch search logs" });
    }
  });

  // Get cafe submissions endpoint
  app.get("/api/admin/cafe-submissions", async (req, res) => {
    try {
      const submissions = await storage.getAllCafeSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Get cafe submissions error:", error);
      res.status(500).json({ error: "Failed to fetch cafe submissions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
