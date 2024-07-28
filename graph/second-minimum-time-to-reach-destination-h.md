# Second Minimum Time to Reach Destination (H)

[2045. Second Minimum Time to Reach Destination](https://leetcode.com/problems/second-minimum-time-to-reach-destination/)



A city is represented as a **bi-directional connected** graph with `n` vertices where each vertex is labeled from `1` to `n` (**inclusive**). The edges in the graph are represented as a 2D integer array `edges`, where each `edges[i] = [u_i, v_i]` denotes a bi-directional edge between vertex `u_i` and vertex `v_i`. Every vertex pair is connected by **at most one** edge, and no vertex has an edge to itself. The time taken to traverse any edge is `time` minutes.

Each vertex has a traffic signal which changes its color from **green** to **red** and vice versa every `change` minutes. All signals change **at the same time**. You can enter a vertex at **any time**, but can leave a vertex **only when the signal is green**. You **cannot wait** at a vertex if the signal is **green**.

The **second minimum value** is defined as the smallest value **strictly larger** than the minimum value.

* For example the second minimum value of `[2, 3, 4]` is `3`, and the second minimum value of `[2, 2, 4]` is `4`.

Given `n`, `edges`, `time`, and `change`, return _the **second minimum time** it will take to go from vertex_ `1` _to vertex_ `n`.

**Notes:**

* You can go through any vertex **any** number of times, **including** `1` and `n`.
* You can assume that when the journey **starts**, all signals have just turned **green**.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/09/29/e1.png)       ![](https://assets.leetcode.com/uploads/2021/09/29/e2.png)

<pre><code><strong>Input: n = 5, edges = [[1,2],[1,3],[1,4],[3,4],[4,5]], time = 3, change = 5
</strong><strong>Output: 13
</strong><strong>Explanation:
</strong>The figure on the left shows the given graph.
The blue path in the figure on the right is the minimum time path.
The time taken is:
- Start at 1, time elapsed=0
- 1 -> 4: 3 minutes, time elapsed=3
- 4 -> 5: 3 minutes, time elapsed=6
Hence the minimum time needed is 6 minutes.

The red path shows the path to get the second minimum time.
- Start at 1, time elapsed=0
- 1 -> 3: 3 minutes, time elapsed=3
- 3 -> 4: 3 minutes, time elapsed=6
- Wait at 4 for 4 minutes, time elapsed=10
- 4 -> 5: 3 minutes, time elapsed=13
Hence the second minimum time is 13 minutes.      
</code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/09/29/eg2.png)

<pre><code><strong>Input: n = 2, edges = [[1,2]], time = 3, change = 2
</strong><strong>Output: 11
</strong><strong>Explanation:
</strong>The minimum time path is 1 -> 2 with time = 3 minutes.
The second minimum time path is 1 -> 2 -> 1 -> 2 with time = 11 minutes.
</code></pre>

&#x20;

**Constraints:**

* `2 <= n <= 10^4`
* `n - 1 <= edges.length <= min(2 * 10^4, n * (n - 1) / 2)`
* `edges[i].length == 2`
* `1 <= u_i, v_i <= n`
* `u_i != v_i`
* There are no duplicate edges.
* Each vertex can be reached directly or indirectly from every other vertex.
* `1 <= time, change <= 10^3`



### 網友分享的） BFS

