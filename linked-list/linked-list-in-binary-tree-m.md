# Linked List in Binary Tree (M)

[1367. Linked List in Binary Tree](https://leetcode.com/problems/linked-list-in-binary-tree/)



Given a binary tree `root` and a linked list with `head` as the first node.&#x20;

Return True if all the elements in the linked list starting from the `head` correspond to some _downward path_ connected in the binary tree otherwise return False.

In this context downward path means a path that starts at some node and goes downwards.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/02/12/sample\_1\_1720.png)

<pre><code><strong>Input: head = [4,2,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
</strong><strong>Output: true
</strong><strong>Explanation: Nodes in blue form a subpath in the binary Tree.  
</strong></code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/02/12/sample\_2\_1720.png)

<pre><code><strong>Input: head = [1,4,2,6], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
</strong><strong>Output: true
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: head = [1,4,2,6,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
</strong><strong>Output: false
</strong><strong>Explanation: There is no path in the binary tree that contains all the elements of the linked list from head.
</strong></code></pre>

&#x20;

**Constraints:**

* The number of nodes in the tree will be in the range `[1, 2500]`.
* The number of nodes in the list will be in the range `[1, 100]`.
* `1 <= Node.val <= 100` for each node in the linked list and binary tree.



### DFS

```typescript
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

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

function isSubPath(head: ListNode | null, root: TreeNode | null): boolean {
    if (!root) return false;

    // 遞迴檢查是否存在匹配的路徑
    return dfs(root, head) || isSubPath(head, root.left) || isSubPath(head, root.right);
}

function dfs(tree: TreeNode | null, list: ListNode | null): boolean {
    if (!list) return true; // 鏈表已經走完，表示匹配成功
    if (!tree) return false; // 二叉樹已經走完，但鏈表還沒走完，匹配失敗

    if (tree.val === list.val) {
        // 如果當前節點匹配，繼續檢查左右子樹
        return dfs(tree.left, list.next) || dfs(tree.right, list.next);
    }

    return false; // 當前節點不匹配
}
```
