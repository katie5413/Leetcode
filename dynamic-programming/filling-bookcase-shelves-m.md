# Filling Bookcase Shelves (M)

[1105. Filling Bookcase Shelves](https://leetcode.com/problems/filling-bookcase-shelves/)



You are given an array `books` where `books[i] = [thickness_i, height_i]` indicates the thickness and height of the `i_th` book. You are also given an integer `shelfWidth`.

We want to place these books in order onto bookcase shelves that have a total width `shelfWidth`.

We choose some of the books to place on this shelf such that the sum of their thickness is less than or equal to `shelfWidth`, then build another level of the shelf of the bookcase so that the total height of the bookcase has increased by the maximum height of the books we just put down. We repeat this process until there are no more books to place.

Note that at each step of the above process, the order of the books we place is the same order as the given sequence of books. **(書要按照順序放！)**

* For example, if we have an ordered list of `5` books, we might place the first and second book onto the first shelf, the third book on the second shelf, and the fourth and fifth book on the last shelf.

Return _the minimum possible height that the total bookshelf can be after placing shelves in this manner_.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2019/06/24/shelves.png)

<pre><code><strong>Input: books = [[1,1],[2,3],[2,3],[1,1],[1,1],[1,1],[1,2]], shelfWidth = 4
</strong><strong>Output: 6
</strong><strong>Explanation:
</strong>The sum of the heights of the 3 shelves is 1 + 3 + 2 = 6.
Notice that book number 2 does not have to be on the first shelf.
</code></pre>

**Example 2:**

<pre><code><strong>Input: books = [[1,3],[2,4],[3,2]], shelfWidth = 6
</strong><strong>Output: 4
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= books.length <= 1000`
* `1 <= thickness_i <= shelfWidth <= 1000`
* `1 <= height_i <= 1000`



### DP

對於每一本書 i，開始時假設它單獨放在一個新層架子上。

然後，向後遍歷以檢查是否將前面的書與當前書放在同一層架子上會導致更小的高度。

```typescript
function minHeightShelves(books: number[][], shelfWidth: number): number {
    const n = books.length;
    // dp[i] 表示前 i 本書的最小高度
    const dp = new Array(n + 1).fill(Infinity);
    dp[0] = 0; // 沒有書時，高度為 0

    // 遍歷每一本書
    for (let i = 1; i <= n; i++) {
        let width = 0; // 當前層架子的總寬度
        let height = 0; // 當前層架子的最大高度

        // 向後遍歷，嘗試將前面的書與當前書放在同一層架子上
        for (let j = i; j > 0; j--) {
            width += books[j - 1][0]; // 累加當前書的寬度
            if (width > shelfWidth) { // 如果超過書架寬度，停止累加
                break;
            }
            height = Math.max(height, books[j - 1][1]); // 更新當前層架子的最大高度
            // 更新 dp[i] 為將書放置在當前層架子時的最小高度
            dp[i] = Math.min(dp[i], dp[j - 1] + height);
        }
    }

    return dp[n]; // 返回放置所有書的最小高度
}
```
