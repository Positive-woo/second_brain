---
tags: [android, adb, cheatsheet]
aliases: [ADB 앱 조회, ADB 앱 삭제, ADB 설치순 조회, ADB 앱 초기화]
---

# ADB 앱 조회·삭제·초기화

작성 일자: 2026-10-26

명령어와 출력 예시 중심의 빠른 참조. 출력은 이해를 위한 예시이며 기기·Android 버전에 따라 달라질 수 있다.

## 1. 설치된 앱 조회

| 명령어 | 확인 내용 |
| --- | --- |
| `adb shell pm list packages` | 전체 패키지 |
| `adb shell pm list packages -3` | 사용자 설치 앱(서드파티 앱) |
| `adb shell pm list packages -s` | 시스템 앱 |
| `adb shell pm list packages -f` | APK 설치 경로 포함 |
| `adb shell pm list packages -i` | 설치 출처(Installer) 포함 |
| `adb shell pm list packages -U` | UID 포함 |
| `adb shell pm list packages --user 0` | 사용자 0의 패키지 |
| `adb shell pm list packages keyword` | 패키지명에 `keyword`가 포함된 앱 |
| `adb shell pm path <PACKAGE_ID>` | APK 파일 경로 |
| `adb shell dumpsys package <PACKAGE_ID>` | 패키지 상세 정보 |

### 패키지명 검색

```shell
adb shell pm list packages example
```

```text
package:com.example.app
package:com.example.tool
```

검색 대상은 화면에 표시되는 앱 이름이 아니라 **패키지명**이다.

### APK 경로 포함

```shell
adb shell pm list packages -f example
```

```text
package:/data/app/설치경로/base.apk=com.example.app
```

```shell
adb shell pm path com.example.app
```

```text
package:/data/app/설치경로/base.apk
package:/data/app/설치경로/split_config.arm64_v8a.apk
```

### 설치 출처·UID

```shell
adb shell pm list packages -i example
```

```text
package:com.example.app  installer=com.android.vending
```

`com.android.vending`은 Google Play 스토어다. 설치 방식에 따라 다른 값 또는 `null`이 표시될 수 있다.

```shell
adb shell pm list packages -U example
```

```text
package:com.example.app uid:10123
```

## 2. 앱 삭제·초기화·강제 종료

> 아래 명령은 조회가 아니라 실제 앱 상태를 변경한다. 특히 `uninstall`과 `pm clear`는 데이터를 잃을 수 있으므로 패키지명과 사용자를 확인한다.

| 명령어 | 동작·일반적인 결과 |
| --- | --- |
| `adb uninstall <PACKAGE_ID>` | 앱 삭제. 일반적으로 앱 데이터도 삭제 → `Success` |
| `adb uninstall -k <PACKAGE_ID>` | 앱 삭제 시 데이터·캐시 유지 요청 → `Success` |
| `adb shell pm uninstall --user 0 <PACKAGE_ID>` | 사용자 0에서 앱 제거 → `Success` |
| `adb shell pm clear <PACKAGE_ID>` | 앱은 유지하고 데이터·캐시 초기화 → `Success` |
| `adb shell am force-stop <PACKAGE_ID>` | 앱 강제 종료 → 보통 출력 없음 |
| `adb shell pm disable-user --user 0 <PACKAGE_ID>` | 사용자 0에서 앱 비활성화 |
| `adb shell pm enable --user 0 <PACKAGE_ID>` | 사용자 0에서 앱 활성화 |

`-k`는 완전한 앱 백업을 뜻하지 않으며, 이후 재설치 시 데이터 재사용은 서명·기기 정책 등에 영향을 받는다.

### 삭제

```shell
adb uninstall com.example.app
```

```text
Success
```

### 데이터 초기화

```shell
adb shell pm clear --user 0 com.example.app
```

```text
Success
```

로그인 정보·설정·DB 등 앱의 로컬 데이터가 초기화된다. 앱 자체는 삭제되지 않는다.

### 비활성화 / 다시 활성화

```shell
adb shell pm disable-user --user 0 com.example.app
```

```text
Package com.example.app new state: disabled-user
```

```shell
adb shell pm enable --user 0 com.example.app
```

