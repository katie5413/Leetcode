# All Ancestors of a Node in a Directed Acyclic Graph (M)

You are given a positive integer `n` representing the number of nodes of a **Directed Acyclic Graph** (DAG). (有向無環)The nodes are numbered from `0` to `n - 1` (**inclusive**).

You are also given a 2D integer array `edges`, where `edges[i] = [from_i, to_i]` denotes that there is a **unidirectional** edge from `from_i` to `to_i` in the graph.

Return _a list_ `answer`_, where_ `answer[i]` _is the **list of ancestors** of the_ `i_th` _node, sorted in **ascending order**_.

A node `u` is an **ancestor** of another node `v` if `u` can reach `v` via a set of edges.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2019/12/12/e1.png)

<pre><code><strong>Input: n = 8, edgeList = [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]
</strong><strong>Output: [[],[],[],[0,1],[0,2],[0,1,3],[0,1,2,3,4],[0,1,2,3]]
</strong><strong>Explanation:
</strong>The above diagram represents the input graph.
- Nodes 0, 1, and 2 do not have any ancestors.
- Node 3 has two ancestors 0 and 1.
- Node 4 has two ancestors 0 and 2.
- Node 5 has three ancestors 0, 1, and 3.
- Node 6 has five ancestors 0, 1, 2, 3, and 4.
- Node 7 has four ancestors 0, 1, 2, and 3.
</code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2019/12/12/e2.png)

<pre><code><strong>Input: n = 5, edgeList = [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
</strong><strong>Output: [[],[0],[0,1],[0,1,2],[0,1,2,3]]
</strong><strong>Explanation:
</strong>The above diagram represents the input graph.
- Node 0 does not have any ancestor.
- Node 1 has one ancestor 0.
- Node 2 has two ancestors 0 and 1.
- Node 3 has three ancestors 0, 1, and 2.
- Node 4 has four ancestors 0, 1, 2, and 3.
</code></pre>

&#x20;

**Constraints:**

* `1 <= n <= 1000`
* `0 <= edges.length <= min(2000, n * (n - 1) / 2)`
* `edges[i].length == 2`
* `0 <= from_i, toi <= n - 1`
* `from_i != toi`
* There are no duplicate edges.
* The graph is **directed** and **acyclic**.



```typescript
function getAncestors(n: number, edges: number[][]): number[][] {
    // 建立一個長度為 n 的陣列，每個元素都是一個 Set，用來儲存每個節點的鄰接節點
    const map: Set<number>[] = Array.from({ length: n }, () => new Set());

    // 建立一個長度為 n 的陣列，每個元素都是一個空陣列，用來儲存每個節點的祖先節點
    const res: number[][] = Array.from({ length: n }, () => []);

    // 使用 Uint8Array 來記錄節點是否已經被訪問過
    const visited: Uint8Array = new Uint8Array(n);

    // 深度優先搜尋 (DFS) 遞迴函式
    const dfs = (v: number, p: number): void => {
        visited[v] = 1; // 標記當前節點 v 已被訪問
        if (v !== p) res[v].push(p); // 如果 v 不是自身（p），將 p 添加到 v 的祖先列表中
        for (const x of map[v]) { // 遍歷 v 的所有鄰接節點
            if (!visited[x]) dfs(x, p); // 若鄰接節點 x 未被訪問，則遞迴訪問
        }
    };

    // 根據邊的資料填充鄰接表
    edges.forEach(([u, v]) => map[u].add(v));

    // 對每個節點進行 DFS，找出其所有祖先節點
    for (let i = 0; i < n; ++i) {
        visited.fill(0); // 每次 DFS 前清空訪問記錄
        dfs(i, i); // 從節點 i 開始進行 DFS
    }

    return res; // 回傳每個節點的祖先列表
}
```

