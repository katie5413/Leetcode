# Distance Between Bus Stops (E)

[1184. Distance Between Bus Stops](https://leetcode.com/problems/distance-between-bus-stops/)



A bus has `n` stops numbered from `0` to `n - 1` that form a circle. We know the distance between all pairs of neighboring stops where `distance[i]` is the distance between the stops number `i` and `(i + 1) % n`.

The bus goes along both directions i.e. clockwise and counterclockwise.

Return the shortest distance between the given `start` and `destination` stops.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2019/09/03/untitled-diagram-1.jpg)

<pre><code><strong>Input: distance = [1,2,3,4], start = 0, destination = 1
</strong><strong>Output: 1
</strong><strong>Explanation: Distance between 0 and 1 is 1 or 9, minimum is 1.
</strong></code></pre>

&#x20;

**Example 2:**

![](https://assets.leetcode.com/uploads/2019/09/03/untitled-diagram-1-1.jpg)

<pre><code><strong>Input: distance = [1,2,3,4], start = 0, destination = 2
</strong><strong>Output: 3
</strong><strong>Explanation: Distance between 0 and 2 is 3 or 7, minimum is 3.
</strong></code></pre>

&#x20;

**Example 3:**

![](https://assets.leetcode.com/uploads/2019/09/03/untitled-diagram-1-2.jpg)

<pre><code><strong>Input: distance = [1,2,3,4], start = 0, destination = 3
</strong><strong>Output: 4
</strong><strong>Explanation: Distance between 0 and 3 is 6 or 4, minimum is 4.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= n <= 10^4`
* `distance.length == n`
* `0 <= start, destination < n`
* `0 <= distance[i] <= 10^4`



### 一次遍歷

順向跟逆向，回傳兩者較小的

可以先算順向的，然後用總額扣除順向獲得逆向，這樣只要在 O(n) 時間內就可以

```typescript
function distanceBetweenBusStops(distance: number[], start: number, destination: number): number {
    let sum: number = 0;
    let s2d: number = 0;
    const s = Math.min(start, destination)
    const d = Math.max(start, destination)

    for (let i = 0; i < distance.length; i++) {
        if (i >= s && i < d) {
            s2d += distance[i]
        }
        sum += distance[i]

    }

    return Math.min(s2d : sum - s2d)

};
```



### 類似的方法，但不用比較初始的 start 跟 destination 誰大誰小

```typescript
function distanceBetweenBusStops(distance: number[], start: number, destination: number): number {

    const n = distance.length;

    const totalDistance = distance.reduce((a,b) => a + b, 0);

    let clockwiseDistance = 0;
    for (let i = start; i !== destination; i = (i + 1) % n) {
        clockwiseDistance += distance[i];
    }

    const counterClockwiseDistance = totalDistance - clockwiseDistance;

    return Math.min(clockwiseDistance, counterClockwiseDistance);
};
```

在每次迴圈迭代中，i 的值會進行更新。這裡使用 (i + 1) % n 的方式來實現迴圈的循環計算：

* i + 1 是將 i 增加 1，代表向下一個公車站移動。
* % n 是取餘數運算，確保在達到 n（公車站總數）之後能夠循環回到起點，形成公車站的圓環狀結構。
