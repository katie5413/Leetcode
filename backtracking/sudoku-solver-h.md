# Sudoku Solver (H)

[37. Sudoku Solver](https://leetcode.com/problems/sudoku-solver/)



Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy **all of the following rules**:

1. Each of the digits `1-9` must occur exactly once in each row.
2. Each of the digits `1-9` must occur exactly once in each column.
3. Each of the digits `1-9` must occur exactly once in each of the 9 `3x3` sub-boxes of the grid.

The `'.'` character indicates empty cells.

&#x20;

**Example 1:**

![](https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png)

<pre><code><strong>Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
</strong><strong>Output: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
</strong><strong>Explanation: The input board is shown above and the only valid solution is shown below:
</strong>

</code></pre>

&#x20;

**Constraints:**

* `board.length == 9`
* `board[i].length == 9`
* `board[i][j]` is a digit or `'.'`.
* It is **guaranteed** that the input board has only one solution.



### Backtracking

看到別人分享的好漂亮的寫法



```typescript

/**
 Do not return anything, modify board in-place instead.
 */

function solveSudoku(board: string[][]): void {
    solve(board);
}

// solve 函數負責用遞迴方式解決數獨
function solve(board: string[][]): boolean {
    // 遍歷數獨棋盤的每一格
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            // 如果找到空白的格子（用 '.' 表示）
            if (board[i][j] === '.') {
                // 嘗試填入數字 1 到 9
                for (let num = 1; num <= 9; num++) {
                    // 如果數字 num 在該位置是有效的
                    if (isValid(board, i, j, num.toString())) {
                        // 將該數字填入格子
                        board[i][j] = num.toString();
                        // 繼續遞迴解決棋盤
                        if (solve(board)) {
                            return true; // 若成功解決，返回 true
                        }
                        // 如果失敗，回溯（將格子重新設為空白）
                        board[i][j] = '.';
                    }
                }
                // 若無法填入任何數字，返回 false
                return false;
            }
        }
    }
    // 若棋盤已經全部填滿且有效，返回 true
    return true;
}

// isValid 函數負責檢查在指定位置填入指定數字是否有效
function isValid(board: string[][], row: number, col: number, num: string): boolean {
    for (let i = 0; i < 9; i++) {
        // 檢查該列是否有重複的數字
        if (board[i][col] === num) {
            return false;
        }
        // 檢查該行是否有重複的數字
        if (board[row][i] === num) {
            return false;
        }
        // 檢查該 3x3 方格是否有重複的數字
        if (board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] === num) {
            return false;
        }
    }
    // 若無重複數字，返回 true
    return true;
}
```



<figure><img src="../.gitbook/assets/截圖 2024-08-06 晚上7.02.05.png" alt=""><figcaption></figcaption></figure>

