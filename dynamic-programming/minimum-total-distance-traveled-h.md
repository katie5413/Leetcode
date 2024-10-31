# Minimum Total Distance Traveled (H)

[2463. Minimum Total Distance Traveled](https://leetcode.com/problems/minimum-total-distance-traveled/)



There are some robots and factories on the X-axis. You are given an integer array `robot` where `robot[i]` is the position of the `ith` robot. You are also given a 2D integer array `factory` where `factory[j] = [positionj, limitj]` indicates that `positionj` is the position of the `jth` factory and that the `jth` factory can repair at most `limitj` robots.

The positions of each robot are **unique**. The positions of each factory are also **unique**. Note that a robot can be **in the same position** as a factory initially.

All the robots are initially broken; they keep moving in one direction. The direction could be the negative or the positive direction of the X-axis. When a robot reaches a factory that did not reach its limit, the factory repairs the robot, and it stops moving.

**At any moment**, you can set the initial direction of moving for **some** robot. Your target is to minimize the total distance traveled by all the robots.

Return _the minimum total distance traveled by all the robots_. The test cases are generated such that all the robots can be repaired.

**Note that**

* All robots move at the same speed.
* If two robots move in the same direction, they will never collide.
* If two robots move in opposite directions and they meet at some point, they do not collide. They cross each other.
* If a robot passes by a factory that reached its limits, it crosses it as if it does not exist.
* If the robot moved from a position `x` to a position `y`, the distance it moved is `|y - x|`.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2022/09/15/example1.jpg)

<pre><code><strong>Input: robot = [0,4,6], factory = [[2,2],[6,2]]
</strong><strong>Output: 4
</strong><strong>Explanation: As shown in the figure:
</strong>- The first robot at position 0 moves in the positive direction. It will be repaired at the first factory.
- The second robot at position 4 moves in the negative direction. It will be repaired at the first factory.
- The third robot at position 6 will be repaired at the second factory. It does not need to move.
The limit of the first factory is 2, and it fixed 2 robots.
The limit of the second factory is 2, and it fixed 1 robot.
The total distance is |2 - 0| + |2 - 4| + |6 - 6| = 4. It can be shown that we cannot achieve a better total distance than 4.
</code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2022/09/15/example-2.jpg)

<pre><code><strong>Input: robot = [1,-1], factory = [[-2,1],[2,1]]
</strong><strong>Output: 2
</strong><strong>Explanation: As shown in the figure:
</strong>- The first robot at position 1 moves in the positive direction. It will be repaired at the second factory.
- The second robot at position -1 moves in the negative direction. It will be repaired at the first factory.
The limit of the first factory is 1, and it fixed 1 robot.
The limit of the second factory is 1, and it fixed 1 robot.
The total distance is |2 - 1| + |(-2) - (-1)| = 2. It can be shown that we cannot achieve a better total distance than 2.
</code></pre>

&#x20;

**Constraints:**

* `1 <= robot.length, factory.length <= 100`
* `factory[j].length == 2`
* `-10^9 <= robot[i], position_j <= 10^9`
* `0 <= limit_j <= robot.length`
* The input will be generated such that it is always possible to repair every robot.





### DP

* **時間複雜度**：`O(m * n)`，需要處理每個機器人和工廠組合。
* **空間複雜度**：`O(m * n)`，DP 表 `dp` 的大小為 `m x n`。

#### 程式解說

1. **初始化**：
   * 將 `robot` 與 `factory` 分別按位置從小到大排序，這樣可以從左至右依序處理機器人和工廠。
   * 初始化 DP 表 `dp`，其中 `dp[i][j]` 表示從機器人 `i` 開始到工廠 `j` 的最小總距離。
2. **基礎情況**：
   * 若剩下的工廠數目為 0，但機器人數目大於 0 時，最小距離設定為無限 (`Infinity`)，因為無法分配機器人到工廠。
3. **動態規劃和單調佇列**：
   * 依照工廠 `j` 從右往左處理，對每個工廠 `j`：
     * 使用變數 `prefix` 累積從當前工廠到機器人的距離。
     * 使用單調佇列 `qq` 儲存最大限制內的可行距離，並維持單調遞增的特性來優化計算。
   * 若 `qq` 最前端的元素超出當前工廠的處理範圍，則移出佇列，這樣確保每次取得的距離計算都在工廠的最大可處理機器人數量內。
4. **最終結果**：
   * 返回 `dp[0][0]`，即從最左邊的機器人到最左邊工廠的最小總距離。

```typescript
function minimumTotalDistance(robot: number[], factory: number[][]): number {
    // 排序機器人和工廠的位置
    robot.sort((a, b) => a - b);
    factory.sort((a, b) => a[0] - b[0]);
    
    const m = robot.length;
    const n = factory.length;
    
    // 初始化 DP 表
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    
    // 基礎情況：若無工廠，距離設為無限
    for (let i = 0; i < m; i++) {
        dp[i][n] = Infinity;
    }
    
    // 從右往左處理每個工廠
    for (let j = n - 1; j >= 0; j--) {
        let prefix = 0;
        const qq: [number, number][] = [[m, 0]]; // 初始化單調佇列
        
        // 從右往左處理每個機器人
        for (let i = m - 1; i >= 0; i--) {
            // 加上目前工廠的距離
            prefix += Math.abs(robot[i] - factory[j][0]);
            
            // 移除超出工廠限制的機器人
            if (qq[0][0] > i + factory[j][1]) {
                qq.shift();
            }
            
            // 維持單調佇列
            while (qq.length && qq[qq.length - 1][1] >= dp[i][j + 1] - prefix) {
                qq.pop();
            }
            
            qq.push([i, dp[i][j + 1] - prefix]);
            dp[i][j] = qq[0][1] + prefix;
        }
    }
    
    return dp[0][0];
}

```

<figure><img src="../.gitbook/assets/截圖 2024-10-31 晚上11.12.29.png" alt=""><figcaption></figcaption></figure>

