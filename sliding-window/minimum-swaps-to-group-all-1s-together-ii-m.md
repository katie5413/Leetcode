# Minimum Swaps to Group All 1's Together II (M)

[2134. Minimum Swaps to Group All 1's Together II](https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together-ii/)



A **swap** is defined as taking two **distinct** positions in an array and swapping the values in them.

A **circular** array is defined as an array where we consider the **first** element and the **last** element to be **adjacent**.

Given a **binary** **circular** array `nums`, return _the minimum number of swaps required to group all_ `1`_'s present in the array together at **any location**_.

&#x20;

**Example 1:**

<pre><code><strong>Input: nums = [0,1,0,1,1,0,0]
</strong><strong>Output: 1
</strong><strong>Explanation: Here are a few of the ways to group all the 1's together:
</strong>[0,0,1,1,1,0,0] using 1 swap.
[0,1,1,1,0,0,0] using 1 swap.
[1,1,0,0,0,0,1] using 2 swaps (using the circular property of the array).
There is no way to group all 1's together with 0 swaps.
Thus, the minimum number of swaps required is 1.
</code></pre>

**Example 2:**

<pre><code><strong>Input: nums = [0,1,1,1,0,0,1,1,0]
</strong><strong>Output: 2
</strong><strong>Explanation: Here are a few of the ways to group all the 1's together:
</strong>[1,1,1,0,0,0,0,1,1] using 2 swaps (using the circular property of the array).
[1,1,1,1,1,0,0,0,0] using 2 swaps.
There is no way to group all 1's together with 0 or 1 swaps.
Thus, the minimum number of swaps required is 2.
</code></pre>

**Example 3:**

<pre><code><strong>Input: nums = [1,1,0,0,1]
</strong><strong>Output: 0
</strong><strong>Explanation: All the 1's are already grouped together due to the circular property of the array.
</strong>Thus, the minimum number of swaps required is 0.
</code></pre>

&#x20;

**Constraints:**

* `1 <= nums.length <= 10^5`
* `nums[i]` is either `0` or `1`.



```typescript
function minSwaps(nums: number[]): number {
    // 計算陣列中所有 1 的總數
    const totalOnes = nums.reduce((acc, num) => acc + num, 0);
    // 如果陣列中沒有 1，則不需要任何交換
    if (totalOnes === 0) return 0;

    const n = nums.length;
    // 將陣列與自身連接起來以模擬循環特性
    let extendedNums = nums.concat(nums);

    let currentOnes = 0;
    // 初始化第一個視窗內的 1 的數量
    for (let i = 0; i < totalOnes; i++) {
        currentOnes += extendedNums[i];
    }

    // 初始化最大視窗內的 1 的數量
    let maxOnesInWindow = currentOnes;

    // 滑動視窗遍歷擴展陣列
    for (let i = 1; i <= n; i++) {
        // 更新當前視窗內的 1 的數量：
        // 減去剛剛移出視窗的元素，增加新進視窗的元素
        currentOnes = currentOnes - extendedNums[i - 1] + extendedNums[i + totalOnes - 1];
        // 更新最大視窗內的 1 的數量
        maxOnesInWindow = Math.max(maxOnesInWindow, currentOnes);
    }

    // 最少交換次數為總 1 的數量減去最大視窗內的 1 的數量
    return totalOnes - maxOnesInWindow;
}
```
