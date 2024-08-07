# Combination Sum (M)

[39. Combination Sum](https://leetcode.com/problems/combination-sum/)



Given an array of **distinct** integers `candidates` and a target integer `target`, return _a list of all **unique combinations** of_ `candidates` _where the chosen numbers sum to_ `target`_._ You may return the combinations in **any order**.

The **same** number may be chosen from `candidates` an **unlimited number of times**. Two combinations are unique if the&#x20;

frequency of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to `target` is less than `150` combinations for the given input.

&#x20;

**Example 1:**

<pre><code><strong>Input: candidates = [2,3,6,7], target = 7
</strong><strong>Output: [[2,2,3],[7]]
</strong><strong>Explanation:
</strong>2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
</code></pre>

**Example 2:**

<pre><code><strong>Input: candidates = [2,3,5], target = 8
</strong><strong>Output: [[2,2,2,2],[2,3,3],[3,5]]
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: candidates = [2], target = 1
</strong><strong>Output: []
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= candidates.length <= 30`
* `2 <= candidates[i] <= 40`
* All elements of `candidates` are **distinct**.
* `1 <= target <= 40`



### 第一次嘗試（待優化）

```typescript
function combinationSum(candidates: number[], target: number): number[][] {
    const ans: number[][] = []

    const bt = (num: number[] = [], availableNumber: number[] = candidates, sum: number = 0) => {
        // 如果等於就放到 ans 
        if (sum === target) {
            ans.push(num)
            return
        }

        // 用可選的數字往下長出分支
        for (const digit of availableNumber) {
            // 可以重複選自己，但選了大的就不能回頭選小的所以要過濾掉
            const newAvailableNumber = availableNumber.filter(item => item >= digit)
            if (sum < target) {
                bt(num.concat(digit), newAvailableNumber, sum + digit)
            }
        }
    }

    bt([], candidates, 0)

    return ans
};
```



### 別人的寫法

差異：參數改用 pos（位置）取代原本的可用數字陣列，可以省略過去的步驟，效率比較高&#x20;

```typescript
function combinationSum(candidates: number[], target: number): number[][] {
    // 儲存所有符合條件的組合結果
    const result: number[][] = [];

    // 定義遞歸函數，參數包括當前的組合數組、當前的總和以及當前考慮的起始位置
    function findCombination(elements: number[] = [], sum: number = 0, pos: number = 0) {
        // 遍歷從當前位置開始的候選數組
        for (let i = pos; i < candidates.length; i++) {
            // 如果當前總和等於目標值，將當前組合加入結果數組
            if (sum === target) {
                result.push(elements);
                return;
            }
            // 如果當前總和加上候選數不超過目標值，繼續遞歸尋找組合
            if (sum + candidates[i] <= target) {
                findCombination([...elements, candidates[i]], sum + candidates[i], i);
            }
        }
    }

    // 開始遞歸查找組合
    findCombination();

    // 返回所有符合條件的組合結果
    return result;
}
```



```typescript
function combinationSum(candidates: number[], target: number): number[][] {
    // 儲存所有符合條件的組合結果
    const ans: number[][] = [];

    // 定義遞歸函數，參數包括當前考慮的候選數組索引、當前的組合數組、當前的總和
    const bt = (i: number, path: number[], sum: number): void => {
        // 如果當前總和大於或等於目標值
        if (sum >= target) {
            // 如果當前總和等於目標值，將當前組合複製後加入結果數組
            if (sum === target) ans.push([...path]);
            // 返回以終止當前遞歸路徑
            return;
        }

        // 遍歷從當前索引開始的候選數組
        for (let j = i; j < candidates.length; j++) {
            // 將當前候選數加入當前組合
            path.push(candidates[j]);
            // 遞歸調用，傳入當前索引、更新後的組合數組和新的總和
            bt(j, path, sum + candidates[j]);
            // 遞歸調用返回後，移除當前候選數，以嘗試其他組合
            path.pop();
        }
    };

    // 開始遞歸查找組合，從索引 0、空數組和總和 0 開始
    bt(0, [], 0);

    // 返回所有符合條件的組合結果
    return ans;
}
```
