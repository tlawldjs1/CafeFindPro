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

      // Search queries for different types of cafes
      const searchQueries = [
        `${district} 카공카페`,
        `${district} 스터디카페`,
        `${district} 스타벅스`,
        `${district} 투썸플레이스`,
        `${district} 메가커피`,
        `${district} 카페`,
      ];

      const allResults: CafeResult[] = [];
      const seenNames = new Set<string>();

      for (const query of searchQueries) {
        try {
          const response = await fetch(
            `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(query)}&display=5`,
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
              // Remove HTML tags from name
              const cleanName = item.title.replace(/<[^>]*>/g, '');
              
              // Skip duplicates
              if (seenNames.has(cleanName)) {
                continue;
              }
              seenNames.add(cleanName);

              // Parse and clean address
              const address = item.roadAddress || item.address || '';
              
              // Determine if it has outlets (franchise cafes typically have outlets)
              const hasOutlets = ['스타벅스', '투썸', '메가커피', '이디야', '할리스', '커피빈', '파스쿠찌', '엔제리너스', '스터디'].some(
                brand => cleanName.includes(brand)
              );

              // Estimate seat count based on category
              let seatCount = 30;
              if (cleanName.includes('스터디카페')) {
                seatCount = 50;
              } else if (['스타벅스', '투썸'].some(b => cleanName.includes(b))) {
                seatCount = 60;
              }

              // Study rating based on type
              let studyRating = 3;
              if (cleanName.includes('스터디') || cleanName.includes('카공')) {
                studyRating = 5;
              } else if (['스타벅스', '투썸', '메가커피'].some(b => cleanName.includes(b))) {
                studyRating = 4;
              }

              allResults.push({
                id: item.link || `${cleanName}-${Date.now()}`,
                name: cleanName,
                address: address,
                hasOutlets,
                seatCount,
                studyRating,
                link: item.link || `https://map.naver.com/v5/search/${encodeURIComponent(cleanName + ' ' + address)}`
              });
            }
          }
        } catch (error) {
          console.error(`Error fetching from Naver API for query "${query}":`, error);
        }
      }

      // Return top 5 unique results
      const uniqueResults = allResults.slice(0, 5);
      
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
