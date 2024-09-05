# Find Missing Observations (M)

[2028. Find Missing Observations](https://leetcode.com/problems/find-missing-observations/)



You have observations of `n + m` **6-sided** dice rolls with each face numbered from `1` to `6`. `n` of the observations went missing, and you only have the observations of `m` rolls. Fortunately, you have also calculated the **average value** of the `n + m` rolls.

You are given an integer array `rolls` of length `m` where `rolls[i]` is the value of the `ith` observation. You are also given the two integers `mean` and `n`.

Return _an array of length_ `n` _containing the missing observations such that the **average value** of the_ `n + m` _rolls is **exactly**_ `mean`. If there are multiple valid answers, return _any of them_. If no such array exists, return _an empty array_.

The **average value** of a set of `k` numbers is the sum of the numbers divided by `k`.

Note that `mean` is an integer, so the sum of the `n + m` rolls should be divisible by `n + m`.

&#x20;

**Example 1:**

<pre><code><strong>Input: rolls = [3,2,4,3], mean = 4, n = 2
</strong><strong>Output: [6,6]
</strong><strong>Explanation: The mean of all n + m rolls is (3 + 2 + 4 + 3 + 6 + 6) / 6 = 4.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: rolls = [1,5,6], mean = 3, n = 4
</strong><strong>Output: [2,3,2,2]
</strong><strong>Explanation: The mean of all n + m rolls is (1 + 5 + 6 + 2 + 3 + 2 + 2) / 7 = 3.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: rolls = [1,2,3,4], mean = 6, n = 4
</strong><strong>Output: []
</strong><strong>Explanation: It is impossible for the mean to be 6 no matter what the 4 missing rolls are.
</strong></code></pre>

&#x20;

**Constraints:**

* `m == rolls.length`
* `1 <= n, m <= 10^5`
* `1 <= rolls[i], mean <= 6`



### Math

```typescript
function missingRolls(rolls: number[], mean: number, n: number): number[] {
    const m: number = rolls.length
    // n 的總額
    const rest: number = mean * (m + n) - rolls.reduce((acc, curr) => acc + curr, 0)

    // 剩餘可分配的平均超過 6 或 小於 1，不成立
    const restAvg: number = rest / n
    if (restAvg > 6 || restAvg < 1) return []
    // 先平均分給每個值
    const ans: number[] = new Array(n).fill(Math.floor(restAvg))
    // 把剩下的依序灌到其他的
    let remainder: number = rest - Math.floor(restAvg) * n
    let index: number = 0
    while (remainder > 0) {
        const max: number = 6 - Math.floor(restAvg)
        const cost: number = Math.min(remainder, max)
        ans[index] += cost
        remainder -= cost
        index++
    }


    return ans
};
```



<figure><img src="../.gitbook/assets/截圖 2024-09-05 晚上11.02.20.png" alt=""><figcaption></figcaption></figure>
