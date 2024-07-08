# Find the Winner of the Circular Game (M)

There are `n` friends that are playing a game. The friends are sitting in a circle and are numbered from `1` to `n` in **clockwise order**. More formally, moving clockwise from the `ith` friend brings you to the `(i+1)th` friend for `1 <= i < n`, and moving clockwise from the `nth` friend brings you to the `1st` friend.

The rules of the game are as follows:

1. **Start** at the `1st` friend.
2. Count the next `k` friends in the clockwise direction **including** the friend you started at. The counting wraps around the circle and may count some friends more than once.
3. The last friend you counted leaves the circle and loses the game.
4. If there is still more than one friend in the circle, go back to step `2` **starting** from the friend **immediately clockwise** of the friend who just lost and repeat.
5. Else, the last friend in the circle wins the game.

Given the number of friends, `n`, and an integer `k`, return _the winner of the game_.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/03/25/ic234-q2-ex11.png)

<pre><code><strong>Input: n = 5, k = 2
</strong><strong>Output: 3
</strong><strong>Explanation: Here are the steps of the game:
</strong>1) Start at friend 1.
2) Count 2 friends clockwise, which are friends 1 and 2.
3) Friend 2 leaves the circle. Next start is friend 3.
4) Count 2 friends clockwise, which are friends 3 and 4.
5) Friend 4 leaves the circle. Next start is friend 5.
6) Count 2 friends clockwise, which are friends 5 and 1.
7) Friend 1 leaves the circle. Next start is friend 3.
8) Count 2 friends clockwise, which are friends 3 and 5.
9) Friend 5 leaves the circle. Only friend 3 is left, so they are the winner.
</code></pre>

**Example 2:**

<pre><code><strong>Input: n = 6, k = 5
</strong><strong>Output: 1
</strong><strong>Explanation: The friends leave in this order: 5, 4, 6, 2, 3. The winner is friend 1.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= k <= n <= 500`

&#x20;

**Follow up:**

Could you solve this problem in linear time with constant space?



### 約瑟夫問題（Josephus Problem）

有 `n` 個人站成一個圓圈，從第一個人開始，每次報數到第 `k` 個人時，將該人移出圓圈，然後從下一個人開始重新報數。如此重複，直到圓圈中只剩下最後一個人。問題是找出這個最後一個人的位置。

公式：

```
J(n,k)=(J(n−1,k)+k)%n
```



時間複雜度為 `O(n)`，空間複雜度為 `O(1)`

```typescript
function findTheWinner(n: number, k: number): number {
    let winner = 0;  // 初始贏家位置為 0（0-based索引）

    // 從1到n，依次計算贏家位置
    for (let i = 1; i <= n; i++) {
        winner = (winner + k) % i;
    }

    return winner + 1;  // 將 0-based 索引轉換為 1-based
}
```

1. 初始化變數 `winner` 為0。表示當只有一個人時，贏家的位置（0-based）。
2. 使用 `for` 循環從 1 遍歷到 nnn。
3. 每次循環中，更新 `winner` 的位置為 `(winner + k) % i`，其中 `i` 是當前的朋友數。
4. 最後返回 `winner + 1`，將 0-based 索引轉換為 1-based 索引，因為這是以 0 為基準下去算的，回傳的時候要改成從 1 開始，因此要 `+1`&#x20;



### 模擬

#### 時間複雜度

模擬的時間複雜度取決於以下幾個因素：

1. **迭代次數：** 每個朋友平均會被移除 n/k次（其中 k 是給定的步數），因此總迭代次數大約是 n。
2. **每次 `splice` 的操作：** `splice` 操作的時間複雜度是 O(n)，因為它需要移動被刪除索引後的所有元素。

因此，整體時間複雜度大約是 O(n^2)，這主要是由於 `splice` 操作的影響。

#### 空間複雜度

空間複雜度主要取決於存儲朋友列表的空間需求，即 O(n)，因為需要存儲每個朋友的編號。

總結來說，這種模擬方法雖然容易理解和實現，但由於每次 `splice` 操作都可能移動大量元素，導致時間複雜度較高，不適合處理大規模的 n。

```typescript
function findTheWinner(n: number, k: number): number {
    // 建立朋友列表
    let friends = Array.from({ length: n }, (_, index) => index + 1);

    let currentIndex = 0;

    // 重複遊戲直到只剩下一個朋友
    while (friends.length > 1) {
        // 計算要移除的朋友的索引
        currentIndex = (currentIndex + k - 1) % friends.length;
        
        // 移除該朋友
        friends.splice(currentIndex, 1);
    }

    // 返回最後一個剩下的朋友的編號
    return friends[0];
}

```

* 創建一個包含從1到n的朋友列表 `friends`。
* 使用 `while` 循環來模擬遊戲，直到只剩下一個朋友。
* 在每個迭代中，計算要移除的朋友的索引 `currentIndex`，使用 `(currentIndex + k - 1) % friends.length` 計算。這裡的 `-1` 是因為要考慮從0開始的索引。
* 使用 `splice` 方法從列表中移除該朋友。
* 當循環結束時，返回剩下的最後一個朋友的編號。
