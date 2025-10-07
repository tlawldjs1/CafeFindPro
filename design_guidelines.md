# Design Guidelines for 카파인드 (CaFind) - Seoul Cafe Finder

## Design Approach: Reference-Based (Existing Template)
**Primary Direction**: Maintain the existing design and template from https://cafefindpro.onrender.com/ while adding new functionality

## Target Audience & Aesthetic
**User Persona**: Early-to-mid 20s Korean college students  
**Design Philosophy**: Sophisticated, clean, and refined aesthetic that resonates with young adults seeking study-friendly cafes

## Core Design Elements

### A. Color Palette
- Maintain the existing color scheme from the reference site
- Ensure colors appeal to the college student demographic
- Use colors that convey trust and reliability for a location-based service

### B. Typography
- Korean language support is essential (UTF-8 encoding)
- Clean, modern fonts suitable for both Korean and English text
- Hierarchy: Clear distinction between headings, body text, and UI labels

### C. Layout System
**Spacing**: Use Tailwind spacing utilities consistently (p-2, p-4, p-6, p-8, m-4, etc.)
**Container Structure**: 
- Max-width containers for content sections
- Mobile-first responsive approach

### D. Key Components

**1. Landing Page Problem Scenarios Section**
- Highlight relatable student struggles:
  - 눈치보이는 카공 (Feeling watched while studying)
  - 충전기가 없어 곤란 (No outlets/charging available)
  - 이용 제한 시간 압박 (Time limit pressure)
- Visual cards or illustrations for each scenario
- Empathetic, conversational tone

**2. Location Search Form**
- Two-tier dropdown system:
  - Primary: 서울시 (Seoul City)
  - Secondary: 25 administrative districts selector
- Prominent "검색하기" (Search) button
- Clear, intuitive form layout

**3. Cafe Result Cards (3-5 displayed)**
Display elements per card:
- Cafe name (카페 이름)
- Full address (주소)
- Outlet availability indicator (콘센트 여부)
- Seat count (좌석 수)
- Study suitability rating (카공 적합 여부 - 5-star display)
- Clickable cards linking to Naver Map

**4. Cafe Submission Form (Bottom)**
Input fields:
- 카페 이름 (Cafe Name)
- 카페 위치 (Cafe Location)
- 제보자 이름 (Reporter Name)
- 전화번호 (Phone Number)
- Clear submit button

**5. Footer Section**
Business information display:
- 사업자명: 카파인드
- 개인정보책임자: 심지언  
- 주소: 성북구 정릉로 77 국민대학교 경영관
- Additional legal/privacy links as needed

**6. Admin Dashboard**
- Login gate (admin/000000)
- Two data tables:
  - Search logs display
  - Cafe submissions display
- Clean, tabular data presentation
- Real-time database integration

### E. Mobile Responsiveness
- Tailwind CSS responsive utilities (sm:, md:, lg:, xl:)
- Touch-friendly button sizes (minimum 44px tap targets)
- Optimized layout stacking for mobile viewports
- Readable font sizes on all devices

### F. Interactive States
- Clear hover states for clickable cards
- Button states (default, hover, active, disabled)
- Form validation feedback (success/error states)
- Loading states during API calls

## Images
**Hero Section**: Feature an aspirational image showing students studying comfortably in a modern cafe environment - natural lighting, laptops, coffee, productive atmosphere

**Problem Scenario Section**: Use illustrative icons or lifestyle photography showing the pain points students face

## Design Consistency Notes
- Match all visual treatments to the existing reference site
- Maintain brand consistency across all new features
- Keep the existing navigation and header structure intact
- Ensure seamless integration of new components with existing design language