```text
Package com.example.app new state: enabled
```

### 사용자 0에서 시스템 앱 제거

```shell
adb shell pm uninstall --user 0 com.example.app
```

```text
Success
```

시스템 앱의 경우 사용자 0에서 제거하는 것이며 **시스템 영역의 원본 APK를 삭제하는 것과는 다르다.** 제거와 비활성화는 다른 상태이므로 `pm enable`만으로 제거된 앱이 복구되지는 않는다.

원본 패키지가 기기에 남아 있다면 다음 명령으로 사용자 0에 다시 등록할 수 있다.

```shell
adb shell cmd package install-existing --user 0 com.example.app
```

```text
Package com.example.app installed for user: 0
```

이는 앱의 삭제된 사용자 데이터를 복구하는 명령은 아니다. 시스템 필수 앱은 제거·비활성화 시 기기 동작에 영향을 줄 수 있다.

## 3. 특정 앱 설치일·업데이트일

macOS / Linux:

```shell
adb shell dumpsys package com.example.app | grep -E 'firstInstallTime|lastUpdateTime'
```

```text
    firstInstallTime=2026-10-25 17:42:11
    lastUpdateTime=2026-10-26 09:10:03
```

- `firstInstallTime`: 현재 설치 기록의 최초 설치 시각
- `lastUpdateTime`: 마지막 업데이트 시각
- 사용자·Android 버전에 따라 여러 설치 시각이 출력될 수 있다.

## 4. 최근 설치한 앱 순서대로 조회

`pm list packages`에는 설치 날짜순 정렬 옵션이 없다. 각 앱의 `firstInstallTime`을 가져와 PC에서 정렬한다.

### 사용자 0의 서드파티 앱 — macOS / Linux

```shell
adb shell pm list packages -3 --user 0 | tr -d '\r' | sed 's/^package://' | while IFS= read -r pkg; do
    [ -n "$pkg" ] || continue
    installed_at=$(adb shell dumpsys package "$pkg" | grep -m 1 'firstInstallTime=' | cut -d= -f2- | tr -d '\r')
    [ -n "$installed_at" ] && printf '%s %s\n' "$installed_at" "$pkg"
done | sort -r
```

```text
2026-10-26 10:15:32 com.example.app3
2026-10-25 17:42:11 com.example.app2
2026-10-24 09:21:05 com.example.app1
```

### 최근 10개만 보기

위 스크립트의 마지막 줄을 다음과 같이 변경한다.

```shell
done | sort -r | head -10
```

이 줄만 독립 실행하는 것이 아니라 기존 스크립트의 마지막 줄을 바꾼다.

### 결과 해석·제한

- **설치일 기준**이며 다운로드일 기준이 아니다. 삭제 후 재설치하면 값이 달라질 수 있다.
- 앱별로 ADB 조회를 하므로 앱이 많으면 시간이 걸린다.
- 예시는 첫 번째 `firstInstallTime` 값을 사용한다. 다중 사용자·업무 프로필 환경에서는 해당 값이 원하는 사용자의 기록인지 `dumpsys package` 원문으로 확인한다.
- 전체 앱을 대상으로 하려면 `-3`을 제거한다.
- 업데이트순으로 보려면 `firstInstallTime=`을 `lastUpdateTime=`으로 바꾼다.

## 5. 특정 기기·사용자 지정

```shell
# 기기 SERIAL 확인
adb devices -l

# 특정 기기의 패키지 조회
adb -s SERIAL shell pm list packages -3 --user 0

# 사용자 / 업무 프로필 ID 확인
adb shell pm list users
```

사용자 0은 보통 기본 사용자다. 업무 프로필 등 다른 사용자를 다룰 때는 실제 ID로 바꾼다. 설치순 조회 스크립트에서도 여러 기기가 연결되어 있다면 **모든 `adb` 호출에 같은 `-s SERIAL`**을 추가한다.

## 관련 문서

- [[01_adb 설치]]
- [[02_ADB APK 설치 명령어]]
- [[03_ADB 앱 APK 추출 명령어]]
- [ADB 및 Package Manager 공식 문서](https://developer.android.com/tools/adb#pm)
