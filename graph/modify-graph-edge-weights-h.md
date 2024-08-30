# Modify Graph Edge Weights (H)

[2699. Modify Graph Edge Weights](https://leetcode.com/problems/modify-graph-edge-weights/)



You are given an **undirected weighted** **connected** graph containing `n` nodes labeled from `0` to `n - 1`, and an integer array `edges` where `edges[i] = [ai, bi, wi]` indicates that there is an edge between nodes `ai` and `bi` with weight `wi`.

Some edges have a weight of `-1` (`wi = -1`), while others have a **positive** weight (`wi > 0`).

Your task is to modify **all edges** with a weight of `-1` by assigning them **positive integer values** in the range `[1, 2 * 109]` so that the **shortest distance** between the nodes `source` and `destination` becomes equal to an integer `target`. If there are **multiple** **modifications** that make the shortest distance between `source` and `destination` equal to `target`, any of them will be considered correct.

Return _an array containing all edges (even unmodified ones) in any order if it is possible to make the shortest distance from_ `source` _to_ `destination` _equal to_ `target`_, or an **empty array** if it's impossible._

**Note:** You are not allowed to modify the weights of edges with initial positive weights.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2023/04/18/graph.png)

<pre><code><strong>Input: n = 5, edges = [[4,1,-1],[2,0,-1],[0,3,-1],[4,3,-1]], source = 0, destination = 1, target = 5
</strong><strong>Output: [[4,1,1],[2,0,1],[0,3,3],[4,3,1]]
</strong><strong>Explanation: The graph above shows a possible modification to the edges, making the distance from 0 to 1 equal to 5.
</strong></code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2023/04/18/graph-2.png)

<pre><code><strong>Input: n = 3, edges = [[0,1,-1],[0,2,5]], source = 0, destination = 2, target = 6
</strong><strong>Output: []
</strong><strong>Explanation: The graph above contains the initial edges. It is not possible to make the distance from 0 to 2 equal to 6 by modifying the edge with weight -1. So, an empty array is returned.
</strong></code></pre>

**Example 3:**

![](https://assets.leetcode.com/uploads/2023/04/19/graph-3.png)

<pre><code><strong>Input: n = 4, edges = [[1,0,4],[1,2,3],[2,3,5],[0,3,-1]], source = 0, destination = 2, target = 6
</strong><strong>Output: [[1,0,4],[1,2,3],[2,3,5],[0,3,1]]
</strong><strong>Explanation: The graph above shows a modified graph having the shortest distance from 0 to 2 as 6.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= n <= 100`
* `1 <= edges.length <= n * (n - 1) / 2`
* `edges[i].length == 3`
* `0 <= ai, bi < n`
* `wi = -1` or `1 <= wi <= 10^7`
* `ai != bi`
* `0 <= source, destination < n`
* `source != destination`
* `1 <= target <= 10^9`
* The graph is connected, and there are no self-loops or repeated edges





```typescript
function modifiedGraphEdges(n: number, edges: number[][], source: number, destination: number, target: number): number[][] {
    class PriorityQueue<T> {
        private elements: { element: T; priority: number }[] = [];

        enqueue(element: T, priority: number): void {
            this.elements.push({ element, priority });
            this.elements.sort((a, b) => a.priority - b.priority);
        }

        dequeue(): { element: T; priority: number } | undefined {
            return this.elements.shift();
        }

        isEmpty(): boolean {
            return this.elements.length === 0;
        }
    }

    const adjacencyList: [number, number][][] = Array.from({ length: n }, () => []);
    for (let i = 0; i < edges.length; i++) {
        const [nodeA, nodeB] = edges[i];
        adjacencyList[nodeA].push([nodeB, i]);
        adjacencyList[nodeB].push([nodeA, i]);
    }

    const distances: number[][] = Array.from({ length: n }, () => [Infinity, Infinity]);
    distances[source] = [0, 0];

    runDijkstra(adjacencyList, edges, distances, source, 0, 0);
    const difference = target - distances[destination][0];
    if (difference < 0) return [];
    runDijkstra(adjacencyList, edges, distances, source, difference, 1);
    if (distances[destination][1] < target) return [];

    for (const edge of edges) {
        if (edge[2] === -1) edge[2] = 1;
    }
    return edges;

    function runDijkstra(adjacencyList: [number, number][][], edges: number[][], distances: number[][], source: number, difference: number, run: number): void {
        const pq = new PriorityQueue<number>();
        pq.enqueue(source, 0);
        distances[source][run] = 0;

        while (!pq.isEmpty()) {
            const current = pq.dequeue();
            if (!current) break;
            const currentNode = current.element;
            const currentDistance = current.priority;

            if (currentDistance > distances[currentNode][run]) continue;

            for (const [nextNode, edgeIndex] of adjacencyList[currentNode]) {
                let weight = edges[edgeIndex][2];
                if (weight === -1) weight = 1; // Initially consider -1 as 1

                if (run === 1 && edges[edgeIndex][2] === -1) {
                    const newWeight = difference + distances[nextNode][0] - distances[currentNode][1];
                    if (newWeight > weight) {
                        edges[edgeIndex][2] = weight = newWeight;
                    }
                }

                if (distances[nextNode][run] > distances[currentNode][run] + weight) {
                    distances[nextNode][run] = distances[currentNode][run] + weight;
                    pq.enqueue(nextNode, distances[nextNode][run]);
                }
            }
        }
    }
}
```
