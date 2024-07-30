# Maximize Happiness of Selected Children (M)

[3075. Maximize Happiness of Selected Children](https://leetcode.com/problems/maximize-happiness-of-selected-children/)



You are given an array `happiness` of length `n`, and a **positive** integer `k`.

There are `n` children standing in a queue, where the `i_th` child has **happiness value** `happiness[i]`. You want to select `k` children from these `n` children in `k` turns.

In each turn, when you select a child, the **happiness value** of all the children that have **not** been selected till now decreases by `1`. Note that the happiness value **cannot** become negative and gets decremented **only** if it is positive.

Return _the **maximum** sum of the happiness values of the selected children you can achieve by selecting_ `k` _children_.

&#x20;

**Example 1:**

<pre><code><strong>Input: happiness = [1,2,3], k = 2
</strong><strong>Output: 4
</strong><strong>Explanation: We can pick 2 children in the following way:
</strong>- Pick the child with the happiness value == 3. The happiness value of the remaining children becomes [0,1].
- Pick the child with the happiness value == 1. The happiness value of the remaining child becomes [0]. Note that the happiness value cannot become less than 0.
The sum of the happiness values of the selected children is 3 + 1 = 4.
</code></pre>

**Example 2:**

<pre><code><strong>Input: happiness = [1,1,1,1], k = 2
</strong><strong>Output: 1
</strong><strong>Explanation: We can pick 2 children in the following way:
</strong>- Pick any child with the happiness value == 1. The happiness value of the remaining children becomes [0,0,0].
- Pick the child with the happiness value == 0. The happiness value of the remaining child becomes [0,0].
The sum of the happiness values of the selected children is 1 + 0 = 1.
</code></pre>

**Example 3:**

<pre><code><strong>Input: happiness = [2,3,4,5], k = 1
</strong><strong>Output: 5
</strong><strong>Explanation: We can pick 1 child in the following way:
</strong>- Pick the child with the happiness value == 5. The happiness value of the remaining children becomes [1,2,3].
The sum of the happiness values of the selected children is 5.
</code></pre>

&#x20;

**Constraints:**

* `1 <= n == happiness.length <= 2 * 10^5`
* `1 <= happiness[i] <= 10^8`
* `1 <= k <= n`



### 雖然是 medium 但秒殺，開心 <3

```typescript
function maximumHappinessSum(happiness: number[], k: number): number {
    let sum = 0
    // 排序，並拿到前 k 大的數字
    happiness.sort((a, b) => b - a)

    // 每次扣掉 i, 但最小只到 0
    for (let i = 0; i < k; i++) {
        sum += Math.max(0, happiness[i] - i)
    }
    return sum
};
```
