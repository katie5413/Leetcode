# Find Number of Ways to Reach the K-th Stair (H)

[3154. Find Number of Ways to Reach the K-th Stair](https://leetcode.com/problems/find-number-of-ways-to-reach-the-k-th-stair/)

Related to [climbing-stairs-e.md](../dynamic-programming/climbing-stairs-e.md "mention") [min-cost-climbing-stairs-e.md](../dynamic-programming/min-cost-climbing-stairs-e.md "mention")



You are given a **non-negative** integer `k`. There exists a staircase with an infinite number of stairs, with the **lowest** stair numbered 0.

Alice has an integer `jump`, with an initial value of 0. She starts on stair 1 and wants to reach stair `k` using **any** number of **operations**. If she is on stair `i`, in one **operation** she can:

* Go down to stair `i - 1`. This operation **cannot** be used consecutively or on stair 0.
* Go up to stair `i + 2^jump`. And then, `jump` becomes `jump + 1`.

Return the _total_ number of ways Alice can reach stair `k`.

**Note** that it is possible that Alice reaches the stair `k`, and performs some operations to reach the stair `k` again.

&#x20;

**Example 1:**

**Input:** k = 0

**Output:** 2

**Explanation:**

The 2 possible ways of reaching stair 0 are:

* Alice starts at stair 1.
  * Using an operation of the first type, she goes down 1 stair to reach stair 0.
* Alice starts at stair 1.
  * Using an operation of the first type, she goes down 1 stair to reach stair 0.
  * Using an operation of the second type, she goes up 2^0 stairs to reach stair 1.
  * Using an operation of the first type, she goes down 1 stair to reach stair 0.

**Example 2:**

**Input:** k = 1

**Output:** 4

**Explanation:**

The 4 possible ways of reaching stair 1 are:

* Alice starts at stair 1. Alice is at stair 1.
* Alice starts at stair 1.
  * Using an operation of the first type, she goes down 1 stair to reach stair 0.
  * Using an operation of the second type, she goes up 2^0 stairs to reach stair 1.
* Alice starts at stair 1.
  * Using an operation of the second type, she goes up 2^0 stairs to reach stair 2.
  * Using an operation of the first type, she goes down 1 stair to reach stair 1.
* Alice starts at stair 1.
  * Using an operation of the first type, she goes down 1 stair to reach stair 0.
  * Using an operation of the second type, she goes up 2^0 stairs to reach stair 1.
  * Using an operation of the first type, she goes down 1 stair to reach stair 0.
  * Using an operation of the second type, she goes up 2^1 stairs to reach stair 2.
  * Using an operation of the first type, she goes down 1 stair to reach stair 1.

&#x20;

**Constraints:**

* `0 <= k <= 10^9`



### Bit Manipulation

```typescript
function waysToReachStair(k: number): number {
    if (k === 0 || k === 4) {
        return 2;
    }
    if (k === 1 || k === 2) {
        return 4;
    }
    
    k -= 1;
    const bits = k.toString(2).length;
    const overshoot = (1 << bits) - 1 - k;
    
    // 計算組合數的輔助函數
    function comb(n: number, k: number): number {
        if (k > n) return 0;
        if (k === 0 || k === n) return 1;
        let res = 1;
        for (let i = 0; i < k; i++) {
            res = res * (n - i) / (i + 1);
        }
        return res;
    }
    
    return comb(bits + 1, overshoot);
}
```

<figure><img src="../.gitbook/assets/截圖 2024-07-21 凌晨2.27.23.png" alt=""><figcaption></figcaption></figure>



### 為什麼 hint 1 成立

On using `x` operations of the second type and `y` operations of the first type, the stair `2^x + 1 - y` is reached.

操作規則

```
第二類操作：從樓梯 i 跳躍到樓梯 i + 2^jump，並且 jump 會增加 1。
第一類操作：從樓梯 i 下降到樓梯 i - 1（這個操作不能連續使用，也不能在樓梯 0 上使用）。
```

計算達到樓梯的公式

考慮使用 x 次第二類操作和 y 次第一類操作：

1.  第二類操作：

    每次使用第二類操作會使樓梯位置增加 2^jump，其中 jump 是跳躍的次數。假設我們使用 x 次第二類操作，最初的 jump 值從 0 開始，每次增加 1。因此，第二類操作的增量會是：&#x20;

    1. 第一次：2^0&#x20;
    2. 第二次：2^1&#x20;
    3. 第三次：2^2&#x20;
    4. 以此類推，直到第 x 次操作。

    總增量是 2^0 + 2^1 + 2^2 + ... + 2^(x-1)。這個和是等於 2^x - 1\
    這是因為等比數列的和公式：S = 2^x - 1。&#x20;
2. 第一類操作：每次使用第一類操作會使樓梯位置減少 1。我們使用了 y 次第一類操作，所以總共減少 y 樓梯。

計算最終樓梯位置

初始樓梯位置是 1。進行 x 次

第二類操作後，樓梯位置增加 2^x - 1。

進行 y 次第一類操作後，樓梯位置減少 y。

因此，最終到達的樓梯位置計算為：

最終樓梯位置 = 1 + (2^x - 1) - y

化簡一下：

最終樓梯位置}= 2^x + 1 - y



