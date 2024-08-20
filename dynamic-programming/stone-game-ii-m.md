# Stone Game II (M)

[1140. Stone Game II](https://leetcode.com/problems/stone-game-ii/)



Alice and Bob continue their games with piles of stones.  There are a number of piles **arranged in a row**, and each pile has a positive integer number of stones `piles[i]`.  The objective of the game is to end with the most stones.&#x20;

Alice and Bob take turns, with Alice starting first.  Initially, `M = 1`.

On each player's turn, that player can take **all the stones** in the **first** `X` remaining piles, where `1 <= X <= 2M`.  Then, we set `M = max(M, X)`.

The game continues until all the stones have been taken.

Assuming Alice and Bob play optimally, return the maximum number of stones Alice can get.

&#x20;

**Example 1:**

<pre><code><strong>Input: piles = [2,7,9,4,4]
</strong><strong>Output: 10
</strong><strong>Explanation:  If Alice takes one pile at the beginning, Bob takes two piles, then Alice takes 2 piles again. Alice can get 2 + 4 + 4 = 10 piles in total. If Alice takes two piles at the beginning, then Bob can take all three piles left. In this case, Alice get 2 + 7 = 9 piles in total. So we return 10 since it's larger. 
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: piles = [1,2,3,4,5,100]
</strong><strong>Output: 104
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= piles.length <= 100`
* `1 <= piles[i] <= 10^4`



### DFS + DP

O(n^2)

```typescript
function stoneGameII(piles: number[]): number {
    // 定義遞迴函數 dfs，用於計算從第 i 堆開始，當前 M 值下愛麗絲能獲得的最多石頭數量
    function dfs(i: number, M: number): number {
        // 如果 i 超過或等於石頭堆的總數，表示已經沒有石頭可拿，返回 0
        if (i >= n) return 0;
        
        // 如果 dp[i][M] 已經計算過，直接返回該值（記憶化）
        if (dp[i][M]) return dp[i][M];
        
        // 初始化當前能拿到的石頭數量 sum
        let sum: number = 0;
        
        // 遍歷玩家可以選擇拿走的石頭堆數量 x，範圍是從 1 到 2 * M
        for (let x = 1; x <= M * 2; x++) {
            // 如果 i + x - 1 超過石頭堆數量範圍，跳出循環
            if (i + x - 1 >= n) break;
            
            // 累計從第 i 堆開始的 x 堆石頭數量
            sum += piles[i + x - 1];
            
            // 更新 dp[i][M]，計算最佳策略下愛麗絲能獲得的最大石頭數量
            dp[i][M] = Math.max(dp[i][M], sum + suffix[i + x] - dfs(i + x, Math.max(x, M)));
        }
        
        // 返回計算出的 dp[i][M] 值
        return dp[i][M];
    }

    // 獲取石頭堆的總數 n
    const n: number = piles.length;

    // 初始化 dp 二維陣列，dp[i][M] 表示當從第 i 堆開始且 M = M 時，愛麗絲能獲得的最多石頭數量
    const dp: number[][] = new Array(101).fill([]).map(() => new Array(101).fill(0));

    // 初始化 suffix 陣列，suffix[i] 表示從第 i 堆開始到最後一堆的累積石頭數量
    const suffix: number[] = new Array(n + 1).fill(0);

    // 從右到左計算 suffix 陣列的值
    for (let i = n - 1; i >= 0; i--) suffix[i] = suffix[i + 1] + piles[i];

    // 開始遞迴，從第 0 堆開始且 M = 1，計算愛麗絲最多能獲得的石頭數量
    return dfs(0, 1);
};
```



O(n^3)

```typescript
function stoneGameII(piles: number[]): number {
    // 獲取石頭堆的長度
    const Length: number = piles.length;

    // 初始化 dp 二維陣列，dp[i][m] 表示當從第 i 堆開始且 M = m+1 時，能夠獲得的最多石頭數量
    const dp: number[][] = Array.from(Array(Length), () => (Array(Length).fill(0)));

    // 初始化從當前堆到最後堆的石頭總和 sumTilEnd
    let sumTilEnd: number = 0;

    // 從右到左遍歷每個石頭堆
    for (let i = Length - 1; i >= 0; i--) {
        // 更新從第 i 堆到最後一堆的石頭總和
        sumTilEnd += piles[i];

        // 遍歷每個 M 值 (實際為 m + 1)
        for (let m = 0; m < Length; m++) {
            // 遍歷可以選擇的石頭堆數量 k (最多可選擇 2 * (m + 1) 堆)
            for (let k = 0; k < 2 * (m + 1); k++) {
                // 如果 k 超出石頭堆的長度範圍，跳出循環
                if (k >= Length) break;

                // 如果 i + k + 1 超出石頭堆範圍，表示可以拿走剩下的所有石頭
                if (i + k + 1 >= Length) {
                    // 更新 dp[i][m]，此時所有剩下的石頭都會被拿走
                    dp[i][m] = Math.max(dp[i][m], sumTilEnd);
                    continue;
                }

                // 更新 dp[i][m]，考慮拿走 k 堆後的最優選擇
                dp[i][m] = Math.max(dp[i][m], sumTilEnd - dp[i + k + 1][Math.max(m, k)]);
            }
        }
    }

    // 返回當從第 0 堆開始且 M = 1 時，愛麗絲能夠獲得的最多石頭數量
    return dp[0][0];
};
```

1. Length:
   * 表示石頭堆的總數。
2. dp 二維陣列:
   * dp\[i]\[m] 表示當從第 i 堆開始且 M = m+1 時，玩家能夠獲得的最多石頭數量。
   * 這個陣列用來儲存每個可能的狀態下，玩家能夠獲得的最大石頭數，以便在後續計算中重用。
3. sumTilEnd:
   * sumTilEnd 用來累加從第 i 堆到最後一堆的石頭數量。這樣在每次迴圈中，我們都能快速得到剩餘石頭的總和。
4. 主要邏輯：
   * 透過從最後一堆到第一堆的倒序迴圈，逐步計算每個狀態下玩家能獲得的最大石頭數量。
   * 每次迴圈中，考慮從當前位置開始，對於每個可能的 M 值，最多可以選擇 2 \* (M + 1) 堆石頭，並更新當前狀態的最大值。
5. 返回結果：
   * 最終返回 dp\[0]\[0]，這是當從第 0 堆開始且 M = 1 時，愛麗絲能夠獲得的最大石頭數量。
