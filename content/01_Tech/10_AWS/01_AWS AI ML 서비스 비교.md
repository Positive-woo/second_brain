---
title: AWS AI ML 서비스 비교
tags: [aws, certification, study-guide, aws-ai-practitioner, AIF-C01, ai, machine-learning, generative-ai, bedrock, sagemaker]
aliases: [AWS AI 서비스 정리, AWS AI ML 서비스, Bedrock과 SageMaker 비교]
created: 2026-10-27
updated: 2026-10-27
---

# AWS AI/ML 서비스 비교

학습 목차: [[00_AWS 시험 학습 목차]]

## 학습 목표

- 요구사항의 핵심 작업을 읽고 적합한 서비스를 고른다.
- 생성형 AI 활용, 목적별 AI API, 직접 모델 개발의 차이를 구분한다.
- 서비스 이름을 암기하는 데서 끝내지 않고 **왜 다른 선택지가 아닌지** 설명한다.

## 1. 전체 구조 — 무엇을 직접 만들 것인가?

| 구분 | 중심 역할 | 대표 서비스·도구 |
| --- | --- | --- |
| 생성형 AI 활용 | 기존 FM으로 생성형 AI 앱을 만들거나 완성된 어시스턴트 활용 | Bedrock, Q 계열 |
| 목적별 AI 서비스 | 번역·문서 추출·음성 변환 등 특정 작업을 API로 활용 | Translate, Textract, Polly 등 |
| 모델 개발·운영 플랫폼 | 모델 선택·학습·튜닝·배포·운영 제어 | SageMaker AI, JumpStart |
| ML 프레임워크 | 모델을 구현·학습하는 소프트웨어 라이브러리 | PyTorch, TensorFlow |

> **중요한 정정:** SageMaker 자체는 ML 프레임워크가 아니다. PyTorch·TensorFlow 등을 활용할 수 있는 **관리형 플랫폼**이다. JumpStart는 SageMaker AI의 모델 활용 기능이며 생성형 AI와 전통적 ML 양쪽에 걸친다. 이 표는 학습용 구분이지 서로 완전히 분리된 제품 경계는 아니다.

## 2. 생성형 AI와 사전 학습 모델 활용

| 서비스·기능 | 주요 용도 | 문제에서 찾을 단서 |
| --- | --- | --- |
| Amazon Bedrock | 지원되는 Amazon·타사 FM을 관리형 API로 활용해 생성형 AI 앱 구축. 지식 기반·에이전트·가드레일 등 연계 기능 제공 | FM API, 모델 선택, 요약·생성, 인프라 관리 부담 최소화 |
| Amazon SageMaker JumpStart | 사전 학습된 FM·ML 모델과 솔루션을 탐색하고 SageMaker AI 환경에서 배포·지원되는 모델 미세 조정 | 모델 허브, 사전 학습 모델, 배포 환경 제어 |
| Amazon Q Business | 기업 데이터에 연결해 질문 답변·요약·업무 지원을 제공하는 생성형 AI 어시스턴트 | 사내 문서, 직원 질의응답, 권한에 따른 정보 접근 |
| Amazon Q Developer | 코드 작성·설명·테스트·문제 해결 등 개발 작업 지원 | 개발자, 코드 보조, 디버깅 |

### Amazon Q를 읽는 법

`Amazon Q`는 여러 업무용 AI 경험을 아우르는 명칭이다. 제공 자료의 ‘기업 내부 정보 검색·질문 답변’은 **Q Business**로 구체화해 기억한다. 개발 업무 지원은 **Q Developer**와 구분한다.

### Bedrock 사용 시 기억할 조건

- Claude·Llama 등은 **모델 계열의 예시**이며, 특정 버전 제공 여부는 리전·시점·접근 조건에 따라 달라진다.
- Bedrock도 지원되는 모델에 대해 사용자 지정·미세 조정 기능을 제공한다. ‘미세 조정이면 무조건 SageMaker’는 틀린 암기다.
- 모델을 직접 고르고 학습·서빙 환경을 더 세밀하게 제어하려는 요구는 SageMaker AI 쪽 단서가 된다.

## 3. 목적별 AI/ML 서비스

