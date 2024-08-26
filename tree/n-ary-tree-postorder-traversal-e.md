# N-ary Tree Postorder Traversal (E)

[590. N-ary Tree Postorder Traversal](https://leetcode.com/problems/n-ary-tree-postorder-traversal/)

Related to  [binary-tree-postorder-traversal-e.md](binary-tree-postorder-traversal-e.md "mention")&#x20;



Given the `root` of an n-ary tree, return _the postorder traversal of its nodes' values_.

Nary-Tree input serialization is represented in their level order traversal. Each group of children is separated by the null value (See examples)

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2018/10/12/narytreeexample.png)

<pre><code><strong>Input: root = [1,null,3,2,4,null,5,6]
</strong><strong>Output: [5,6,3,2,4,1]
</strong></code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2019/11/08/sample\_4\_964.png)

<pre><code><strong>Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
</strong><strong>Output: [2,6,14,11,7,3,12,8,4,13,9,10,5,1]
</strong></code></pre>

&#x20;

**Constraints:**

* The number of nodes in the tree is in the range `[0, 10^4]`.
* `0 <= Node.val <= 10^4`
* The height of the n-ary tree is less than or equal to `1000`.

&#x20;

**Follow up:** Recursive solution is trivial, could you do it iteratively?





### Backtracking

跟昨天的 Binary Tree Postorder 做法類似，秒殺，開心～

```typescript
/**
 * Definition for node.
 * class _Node {
 *     val: number
 *     children: _Node[]
 *     constructor(val?: number) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.children = []
 *     }
 * }
 */

function postorder(root: _Node | null): number[] {
    const ans: number[] = []

    const bt = (node: _Node | null) => {
        //  到底就跳出
        if (!node) return

        // 按照順序呼叫子節點
        for (const child of node.children) {
            bt(child)
        }
        // 呼叫完子節點才會把目前的值推入，因此子節點會先進去 ans
        ans.push(node.val)
    }

    bt(root)

    return ans
};
```





