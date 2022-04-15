---
layout: post
title: "LIS 알고리즘 - 최장 증가 부분 수열 찾기"
subtitle: "LIS Algorithm"
category: devlog
tags: algorithm
---

* LIS (Longest Increasing Subsequence) : 최장 증가 부분수열<br>
LIS란 임의의 수열이 주어졌을 때, 해당 수열에서 몇 개의 수들을 뽑아 만든 부분수열 중 오름차순으로 정렬된(strictly increasing) 가장 긴 수열을 뜻합니다.

이 때 LIS의 길이를 구하는 방법은 크게 세가지가 있습니다.

* DP            O(*n*<sup>2</sup>)
* Binary Search O(*n*log*n*)
* Segment Tree  O(*n*log*n*)

오늘은 이 중 Binary Search, 즉 이분 탐색을 이용해 LIS의 길이와 수열을 찾는 방법을 알아보겠습니다.

<!--more-->

* this unordered seed list will be replaced by the toc
{:toc}

## 이분탐색을 이용한 LIS의 길이 구하기

C++로 해당 알고리즘을 구현하기 위해서는 [lower_bound()] 함수에 대한 이해가 필수입니다.

> Returns an iterator pointing to the first element in the range `[first,last)` which does not compare less than val.

주어진 값보다 작지 않은(같거나 큰) 첫번째 원소의 iterator를 리턴합니다.<br>

idx: [0  1  2  3  4  5  6]<br>
val: [1  2  3  4  4  5  6] 에서 4를 찾을 경우 idx 3에 위치한 iterator를 리턴합니다.

lower_bound() 함수의 **시간 복잡도**는 O(log*n*)입니다.<br>

전체 알고리즘의 수행과정은 매우 간단합니다.

1. 주어진 수열을 input 벡터라 하고, 빈 ans 벡터를 하나 생성합니다.
2. input 벡터를 처음부터 돌면서 ans 벡터의 마지막 원소와 대소를 비교합니다.
   1. if (if (ans.back() < num)) 일 경우: ans의 뒤에 push_back() 합니다.
   2. else : lower_bound() 함수를 이용해 ans 벡터내에 num이 들어갈 위치를 찾은 다음 값을 변경합니다.
3. 반복문이 종료된 후 생성된 ans 벡터의 길이가 LIS의 길이입니다.

**이 때 생성된 ans 벡터는 LIS가 아닙니다!!**<br>

예를 들어 input 벡터가 [3  2  5  2  3  1  4] 일 때, 생성되는 ans 벡터는 [1  3  4]가 출력되겠지만, [1  3  4]는 기존 수열의 부분 수열이 될 수 없습니다.<br>

```c++
#include <cstdio>
#include <algorithm>
#include <vector>
using namespace std;

typedef pair<int, int> pii;
typedef vector<int> vi;
typedef vector<pii> vii;

int n;

int main()
{
  vi inp;

  scanf("%d", &n);
  for (int i = 0; i < n; i++) {
    int tmp;
    scanf("%d", &tmp);
    inp.push_back(tmp);
  }

  // 첫 대소 비교를 위해 -1 원소 하나를 가지고 시작
  vi ans (1, -1);
  for (int num : inp) {
    if (ans.back() < num) {
      ans.push_back(num);
    } else {
      auto it = lower_bound(ans.begin(), ans.end(), num);
      *it = num;
    }
  }

  printf("%lu\n", ans.size()-1);
}
```

O(log*n*)의 lower_bound() 함수를 최대 *n*번 실행시키므로 시간 복잡도는 O(*n*log*n*) 임을 알 수 있습니다<br>

* 추천 문제: [12738: 가장 긴 증가하는 부분 수열 3]

## 역추적(Backtracking)을 통한 LIS 수열 구하기

앞서 보았듯이 생성된 ans 벡터는 실제 LIS를 나타내지 않습니다. 그렇기 때문에 LIS를 이루는 원소들을 알기 위해서는 추가 과정이 필요합니다.<br>먼저 `2` 과정에서 ans 벡터에 새로운 숫자가 들어갈 때 바로 앞 원소의 인덱스를 저장하는 backtrace 벡터를 새로 생성합니다. 이후 기존 ans 벡터에 새로운 값을 넣을 때 backtrace 벡터에 앞 원소의 인덱스를 저장하면 됩니다.

```c++
#include <cstdio>
#include <algorithm>
#include <vector>
#include <utility>
#include <limits>
using namespace std;

typedef pair<int, int> pii;
typedef vector<int> vi;
typedef vector<pii> vii;
int n;

bool comp(const pii &a, const pii &b);
vi lis(const vii &inp);

int main()
{
  vii inp;

  scanf("%d", &n);
  for (int i = 0; i < n; i++) {
    int tmp;
    scanf("%d", &tmp);
    inp.push_back({tmp, i});
  }

  vi ans = lis(inp);

  printf("%lu\n", ans.size());
  for (int i : ans)
    printf("%d ", i);
  printf("\n");
}

bool comp(const pii &a, const pii &b)
{
  return a.first < b.first;
}

vi lis(const vii &inp)
{
  vii ans (1, {-1, -1});
  vi backtrace (n+1, -1);
  vi lis;

  for (auto p : inp) {
    if (ans.back().first < p.first) {
      /* 추가 코드 */
      backtrace[p.second] = ans.back().second;
      /* 추가 코드 END */
      ans.push_back(p);
    } else {
      auto it = lower_bound(ans.begin(), ans.end(), p, comp);
      /* 추가 코드 */
      backtrace[p.second] = (it-1)->second;
      /* 추가 코드 END */
      *it = p;
    }
  }

  /* 추가 코드 */
  for (int cur = ans.back().second; cur >= 0; cur = backtrace[cur])
    lis.push_back(inp[cur].first);
  reverse(lis.begin(), lis.end());
  /* 추가 코드 END */
  return lis;
}
```

변경 부분을 강조하기 위해서 주석으로 나타내 보았습니다. 실제로 앞서 보았던 코드와 비교했을때 추가된 코드가 몇 줄 안됩니다.<br>
lis() 함수 내의 두번째 for 문을 통해 backtracking 하며 LIS에 속하는 원소들을 lis 벡터에 집어넣는 것을 확인할 수 있습니다.

* 추천 문제: [14003: 가장 긴 증가하는 부분 수열 4]

## Reference

* [나무위키] - 알고리즘을 따라가기 쉽도록 step by step으로 나와있습니다.
* [참고 사이트]
* [LIS 문제집]

<!-- Links -->
[lower_bound()]: http://www.cplusplus.com/reference/algorithm/lower_bound/ "C++ Reference"
[12738: 가장 긴 증가하는 부분 수열 3]: https://www.acmicpc.net/problem/12738 "12738"
[14003: 가장 긴 증가하는 부분 수열 4]: https://www.acmicpc.net/problem/14003 "14003"
[나무위키]: https://namu.wiki/w/%EC%B5%9C%EC%9E%A5%20%EC%A6%9D%EA%B0%80%20%EB%B6%80%EB%B6%84%20%EC%88%98%EC%97%B4 "최장 증가 부분 수열"
[참고 사이트]: http://gumgood.tistory.com/entry/Longest-Increasing-Subsequence "gumgood"
[LIS 문제집]: https://www.acmicpc.net/workbook/view/801 "문제집: LIS(cokcjswo)"
