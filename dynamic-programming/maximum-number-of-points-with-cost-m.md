# Maximum Number of Points with Cost (M)

You are given an `m x n` integer matrix `points` (**0-indexed**). Starting with `0` points, you want to **maximize** the number of points you can get from the matrix.

To gain points, you must pick one cell in **each row**. Picking the cell at coordinates `(r, c)` will **add** `points[r][c]` to your score.

However, you will lose points if you pick a cell too far from the cell that you picked in the previous row. For every two adjacent rows `r` and `r + 1` (where `0 <= r < m - 1`), picking cells at coordinates `(r, c1)` and `(r + 1, c2)` will **subtract** `abs(c1 - c2)` from your score.

Return _the **maximum** number of points you can achieve_.

`abs(x)` is defined as:

* `x` for `x >= 0`.
* `-x` for `x < 0`.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/07/12/screenshot-2021-07-12-at-13-40-26-diagram-drawio-diagrams-net.png)

<pre><code><strong>Input: points = [[1,2,3],[1,5,1],[3,1,1]]
</strong><strong>Output: 9
</strong><strong>Explanation:
</strong>The blue cells denote the optimal cells to pick, which have coordinates (0, 2), (1, 1), and (2, 0).
You add 3 + 5 + 3 = 11 to your score.
However, you must subtract abs(2 - 1) + abs(1 - 0) = 2 from your score.
Your final score is 11 - 2 = 9.
</code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/07/12/screenshot-2021-07-12-at-13-42-14-diagram-drawio-diagrams-net.png)

<pre><code><strong>Input: points = [[1,5],[2,3],[4,2]]
</strong><strong>Output: 11
</strong><strong>Explanation:
</strong>The blue cells denote the optimal cells to pick, which have coordinates (0, 1), (1, 1), and (2, 0).
You add 5 + 3 + 4 = 12 to your score.
However, you must subtract abs(1 - 1) + abs(1 - 0) = 1 from your score.
Your final score is 12 - 1 = 11.
</code></pre>

&#x20;

**Constraints:**

* `m == points.length`
* `n == points[r].length`
* `1 <= m, n <= 10^5`
* `1 <= m * n <= 10^5`
* `0 <= points[r][c] <= 10^5`



### 初步嘗試）Time Limit Exceeded ＱＱ

O(m \* n^2)

```typescript
function maxPoints(points: number[][]): number {
    const dp: number[][] = Array.from({ length: points.length }, () => Array(points[0].length).fill(0));
    dp[0] = [...points[0]]

    // 列
    for (let r = 1; r < points.length; r++) {
        // 欄
        for (let c = 0; c < points[r].length; c++) {
            for (let k = 0; k < points[r].length; k++) {
                // 更新 dp[r][c] 為同一排中自己的分數加上上一排的 dp 值扣掉位階差 最大的
                dp[r][c] = Math.max(dp[r][c], points[r][c] + dp[r - 1][k] - Math.abs(k - c))
            }
        }

    }

    return Math.max(...dp[points.length - 1])
};
```

檢討：這個會跟上一層的所有做比較導致複雜度變高



### 分左右

O(m \* n)

因為是用相對於上次選擇的位差＋本身的值

所以比較左右邊的最大值來更新 dp

```typescript
function maxPoints(points: number[][]): number {
    const m = points.length; // 獲取矩陣的行數
    const n = points[0].length; // 獲取矩陣的列數

    let dp = [...points[0]]; // 初始化 dp 陣列，代表選擇第一行時的最大得分

    // 遍歷每一行
    for (let i = 1; i < m; i++) {
        const newDp = new Array(n).fill(0); // 用來儲存當前行的最大得分

        let leftMax = 0; // 用來儲存從左到右的最大值
        // 從左到右遍歷當前行的每個位置
        for (let j = 0; j < n; j++) {
            // 計算從左邊來的最大得分，並更新 newDp[j]
            leftMax = Math.max(leftMax - 1, dp[j]);
            newDp[j] = leftMax + points[i][j];
        }

        let rightMax = 0; // 用來儲存從右到左的最大值
        // 從右到左遍歷當前行的每個位置
        for (let j = n - 1; j >= 0; j--) {
            // 計算從右邊來的最大得分，並更新 newDp[j]
            rightMax = Math.max(rightMax - 1, dp[j]);
            newDp[j] = Math.max(newDp[j], rightMax + points[i][j]);
        }

        dp = newDp; // 更新 dp 為當前行的最大得分
    }

    return Math.max(...dp); // 返回最後一行的最大得分
}
```

<figure><img src="../.gitbook/assets/截圖 2024-08-18 下午6.50.35.png" alt=""><figcaption></figcaption></figure>



