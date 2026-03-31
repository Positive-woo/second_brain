
```markdown
작성 일자 : 2026-03-17
```

회사에서 사용하는 adb를 집에 있는 Mac 환경에도 세팅하게 되었다.
그래서 이 과정을 기록하고 남기는 용도이다.

### ADB
ADB는 안드로이드 디바이스와 컴퓨터를 연결해주는 명령어 도구이다.

내가 주로 사용하는 용도는
- 디버깅 및 테스트 자동화 (appium)
- 앱 설치 / 삭제
- 파일 전송
등을 위주로 실행한다.

-> PC에서 스마트폰을 직접 제어할 수 있게 해주는 도구.

### Mac OS 에서 ADB 설치 하기
```
brew install android-platform-tools
```

```
adb version
```

을 통해 버전을 확인할 수 있음.

이 방법이 아니라면 SDK platform Tools를 통해 다운로드 가능함.
- https://developer.android.com/tools/releases/platform-tools

---
![[Pasted image 20260317214650.png]]