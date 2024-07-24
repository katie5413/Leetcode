# Sort Array by Increasing Frequency (E)

[1636. Sort Array by Increasing Frequency](https://leetcode.com/problems/sort-array-by-increasing-frequency/)



Given an array of integers `nums`, sort the array in **increasing** order based on the frequency of the values. If multiple values have the same frequency, sort them in **decreasing** order.

Return the _sorted array_.

&#x20;

**Example 1:**

<pre><code><strong>Input: nums = [1,1,2,2,2,3]
</strong><strong>Output: [3,1,1,2,2,2]
</strong><strong>Explanation: '3' has a frequency of 1, '1' has a frequency of 2, and '2' has a frequency of 3.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: nums = [2,3,1,3,2]
</strong><strong>Output: [1,3,3,2,2]
</strong><strong>Explanation: '2' and '3' both have a frequency of 2, so they are sorted in decreasing order.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: nums = [-1,1,-6,4,5,-6,1,4,1]
</strong><strong>Output: [5,-1,4,4,-6,-6,1,1,1]
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= nums.length <= 100`
* `-100 <= nums[i] <= 100`



```typescript
function frequencySort(nums: number[]): number[] {
    // 計算每個數字的頻率
    const frequency = new Map<number, number>();
    for (const num of nums) {
        frequency.set(num, (frequency.get(num) || 0) + 1);
    }

    // 將數字根據頻率排序，如果頻率相同，則按數字本身的降序排序
    return nums.sort((a, b) => frequency.get(a) !== frequency.get(b) ? frequency.get(a) - frequency.get(b) : b - a);
}
```