사전 학습된 기능을 활용하므로 처음부터 모델을 만드는 부담을 줄인다. 다만 **모든 서비스가 학습·데이터 준비 없이 바로 끝나는 것은 아니다.** Personalize와 사용자 지정 기능은 별도 데이터·학습 과정이 필요할 수 있다.

| 분야 | 서비스 | 입력 → 결과 | 대표 사례 |
| --- | --- | --- | --- |
| 텍스트 분석 | Amazon Comprehend | 텍스트 → 감정·개체·분류 결과 | 고객 후기 긍정/부정 분석 |
| 번역 | Amazon Translate | 한 언어의 텍스트 → 다른 언어 텍스트 | 상품 설명 다국어 번역 |
| 문서 추출 | Amazon Textract | 문서 이미지·PDF → 텍스트·표·양식 데이터 | 청구서 표와 필드 추출 |
| 이미지·영상 | Amazon Rekognition | 이미지·영상 → 객체·얼굴·콘텐츠 분석 결과 | 부적절한 이미지 탐지 |
| 기업 검색 | Amazon Kendra | 문서 집합·질의 → 관련 문서·검색 결과 | 사내 문서 지능형 검색 |
| 대화 인터페이스 | Amazon Lex | 텍스트·음성 발화 → 의도·슬롯·대화 흐름 | 예약·주문 챗봇 |
| 음성 합성 | Amazon Polly | 텍스트 → 음성(TTS) | 안내문 읽어 주기 |
| 음성 인식 | Amazon Transcribe | 음성 → 텍스트(STT) | 회의 녹취록 생성 |
| 개인화 추천 | Amazon Personalize | 사용자 행동·아이템 등의 데이터 → 개인화 추천 | 사용자 맞춤 상품·콘텐츠 추천 |
| 강화 학습 교육 | AWS DeepRacer / DeepRacer on AWS | 환경·행동·보상 → 주행 정책 학습 | 모형 자율주행차 교육 |

### 반드시 구분할 조합

| 헷갈리는 조합 | 구분 기준 |
| --- | --- |
| Textract vs Comprehend | 문서에서 글자·구조를 **꺼내기** vs 추출된 글의 의미·감정을 **분석하기** |
| Textract vs Rekognition | 문서의 표·양식 추출 vs 이미지·영상의 객체·얼굴 분석 |
| Transcribe vs Polly | 음성을 **글로** vs 글을 **음성으로** |
| Translate vs Transcribe | 언어 간 **번역** vs 음성의 **받아쓰기** |
| Lex vs Bedrock | 의도·슬롯 기반 업무 대화 vs FM 기반 생성형 AI 앱 구축 |
| Kendra vs Q Business | 문서 검색 중심 vs 기업 데이터 기반 생성형 업무 어시스턴트 |
| Q Business vs Q Developer | 직원의 기업 정보 활용 vs 개발자의 코드·개발 작업 지원 |

서비스는 함께 사용할 수도 있다. 예를 들어 **Textract로 추출 → Comprehend로 분석**, **Transcribe로 녹취 → Translate로 번역 → Polly로 읽기**처럼 작업을 나누어 생각한다.

## 4. SageMaker AI — 모델 개발·학습·배포

| 작업 | 의미 |
| --- | --- |
| 모델 개발 | 데이터·문제에 맞는 알고리즘·모델 준비 |
| 학습(Training) | 데이터에서 모델 파라미터를 학습 |
| 튜닝(Tuning) | 하이퍼파라미터 등 설정을 조정해 성능 개선 |
| 배포(Deployment) | 모델을 추론에 사용할 수 있게 제공 |
| 운영(MLOps) | 반복 가능한 파이프라인·모니터링·모델 관리 |

### SageMaker 명칭 변화

2026-10-27 공식 페이지 확인 기준:

- **Amazon SageMaker**: 데이터·분석·AI를 포괄하는 넓은 플랫폼 명칭.
- **Amazon SageMaker AI**: 기존 SageMaker의 ML 모델 개발·학습·배포 기능을 가리킬 때 구분해서 사용하는 명칭.
- **SageMaker Unified Studio**: 데이터·분석·AI 도구를 통합해서 사용하는 개발 환경.

구형 교재의 ‘SageMaker로 ML 학습·배포’는 현재 문맥에서 SageMaker AI의 역할로 연결해 이해한다.

