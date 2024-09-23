# Extra Characters in a String (M)

[2707. Extra Characters in a String](https://leetcode.com/problems/extra-characters-in-a-string/)



You are given a **0-indexed** string `s` and a dictionary of words `dictionary`. You have to break `s` into one or more **non-overlapping** substrings such that each substring is present in `dictionary`. There may be some **extra characters** in `s` which are not present in any of the substrings.

Return _the **minimum** number of extra characters left over if you break up_ `s` _optimally._

&#x20;

**Example 1:**

<pre><code><strong>Input: s = "leetscode", dictionary = ["leet","code","leetcode"]
</strong><strong>Output: 1
</strong><strong>Explanation: We can break s in two substrings: "leet" from index 0 to 3 and "code" from index 5 to 8. There is only 1 unused character (at index 4), so we return 1.
</strong>
</code></pre>

**Example 2:**

<pre><code><strong>Input: s = "sayhelloworld", dictionary = ["hello","world"]
</strong><strong>Output: 3
</strong><strong>Explanation: We can break s in two substrings: "hello" from index 3 to 7 and "world" from index 8 to 12. The characters at indices 0, 1, 2 are not used in any substring and thus are considered as extra characters. Hence, we return 3.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= s.length <= 50`
* `1 <= dictionary.length <= 50`
* `1 <= dictionary[i].length <= 50`
* `dictionary[i]` and `s` consists of only lowercase English letters
* `dictionary` contains distinct words



### DP

時間複雜度：O(n^2)，其中 n 是字串的長度，因為每個索引 i 會嘗試生成所有從 i 開始的子字串，並進行查詢

```typescript
function minExtraChar(s: string, dictionary: string[]): number {
    const n = s.length; // 字串 s 的長度
    const dictSet = new Set(dictionary); // 將字典轉換為 Set 加速查詢
    const dp = new Array(n + 1).fill(0); // 動態規劃陣列，用來存放從索引 i 到結尾的最小額外字元數

    // 從字串 s 的最後一個字元開始向前遍歷
    for (let i = n - 1; i >= 0; i--) {
        dp[i] = dp[i + 1] + 1; // 最糟情況：當前字元算作額外字元
        // 檢查從 i 開始到 j 的所有子字串
        for (let j = i; j < n; j++) {
            const substring = s.slice(i, j + 1); // 取得子字串
            if (dictSet.has(substring)) { // 如果子字串在字典中
                dp[i] = Math.min(dp[i], dp[j + 1]); // 更新 dp[i] 為最小的額外字元數
            }
        }
    }

    return dp[0]; // 返回從索引 0 開始的最小額外字元數
}
```



dp 陣列：dp\[i] 表示從索引 i 開始到結束所需的最少額外字元數。初始時每個位置都設為最糟情況，即將該位置字元視為額外字元，然後逐步優化。



* 從字串的最後一個字元向前遍歷，對於每一個索引 i，計算從該索引開始的所有可能子字串（由 i 到 j）。
* 如果這些子字串存在於 dictionary 中，就將 dp\[i] 更新為 dp\[j + 1]，這樣就不需要將這個子字串計算為額外字元。
* 最終，dp\[0] 存儲的是整個字串的最小額外字元數。



### 推薦

時間複雜度：O(n \* m)，其中 n 是字串 s 的長度，m 是字典中單字的總數

```typescript
function minExtraChar(s: string, dictionary: string[]): number {
    let costs = [0]; // 初始化成本陣列，初始值為 0，表示從空字串開始不需要額外字元

    // 遍歷字串 s 的每個位置
    for (let i = 0; i < s.length; i++) {
        let v = costs[i] + 1; // 假設當前字元必須作為額外字元加入，成本為前一個位置的成本加 1
        
        // 遍歷字典中的每個單字
        for (let d of dictionary) {
            let end = i + 1; // 計算當前子字串的結束位置
            let start = end - d.length; // 計算當前子字串的起始位置
            
            // 如果子字串長度符合且子字串與字典中的單字匹配
            if ((start >= 0) && (s.slice(start, end) === d)) {
                v = Math.min(v, costs[start]); // 更新當前成本，取最小值
            }
        }

        // 將當前位置的最小成本推入成本陣列
        costs.push(v);
    }

    return costs.at(-1); // 返回成本陣列的最後一個值，代表到達字串結尾時的最小額外字元數
};
```
