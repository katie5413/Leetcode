# Path with Maximum Probability (M)

[1514. Path with Maximum Probability](https://leetcode.com/problems/path-with-maximum-probability/)



ou are given an undirected weighted graph of `n` nodes (0-indexed), represented by an edge list where `edges[i] = [a, b]` is an undirected edge connecting the nodes `a` and `b` with a probability of success of traversing that edge `succProb[i]`.

Given two nodes `start` and `end`, find the path with the maximum probability of success to go from `start` to `end` and return its success probability.

If there is no path from `start` to `end`, **return 0**. Your answer will be accepted if it differs from the correct answer by at most **1e-5**.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2019/09/20/1558\_ex1.png)

<pre><code><strong>Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
</strong><strong>Output: 0.25000
</strong><strong>Explanation: There are two paths from start to end, one having a probability of success = 0.2 and the other has 0.5 * 0.5 = 0.25.
</strong></code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2019/09/20/1558\_ex2.png)

<pre><code><strong>Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2
</strong><strong>Output: 0.30000
</strong></code></pre>

**Example 3:**

![](https://assets.leetcode.com/uploads/2019/09/20/1558\_ex3.png)

<pre><code><strong>Input: n = 3, edges = [[0,1]], succProb = [0.5], start = 0, end = 2
</strong><strong>Output: 0.00000
</strong><strong>Explanation: There is no path between 0 and 2.
</strong></code></pre>

&#x20;

**Constraints:**

* `2 <= n <= 10^4`
* `0 <= start, end < n`
* `start != end`
* `0 <= a, b < n`
* `a != b`
* `0 <= succProb.length == edges.length <= 2*10^4`
* `0 <= succProb[i] <= 1`
* There is at most one edge between every two nodes.

### Bellman-Ford

加權圖形的最小路徑

```typescript
function maxProbability(n: number, edges: number[][], succProb: number[], start_node: number, end_node: number): number {
    const probs = Array(n).fill(0); // 初始化每個節點的概率為 0，無法到達時返回 0
    probs[start_node] = 1; // 起始節點的初始概率設為 100%

    // 對所有邊進行 N-1 次的操作
    for (let i = 0; i < n - 1; i++) {
        let updated = false; // 用來檢查當前迴圈是否有更新，若無更新則提早結束迴圈
        for (let j = 0; j < edges.length; j++) {
            const [from, to] = edges[j]; // 取得邊的起點和終點
            const prob = succProb[j]; // 取得這條邊的成功概率
            if (probs[from] * prob > probs[to]) { // 檢查是否可以通過這條邊提高到達終點的概率
                probs[to] = probs[from] * prob; // 更新終點的概率
                updated = true; // 標記為已更新
            }
            if (probs[to] * prob > probs[from]) { // 同時檢查是否可以反向更新起點的概率
                probs[from] = probs[to] * prob; // 更新起點的概率
                updated = true; // 標記為已更新
            }
        }
        if (!updated) break; // 如果沒有任何更新，提前結束迴圈
    }

    // 返回到達目標節點的最大概率
    return probs[end_node];
};
```



1. 初始化：
   * probs 陣列用來儲存每個節點的最大概率，初始時設定所有節點的概率為 0，表示無法到達。
   * 將起始節點 start\_node 的概率設定為 1，表示 100% 可以到達自己。
2. 鬆弛操作：
   * 外層迴圈執行 n-1 次，這是 Bellman-Ford 演算法的標準步驟，用來確保所有節點的概率達到最優。
   * 內層迴圈遍歷所有的邊，檢查是否能夠通過這條邊提高到達某個節點的概率，如果可以，就更新該節點的概率。
   * 每次更新都會將 updated 標記為 true，表示在本次迴圈中有變動。如果在某次迴圈中沒有任何更新，則可以提前結束。
3. 結果：
   * 最後，函式返回到達目標節點 end\_node 的最大概率。
