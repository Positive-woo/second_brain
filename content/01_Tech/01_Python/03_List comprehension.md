#listcomprehension
## 개요
list comprehension는 기존 list를 가지고 새로운 list를 더 짧고 간결하고 빠르게 생성하는 문법이다. 

나 또한 자주 애용하고 있지만, 쓰여진 코드를 해석할 수 는 있지만 직접 코드를 치는 경우는 드문 것 같다.
그래서 공부 겸 listcomprehension에 대해 공부하고 더욱 잘 이용해보려고 한다.

## 언제 사용할까?

리스트를 생성하고, for 문과 if 문을 통해 원하는 리스트를 만들 수 있다.
하지만 list comprehension을 사용한다면 코드의 직관성을 높일 수 있으며 속도 또한 빠르다.

- 기존
```python
list = []
for i in range(5):
	list.append(i)
# list = [0, 1, 2, 3, 4]
```

- listcomprehension
```python
[i for i in range(5)]
# [0, 1, 2, 3, 4]
```


뿐만 아니라 list comprehension은 코드 내부에서 if, else 조건까지 적용할 수 있다.
아니면 함수를 적용하는 것도 가능하다. (추후 설명)

## 사용 케이스 (지속적 정리)

### 기본 구조 : 표현식 + for

```python
a = [1, 2, 3, 4, 5]
b = []
for i in a:
	b.append(i + 1)
```

```python
a = [1, 2, 3, 4, 5]
b = [ i + 1 for i in a]
```

### 표현식 + for + 리스트 조건문

```python
a = [1, 2, 3, 4, 5]
b = [ i + 1 for i in a if i % 2 == 0]
# [3, 5]
```

### 표현식 + 조건문 + for
```python
a = [ 1, 2, 3, 4, 5]
b = [ '짝수' if i % 2 == 0 else '홀수' for i in a]
```

조건문 기점으로 좌 우 divide 한다고 생각하면 편할듯?
'짝수' 들어간 것이 i + 2 이런 것으로 변경도 가능하다.
### 중첩 for 문
```python
position = []
for i in range(1,3):
	for j in range(1,4):
		position.append(i*j)
```
```python
position = [ i*j for i in range(1,3) for j in range(1,4)]
```
### 함수 사용 케이스
```python
def square(x) :
	return x*x
	
nums = [1, 2, 3, 4]
result = [square(x) for x in nums]
```

```python
def is_even(x):
    return x % 2 == 0

nums = [1, 2, 3, 4, 5, 6]
result = [x for x in nums if is_even(x)]
```
