# Count Number of Maximum Bitwise-OR Subsets (M)

[2044. Count Number of Maximum Bitwise-OR Subsets](https://leetcode.com/problems/count-number-of-maximum-bitwise-or-subsets/)



Given an integer array `nums`, find the **maximum** possible **bitwise OR** of a subset of `nums` and return _the **number of different non-empty subsets** with the maximum bitwise OR_.

An array `a` is a **subset** of an array `b` if `a` can be obtained from `b` by deleting some (possibly zero) elements of `b`. Two subsets are considered **different** if the indices of the elements chosen are different.

The bitwise OR of an array `a` is equal to `a[0]`` `**`OR`**` ``a[1]`` `**`OR`**` ``...`` `**`OR`**` ``a[a.length - 1]` (**0-indexed**).

&#x20;

**Example 1:**

<pre><code><strong>Input: nums = [3,1]
</strong><strong>Output: 2
</strong><strong>Explanation: The maximum possible bitwise OR of a subset is 3. There are 2 subsets with a bitwise OR of 3:
</strong>- [3]
- [3,1]
</code></pre>

**Example 2:**

<pre><code><strong>Input: nums = [2,2,2]
</strong><strong>Output: 7
</strong><strong>Explanation: All non-empty subsets of [2,2,2] have a bitwise OR of 2. There are 23 - 1 = 7 total subsets.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: nums = [3,2,1,5]
</strong><strong>Output: 6
</strong><strong>Explanation: The maximum possible bitwise OR of a subset is 7. There are 6 subsets with a bitwise OR of 7:
</strong>- [3,5]
- [3,1,5]
- [3,2,5]
- [3,2,1,5]
- [2,5]
- [2,1,5]
</code></pre>

&#x20;

**Constraints:**

* `1 <= nums.length <= 16`
* `1 <= nums[i] <= 10^5`



```typescript
function countMaxOrSubsets(nums: number[]): number {
    let maxOr = 0

    for (const num of nums) {
        maxOr |= num
    }

    let count = 0
    function dfs(index: number, currentOr: number) {
        if (index === nums.length) {
            if (currentOr === maxOr) {
                count++
            }
            return
        }

        dfs(index + 1, currentOr | nums[index])

        dfs(index + 1, currentOr)
    }

    dfs(0, 0)

    return count
}
```

<figure><img src="../.gitbook/assets/截圖 2024-10-19 凌晨12.25.33.png" alt=""><figcaption></figcaption></figure>

