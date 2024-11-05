# Minimum Number of Changes to Make Binary String Beautiful (M)

[2914. Minimum Number of Changes to Make Binary String Beautiful](https://leetcode.com/problems/minimum-number-of-changes-to-make-binary-string-beautiful/)



You are given a **0-indexed** binary string `s` having an even length.

A string is **beautiful** if it's possible to partition it into one or more substrings such that:

* Each substring has an **even length**.
* Each substring contains **only** `1`'s or **only** `0`'s.

You can change any character in `s` to `0` or `1`.

Return _the **minimum** number of changes required to make the string_ `s` _beautiful_.

&#x20;

**Example 1:**

<pre><code><strong>Input: s = "1001"
</strong><strong>Output: 2
</strong><strong>Explanation: We change s[1] to 1 and s[3] to 0 to get string "1100".
</strong>It can be seen that the string "1100" is beautiful because we can partition it into "11|00".
It can be proven that 2 is the minimum number of changes needed to make the string beautiful.
</code></pre>

**Example 2:**

<pre><code><strong>Input: s = "10"
</strong><strong>Output: 1
</strong><strong>Explanation: We change s[1] to 1 to get string "11".
</strong>It can be seen that the string "11" is beautiful because we can partition it into "11".
It can be proven that 1 is the minimum number of changes needed to make the string beautiful.
</code></pre>

**Example 3:**

<pre><code><strong>Input: s = "0000"
</strong><strong>Output: 0
</strong><strong>Explanation: We don't need to make any changes as the string "0000" is beautiful already.
</strong></code></pre>

&#x20;

**Constraints:**

* `2 <= s.length <= 10^5`
* `s` has an even length.
* `s[i]` is either `'0'` or `'1'`.



#### 時間複雜度 **O(n)**，其中 `n` 是字串長度。

Ref. [https://leetcode.com/problems/minimum-number-of-changes-to-make-binary-string-beautiful/solutions/6008345/beats-100-00-for-loop-explained-with-example](https://leetcode.com/problems/minimum-number-of-changes-to-make-binary-string-beautiful/solutions/6008345/beats-100-00-for-loop-explained-with-example)



#### 程式解析

1. **初始化計數變數**：
   * `count` 用來記錄不同字符對數量。
2. **迭代字串**：
   * 使用 `for` 循環，指標 `i` 每次增加2（檢查相鄰字符對）。
   * 比較 `s[i]` 和 `s[i + 1]`，如果不同則增加 `count`。
3. **返回計數結果**。

```typescript
function minChanges(s: string): number {
    let count = 0; // 不同字符對計數
    for (let i = 0; i < s.length; i = i + 2) {
        // 若相鄰字符不同，計數加一
        if (s[i] != s[i + 1]) count++;
    }
    return count;
}

```

<figure><img src="../.gitbook/assets/截圖 2024-11-05 晚上11.58.50.png" alt=""><figcaption></figcaption></figure>

