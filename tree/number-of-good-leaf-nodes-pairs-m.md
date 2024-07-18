# Number of Good Leaf Nodes Pairs (M)

[1530. Number of Good Leaf Nodes Pairs](https://leetcode.com/problems/number-of-good-leaf-nodes-pairs/)



You are given the `root` of a binary tree and an integer `distance`. A pair of two different **leaf** nodes of a binary tree is said to be good if the length of **the shortest path** between them is less than or equal to `distance`.

Return _the number of good leaf node pairs_ in the tree.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/07/09/e1.jpg)

<pre><code><strong>Input: root = [1,2,3,null,4], distance = 3
</strong><strong>Output: 1
</strong><strong>Explanation: The leaf nodes of the tree are 3 and 4 and the length of the shortest path between them is 3. This is the only good pair.
</strong></code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/07/09/e2.jpg)

<pre><code><strong>Input: root = [1,2,3,4,5,6,7], distance = 3
</strong><strong>Output: 2
</strong><strong>Explanation: The good pairs are [4,5] and [6,7] with shortest path = 2. The pair [4,6] is not good because the length of ther shortest path between them is 4.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: root = [7,1,4,6,null,5,3,null,null,null,null,null,2], distance = 3
</strong><strong>Output: 1
</strong><strong>Explanation: The only good pair is [2,5].
</strong></code></pre>

&#x20;

**Constraints:**

* The number of nodes in the `tree` is in the range `[1, 2^10].`
* `1 <= Node.val <= 100`
* `1 <= distance <= 10`





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

function countPairs(root: TreeNode | null, distance: number): number {
    let ans: number = 0

    // 計算當前節點到其所有葉節點的距離
    function dfs(node: TreeNode | null): number[] {
        if (!node) return [];
        if (!node.left && !node.right) return [1]; // 如果是葉節點，返回距離為 1

        const leftDistances = dfs(node.left);
        const rightDistances = dfs(node.right);

        // 計算左子樹和右子樹的葉節點對距離
        for (let lDist of leftDistances) {
            for (let rDist of rightDistances) {
                if (lDist + rDist <= distance) {
                    ans++;
                }
            }
        }

        // 返回當前節點到其所有葉節點的距離
        const allDistances: number[] = [];
        for (let lDist of leftDistances) {
            allDistances.push(lDist + 1);
        }
        for (let rDist of rightDistances) {
            allDistances.push(rDist + 1);
        }

        return allDistances;

    }

    dfs(root);
    return ans;
};
```

<figure><img src="../.gitbook/assets/截圖 2024-07-18 晚上9.04.13.png" alt=""><figcaption></figcaption></figure>
