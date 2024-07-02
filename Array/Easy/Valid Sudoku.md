# Valid Sudoku

Determine if a `9 x 9` Sudoku board is valid. Only the filled cells need to be validated **according to the following rules**:

1. Each row must contain the digits `1-9` without repetition.
2. Each column must contain the digits `1-9` without repetition.
3. Each of the nine `3 x 3` sub-boxes of the grid must contain the digits `1-9` without repetition.

**Note:**

只需考慮已填的部分是否合規則，不考慮是否可解

- A Sudoku board (partially filled) could be valid but is not necessarily solvable.
- Only the filled cells need to be validated according to the mentioned rules.

**Example 1:**

![https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png](https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png)

```
Input: board =
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true

```

**Example 2:**

```
Input: board =
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the5 in the top left corner being modified to8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.

```

**Constraints:**

- `board.length == 9`
- `board[i].length == 9`
- `board[i][j]` is a digit `1-9` or `'.'`.

```jsx
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
  var map = {};
  var tmp = 0;
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      tmp = board[i][j];
      if (tmp === '.') continue;
      if (map['i' + i + tmp] || map['j' + j + tmp] || map['b' + Math.floor(i / 3) + Math.floor(j / 3) + tmp]) return false;
      map['i' + i + tmp] = 1;
      map['j' + j + tmp] = 1;
      map['b' + Math.floor(i / 3) + Math.floor(j / 3) + tmp] = 1;
    }
  }
  return true;
};
```

```jsx
/**
 * @param {string[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    let set = new Set();
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === '.') {
                continue;
            }
            let v = board[i][j];
            let ii = `i${i}${v}`;
            if (set.has(ii)) {
                return false;
            }
            set.add(ii);

            let jj = `j${j}${v}`;
            if (set.has(jj)) {
                return false;
            }
            set.add(jj);

            let b = Math.floor(i/3)*3 + Math.floor(j/3)
            let bb = `b${b}${v}`;
            if (set.has(bb)) {
                return false;
            }
            set.add(bb);
        }
    }
    return true;
};
```