
## 1. Google 검색 등록 (Google Search Console)

![https://seranking.com/blog/wp-content/uploads/2023/06/Add-a-new-sitemap-2048x1176.png](https://tse1.mm.bing.net/th/id/OIP.QZbGAyGY4ymKBkvIlbPIFgHaEQ?w=474&h=379&c=7&p=0)

![https://wpadvancedads.com/wp-content/uploads/2024/07/google-search-console-html-tag.png](https://tse1.mm.bing.net/th/id/OIP.sor15fAQtYlhypMR5DVhzgHaE3?w=474&h=379&c=7&p=0)

### 1.  Search Console 접속

- [https://search.google.com/search-console](https://search.google.com/search-console)

### 2.  도메인 VS URL 접두어

URL 접두어 클릭 -> 내 도메인 입력

### 3. HTML 파일 인증

![[Pasted image 20260107221745.png]]

> [!tip]  GPT도 안알려줌 !! 핵 중요 !!
 이렇게 HTML 을 다운로드 받아서 루트 경로에 넣으라고 한다.
 GPT는 계속 루트 폴더에 넣어라, static 폴더 만들어서 넣어라. 
 이런 헛소리 하고 있다.

 헛소리의 원인 : 루트 폴더에 넣어야함. 하지만 content 폴더에서는 HTML을 인식하지 않는다.
 우리는 깃허브에 업로드 할 때 public 폴더는 업로드 되지 않는다.
 quartz폴더를 기준으로 빌드해서 public 폴더가 만들어지는 듯 한데, 이 과정에서 quartz 내부의 static 폴더는 그대로 public에 옮겨진다.

그러면 static 폴더 안에 html을 넣으면 될까?
아니다 그러면 https://예시도메인/static/~~~~.html 에 업로드 된다.

그래서 수없이 인증을 실패하면서 알아낸 것은 "static 폴더 내부의 html 을 밖으로 꺼낸다." 이다.
![[Pasted image 20260107224547.png]]

robots.txt도 이후의 robots.txt도 옮겨야하기 때문에 미리 넣어두자.

Cloud flare 설정 내부에서 npx quartz build 만 되어 있던 것에서 뒤에 
cp quartz/static/`*.html public/ 을 붙여준다.

![[Pasted image 20260107222919.png]]

이를 통해 html 파일이 루트 폴더로 이동이 되면서 성공적으로 인증을 받을 수 있다. 
'내 귀한 시간 ㅜㅜㅜㅜㅜ'

### 4. Sitemaps 인증 (진행 중)
`https://내 도메인/sitemaps.xml`

이 곳에 접속이 된다면 별다른 처리 없이 Search Console의 Sitemaps에 sitemap.xml을 추가하면 된다.


2026-01-07  22:37
진행 완료된다면 수정 예정!

2026-01-09 17:32
무수히 많은 재시도, xml문제인 듯 싶어 로컬 환경과 cloudflare환경 sitemap 비교까지 진행했지만 결론을 못찾음.
reddit에서는 일부 오래걸린다고 기다려야한다그래서 fetch되지 않은 상태로 조금 둬야할 듯함.

### 5. Robots.txt 설정

https://developers.google.com/crawling/docs/robots-txt/create-robots-txt?hl=ko&_gl=1*bwoh9w*_up*MQ..*_ga*MTg1NTY3MDE1Mi4xNzY3NzkzMTc2*_ga_SM8HXJ53K2*czE3Njc3OTMxNzYkbzEkZzAkdDE3Njc3OTMxNzYkajYwJGwwJGgw#learn_robots_txt_syntax

우리 로봇님께서 더 쉽게 크롤링해서 가져오실 수 있도록 robots.txt를 만들어서 넣어야한다..

```
User-agent: *
Allow: /

Sitemap: https://second-brain-7tz.pages.dev/sitemap.xml
```

저는 이렇게 간단하게 넣었다. (일단 되는지 확인 용)
넣는 곳은 루트 경로에 넣어야한다고 하길래 html 파일 넣는 static에 넣었다.
이후 Cloudflare을 수정하였다.

![[Pasted image 20260107224647.png]]

좌측 사이드 바에서 Setting을 눌러 적용확인을 할 수 있다.
![[Pasted image 20260109173351.png]]

robots.txt가 valid로 수집되고 있는 것을 확인할 수 있었다.

완료!!


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