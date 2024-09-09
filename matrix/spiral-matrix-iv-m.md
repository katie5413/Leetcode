# Spiral Matrix IV (M)

[2326. Spiral Matrix IV](https://leetcode.com/problems/spiral-matrix-iv/)



You are given two integers `m` and `n`, which represent the dimensions of a matrix.

You are also given the `head` of a linked list of integers.

Generate an `m x n` matrix that contains the integers in the linked list presented in **spiral** order **(clockwise)**, starting from the **top-left** of the matrix. If there are remaining empty spaces, fill them with `-1`.

Return _the generated matrix_.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2022/05/09/ex1new.jpg)

<pre><code><strong>Input: m = 3, n = 5, head = [3,0,2,6,8,1,7,9,4,2,5,5,0]
</strong><strong>Output: [[3,0,2,6,8],[5,0,-1,-1,1],[5,2,4,9,7]]
</strong><strong>Explanation: The diagram above shows how the values are printed in the matrix.
</strong>Note that the remaining spaces in the matrix are filled with -1.
</code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2022/05/11/ex2.jpg)

<pre><code><strong>Input: m = 1, n = 4, head = [0,1,2]
</strong><strong>Output: [[0,1,2,-1]]
</strong><strong>Explanation: The diagram above shows how the values are printed from left to right in the matrix.
</strong>The last space in the matrix is set to -1.
</code></pre>

&#x20;

**Constraints:**

* `1 <= m, n <= 10^5`
* `1 <= m * n <= 10^5`
* The number of nodes in the list is in the range `[1, m * n]`.
* `0 <= Node.val <= 1000`



```typescript
/**
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val === undefined ? 0 : val)
 *         this.next = (next === undefined ? null : next)
 *     }
 * }
 */

function spiralMatrix(m: number, n: number, head: ListNode | null): number[][] {
  // 定義矩陣的上下左右邊界
  let topRow = 0;
  let leftCol = 0;
  let bottomRow = m - 1;
  let rightCol = n - 1;

  // 初始化結果矩陣，預設所有元素為 -1
  const res = Array.from({ length: m }, () => Array(n).fill(-1));

  // 計算矩陣總共的元素數量
  const count = m * n;

  // 當鏈結串列還有節點時，繼續填充矩陣
  while (head) {
    // 從左到右填充上方的行
    for (let c = leftCol; c <= rightCol && head; c++) {
      res[topRow][c] = head.val; // 填入鏈結節點的值
      head = head.next; // 移動到下一個節點
    }
    topRow++; // 上方邊界向內縮

    // 從上到下填充右方的列
    for (let r = topRow; r <= bottomRow && head; r++) {
      res[r][rightCol] = head.val;
      head = head.next;
    }
    rightCol--; // 右方邊界向內縮

    // 從右到左填充下方的行
    for (let c = rightCol; c >= leftCol && head; c--) {
      res[bottomRow][c] = head.val;
      head = head.next;
    }
    bottomRow--; // 下方邊界向內縮

    // 從下到上填充左方的列
    for (let r = bottomRow; r >= topRow && head; r--) {
      res[r][leftCol] = head.val;
      head = head.next;
    }
    leftCol++; // 左方邊界向內縮
  }

  // 返回結果矩陣
  return res;
};
```