## 5. Bedrock vs SageMaker AI vs JumpStart

| 판단 항목 | Bedrock | SageMaker AI / JumpStart |
| --- | --- | --- |
| 주된 출발점 | 관리형 FM API로 생성형 AI 활용 | 모델을 선택·개발·학습·배포하는 ML 환경 |
| 운영 관점 | 모델 제공 인프라 관리 부담을 줄임 | 학습·배포 환경과 운영 구성을 더 세밀하게 제어 |
| 사용자 지정 | 지원 모델·기능에 따라 가능 | 지원 모델 미세 조정 및 자체 학습 워크플로 구성 |
| 강한 시나리오 단서 | 여러 FM 활용, 생성형 AI 앱, 지식 기반 연결 | 자체 모델, 맞춤 학습·서빙, 모델 수명주기 |
| JumpStart의 위치 | Bedrock의 기능이 아님 | SageMaker AI에서 사전 학습 모델 활용을 돕는 기능 |

**핵심:** Bedrock은 ‘기존 FM 활용’, SageMaker AI는 ‘모델 개발·학습·배포 제어’가 중심이다. 단, 두 서비스의 기능이 일부 겹치므로 단어 하나가 아니라 **전체 요구사항**으로 판단한다.

## 6. 상황별 빠른 선택표

| 요구사항 | 우선 검토할 서비스 |
| --- | --- |
| Claude 같은 FM을 관리형 API로 사용 | Bedrock |
| 자체 ML 모델 학습·배포 | SageMaker AI |
| 사전 학습 모델 허브에서 골라 SageMaker 환경에 배포 | JumpStart |
| 직원이 사내 정책 문서로 질문 답변 | Q Business |
| PDF에서 표·양식·텍스트 추출 | Textract |
| 고객 후기의 감정 분석 | Comprehend |
| 회의 음성을 텍스트로 변환 | Transcribe |
| 텍스트 안내문을 음성으로 변환 | Polly |
| 문장을 다른 언어로 번역 | Translate |
| 예약 의도·날짜·인원을 수집하는 챗봇 | Lex |
| 코드 작성·설명 지원 | Q Developer |
| 사용자 맞춤 상품 추천 | Personalize |
| 이미지·영상의 객체 및 콘텐츠 분석 | Rekognition |
| 기업 문서 지능형 검색 | Kendra |

## 7. 최신 시험 범위와 예전 학습 자료 구분

2026-10-27 확인한 **공식 In-Scope Services 목록**에는 Bedrock, Comprehend, Lex, Personalize, Polly, Rekognition, SageMaker AI, JumpStart, Textract, Transcribe, Translate 등이 명시돼 있다.

- 원본 학습 자료의 **Q 계열·Kendra·DeepRacer**는 이날 확인한 해당 목록에 명시되어 있지 않다. 배경 지식으로 구분해 공부하되, 목록이 비포괄적이므로 **‘표에 없으니 절대 출제되지 않는다’고 단정하지 않는다.**
- 반대로 현재 목록에는 **Amazon Nova, Amazon Bedrock AgentCore, Kiro, Strands Agents, AWS Transform** 등도 있다. 이 문서는 제공 자료 중심 정리이므로 최신 전체 범위 학습은 별도로 확장해야 한다.
- DeepRacer는 강화 학습 교육 사례로 기억한다. 현재 공식 문서에는 **DeepRacer on AWS** 솔루션이 안내되므로, 과거 관리형 서비스 화면과 현재 실습 경로가 같다고 가정하지 않는다.

## 공식 참고 자료

- [AIF-C01 서비스 범위](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/aif-01-in-scope-services.html)
- [Amazon Bedrock](https://aws.amazon.com/bedrock/)
- [Amazon SageMaker](https://aws.amazon.com/sagemaker/)
- [Amazon Q](https://aws.amazon.com/q/) / [Q Business](https://aws.amazon.com/q/business/)
- [DeepRacer on AWS 개요](https://docs.aws.amazon.com/solutions/latest/deepracer-on-aws/solution-overview.html)

관련 개념: [[02_AI ML 및 생성형 AI 핵심 개념]] · 복습: [[03_AI Practitioner 서비스 선택 연습문제]]
