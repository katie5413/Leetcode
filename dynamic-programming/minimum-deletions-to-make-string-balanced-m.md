# Minimum Deletions to Make String Balanced (M)

[1653. Minimum Deletions to Make String Balanced](https://leetcode.com/problems/minimum-deletions-to-make-string-balanced/)



You are given a string `s` consisting only of characters `'a'` and `'b'`​​​​.

You can delete any number of characters in `s` to make `s` **balanced**. `s` is **balanced** if there is no pair of indices `(i,j)` such that `i < j` and `s[i] = 'b'` and `s[j]= 'a'`.

Return _the **minimum** number of deletions needed to make_ `s` _**balanced**_.

&#x20;

**Example 1:**

<pre><code><strong>Input: s = "aababbab"
</strong><strong>Output: 2
</strong><strong>Explanation: You can either:
</strong>Delete the characters at 0-indexed positions 2 and 6 ("aababbab" -> "aaabbb"), or
Delete the characters at 0-indexed positions 3 and 6 ("aababbab" -> "aabbbb").
</code></pre>

**Example 2:**

<pre><code><strong>Input: s = "bbaaaaabb"
</strong><strong>Output: 2
</strong><strong>Explanation: The only solution is to delete the first two characters.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= s.length <= 10^5`
* `s[i]` is `'a'` or `'b'`​​.



### 一次遍歷字串並且使用兩個計數器

時間複雜度為 O(n)

```typescript
function minimumDeletions(s: string): number {
    // 初始化需要刪除的字元數為0
    let deletions = 0;
    // 初始化'遇到的b的數量'為0
    let counts = 0;

    // 遍歷字串 s 中的每個字元
    for (let ch of s) {
        if (ch === 'b') {
            // 如果當前字元是 'b'，增加 'b' 的數量
            counts += 1;
        } else if (counts > 0) {
            // 如果當前字元是 'a' 且之前出現過 'b'，表示有不平衡情況
            // 增加刪除數量，因為需要刪除這個 'a' 來消除不平衡
            deletions += 1;
            // 將 'b' 的計數減少1，因為這個 'a' 已經被處理掉了
            counts -= 1;
        }
    }

    // 返回需要刪除的最少次數
    return deletions;
}
```



### 前綴和後綴的計數

通過一次遍歷計算總共的 ‘a’ 的數量，然後通過第二次遍歷計算每個位置上的最小刪除數，並更新全局的最小刪除數

```typescript
function minimumDeletions(s: string): number {
    // 初始化最小刪除數為無限大
    let min = Infinity;
    // 計數字串中 'a' 的數量
    let countA = 0;
    // 遍歷字串，計算總共的 'a' 的數量
    for (let i = 0; i < s.length; ++i) {
        countA += +(s[i] === 'a'); // 如果 s[i] 是 'a'，countA 增加1
    }
    // 初始化 'b' 的計數為0
    let countB = 0;
    // 遍歷字串的每個位置，計算最小刪除數
    for (let i = 0; i <= s.length; ++i) {
        // 計算當前位置的刪除數量（前面 'b' 的數量 + 後面 'a' 的數量）
        min = Math.min(min, countB + countA);
        // 如果已經遍歷到字串結尾，則跳出迴圈
        if (i === s.length) break;
        // 如果當前字元是 'a'，將後面 'a' 的數量減少1
        countA -= +(s[i] === 'a');
        // 如果當前字元是 'b'，將前面 'b' 的數量增加1
        countB += +(s[i] === 'b');
    }

    // 返回最小刪除數
    return min;
}
```
