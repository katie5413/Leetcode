# Maximum Depth of Binary Tree (E)

[104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

Related to [minimum-depth-of-binary-tree-e.md](minimum-depth-of-binary-tree-e.md "mention")



Given the `root` of a binary tree, return _its maximum depth_.

A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/11/26/tmp-tree.jpg)

<pre><code><strong>Input: root = [3,9,20,null,null,15,7]
</strong><strong>Output: 3
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: root = [1,null,2]
</strong><strong>Output: 2
</strong></code></pre>

&#x20;

**Constraints:**

* The number of nodes in the tree is in the range `[0, 10^4]`.
* `-100 <= Node.val <= 100`



### 深度優先搜索（DFS）

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

function maxDepth(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    } else {
        const leftDepth = maxDepth(root.left);
        const rightDepth = maxDepth(root.right);
        return Math.max(leftDepth, rightDepth) + 1;
    }
};
```

1. 如果當前節點是 null，則返回 0，表示這個分支的深度為 0。
2. 使用遞迴分別計算左子樹和右子樹的深度。
3. 取左子樹和右子樹深度的最大值，並加上 1，表示當前節點的深度。

### 濃縮版

```typescript
function maxDepth(root: TreeNode | null): number {
    if (!root) {
        return 0
    }

    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};
```

### 廣度優先搜索（BFS）

```typescript
function maxDepth(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }

    let depth = 0;
    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
        let levelSize = queue.length;
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            if (node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {
                queue.push(node.right);
            }
        }
        depth++;
    }

    return depth;
}
```

1. 如果樹的根節點是 null，返回深度 0。
2. 使用隊列來進行廣度優先搜索。首先將根節點加入隊列。
3. 進行迭代，每次處理隊列中的所有節點，並將它們的子節點加入隊列。
4. 每處理完一層節點，深度加 1。
5. 當隊列為空時，表示所有節點都已處理完畢，此時的深度即為樹的最大深度。
