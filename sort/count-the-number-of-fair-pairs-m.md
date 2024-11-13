# Count the Number of Fair Pairs (M)

[2563. Count the Number of Fair Pairs](https://leetcode.com/problems/count-the-number-of-fair-pairs/)



Given a **0-indexed** integer array `nums` of size `n` and two integers `lower` and `upper`, return _the number of fair pairs_.

A pair `(i, j)` is fair if:

* `0 <= i < j < n`, and
* `lower <= nums[i] + nums[j] <= upper`

&#x20;

**Example 1:**

<pre><code><strong>Input: nums = [0,1,7,4,4,5], lower = 3, upper = 6
</strong><strong>Output: 6
</strong><strong>Explanation: There are 6 fair pairs: (0,3), (0,4), (0,5), (1,3), (1,4), and (1,5).
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: nums = [1,7,9,2,5], lower = 11, upper = 11
</strong><strong>Output: 1
</strong><strong>Explanation: There is a single fair pair: (2,3).
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= nums.length <= 10^5`
* `nums.length == n`
* `-10^9 <= nums[i] <= 10^9`
* `-10^9 <= lower <= upper <= 10^9`



### Binary Search

Ref. [https://leetcode.com/problems/count-the-number-of-fair-pairs/solutions/6040777/beats-100-most-common-array-interview-problems](https://leetcode.com/problems/count-the-number-of-fair-pairs/solutions/6040777/beats-100-most-common-array-interview-problems)

```typescript
function countFairPairs(nums: number[], lower: number, upper: number): number {
    nums.sort((a, b) => a - b);
    return countPairs(nums, upper) - countPairs(nums, lower - 1);
}

function countPairs(nums: number[], target: number): number {
    let count = 0;
    let left = 0, right = nums.length - 1;
    
    while (left < right) {
        if (nums[left] + nums[right] > target) right--;
        else {
            count += right - left;
            left++;
        }
    }
    return count;
}
```

<figure><img src="../.gitbook/assets/截圖 2024-11-13 晚上11.53.04.png" alt=""><figcaption></figcaption></figure>

