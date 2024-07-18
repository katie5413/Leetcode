# Subtree of Another Tree (E)

[572. Subtree of Another Tree](https://leetcode.com/problems/subtree-of-another-tree/)



Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values of `subRoot` and `false` otherwise.

A subtree of a binary tree `tree` is a tree that consists of a node in `tree` and all of this node's descendants. The tree `tree` could also be considered as a subtree of itself.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/04/28/subtree1-tree.jpg)

<pre><code><strong>Input: root = [3,4,5,1,2], subRoot = [4,1,2]
</strong><strong>Output: true
</strong></code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/04/28/subtree2-tree.jpg)

<pre><code><strong>Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
</strong><strong>Output: false
</strong></code></pre>

&#x20;

**Constraints:**

* The number of nodes in the `root` tree is in the range `[1, 2000]`.
* The number of nodes in the `subRoot` tree is in the range `[1, 1000]`.
* `-10^4 <= root.val <= 10^4`
* `-10^4 <= subRoot.val <= 10^4`

### DFS

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


function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
    if (!root) return false; // 若 root 為 null，則無法包含任何子樹
    if (dfs(root, subRoot)) return true; // 若 root 和 subRoot 是相同的樹，則返回 true
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot); // 遞迴檢查左子樹和右子樹
}

function dfs(node1: TreeNode | null, node2: TreeNode | null): boolean {
    if (!node1 && !node2) return true; // 若兩個節點都為 null，則它們是相同的
    if (!node1 || !node2) return false; // 若其中一個節點為 null，則它們不同
    if (node1.val !== node2.val) return false; // 若節點值不同，則它們不同

    // 遞迴檢查左右子樹
    return dfs(node1.left, node2.left) && dfs(node1.right, node2.right);
}
```
