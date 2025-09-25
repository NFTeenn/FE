# NFTeen - 청소년을 위한 NFT 플랫폼

## 🚀 기술 스택

- **Next.js** - v14 (App Router)
- **TypeScript**
- **Tailwind CSS** - v4
- **PWA** - @ducanh2912/next-pwa
- **Biome** - Linting & Formatting

## 📁 프로젝트 구조 (FSD 아키텍처)

```
src/
├── app/                  # Next.js 14.2 App Router
│   ├── layout.tsx       # 루트 레이아웃
│   └── page.tsx         # 루트 페이지 (메인 페이지지)
│
├── entities/            # 비즈니스 엔티티 (User, 등등)
│   ├── user/
│   
│
├── features/            # 기능 모듈
│   ├── auth/
│   └── profile/
│
├── widgets/             # 독립적인 위젯 컴포넌트
│   ├── header/
│   └── sidebar/
│
└── shared/              # 공유 리소스
    ├── api/            # API 클라이언트, 인터셉터
    ├── assets/         # 정적 에셋
    ├── config/         # 전역 설정
    ├── lib/            # 유틸리티 함수
    └── ui/             # UI 컴포넌트
```
### Axios

## 🛠️ 개발 환경 설정

1. **의존성 설치**
   ```bash
   npm install
   # 또는
   yarn install
   ```


2. **개발 서버 실행**
   ```bash
   npm run dev
   # 또는
   yarn dev
   ```
   앱은 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

3. **프로덕션 빌드**
   ```bash
   npm run build
   npm start
   ```

## 🧩 기능

- 사용자 인증(Google OAuth)
- 경제 퀴즈
- 명예의 전당
- 경제 단어사전
- 경제 뉴스

## 📝 코드 컨벤션

- **컴포넌트**: PascalCase (예: `UserProfile.tsx`)
- **함수/변수**: camelCase
- **상수**: UPPER_SNAKE_CASE
- **인터페이스**: `I` 접두사 (예: `IUser`)
- **스타일**: Tailwind CSS 우선, 필요한 경우 CSS 모듈 사용

## 🛡️ 라이센스

MIT

### React-Hook-Form

### Zod

### Tanstack-Query
