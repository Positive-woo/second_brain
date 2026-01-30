
## 1. Android Developers

https://developer.android.com/tools/releases/platform-tools?hl=ko

![[Pasted image 20260130182811.png]]


![[Pasted image 20260130182937.png]]

설치하고 압축 풀기

## 2. 환경변수 설정

Win+R (실행)

![[Pasted image 20260130183022.png]]

sysdm.cpl 
(파이썬 환경 변수 너무 많이 설정해서 이젠 외움)

![[Pasted image 20260130183058.png]]

고급 -> 환경 변수
### adb 경로 시스템 변수 추가

![[Pasted image 20260130183254.png]]

시스템 변수 -> 새로 만들기 -> 변수 이름과 변수값 입력.


### Path 값에 adb 값 넣기

Path 에서 편집 클릭
![[Pasted image 20260130183518.png]]

환경 변수 에 
```
%adb%\
```

추가하기

![[Pasted image 20260130183401.png]]

## 설치 유무 확인

CLI 오픈
![[Pasted image 20260130183655.png]]


adb 입력

![[Pasted image 20260130183723.png]]

성공!