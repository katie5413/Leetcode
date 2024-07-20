# Min Cost Climbing Stairs (E)

[746. Min Cost Climbing Stairs](https://leetcode.com/problems/min-cost-climbing-stairs/)

Related to  [climbing-stairs-e.md](climbing-stairs-e.md "mention")



You are given an integer array `cost` where `cost[i]` is the cost of `ith` step on a staircase. Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index `0`, or the step with index `1`.

Return _the minimum cost to reach the top of the floor_.

&#x20;

**Example 1:**

<pre><code><strong>Input: cost = [10,15,20]
</strong><strong>Output: 15
</strong><strong>Explanation: You will start at index 1.
</strong>- Pay 15 and climb two steps to reach the top.
The total cost is 15.
</code></pre>

**Example 2:**

<pre><code><strong>Input: cost = [1,100,1,1,1,100,1,1,100,1]
</strong><strong>Output: 6
</strong><strong>Explanation: You will start at index 0.
</strong>- Pay 1 and climb two steps to reach index 2.
- Pay 1 and climb two steps to reach index 4.
- Pay 1 and climb two steps to reach index 6.
- Pay 1 and climb one step to reach index 7.
- Pay 1 and climb two steps to reach index 9.
- Pay 1 and climb one step to reach the top.
The total cost is 6.
</code></pre>

&#x20;

**Constraints:**

* `2 <= cost.length <= 1000`
* `0 <= cost[i] <= 999`

### DP 從上到下

時間/空間複雜度： O(n)

```typescript
function minCostClimbingStairs(cost: number[]): number {
    const dp = new Array(cost.length).fill(0)

    for (let i = 2; i <= cost.length; i++) {
        dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
    }

    return dp[cost.length]
};
```

* 對於每個台階 `i` 從 2 到 `n`，我們計算到達該台階的最小成本，計算方法如下：
  * `dp[i - 1] + cost[i - 1]` 表示從前一個台階爬一個台階到達當前台階的成本。
  * `dp[i - 2] + cost[i - 2]` 表示從前兩個台階爬兩個台階到達當前台階的成本。
* 我們取這兩個值的最小值作為 `dp[i]` 的值。
* **結果**：
  * 到達樓梯頂部的最小成本是 `dp[n]`。



### DP 從下到上

時間/空間複雜度： O(n)

```typescript
function minCostClimbingStairs(cost: number[]): number {
    const answers = new Array(cost.length);
    for (let i = cost.length - 1; i >= 0; i--) {
        if (i === cost.length - 1 || i === cost.length - 2) {
            answers[i] = cost[i];
            continue;
        }
        answers[i] = cost[i] + Math.min(
            answers[i + 1],
            answers[i + 2],
        );
    }

    return Math.min(answers[0], answers[1]);
};
```

這種方法是從樓梯的最後一步開始計算，逐步往回推導到初始位置，最終得到到達樓梯頂部的最小成本。具體步驟如下：

1. **初始化答案數組**：
   * 創建一個數組 `answers`，用來存儲到達每個台階的最小成本。
2. **從最後一個台階開始計算**：
   * 從 `cost.length - 1` 開始向前計算，逐步推導到達每個台階的最小成本。
3. **處理邊界情況**：
   * 如果當前台階是 `cost.length - 1`（最後一個台階）或 `cost.length - 2`（倒數第二個台階），則 `answers[i]` 直接等於 `cost[i]`。
   * 這是因為到達這兩個台階的成本就是它們本身。
4. **計算每個台階的最小成本**：
   * 對於其他台階，需要計算從當前台階向上走一階或兩階的最小成本，取這兩者之中的最小值加上當前台階的成本。
5. **返回結果**：
   * 最後，返回 `answers[0]` 和 `answers[1]` 中的最小值，因為可以從索引 `0` 或 `1` 開始。



### 比較省空間的寫法

空間複雜度： O(1)

```typescript
function minCostClimbingStairs(cost: number[]): number {
    if (cost.length === 2) return Math.min(cost[0], cost[1]);

    let arr = [0, 0];

    for (let i = 2; i < cost.length + 1; i++) {
        const short = cost[i-1] + arr[1];
        const long = cost[i-2] + arr[0];

        arr[0] = arr[1];
        arr[1] = Math.min(short, long);
    }

    return arr[1];
}
```

1. **初始化**：
   * 使用一個長度為 2 的數組 `arr`，用來存儲動態規劃過程中的中間結果。
   * `arr[0]` 和 `arr[1]` 初始值為 0，表示在開始時沒有任何成本。
2. **動態規劃轉移**：
   * 從第 2 步開始，計算到達每一步的最小成本。
   * `short` 表示從前一步到達當前步驟的成本，即 `cost[i-1] + arr[1]`。
   * `long` 表示從前兩步到達當前步驟的成本，即 `cost[i-2] + arr[0]`。
   * 將 `arr[0]` 更新為當前的 `arr[1]`，然後將 `arr[1]` 更新為 `short` 和 `long` 中的最小值。
3. **返回結果**：
   * 最後，返回 `arr[1]`，它包含了到達頂部的最小成本。

### Map

```typescript
function minCostClimbingStairs(cost: number[]): number {
    const n = cost.length;

    const memo = new Map();
    memo.set(0, 0);
    memo.set(1, 0);

    // memo.get(i) => min cost to reach to ith step
    const helper = (currIndex: number): number => {
        if (memo.has(currIndex)) {
            return memo.get(currIndex);
        }
        // Can reach currIndex by
        const ans = Math.min(
            helper(currIndex - 1) + (cost[currIndex - 1] ?? 0),
            helper(currIndex - 2) + (cost[currIndex - 2] ?? 0),
        );
        memo.set(currIndex, ans);
        return ans;
    }

    return helper(n)
};
```
