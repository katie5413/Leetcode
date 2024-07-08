# Water Bottles

There are `numBottles` water bottles that are initially full of water. You can exchange `numExchange` empty water bottles from the market with one full water bottle.

The operation of drinking a full water bottle turns it into an empty bottle.

Given the two integers `numBottles` and `numExchange`, return _the **maximum** number of water bottles you can drink_.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/07/01/sample\_1\_1875.png)

<pre><code><strong>Input: numBottles = 9, numExchange = 3
</strong><strong>Output: 13
</strong><strong>Explanation: You can exchange 3 empty bottles to get 1 full water bottle.
</strong>Number of water bottles you can drink: 9 + 3 + 1 = 13.
</code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/07/01/sample\_2\_1875.png)

<pre><code><strong>Input: numBottles = 15, numExchange = 4
</strong><strong>Output: 19
</strong><strong>Explanation: You can exchange 4 empty bottles to get 1 full water bottle. 
</strong>Number of water bottles you can drink: 15 + 3 + 1 = 19.
</code></pre>

&#x20;

**Constraints:**

* `1 <= numBottles <= 100`
* `2 <= numExchange <= 100`



### 單純的數學題

用 sum 記錄最終的數量，並設定初始值為一開始擁有的總數

用 left 記錄剩餘的空瓶，且初始值為一開始擁有的總數

運用 while 的特性，在仍有剩餘空瓶可兌換的情況下持續加總 sum 和 left ，迴圈結束後回傳最終的 sum&#x20;

```typescript
function numWaterBottles(numBottles: number, numExchange: number): number {
    let sum = numBottles
    let left = numBottles
    while (left >= numExchange) {
        const exchange = Math.floor(left / numExchange)
        sum += exchange
        left = exchange + left % numExchange
    }
    return sum
};
```
