# Count Sub Islands (M)

[1905. Count Sub Islands](https://leetcode.com/problems/count-sub-islands/)



You are given two `m x n` binary matrices `grid1` and `grid2` containing only `0`'s (representing water) and `1`'s (representing land). An **island** is a group of `1`'s connected **4-directionally** (horizontal or vertical). Any cells outside of the grid are considered water cells.

An island in `grid2` is considered a **sub-island** if there is an island in `grid1` that contains **all** the cells that make up **this** island in `grid2`.

Return the _**number** of islands in_ `grid2` _that are considered **sub-islands**_.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/06/10/test1.png)

<pre><code><strong>Input: grid1 = [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]], grid2 = [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]
</strong><strong>Output: 3
</strong><strong>Explanation: In the picture above, the grid on the left is grid1 and the grid on the right is grid2.
</strong>The 1s colored red in grid2 are those considered to be part of a sub-island. There are three sub-islands.
</code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/06/03/testcasex2.png)

<pre><code><strong>Input: grid1 = [[1,0,1,0,1],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1],[1,0,1,0,1]], grid2 = [[0,0,0,0,0],[1,1,1,1,1],[0,1,0,1,0],[0,1,0,1,0],[1,0,0,0,1]]
</strong><strong>Output: 2 
</strong><strong>Explanation: In the picture above, the grid on the left is grid1 and the grid on the right is grid2.
</strong>The 1s colored red in grid2 are those considered to be part of a sub-island. There are two sub-islands.
</code></pre>

&#x20;

**Constraints:**

* `m == grid1.length == grid2.length`
* `n == grid1[i].length == grid2[i].length`
* `1 <= m, n <= 500`
* `grid1[i][j]` and `grid2[i][j]` are either `0` or `1`.



**重點**

* 島嶼：由一組相連的「1」組成，這些「1」在水平或垂直方向上連接。
* 子島嶼：grid2 中的一個島嶼如果在 grid1 中的相應位置上也有相同的「1」分佈，那麼這個島嶼就是子島嶼。



### DFS

時間複雜度： O(rows\*cols)

```typescript
function countSubIslands(grid1: number[][], grid2: number[][]): number {
    const rows = grid1.length;
    const cols = grid1[0].length;

    const dfs = (r: number, c: number): boolean => {
        // 如果超出邊界或該單元格是水，則返回 true，因為不影響是否為子島嶼的判斷
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid2[r][c] === 0) {
            return true;
        }

        // 如果 grid2 中的單元格是陸地，但 grid1 中對應的單元格是水，則返回 false
        let isSubIsland = grid1[r][c] === 1;

        // 標記該單元格已被訪問
        grid2[r][c] = 0;

        // 對四個方向進行 DFS，只要有一個 false 就代表不是子島嶼
        isSubIsland = dfs(r - 1, c) && isSubIsland;
        isSubIsland = dfs(r + 1, c) && isSubIsland;
        isSubIsland = dfs(r, c - 1) && isSubIsland;
        isSubIsland = dfs(r, c + 1) && isSubIsland;

        return isSubIsland;
    };

    let subIslandCount = 0;

    // 遍歷 grid2 以尋找島嶼
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // 如果在 grid2 中是島嶼的一部分，則執行 DFS
            if (grid2[r][c] === 1) {
                // 如果 DFS 後確認是子島嶼，則增加計數
                if (dfs(r, c)) {
                    subIslandCount++;
                }
            }
        }
    }

    return subIslandCount;
}
```

