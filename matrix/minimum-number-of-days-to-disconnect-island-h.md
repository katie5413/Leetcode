# Minimum Number of Days to Disconnect Island (H)

[1568. Minimum Number of Days to Disconnect Island](https://leetcode.com/problems/minimum-number-of-days-to-disconnect-island/)



You are given an `m x n` binary grid `grid` where `1` represents land and `0` represents water. An **island** is a maximal **4-directionally** (horizontal or vertical) connected group of `1`'s.

The grid is said to be **connected** if we have **exactly one island**, otherwise is said **disconnected**.

只要水平或垂直有相鄰的 1 就算是連通

In one day, we are allowed to change **any** single land cell `(1)` into a water cell `(0)`.

每次可以把一個 1 變成 0

Return _the minimum number of days to disconnect the grid_.

返回使島嶼斷開的最少次數

答案落在 0-2 之間



**Example 1:**

![](https://assets.leetcode.com/uploads/2021/12/24/land1.jpg)

<pre><code><strong>Input: grid = [[0,1,1,0],[0,1,1,0],[0,0,0,0]]
</strong>
<strong>Output: 2
</strong><strong>Explanation: We need at least 2 days to get a disconnected grid.
</strong>Change land grid[1][1] and grid[0][2] to water and get 2 disconnected island.
</code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/12/24/land2.jpg)

<pre><code><strong>Input: grid = [[1,1]]
</strong><strong>Output: 2
</strong><strong>Explanation: Grid of full water is also disconnected ([[1,1]] -> [[0,0]]), 0 islands.
</strong></code></pre>

&#x20;

**Constraints:**

* `m == grid.length`
* `n == grid[i].length`
* `1 <= m, n <= 30`
* `grid[i][j]` is either `0` or `1`.



### DFS

跟 [regions-cut-by-slashes-m.md](regions-cut-by-slashes-m.md "mention") 的解法蠻像

用矩陣紀錄已經走過的

```typescript
function minDays(grid: number[][]): number {
    const m = grid.length // 獲取網格的行數
    const n = grid[0].length // 獲取網格的列數

    // 定義四個方向：上、下、左、右
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1]
    ]

    // 判斷坐標是否在網格內部
    const isInBounds = (x: number, y: number): boolean => {
        return x >= 0 && x < m && y >= 0 && y < n
    }

    // 使用 DFS 遍歷島嶼
    const dfs = (x: number, y: number, visited: boolean[][]): void => {
        visited[x][y] = true // 標記當前節點為已訪問
        for (const [dx, dy] of directions) { // 遍歷四個方向
            const nx = x + dx // 計算新位置的 x 坐標
            const ny = y + dy // 計算新位置的 y 坐標
            if (isInBounds(nx, ny) && grid[nx][ny] === 1 && !visited[nx][ny]) {
                dfs(nx, ny, visited) // 遞迴訪問相鄰的陸地
            }
        }
    }

    // 計算島嶼的數量
    const countIslands = (): number => {
        const visited = Array.from({ length: m }, () => Array(n).fill(false)) // 初始化訪問記錄
        let count = 0 // 記錄島嶼數量
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (grid[i][j] === 1 && !visited[i][j]) { // 如果遇到未訪問的陸地
                    count++ // 島嶼數量加 1
                    dfs(i, j, visited) // 遍歷該島嶼
                }
            }
        }
        return count // 返回島嶼數量
    }

    // 如果網格初始時已經不連通，則直接返回 0
    if (countIslands() !== 1) return 0

    // 嘗試將每個陸地單元格變為水域，並檢查是否能使網格變為不連通
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) { // 如果是陸地
                grid[i][j] = 0 // 將其變為水域
                if (countIslands() !== 1) return 1 // 如果網格變為不連通，返回 1
                grid[i][j] = 1 // 還原為陸地
            }
        }
    }

    return 2 // 如果以上兩種情況都不成立，則需要至少 2 天
}

```



<figure><img src="../.gitbook/assets/截圖 2024-08-12 下午6.42.14.png" alt=""><figcaption></figcaption></figure>
