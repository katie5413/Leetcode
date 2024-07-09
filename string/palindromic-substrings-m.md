# Palindromic Substrings (M)

Given a string `s`, return _the number of **palindromic substrings** in it_.

A string is a **palindrome** when it reads the same backward as forward.

A **substring** is a contiguous sequence of characters within the string.

&#x20;

**Example 1:**

<pre><code><strong>Input: s = "abc"
</strong><strong>Output: 3
</strong><strong>Explanation: Three palindromic strings: "a", "b", "c".
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: s = "aaa"
</strong><strong>Output: 6
</strong><strong>Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= s.length <= 1000`
* `s` consists of lowercase English letters.



### 中心擴展

```typescript
function countSubstrings(s: string): number {
    let n = s.length; // 獲取字符串的長度
    let count = 0;    // 記錄回文子字符串的數量

    // 遍歷所有可能的中心位置，中心可以是單個字符或兩個字符之間
    for (let center = 0; center < 2 * n - 1; center++) {
        // 確定中心點的左邊界和右邊界
        let left = Math.floor(center / 2);
        let right = left + (center % 2);

        // 從中心向外擴展，檢查是否形成回文
        while (left >= 0 && right < n && s[left] === s[right]) {
            count++;   // 若形成回文，計數器加一
            left--;    // 左邊界向左移動
            right++;   // 右邊界向右移動
        }
    }

    return count; // 返回總共找到的回文子字符串數量
}

```

* **變量初始化**：
  * `n` 用來存儲字符串 `s` 的長度。
  * `count` 用來存儲回文子字符串的總數。
* **中心位置遍歷**：
  * `for (let center = 0; center < 2 * n - 1; center++)`：
    * 我們遍歷所有可能的中心位置，從 `0` 到 `2 * n - 2`。
    * 每個中心位置代表一個可能的回文中心，中心可以是單個字符（如 `'a'`），也可以是兩個字符之間（如 `'aa'` 之間）。
* **確定左右邊界**：
  * `let left = Math.floor(center / 2)`：
    * `left` 表示當前中心的左邊界，對於奇數中心和偶數中心有不同的計算方法。
  * `let right = left + (center % 2)`：
    * `right` 表示當前中心的右邊界，根據 `center` 是否為奇數來決定 `right` 是否等於 `left` 或 `left + 1`。
  *   假設字符串 `s = "abc"`：

      * 字符長度 `n = 3`，因此 `center` 的範圍是 `0` 到 `4`。

      | `center` | `left` | `right` | 回文中心表示     |
      | -------- | ------ | ------- | ---------- |
      | 0        | 0      | 0       | `a`        |
      | 1        | 0      | 1       | `a 和 b 之間` |
      | 2        | 1      | 1       | `b`        |
      | 3        | 1      | 2       | `b 和 c 之間` |
      | 4        | 2      | 2       | `c`        |
* **回文擴展檢查**：
  * `while (left >= 0 && right < n && s[left] === s[right])`：
    * 從中心向外擴展，檢查 `left` 和 `right` 位置的字符是否相同。
    * 若相同，則形成回文子字符串，計數器 `count` 增加。
    * 然後 `left` 向左移動，`right` 向右移動，繼續擴展檢查。
  * 若字符不同或超出邊界，則停止擴展。
* **返回結果**：
  * `return count`：返回找到的回文子字符串的總數。



### 另外的寫法

```typescript
function countSubstrings(s: string): number {
    let n = s.length;
    let count = 0;

    for (let i = 0; i < n; i++) {
        // Count odd length palindromes centered at i
        count += expandAroundCenter(s, i, i);
        // Count even length palindromes centered at i and i+1
        count += expandAroundCenter(s, i, i + 1);
    }

    return count;
}

function expandAroundCenter(s: string, left: number, right: number): number {
    let count = 0;
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        count++;
        left--;
        right++;
    }
    return count;
}

```
