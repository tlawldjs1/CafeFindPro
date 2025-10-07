import { pgTable, text, varchar, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const searchLogs = pgTable("search_logs", {
  id: varchar("id").primaryKey(),
  district: text("district").notNull(),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull().defaultNow(),
});

export const cafeSubmissions = pgTable("cafe_submissions", {
  id: varchar("id").primaryKey(),
  cafeName: text("cafe_name").notNull(),
  cafeLocation: text("cafe_location").notNull(),
  reporterName: text("reporter_name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull().defaultNow(),
});

export const cafeClickLogs = pgTable("cafe_click_logs", {
  id: serial("id").primaryKey(),
  district: text("district").notNull(),
  cafeName: text("cafe_name").notNull(),
  cafeAddress: text("cafe_address").notNull(),
  clickedAt: timestamp("clicked_at", { withTimezone: true }).notNull().defaultNow(),
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

export const insertCafeClickLogSchema = createInsertSchema(cafeClickLogs).pick({
  district: true,
  cafeName: true,
  cafeAddress: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type SearchLog = typeof searchLogs.$inferSelect;
export type InsertSearchLog = z.infer<typeof insertSearchLogSchema>;
export type CafeSubmission = typeof cafeSubmissions.$inferSelect;
export type InsertCafeSubmission = z.infer<typeof insertCafeSubmissionSchema>;
export type CafeClickLog = typeof cafeClickLogs.$inferSelect;
export type InsertCafeClickLog = z.infer<typeof insertCafeClickLogSchema>;

export interface CafeResult {
  id: string;
  name: string;
  address: string;
  hasOutlets: boolean;
  seatCount: number;
  studyRating: number;
  link: string;
}
