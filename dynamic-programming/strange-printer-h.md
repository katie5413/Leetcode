# Strange Printer (H)

[664. Strange Printer](https://leetcode.com/problems/strange-printer/)



There is a strange printer with the following two special properties:

* The printer can only print a sequence of **the same character** each time.
* At each turn, the printer can print new characters starting from and ending at any place and will cover the original existing characters.

Given a string `s`, return _the minimum number of turns the printer needed to print it_.

&#x20;

**Example 1:**

<pre><code><strong>Input: s = "aaabbb"
</strong><strong>Output: 2
</strong><strong>Explanation: Print "aaa" first and then print "bbb".
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: s = "aba"
</strong><strong>Output: 2
</strong><strong>Explanation: Print "aaa" first and then print "b" from the second place of the string, which will cover the existing character 'a'.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= s.length <= 100`
* `s` consists of lowercase English letters.





```typescript
function strangePrinter(s: string): number {
    const n = s.length; // 取得字串長度
    // 建立一個二維陣列 dp，dp[i][j] 表示打印 s[i] 到 s[j] 這段子串所需的最少次數
    const dp = Array.from({ length: n }, () => Array(n).fill(0));

    // 從後往前遍歷字串
    for (let i = n - 1; i >= 0; i--) {
        dp[i][i] = 1; // 單一字符的子串只需一次打印
        // 遍歷從 i+1 到 n-1 的每一個 j
        for (let j = i + 1; j < n; j++) {
            if (s[i] === s[j]) {
                // 如果 s[i] 和 s[j] 相同，則 dp[i][j] 可以與 dp[i][j-1] 一樣
                dp[i][j] = dp[i][j - 1];
            } else {
                // 如果 s[i] 和 s[j] 不同，初始化 dp[i][j] 為無限大
                dp[i][j] = Infinity;
                // 分段遍歷 k 將字串分割，計算最少打印次數
                for (let k = i; k < j; k++) {
                    dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k + 1][j]);
                }
            }
        }
    }

    return dp[0][n - 1]; // 返回打印整個字串 s 所需的最少次數
}
```
