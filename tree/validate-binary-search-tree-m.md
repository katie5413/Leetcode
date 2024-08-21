# Validate Binary Search Tree (M)

[98. Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)



Given the `root` of a binary tree, _determine if it is a valid binary search tree (BST)_.

A **valid BST** is defined as follows:

* The left subtree of a node contains only nodes with keys **less than** the node's key.
* The right subtree of a node contains only nodes with keys **greater than** the node's key.
* Both the left and right subtrees must also be binary search trees.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/12/01/tree1.jpg)

<pre><code><strong>Input: root = [2,1,3]
</strong><strong>Output: true
</strong></code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/12/01/tree2.jpg)

<pre><code><strong>Input: root = [5,1,4,null,null,3,6]
</strong><strong>Output: false
</strong><strong>Explanation: The root node's value is 5 but its right child's value is 4.
</strong></code></pre>

&#x20;

**Constraints:**

* The number of nodes in the tree is in the range `[1, 10^4]`.
* `-2^31 <= Node.val <= 2^31 - 1`



### Recursive

```typescript
function isValidBST(root: TreeNode | null): boolean {
    function visit(node: TreeNode | null, min: number, max: number) {
        if (!node) return true
        if (node.val > min && node.val < max) {
            return (visit(node.left, min, node.val) && visit(node.right, node.val, max))
        }
        return false
    }
    return visit(root, -Infinity, Infinity)
};
```



### 改造 Function 加入 min, max

```typescript
function isValidBST(root: TreeNode|null, min = -Infinity, max = Infinity): boolean {
  // 如果節點為 null，表示到達葉節點的末端，返回 true（因為空樹是有效的 BST）
  if (!root) return true;

  // 如果節點值不在允許範圍內（小於等於 min 或大於等於 max），返回 false
  if (root.val <= min || root.val >= max) return false;

  // 遞迴檢查左子樹，更新最大值為當前節點值，確保左子樹的所有節點值都小於當前節點值
  // 遞迴檢查右子樹，更新最小值為當前節點值，確保右子樹的所有節點值都大於當前節點值
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
};
```
