# Permutations (M)

[46. Permutations](https://leetcode.com/problems/permutations/)



Given an array `nums` of distinct integers, return _all the possible permutations_. You can return the answer in **any order**.

&#x20;

**Example 1:**

<pre><code><strong>Input: nums = [1,2,3]
</strong><strong>Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: nums = [0,1]
</strong><strong>Output: [[0,1],[1,0]]
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: nums = [1]
</strong><strong>Output: [[1]]
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= nums.length <= 6`
* `-10 <= nums[i] <= 10`
* All the integers of `nums` are **unique**.



### BackTracking

O(N!)

因為從頭到尾都是用同一個陣列在紀錄暫時的結果，所以在放入最終結果時要用複製的

```typescript
function permute(nums: number[]): number[][] {
    // 用來暫時存儲目前的排列
    const permutation: number[] = [];
    // 存儲所有的排列組合
    const permutations: number[][] = [];

    // 遞迴函數來生成排列
    function recurse(k: number): void {
        // 當 k 為 0 時，表示一組完整的排列已經生成
        if (k === 0) {
            // 將當前排列的副本加入到 permutations 中
            permutations.push([...permutation]);
            return;
        }

        // 遍歷 nums 中的每個數字
        for (const n of nums) {
            // 如果 permutation 中已經包含這個數字，則跳過
            if (permutation.includes(n)) continue;
            // 將數字 n 推入 permutation
            permutation.push(n);
            // 遞迴呼叫，生成下一層的排列，並將 k 減 1
            recurse(k - 1);
            // 彈出最後一個數字，回到上一層狀態，繼續嘗試其他數字
            permutation.pop();
        }
    }

    // 開始遞迴，從 nums.length 開始
    recurse(nums.length);

    // 返回所有的排列組合
    return permutations;
}
```



O(n^2)

```typescript
function permute(nums: number[]): number[][] {
    const result: number[][] = [];

    function backtrack(path: number[], remaining: number[]) {
        // 如果沒有剩餘的數字，表示當前的 path 是一個完整的排列
        if (remaining.length === 0) {
            // 將當前的 path 複製一份並加入 result 中
            result.push([...path]);
        } else {
            // 遍歷所有剩餘的數字
            for (let i = 0; i < remaining.length; i++) {
                // 將當前數字添加到 path 中
                path.push(remaining[i]);
                // 使用當前數字生成下一層的排列，剩餘數字去掉當前數字
                backtrack(path, remaining.slice(0, i).concat(remaining.slice(i + 1)));
                // 彈出最後一個數字，恢復到上一步狀態，準備嘗試其他數字
                path.pop();
            }
        }
    }

    // 開始回溯，初始化時 path 為空，remaining 為所有輸入的數字
    backtrack([], nums);
    // 返回所有生成的排列組合
    return result;
}
```
