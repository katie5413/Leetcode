# Combination Sum II (M)

[40. Combination Sum II](https://leetcode.com/problems/combination-sum-ii/)



Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sum to `target`.

Each number in `candidates` may only be used **once** in the combination.

數字用過就不能再用

**Note:** The solution set must not contain duplicate combinations.

&#x20;但同一種組合不能出現兩次以上



**Example 1:**

<pre><code><strong>Input: candidates = [10,1,2,7,6,1,5], target = 8
</strong><strong>Output: 
</strong>[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
</code></pre>

**Example 2:**

<pre><code><strong>Input: candidates = [2,5,2,1,2], target = 5
</strong><strong>Output: 
</strong>[
[1,2,2],
[5]
]
</code></pre>

&#x20;

**Constraints:**

* `1 <= candidates.length <= 100`
* `1 <= candidates[i] <= 50`
* `1 <= target <= 30`



```typescript
function combinationSum2(candidates: number[], target: number): number[][] {
    const ans: number[][] = []
    // 從小到大排序
    candidates.sort((a, b) => a - b)

    const bt = (nums: number[] = [], index: number = 0, sum: number = 0) => {
        // 停止點
        if (sum >= target) {
            if (sum === target) {
                ans.push([...nums])
            }
            return
        }

        for (let i = index; i < candidates.length; i++) {
            // 去掉重複
            if (i > index && candidates[i] === candidates[i - 1]) continue;
            bt([...nums, candidates[i]], i + 1, sum + candidates[i])
        }

    }
    bt()

    return ans
};
```



### 別人分享的，看起來概念跟我的差不多，但他效能比較好，先存起來

```typescript
function combinationSum2(candidates: number[], target: number): number[][] {
    candidates.sort((a, b) => a - b)
    const result = []
    function rec(index: number, combo: number[], sum: number) {
        if (sum === target) {
            result.push([...combo])
            return
        }
        if (sum > target || index >= candidates.length) {
            return
        }
        combo.push(candidates[index])
        rec(index+1, combo, sum+candidates[index])
        combo.pop()
        // if i don't take the number skip the nums same as this, they are ordered
        let nextIndex = index + 1
        while (nextIndex - 1 < candidates.length && candidates[index] === candidates[nextIndex]) {
            nextIndex++
        }
        rec(nextIndex, combo, sum)
    }
```
