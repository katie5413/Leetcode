# Minimum Depth of Binary Tree (E)

[111. Minimum Depth of Binary Tree](https://leetcode.com/problems/minimum-depth-of-binary-tree/)

Related to [maximum-depth-of-binary-tree-e.md](maximum-depth-of-binary-tree-e.md "mention")



Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

**Note:** A leaf is a node with no children.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/12/ex\_depth.jpg)

<pre><code><strong>Input: root = [3,9,20,null,null,15,7]
</strong><strong>Output: 2
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: root = [2,null,3,null,4,null,5,null,6]
</strong><strong>Output: 5
</strong></code></pre>

&#x20;

**Constraints:**

* The number of nodes in the tree is in the range `[0, 10^5]`.
* `-1000 <= Node.val <= 1000`



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

function minDepth(root: TreeNode | null): number {
    if (!root) return 0
    if (root.left === null && root.right === null) {
        return 1;
    }

    // 要額外處理沒有葉節點的情況
    if (!root.left) return minDepth(root.right) + 1
    if (!root.right) return minDepth(root.left) + 1

    return Math.min(minDepth(root.left), minDepth(root.right)) + 1
};
```



### BFS

遍歷樹中的節點，並在找到第一個葉節點時返回最小深度

queue : shift + push

shift: removes the first element from an array and returns that element

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

function minDepth(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }

    let depth = 0;
    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
        depth++;
        let levelSize = queue.length;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift(); // 取出隊列中的第一個節點
            if (node.left === null && node.right === null) {
                return depth;
            }

            if (node.left !== null) {
                queue.push(node.left); // 將左子節點加入隊列
            }

            if (node.right !== null) {
                queue.push(node.right); // 將右子節點加入隊列
            }
        }
    }

    return depth;
}
```
