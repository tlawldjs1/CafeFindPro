# 카파인드 (CaFind) - Seoul Cafe Finder

## Overview
A cafe finder service for students in Seoul looking for study-friendly cafes (카공). The application uses the Naver Search API to find cafes and displays information about outlets, seating capacity, and study suitability.

## Recent Changes (October 2024)
- Implemented Naver Search API integration with multiple search queries
- Added PostgreSQL database for storing search logs and cafe submissions
- Created admin dashboard for viewing user activity
- Removed placeholder images, using icons instead
- Implemented district-based filtering with fallback logic

## Project Architecture

### Frontend (React + Tailwind)
- **Home Page**: Landing page with hero section, problem scenarios, search form, results display, and submission form
- **Admin Page**: Dashboard for viewing search logs and cafe submissions
- Korean language support with Noto Sans KR font
- Mobile-responsive design

### Backend (Express + TypeScript)
- **Naver Search API**: Searches for cafes across multiple categories (study cafes, franchises, independent cafes)
- **Database**: PostgreSQL (Neon) for permanent storage of search logs and submissions
- **Admin Authentication**: Hardcoded credentials (admin/000000) as per requirements

### Key Features
1. **Search Functionality**
   - District-based search (25 Seoul districts)
   - Multiple query types: 카공카페, 스터디카페, 스타벅스, 투썸플레이스, 메가커피
   - Priority + fallback result system for better coverage
   
2. **Cafe Information**
   - Outlet availability (콘센트 여부)
   - Seat count estimate (좌석 수)
   - Study suitability rating (카공 적합 여부, 5-star)
   - Direct Naver Map links

3. **Database Storage**
   - All search queries logged with timestamp
   - Cafe submissions permanently stored
   - Admin can view real-time data

4. **Admin Dashboard**
   - Login: admin / 000000
   - View search logs
   - View cafe submissions

## Technical Stack
- **Frontend**: React, Tailwind CSS, Wouter (routing), TanStack Query
- **Backend**: Express, TypeScript
- **Database**: PostgreSQL (Neon), Drizzle ORM
- **API**: Naver Search API (Local Search)

## Environment Variables
- `NAVER_CLIENT_ID`: Naver API client ID
- `NAVER_CLIENT_SECRET`: Naver API client secret
- `DATABASE_URL`: PostgreSQL connection string

## Business Information
- **사업자명**: 카파인드
- **개인정보책임자**: 심지언
- **주소**: 성북구 정릉로 77 국민대학교 경영관
