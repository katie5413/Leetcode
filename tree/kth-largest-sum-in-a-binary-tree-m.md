# Kth Largest Sum in a Binary Tree (M)

[2583. Kth Largest Sum in a Binary Tree](https://leetcode.com/problems/kth-largest-sum-in-a-binary-tree/)



You are given the `root` of a binary tree and a positive integer `k`.

The **level sum** in the tree is the sum of the values of the nodes that are on the **same** level.

Return _the_ `kth` _**largest** level sum in the tree (not necessarily distinct)_. If there are fewer than `k` levels in the tree, return `-1`.

**Note** that two nodes are on the same level if they have the same distance from the root.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2022/12/14/binaryytreeedrawio-2.png)

<pre><code><strong>Input: root = [5,8,9,2,1,3,7,4,6], k = 2
</strong><strong>Output: 13
</strong><strong>Explanation: The level sums are the following:
</strong>- Level 1: 5.
- Level 2: 8 + 9 = 17.
- Level 3: 2 + 1 + 3 + 7 = 13.
- Level 4: 4 + 6 = 10.
The 2nd largest level sum is 13.
</code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2022/12/14/treedrawio-3.png)

<pre><code><strong>Input: root = [1,2,null,3], k = 1
</strong><strong>Output: 3
</strong><strong>Explanation: The largest level sum is 3.
</strong></code></pre>

&#x20;

**Constraints:**

* The number of nodes in the tree is `n`.
* `2 <= n <= 10^5`
* `1 <= Node.val <= 10^6`
* `1 <= k <= n`



### BFS

Ref. [https://leetcode.com/problems/kth-largest-sum-in-a-binary-tree/solutions/5949683/explained-step-by-step-beats-100-working-22-10-2024](https://leetcode.com/problems/kth-largest-sum-in-a-binary-tree/solutions/5949683/explained-step-by-step-beats-100-working-22-10-2024)

#### 時間複雜度： **O(n log n)**，其中 n 是樹中節點的數量。遍歷樹的時間是 O(n)，排序層級和的時間是 O(log n)。

#### 空間複雜度：**O(m)**，其中 m 是樹的層數。

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

function kthLargestLevelSum(root: TreeNode | null, k: number): number {
    // 初始化一個陣列來存儲每一層節點值的總和
    const result: number[] = [];

    // 定義一個遞迴函數來遍歷樹
    const traverse = (node: TreeNode | null, level: number = 0): void => {
        // 基礎情況：如果節點為空，返回
        if (!node) return;

        // 如果該層級已存在於 result 中，將當前節點的值加到該層級總和
        if (result[level] !== undefined) result[level] += node.val;
        // 如果該層級不存在，初始化該層級為當前節點的值
        else result[level] = node.val;

        // 遞迴遍歷左子樹，層級加一
        traverse(node.left, level + 1);
        // 遞迴遍歷右子樹，層級加一
        traverse(node.right, level + 1);
    }

    // 從根節點開始遍歷樹
    traverse(root);

    // 如果第 k 大的層級和不存在（k 大於層數），返回 -1
    if (!result[k - 1]) return -1;

    // 將結果陣列按降序排序，返回第 k 大的層級和
    return result.sort((a, b) => b - a)[k - 1];
}

```

<figure><img src="../.gitbook/assets/截圖 2024-10-22 晚上11.26.37.png" alt=""><figcaption></figcaption></figure>

#### 步驟和註解：

1. **結果陣列初始化**：
   * `result` 陣列用來儲存每一層的節點數值總和。
2. **遞迴函數 `traverse`**：
   * 這個遞迴函數負責遍歷二元樹並計算每一層的節點數值總和。
   * 當前節點的值會加到對應層級的總和中，使用 `level` 變數來追蹤當前所在的層級。
3. **遍歷邏輯**：
   * 如果目前的節點是 `null`，則直接返回（這是遞迴的基礎情況）。
   * 如果當前層級已經在 `result` 陣列中，則將該節點的值加到該層級的總和上。
   * 否則，初始化該層級的總和為當前節點的值。
4. **遞迴左右子樹**：
   * 分別遞迴遍歷左子樹和右子樹，層級數加一，繼續對下一層的節點進行相同操作。
5. **處理結果**：
   * 遍歷結束後，檢查第 `k` 大的層級和是否存在。如果 `k` 大於總層數，則回傳 `-1`。
   * 否則，將層級和排序，並返回第 `k` 大的值。
