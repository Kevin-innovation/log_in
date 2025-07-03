# Log In App

Google 로그인과 일반 로그인을 지원하는 Next.js 웹 애플리케이션입니다.

## 기능

- 🔐 Google OAuth 로그인
- 📧 이메일/비밀번호 로그인
- 👤 사용자 프로필 관리
- 🌙 다크/라이트 모드 지원
- 🎮 게임 선택 페이지 (개발 예정)

## 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=https://inwjcarydychemrxyoxz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlud2pjYXJ5ZHljaGVtcnh5b3h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MTM2NTUsImV4cCI6MjA2NzA4OTY1NX0.WyU3_ol7fZsYrInLAQC0IICR77jAz-YlyL6PkFApAlc
```

## 개발 서버 실행

```bash
npm install
npm run dev
```

## 배포

이 프로젝트는 Vercel에 배포할 수 있습니다:

```bash
npm run build
```

## 기술 스택

- **프론트엔드**: Next.js 15, React, TypeScript
- **스타일링**: Tailwind CSS
- **인증**: Supabase Auth
- **데이터베이스**: Supabase (PostgreSQL)
- **배포**: Vercel
