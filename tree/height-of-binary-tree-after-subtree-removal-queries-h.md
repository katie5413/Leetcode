# Height of Binary Tree After Subtree Removal Queries (H)

[2458. Height of Binary Tree After Subtree Removal Queries](https://leetcode.com/problems/height-of-binary-tree-after-subtree-removal-queries/)



You are given the `root` of a **binary tree** with `n` nodes. Each node is assigned a unique value from `1` to `n`. You are also given an array `queries` of size `m`.

You have to perform `m` **independent** queries on the tree where in the `ith` query you do the following:

* **Remove** the subtree rooted at the node with the value `queries[i]` from the tree. It is **guaranteed** that `queries[i]` will **not** be equal to the value of the root.

Return _an array_ `answer` _of size_ `m` _where_ `answer[i]` _is the height of the tree after performing the_ `ith` _query_.

**Note**:

* The queries are independent, so the tree returns to its **initial** state after each query.
* The height of a tree is the **number of edges in the longest simple path** from the root to some node in the tree.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2022/09/07/binaryytreeedrawio-1.png)

<pre><code><strong>Input: root = [1,3,4,2,null,6,5,null,null,null,null,null,7], queries = [4]
</strong><strong>Output: [2]
</strong><strong>Explanation: The diagram above shows the tree after removing the subtree rooted at node with value 4.
</strong>The height of the tree is 2 (The path 1 -> 3 -> 2).
</code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2022/09/07/binaryytreeedrawio-2.png)

<pre><code><strong>Input: root = [5,8,9,2,1,3,7,4,6], queries = [3,2,4,8]
</strong><strong>Output: [3,2,3,2]
</strong><strong>Explanation: We have the following queries:
</strong>- Removing the subtree rooted at node with value 3. The height of the tree becomes 3 (The path 5 -> 8 -> 2 -> 4).
- Removing the subtree rooted at node with value 2. The height of the tree becomes 2 (The path 5 -> 8 -> 1).
- Removing the subtree rooted at node with value 4. The height of the tree becomes 3 (The path 5 -> 8 -> 2 -> 6).
- Removing the subtree rooted at node with value 8. The height of the tree becomes 2 (The path 5 -> 9 -> 3).
</code></pre>

&#x20;

**Constraints:**

* The number of nodes in the tree is `n`.
* `2 <= n <= 10^5`
* `1 <= Node.val <= n`
* All the values in the tree are **unique**.
* `m == queries.length`
* `1 <= m <= min(n, 10^4)`
* `1 <= queries[i] <= n`
* `queries[i] != root.val`



**時間複雜度**：遍歷樹的時間是 O(n)，加上計算左右最大高度的 O(n) 和查詢的 O(k)，整體約為 O(n + k)。

**空間複雜度**：需要 O(n) 儲存節點深度、邊界與高度資料。

Ref. [https://leetcode.com/problems/height-of-binary-tree-after-subtree-removal-queries/solutions/5968836/explained-step-by-step-beats-100-working-26-10-2024](https://leetcode.com/problems/height-of-binary-tree-after-subtree-removal-queries/solutions/5968836/explained-step-by-step-beats-100-working-26-10-2024)

#### 程式說明

1. **初始化與變數宣告**：
   * `heights`: 儲存每個葉節點的高度。
   * `d`: 儲存每個節點的深度。
   * `l`, `r`: 儲存每個節點的左右邊界索引，方便查詢其對應的子樹高度。
   * `len`: 用來計算葉節點數量。
2. **DFS 遞迴函式 `search`**：
   * 用來遍歷二元樹，將每個節點的深度、左右邊界、葉節點高度記錄到對應的陣列中。
   * `l[p.val]` 和 `r[p.val]` 會將葉節點的左右邊界索引設為相同，並且隨著 DFS 遞迴更新非葉節點的邊界索引。
3. **最大高度陣列 `maxl` 和 `maxr`**：
   * `maxl`：從左到右儲存每個節點的最大高度。
   * `maxr`：從右到左儲存每個節點的最大高度。
4. **查詢處理**：
   * 對每個查詢，使用對應節點的左、右邊界索引從 `maxl` 和 `maxr` 中獲取該節點左、右側的最大高度。
   * 每個查詢的結果是左側、右側最大高度和該節點父節點深度的最大值，表示移除查詢節點後能獲得的最大樹高。



```typescript
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function treeQueries(root: TreeNode | null, queries: number[]): number[] {
    // 儲存樹的相關資訊
    const heights: number[] = new Array(50000).fill(0);  // 儲存葉節點高度
    const d: number[] = new Array(100001).fill(0);       // 儲存每個節點深度
    const l: number[] = new Array(100001).fill(0);       // 儲存每個節點的左邊界索引
    const r: number[] = new Array(100001).fill(0);       // 儲存每個節點的右邊界索引
    let len: number = 0;                                 // 計算葉節點數量
    
    // 遞迴 DFS 函式，處理樹的遍歷
    function search(p: TreeNode, h: number): void {
        // 儲存當前節點的深度
        d[p.val] = h;
        
        // 當前節點是葉節點
        if (!p.left && !p.right) {
            heights[len] = h;           // 儲存葉節點的高度
            l[p.val] = r[p.val] = len;  // 將左、右邊界設為當前索引
            len++;                      // 增加葉節點計數
            return;
        }
        
        // 儲存當前節點的左邊界索引
        l[p.val] = len;
        
        // 遞迴處理左右子樹
        if (p.left) search(p.left, h + 1);
        if (p.right) search(p.right, h + 1);
        
        // 儲存當前節點的右邊界索引
        r[p.val] = len - 1;
    }
    
    // 處理空樹的情況
    if (!root) return [];
    search(root, 0);
    
    const n: number = len;
    // 儲存從左至右、右至左的最大高度
    const maxl: number[] = new Array(n).fill(0);
    const maxr: number[] = new Array(n).fill(0);
    
    // 計算從左至右和右至左的最大高度
    for (let i = 1; i < n; i++) {
        maxl[i] = Math.max(maxl[i-1], heights[i-1]);     // 從左至右的最大高度
        maxr[n-i-1] = Math.max(maxr[n-i], heights[n-i]); // 從右至左的最大高度
    }
    
    // 處理查詢
    const ret: number[] = [];
    const k: number = queries.length;
    
    for (let i = 0; i < k; i++) {
        // 對每個查詢，計算移除節點後的最大高度
        const maxxl: number = maxl[l[queries[i]]];        // 節點左側的最大高度
        const maxxr: number = maxr[r[queries[i]]];        // 節點右側的最大高度
        // 查詢結果為以下三者的最大值：
        // 1. 節點左側的最大高度
        // 2. 節點右側的最大高度
        // 3. 該節點父節點深度 - 1
        ret.push(Math.max(Math.max(maxxl, maxxr), d[queries[i]] - 1));
    }
    
    return ret;
}

```

<figure><img src="../.gitbook/assets/截圖 2024-10-26 晚上11.35.07.png" alt=""><figcaption></figcaption></figure>

