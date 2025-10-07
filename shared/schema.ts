import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const searchLogs = pgTable("search_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  district: text("district").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const cafeSubmissions = pgTable("cafe_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  cafeName: text("cafe_name").notNull(),
  cafeLocation: text("cafe_location").notNull(),
  reporterName: text("reporter_name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSearchLogSchema = createInsertSchema(searchLogs).pick({
  district: true,
});

export const insertCafeSubmissionSchema = createInsertSchema(cafeSubmissions).pick({
  cafeName: true,
  cafeLocation: true,
  reporterName: true,
  phoneNumber: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type SearchLog = typeof searchLogs.$inferSelect;
export type InsertSearchLog = z.infer<typeof insertSearchLogSchema>;
export type CafeSubmission = typeof cafeSubmissions.$inferSelect;
export type InsertCafeSubmission = z.infer<typeof insertCafeSubmissionSchema>;

export interface CafeResult {
  id: string;
  name: string;
  address: string;
  hasOutlets: boolean;
  seatCount: number;
  studyRating: number;
  link: string;
}
