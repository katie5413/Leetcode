# Count Square Submatrices with All Ones (M)

[1277. Count Square Submatrices with All Ones](https://leetcode.com/problems/count-square-submatrices-with-all-ones/)



Given a `m * n` matrix of ones and zeros, return how many **square** submatrices have all ones.

&#x20;

**Example 1:**

<pre><code><strong>Input: matrix =
</strong>[
  [0,1,1,1],
  [1,1,1,1],
  [0,1,1,1]
]
<strong>Output: 15
</strong><strong>Explanation: 
</strong><strong>There are 10 squares of side 1.
</strong><strong>There are 4 squares of side 2.
</strong><strong>There is  1 square of side 3.
</strong><strong>Total number of squares = 10 + 4 + 1 = 15.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: matrix = 
</strong>[
  [1,0,1],
  [1,1,0],
  [1,1,0]
]
<strong>Output: 7
</strong><strong>Explanation: 
</strong>There are 6 squares of side 1.  
<strong>There is 1 square of side 2. 
</strong>Total number of squares = 6 + 1 = 7.
</code></pre>

&#x20;

**Constraints:**

* `1 <= arr.length <= 300`
* `1 <= arr[0].length <= 300`
* `0 <= arr[i][j] <= 1`



### DP

Ref. [https://leetcode.com/problems/count-square-submatrices-with-all-ones/solutions/5972616/explained-step-by-step-beats-100-working-27-10-2024](https://leetcode.com/problems/count-square-submatrices-with-all-ones/solutions/5972616/explained-step-by-step-beats-100-working-27-10-2024)

* **時間複雜度**：`O(n * m)`，因為每個位置只遍歷一次。
* **空間複雜度**：`O(n * m)`，需要額外的 DP 表格儲存每個位置的計算結果。

#### 程式解析

1. **變數初始化**：
   * `n`：矩陣的列數。
   * `m`：矩陣的欄數。
   * `dp`：動態規劃表格，大小與矩陣相同，用來記錄每個位置可形成的正方形的邊長。
2. **初始化 DP 表格的第一列和第一行**：
   * 因為邊界上的每個位置僅能形成大小為 `1x1` 的正方形，因此直接將矩陣的值複製到 `dp` 表中對應的位置，並加到答案變數 `ans`。
3. **填充 DP 表格**：
   * 從第二列和第二行開始，對於每個位置 `dp[i][j]`，若矩陣的值 `matrix[i][j]` 為 `1`，計算出以該位置為右下角的最大正方形的邊長。
   * `dp[i][j]` 的值等於 `1 + min(dp[i][j-1], dp[i-1][j], dp[i-1][j-1])`，即左方、上方和左上方的最小值加上 `1`。
   * 每次更新 `dp[i][j]` 後，將其加到 `ans`，累加所有正方形的數量。

```typescript
function countSquares(matrix: number[][]): number {
    const n: number = matrix.length;    // 矩陣的行數
    const m: number = matrix[0].length; // 矩陣的列數
    
    // 建立與矩陣同維度的 DP 表格
    const dp: number[][] = Array(n).fill(0).map(() => Array(m).fill(0));
    
    let ans: number = 0;
    
    // 初始化 DP 表格的第一列
    for (let i = 0; i < n; i++) {
        dp[i][0] = matrix[i][0];
        ans += dp[i][0];
    }
    
    // 初始化 DP 表格的第一行
    for (let j = 1; j < m; j++) {
        dp[0][j] = matrix[0][j];
        ans += dp[0][j];
    }
    
    // 填充 DP 表格的其他位置
    for (let i = 1; i < n; i++) {
        for (let j = 1; j < m; j++) {
            if (matrix[i][j] === 1) {
                dp[i][j] = 1 + Math.min(
                    dp[i][j-1],
                    dp[i-1][j],
                    dp[i-1][j-1]
                );
            }
            ans += dp[i][j];
        }
    }
    
    return ans;
}

```
