# Separate Black and White Balls (M)

[2938. Separate Black and White Balls](https://leetcode.com/problems/separate-black-and-white-balls/)



There are `n` balls on a table, each ball has a color black or white.

You are given a **0-indexed** binary string `s` of length `n`, where `1` and `0` represent black and white balls, respectively.

In each step, you can choose two adjacent balls and swap them.

Return _the **minimum** number of steps to group all the black balls to the right and all the white balls to the left_.

&#x20;

**Example 1:**

<pre><code><strong>Input: s = "101"
</strong><strong>Output: 1
</strong><strong>Explanation: We can group all the black balls to the right in the following way:
</strong>- Swap s[0] and s[1], s = "011".
Initially, 1s are not grouped together, requiring at least 1 step to group them to the right.
</code></pre>

**Example 2:**

<pre><code><strong>Input: s = "100"
</strong><strong>Output: 2
</strong><strong>Explanation: We can group all the black balls to the right in the following way:
</strong>- Swap s[0] and s[1], s = "010".
- Swap s[1] and s[2], s = "001".
It can be proven that the minimum number of steps needed is 2.
</code></pre>

**Example 3:**

<pre><code><strong>Input: s = "0111"
</strong><strong>Output: 0
</strong><strong>Explanation: All the black balls are already grouped to the right.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= n == s.length <= 10^5`
* `s[i]` is either `'0'` or `'1'`.



Ref

[https://leetcode.com/problems/separate-black-and-white-balls/solutions/5916716/typescript-approach-o-n-time-o-1-space](https://leetcode.com/problems/separate-black-and-white-balls/solutions/5916716/typescript-approach-o-n-time-o-1-space)

* **時間複雜度**：`O(n)`，因為程式碼遍歷字串一次，其中 `n` 是字串的長度。
* **空間複雜度**：`O(1)`，只使用了常數的額外空間。

```typescript
function minimumSteps(s: string): number {
    let count = 0 // 記錄 '0' 的個數
    let moves = 0 // 記錄總共的移動步數

    // 從字串最後一個字元開始遍歷
    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === '0') {
            // 如果是 '0'，則累計 '0' 的個數
            count++
        } else {
            // 如果是 '1'，則累加移動步數
            moves += count
        }
    }

    return moves // 返回最小移動步數
}

```



#### 詳細步驟：

1. **從字串的最後一個字元開始往前遍歷**：
   * 如果當前字元是 '0'，則 `count` 增加 1。
   * 如果當前字元是 '1'，則該 '1' 需要被移動的步數等於目前累積的 `count`，因此將這個步數加到 `moves`。
2. **最後返回 `moves`**，即為所需的最小步數。
