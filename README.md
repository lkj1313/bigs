# BIGS BOARD

Vite + React + TypeScript 기반 게시판 프로젝트입니다. 폴더 구조는 **Feature-Sliced Design(FSD)** 방식으로 구성되어 있습니다.

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 미리보기

```bash
npm run preview
```

## 🔄 개발 서버 프록시 설정

개발 환경에서 CORS 문제를 해결하기 위해 Vite 프록시가 설정되어 있습니다.

- **프록시 경로**: `/api/*`
- **타겟 서버**: `https://front-mission.bigs.or.kr`
- **동작 방식**: `/api`로 시작하는 요청이 자동으로 타겟 서버로 프록시됩니다

**프록시 사용 예시:**
- 클라이언트 요청: `http://localhost:5173/api/auth/signin`
- 실제 요청: `https://front-mission.bigs.or.kr/auth/signin`

프록시 설정은 `vite.config.ts`에서 관리됩니다.

## 📦 주요 기술 스택

- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구
- **React Router** - 라우팅
- **TanStack Query (React Query)** - 서버 상태 관리
- **Zustand** - 클라이언트 상태 관리
- **Axios** - HTTP 클라이언트
- **React Hook Form + Zod** - 폼 관리 및 검증
- **Tailwind CSS** - 스타일링
- **Radix UI** - UI 컴포넌트
- **Sonner** - 토스트 알림

## 🎯 주요 기능

### 인증
- 로그인 (`/signin`)
- 회원가입 (`/signup`)
- JWT 토큰 기반 인증
- Axios 인터셉터를 통한 자동 토큰 갱신
- 로그인 상태에 따른 라우트 보호

### 게시판
- 게시글 목록 조회 (`/`)
- 게시글 상세 보기 (`/boards/:postId`)
- 게시글 작성 (`/boards/create`)
- 게시글 수정 (`/boards/:postId/edit`)
- 게시글 삭제
- 카테고리별 분류
- 이미지 첨부 지원

## 📁 폴더 구조 (FSD)

```
src/
├── app/                    # 애플리케이션 초기화
│   ├── layouts/            # 레이아웃 컴포넌트
│   │   ├── RootLayout.tsx
│   │   ├── GuestLayout.tsx  # 비로그인 전용
│   │   └── MemberLayout.tsx # 로그인 전용
│   └── providers/          # 전역 프로바이더
│       ├── router.tsx
│       └── with-query.tsx
│
├── pages/                  # 라우트 단위 페이지
│   ├── SigninPage.tsx
│   ├── SignupPage.tsx
│   ├── BoardListPage.tsx
│   ├── BoardDetailPage.tsx
│   ├── BoardCreatePage.tsx
│   └── BoardEditPage.tsx
│
├── widgets/                # 페이지 조립용 위젯
│   ├── header/
│   └── footer/
│
├── features/               # 유저 액션(유즈케이스) 단위 기능
│   ├── signin/            # 로그인하기
│   ├── signup/            # 회원가입하기
│   ├── view-board-list/   # 게시글 목록 보기
│   ├── view-board-detail/ # 게시글 상세 보기
│   ├── create-board/      # 게시글 작성하기
│   ├── edit-board/        # 게시글 수정하기
│   └── delete-board/      # 게시글 삭제하기
│
├── entities/              # 도메인(엔티티) 모델
│   ├── user/              # User 도메인 타입
│   ├── session/           # 인증 세션 (토큰/스토어)
│   └── board/             # Board 도메인
│       ├── model/         # 타입 정의
│       ├── api/           # 카테고리 조회 API
│       └── lib/            # 카테고리 유틸리티
│
└── shared/                # 공용 코드
    ├── api/               # API 설정 (base, constants)
    ├── lib/               # 유틸리티 함수
    ├── types/             # 공용 타입
    └── ui/                # 공용 UI 컴포넌트
```

## 🔑 주요 개념

### FSD (Feature-Sliced Design)
- **entities**: 비즈니스 도메인 모델 (User, Board, Session)
- **features**: 사용자 기능 단위 (로그인하기, 게시글 작성하기 등)
- **widgets**: 페이지 조립용 복합 컴포넌트
- **pages**: 라우트 단위 페이지
- **shared**: 재사용 가능한 공용 코드

### 인증 플로우
1. 로그인/회원가입 시 JWT 토큰(accessToken, refreshToken) 저장
2. `entities/session`의 `useAuthStore`로 전역 상태 관리
3. Axios 인터셉터가 모든 요청에 자동으로 Authorization 헤더 추가
4. 401 에러 시 자동으로 토큰 갱신 시도

### API 구조
- `shared/api/base.ts`: Axios 인스턴스 및 인터셉터 설정
- `shared/api/constants.ts`: React Query 키 관리
- 각 feature의 `api/` 폴더에 API 함수 정의
- 각 feature의 `model/` 폴더에 React Query 훅 정의

### React Query 키 관리
React Query의 Query Key는 `shared/api/constants.ts`에서 계층적으로 관리됩니다.

```typescript
QUERY_KEYS = {
  board: {
    all: ["board"],
    lists: () => ["board", "list"],
    list: (filters?: object) => ["board", "list", { ...filters }],
    details: () => ["board", "detail"],
    detail: (id: number) => ["board", "detail", id],
    categories: () => ["board", "categories"],
  },
}
```

**사용 예시:**
- 목록 조회: `QUERY_KEYS.board.list({ page, size })`
- 상세 조회: `QUERY_KEYS.board.detail(postId)`
- 카테고리: `QUERY_KEYS.board.categories()`
- 전체 무효화: `QUERY_KEYS.board.lists()` (모든 목록 쿼리 무효화)

### React Query 설정
- **기본 설정**: `retry: 1`, `refetchOnWindowFocus: false`
- **개발 도구**: React Query Devtools 포함 (개발 환경에서만 활성화)
- **캐시 무효화**: mutation 성공 시 관련 쿼리 자동 무효화 (`invalidateQueries`)


## 🔗 라우트 구조

```
/                    → BoardListPage (로그인 필요)
/signin              → SigninPage (비로그인 전용)
/signup              → SignupPage (비로그인 전용)
/boards/create       → BoardCreatePage (로그인 필요)
/boards/:postId      → BoardDetailPage (로그인 필요)
/boards/:postId/edit → BoardEditPage (로그인 필요)
```

## 💡 참고사항

- API Base URL은 `import.meta.env.VITE_API_BASE_URL` 환경 변수로 설정
- 로그인 상태/토큰은 `entities/session`의 `useAuthStore`로 관리
- React Query의 Query Key는 `shared/api/constants.ts`에서 중앙 관리
- 모든 import는 `@/` alias를 사용하여 절대 경로로 작성
