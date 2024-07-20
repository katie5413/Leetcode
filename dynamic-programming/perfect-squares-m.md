# Perfect Squares (M)

[279. Perfect Squares](https://leetcode.com/problems/perfect-squares/)



Given an integer `n`, return _the least number of perfect square numbers that sum to_ `n`.

A **perfect square** is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, `1`, `4`, `9`, and `16` are perfect squares while `3` and `11` are not.

&#x20;

**Example 1:**

<pre><code><strong>Input: n = 12
</strong><strong>Output: 3
</strong><strong>Explanation: 12 = 4 + 4 + 4.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: n = 13
</strong><strong>Output: 2
</strong><strong>Explanation: 13 = 4 + 9.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= n <= 10^4`

### Dynamic Programming

時間複雜度為 `O(n * sqrt(n))`，其中 `sqrt(n)` 是平方數的最大數量

```typescript
function numSquares(n: number): number {
    // 創建一個長度為 n+1 的數組 dp，初始化為無限大
    const dp: number[] = new Array(n + 1).fill(Infinity);
    // 0 需要 0 個完美平方數
    dp[0] = 0;

    // 遍歷從 1 到 n 的每個數字
    for (let i = 1; i <= n; i++) {
        // 遍歷所有可能的平方數
        for (let j = 1; j * j <= i; j++) {
            // 更新 dp[i] 為使用平方數 j*j 後的最小值
            dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
        }
    }

    // 返回 dp[n] 即為答案
    return dp[n];
}
```

假設要計算 n = 12，且已經計算到 dp\[12]：\
用小於 n 的每個平方數去扣掉

* 計算 dp\[12]:
* 使用平方數 1^2 = 1： 12-1=11
  * dp\[12] = Math.min(Infinity, dp\[11] + 1) = 4
* 使用平方數 2^2 = 4：12-4=8
  * dp\[12] = Math.min(4, dp\[8] + 1) = 3
* 使用平方數 3^2 = 9：12-9=3
  * dp\[12] = Math.min(3, dp\[3] + 1) = 3
* 更新後的 dp 陣列：
  * dp = \[0, 1, 2, 3, 1, 2, 3, 4, 2, 1, 2, 3, 3]

### Recursion

時間複雜度為 `O(n * sqrt(n))`

```typescript
// 用來存儲每個 n 對應的最少完全平方數的數量，減少重複運算
let solutionMap: Array<number> = [];

function numSquares(n: number): number {
    // 檢查解是否已經計算過
    if (solutionMap[n]) {
        return solutionMap[n];
    }
    // 計算 n 的最大完全平方數的根
    let maxNum = Math.floor(Math.sqrt(n));

    // 初始化 currentMinCount 為 n，因為最壞情況下，n 可以由 n 個 1 的平方數組成    
    let currentMinCount = n;

    // 遍歷從 maxNum 到 1 的所有可能的完全平方數根
    for(maxNum; maxNum > 1; maxNum--) {
        // 遞歸調用 numSquares 函數來計算 n - maxNum^2 所需的最少完全平方數的數量，再加上 1（表示使用了一個 maxNum^2）
        let perfectSquareNums = 1 + numSquares(n - (maxNum * maxNum));
        // 更新 最小值
        currentMinCount = Math.min(currentMinCount, perfectSquareNums);
    }
    
    // 將最小值更新到記錄的陣列中
    solutionMap[n] = currentMinCount;

    return currentMinCount;
};

```
