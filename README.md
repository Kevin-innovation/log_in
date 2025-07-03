# 🔐 DLAB Kevin's Page

**🌐 배포된 사이트**: https://log-in-seven-alpha.vercel.app

Supabase와 Google OAuth를 사용한 현대적인 인증 시스템을 구현한 Next.js 웹 애플리케이션입니다.

## 🌟 주요 기능

- ✅ **Google OAuth 로그인** - 원클릭 소셜 로그인
- ✅ **이메일/비밀번호 회원가입** - 전통적인 회원가입 방식
- ✅ **사용자 프로필 관리** - 이름, 닉네임 설정
- ✅ **다크/라이트 모드** - 테마 토글 지원
- ✅ **반응형 디자인** - 모바일 친화적 UI
- ✅ **Kevin Landing Page** - 게임 선택 대시보드

## 🚀 라이브 데모

**🌐 배포된 사이트**: https://log-in-seven-alpha.vercel.app

## 🛠 기술 스택

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Lucide React Icons
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Package Manager**: npm

## 📦 설치 및 로컬 실행

### 1. 프로젝트 클론
```bash
git clone https://github.com/Kevin-innovation/log_in.git
cd log_in
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
프로젝트 루트에 `.env.local` 파일 생성:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. 개발 서버 실행
```bash
npm run dev
```

## ⚙️ 완전한 설정 가이드

### 🗄️ 1. Supabase 프로젝트 설정

#### 1-1. 프로젝트 생성
1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. **New Project** 클릭
3. 프로젝트 이름: `log-in-app`
4. 데이터베이스 비밀번호 설정
5. 리전 선택 후 **Create new project**

#### 1-2. 데이터베이스 테이블 생성
SQL Editor에서 다음 쿼리 실행:

```sql
-- profiles 테이블 생성
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  nickname TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 사용자가 자신의 프로필만 볼 수 있도록 정책 생성
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- 사용자가 자신의 프로필을 삽입할 수 있도록 정책 생성
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 사용자가 자신의 프로필을 업데이트할 수 있도록 정책 생성
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
```

#### 1-3. API 키 확인
1. **Settings** → **API**
2. **Project URL**과 **anon public key** 복사
3. `.env.local` 파일에 추가

### 🔐 2. Google OAuth 설정

#### 2-1. Google Cloud Console 설정
1. [Google Cloud Console](https://console.cloud.google.com) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. **APIs & Services** → **Credentials**
4. **CREATE CREDENTIALS** → **OAuth client ID**
5. **Application type**: **Web application**
6. **Name**: 적절한 이름 입력

**Authorized JavaScript origins**:
```
https://your-supabase-project-id.supabase.co
https://your-vercel-domain.vercel.app
http://localhost:3000
```

**Authorized redirect URIs**:
```
https://your-supabase-project-id.supabase.co/auth/v1/callback
https://your-vercel-domain.vercel.app/auth/callback
http://localhost:3000/auth/callback
```

7. **CREATE** 클릭
8. **Client ID**와 **Client Secret** 복사

#### 2-2. Supabase Google Provider 설정
1. Supabase Dashboard → **Authentication** → **Providers**
2. **Google** 선택
3. **Enable Google** 토글 활성화
4. **Client ID**와 **Client Secret** 입력
5. **Save** 클릭

#### 2-3. Supabase 추가 설정
**Authentication** → **Settings**:
- **Site URL**: `https://your-vercel-domain.vercel.app`
- **Redirect URLs** 추가:
  ```
  https://your-vercel-domain.vercel.app/auth/callback
  https://your-vercel-domain.vercel.app/**
  ```

### 🚀 3. Vercel 배포

#### 3-1. Vercel 프로젝트 생성
1. [Vercel Dashboard](https://vercel.com) 접속
2. **New Project** → GitHub 저장소 연결
3. 프로젝트 설정 후 **Deploy**

#### 3-2. 환경 변수 설정
**Settings** → **Environment Variables**:
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon key

#### 3-3. 도메인 확인 및 OAuth 업데이트
1. 배포된 Vercel 도메인 확인
2. Google Cloud Console에서 해당 도메인을 Authorized origins/redirect URIs에 추가
3. Supabase에서 Site URL을 배포된 도메인으로 업데이트

## 🏗️ 프로젝트 구조

```
src/
├── app/
│   ├── auth/
│   │   ├── callback/page.tsx    # OAuth 콜백 처리
│   │   └── page.tsx             # 로그인/회원가입 페이지
│   ├── dashboard/page.tsx       # Kevin Landing Page
│   ├── layout.tsx               # 루트 레이아웃
│   ├── page.tsx                 # 홈페이지
│   └── globals.css              # 글로벌 스타일
├── components/
│   └── ThemeToggle.tsx          # 테마 토글 컴포넌트
├── contexts/
│   ├── AuthContext.tsx          # 인증 컨텍스트
│   └── ThemeContext.tsx         # 테마 컨텍스트
└── lib/
    └── supabase.ts              # Supabase 클라이언트 설정
```

## 🐛 트러블슈팅

### ❌ "The message port closed before a response was received"
**원인**: Google OAuth redirect URI 설정 오류
**해결**: 
1. Google Cloud Console에서 정확한 도메인을 Authorized redirect URIs에 추가
2. Supabase에서 Site URL과 Redirect URLs 정확히 설정
3. 설정 변경 후 5-10분 대기 (Google 설정 전파 시간)

### ❌ "Open Presentation Preview in Obsidian first!"
**원인**: 잘못된 redirect URI로 인해 다른 앱이 실행됨
**해결**: OAuth redirect URI를 정확한 도메인으로 수정

### ❌ 환경 변수 인식 안됨
**원인**: Vercel 환경 변수 미설정 또는 재배포 필요
**해결**: 
1. Vercel Dashboard에서 환경 변수 확인
2. 환경 변수 추가 후 재배포

## ⚠️ 중요 주의사항

1. **환경 변수 보안**: `.env.local` 파일은 절대 Git에 커밋하지 말 것
2. **Google+ API**: 더 이상 존재하지 않음. OAuth 2.0 Client ID 사용
3. **포트 충돌**: 3000포트가 사용 중이면 다른 포트 사용
4. **OAuth 설정**: 반드시 정확한 도메인으로 redirect URI 설정
5. **Supabase RLS**: Row Level Security 정책 필수 설정

## 📝 개발 히스토리

- ✅ Next.js 15 프로젝트 초기 설정
- ✅ Supabase 인증 시스템 구현
- ✅ Google OAuth 로그인 연동
- ✅ 다크/라이트 모드 구현
- ✅ 반응형 UI 디자인
- ✅ Vercel 배포 완료
- ✅ OAuth 설정 이슈 해결

## 📄 라이선스

MIT License

## 👨‍💻 개발자

**Kevin** - [GitHub](https://github.com/Kevin-innovation)

---

**🎉 성공적으로 배포된 프로젝트입니다!**
구글 로그인과 일반 회원가입이 모두 정상 작동합니다.
