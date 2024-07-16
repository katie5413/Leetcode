# Step-By-Step Directions From a Binary Tree Node to Another (M)

[2096. Step-By-Step Directions From a Binary Tree Node to Another](https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/)



You are given the `root` of a **binary tree** with `n` nodes. Each node is uniquely assigned a value from `1` to `n`. You are also given an integer `startValue` representing the value of the start node `s`, and a different integer `destValue` representing the value of the destination node `t`.

Find the **shortest path** starting from node `s` and ending at node `t`. Generate step-by-step directions of such path as a string consisting of only the **uppercase** letters `'L'`, `'R'`, and `'U'`. Each letter indicates a specific direction:

* `'L'` means to go from a node to its **left child** node.
* `'R'` means to go from a node to its **right child** node.
* `'U'` means to go from a node to its **parent** node.

Return _the step-by-step directions of the **shortest path** from node_ `s` _to node_ `t`.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/11/15/eg1.png)

<pre><code><strong>Input: root = [5,1,2,3,null,6,4], startValue = 3, destValue = 6
</strong><strong>Output: "UURL"
</strong><strong>Explanation: The shortest path is: 3 → 1 → 5 → 2 → 6.
</strong></code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/11/15/eg2.png)

<pre><code><strong>Input: root = [2,1], startValue = 2, destValue = 1
</strong><strong>Output: "L"
</strong><strong>Explanation: The shortest path is: 2 → 1.
</strong></code></pre>

&#x20;

**Constraints:**

* The number of nodes in the tree is `n`.
* `2 <= n <= 10^5`
* `1 <= Node.val <= n`
* All the values in the tree are **unique**.
* `1 <= startValue, destValue <= n`
* `startValue != destValue`



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

function getDirections(root: TreeNode | null, startValue: number, destValue: number): string {
    if (!root) return '';

    // 用於尋找從根節點到目標節點的路徑
    const findPath = (node: TreeNode | null, target: number, path: string[]): boolean => {
        if (!node) return false;
        if (node.val === target) return true;

        path.push('L');
        // 遞歸處理左子節點
        if (findPath(node.left, target, path)) return true;
        // 如果在左子樹中沒有找到，彈出 ‘L’，恢復路徑
        path.pop();

        path.push('R');
        // 遞歸處理右子節點
        if (findPath(node.right, target, path)) return true;
        // 如果在右子樹中沒有找到，彈出 ‘R’，恢復路徑
        path.pop();

        return false;
    };

    const startPath: string[] = [];
    const destPath: string[] = [];

    // 尋找從根節點到 startValue 和 destValue 的路徑
    findPath(root, startValue, startPath);
    findPath(root, destValue, destPath);

    // 找到兩條路徑上最後一個相同的節點，即最近公共祖先 (LCA)
    let i = 0;
    while (i < startPath.length && i < destPath.length && startPath[i] === destPath[i]) {
        i++;
    }

    // 計算從起始節點到 LCA 的步數，即 U 的次數，U 的次數等於從起始節點往上移動到 LCA 的步數
    const upMoves = 'U'.repeat(startPath.length - i);
    // 計算從 LCA 到目標節點的步數，直接使用 destPath 中 LCA 之後的部分
    const downMoves = destPath.slice(i).join('');

    return upMoves + downMoves;
}
```



### 最近公共祖先 (LCA)

通過比較 startPath 和 destPath 的每一個節點，找到這兩條路徑中最後一個相同的節點位置，這個位置即是兩條路徑的最近公共祖先 (LCA)

假設 startPath 和 destPath 分別是以下路徑：

```
startPath = ['L', 'R', 'L']
destPath = ['L', 'R', 'R']
```

迴圈執行過程如下：\


1\. i = 0，startPath\[0] === destPath\[0] (L === L) -> i 增加到 1

2\. i = 1，startPath\[1] === destPath\[1] (R === R) -> i 增加到 2

3\. i = 2，startPath\[2] !== destPath\[2] (L !== R) -> 迴圈終止

\
此時 i 的值為 2，表示在索引 1 (i-1) 的節點是最近公共祖先 (LCA)。
