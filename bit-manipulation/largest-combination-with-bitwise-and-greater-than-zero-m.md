# Largest Combination With Bitwise AND Greater Than Zero (M)

[2275. Largest Combination With Bitwise AND Greater Than Zero](https://leetcode.com/problems/largest-combination-with-bitwise-and-greater-than-zero/)



The **bitwise AND** of an array `nums` is the bitwise AND of all integers in `nums`.

* For example, for `nums = [1, 5, 3]`, the bitwise AND is equal to `1 & 5 & 3 = 1`.
* Also, for `nums = [7]`, the bitwise AND is `7`.

You are given an array of positive integers `candidates`. Evaluate the **bitwise AND** of every **combination** of numbers of `candidates`. Each number in `candidates` may only be used **once** in each combination.

Return _the size of the **largest** combination of_ `candidates` _with a bitwise AND **greater** than_ `0`.

&#x20;

**Example 1:**

<pre><code><strong>Input: candidates = [16,17,71,62,12,24,14]
</strong><strong>Output: 4
</strong><strong>Explanation: The combination [16,17,62,24] has a bitwise AND of 16 &#x26; 17 &#x26; 62 &#x26; 24 = 16 > 0.
</strong>The size of the combination is 4.
It can be shown that no combination with a size greater than 4 has a bitwise AND greater than 0.
Note that more than one combination may have the largest size.
For example, the combination [62,12,24,14] has a bitwise AND of 62 &#x26; 12 &#x26; 24 &#x26; 14 = 8 > 0.
</code></pre>

**Example 2:**

<pre><code><strong>Input: candidates = [8,8]
</strong><strong>Output: 2
</strong><strong>Explanation: The largest combination [8,8] has a bitwise AND of 8 &#x26; 8 = 8 > 0.
</strong>The size of the combination is 2, so we return 2.
</code></pre>

&#x20;

**Constraints:**

* `1 <= candidates.length <= 10^5`
* `1 <= candidates[i] <= 10^7`



在給定的候選數字陣列 `candidates` 中，找出可以形成的 "位元 1 的最大組合數"。

透過統計每個二進位位置上出現 "1" 的數量來達成





#### 解釋

1. **陣列初始化**：`ans` 陣列大小為 32，用來存放每個位元位置上 "1" 的次數（對應 32 位的二進位數字）。
2. **累加位元 1 的數量**：`find` 函數將每個數字的二進位中每一位上是 "1" 的次數累加到 `ans` 中。
3. **計算最大值**：在 `ans` 陣列中找出最大值，表示最多的一個位元位置上 "1" 出現的次數，並將此值作為答案返回。

Ref. [https://leetcode.com/problems/largest-combination-with-bitwise-and-greater-than-zero/solutions/6017206/beats-100-explained-step-by-step-most-common-array-interview-problems](https://leetcode.com/problems/largest-combination-with-bitwise-and-greater-than-zero/solutions/6017206/beats-100-explained-step-by-step-most-common-array-interview-problems)

```typescript
function largestCombination(candidates: number[]): number {
    // 初始化一個大小為 32 的陣列，每個元素初始為 0，用來統計每個位元位置上出現 "1" 的數量
    const ans: number[] = new Array(32).fill(0);
    
    // 對於每個候選數字，計算它在各位元上的 "1" 數量
    for (const x of candidates) {
        find(x, ans); // 將每個候選數字的位元 1 數量累加到 ans 陣列
    }
    
    // 初始化結果變數 res 為 0
    let res = 0;
    // 對於每個位元位置，找出最大值，即某個位元位置上出現 "1" 的最多次數
    for (let i = 0; i < 32; i++) {
        res = Math.max(res, ans[i]);  // 更新最大值
    }
    
    return res;  // 返回最大 "1" 組合數
}

// 計算每個數字在各個位元位置上出現的 "1" 並累加到 ans 中
function find(n: number, ans: number[]): void {
    let j = 31;  // 設置位元指標為 31（最高位）
    
    // 當 n 還有值時，逐位檢查
    while (n > 0) {
        const a = n & 1;  // 使用位元運算取得最低位元的值 (0 或 1)
        ans[j] += a;  // 將當前位元位置的 "1" 次數累加
        n >>= 1;  // 右移一位，檢查下一個位元
        j--;  // 位元指標減一
    }
}

```

<figure><img src="../.gitbook/assets/截圖 2024-11-07 晚上11.20.33.png" alt=""><figcaption></figcaption></figure>

