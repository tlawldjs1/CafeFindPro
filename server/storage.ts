import { 
  users, 
  searchLogs, 
  cafeSubmissions,
  cafeClickLogs,
  type User, 
  type InsertUser,
  type SearchLog,
  type InsertSearchLog,
  type CafeSubmission,
  type InsertCafeSubmission,
  type CafeClickLog,
  type InsertCafeClickLog
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface CafeRanking {
  cafeName: string;
  cafeAddress: string;
  clickCount: number;
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createSearchLog(log: InsertSearchLog): Promise<SearchLog>;
  getAllSearchLogs(): Promise<SearchLog[]>;
  
  createCafeSubmission(submission: InsertCafeSubmission): Promise<CafeSubmission>;
  getAllCafeSubmissions(): Promise<CafeSubmission[]>;
  
  createCafeClickLog(log: InsertCafeClickLog): Promise<CafeClickLog>;
  getCafeClickLogs(): Promise<CafeClickLog[]>;
  getTopCafes(limit: number): Promise<CafeRanking[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({ ...insertUser, id: randomUUID() })
      .returning();
    return user;
  }

  async createSearchLog(log: InsertSearchLog): Promise<SearchLog> {
    const [searchLog] = await db
      .insert(searchLogs)
      .values({ ...log, id: randomUUID() })
      .returning();
    return searchLog;
  }

  async getAllSearchLogs(): Promise<SearchLog[]> {
    return await db.select().from(searchLogs).orderBy(desc(searchLogs.timestamp));
  }

  async createCafeSubmission(submission: InsertCafeSubmission): Promise<CafeSubmission> {
    const [cafeSubmission] = await db
      .insert(cafeSubmissions)
      .values({ ...submission, id: randomUUID() })
      .returning();
    return cafeSubmission;
  }

  async getAllCafeSubmissions(): Promise<CafeSubmission[]> {
    return await db.select().from(cafeSubmissions).orderBy(desc(cafeSubmissions.timestamp));
  }

  async createCafeClickLog(log: InsertCafeClickLog): Promise<CafeClickLog> {
    const [clickLog] = await db
      .insert(cafeClickLogs)
      .values(log)
      .returning();
    return clickLog;
  }

  async getCafeClickLogs(): Promise<CafeClickLog[]> {
    return await db.select().from(cafeClickLogs).orderBy(desc(cafeClickLogs.clickedAt));
  }

  async getTopCafes(limit: number): Promise<CafeRanking[]> {
    const result = await db
      .select({
        cafeName: cafeClickLogs.cafeName,
        cafeAddress: cafeClickLogs.cafeAddress,
        clickCount: sql<number>`count(*)::int`,
      })
      .from(cafeClickLogs)
      .groupBy(cafeClickLogs.cafeName, cafeClickLogs.cafeAddress)
      .orderBy(desc(sql`count(*)`))
      .limit(limit);
    
    return result;
  }
}

export const storage = new DatabaseStorage();
