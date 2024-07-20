# Find Valid Matrix Given Row and Column Sums (M)

[1605. Find Valid Matrix Given Row and Column Sums](https://leetcode.com/problems/find-valid-matrix-given-row-and-column-sums/)



You are given two arrays `rowSum` and `colSum` of non-negative integers where `rowSum[i]` is the sum of the elements in the `i_th` row and `colSum[j]` is the sum of the elements of the `j_th` column of a 2D matrix. In other words, you do not know the elements of the matrix, but you do know the sums of each row and column.

Find any matrix of **non-negative** integers of size `rowSum.length x colSum.length` that satisfies the `rowSum` and `colSum` requirements.

Return _a 2D array representing **any** matrix that fulfills the requirements_. It's guaranteed that **at least one** matrix that fulfills the requirements exists.

&#x20;

**Example 1:**

<pre><code><strong>Input: rowSum = [3,8], colSum = [4,7]
</strong><strong>Output: [[3,0],
</strong>         [1,7]]
<strong>Explanation: 
</strong>0th row: 3 + 0 = 3 == rowSum[0]
1st row: 1 + 7 = 8 == rowSum[1]
0th column: 3 + 1 = 4 == colSum[0]
1st column: 0 + 7 = 7 == colSum[1]
The row and column sums match, and all matrix elements are non-negative.
Another possible matrix is: [[1,2],
                             [3,5]]
</code></pre>

**Example 2:**

<pre><code><strong>Input: rowSum = [5,7,10], colSum = [8,6,8]
</strong><strong>Output: [[0,5,0],
</strong>         [6,1,0],
         [2,0,8]]
</code></pre>

&#x20;

**Constraints:**

* `1 <= rowSum.length, colSum.length <= 500`
* `0 <= rowSum[i], colSum[i] <= 10^8`
* `sum(rowSum) == sum(colSum)`



### Greedy

能扣就一次扣完

時間複雜度為 O(n \* m)，其中 n 是行數，m 是列數

```typescript
function restoreMatrix(rowSum: number[], colSum: number[]): number[][] {
    const numRows = rowSum.length; // 獲取行數
    const numCols = colSum.length; // 獲取列數
    const result = Array.from({ length: numRows }, () => Array(numCols).fill(0)); // 初始化結果矩陣，所有元素設為0
    
    // 遍歷每一行和每一列
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            // 找到行和列總和中的最小值
            const minValue = Math.min(rowSum[i], colSum[j]);
            result[i][j] = minValue; // 將最小值賦給結果矩陣中的對應元素
            rowSum[i] -= minValue; // 從行總和中減去該值
            colSum[j] -= minValue; // 從列總和中減去該值
        }
    }
    
    return result;
}

```
