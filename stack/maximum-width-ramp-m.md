# Maximum Width Ramp (M)

[962. Maximum Width Ramp](https://leetcode.com/problems/maximum-width-ramp/)



A **ramp** in an integer array `nums` is a pair `(i, j)` for which `i < j` and `nums[i] <= nums[j]`. The **width** of such a ramp is `j - i`.

Given an integer array `nums`, return _the maximum width of a **ramp** in_ `nums`. If there is no **ramp** in `nums`, return `0`.



**Ramp** 是在數組中兩個索引 `i` 和 `j` 組成的一對 `(i, j)`，其中：

* `i < j`（索引 i 小於 j），且
* `nums[i] <= nums[j]`（`nums[i]` 的值小於或等於 `nums[j]` 的值）。

**Ramp** 的寬度是 `j - i`，即這兩個索引之間的距離。目標是找出所有可能的 ramp 中，寬度最大的那一對 `(i, j)`，並返回它的寬度。如果找不到符合條件的 ramp，就返回 0。

&#x20;

**Example 1:**

<pre><code><strong>Input: nums = [6,0,8,2,1,5]
</strong><strong>Output: 4
</strong><strong>Explanation: The maximum width ramp is achieved at (i, j) = (1, 5): nums[1] = 0 and nums[5] = 5.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: nums = [9,8,1,0,1,9,4,0,4,1]
</strong><strong>Output: 7
</strong><strong>Explanation: The maximum width ramp is achieved at (i, j) = (2, 9): nums[2] = 1 and nums[9] = 1.
</strong></code></pre>

&#x20;

**Constraints:**

* `2 <= nums.length <= 5 * 10^4`
* `0 <= nums[i] <= 5 * 10^4`



### Stack

Ref [https://leetcode.com/problems/maximum-width-ramp/solutions/5893633/beats-88-on-runtime-explained](https://leetcode.com/problems/maximum-width-ramp/solutions/5893633/beats-88-on-runtime-explained)

```typescript
function maxWidthRamp(nums: number[]): number {
    const n = nums.length;
    const stack: number[] = [];
    
    // 將數組中的索引填入 stack 中
    for (let i = 0; i < n; i++) {
        // 只保留值較小的索引
        if (stack.length === 0 || nums[stack[stack.length - 1]] > nums[i]) {
            stack.push(i);
        }
    }
    
    let maxWidth = 0;

    // 從數組的尾部開始遍歷到頭部
    for (let j = n - 1; j >= 0; j--) {
        // 當 stack 不為空且當前值 >= stack 中保存的索引對應的值時
        while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[j]) {
            maxWidth = Math.max(maxWidth, j - stack.pop()!); // 使用非空斷言，因為 stack 不為空
        }
    }

    return maxWidth;
}

```

* **將數組中的索引填入 stack 中**：在這裡，我們把符合條件的數組索引存進堆疊，這樣可以方便後續比較找到可能的 ramp。
* **只保留值較小的索引**：這個步驟是為了確保我們只保留最小值的索引，這樣在後面的遍歷中可以找到符合條件的最大 ramp。
* **從數組的尾部開始遍歷到頭部**：這一步從數組的尾部開始遍歷，因為我們希望從大到小檢查索引的距離，從而獲得最大的 ramp 寬度。
* **當 stack 不為空且當前值 >= stack 中保存的索引對應的值時**：檢查當前值是否大於或等於堆疊中的對應值，以找到符合 ramp 條件的索引對 `(i, j)`。
