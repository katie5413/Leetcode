# Make Sum Divisible by P (M)

[1590. Make Sum Divisible by P](https://leetcode.com/problems/make-sum-divisible-by-p/)



Related to [subarray-sums-divisible-by-k-m.md](subarray-sums-divisible-by-k-m.md "mention")



Given an array of positive integers `nums`, remove the **smallest** subarray (possibly **empty**) such that the **sum** of the remaining elements is divisible by `p`. It is **not** allowed to remove the whole array.

Return _the length of the smallest subarray that you need to remove, or_ `-1` _if it's impossible_.

A **subarray** is defined as a contiguous block of elements in the array.

&#x20;

**Example 1:**

<pre><code><strong>Input: nums = [3,1,4,2], p = 6
</strong><strong>Output: 1
</strong><strong>Explanation: The sum of the elements in nums is 10, which is not divisible by 6. We can remove the subarray [4], and the sum of the remaining elements is 6, which is divisible by 6.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: nums = [6,3,5,2], p = 9
</strong><strong>Output: 2
</strong><strong>Explanation: We cannot remove a single element to get a sum divisible by 9. The best way is to remove the subarray [5,2], leaving us with [6,3] with sum 9.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: nums = [1,2,3], p = 3
</strong><strong>Output: 0
</strong><strong>Explanation: Here the sum is 6. which is already divisible by 3. Thus we do not need to remove anything.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= nums.length <= 10^5`
* `1 <= nums[i] <= 10^9`
* `1 <= p <= 10^9`



### Prefix Sum

```typescript
function minSubarray(nums: number[], p: number): number {
    // 計算所有數字的總和
    const totalSum = nums.reduce((sum, num) => sum + num, 0);

    // 計算總和對 p 的餘數，這是需要消除的部分
    const target = totalSum % p;
    
    // 如果總和已經是 p 的倍數，則無需移除任何子陣列，返回 0
    if (target === 0) return 0;

    // 使用一個 Map 記錄前綴和對 p 取餘數的值以及對應的索引
    const prefixSumMap = new Map<number, number>();
    prefixSumMap.set(0, -1);  // 初始化前綴和為 0 時的索引為 -1

    let prefixSum = 0;  // 當前的前綴和
    let minLength = nums.length;  // 記錄最短的子陣列長度

    for (let i = 0; i < nums.length; i++) {
        // 更新前綴和，並對 p 取餘數
        prefixSum = (prefixSum + nums[i]) % p;

        // 計算需要的前綴和，這樣我們可以抵消 target 的影響
        const neededPrefix = (prefixSum - target + p) % p;

        // 如果已經出現過所需的前綴和，則計算當前子陣列的長度
        if (prefixSumMap.has(neededPrefix)) {
            minLength = Math.min(minLength, i - prefixSumMap.get(neededPrefix)!);
        }

        // 將當前的前綴和存入 Map 中
        prefixSumMap.set(prefixSum, i);
    }

    // 如果 minLength 沒有被更新，則返回 -1，否則返回最短子陣列的長度
    return minLength === nums.length ? -1 : minLength;
};
```
