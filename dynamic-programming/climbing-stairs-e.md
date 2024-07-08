# Climbing Stairs (E)

You are climbing a staircase. It takes `n` steps to reach the top.

Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?

&#x20;

**Example 1:**

<pre><code><strong>Input: n = 2
</strong><strong>Output: 2
</strong><strong>Explanation: There are two ways to climb to the top.
</strong>1. 1 step + 1 step
2. 2 steps
</code></pre>

**Example 2:**

<pre><code><strong>Input: n = 3
</strong><strong>Output: 3
</strong><strong>Explanation: There are three ways to climb to the top.
</strong>1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
</code></pre>

&#x20;

**Constraints:**

* `1 <= n <= 45`



### F(n)=F(n−1)+F(n−2).

#### 方法一、用陣列空間來儲存

時間複雜度為 O(n)，空間複雜度為 O(n)

```typescript
function climbStairs(n: number): number {
    const dp: number[] = new Array(n).fill(0)
    dp[1] = 1
    dp[2] = 2

    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }

    return dp[n]

};
```

p.s 如果不想浪費 dp\[0] 這個空間可以用下面這個寫法

```typescript
function climbStairs(n: number): number {
    if (n === 1) return 1;
    const dp: number[] = new Array(n);
    dp[0] = 1; 
    dp[1] = 2; 
    for (let i = 2; i < dp.length; i++) { 
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[dp.length - 1];
};
```

這個寫法也不錯

```typescript
function climbStairs(n: number): number {
    const steps = [0, 1, 2];

    if (n < 3) {
        return steps[n];
    }

    for (let i = 3; i <= n; i++) {
        steps[i] = steps[i - 1] + steps[i - 2];
    }

    return steps[steps.length - 1];
}
```

#### 推薦）方法二

時間複雜度為 O(n)，空間複雜度為 O(1)

```typescript
function climbStairs(n: number): number {
    if (n === 1) {
        return 1;
    }
    let first = 1;
    let second = 2;
    for (let i = 3; i <= n; i++) {
        let third = first + second;
        first = second;
        second = third;
    }
    return second;
}

```



比較

* 在方法二空間使用上更高效，因為它只使用常數空間 O(1)。對於較大的 n 值，這個方法更優。
* 方法一雖然使用了更多的空間，但它的思路也很清晰，特別是對於初學者或需要追踪中間結果的情況下。

綜合來看，如果需要節省空間且 n 的值可能很大，推薦使用方法二。若對空間要求不高並且想更直觀地理解動態規劃過程，可以選擇方法一。
