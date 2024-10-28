# Longest Square Streak in an Array (M)

[2501. Longest Square Streak in an Array](https://leetcode.com/problems/longest-square-streak-in-an-array/)



You are given an integer array `nums`. A subsequence of `nums` is called a **square streak** if:

* The length of the subsequence is at least `2`, and
* **after** sorting the subsequence, each element (except the first element) is the **square** of the previous number.

Return _the length of the **longest square streak** in_ `nums`_, or return_ `-1` _if there is no **square streak**._

A **subsequence** is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

&#x20;

**Example 1:**

<pre><code><strong>Input: nums = [4,3,6,16,8,2]
</strong><strong>Output: 3
</strong><strong>Explanation: Choose the subsequence [4,16,2]. After sorting it, it becomes [2,4,16].
</strong>- 4 = 2 * 2.
- 16 = 4 * 4.
Therefore, [4,16,2] is a square streak.
It can be shown that every subsequence of length 4 is not a square streak.
</code></pre>

**Example 2:**

<pre><code><strong>Input: nums = [2,3,5,6,7]
</strong><strong>Output: -1
</strong><strong>Explanation: There is no square streak in nums so return -1.
</strong></code></pre>



**Constraints:**

* `2 <= nums.length <= 10^5`
* `2 <= nums[i] <= 10^5`

&#x20;

Ref. [https://leetcode.com/problems/longest-square-streak-in-an-array/solutions/5976355/explained-step-by-step-beats-100-working-28-10-2024](https://leetcode.com/problems/longest-square-streak-in-an-array/solutions/5976355/explained-step-by-step-beats-100-working-28-10-2024)

```typescript
function longestSquareStreak(nums: number[]): number {
    // Convert nums to a sorted set to remove duplicates and have ordered numbers
    const numSet = new Set(nums);
    const sortedNums = Array.from(numSet).sort((a, b) => a - b);
    
    // Track the maximum streak length found
    let maxLength = 0;
    
    // Iterate through each number in sorted order
    for (const num of sortedNums) {
        // Initialize streak length for current number
        let length = 0;
        // Start with current number
        let current = num;
        
        // Keep squaring the number while it exists in our set
        while (numSet.has(current)) {
            length++;
            current = current ** 2;
            
            // Add safety check for numbers getting too large
            if (current > 100000) break;
        }
        
        // Only update maxLength if we found a streak of length > 1
        if (length > 1) {
            maxLength = Math.max(maxLength, length);
        }
    }
    
    // Return maxLength if we found a valid streak, otherwise return -1
    return maxLength > 1 ? maxLength : -1;
}
```

<figure><img src="../.gitbook/assets/截圖 2024-10-29 凌晨12.08.12.png" alt=""><figcaption></figcaption></figure>

