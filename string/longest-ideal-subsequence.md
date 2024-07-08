# Longest Ideal Subsequence

You are given a string `s` consisting of lowercase letters and an integer `k`. We call a string `t` **ideal** if the following conditions are satisfied:

- `t` is a **subsequence** of the string `s`.
- The absolute difference in the alphabet order of every two **adjacent** letters in `t` is less than or equal to `k`.

Return *the length of the **longest** ideal string*.

A **subsequence** is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.

**Note** that the alphabet order is not cyclic. For example, the absolute difference in the alphabet order of `'a'` and `'z'` is `25`, not `1`.

**Example 1:**

```
Input: s = "acfgbd", k = 2
Output: 4
Explanation: The longest ideal string is "acbd". The length of this string is 4, so 4 is returned.
Note that "acfgbd" is not ideal because 'c' and 'f' have a difference of 3 in alphabet order.
```

**Example 2:**

```
Input: s = "abcd", k = 3
Output: 4
Explanation: The longest ideal string is "abcd". The length of this string is 4, so 4 is returned.

```

**Constraints:**

- `1 <= s.length <= 10^5`
- `0 <= k <= 25`
- `s` consists of lowercase English letters.

```tsx
function longestIdealString(s: string, k: number): number {
    // 初始化一個數組來記錄每個字母結束時的最長理想子序列長度
    const dp: number[] = new Array(26).fill(0);
    
    // 遍歷字符串 s 的每一個字符
    for (let char of s) {
        // 獲取字符的索引 (0 為 'a', 1 為 'b', ..., 25 為 'z')
        const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
        
        // 初始化當前字符的最大長度
        let maxLength = 0;
        
        // 檢查 k 範圍內的所有可能的字母
        for (let i = Math.max(0, index - k); i <= Math.min(25, index + k); i++) {
            maxLength = Math.max(maxLength, dp[i]);
        }
        
        // 更新 dp 陣列中當前字符的最大長度
        dp[index] = maxLength + 1;
    }
    
    // 返回 dp 陣列中的最大值，即最長理想子序列的長度
    return Math.max(...dp);
}
```

1. **字母索引**：
    - 將每個字母轉換為對應的索引。例如，'a' 對應 0，'b' 對應 1，...'z' 對應 25。這樣一來，我們可以使用一個長度為 26 的陣列來存儲每個字母結束時的最長理想子序列長度。
2. **初始化**：
    - 使用一個長度為 26 的陣列 `dp` 並將其初始化為 0。`dp[i]` 表示以字母 `i + 'a'` 結束的最長理想子序列的長度。
3. **更新規則**：
    - 對於字符串中的每個字符，我們需要考慮在範圍 `[index - k, index + k]` 內的所有可能字符，找出其中最大的一個作為當前字符的前一個字符，然後更新當前字符在 dp 中的值。

### 遍歷過程中的更新

- 對於字符串 `s` 中的每一個字符，計算其對應的索引。
- 對於當前字符的索引 `index`，查找範圍 `[max(0, index - k), min(25, index + k)]` 內的所有可能索引，找出這些索引對應的 `dp` 值的最大值，然後加 1 更新當前字符的 `dp` 值。

這樣做的好處是：

- 可以高效地查詢和更新每個字母對應的最長理想子序列長度。
- 使用長度為 26 的陣列，可以在常數時間內完成查詢和更新操作。

### 具體步驟

以下是 `s = "acfgbd"` 和 `k = 2` 的具體步驟，展示了如何在每一步更新 `dp` 陣列：

1. **初始化**：
    - `dp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]`
2. **處理字符 'a' (index = 0)**：
    - 查找範圍 [0, 2] 的 `dp` 值：`max(dp[0], dp[1], dp[2]) = max(0, 0, 0) = 0`
    - 更新 `dp[0] = 0 + 1 = 1`
    - `dp = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]`
3. **處理字符 'c' (index = 2)**：
    - 查找範圍 [0, 4] 的 `dp` 值：`max(dp[0], dp[1], dp[2], dp[3], dp[4]) = max(1, 0, 0, 0, 0) = 1`
    - 更新 `dp[2] = 1 + 1 = 2`
    - `dp = [1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]`
4. **處理字符 'f' (index = 5)**：
    - 查找範圍 [3, 7] 的 `dp` 值：`max(dp[3], dp[4], dp[5], dp[6], dp[7]) = max(0, 0, 0, 0, 0) = 0`
    - 更新 `dp[5] = 0 + 1 = 1`
    - `dp = [1, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]`
5. **處理字符 'g' (index = 6)**：
    - 查找範圍 [4, 8] 的 `dp` 值：`max(dp[4], dp[5], dp[6], dp[7], dp[8]) = max(0, 1, 0, 0, 0) = 1`
    - 更新 `dp[6] = 1 + 1 = 2`
    - `dp = [1, 0, 2, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]`
6. **處理字符 'b' (index = 1)**：
    - 查找範圍 [0, 3] 的 `dp` 值：`max(dp[0], dp[1], dp[2], dp[3]) = max(1, 0, 2, 0) = 2`
    - 更新 `dp[1] = 2 + 1 = 3`
    - `dp = [1, 3, 2, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]`
7. **處理字符 'd' (index = 3)**：
    - 查找範圍 [1, 5] 的 `dp` 值：`max(dp[1], dp[2], dp[3], dp[4], dp[5]) = max(3, 2, 0, 0, 1) = 3`
    - 更新 `dp[3] = 3 + 1 = 4`
    - `dp = [1, 3, 2, 4, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]`
