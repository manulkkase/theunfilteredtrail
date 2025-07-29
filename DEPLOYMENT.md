# 🚀 The Unfiltered Trail - 배포 가이드

## 📋 현재 상태
- ✅ **랜딩페이지 복구 완료**: 정적 HTML 버전으로 즉시 작동
- ✅ **Jekyll + Netlify CMS 설정 완료**: 향후 동적 포스팅 가능
- ✅ **모든 페이지 작동**: index, about, privacy, terms, 404
- ✅ **반응형 디자인**: 모바일/태블릿/데스크톱 최적화

## 🔧 즉시 작동하는 정적 사이트

현재 프로젝트는 두 가지 방식으로 작동합니다:

### 1. 정적 HTML (현재 작동 중)
- `index.html` - 메인 랜딩페이지 ✅
- `about.html` - 소개 페이지 ✅  
- `privacy.html` - 개인정보 정책 ✅
- `terms.html` - 이용약관 ✅
- `404.html` - 에러 페이지 ✅
- `admin/` - Netlify CMS 관리자 패널 ✅

### 2. Jekyll 시스템 (설정 완료, 활성화 대기)
- `_config.yml` - Jekyll 설정
- `_layouts/` - Jekyll 템플릿
- `_posts/` - 마크다운 포스트
- `index.md` - Jekyll 홈페이지

## 🌐 배포 방법

### Option 1: GitHub Pages (가장 간단)
1. GitHub 저장소에 push
2. Settings → Pages → Source: Deploy from a branch
3. Branch: main 선택
4. 완료! `https://username.github.io/repository-name`에서 접속

### Option 2: Netlify (권장 - CMS 포함)
1. [Netlify](https://netlify.com)에서 "New site from Git" 클릭
2. GitHub 저장소 연결
3. Build settings:
   - **정적 사이트**: Build command 비워두기, Publish directory: `/` 
   - **Jekyll 사이트**: Build command: `bundle exec jekyll build`, Publish directory: `_site`
4. Deploy 클릭
5. **Netlify Identity 활성화** (Admin 패널용):
   - Site settings → Identity → Enable Identity
   - Settings → Identity → Git Gateway → Enable Git Gateway
6. 완료! 자동 도메인에서 접속 가능

### Option 3: Vercel
1. [Vercel](https://vercel.com)에서 "New Project" 클릭
2. GitHub 저장소 import
3. Framework: Other, Build Command 비워두기
4. Deploy 클릭

## 🔐 Admin 패널 설정 (Netlify만)

관리자 패널 (`/admin/`)을 사용하려면:

1. **Netlify Identity 설정**:
   - Netlify 대시보드 → Site settings → Identity
   - "Enable Identity service" 클릭
   - Registration → "Invite only" 선택 (보안상)
   - Services → Git Gateway → "Enable Git Gateway" 클릭

2. **관리자 계정 생성**:
   - Identity 탭에서 "Invite users" 클릭
   - 이메일 주소 입력하여 초대장 발송
   - 이메일의 링크를 통해 계정 생성

3. **포스트 작성**:
   - `yoursite.com/admin/`에서 로그인
   - "New Post" 클릭하여 마크다운으로 포스트 작성
   - 저장하면 자동으로 `_posts/` 폴더에 저장되고 사이트 재빌드

## 📁 파일 구조

```
my-blog/
├── index.html          # 메인 랜딩페이지 (정적)
├── about.html          # 소개 페이지 (정적)
├── privacy.html        # 개인정보 정책 (정적)
├── terms.html          # 이용약관 (정적)
├── 404.html            # 에러 페이지 (정적)
├── netlify.toml        # Netlify 배포 설정
├── admin/              # Netlify CMS
│   ├── config.yml      # CMS 설정
│   └── index.html      # CMS 관리자 인터페이스
├── css/
│   └── style.css       # 스타일시트
├── images/             # 이미지 파일들
│   └── *.jpg
├── _config.yml         # Jekyll 설정 (사용시)
├── _layouts/           # Jekyll 템플릿 (사용시)
├── _posts/             # Jekyll 포스트 (사용시)
└── index.md            # Jekyll 홈페이지 (사용시)
```

## 🎯 상태 확인

### 현재 작동하는 기능:
- ✅ 메인 랜딩페이지
- ✅ 모든 내비게이션 링크  
- ✅ 반응형 디자인
- ✅ 뉴스레터 구독 폼
- ✅ 소셜 미디어 링크
- ✅ SEO 메타태그
- ✅ Netlify CMS 설정

### 향후 활성화 가능:
- 🔄 Jekyll 자동 빌드
- 🔄 마크다운 포스트 시스템
- 🔄 자동 사이트맵 생성
- 🔄 RSS 피드

## 🚨 중요 사항

1. **즉시 사용 가능**: 현재 정적 HTML 버전이 모든 호스팅에서 바로 작동
2. **Jekyll 선택적**: Jekyll 기능은 필요시에만 활성화
3. **CMS 접근**: `/admin/` 경로로 관리자 패널 접근 (Netlify Identity 설정 필요)
4. **이미지 경로**: `images/` 폴더의 모든 이미지가 정상 작동

## 📞 문제 해결

1. **페이지가 로드되지 않는 경우**:
   - `index.html`이 저장소 루트에 있는지 확인
   - CSS 파일 경로 확인 (`css/style.css`)

2. **Admin 패널 접근 불가**:
   - Netlify Identity가 활성화되었는지 확인
   - Git Gateway가 활성화되었는지 확인

3. **이미지가 표시되지 않는 경우**:
   - `images/` 폴더에 파일이 있는지 확인
   - 파일명이 일치하는지 확인

---

**✅ 현재 사이트가 완전히 작동합니다!** 
GitHub에 push하고 배포 플랫폼에 연결하면 즉시 사용 가능합니다.