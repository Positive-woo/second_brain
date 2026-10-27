# macOS에서 사용할 짧은 관찰 명령

아래 명령은 결과를 관찰하는 용도다. 옵션과 환경에 따라 결과가 달라질 수 있다.

## ifconfig

```bash
ifconfig
```

네트워크 인터페이스와 주소를 확인한다.

## arp -a

```bash
arp -a
```

ARP 캐시를 확인한다. 같은 LAN에서 IP와 MAC 주소가 어떻게 연결되어 있는지 볼 수 있다.

## nslookup

```bash
nslookup example.com
```

DNS 조회 결과를 확인한다.

## ping

```bash
ping example.com
```

목적지에 응답이 오는지 관찰한다. 응답 여부는 네트워크 정책에 따라 달라질 수 있다.

## netstat -an

```bash
netstat -an
```

연결과 포트 상태를 관찰한다.

## 주의

- 명령 결과는 네트워크 설정, macOS 버전, 방화벽 정책에 따라 달라질 수 있다.
- 익숙하지 않은 외부 시스템을 스캔하거나 허가되지 않은 네트워크에서 시험하지 않는다.
