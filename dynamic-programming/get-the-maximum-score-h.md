# Get the Maximum Score (H)

[1537. Get the Maximum Score](https://leetcode.com/problems/get-the-maximum-score/)

Related to [lucky-numbers-in-a-matrix-e.md](../array/lucky-numbers-in-a-matrix-e.md "mention")



You are given two **sorted** arrays of distinct integers `nums1` and `nums2`.

A **valid** **path** is defined as follows:

* Choose array `nums1` or `nums2` to traverse (from index-0).
* Traverse the current array from left to right.
* If you are reading any value that is present in `nums1` and `nums2` you are allowed to change your path to the other array. (Only one repeated value is considered in the valid path).

The **score** is defined as the sum of unique values in a valid path.

Return _the maximum score you can obtain of all possible **valid paths**_. Since the answer may be too large, return it modulo `10^9 + 7`.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/07/16/sample\_1\_1893.png)

<pre><code><strong>Input: nums1 = [2,4,5,8,10], nums2 = [4,6,8,9]
</strong><strong>Output: 30
</strong><strong>Explanation: Valid paths:
</strong>[2,4,5,8,10], [2,4,5,8,9], [2,4,6,8,9], [2,4,6,8,10],  (starting from nums1)
[4,6,8,9], [4,5,8,10], [4,5,8,9], [4,6,8,10]    (starting from nums2)
<strong>The maximum is obtained with the path in green [2,4,6,8,10].
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: nums1 = [1,3,5,7,9], nums2 = [3,5,100]
</strong><strong>Output: 109
</strong><strong>Explanation: Maximum sum is obtained with the path [1,3,5,100].
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: nums1 = [1,2,3,4,5], nums2 = [6,7,8,9,10]
</strong><strong>Output: 40
</strong><strong>Explanation: There are no common elements between nums1 and nums2.
</strong>Maximum sum is obtained with the path [6,7,8,9,10].
</code></pre>

&#x20;

**Constraints:**

* `1 <= nums1.length, nums2.length <= 10^5`
* `1 <= nums1[i], nums2[i] <= 10^7`
* `nums1` and `nums2` are strictly increasing.



### 遇到叉路先比較區段最大，然後加上本身的值

```typescript
function maxSum(nums1: number[], nums2: number[]): number {
    const MOD = 10**9 + 7; // 定義模數
    let i = 0, j = 0; // 初始化兩個指針
    let sum1 = 0, sum2 = 0; // 初始化兩個累加器
    let result = 0; // 初始化結果變量

    // 遍歷兩個數組，直到兩個數組都遍歷完為止
    while (i < nums1.length || j < nums2.length) {
        // 當指針 i 還在 nums1 範圍內且指針 j 超出 nums2 範圍或 nums1[i] 小於 nums2[j] 時，累加 sum1
        if (i < nums1.length && (j >= nums2.length || nums1[i] < nums2[j])) {
            sum1 += nums1[i++];
        // 當指針 j 還在 nums2 範圍內且指針 i 超出 nums1 範圍或 nums1[i] 大於 nums2[j] 時，累加 sum2
        } else if (j < nums2.length && (i >= nums1.length || nums1[i] > nums2[j])) {
            sum2 += nums2[j++];
        // 當 nums1[i] 等於 nums2[j] 時
        } else {
            // 更新結果，取 sum1 和 sum2 的最大值加上共同元素值
            result += Math.max(sum1, sum2) + nums1[i];
            // 重置累加器
            sum1 = 0;
            sum2 = 0;
            // 移動兩個指針
            i++;
            j++;
        }
    }

    // 將剩餘的累加值加到結果中
    result += Math.max(sum1, sum2);
    // 返回結果取模的值
    return result % MOD;
}
```
