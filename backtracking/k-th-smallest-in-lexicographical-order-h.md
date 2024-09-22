# K-th Smallest in Lexicographical Order (H)

[440. K-th Smallest in Lexicographical Order](https://leetcode.com/problems/k-th-smallest-in-lexicographical-order/)\
\
Related to [lexicographical-numbers-m.md](lexicographical-numbers-m.md "mention")



Given two integers `n` and `k`, return _the_ `kth` _lexicographically smallest integer in the range_ `[1, n]`.

&#x20;

**Example 1:**

<pre><code><strong>Input: n = 13, k = 2
</strong><strong>Output: 10
</strong><strong>Explanation: The lexicographical order is [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9], so the second smallest number is 10.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: n = 1, k = 1
</strong><strong>Output: 1
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= k <= n <= 10^9`



### Backtracking

時間複雜度：**O(log(n) \* log(k))**&#x20;

Ref [https://leetcode.com/problems/k-th-smallest-in-lexicographical-order/solutions/5819085/beats-super-easy-beginners](https://leetcode.com/problems/k-th-smallest-in-lexicographical-order/solutions/5819085/beats-super-easy-beginners)

```typescript
function findKthNumber(n: number, k: number): number {
    let current = 1; // 開始從字典順序的第一個數字 1
    k--; // k 減 1，因為已經從 1 開始計算

    // 當還有 k 個數字要找到時，繼續執行迴圈
    while (k > 0) {
        // 計算當前節點與下一個節點之間的數字總數
        const count = countSteps(n, current, current + 1);
        
        // 如果當前節點下的數字個數小於或等於 k，說明目標數字不在當前節點下
        if (count <= k) {
            current++; // 移動到下一個節點
            k -= count; // 減去已經跳過的數字數量
        } else {
            // 如果目標數字在當前節點下，進入下一層
            current *= 10; // 向下擴展字典順序樹的子節點
            k--; // 減去當前節點本身
        }
    }

    return current; // 返回最終的第 k 個字典順序的數字
}

function countSteps(n: number, curr: number, next: number): number {
    let steps = 0; // 計算從當前節點到下一個節點之間的數字總數

    // 遞迴計算從 curr 到 next 之間的節點數，直到超過 n 為止
    while (curr <= n) {
        steps += Math.min(n + 1, next) - curr; // 計算當前層級的節點數
        curr *= 10; // 向下擴展到下一層
        next *= 10; // 對應下一層的下一個節點
    }

    return steps; // 返回當前節點下的數字總數
}
```



<figure><img src="../.gitbook/assets/截圖 2024-09-22 晚上11.54.53.png" alt=""><figcaption></figcaption></figure>