### For Loop + Comb

```typescript
function waysToReachStair(k: number): number {
    // 初始化結果變數
    let ans = 0; 

    // 迴圈控制跳躍次數從 0 到 30
    for (let jump = 0; jump <= 30; ++jump) {
        // n 表示跳躍次數加 1
        // v 計算從 2^jump 減去 k 的結果
        let n = 1 + jump, v = (1 << jump) - k; 

        // 取 v 和 n - v 之間的最小值來避免過大的計算
        v = Math.min(v, n - v); 

        // 如果 v 大於等於 0，則計算此情況下的組合數
        if (v >= 0) {
            let val = 1; 
            // 計算組合數 C(n, v) = n! / (v! * (n-v)!)
            // 使用迴圈逐步計算 C(n, v)
            for (let i = 0; i < v; ++i) {
                val *= n - i; // val = val * (n - i)
                val /= i + 1; // val = val / (i + 1)
            }
            // 將計算出的組合數累加到結果中
            ans += val; 
        }
    }
    
    return ans; 
};

```



### Lodash memoize

```typescript
function waysToReachStair(k: number): number {
    // 使用備忘錄化來提高組合數計算效率
    const C = _.memoize((n, k) => {
        if (k === 0 || n === k) return 1;
        return C(n - 1, k) + C(n - 1, k - 1);
    }, (x, y) => x + ' ' + y);

    // 初始化結果變數
    let result = 0;

    // 迴圈控制跳躍次數
    for (let i = 0; 2 ** i <= k + i + 1; i++) {
        // 如果跳躍步數小於 k，則跳過這次迴圈
        if (2 ** i - k < 0) continue;

        // 累加組合數 C(i + 1, 2^i - k) 到結果中
        result += C(i + 1, 2 ** i - k);
    }

    // 返回最終計算的結果
    return result;
};
```





```typescript
const DOWN_POSSIBLE = 1;
const DOWN_NOT_POSSIBLE = 0;
function waysToReachStair(k: number): number {
    // - 2^30 > 10^9 -> jump <= 30
    // - can only go down <= number of times we have jumped 
    //   -> downCount <= 31
    // - for each combination of jump and downCount, we can 
    //   have isDownPossible true or false
    const cache = new Array<Array<Array<number>>>(31).fill([])
        .map(_ => new Array<Array<number>>(31).fill([])
            .map(_ => [-1, -1]));
    return backtrack(k, 0, 0, DOWN_POSSIBLE, cache)
};

function backtrack(
    k: number, 
    jump: number, 
    downCount: number, 
    isDownPossible: number,
    cache: Array<Array<Array<number>>>) {
    // 2**0 + 2**1 + ... + 2**(jump-1) = (2**jump) - 1 
    // -> start at step 1, so we + 1 to it
    const currStep = 2 ** jump - downCount;

    if (currStep > k + 1) {
        return 0; // cannot reach k anymore
    }

    if (cache[jump][downCount][isDownPossible] !== -1) {
        return cache[jump][downCount][isDownPossible];
    }
    let res = 0;
    if (currStep === k) {
        res++;
    }
    if (isDownPossible === DOWN_POSSIBLE) {
        res += backtrack(k, jump, downCount + 1, DOWN_NOT_POSSIBLE, cache);
    }
    res += backtrack(k, jump + 1, downCount, DOWN_POSSIBLE, cache);
    cache[jump][downCount][isDownPossible] = res;
    return res;
}
```