[https://leetcode.com/problems/second-minimum-time-to-reach-destination/solutions/5547828/100-beats-runtime-easy-explanation-simple-code](https://leetcode.com/problems/second-minimum-time-to-reach-destination/solutions/5547828/100-beats-runtime-easy-explanation-simple-code)

💥 圖表示法：將城市表示為帶有節點和邊的圖。使用廣度優先搜索（BFS）來找到從起點節點到目的地節點的路徑。

💥 交通信號燈：每個節點都有一個交通信號燈，每隔change分鐘交替一次。你只能在信號燈為綠燈時離開節點，這可能會導致延遲。

💥 第二短路徑：使用BFS來探索路徑，並記錄到達每個節點的第一次和第二次時間。第二次到達目的地節點（n）的時間即為第二短路徑。

💥 時間計算：到達節點時，檢查是否需要等待綠燈才能移動到下一個節點。根據信號燈的延遲調整旅行時間。

```typescript
function secondMinimum(n: number, edges: number[][], time: number, change: number): number {
    // 初始化鄰接表，用來存儲圖的結構
    const adj: number[][] = Array.from({ length: n + 1 }, () => []);

    // 將每條邊添加到鄰接表中
    for (const [v1, v2] of edges) {
        adj[v1].push(v2);
        adj[v2].push(v1);
    }

    // 初始化 BFS 隊列並設置起始節點為 1
    const queue: number[] = [1];
    // 當前時間設置為 0
    let curTime = 0;
    // 初始化結果為 -1，如果找到第二最短路徑則會更新這個值
    let res = -1;
    // 用來存儲每個節點的訪問時間
    const visitTimes: number[][] = Array.from({ length: n + 1 }, () => []);

    // 開始進行 BFS
    while (queue.length > 0) {
        // 獲取當前層的節點數量
        const levelSize = queue.length;
        for (let i = 0; i < levelSize; i++) {
            // 從隊列中取出當前節點
            const node = queue.shift()!;

            // 如果達到目標節點
            if (node === n) {
                // 如果已經找到過一次到達目標節點的時間
                if (res !== -1) {
                    return curTime; // 返回第二次到達目標節點的時間
                }
                res = curTime; // 更新第一次到達目標節點的時間
            }

            // 遍歷當前節點的所有鄰居
            for (const nei of adj[node]) {
                const neiTimes = visitTimes[nei];

                // 如果鄰居節點沒有被訪問過，或者只被訪問過一次且訪問時間不同於當前時間
                if (neiTimes.length === 0 || (neiTimes.length === 1 && neiTimes[0] !== curTime)) {
                    queue.push(nei); // 將鄰居節點添加到隊列中
                    neiTimes.push(curTime); // 記錄當前時間到達鄰居節點
                }
            }
        }

        // 根據交通信號燈計算下一個可以移動的時間
        if (Math.floor(curTime / change) % 2 === 1) {
            curTime += change - (curTime % change);
        }

        // 增加時間單位
        curTime += time;
    }

    // 如果無法找到第二短路徑則返回 -1
    return -1;
}
```

<figure><img src="../.gitbook/assets/截圖 2024-07-28 晚上11.17.47.png" alt=""><figcaption></figcaption></figure>

1. 鄰接表初始化：
   * const adj: number\[]\[] = Array.from({ length: n + 1 }, () => \[]); 初始化鄰接表來存儲每個節點的鄰居。
   * for (const \[v1, v2] of edges) { adj\[v1].push(v2); adj\[v2].push(v1); } 將每條邊的兩個節點互相添加到對方的鄰居列表中。
2. BFS 初始化：
   * const queue: number\[] = \[1]; 初始化 BFS 隊列，從節點 1 開始。
   * let curTime = 0; 設定當前時間為 0。
   * let res = -1; 初始化結果為 -1。
   * const visitTimes: number\[]\[] = Array.from({ length: n + 1 }, () => \[]); 初始化訪問時間記錄，為每個節點存儲其被訪問的時間。
3. BFS 主循環：
   * 當隊列不為空時進行循環。
   * const levelSize = queue.length; 獲取當前層的節點數量。
   * for (let i = 0; i < levelSize; i++) { const node = queue.shift()!; } 從隊列中取出當前層的每個節點。
4. 檢查目標節點：
   * 如果當前節點是目標節點，且已經找到過一次到達時間，則返回當前時間作為第二次到達的時間。
   * 否則，更新第一次到達目標節點的時間。
5. 遍歷鄰居節點：
   * 遍歷當前節點的所有鄰居。
   * 如果鄰居節點沒有被訪問過，或者只被訪問過一次且訪問時間不同於當前時間，則將鄰居節點添加到隊列中並記錄當前時間。
6. 處理交通信號燈：
   * 根據交通信號燈計算下一個可以移動的時間。如果當前時間在紅燈期間，則等待直到綠燈。
   * 增加時間單位，準備進入下一層。
7. 結束條件：
   * 如果在 BFS 中無法找到第二短路徑，則返回 -1。
