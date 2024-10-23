# Cousins in Binary Tree II (M)

[2641. Cousins in Binary Tree II](https://leetcode.com/problems/cousins-in-binary-tree-ii/)



Given the `root` of a binary tree, replace the value of each node in the tree with the **sum of all its cousins' values**.

Two nodes of a binary tree are **cousins** if they have the same depth with different parents.

Return _the_ `root` _of the modified tree_.

**Note** that the depth of a node is the number of edges in the path from the root node to it.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2023/01/11/example11.png)

<pre><code><strong>Input: root = [5,4,9,1,10,null,7]
</strong><strong>Output: [0,0,0,7,7,null,11]
</strong><strong>Explanation: The diagram above shows the initial binary tree and the binary tree after changing the value of each node.
</strong>- Node with value 5 does not have any cousins so its sum is 0.
- Node with value 4 does not have any cousins so its sum is 0.
- Node with value 9 does not have any cousins so its sum is 0.
- Node with value 1 has a cousin with value 7 so its sum is 7.
- Node with value 10 has a cousin with value 7 so its sum is 7.
- Node with value 7 has cousins with values 1 and 10 so its sum is 11.
</code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2023/01/11/diagram33.png)

<pre><code><strong>Input: root = [3,1,2]
</strong><strong>Output: [0,0,0]
</strong><strong>Explanation: The diagram above shows the initial binary tree and the binary tree after changing the value of each node.
</strong>- Node with value 3 does not have any cousins so its sum is 0.
- Node with value 1 does not have any cousins so its sum is 0.
- Node with value 2 does not have any cousins so its sum is 0.
</code></pre>

&#x20;

**Constraints:**

* The number of nodes in the tree is in the range `[1, 10^5]`.
* `1 <= Node.val <= 10^4`



### DFS

#### 時間複雜度：**O(n)**，其中 n 是樹中節點的數量。每次 DFS 都遍歷整棵樹，因此時間複雜度為 O(n)。

#### 空間複雜度：**O(h)**，其中 h 是樹的高度。空間主要來自遞迴堆疊和儲存每層的總和。

#### 步驟說明：

1. **`depthSum` 陣列**：
   * 這是一個用來儲存每一層節點值總和的陣列。`depthSum[i]` 表示第 `i` 層所有節點的值的總和。
2. **第一次 DFS (`dfs1`)**：
   * 遍歷整棵樹，並將每層節點的值加到 `depthSum` 陣列中。
   * 如果當前層級還沒被記錄過，就將該層級初始化為當前節點的值，否則累加該層的節點值。
3. **第二次 DFS (`dfs2`)**：
   * 遍歷樹並替換每個節點的值為它在同一層表兄弟節點的值之和。
   * `cousinSum` 是當前節點的下一層的節點值總和，並且排除掉當前節點的子節點的值。
   * 然後將計算出的 `cousinSum` 作為新值遞迴到子節點。
4. **處理順序**：
   * 先呼叫 `dfs1` 計算每一層的節點總和，接著呼叫 `dfs2` 來修改節點的值。

* **`dfs1`：** 計算每層節點的總和，並記錄在 `depthSum` 中。
* **`dfs2`：** 根據 `depthSum` 來更新節點的值，使得每個節點的值變為「同層表兄弟節點值的總和」。

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

function replaceValueInTree(root: TreeNode | null): TreeNode | null {
    const depthSum: number[] = [];

    // 第一次 DFS：計算每層節點值的總和
    function dfs1(node: TreeNode | null, depth: number): void {
        if (!node) return;

        // 如果當前層級還未被記錄，將該層級初始化為當前節點的值
        if (depth >= depthSum.length) {
            depthSum.push(node.val);
        } else {
            // 否則累加該層的節點值
            depthSum[depth] += node.val;
        }

        // 遞迴遍歷左右子樹
        dfs1(node.left, depth + 1);
        dfs1(node.right, depth + 1);
    }

    // 第二次 DFS：替換節點值為表兄弟節點的和
    function dfs2(node: TreeNode | null, val: number, depth: number): void {
        if (!node) return;

        // 將當前節點的值替換為指定的 val
        node.val = val;

        // 計算下一層表兄弟節點的和，排除掉當前節點的子節點
        let cousinSum = depth + 1 < depthSum.length ? depthSum[depth + 1] : 0;
        cousinSum -= (node.left?.val ?? 0);
        cousinSum -= (node.right?.val ?? 0);

        // 遞迴遍歷左右子樹，並傳遞計算出的 cousinSum 作為新值
        if (node.left) dfs2(node.left, cousinSum, depth + 1);
        if (node.right) dfs2(node.right, cousinSum, depth + 1);
    }

    // 執行兩次 DFS
    dfs1(root, 0);
    dfs2(root, 0, 0);

    return root;
}

```

<figure><img src="../.gitbook/assets/截圖 2024-10-23 晚上11.51.20.png" alt=""><figcaption></figcaption></figure>

