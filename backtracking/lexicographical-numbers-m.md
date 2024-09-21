# Lexicographical Numbers (M)

[386. Lexicographical Numbers](https://leetcode.com/problems/lexicographical-numbers/)



Given an integer `n`, return all the numbers in the range `[1, n]` sorted in lexicographical order.

You must write an algorithm that runs in `O(n)` time and uses `O(1)` extra space.&#x20;

&#x20;

**Example 1:**

<pre><code><strong>Input: n = 13
</strong><strong>Output: [1,10,11,12,13,2,3,4,5,6,7,8,9]
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: n = 2
</strong><strong>Output: [1,2]
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= n <= 5 * 10^4`



### Backtracking

```typescript
function lexicalOrder(n: number): number[] {
    const result: number[] = [];

    const backtracking = (prev: number) => {
        if (prev > n) {
            return;
        }
        result.push(prev);

        prev *= 10;
        for (let i = prev === 0 ? 1 : 0; i < 10; i++) {
            backtracking(prev + i);
        }
    };
    backtracking(0);

    return result.slice(1);
}
```



### DFS

```typescript
function lexicalOrder(n: number): number[] {
    const res = []; // 用來存放字典順序的結果陣列

    // 定義深度優先搜尋（DFS）遞迴函數
    function dfs(num) {
        // 從 0 到 9 嘗試將當前數字進行擴展
        for (let i = 0; i <= 9; i++) {
            const cur = num * 10 + i;  // 建立新的數字
            if (cur === 0) {
                continue;  // 跳過數字 0
            }
            if (cur > n) {
                return;  // 如果當前數字超過 n，停止遞迴
            }
            res.push(cur);  // 將合法的數字加入結果陣列
            dfs(cur);  // 對當前數字進行遞迴，繼續擴展
        }
    }
    
    dfs(0);  // 從 0 開始進行深度優先搜尋

    return res;  // 返回結果陣列
};
```
