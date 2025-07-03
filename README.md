# Log In App

Google 로그인과 일반 로그인을 지원하는 Next.js 웹 애플리케이션입니다.

## 기능

- 🔐 Google OAuth 로그인
- 📧 이메일/비밀번호 로그인
- 👤 사용자 프로필 관리
- 🌙 다크/라이트 모드 지원
- 🎮 게임 선택 페이지 (개발 예정)

## 환경 변수 설정

⚠️ **보안 중요**: 실제 환경 변수 값은 절대 GitHub에 업로드하지 마세요!

### 1단계: .env.local 파일 생성
프로젝트 루트에 `.env.local` 파일을 생성하고 다음 템플릿을 사용하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 2단계: 실제 값 가져오기
1. [Supabase Dashboard](https://supabase.com/dashboard)에 로그인
2. 프로젝트 선택 → **Settings** → **API**
3. **Project URL**과 **anon public key**를 복사
4. 위 템플릿의 `your-supabase-project-url`과 `your-supabase-anon-key`를 실제 값으로 교체

### 3단계: Google OAuth 설정 (선택사항)
Google 로그인을 사용하려면 Supabase에서 추가 설정이 필요합니다:
1. Supabase Dashboard → **Authentication** → **Providers**
2. **Google** 활성화 후 Client ID와 Client Secret 설정

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
