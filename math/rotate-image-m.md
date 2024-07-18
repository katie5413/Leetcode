# Rotate Image (M)

[48. Rotate Image](https://leetcode.com/problems/rotate-image/)



You are given an `n x n` 2D `matrix` representing an image, rotate the image by **90** degrees (clockwise).

You have to rotate the image [**in-place**](https://en.wikipedia.org/wiki/In-place\_algorithm), which means you have to modify the input 2D matrix directly. **DO NOT** allocate another 2D matrix and do the rotation.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/08/28/mat1.jpg)

<pre><code><strong>Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
</strong><strong>Output: [[7,4,1],[8,5,2],[9,6,3]]
</strong></code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/08/28/mat2.jpg)

<pre><code><strong>Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
</strong><strong>Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
</strong></code></pre>

&#x20;

**Constraints:**

* `n == matrix.length == matrix[i].length`
* `1 <= n <= 20`
* `-1000 <= matrix[i][j] <= 1000`



### 深拷貝、數學

```typescript
/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
    const tmp = matrix.map(row => row.slice());
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            matrix[i][j] = tmp[matrix.length - 1 - j][i]
        }
    }

};
```

#### 複製陣列與物件的方式

<table data-header-hidden><thead><tr><th width="368"></th><th width="83"></th><th width="78"></th><th width="68"></th><th width="75"></th><th></th></tr></thead><tbody><tr><td>Method</td><td>Array<br>一維</td><td>Array<br>多維</td><td>obj<br>單層</td><td>obj<br>多層</td><td>限制</td></tr><tr><td><code>Array.slice(0)</code><br><code>Array.concat()</code></td><td>√</td><td></td><td></td><td></td><td>限值不含 object ... 等</td></tr><tr><td><code>Array.from(ary)</code></td><td>√</td><td>√</td><td></td><td></td><td></td></tr><tr><td><code>[...ary]</code><br><code>{...obj}</code></td><td>√</td><td></td><td>√</td><td></td><td></td></tr><tr><td><code>Object.assign([],obj)</code><br><code>Object.assign({},obj)</code></td><td>√</td><td>√</td><td>√</td><td></td><td></td></tr><tr><td><code>JSON.parse(JSON.stringify(ary))</code><br><code>JSON.parse(JSON.stringify(obj))</code></td><td>√</td><td>√</td><td>√</td><td>√</td><td>限值不含 function..等</td></tr></tbody></table>





### 轉置矩陣＋反轉每一行

```typescript
function rotate(matrix: number[][]): void {
    const n = matrix.length;
    
    // 轉置矩陣
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    
    // 反轉每一行
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
}
```

**轉置矩陣**

初始

```
1 2 3
4 5 6
7 8 9
```

matrix\[0]\[1] 和 matrix\[1]\[0] 交換

<pre><code> 1 [4] 3
<strong>[2] 5  6
</strong> 7  8  9
</code></pre>

matrix\[0]\[2] 和 matrix\[2]\[0] 交換

<pre><code> 1  4 [7]
<strong> 2  5  6
</strong>[3] 8  9
</code></pre>

matrix\[1]\[2] 和 matrix\[2]\[1] 交換

```
1  4  7
2  5 [8]
3 [6] 9
```

**反轉每一行**

```
[7 4 1]
 2 5 8
 3 6 9
```

```
 7 4 1
[8 5 2]
 3 6 9
```

<pre><code> 7 4 1
 8 5 2
<strong>[9 6 3]
</strong></code></pre>
