# Lucky Numbers in a Matrix (E)

[1380. Lucky Numbers in a Matrix](https://leetcode.com/problems/lucky-numbers-in-a-matrix/)



Given an `m x n` matrix of **distinct** numbers, return _all **lucky numbers** in the matrix in **any** order_.

A **lucky number** is an element of the matrix such that it is the minimum element in its row and maximum in its column.

&#x20;

**Example 1:**

<pre><code><strong>Input: matrix = [[3,7,8],[9,11,13],[15,16,17]]
</strong><strong>Output: [15]
</strong><strong>Explanation: 15 is the only lucky number since it is the minimum in its row and the maximum in its column.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: matrix = [[1,10,4,2],[9,3,8,7],[15,16,17,12]]
</strong><strong>Output: [12]
</strong><strong>Explanation: 12 is the only lucky number since it is the minimum in its row and the maximum in its column.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: matrix = [[7,8],[1,2]]
</strong><strong>Output: [7]
</strong><strong>Explanation: 7 is the only lucky number since it is the minimum in its row and the maximum in its column.
</strong></code></pre>

&#x20;

**Constraints:**

* `m == mat.length`
* `n == mat[i].length`
* `1 <= n, m <= 50`
* `1 <= matrix[i][j] <= 105`.
* All elements in the matrix are distinct.



### 找出最小值與最大值來比對

時間複雜度： O(mn)  m 是矩陣的行數，n 是列數。

需要遍歷整個矩陣兩次：一次是為了找出行的最小值和列的最大值，另一次是為了檢查每個元素。

空間複雜度 ： O(m + n)：用於存儲 `rowMin` 和 `colMax` 數組

```typescript
function luckyNumbers(matrix: number[][]): number[] {
    const ans: number[] = [];
    const m = matrix.length;
    const n = matrix[0].length;

    // 找出每行的最小值
    const rowMin = matrix.map(row => Math.min(...row));
    
    // 找出每列的最大值
    const colMax = Array(n).fill(0).map((_, j) => Math.max(...matrix.map(row => row[j])));

    // 檢查每個元素
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === rowMin[i] && matrix[i][j] === colMax[j]) {
                ans.push(matrix[i][j]);
            }
        }
    }

    return ans;
}

```





### 推薦）在上面的基礎下，把最後的遍歷改成檢查 rowMin 、 colMax的交集

因為題目有說每個數字都不同，因此才可以這樣玩

```typescript
function luckyNumbers(matrix: number[][]): number[] {
    const rowMin = new Set(matrix.map(row => Math.min(...row)));
    const colMax = new Set(matrix[0].map((_, j) => Math.max(...matrix.map(row => row[j]))));

    return [...rowMin].filter(num => colMax.has(num));
}
```

<figure><img src="../.gitbook/assets/截圖 2024-07-19 晚上11.07.03.png" alt=""><figcaption></figcaption></figure>



### FlatMap +IndexOf

看到別人寫的蠻特別的寫法，記錄一下

```typescript
function luckyNumbers (matrix: number[][]): number[] {
    return matrix.flatMap((row,index) => {
        const min = Math.min(...row);
        const minIndex = row.indexOf(min);

        for (const row2 of matrix) {
            if(row2 === row) continue;
            // 檢查列的最小是否為行的最大
            if(min < row2[minIndex]){
                return [];
            }
        }

        return [min];
    })
}
```

* 使用 `flatMap` 方法對矩陣的每一行進行操作。
* `flatMap` 會將結果展平，移除空數組。
