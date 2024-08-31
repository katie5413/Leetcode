# N-th Tribonacci Number (E)

[1137. N-th Tribonacci Number](https://leetcode.com/problems/n-th-tribonacci-number/)



The Tribonacci sequence Tn is defined as follows:&#x20;

T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.

Given `n`, return the value of Tn.

&#x20;

**Example 1:**

<pre><code><strong>Input: n = 4
</strong><strong>Output: 4
</strong><strong>Explanation:
</strong>T_3 = 0 + 1 + 1 = 2
T_4 = 1 + 1 + 2 = 4
</code></pre>

**Example 2:**

<pre><code><strong>Input: n = 25
</strong><strong>Output: 1389537
</strong></code></pre>

&#x20;

**Constraints:**

* `0 <= n <= 37`
* The answer is guaranteed to fit within a 32-bit integer, ie. `answer <= 2^31 - 1`.



### DP

```typescript
function tribonacci(n: number): number {
    // memo
    const dp: number[] = new Array(n + 1).fill(0)

    dp[0] = 0
    dp[1] = 1
    dp[2] = 1

    for (let i = 3; i < n + 1; i++) {
        dp[i] = dp[i - 3] + dp[i - 2] + dp[i - 1]
    }

    return dp[n]
};
```



### Math

```typescript
function tribonacci(n: number): number {
    const arr = [0,1,1];
    let sum = 2;
    if (n < 3) {
        return arr[n];
    }
    for (let i = 3; i < n; i++) {
        arr[i] = sum;
        sum = sum * 2 - arr[i - 3];
    }
    return sum;
};
```

