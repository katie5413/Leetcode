# Grumpy Bookstore Owner (M)

[1052. Grumpy Bookstore Owner](https://leetcode.com/problems/grumpy-bookstore-owner/)



There is a bookstore owner that has a store open for `n` minutes. You are given an integer array `customers` of length `n` where `customers[i]` is the number of the customers that enter the store at the start of the `i_th` minute and all those customers leave after the end of that minute.

During certain minutes, the bookstore owner is grumpy. You are given a binary array grumpy where `grumpy[i]` is `1` if the bookstore owner is grumpy during the `i_th` minute, and is `0` otherwise.

When the bookstore owner is grumpy, the customers entering during that minute are not **satisfied**. Otherwise, they are satisfied.

The bookstore owner knows a secret technique to remain **not grumpy** for `minutes` consecutive minutes, but this technique can only be used **once**.

Return the **maximum** number of customers that can be _satisfied_ throughout the day.

&#x20;

**Example 1:**

**Input:** customers = \[1,0,1,2,1,1,7,5], grumpy = \[0,1,0,1,0,1,0,1], minutes = 3

**Output:** 16

**Explanation:**

The bookstore owner keeps themselves not grumpy for the last 3 minutes.

The maximum number of customers that can be satisfied = 1 + 1 + 1 + 1 + 7 + 5 = 16.

**Example 2:**

**Input:** customers = \[1], grumpy = \[0], minutes = 1

**Output:** 1

&#x20;

**Constraints:**

* `n == customers.length == grumpy.length`
* `1 <= minutes <= n <= 2 * 10^4`
* `0 <= customers[i] <= 1000`
* `grumpy[i]` is either `0` or `1`.



### Sliding Window

```typescript
function maxSatisfied(customers: number[], grumpy: number[], minutes: number): number {
    let totalSatisfied = 0;
    let maxExtraSatisfied = 0;
    let extraSatisfied = 0;

    for (let i = 0; i < customers.length; i++) {
        // 計算自然滿意的顧客數
        if (grumpy[i] === 0) {
            totalSatisfied += customers[i];
        }

        // 計算當前範圍內的額外滿意顧客數
        if (grumpy[i] === 1) {
            extraSatisfied += customers[i];
        }

        // 當前滑動視窗超出範圍時，扣除滑動視窗左邊的值
        if (i >= minutes && grumpy[i - minutes] === 1) {
            extraSatisfied -= customers[i - minutes];
        }

        // 更新最大額外滿意顧客數
        maxExtraSatisfied = Math.max(maxExtraSatisfied, extraSatisfied);
    }

    return totalSatisfied + maxExtraSatisfied;
}
```

<figure><img src="../.gitbook/assets/截圖 2024-08-27 凌晨1.42.16.png" alt=""><figcaption></figcaption></figure>



