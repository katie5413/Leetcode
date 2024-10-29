# Maximum Number of Moves in a Grid (M)

[2684. Maximum Number of Moves in a Grid](https://leetcode.com/problems/maximum-number-of-moves-in-a-grid/)



You are given a **0-indexed** `m x n` matrix `grid` consisting of **positive** integers.

You can start at **any** cell in the first column of the matrix, and traverse the grid in the following way:

* From a cell `(row, col)`, you can move to any of the cells: `(row - 1, col + 1)`, `(row, col + 1)` and `(row + 1, col + 1)` such that the value of the cell you move to, should be **strictly** bigger than the value of the current cell.

Return _the **maximum** number of **moves** that you can perform._

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2023/04/11/yetgriddrawio-10.png)

<pre><code><strong>Input: grid = [[2,4,3,5],[5,4,9,3],[3,4,2,11],[10,9,13,15]]
</strong><strong>Output: 3
</strong><strong>Explanation: We can start at the cell (0, 0) and make the following moves:
</strong>- (0, 0) -> (0, 1).
- (0, 1) -> (1, 2).
- (1, 2) -> (2, 3).
It can be shown that it is the maximum number of moves that can be made.
</code></pre>

**Example 2:**

<pre><code>
<strong>Input: grid = [[3,2,4],[2,1,9],[1,1,7]]
</strong><strong>Output: 0
</strong><strong>Explanation: Starting from any cell in the first column we cannot perform any moves.
</strong></code></pre>

&#x20;

**Constraints:**

* `m == grid.length`
* `n == grid[i].length`
* `2 <= m, n <= 1000`
* `4 <= m * n <= 10^5`
* `1 <= grid[i][j] <= 10^6`



### DP

Ref. [https://leetcode.com/problems/maximum-number-of-moves-in-a-grid/solutions/5980453/list-most-common-interview-matrix-beats-100-explained-step-by-step](https://leetcode.com/problems/maximum-number-of-moves-in-a-grid/solutions/5980453/list-most-common-interview-matrix-beats-100-explained-step-by-step)

**時間複雜度**：`O(m * n)`，因為每個元素僅需遍歷一次。

**空間複雜度**：`O(m)`，用於儲存每行的最大移動次數的 `dp` 陣列。

#### 程式解析

1. **變數初始化**：
   * `m` 和 `n` 表示 `grid` 的行數與列數。
   * `res` 記錄最終結果，即可以到達的最大步數。
   * `dp` 陣列長度為 `m`，初始化為 `0`，表示每一行在當前列時的步數狀態。
2. **迴圈處理每一列（從第 1 列到最後一列）**：
   * 設定 `leftTop` 為上一行的值。
   * 設定 `found` 變數來判斷當前列是否還有可行的移動路徑，如果沒有可以移動的路徑則直接結束。
3. **對每一行進行檢查**：
   * `cur` 表示目前的移動步數，若無法移動則設為 `-1`。
   * 檢查目前行的上、左、下三個方向是否可以移動，並確保值比前一列值大。若符合條件則更新 `cur` 的步數為最大的移動次數。
   * 將 `dp[i]` 更新為 `cur`，並將 `leftTop` 更新為 `nxtLeftTop`。
4. **更新結果和結束條件**：
   * 若 `found` 為 `false`，表示當前列無法再移動，則結束迴圈。
   * 若可以移動，則更新 `res` 為目前的列數。
5. **返回最終結果**：
   * 返回 `res` 表示最大步數的列數。

```typescript
function maxMoves(grid: number[][]): number {
    const m: number = grid.length;    // 矩陣的行數
    const n: number = grid[0].length; // 矩陣的列數
    
    let res: number = 0;
    let dp: number[] = new Array(m).fill(0);
    
    // 遍歷每一列（從第 1 列開始）
    for (let j = 1; j < n; j++) {
        let leftTop: number = 0;      // 上一行的值
        let found: boolean = false;   // 檢查當前列是否有可行路徑
        
        // 對於每一行進行檢查
        for (let i = 0; i < m; i++) {
            let cur: number = -1;            // 當前步數
            let nxtLeftTop: number = dp[i];  // 下一個 leftTop 值
            
            // 檢查左上是否可以移動
            if (i - 1 >= 0 && leftTop !== -1 && grid[i][j] > grid[i - 1][j - 1]) {
                cur = Math.max(cur, leftTop + 1);
            }
            
            // 檢查左是否可以移動
            if (dp[i] !== -1 && grid[i][j] > grid[i][j - 1]) {
                cur = Math.max(cur, dp[i] + 1);
            }
            
            // 檢查左下是否可以移動
            if (i + 1 < m && dp[i + 1] !== -1 && grid[i][j] > grid[i + 1][j - 1]) {
                cur = Math.max(cur, dp[i + 1] + 1);
            }
            
            dp[i] = cur;                // 更新 dp 值
            found = found || (dp[i] !== -1); // 更新 found 狀態
            leftTop = nxtLeftTop;       // 更新 leftTop 值
        }
        
        // 若無可行路徑則結束
        if (!found) break;
        res = j; // 更新最遠可達列數
    }
    
    return res;
}

```

<figure><img src="../.gitbook/assets/截圖 2024-10-29 晚上11.38.52.png" alt=""><figcaption></figcaption></figure>

