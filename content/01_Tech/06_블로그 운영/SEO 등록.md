
## 1. Google 검색 등록 (Google Search Console)

![https://seranking.com/blog/wp-content/uploads/2023/06/Add-a-new-sitemap-2048x1176.png](https://tse1.mm.bing.net/th/id/OIP.QZbGAyGY4ymKBkvIlbPIFgHaEQ?w=474&h=379&c=7&p=0)

![https://wpadvancedads.com/wp-content/uploads/2024/07/google-search-console-html-tag.png](https://tse1.mm.bing.net/th/id/OIP.sor15fAQtYlhypMR5DVhzgHaE3?w=474&h=379&c=7&p=0)

### ① Search Console 접속

- [https://search.google.com/search-console](https://search.google.com/search-console)

### ② 속성 추가

**권장:** `URL 접두어`

`https://https://second-brain-7tz.pages.dev/`

### ③ 소유권 확인 (가장 쉬운 방법)

- **HTML meta 태그 방식**

Search Console에서 제공하는 태그:

`<meta name="google-site-verification" content="xxxx" />`

➡ Quartz 설정 위치:  
`quartz.config.ts`

`head: {   meta: [     { name: "google-site-verification", content: "xxxx" },   ], }`

배포 후 확인 클릭.

### ④ Sitemap 등록

Search Console → **Sitemaps**

`/sitemap.xml`

## 2. robots.txt + google analytics
### 1. robots.txt 설정 (검색엔진 제어)

#### ① 기본 권장 robots.txt

Quartz 프로젝트 루트에 파일 생성:

`robots.txt`

내용:

`User-agent: * Allow: /  Sitemap: https://your-domain.com/sitemap.xml`

이 설정이면:

- Google / Naver 모두 크롤링 허용
    
- sitemap 위치 명시 → 색인 안정화
#### ③ 배포 후 확인

브라우저에서:

`https://your-domain.com/robots.txt`

열리면 정상

---

### 2. Google Analytics (GA4) 연결

#### ① GA4 속성 생성

- https://analytics.google.com
    
- **GA4 속성** 생성
    
- 측정 ID 확인:
    

`G-XXXXXXXXXX`

---

#### ② Quartz에 GA4 연결 (권장 방식)

`quartz.config.ts`

`analytics: {   provider: "google",   tagId: "G-XXXXXXXXXX", }`

→ Quartz가 `<head>`에 자동 삽입  
→ 모든 페이지 추적됨


## 3. 네이버 검색 등록 (네이버 서치어드바이저)

![https://developers.naver.com/proxyapi/rawgit/naver/naver-openapi-guide/master/ko/products/login/userguide/images/img_intro_naveridlogin05.png](https://tse2.mm.bing.net/th/id/OIP.UcSucwvGdpGKod86ZeU4vAHaD_?w=474&h=379&c=7&p=0)

![https://developers.naver.com/proxyapi/rawgit/naver/naver-openapi-guide/master/ko/login/overview/images/img_naverid02.png](https://tse2.mm.bing.net/th/id/OIP.82CcRNENoft3XM5GQM4MuwHaFo?cb=ucfimg2&ucfimg=1&w=474&h=379&c=7&p=0)

### ① 서치어드바이저 접속

- [https://searchadvisor.naver.com](https://searchadvisor.naver.com)
    

### ② 사이트 등록

`https://second-brain-7tz.pages.dev/`

### ③ 소유 확인 (HTML meta 태그)

`<meta name="naver-site-verification" content="xxxx" />`

➡ `quartz.config.ts` 동일 위치에 추가:

`head: {   meta: [     { name: "naver-site-verification", content: "xxxx" },   ], }`

### ④ 사이트맵 제출

- 요청 → 사이트맵 제출


`https://your-domain.com/sitemap.xml`

## 4. Quartz SEO 필수 설정
### `quartz.config.ts`

`site: {   title: "블로그 제목",   description: "블로그 설명 (검색 결과에 노출됨)",   siteUrl: "https://your-domain.com",   lang: "ko-KR", }`

### 각 노트 상단 Frontmatter

`--- title: 옵시디언 블로그 SEO 설정 description: Quartz 기반 옵시디언 블로그를 구글과 네이버에 등록하는 방법 tags: [SEO, Obsidian, Quartz] ---`