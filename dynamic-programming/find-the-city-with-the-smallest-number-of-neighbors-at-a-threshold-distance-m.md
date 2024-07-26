# Find the City With the Smallest Number of Neighbors at a Threshold Distance (M)

[1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/)



There are `n` cities numbered from `0` to `n-1`. Given the array `edges` where `edges[i] = [from_i, to_i, weight_i]` represents a bidirectional and weighted edge between cities `from_i` and `to_i`, and given the integer `distanceThreshold`.

Return the city with the smallest number of cities that are reachable through some path and whose distance is **at most** `distanceThreshold`, If there are multiple such cities, return the city with the greatest number.

返回在某條路徑上**可以到達的城市數量最少**且距離最多為 distanceThreshold 的城市。如果有多個這樣的城市，返回編號最大的那個。

Notice that the distance of a path connecting cities _**i**_ and _**j**_ is equal to the sum of the edges' weights along that path.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/01/16/find\_the\_city\_01.png)

<pre><code><strong>Input: n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4
</strong><strong>Output: 3
</strong><strong>Explanation: The figure above describes the graph. 
</strong>The neighboring cities at a distanceThreshold = 4 for each city are:
City 0 -> [City 1, City 2] 
City 1 -> [City 0, City 2, City 3] 
City 2 -> [City 0, City 1, City 3] 
City 3 -> [City 1, City 2] 
Cities 0 and 3 have 2 neighboring cities at a distanceThreshold = 4, but we have to return city 3 since it has the greatest number.
</code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/01/16/find\_the\_city\_02.png)

<pre><code><strong>Input: n = 5, edges = [[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], distanceThreshold = 2
</strong><strong>Output: 0
</strong><strong>Explanation: The figure above describes the graph. 
</strong>The neighboring cities at a distanceThreshold = 2 for each city are:
City 0 -> [City 1] 
City 1 -> [City 0, City 4] 
City 2 -> [City 3, City 4] 
City 3 -> [City 2, City 4]
City 4 -> [City 1, City 2, City 3] 
The city 0 has 1 neighboring city at a distanceThreshold = 2.
</code></pre>

&#x20;

**Constraints:**

* `2 <= n <= 100`
* `1 <= edges.length <= n * (n - 1) / 2`
* `edges[i].length == 3`
* `0 <= from_i < toi < n`
* `1 <= weight_i, distanceThreshold <= 10^4`
* All pairs `(from_i, to_i)` are distinct.



```typescript
function findTheCity(n: number, edges: number[][], distanceThreshold: number): number {
    const dist = Array.from({ length: n }, () => Array(n).fill(Infinity));

    // Initialize the distance for each edge
    for (const [from, to, weight] of edges) {
        dist[from][to] = weight
        dist[to][from] = weight
    }

    // Distance to self is zero
    for (let i = 0; i < n; i++) {
        dist[i][i] = 0;
    }

    // Floyd-Warshall algorithm to find all-pairs shortest path
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][j] > dist[i][k] + dist[k][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }

    let result = -1;
    let minReachableCities = n;     // 先暫時設為 n, 因所有城市的可達城市數量都會大於或等於 0，避免第一次比較無法更新 minReachableCities 和 result

    for (let i = 0; i < n; i++) {
        let reachableCities = 0;
        for (let j = 0; j < n; j++) {
            if (dist[i][j] <= distanceThreshold) {
                reachableCities++;
            }
        }

        // 如果當前城市的可達城市數量小於最小值，或在數量相同時編號較大，更新結果
        if (reachableCities < minReachableCities || (reachableCities === minReachableCities && i > result)) {
            result = i;
            minReachableCities = reachableCities;
        }
    }

    return result;
};
```

1. 初始化距離矩陣：\
   創建一個 n x n 的距離矩陣 dist，並將所有值初始化為 Infinity，表示初始時各城市間的距離未知。然後使用 edges 初始化各條邊的距離，並將每個城市到自己的距離設為 0。
2. Floyd-Warshall 演算法：\
   計算所有城市對之間的最短距離：如果城市 i 通過城市 k 到達城市 j 的距離比直接從 i 到 j 的距離短，就更新 dist\[i]\[j]。
3. 計算每個城市的可達城市數量：\
   遍歷每個城市，計算在距離閾值 distanceThreshold 內可以到達的城市數量（包括自己，反正是 0 加不加無所謂）。在計算時，如果某城市 i 到另一城市 j 的距離小於等於 distanceThreshold，就將 reachableCities 計數器加 1。
4. 更新結果：\
   在遍歷每個城市後，如果當前城市的可達城市數量小於 minReachableCities，或在數量相同時編號較大，更新 result 和 minReachableCities。
