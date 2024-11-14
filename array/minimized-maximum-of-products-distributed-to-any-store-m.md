# Minimized Maximum of Products Distributed to Any Store (M)

[2064. Minimized Maximum of Products Distributed to Any Store](https://leetcode.com/problems/minimized-maximum-of-products-distributed-to-any-store/)



You are given an integer `n` indicating there are `n` specialty retail stores. There are `m` product types of varying amounts, which are given as a **0-indexed** integer array `quantities`, where `quantities[i]` represents the number of products of the `ith` product type.

You need to distribute **all products** to the retail stores following these rules:

* A store can only be given **at most one product type** but can be given **any** amount of it.
* After distribution, each store will have been given some number of products (possibly `0`). Let `x` represent the maximum number of products given to any store. You want `x` to be as small as possible, i.e., you want to **minimize** the **maximum** number of products that are given to any store.

Return _the minimum possible_ `x`.

&#x20;

**Example 1:**

<pre><code><strong>Input: n = 6, quantities = [11,6]
</strong><strong>Output: 3
</strong><strong>Explanation: One optimal way is:
</strong>- The 11 products of type 0 are distributed to the first four stores in these amounts: 2, 3, 3, 3
- The 6 products of type 1 are distributed to the other two stores in these amounts: 3, 3
The maximum number of products given to any store is max(2, 3, 3, 3, 3, 3) = 3.
</code></pre>

**Example 2:**

<pre><code><strong>Input: n = 7, quantities = [15,10,10]
</strong><strong>Output: 5
</strong><strong>Explanation: One optimal way is:
</strong>- The 15 products of type 0 are distributed to the first three stores in these amounts: 5, 5, 5
- The 10 products of type 1 are distributed to the next two stores in these amounts: 5, 5
- The 10 products of type 2 are distributed to the last two stores in these amounts: 5, 5
The maximum number of products given to any store is max(5, 5, 5, 5, 5, 5, 5) = 5.
</code></pre>

**Example 3:**

<pre><code><strong>Input: n = 1, quantities = [100000]
</strong><strong>Output: 100000
</strong><strong>Explanation: The only optimal way is:
</strong>- The 100000 products of type 0 are distributed to the only store.
The maximum number of products given to any store is max(100000) = 100000.
</code></pre>

&#x20;

**Constraints:**

* `m == quantities.length`
* `1 <= m <= n <= 10^5`
* `1 <= quantities[i] <= 10^5`



Ref. [https://leetcode.com/problems/minimized-maximum-of-products-distributed-to-any-store/solutions/6043943/beats-90-100-video-clean-list-most-common-array-interview-problems](https://leetcode.com/problems/minimized-maximum-of-products-distributed-to-any-store/solutions/6043943/beats-90-100-video-clean-list-most-common-array-interview-problems)

```typescript
function minimizedMaximum(n: number, quantities: number[]): number {
    const canDistribute = (x: number): boolean => {
        let stores = 0;
        for (const q of quantities) {
            stores += Math.ceil(q / x);
        }
        return stores <= n;
    };
    
    let left = 1;
    let right = Math.max(...quantities);
    let result = 0;
    
    while (left <= right) {
        const x = Math.floor((left + right) / 2);
        if (canDistribute(x)) {
            result = x;
            right = x - 1;
        } else {
            left = x + 1;
        }
    }
    
    return result;
}
```

<figure><img src="../.gitbook/assets/截圖 2024-11-14 晚上11.53.53.png" alt=""><figcaption></figcaption></figure>

