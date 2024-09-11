# Minimum Bit Flips to Convert Number (E)

[2220. Minimum Bit Flips to Convert Number](https://leetcode.com/problems/minimum-bit-flips-to-convert-number/)



A **bit flip** of a number `x` is choosing a bit in the binary representation of `x` and **flipping** it from either `0` to `1` or `1` to `0`.

* For example, for `x = 7`, the binary representation is `111` and we may choose any bit (including any leading zeros not shown) and flip it. We can flip the first bit from the right to get `110`, flip the second bit from the right to get `101`, flip the fifth bit from the right (a leading zero) to get `10111`, etc.

Given two integers `start` and `goal`, return _the **minimum** number of **bit flips** to convert_ `start` _to_ `goal`.

&#x20;

**Example 1:**

<pre><code><strong>Input: start = 10, goal = 7
</strong><strong>Output: 3
</strong><strong>Explanation: The binary representation of 10 and 7 are 1010 and 0111 respectively. We can convert 10 to 7 in 3 steps:
</strong>- Flip the first bit from the right: 1010 -> 1011.
- Flip the third bit from the right: 1011 -> 1111.
- Flip the fourth bit from the right: 1111 -> 0111.
It can be shown we cannot convert 10 to 7 in less than 3 steps. Hence, we return 3.
</code></pre>

**Example 2:**

<pre><code><strong>Input: start = 3, goal = 4
</strong><strong>Output: 3
</strong><strong>Explanation: The binary representation of 3 and 4 are 011 and 100 respectively. We can convert 3 to 4 in 3 steps:
</strong>- Flip the first bit from the right: 011 -> 010.
- Flip the second bit from the right: 010 -> 000.
- Flip the third bit from the right: 000 -> 100.
It can be shown we cannot convert 3 to 4 in less than 3 steps. Hence, we return 3.
</code></pre>

&#x20;

**Constraints:**

* `0 <= start, goal <= 10^9`

### Bit manipulation

```typescript
function minBitFlips(start: number, goal: number): number {
    // 使用 XOR 運算來找出 start 和 goal 之間不同的位元
    let xorResult = start ^ goal;
    let ans = 0;

    // 計算 XOR 結果中 1 的數量，也就是需要翻轉的位元數
    while (xorResult > 0) {
        ans += xorResult & 1;  // 若當前位元為 1，則需要翻轉
        xorResult >>= 1;       // 右移一位，檢查下一個位元
    }

    // 返回需要的最少位元翻轉次數
    return ans;
};
```



### 耍帥版本

```typescript
function minBitFlips(start: number, goal: number): number {
    return (start ^ goal).toString(2).split('').reduce((acc, t) => t === '1' ? acc + 1 : acc, 0);
};
```



### Recursive

```typescript
function minBitFlips(start: number, goal: number): number {
    // 定義遞迴函式來計算數字 n 中 1 的個數
    const countOnes = (n: number): number => {
      return n === 0 
        ? n // 若 n 為 0，則返回 0
        : (n & 1) + countOnes(n >>= 1); // 將 n 的最低位與 1 做 AND 運算，並將 n 右移一位後遞迴計算
    }
    
    // 計算 start 和 goal 之間不同的位元，並計算這些位元中 1 的個數
    return countOnes(start ^ goal);
};
```
