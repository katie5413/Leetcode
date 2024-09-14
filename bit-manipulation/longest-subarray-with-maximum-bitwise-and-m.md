# Longest Subarray With Maximum Bitwise AND (M)

[2419. Longest Subarray With Maximum Bitwise AND](https://leetcode.com/problems/longest-subarray-with-maximum-bitwise-and/)



You are given an integer array `nums` of size `n`.

Consider a **non-empty** subarray from `nums` that has the **maximum** possible **bitwise AND**.

* In other words, let `k` be the maximum value of the bitwise AND of **any** subarray of `nums`. Then, only subarrays with a bitwise AND equal to `k` should be considered.

Return _the length of the **longest** such subarray_.

The bitwise AND of an array is the bitwise AND of all the numbers in it.

A **subarray** is a contiguous sequence of elements within an array.

按位與（Bitwise AND）：對一組數字逐位進行與運算。例如，數字 3 的二進制表示是 11，2 是 10，它們的按位與結果是 10，也就是 2

&#x20;

**Example 1:**

<pre><code><strong>Input: nums = [1,2,3,3,2,2]
</strong><strong>Output: 2
</strong><strong>Explanation:
</strong>The maximum possible bitwise AND of a subarray is 3.
The longest subarray with that value is [3,3], so we return 2.
</code></pre>

**Example 2:**

<pre><code><strong>Input: nums = [1,2,3,4]
</strong><strong>Output: 1
</strong><strong>Explanation:
</strong>The maximum possible bitwise AND of a subarray is 4.
The longest subarray with that value is [4], so we return 1.
</code></pre>

&#x20;

**Constraints:**

* `1 <= nums.length <= 10^5`
* `1 <= nums[i] <= 10^6`



找到最大數字需要 O(n)，找出最長的符合條件的子陣列也需要 O(n)，因此整體時間複雜度是 O(n)

```typescript
function longestSubarray(nums: number[]): number {
    // 找出陣列中的最大值
    const maxVal = Math.max(...nums);
    
    // 初始化變數，maxLen 用來記錄最大值連續子陣列的最大長度，currLen 用來記錄當前的連續長度
    let maxLen = 0, currLen = 0;

    // 遍歷陣列中的每個元素
    for (const num of nums) {
        if (num === maxVal) {
            // 如果當前數字等於最大值，則增加當前連續長度
            currLen++;
            // 更新最大連續長度
            maxLen = Math.max(maxLen, currLen);
        } else {
            // 如果當前數字不等於最大值，則將當前連續長度重置為 0
            currLen = 0;
        }
    }

    // 返回最大值的連續子陣列的最大長度
    return maxLen;
};
```

1. 計算最大按位與值：我們首先需要知道陣列中哪個數字的按位與運算結果最大，這可能是單個數字，或者是多個數字的按位與結果。
2. 尋找該最大按位與的最長子陣列：在陣列中找到與該最大按位與值相等的所有子陣列，並找到其中最長的那一個子陣列。

<figure><img src="../.gitbook/assets/截圖 2024-09-14 晚上11.20.08.png" alt=""><figcaption></figcaption></figure>
