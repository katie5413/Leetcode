# Magic Squares In Grid (M)

[840. Magic Squares In Grid](https://leetcode.com/problems/magic-squares-in-grid/)



A `3 x 3` **magic square** is a `3 x 3` grid filled with distinct numbers **from** 1 **to** 9 such that each row, column, and both diagonals all have the same sum. **直排、橫排、對角線的加總皆相同**

Given a `row x col` `grid` of integers, how many `3 x 3` contiguous magic square subgrids are there?

Note: while a magic square can only contain numbers from 1 to 9, `grid` may contain numbers up to 15.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/09/11/magic\_main.jpg)

<pre><code><strong>Input: grid = [[4,3,8,4],[9,5,1,9],[2,7,6,2]]
</strong><strong>Output: 1
</strong><strong>Explanation: 
</strong>The following subgrid is a 3 x 3 magic square:

while this one is not:

In total, there is only one magic square inside the given grid.
</code></pre>

**Example 2:**

<pre><code><strong>Input: grid = [[8]]
</strong><strong>Output: 0
</strong></code></pre>

&#x20;

**Constraints:**

* `row == grid.length`
* `col == grid[i].length`
* `1 <= row, col <= 10`
* `0 <= grid[i][j] <= 15`



```typescript
function numMagicSquaresInside(grid: number[][]): number {
    // 檢查一個 3x3 子矩陣是否為魔術方陣
    function isMagicSquare(matrix: number[][]): boolean {
        // 確保矩陣包含的是 1 到 9 的數字
        const uniqueNumbers = new Set();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const num = matrix[i][j];
                if (num < 1 || num > 9) return false;
                uniqueNumbers.add(num);
            }
        }
        if (uniqueNumbers.size !== 9) return false;
        
        // 計算每行、每列和對角線的和
        const sumRow = matrix[0].reduce((a, b) => a + b);
        const sumCol = matrix.map(row => row[0]).reduce((a, b) => a + b);
        const sumDiagonal1 = matrix[0][0] + matrix[1][1] + matrix[2][2];
        const sumDiagonal2 = matrix[0][2] + matrix[1][1] + matrix[2][0];
        
        if (sumRow !== sumCol || sumRow !== sumDiagonal1 || sumRow !== sumDiagonal2) {
            return false;
        }
        
        // 檢查每行、每列的和
        for (let i = 0; i < 3; i++) {
            const rowSum = matrix[i].reduce((a, b) => a + b);
            const colSum = matrix.map(row => row[i]).reduce((a, b) => a + b);
            if (rowSum !== sumRow || colSum !== sumRow) return false;
        }
        
        return true;
    }
    
    let count = 0;
    const rows = grid.length;
    const cols = grid[0].length;
    
    // 遍歷所有 3x3 的子矩陣
    for (let i = 0; i <= rows - 3; i++) {
        for (let j = 0; j <= cols - 3; j++) {
            const subMatrix = [
                [grid[i][j], grid[i][j+1], grid[i][j+2]],
                [grid[i+1][j], grid[i+1][j+1], grid[i+1][j+2]],
                [grid[i+2][j], grid[i+2][j+1], grid[i+2][j+2]],
            ];
            if (isMagicSquare(subMatrix)) {
                count++;
            }
        }
    }
    
    return count;
}
```
