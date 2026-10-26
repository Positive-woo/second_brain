---
tags: [android, adb, apk, cheatsheet]
aliases: [ADB 설치 명령어, Split APK 설치, XAPK 설치]
---

# ADB APK 설치 명령어

작성 일자: 2026-10-26

APK·Split APK·XAPK를 기기에 설치할 때 찾아보는 명령어 모음.
ADB 자체 설치는 [[01_adb 설치]] 참고.
설치된 앱에서 APK를 꺼내려면 [[03_ADB 앱 APK 추출 명령어]] 참고.

## 빠른 참조

```shell
# 연결된 기기와 SERIAL 확인
adb devices -l

# 기본 설치
adb install app.apk

# 기존 앱 데이터를 유지하며 재설치
adb install -r app.apk

# 여러 기기 중 특정 기기에 설치
adb -s SERIAL install -r app.apk

# Split APK 설치: 같은 앱의 base와 필요한 split을 함께 지정
adb install-multiple -r base.apk split_config.arm64_v8a.apk split_config.ko.apk

# 낮은 target SDK로 차단된 APK 설치 (Android 14 이상)
adb install --bypass-low-target-sdk-block app.apk
```

## 1. 기본 APK 설치

```shell
adb [-s SERIAL] install [옵션] <APK 경로>
```

대괄호는 생략 가능한 부분을 뜻하며 실제 입력할 때는 제거한다. 경로에 공백이 있다면 따옴표로 감싼다.

```shell
adb -s SERIAL install -r "/path/to/my app.apk"
```

### 옵션

| 옵션 | 설명 | 참고 |
| --- | --- | --- |
| `-s SERIAL` | 특정 기기 지정 | ADB 공통 옵션이므로 `install` 앞에 둔다. |
| `-r` | 기존 앱 데이터를 유지하며 재설치 | 기존 앱과 서명이 일치해야 한다. |
| `-d` | 버전 코드가 낮은 APK로 다운그레이드 허용 | 일반 사용자용 기기에서는 보통 디버그 가능한 앱에 한정되며, 임의의 앱 다운그레이드를 보장하지 않는다. |
| `-t` | 테스트 전용 APK 설치 허용 | `testOnly` APK 설치 시 사용한다. |
| `-g` | 런타임 권한 자동 부여 | 부여 가능한 런타임 권한 대상이며, 모든 특수 권한을 허용하는 옵션은 아니다. |
| `--bypass-low-target-sdk-block` | 낮은 target SDK로 인한 설치 차단 우회 | Android 14 이상에서 사용한다. |

옵션은 필요에 따라 조합한다.

```shell
adb -s SERIAL install -r -t -g app.apk
adb install -r -d app-debug.apk
```

## 2. Split APK 설치

하나의 앱이 base APK와 여러 split APK로 나뉘어 있을 때 함께 설치한다.

```shell
adb [-s SERIAL] install-multiple [옵션] <APK1> <APK2> ...
```

macOS/Linux에서 현재 폴더의 APK를 일괄 지정:

```shell
adb install-multiple ./*.apk
adb -s SERIAL install-multiple -r ./*.apk
```

- 폴더에는 **같은 앱·같은 버전·같은 서명**의 APK만 둔다.
- base APK와 해당 기기에 필요한 ABI·화면 밀도·언어 split을 포함한다. 서로 다른 기기용 변형 APK를 무조건 전부 넣으면 실패할 수 있다.
- `install-multiple`에서도 `-r`, `-d`, `-t`, `-g`, `--bypass-low-target-sdk-block` 등의 설치 옵션을 사용할 수 있다. 적용 제한은 기본 설치와 같다.
- `.aab` 파일은 이 명령으로 직접 설치하지 않는다. 먼저 `bundletool` 등으로 설치 가능한 APK 세트를 생성한다.

## 3. XAPK 설치

XAPK는 보통 APK·추가 데이터·메타데이터를 담은 ZIP 형식의 패키지다. ADB가 `.xapk`를 직접 설치하는 것은 아니므로 먼저 압축을 푼다.

```shell
unzip app.xapk -d extracted
cd extracted

# APK가 여러 개라면 (현재 폴더에 APK들이 있는 경우)
adb install-multiple ./*.apk

# APK가 하나라면 위 명령 대신 사용
adb install app.apk
```

APK가 하위 폴더에 있으면 실제 위치에 맞춰 경로를 지정한다.

### OBB 데이터가 포함된 경우

APK 설치와 별도로 OBB 데이터를 앱의 패키지명 경로에 복사해야 할 수 있다.

```shell
# com.example.app은 실제 패키지명으로 변경
adb shell mkdir -p /sdcard/Android/obb/com.example.app
adb push Android/obb/com.example.app/. /sdcard/Android/obb/com.example.app/
```

위 예시는 압축을 푼 폴더에 `Android/obb/com.example.app/`이 있을 때의 명령이다. Android 버전·기기 정책에 따라 해당 경로 쓰기가 제한될 수 있다.

## 4. 설치 실패 시 확인

| 오류·상황 | 확인할 내용 |
| --- | --- |
| 여러 기기가 연결되어 대상 선택 실패 | `adb devices -l`로 SERIAL 확인 후 `adb -s SERIAL ...` 사용 |
| `INSTALL_FAILED_ALREADY_EXISTS` | 재설치 목적이라면 `-r` 사용 |
| `INSTALL_FAILED_VERSION_DOWNGRADE` | 버전 코드 확인. 허용되는 디버그 앱이라면 `-d` 검토 |
| `INSTALL_FAILED_TEST_ONLY` | `-t` 사용 |
| `INSTALL_FAILED_DEPRECATED_SDK_VERSION` | Android 14 이상이라면 `--bypass-low-target-sdk-block` 검토 |
| `INSTALL_FAILED_OLDER_SDK` | 앱의 `minSdkVersion`이 기기 OS보다 높은지 확인 |
| `INSTALL_FAILED_NO_MATCHING_ABIS` | 기기 CPU ABI와 APK의 네이티브 라이브러리 호환 여부 확인 |
| `INSTALL_FAILED_UPDATE_INCOMPATIBLE` | 기존 앱과 새 APK의 서명이 같은지 확인 |
| Split 누락·호환 오류 | 같은 앱의 base와 해당 기기에 필요한 split이 모두 있는지 확인 |

> `--bypass-low-target-sdk-block`은 낮은 **targetSdkVersion**에 대한 설치 제한만 우회한다. **minSdkVersion**, CPU ABI 불일치, 서명 불일치는 해결하지 못한다.

기기 OS와 ABI 확인:

```shell
adb shell getprop ro.build.version.sdk
adb shell getprop ro.product.cpu.abilist
```

## 참고

- [Android Debug Bridge 공식 문서](https://developer.android.com/tools/adb)
- [Android 14: 최소 설치 가능 target API 수준](https://developer.android.com/about/versions/14/behavior-changes-all#minimum-target-api-level)
- 로컬에서 지원되는 명령·옵션 확인: `adb help`
