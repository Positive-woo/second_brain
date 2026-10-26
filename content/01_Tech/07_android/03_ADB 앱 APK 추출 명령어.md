---
tags: [android, adb, apk, cheatsheet]
aliases: [ADB 앱 추출, APK 추출 명령어, Split APK 추출]
---

# ADB 앱 APK 추출 명령어

작성 일자: 2026-10-26

설치된 앱의 APK 경로를 확인하고 PC로 복사하는 방법. 설치 옵션은 [[02_ADB APK 설치 명령어]], ADB 환경 설정은 [[01_adb 설치]] 참고.

## 1. APK 경로 확인

```shell
adb shell pm path <PACKAGE_ID>
```

예시:

```shell
adb shell pm path com.example.app
```

- `package:.../base.apk` 한 줄만 출력되면 단일 APK 앱이다.
- `base.apk` 외에 `split_config.*.apk` 등 여러 경로가 출력되면 Split APK 앱이다.
- split 파일명은 앱에 따라 다르므로 `split_config.*`만 고르지 말고 **출력된 APK 경로 전체**를 추출한다.
- 패키지명을 모르면 `adb shell pm list packages`로 확인한다.

## 2. 단일 APK 추출

`pm path`에서 확인한 경로의 `package:` 접두사는 제외하고 입력한다.

```shell
adb pull <APK 경로> ./base.apk
```

예시 (실제 기기에서 확인한 경로로 변경):

```shell
adb pull /data/app/실제설치경로/base.apk ./base.apk
```

## 3. Split APK 전체 추출 — macOS / Linux

패키지명 폴더를 만들고 `pm path`가 반환한 모든 APK를 복사한다. 단일 APK에도 같은 스크립트를 사용할 수 있다.

```shell
PACKAGE="com.example.app"
mkdir -p "$PACKAGE"

adb shell pm path "$PACKAGE" | tr -d '\r' | sed 's/^package://' | while IFS= read -r path; do
    [ -n "$path" ] || continue
    adb pull "$path" "./$PACKAGE/" || break
done
```

- `tr -d '\r'`: 기기 출력에 섞인 CR 문자를 제거한다.
- `sed 's/^package://'`: `package:` 접두사를 제거한다.
- `IFS= read -r`: 경로를 변형하지 않고 읽는다.
- `adb pull`이 실패하면 복사를 중단한다. 각 복사 결과와 누락 여부를 확인한다.
- 같은 폴더를 재사용하면 이전 APK가 남거나 같은 이름의 파일이 덮어써질 수 있으므로 앱 버전별 새 폴더를 사용하는 편이 좋다.

### 특정 기기에서 추출

기기가 여러 대라면 `pm path`와 `pull` **양쪽 모두** 같은 SERIAL을 지정한다.

```shell
SERIAL="기기_SERIAL"
PACKAGE="com.example.app"
mkdir -p "$PACKAGE"

adb -s "$SERIAL" shell pm path "$PACKAGE" | tr -d '\r' | sed 's/^package://' | while IFS= read -r path; do
    [ -n "$path" ] || continue
    adb -s "$SERIAL" pull "$path" "./$PACKAGE/" || break
done
```

SERIAL 확인:

```shell
adb devices -l
```

## 4. 추출한 APK 재설치

### 단일 APK

APK가 있는 폴더에서 실행한다.

```shell
adb install base.apk
```

### Split APK

추출한 패키지 폴더 안에서 실행한다.

```shell
cd com.example.app
adb install-multiple ./*.apk
```

기존 앱 데이터를 유지하며 재설치하려면 `-r`을 추가한다.

```shell
adb install -r base.apk
# Split APK라면 위 명령 대신 사용
adb install-multiple -r ./*.apk
```

특정 기기에 설치할 때는 `adb -s SERIAL install ...` 또는 `adb -s SERIAL install-multiple ...` 형식으로 지정한다.

## 5. 추출·재설치 시 확인 사항

- **단일 APK:** `pm path`가 반환한 APK 하나를 추출한다. 일반적으로 `base.apk`다.
- **Split APK:** `base.apk`와 반환된 split APK를 모두 추출한다. base만으로는 설치·실행이 실패할 수 있다.
- **다른 기기에 설치:** 원본 기기의 ABI·화면 밀도·언어 등에 맞춰 설치된 split이므로 다른 기기에 필요한 구성이 없을 수 있다. APK 전체를 추출해도 모든 기기와의 호환성이 보장되는 것은 아니다.
- **추출 범위:** APK만 복사한다. 로그인 정보·설정·DB 등 앱의 사용자 데이터나 OBB 데이터까지 백업되는 것은 아니다.
- **접근 제한:** 기기 정책이나 파일 접근 권한 때문에 `adb pull`이 실패할 수 있다.
- **업데이트 호환성:** 기존 앱에 덮어 설치하려면 서명과 버전 조건도 맞아야 한다.

## 관련 문서

- [[01_adb 설치]]
- [[02_ADB APK 설치 명령어]]
- [ADB 공식 문서](https://developer.android.com/tools/adb)
