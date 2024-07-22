# Build a Matrix With Conditions (H)

[2392. Build a Matrix With Conditions](https://leetcode.com/problems/build-a-matrix-with-conditions/)



You are given a **positive** integer `k`. You are also given:

* a 2D integer array `rowConditions` of size `n` where `rowConditions[i] = [above_i, below_i]`, and
* a 2D integer array `colConditions` of size `m` where `colConditions[i] = [left_i, right_i]`.

The two arrays contain integers from `1` to `k`.

You have to build a `k x k` matrix that contains each of the numbers from `1` to `k` **exactly once**. The remaining cells should have the value `0`.

The matrix should also satisfy the following conditions:

* The number `above_i` should appear in a **row** that is strictly **above** the row at which the number `below_i` appears for all `i` from `0` to `n - 1`.
* The number `left_i` should appear in a **column** that is strictly **left** of the column at which the number `right_i` appears for all `i` from `0` to `m - 1`.

Return _**any** matrix that satisfies the conditions_. If no answer exists, return an empty matrix.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2022/07/06/gridosdrawio.png)

<pre><code><strong>Input: k = 3, rowConditions = [[1,2],[3,2]], colConditions = [[2,1],[3,2]]
</strong><strong>Output: [[3,0,0],[0,0,1],[0,2,0]]
</strong><strong>Explanation: The diagram above shows a valid example of a matrix that satisfies all the conditions.
</strong>The row conditions are the following:
- Number 1 is in row 1, and number 2 is in row 2, so 1 is above 2 in the matrix.
- Number 3 is in row 0, and number 2 is in row 2, so 3 is above 2 in the matrix.
The column conditions are the following:
- Number 2 is in column 1, and number 1 is in column 2, so 2 is left of 1 in the matrix.
- Number 3 is in column 0, and number 2 is in column 1, so 3 is left of 2 in the matrix.
Note that there may be multiple correct answers.
</code></pre>

**Example 2:**

<pre><code><strong>Input: k = 3, rowConditions = [[1,2],[2,3],[3,1],[2,3]], colConditions = [[2,1]]
</strong><strong>Output: []
</strong><strong>Explanation: From the first two conditions, 3 has to be below 1 but the third conditions needs 3 to be above 1 to be satisfied.
</strong>No matrix can satisfy all the conditions, so we return the empty matrix.
</code></pre>

&#x20;

**Constraints:**

* `2 <= k <= 400`
* `1 <= rowConditions.length, colConditions.length <= 10^4`
* `rowConditions[i].length == colConditions[i].length == 2`
* `1 <= above_i, below_i, left_i, right_i <= k`
* `above_i != below_i`
* `left_i != right_i`





步驟：\


1\. 建立一個函數來進行拓撲排序。

2\. 對行條件進行拓撲排序，確定每個數字在矩陣中的行位置。

3\. 對列條件進行拓撲排序，確定每個數字在矩陣中的列位置。

4\. 如果任何一步中發現循環依賴（即無法進行拓撲排序），返回空矩陣。

5\. 根據排序結果構建最終的矩陣。



```typescript
function buildMatrix(k: number, rowConditions: number[][], colConditions: number[][]): number[][] {
    // 構建一個函數來執行拓撲排序
    function topologicalSort(k: number, conditions: number[][]): number[] | null {
        const graph = new Map<number, number[]>(); // 用來存儲每個節點的鄰接表
        const inDegree = Array(k + 1).fill(0); // 用來存儲每個節點的入度
        
        // 構建圖和計算入度
        for (const [u, v] of conditions) {
            if (!graph.has(u)) graph.set(u, []);
            graph.get(u)!.push(v);
            inDegree[v]++;
        }
        
        const queue: number[] = [];
        // 將所有入度為 0 的節點加入隊列
        for (let i = 1; i <= k; i++) {
            if (inDegree[i] === 0) queue.push(i);
        }
        
        const order: number[] = [];
        // BFS 遍歷
        while (queue.length > 0) {
            const node = queue.shift()!;
            order.push(node);
            // 更新鄰接節點的入度
            if (graph.has(node)) {
                for (const neighbor of graph.get(node)!) {
                    inDegree[neighbor]--;
                    // 如果入度為 0，加入隊列
                    if (inDegree[neighbor] === 0) queue.push(neighbor);
                }
            }
        }
        
        // 如果排序後的節點數量不等於 k，說明存在循環，返回 null
        return order.length === k ? order : null;
    }

    // 執行行和列的拓撲排序
    const rowOrder = topologicalSort(k, rowConditions);
    const colOrder = topologicalSort(k, colConditions);
    
    // 如果任一拓撲排序結果為 null，返回空矩陣
    if (!rowOrder || !colOrder) return [];

    // 建立結果矩陣並初始化
    const result = Array.from({ length: k }, () => Array(k).fill(0));
    const position = new Map<number, [number, number]>();

    // 將列順序的每個數字和其索引位置對應
    for (let i = 0; i < k; i++) {
        position.set(colOrder[i], [0, i]);
    }

    // 根據行順序將數字放到矩陣中的正確位置
    for (let i = 0; i < k; i++) {
        const num = rowOrder[i];
        const [row, col] = position.get(num)!;
        result[i][col] = num;
    }
    
    // 返回結果矩陣
    return result;
}
```



### 拓撲排序（Topological Sorting）

線性排序，適用於具有方向且無環的圖（DAG，Directed Acyclic Graph）。這種排序確保每個節點都出現在它所有前驅節點（依賴節點）之後。在計算機科學中，拓撲排序常用於任務調度、依賴管理等情境。

\


拓撲排序的基本概念：

1. 圖（Graph）：
   1. 由節點（vertices）和邊（edges）組成，邊表示節點之間的關係。
   2. 在有向圖中，邊有方向，表示依賴關係（例如，任務 B 依賴於任務 A 完成）。
2. 無環（Acyclic）：
   1. 圖中不存在任何循環，這意味著不存在一組節點，其中每個節點都能夠回到自身。
3. 拓撲排序（Topological Sort）：
   1. 將圖中的所有節點排列成一個線性序列，使得每個節點都出現在所有依賴它的節點之前。

\


拓撲排序的步驟：

1. 計算入度（In-degree）：
   1. 計算每個節點的入度，即有多少條邊指向該節點。
2. 初始化隊列（Queue）：
   1. 將所有入度為 0 的節點加入隊列，這些節點沒有依賴，可以作為排序的起點。
3. 處理隊列（Processing Queue）：
   1. 從隊列中取出節點，將其加入拓撲排序結果中。
   2. 將該節點的所有鄰接節點（出邊指向的節點）的入度減 1，如果某個鄰接節點的入度減為 0，則將其加入隊列。
4. 檢查結果（Check Result）：
   1. 如果所有節點都已處理，則排序成功。
   2. 如果有節點未處理完（隊列空但仍有節點入度不為 0），則圖中存在循環，無法完成拓撲排序。

\
