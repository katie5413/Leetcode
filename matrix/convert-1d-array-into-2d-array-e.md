# Convert 1D Array Into 2D Array (E)

[2022. Convert 1D Array Into 2D Array](https://leetcode.com/problems/convert-1d-array-into-2d-array/)



You are given a **0-indexed** 1-dimensional (1D) integer array `original`, and two integers, `m` and `n`. You are tasked with creating a 2-dimensional (2D) array with `m` rows and `n` columns using **all** the elements from `original`.

The elements from indices `0` to `n - 1` (**inclusive**) of `original` should form the first row of the constructed 2D array, the elements from indices `n` to `2 * n - 1` (**inclusive**) should form the second row of the constructed 2D array, and so on.

Return _an_ `m x n` _2D array constructed according to the above procedure, or an empty 2D array if it is impossible_.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/08/26/image-20210826114243-1.png)

<pre><code><strong>Input: original = [1,2,3,4], m = 2, n = 2
</strong><strong>Output: [[1,2],[3,4]]
</strong><strong>Explanation: The constructed 2D array should contain 2 rows and 2 columns.
</strong>The first group of n=2 elements in original, [1,2], becomes the first row in the constructed 2D array.
The second group of n=2 elements in original, [3,4], becomes the second row in the constructed 2D array.
</code></pre>

**Example 2:**

<pre><code><strong>Input: original = [1,2,3], m = 1, n = 3
</strong><strong>Output: [[1,2,3]]
</strong><strong>Explanation: The constructed 2D array should contain 1 row and 3 columns.
</strong>Put all three elements in original into the first row of the constructed 2D array.
</code></pre>

**Example 3:**

<pre><code><strong>Input: original = [1,2], m = 1, n = 1
</strong><strong>Output: []
</strong><strong>Explanation: There are 2 elements in original.
</strong>It is impossible to fit 2 elements in a 1x1 2D array, so return an empty 2D array.
</code></pre>

&#x20;

**Constraints:**

* `1 <= original.length <= 5 * 10^4`
* `1 <= original[i] <= 10^5`
* `1 <= m, n <= 4 * 10^4`



### Math + Slice

```typescript
function construct2DArray(original: number[], m: number, n: number): number[][] {
    // 檢查 m x n 是否等於原始陣列的長度，若不相等則無法組成2D陣列，直接返回空陣列
    if (m * n !== original.length) return [];

    // 建立一個空的結果陣列
    const res = [];

    // 使用 row 變數來控制每一列的切割
    for (let row = 0; row < m; row++) {
        // 將從第 row * n 個開始到 (row + 1) * n 的元素切割出來，並推入結果陣列中
        res.push(original.slice(row * n, (row + 1) * n));
    }

    // 返回組成的 2D 陣列
    return res;
};
```



### 用每次跳 n 個 的方式

```typescript
function construct2DArray(original: number[], m: number, n: number): number[][] {
    // 檢查 m x n 是否等於原始陣列的長度，若不相等則無法組成2D陣列，直接返回空陣列
    if (m * n !== original.length) return [];

    // 建立一個空的結果陣列
    const res = [];

    // 以每次 n 個元素的步長從原始陣列中切割子陣列並推入結果陣列
    for (let i = 0; i < original.length; i += n) {
        res.push(original.slice(i, (i + n))); // 將從第 i 個開始到 i+n 的元素切割出來，並推入結果陣列中
    }

    // 返回組成的 2D 陣列
    return res;
};
```

