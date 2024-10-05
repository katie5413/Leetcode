# Permutation in String (M)

[567. Permutation in String](https://leetcode.com/problems/permutation-in-string/)



Given two strings `s1` and `s2`, return `true` if `s2` contains a&#x20;

permutation of `s1`, or `false` otherwise.

In other words, return `true` if one of `s1`'s permutations is the substring of `s2`.

&#x20;

**Example 1:**

<pre><code><strong>Input: s1 = "ab", s2 = "eidbaooo"
</strong><strong>Output: true
</strong><strong>Explanation: s2 contains one permutation of s1 ("ba").
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: s1 = "ab", s2 = "eidboaoo"
</strong><strong>Output: false
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= s1.length, s2.length <= 104`
* `s1` and `s2` consist of lowercase English letters.



### Sliding Window

```typescript
function checkInclusion(s1: string, s2: string): boolean {
  // 建立兩個長度為 26 的數組來記錄字符頻率，分別對應 s1 和當前 s2 的窗口
  const freqS1 = Array(26).fill(0);  // 記錄 s1 的字符頻率
  const currentFreq = Array(26).fill(0);  // 記錄當前 s2 窗口的字符頻率
  const k = s1.length;  // 窗口的大小等於 s1 的長度
  const n = s2.length;  // s2 的長度

  // 這個函數將字母轉換為對應的 0-25 的索引
  const getLetterPos = (c: string) => c.charCodeAt(0) - 97;

  // 這個函數比較兩個數組的值是否完全相同，來判斷兩個窗口是否匹配
  const checkEq = (a1: number[], a2: number[]) => {
    for (let i = 0; i < a1.length; i++) {
      if (a1[i] !== a2[i]) {
        return false;  // 只要有一個字符的頻率不同，就返回 false
      }
    }
    return true;  // 所有字符頻率相同，返回 true
  }

  // 如果 s1 比 s2 還長，那 s2 不可能包含 s1 的排列
  if (s2.length < s1.length) {
    return false;
  }

  // 計算 s1 和 s2 中最初 k 個字符的頻率
  for (let i = 0; i < k; i++) {
    freqS1[getLetterPos(s1[i])]++;  // s1 的字符頻率增加
    currentFreq[getLetterPos(s2[i])]++;  // s2 的前 k 個字符頻率增加
  }

  // 檢查初始窗口是否匹配
  if (checkEq(freqS1, currentFreq)) {
    return true;  // 如果匹配，返回 true
  }

  // 進行滑動窗口檢查，從索引 k 開始遍歷 s2
  for (let i = k; i < n; i++) {
    currentFreq[getLetterPos(s2[i])]++;  // 新增的字符進入窗口
    currentFreq[getLetterPos(s2[i - k])]--;  // 移除滑出窗口的字符

    // 每次檢查當前窗口的字符頻率是否和 s1 相同
    if (checkEq(freqS1, currentFreq)) {
      return true;  // 如果匹配，返回 true
    }
  }

  // 如果所有窗口都檢查過了還沒找到匹配的，返回 false
  return false;    
};
```



### 推薦）Math 質數 hash table

```typescript
function checkInclusion(s1: string, s2: string, k = s1.length, hash1 = 0, hash2 = 0): boolean {
  const prime = [2, 6, 15, 28, 55, 78, 119, 152, 207, 290, 341, 444, 533, 602, 705, 848, 1003, 1098, 1273, 1420, 1533, 1738, 1909, 2136, 2425, 2626]
  for ( let i = 0; i < k; i++ ) {
    hash1 += prime[s1.charCodeAt(i) - 97]
    hash2 += prime[s2.charCodeAt(i) - 97]
  }
  if ( hash1 === hash2 ) {
    return true
  }
  for ( let i = 0; i < s2.length - k; i++ ) {
    hash2 += prime[s2.charCodeAt(i + k) - 97] - prime[s2.charCodeAt(i) - 97]
    if ( hash1 === hash2 ) {
      return true
    }
  }
  return false
};
```

