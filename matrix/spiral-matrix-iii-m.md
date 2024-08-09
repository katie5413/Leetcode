# Spiral Matrix III (M)

[885. Spiral Matrix III](https://leetcode.com/problems/spiral-matrix-iii/)



You start at the cell `(rStart, cStart)` of an `rows x cols` grid facing east. The northwest corner is at the first row and column in the grid, and the southeast corner is at the last row and column.

You will walk in a clockwise spiral shape to visit every position in this grid. Whenever you move outside the grid's boundary, we continue our walk outside the grid (but may return to the grid boundary later.). Eventually, we reach all `rows * cols` spaces of the grid.

Return _an array of coordinates representing the positions of the grid in the order you visited them_.

&#x20;

**Example 1:**

![](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/08/24/example\_1.png)

<pre><code><strong>Input: rows = 1, cols = 4, rStart = 0, cStart = 0
</strong><strong>Output: [[0,0],[0,1],[0,2],[0,3]]
</strong></code></pre>

**Example 2:**

![](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/08/24/example\_2.png)

<pre><code><strong>Input: rows = 5, cols = 6, rStart = 1, cStart = 4
</strong><strong>Output: [[1,4],[1,5],[2,5],[2,4],[2,3],[1,3],[0,3],[0,4],[0,5],[3,5],[3,4],[3,3],[3,2],[2,2],[1,2],[0,2],[4,5],[4,4],[4,3],[4,2],[4,1],[3,1],[2,1],[1,1],[0,1],[4,0],[3,0],[2,0],[1,0],[0,0]]
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= rows, cols <= 100`
* `0 <= rStart < rows`
* `0 <= cStart < cols`



```typescript
function spiralMatrixIII(rows: number, cols: number, rStart: number, cStart: number): number[][] {
    const ans: number[][] = [];
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // 右、下、左、上
    let directionIndex = 0; // 用來控制方向
    let steps = 1; // 目前的步數
    let x = rStart;
    let y = cStart;

    ans.push([x, y]); // 把起點加到結果中

    while (ans.length < rows * cols) {
        for (let i = 0; i < steps; i++) {
            x += directions[directionIndex][0];
            y += directions[directionIndex][1];
            if (x >= 0 && x < rows && y >= 0 && y < cols) {
                ans.push([x, y]);
            }
        }
        directionIndex = (directionIndex + 1) % 4; // 改變方向
        if (directionIndex % 2 === 0) {
            steps++; // 每兩次方向改變後，增加步數
        }
    }

    return ans;
}
```
