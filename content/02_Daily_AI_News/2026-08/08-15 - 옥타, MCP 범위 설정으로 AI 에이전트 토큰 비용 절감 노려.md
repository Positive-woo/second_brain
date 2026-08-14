---
title: "옥타, MCP 범위 설정으로 AI 에이전트 토큰 비용 절감 노려"
date: "2026-08-15"
tags: [daily-news, curated, okta, mcp, agent-security]
source: "AI News"
source_url: "https://www.artificialintelligence-news.com/news/okta-targets-ai-agent-token-costs-with-mcp-scoping/"
---

### 원본 기사
https://www.artificialintelligence-news.com/news/okta-targets-ai-agent-token-costs-with-mcp-scoping/

### 주요 포인트 3줄 정리
- 옥타는 MCP 서버가 노출하는 전체 도구 목록을 그대로 모델 프롬프트에 넣는 과정에서 발생하는 `tool tax`가 AI 에이전트의 토큰 비용을 키운다고 지적했다.
- 이에 따라 에이전트 ID와 사용자 권한에 맞는 도구만 선별해 모델에 보여주는 `identity-scoped MCP` 방식을 제안했고, 내부 모델링에서는 일부 권한 시나리오에서 보이는 도구 수가 90% 이상 줄었다고 밝혔다.
- 이 접근은 비용 절감뿐 아니라 권한 밖 도구를 모델이 아예 보지 못하게 해, 보안·거버넌스 측면에서도 더 안전한 에이전트 운영 구조를 지향한다.

### 핵심 키워드
- Okta
- MCP
- Agent Security

### 내 생각 정리
이 기사의 시사점은 AI 에이전트 비용 문제가 단순 모델 단가가 아니라 `도구를 얼마나 많이 보여주느냐`의 문제이기도 하다는 데 있다. MCP가 널리 쓰일수록 연결성은 좋아지지만, 아무 선별 없이 전체 툴 카탈로그를 매 턴마다 노출하면 비용과 보안 리스크가 함께 커질 수밖에 없다. 따라서 앞으로의 에이전트 인프라는 더 많은 연결보다도, 어떤 연결을 누구에게 어느 범위까지 허용할지를 세밀하게 제어하는 설계가 핵심 경쟁력이 될 가능성이 크다.

### 본문 발췌
Each model call made by an AI agent can include schemas, names, descriptions and parameters for every tool exposed by a MCP server. Okta calls the resulting prompt overhead the “tool tax”. Okta’s proposed control filters the list of tools before it reaches the model, using permissions assigned to an agent identity and the user associated with it.
