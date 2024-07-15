# Create Binary Tree From Descriptions (M)

You are given a 2D integer array `descriptions` where `descriptions[i] = [parent_i, child_i, isLeft_i]` indicates that `parent_i` is the **parent** of `child_i` in a **binary** tree of **unique** values. Furthermore,

* If `isLeft_i == 1`, then `child_i` is the left child of `parent_i`.
* If `isLeft_i == 0`, then `child_i` is the right child of `parent_i`.

Construct the binary tree described by `descriptions` and return _its **root**_.

The test cases will be generated such that the binary tree is **valid**.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2022/02/09/example1drawio.png)

<pre><code><strong>Input: descriptions = [[20,15,1],[20,17,0],[50,20,1],[50,80,0],[80,19,1]]
</strong><strong>Output: [50,20,80,15,17,19]
</strong><strong>Explanation: The root node is the node with value 50 since it has no parent.
</strong>The resulting binary tree is shown in the diagram.
</code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2022/02/09/example2drawio.png)

<pre><code><strong>Input: descriptions = [[1,2,1],[2,3,0],[3,4,1]]
</strong><strong>Output: [1,2,null,null,3,4]
</strong><strong>Explanation: The root node is the node with value 1 since it has no parent.
</strong>The resulting binary tree is shown in the diagram.
</code></pre>

&#x20;

**Constraints:**

* `1 <= descriptions.length <= 10^4`
* `descriptions[i].length == 3`
* `1 <= parent_i, child_i <= 10^5`
* `0 <= isLeft_i <= 1`
* The binary tree described by `descriptions` is valid.



```typescript
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

function createBinaryTree(descriptions: number[][]): TreeNode | null {
    // 用於存儲所有的節點
    const nodes = new Map<number, TreeNode>();
    // 用於記錄所有的子節點
    const children = new Set<number>();

    // 1. 創建所有節點並建立父子關係
    for (const [parentVal, childVal, isLeft] of descriptions) {
        // 如果節點尚未創建，則創建新節點
        if (!nodes.has(parentVal)) {
            nodes.set(parentVal, new TreeNode(parentVal));
        }
        if (!nodes.has(childVal)) {
            nodes.set(childVal, new TreeNode(childVal));
        }

        // 獲取父節點和子節點
        const parentNode = nodes.get(parentVal)!;
        const childNode = nodes.get(childVal)!;

        // 根據 isLeft 決定子節點是左子節點還是右子節點
        if (isLeft === 1) {
            parentNode.left = childNode;
        } else {
            parentNode.right = childNode;
        }

        // 記錄子節點
        children.add(childVal);
    }

    // 2. 找到根節點
    let root: TreeNode | null = null;
    for (const [parentVal, , ] of descriptions) {
        // 根節點是沒有被記錄為子節點的節點
        if (!children.has(parentVal)) {
            root = nodes.get(parentVal)!;
            break;
        }
    }

    return root;
}
```



1. 定義 TreeNode 類：
   * TreeNode 類表示二叉樹的節點。它有三個屬性：val（節點的值）、left（左子節點）和 right（右子節點）。
2. createBinaryTree 函數：
   * 此函數接收一個 descriptions 二維數組，並返回二叉樹的根節點。
   * 建一個 Map 來存儲所有的節點，並創建一個 Set 來記錄所有的子節點。
3. 第一步：創建節點並建立父子關係：
   * 對於每個描述，檢查父節點和子節點是否已存在於 nodes 中。如果不存在，則創建它們。
   * 根據 isLeft 的值，將子節點設置為父節點的左子節點或右子節點。
   * 記錄子節點的值到 children 集合中。
4. 第二步：找到根節點：
   * 根節點是那些沒有出現在 children 集合中的節點。
   * 返回根節點。
