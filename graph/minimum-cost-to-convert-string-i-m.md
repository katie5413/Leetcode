# Minimum Cost to Convert String I (M)

[2976. Minimum Cost to Convert String I](https://leetcode.com/problems/minimum-cost-to-convert-string-i/)



You are given two **0-indexed** strings `source` and `target`, both of length `n` and consisting of **lowercase** English letters. You are also given two **0-indexed** character arrays `original` and `changed`, and an integer array `cost`, where `cost[i]` represents the cost of changing the character `original[i]` to the character `changed[i]`.

You start with the string `source`. In one operation, you can pick a character `x` from the string and change it to the character `y` at a cost of `z` **if** there exists **any** index `j` such that `cost[j] == z`, `original[j] == x`, and `changed[j] == y`.

Return _the **minimum** cost to convert the string_ `source` _to the string_ `target` _using **any** number of operations. If it is impossible to convert_ `source` _to_ `target`, _return_ `-1`.

**Note** that there may exist indices `i`, `j` such that `original[j] == original[i]` and `changed[j] == changed[i]`.

&#x20;

**Example 1:**

<pre><code><strong>Input: source = "abcd", target = "acbe", original = ["a","b","c","c","e","d"], changed = ["b","c","b","e","b","e"], cost = [2,5,5,1,2,20]
</strong><strong>Output: 28
</strong><strong>Explanation: To convert the string "abcd" to string "acbe":
</strong>- Change value at index 1 from 'b' to 'c' at a cost of 5.
- Change value at index 2 from 'c' to 'e' at a cost of 1.
- Change value at index 2 from 'e' to 'b' at a cost of 2.
- Change value at index 3 from 'd' to 'e' at a cost of 20.
The total cost incurred is 5 + 1 + 2 + 20 = 28.
It can be shown that this is the minimum possible cost.
</code></pre>

**Example 2:**

<pre><code><strong>Input: source = "aaaa", target = "bbbb", original = ["a","c"], changed = ["c","b"], cost = [1,2]
</strong><strong>Output: 12
</strong><strong>Explanation: To change the character 'a' to 'b' change the character 'a' to 'c' at a cost of 1, followed by changing the character 'c' to 'b' at a cost of 2, for a total cost of 1 + 2 = 3. To change all occurrences of 'a' to 'b', a total cost of 3 * 4 = 12 is incurred.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: source = "abcd", target = "abce", original = ["a"], changed = ["e"], cost = [10000]
</strong><strong>Output: -1
</strong><strong>Explanation: It is impossible to convert source to target because the value at index 3 cannot be changed from 'd' to 'e'.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= source.length == target.length <= 10^5`
* `source`, `target` consist of lowercase English letters.
* `1 <= cost.length == original.length == changed.length <= 2000`
* `original[i]`, `changed[i]` are lowercase English letters.
* `1 <= cost[i] <= 10^6`
* `original[i] != changed[i]`



```typescript
function minimumCost(source: string, target: string, original: string[], changed: string[], cost: number[]): number {
    // Step 1: Create a graph to represent character transformations
    const INF = 1e9;
    const graph: number[][] = Array(26).fill(0).map(() => Array(26).fill(INF));
    
    // Initialize the graph with direct transformations
    for (let i = 0; i < original.length; i++) {
        const from = original[i].charCodeAt(0) - 97;
        const to = changed[i].charCodeAt(0) - 97;
        graph[from][to] = Math.min(graph[from][to], cost[i]);
    }
    
    // Set the cost of not changing a character to 0
    for (let i = 0; i < 26; i++) {
        graph[i][i] = 0;
    }
    
    // Step 2: Apply Floyd-Warshall algorithm
    for (let k = 0; k < 26; k++) {
        for (let i = 0; i < 26; i++) {
            for (let j = 0; j < 26; j++) {
                graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
            }
        }
    }
    
    // Step 3: Calculate the minimum cost
    let totalCost = 0;
    for (let i = 0; i < source.length; i++) {
        const from = source.charCodeAt(i) - 97;
        const to = target.charCodeAt(i) - 97;
        if (graph[from][to] === INF) {
            return -1; // Impossible to transform
        }
        totalCost += graph[from][to];
    }
    
    return totalCost;
}
```

<figure><img src="../.gitbook/assets/截圖 2024-07-28 晚上10.26.52.png" alt=""><figcaption></figcaption></figure>

看到別人分享的寫法

```typescript
function minimumCost(source: string, target: string, original: string[], changed: string[], cost: number[]): number {
    const graph = new Graph(original, changed, cost);
    const ans = source.split('').reduce((acc, ch, ind) => acc + graph.getCost(ch, target[ind]), 0);
    return ans === Infinity ? -1 : ans;
};
class Graph {
    costs: number[][]
    constructor(original: string[], changed: string[], cost: number[]) {
        this.costs = Array.from(Array(26), _ => Array(26).fill(Infinity));

        for (let i = 0; i < 26; i++) {
            this.costs[i][i] = 0;
        }

        for (let i = 0; i < original.length; i++) {
            const from = original[i].charCodeAt(0) - 'a'.charCodeAt(0);
            const to = changed[i].charCodeAt(0) - 'a'.charCodeAt(0);
            this.costs[from][to] = Math.min(cost[i], this.costs[from][to]);
        }
        this.floyd_warshall();
    }
    floyd_warshall() {
        const costs = this.costs;
        for (let k = 0; k < 26; k++) {
            for (let i = 0; i < 26; i++) {
                for (let j = 0; j < 26; j++) {
                    costs[i][j] = Math.min(costs[i][k] + costs[k][j], costs[i][j]);
                }
            }
        }
    }
    getCost(src: string, target: string): number {
        const from = src.charCodeAt(0) - 'a'.charCodeAt(0);
        const to = target.charCodeAt(0) - 'a'.charCodeAt(0);
        return this.costs[from][to];
    }
}
```
