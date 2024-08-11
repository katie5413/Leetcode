# Regions Cut By Slashes (M)

[959. Regions Cut By Slashes](https://leetcode.com/problems/regions-cut-by-slashes/)



An `n x n` grid is composed of `1 x 1` squares where each `1 x 1` square consists of a `'/'`, `'\'`, or blank space `' '`. These characters divide the square into contiguous regions.

Given the grid `grid` represented as a string array, return _the number of regions_.

Note that backslash characters are escaped, so a `'\'` is represented as `'\\'`.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2018/12/15/1.png)

<pre><code><strong>Input: grid = [" /","/ "]
</strong><strong>Output: 2
</strong></code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2018/12/15/2.png)

<pre><code><strong>Input: grid = [" /","  "]
</strong><strong>Output: 1
</strong></code></pre>

**Example 3:**

![](https://assets.leetcode.com/uploads/2018/12/15/4.png)

<pre><code><strong>Input: grid = ["/\\","\\/"]
</strong><strong>Output: 5
</strong><strong>Explanation: Recall that because \ characters are escaped, "\\/" refers to \/, and "/\\" refers to /\.
</strong></code></pre>

&#x20;

**Constraints:**

* `n == grid.length == grid[i].length`
* `1 <= n <= 30`
* `grid[i][j]` is either `'/'`, `'\'`, or `' '`.





### DFS

擴展圖形

```
/ =  0 0 1
     0 1 0
     1 0 0
```

設立一個 visited 陣列來紀錄每一格是否拜訪過

把 /, \ 也初始化為 True

遍歷圖形陣列，標記斜線位置為 true

設定 DFS 條件，遇到邊界、已訪問不做事，若未訪問過，則設為 true 並問候他鄰居

再次遍歷圖形，如果遇到未訪問的就 DFS 搜尋相鄰方格，並且增加區域計數

```typescript
function regionsBySlashes(grid: string[]): number {
    const n = grid.length;

    // 計算擴展後的網格大小
    // 因為每個單元格會被分割成 3x3 的小方格
    const N = n * 3;

    // 初始化訪問標記數組，用於記錄哪些小方格已經被訪問過
    const visited: boolean[][] = Array.from({ length: N }, () => Array(N).fill(false));

    // 深度優先搜尋 (DFS) 函式，用於遍歷區域
    const dfs = (x: number, y: number) => {
        // 如果超出邊界或已經訪問過，則返回
        if (x < 0 || x >= N || y < 0 || y >= N || visited[x][y]) {
            return;
        }

        // 標記當前小方格為已訪問
        visited[x][y] = true;

        // 遞迴遍歷相鄰的小方格
        dfs(x + 1, y);
        dfs(x - 1, y);
        dfs(x, y + 1);
        dfs(x, y - 1);
    };

    // 根據網格中的斜線和反斜線更新訪問標記數組
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            if (grid[i][j] === '/') {
                // 設置斜線 '/' 所影響的 3x3 小方格為訪問狀態
                visited[i * 3][j * 3 + 2] = true;
                visited[i * 3 + 1][j * 3 + 1] = true;
                visited[i * 3 + 2][j * 3] = true;
            } else if (grid[i][j] === '\\') {
                // 設置反斜線 '\' 所影響的 3x3 小方格為訪問狀態
                visited[i * 3][j * 3] = true;
                visited[i * 3 + 1][j * 3 + 1] = true;
                visited[i * 3 + 2][j * 3 + 2] = true;
            }
        }
    }

    // 初始化區域數量計數器
    let regions = 0;

    // 遍歷所有小方格，使用 DFS 搜索未訪問的區域
    for (let i = 0; i < N; ++i) {
        for (let j = 0; j < N; ++j) {
            if (!visited[i][j]) {
                // 如果當前小方格未被訪問，則開始新的 DFS 搜索
                dfs(i, j);
                // 增加區域數量計數器
                regions++;
            }
        }
    }

    // 返回最終計算出的區域數量
    return regions;
}
```



Note. 別人分享的解法 ，看不懂ＱＱ 先紀錄起來

### 聯合查找（Union-Find）

時間複雜度: $$O(n^2∗(a∗(n^2)))$$

空間複雜度: $$O(n^2)$$

```typescript
function regionsBySlashes(grid: string[]): number {
    const n = grid.length;
    const nn = n + 1; // 設定 nn 為 n + 1，用來處理邊界
    let count = 0; // 初始化區域數量計數器
    const parent: number[] = Array.from({ length: nn * nn }, (_, i) => i); // 初始化聯合查找（Union-Find）數組

    // 找到某個節點的根節點
    function find(node: number): number {
        // 檢查 node 是否是它自己的根節點
        // 如果不是，就繼續往上找根節點
        if (node !== parent[node]) {
            parent[node] = find(parent[node]); // 路徑壓縮
        }
        // 返回 node 的根節點
        return parent[node];
    }

    // 將兩個節點進行聯合
    function union(n1: number, n2: number): void {
        const root1 = find(n1); // 查找 n1 的根節點
        const root2 = find(n2); // 查找 n2 的根節點

        if (root1 !== root2) { // 如果 n1 和 n2 不在同一集合中
            parent[root2] = root1; // 將 n2 的根節點設為 n1 的根節點，實現集合合併
        } else {
            count++;
        }
    }

    // 將邊界節點連接到虛擬節點（0）
    for (let i = 0; i < nn; i++) {
        for (let j = 0; j < nn; j++) {
            if (i === 0 || j === 0 || i === n || j === n) {
                union(0, i * nn + j);
            }
        }
    }

    // 處理網格中的每個單元格
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '/') {
                // 處理斜線 '/' 的情況
                union((i + 1) * nn + j, i * nn + (j + 1));
            } else if (grid[i][j] === '\\') {
                // 處理反斜線 '\' 的情況
                union(i * nn + j, (i + 1) * nn + (j + 1));
            }
        }
    }

    return count; // 返回區域數量
}
```

<figure><img src="../.gitbook/assets/截圖 2024-08-11 下午3.34.56 (1).png" alt=""><figcaption></figcaption></figure>
