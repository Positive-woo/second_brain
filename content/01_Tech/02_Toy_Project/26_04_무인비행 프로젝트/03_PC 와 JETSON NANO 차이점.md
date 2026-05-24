# **1. 추론 모델 차이**

## **PC 환경**

보통 그대로 실행:

```text
best.pt
```

특징:

- PyTorch 기반
- 개발 편함
- 디버깅 쉬움
- 속도는 상대적으로 느림

구조:

```text
카메라
↓
PyTorch YOLO
↓
탐지 결과
```

---

## **Jetson Nano 환경**

보통 TensorRT 엔진 사용:

```text
best.engine
```

특징:

- NVIDIA GPU 전용 최적화
- 훨씬 빠름
- 메모리 절약
- 배포용

구조:

```text
카메라
↓
TensorRT Engine
↓
탐지 결과
```

---

## **차이 핵심**

|**항목**|**PC**|**Jetson Nano**|
|---|---|---|
|모델 형식|`.pt`|`.engine`|
|실행 엔진|PyTorch|TensorRT|
|목적|개발/학습|실시간 추론|
|속도|상대적으로 느림|빠름|

---

# **2. CPU 구조 차이**

## **PC**

```text
x86_64
```

Intel / AMD 계열.

특징:

- 고성능
- 범용
- 대부분 패키지 지원

---

## **Jetson Nano**

```text
ARM64 (aarch64)
```

스마트폰/임베디드 계열.

특징:

- 저전력
- 성능 제한
- ARM 전용 wheel 필요

---

## **영향**

|**항목**|**영향**|
|---|---|
|Python wheel|다름|
|torch 설치|다름|
|CUDA 환경|다름|
|TensorRT|Jetson 전용 구성 많음|

---

## **결과**

PC에서 되던 게:

```text
Nano에서 바로 안 될 수 있음
```

있음.

  

그래서:

```text
개발은 PC
최종 테스트는 Nano
```

를 함.

---

# **3. 배치(batch) / 프레임(FPS) 차이**

이게 실시간 비행체에서 매우 중요합니다.

---

# **Batch 차이**

## **PC**

GPU 메모리가 크므로:

```text
batch=16
batch=32
```

가능.

학습 속도 향상 목적.

---

## **Jetson Nano**

메모리 제한 큼.

보통:

```text
batch=1
```

기준.

  

즉:

```text
카메라 프레임 1개
→ 즉시 추론
```

방식.

---

# **FPS 차이**

## **PC**

RTX GPU 기준:

```text
60~200 FPS
```

도 가능.

---

## **Jetson Nano**

보통:

```text
10~30 FPS
```

목표.

그래서:

- 작은 모델 필요
- imgsz 감소 필요
- TensorRT 필요

---

# **프레임 지연(latency)**

비행체에서는 FPS보다 이것도 중요.

예:

```text
탱크 감지
→ 0.5초 후 반응
```

이면 이미 늦을 수 있음.

  

그래서:

```text
YOLO11n
TensorRT
imgsz=320~416
```

조합을 쓰는 것.

---

# **네 프로젝트 기준 최종 형태**

## **PC 개발**

```text
YOLO11n.pt
PyTorch
WSL Ubuntu
```

용도:

- 학습
- 테스트
- 기능 구현

---

## **Jetson Nano 배포**

```text
best.engine
TensorRT
ARM64 Ubuntu
```

용도:

- 실시간 탐지
- 실제 비행
- 저지연 추론

---

# **핵심 한 줄 정리**

| **구분**   | **핵심**                           |
| -------- | -------------------------------- |
| 추론 모델 차이 | `.pt` vs TensorRT `.engine`      |
| CPU 차이   | x86_64 vs ARM64                  |
| 성능 차이    | batch 큰 개발환경 vs batch=1 실시간 임베디드 |