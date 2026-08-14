---
tags: [project, openclaw, ai, news, automation]
---

```markdown
작성 일자 : 2026-08-15
```

## 기획

OpenClaw와 로컬 Python 프로젝트를 나누어, 매일 아침 AI 기사 후보를 Telegram으로 제안하고 사용자가 고른 기사만 Obsidian 노트로 정리하는 흐름을 만드는 것이 목적이었다.

- Telegram에서는 후보 제안과 선택 유도에 집중
- 로컬 Python 프로젝트에서는 소스 설정, headline 수집, note 렌더링을 담당
- 사용자가 고른 뒤에만 본문 요약과 저장을 진행
- 기사 정리는 `02_Daily_AI_News/` 아래 월별 폴더에 누적

이번 기획에서 중요한 기준은 두 가지였다.

1. 아침 digest 단계에서는 노트를 만들지 않고 기사 후보만 보낸다.
2. 실제 기사 노트는 사용자의 선택이 들어온 뒤에만 생성한다.

## 설계

### 역할 분리

이번 기능은 `OpenClaw agent`와 `local Python project`를 분리하는 방향으로 설계했다.

- `OpenClaw agent`
  - 매일 08:00 cron 실행
  - 영어 headline의 한국어 변환
  - Telegram 메시지 작성 및 발송
  - 사용자의 `출처 + 번호` 선택 해석
  - 원문 확인 후 3줄 요약, 키워드, 의견 정리
- `local Python project`
  - 소스 설정 로드
  - RSS/HTML/YouTube community post headline 수집
  - digest JSON 저장
  - note template 렌더링
  - 기존 note overwrite 방지

### 동작 플로우

1. cron이 `python3 -m app.cli build-digest --config article_curator/config/sites.json`를 실행한다.
2. Python 프로젝트가 활성화된 source를 순회하며 headline을 모은다.
3. 결과를 `data/daily_digest.json`에 저장한다.
4. agent가 digest를 읽어 source별로 묶고, 영어 제목은 한국어로 풀어 Telegram에 보낸다.
5. 사용자가 `조코딩 2`처럼 답하면 agent가 해당 항목의 원문 URL을 찾는다.
6. agent가 원문을 읽고 요약 payload를 만든 뒤 `render-note`로 Obsidian note를 생성한다.
7. 사용자가 나중에 의견을 보내면 그 내용을 `내 생각 정리`에 반영해 note를 갱신한다.

### 핵심 파일

- 설정 파일: `/config/sites.json`
- digest 산출물: /daily_digest.json`
- note template: `/templates/daily_article_template.md`
- 구현 파일:
  - `app/fetchers.py`
  - `app/workflow.py`
  - `app/telegram.py`
  - `app/obsidian.py`
  - `app/cli.py`

## 구현 완료

### 오늘 실제로 정리된 기능

- `AI News`, `OpenAI News`, `flex AX Hub`, `JoCoding Posts`를 현재 활성 source로 사용
- source별 약 3개 안팎의 최신 항목을 digest에 포함
- 영어 제목은 Telegram 제안 단계에서 한국어로 바꾸어 전달
- digest 단계에서는 Obsidian note를 만들지 않도록 운영
- 사용자가 선택한 기사에 대해서만 note를 생성
- note 안의 `주요 포인트 3줄 정리`, `핵심 키워드`, `내 생각 정리`, `본문 발췌`를 채우는 흐름을 연결

### 오늘 수행한 실제 작업

1. 오전 8시 digest 실행
   - Telegram에 source별 기사 후보를 묶어 발송
   - digest 결과를 `daily_digest.json`에 저장
   - 이 단계에서는 note를 만들지 않음
2. 사용자 선택 처리
   - `JoCoding Posts 2`번 글을 선택값으로 해석
   - YouTube community post 원문을 찾아 본문 내용과 지표를 추출
3. note 생성
   - `08-13 - 5.6 Sol, 그록에 따라잡혔다 ㄷㄷ.md` 생성
   - 3줄 요약과 키워드, 원문 링크, 본문 발췌를 정리
4. 사용자 의견 반영
   - 그록의 과도한 답변 거부 문제와 악의적 질의 판별 필터 필요성을 `내 생각 정리`에 반영
5. 문체 기준 확정
   - `내 생각 정리`는 메신저체가 아니라 보고서체로 유지하도록 운영 원칙 추가
6. 샘플 산출물 정리
   - 실제로 참조되지 않던 `08-15 - 샘플 기사 제목.md`는 휴지통으로 이동

### 현재 확인된 결과물

- 기사 제안 메시지: Telegram direct chat 기준 정상 발송
- digest 산출물: `data/daily_digest.json`
- 선택 기사 payload 예시: `data/jocoding_grok46_payload.json`
- 생성 note:
  - `content/02_Daily_AI_News/2026-08/08-13 - 5.6 Sol, 그록에 따라잡혔다 ㄷㄷ.md`
- 운영 메모 반영:
  - `workspace/TOOLS.md`

## 요약

- 이 기능은 `아침 후보 제안`과 `선택 후 저장`을 분리한 2단계 구조로 설계했다.
- headline 수집과 note 렌더링은 로컬 Python 프로젝트가 맡고, 선택 해석과 본문 요약, Telegram 대화는 OpenClaw agent가 맡는다.
- 오늘 기준으로 digest 발송, 선택 기사 note 생성, 사용자 의견 반영, 보고서체 문장 규칙 정리까지 한 사이클을 실제로 완료했다.

---
## 시행착오

- YouTube community post는 일반 RSS처럼 다루기 어려워 별도 파서가 필요했다.
- digest 메시지와 최종 note의 말투가 섞이면 결과물의 톤이 흐트러져, `내 생각 정리`만큼은 문서 톤으로 고정할 필요가 있었다.
- 예시 payload 기반으로 만들어진 샘플 note가 실사용 기록처럼 남아 있어 후속 정리가 필요했다.

### 한계점

- `AI Times`, `NAVER Cloud Trend`는 아직 비활성 상태라 현재 digest에는 포함되지 않는다.
- 기사 본문 추출은 source별 구조 차이가 커서, 여전히 agent의 확인과 정리가 들어가는 반수동 흐름이다.
- 현재는 기사 선택 이후 자동 커밋/푸시까지는 이번 실행에서 잇지 않았다.

### 개선점

- source별 본문 추출 규칙을 더 늘리면 요약 payload 생성 자동화 범위를 넓힐 수 있다.
- Telegram에서 보낸 digest 메시지와 저장된 JSON 간의 매핑을 더 명시적으로 관리하면 선택 해석이 안정적이 된다.
- `내 생각 정리`의 보고서체 규칙을 note 생성 단계에서 기본값으로 강제하면 후편집이 줄어든다.
