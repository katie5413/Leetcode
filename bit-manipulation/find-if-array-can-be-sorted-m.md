# Find if Array Can Be Sorted (M)

[3011. Find if Array Can Be Sorted](https://leetcode.com/problems/find-if-array-can-be-sorted/)



You are given a **0-indexed** array of **positive** integers `nums`.

In one **operation**, you can swap any two **adjacent** elements if they have the **same** number of&#x20;

set bits. You are allowed to do this operation **any** number of times (**including zero**).

Return `true` _if you can sort the array, else return_ `false`.

&#x20;

**Example 1:**

<pre><code><strong>Input: nums = [8,4,2,30,15]
</strong><strong>Output: true
</strong><strong>Explanation: Let's look at the binary representation of every element. The numbers 2, 4, and 8 have one set bit each with binary representation "10", "100", and "1000" respectively. The numbers 15 and 30 have four set bits each with binary representation "1111" and "11110".
</strong>We can sort the array using 4 operations:
- Swap nums[0] with nums[1]. This operation is valid because 8 and 4 have one set bit each. The array becomes [4,8,2,30,15].
- Swap nums[1] with nums[2]. This operation is valid because 8 and 2 have one set bit each. The array becomes [4,2,8,30,15].
- Swap nums[0] with nums[1]. This operation is valid because 4 and 2 have one set bit each. The array becomes [2,4,8,30,15].
- Swap nums[3] with nums[4]. This operation is valid because 30 and 15 have four set bits each. The array becomes [2,4,8,15,30].
The array has become sorted, hence we return true.
Note that there may be other sequences of operations which also sort the array.
</code></pre>

**Example 2:**

<pre><code><strong>Input: nums = [1,2,3,4,5]
</strong><strong>Output: true
</strong><strong>Explanation: The array is already sorted, hence we return true.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: nums = [3,16,8,4,2]
</strong><strong>Output: false
</strong><strong>Explanation: It can be shown that it is not possible to sort the input array using any number of operations.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= nums.length <= 100`
* `1 <= nums[i] <= 2^8`



### 解釋

* **計算位元 1 的數量**：陣列 `NUM_ONES` 儲存了 0 到 255 的位元 1 的數量。
* **檢查每段的最小最大值**：透過檢查每個段落的最小值是否大於等於上一段的最大值來判斷是否可以通過這個方法排序。

Ref. [https://leetcode.com/problems/find-if-array-can-be-sorted/solutions/6013306/o-n-100-runtime-mem-one-sweep-two-chunk-by-ones-count-and-a-precached-ones-count](https://leetcode.com/problems/find-if-array-can-be-sorted/solutions/6013306/o-n-100-runtime-mem-one-sweep-two-chunk-by-ones-count-and-a-precached-ones-count)

```typescript
// 事先計算好 0 到 255 的每個數字中 "位元 1 的數量"
const NUM_ONES = [0, 1, 1, 2, ... , 7, 8, 1]; 

function canSortArray(nums: number[]): boolean {
    let highest = -1;  // 記錄到目前為止的最大值
    let currentOnes = NUM_ONES[nums[0]];  // 當前數字的 "位元 1 的數量"
    let minInChunk = nums[0];  // 當前段的最小值
    let maxInChunk = nums[0];  // 當前段的最大值

    // 遍歷陣列中的每個數字
    for (const num of nums) {
        const numOnes = NUM_ONES[num];  // 取得當前數字的位元 1 的數量
        
        // 如果當前數字的位元 1 的數量改變了
        if (numOnes !== currentOnes) {
            // 檢查是否當前段的最小值小於上一段的最大值
            if (minInChunk < highest) {
                return false;  // 若不符合條件，則無法排序，返回 false
            }
            // 更新最高值並準備開始新的一段
            highest = maxInChunk;
            currentOnes = numOnes;
            minInChunk = num;
            maxInChunk = num;
        } else {
            // 更新當前段的最小值和最大值
            minInChunk = Math.min(minInChunk, num);
            maxInChunk = Math.max(maxInChunk, num);
        }
    }

    // 最後檢查結尾的段
    return minInChunk >= highest;
}
```

<figure><img src="../.gitbook/assets/截圖 2024-11-06 上午10.24.39.png" alt=""><figcaption></figcaption></figure>

