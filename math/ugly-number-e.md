# Ugly Number (E)

[263. Ugly Number](https://leetcode.com/problems/ugly-number/)



An **ugly number** is a positive integer whose prime factors are limited to `2`, `3`, and `5`.

Given an integer `n`, return `true` _if_ `n` _is an **ugly number**_.

&#x20;

**Example 1:**

<pre><code><strong>Input: n = 6
</strong><strong>Output: true
</strong><strong>Explanation: 6 = 2 × 3
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: n = 1
</strong><strong>Output: true
</strong><strong>Explanation: 1 has no prime factors, therefore all of its prime factors are limited to 2, 3, and 5.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: n = 14
</strong><strong>Output: false
</strong><strong>Explanation: 14 is not ugly since it includes the prime factor 7.
</strong></code></pre>

&#x20;

**Constraints:**

* `-2^31 <= n <= 2^31 - 1`



### Math % 取餘數

```typescript
function isUgly(n: number): boolean {
    // 題目有說是正數，所以小於等於零的數直接回傳 false
    if (n <= 0) {
        return false
    }
  
    for (const factor of [2, 3, 5]) {
        // 如果可以被整除，代表是因數，一路除到不能再除
        while (n % factor === 0) {
            n /= factor
        }
    }
    
    // 如果不等於 1 代表還有其他因數
    return n === 1;
};
```

<figure><img src="../.gitbook/assets/截圖 2024-07-18 晚上10.17.26.png" alt=""><figcaption></figcaption></figure>

