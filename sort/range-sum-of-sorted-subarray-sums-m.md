# Range Sum of Sorted Subarray Sums (M)

[623. Add One Row to Tree](https://leetcode.com/problems/add-one-row-to-tree/)



You are given the array `nums` consisting of `n` positive integers. You computed the sum of all non-empty continuous subarrays from the array and then sorted them in non-decreasing order, creating a new array of `n * (n + 1) / 2` numbers.

_Return the sum of the numbers from index_ `left` _to index_ `right` (**indexed from 1**)_, inclusive, in the new array._ Since the answer can be a huge number return it modulo `109 + 7`.

&#x20;

**Example 1:**

<pre><code><strong>Input: nums = [1,2,3,4], n = 4, left = 1, right = 5
</strong><strong>Output: 13 
</strong><strong>Explanation: All subarray sums are 1, 3, 6, 10, 2, 5, 9, 3, 7, 4. After sorting them in non-decreasing order we have the new array [1, 2, 3, 3, 4, 5, 6, 7, 9, 10]. The sum of the numbers from index le = 1 to ri = 5 is 1 + 2 + 3 + 3 + 4 = 13. 
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: nums = [1,2,3,4], n = 4, left = 3, right = 4
</strong><strong>Output: 6
</strong><strong>Explanation: The given array is the same as example 1. We have the new array [1, 2, 3, 3, 4, 5, 6, 7, 9, 10]. The sum of the numbers from index le = 3 to ri = 4 is 3 + 3 = 6.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: nums = [1,2,3,4], n = 4, left = 1, right = 10
</strong><strong>Output: 50
</strong></code></pre>

&#x20;

**Constraints:**

* `n == nums.length`
* `1 <= nums.length <= 1000`
* `1 <= nums[i] <= 100`
* `1 <= left <= right <= n * (n + 1) / 2`



### Simulation

```typescript
function rangeSum(nums: number[], n: number, left: number, right: number): number {
    const mod = 10**9 + 7;
    const subarraySums: number[] = [];

    // Generate all subarray sums
    for (let i = 0; i < n; i++) {
        let currentSum = 0;
        for (let j = i; j < n; j++) {
            currentSum += nums[j];
            subarraySums.push(currentSum);
        }
    }

    // Sort the subarray sums
    subarraySums.sort((a, b) => a - b);

    // Calculate the sum from index `left - 1` to `right - 1` (convert to 0-based)
    let result = 0;
    for (let k = left - 1; k < right; k++) {
        result = (result + subarraySums[k]) % mod;
    }

    return result;
}
```

<figure><img src="../.gitbook/assets/截圖 2024-08-04 晚上9.37.03.png" alt=""><figcaption></figcaption></figure>

