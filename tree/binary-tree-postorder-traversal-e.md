# Binary Tree Postorder Traversal (E)

[145. Binary Tree Postorder Traversal](https://leetcode.com/problems/binary-tree-postorder-traversal/)



Given the `root` of a binary tree, return _the postorder traversal of its nodes' values_.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/08/28/pre1.jpg)

<pre><code><strong>Input: root = [1,null,2,3]
</strong><strong>Output: [3,2,1]
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: root = []
</strong><strong>Output: []
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: root = [1]
</strong><strong>Output: [1]
</strong></code></pre>

&#x20;

**Constraints:**

* The number of the nodes in the tree is in the range `[0, 100]`.
* `-100 <= Node.val <= 100`

&#x20;

**Follow up:** Recursive solution is trivial, could you do it iteratively?



### Backtracking

```typescript
function postorderTraversal(root: TreeNode | null): number[] {
    const ans: number[] = []

    const bt = (node: TreeNode | null) => {
        if (node) {
            if (node.left) bt(node.left)
            if (node.right) bt(node.right)
            ans.push(node.val)
        }
    }

    bt(root)


    return ans

};
```



### Stack

```typescript
function postorderTraversal(root: TreeNode | null): number[] {
    if (root === null){
        return [];
    }

    let stack: [TreeNode, boolean][] = [[root, false]];
    let result: number[] = [];

    while(stack.length > 0){
        let [node, visited] = stack.pop()!;

        if(node === null) {
            continue;
        }

        if (visited){
            result.push(node.val);
        } else {
            stack.push([node, true]);
            stack.push([node.right, false]);
            stack.push([node.left, false])
        }

    }

    return result;
};
```



### 題目建議嘗試使用 Iterative

```typescript
function postorderTraversal(root) {
    const result = [];
    const stack = [root];

    while (stack.length) {
        const node = stack.pop();

        if (node) {
            result.push(node.val);

            // It is important that we stack the left first, then the right 
            //(in the preorder soluton, we do the opposite)
            stack.push(node.left, node.right); 
        }
    }

    //And at the end we reverse the array (it remains as it is in the preorder solution)
    return result.reverse(); 
};
```
