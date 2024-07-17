# Delete Nodes And Return Forest (M)

[1110. Delete Nodes And Return Forest](https://leetcode.com/problems/delete-nodes-and-return-forest/)



Given the `root` of a binary tree, each node in the tree has a distinct value.

After deleting all nodes with a value in `to_delete`, we are left with a forest (a disjoint union of trees).

Return the roots of the trees in the remaining forest. You may return the result in any order.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2019/07/01/screen-shot-2019-07-01-at-53836-pm.png)

<pre><code><strong>Input: root = [1,2,3,4,5,6,7], to_delete = [3,5]
</strong><strong>Output: [[1,2,null,4],[6],[7]]
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: root = [1,2,4,null,3], to_delete = [3]
</strong><strong>Output: [[1,2,4]]
</strong></code></pre>

&#x20;

**Constraints:**

* The number of nodes in the given tree is at most `1000`.
* Each node has a distinct value between `1` and `1000`.
* `to_delete.length <= 1000`
* `to_delete` contains distinct values between `1` and `1000`.



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

function delNodes(root: TreeNode | null, to_delete: number[]): Array<TreeNode | null> {
    const toDeleteSet = new Set(to_delete);
    const forest: Array<TreeNode | null> = [];

    function helper(node: TreeNode | null, isRoot: boolean): TreeNode | null {
        // 如果沒有值，回傳 null
        if (!node) return null;

        // 檢查是否需要刪除
        const deleted = toDeleteSet.has(node.val);

        // 如果是根節點且不在刪除名單中，則放入最終回傳的陣列
        if (isRoot && !deleted) {
            forest.push(node);
        }
        // 遞迴處理左右子節點，若節點被刪除，則其子節點都會被視為新的根節點
        node.left = helper(node.left, deleted);
        node.right = helper(node.right, deleted);

        // 如果當前節點需要刪除，返回 null，否則返回節點本身
        return deleted ? null : node;
    }

    helper(root, true);
    return forest;
}
```
