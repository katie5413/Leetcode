# Flip Equivalent Binary Trees (M)

[951. Flip Equivalent Binary Trees](https://leetcode.com/problems/flip-equivalent-binary-trees/)



For a binary tree **T**, we can define a **flip operation** as follows: choose any node, and swap the left and right child subtrees.

A binary tree **X** is _flip equivalent_ to a binary tree **Y** if and only if we can make **X** equal to **Y** after some number of flip operations.

Given the roots of two binary trees `root1` and `root2`, return `true` if the two trees are flip equivalent or `false` otherwise.

&#x20;

**Example 1:**

![Flipped Trees Diagram](https://assets.leetcode.com/uploads/2018/11/29/tree\_ex.png)

<pre><code><strong>Input: root1 = [1,2,3,4,5,6,null,null,null,7,8], root2 = [1,3,2,null,6,4,5,null,null,null,null,8,7]
</strong><strong>Output: true
</strong><strong>Explanation: We flipped at nodes with values 1, 3, and 5.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: root1 = [], root2 = []
</strong><strong>Output: true
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: root1 = [], root2 = [1]
</strong><strong>Output: false
</strong></code></pre>

&#x20;

**Constraints:**

* The number of nodes in each tree is in the range `[0, 100]`.
* Each tree will have **unique node values** in the range `[0, 99]`.



### DFS

#### 時間複雜度：**O(n)**，其中 n 是兩棵樹中節點的數量。每個節點最多被訪問一次。

#### 空間複雜度：**O(h)**，其中 h 是樹的高度。空間來自遞迴堆疊，最壞情況下遞迴深度會等於樹的高度。

檢查兩棵二元樹是否「翻轉等價」（flip equivalent）。「翻轉等價」的定義是：兩棵樹如果在某些節點的子樹互相翻轉（即交換左子樹和右子樹），仍然可以保持結構和節點值相同，則稱這兩棵樹是翻轉等價的

Ref. [https://leetcode.com/problems/flip-equivalent-binary-trees/solutions/5959889/easy-peasy-dfs-0ms-runtime-beats-100-in-typescript-java-c-php-go-python](https://leetcode.com/problems/flip-equivalent-binary-trees/solutions/5959889/easy-peasy-dfs-0ms-runtime-beats-100-in-typescript-java-c-php-go-python)

#### 詳細解釋：

1. **終止條件**：
   * 當兩個節點都是 `null`，則這兩個子樹是等價的，因此返回 `true`。
   * 當一個節點存在而另一個節點不存在，或兩個節點的值不相等時，返回 `false`。
2. **遞迴比較**：
   * 如果當前節點的值相等，則需要遞迴檢查其子樹是否「翻轉等價」。有兩種情況可以滿足：
     1. 左子樹對應左子樹，右子樹對應右子樹（沒有翻轉）。
     2. 左子樹對應右子樹，右子樹對應左子樹（翻轉後相等）。

```typescript
function flipEquiv(node1: TreeNode | null, node2: TreeNode | null): boolean {
    // 如果兩個節點都是 null，則這兩棵子樹是等價的
    if (!node1 && !node2) {
        return true;
    }
    // 如果兩個節點都存在
    else if (node1 && node2) {
        // 如果兩個節點的值相等，檢查其子樹是否翻轉等價
        if (node1.val === node2.val) {
            // 情況 1: 左子樹對應左子樹，右子樹對應右子樹（無翻轉）
            if (flipEquiv(node1.left, node2.left) === true && flipEquiv(node1.right, node2.right) === true) {
                return true;
            }
            // 情況 2: 左子樹對應右子樹，右子樹對應左子樹（翻轉後等價）
            else if (flipEquiv(node1.left, node2.right) === true && flipEquiv(node1.right, node2.left) === true) {
                return true;
            }
        }
    }
    // 如果兩個節點不符合翻轉等價的條件，返回 false
    return false;
}

```

<figure><img src="../.gitbook/assets/截圖 2024-10-24 晚上11.53.25.png" alt=""><figcaption></figcaption></figure>



