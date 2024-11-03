# Sqrt(x) (E)

[69. Sqrt(x)](https://leetcode.com/problems/sqrtx/)



Given a non-negative integer `x`, return _the square root of_ `x` _rounded down to the nearest integer_. The returned integer should be **non-negative** as well.

You **must not use** any built-in exponent function or operator.

* For example, do not use `pow(x, 0.5)` in c++ or `x ** 0.5` in python.

&#x20;使用二分搜尋法來計算給定非負整數 `x` 的平方根，並返回向下取整的結果

**Example 1:**

<pre><code><strong>Input: x = 4
</strong><strong>Output: 2
</strong><strong>Explanation: The square root of 4 is 2, so we return 2.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: x = 8
</strong><strong>Output: 2
</strong><strong>Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.
</strong></code></pre>

&#x20;

**Constraints:**

* `0 <= x <= 2^31 - 1`



### Binary Search

**O(log x)**：每次迭代都將搜索範圍縮小一半。

```typescript
function mySqrt(x: number): number {
  // 定義搜尋範圍的初始值
  let low = 0;
  let high = x;

  // 使用二分搜尋來尋找平方根
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const square = mid * mid;

    // 若 mid 的平方小於等於 x，則繼續向右搜尋
    if (square <= x) low = mid + 1;
    // 若 mid 的平方大於 x，則向左縮小範圍
    else high = mid - 1;
  }

  // high 會停在接近平方根的位置
  return high;
}

```

#### 程式解析

1. **初始化邊界**：
   * 設定 `low` 為 0，`high` 為 `x`，這樣可以確保搜索範圍包含平方根的所有可能值。
2. **二分搜尋**：
   * 每次迭代中計算中間值 `mid`，並比較 `mid` 的平方 `square` 與 `x`：
     * 如果 `square <= x`，表示 `mid` 可能是平方根，或者平方根在右側，因此將 `low` 移至 `mid + 1`。
     * 如果 `square > x`，表示 `mid` 太大，需要將 `high` 移至 `mid - 1`。
3. **返回結果**：
   * 最後，`high` 會停留在接近實際平方根的整數位置，因此返回 `high` 即可。
