# Minimum Number of Removals to Make Mountain Array (H)

[1671. Minimum Number of Removals to Make Mountain Array](https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array/)



You may recall that an array `arr` is a **mountain array** if and only if:

* `arr.length >= 3`
* There exists some index `i` (**0-indexed**) with `0 < i < arr.length - 1` such that:
  * `arr[0] < arr[1] < ... < arr[i - 1] < arr[i]`
  * `arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`

Given an integer array `nums`​​​, return _the **minimum** number of elements to remove to make_ `nums`_`​​​` a **mountain array**._

計算從 `nums` 陣列中移除的最少元素數量，使得剩下的子序列形成一個「山峰序列」。山峰序列需要一個遞增子序列，接著是遞減子序列，且山峰的左右兩側的長度都必須大於 1。

**Example 1:**

<pre><code><strong>Input: nums = [1,3,1]
</strong><strong>Output: 0
</strong><strong>Explanation: The array itself is a mountain array so we do not need to remove any elements.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: nums = [2,1,1,5,6,2,3,1]
</strong><strong>Output: 3
</strong><strong>Explanation: One solution is to remove the elements at indices 0, 1, and 5, making the array nums = [1,5,6,3,1].
</strong></code></pre>

&#x20;

**Constraints:**

* `3 <= nums.length <= 1000`
* `1 <= nums[i] <= 10^9`
* It is guaranteed that you can make a mountain array out of `nums`.



Ref. [https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array/solutions/5984675/explained-step-by-step-beats-100-working-30-10-2024](https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array/solutions/5984675/explained-step-by-step-beats-100-working-30-10-2024)

#### 解說

1. **`lisLength` 函數**：
   * 此函數計算 `v` 中每個位置的遞增子序列（LIS）長度。它使用一個 `lis` 陣列來維護當前 LIS，並透過 `lowerBound` 二分搜尋來找到最小且大於等於目標元素的索引，以便適當地更新 `lis` 以支持更長的序列。
   * `lisLen[i]` 記錄到位置 `i` 的 LIS 長度。
2. **`lowerBound` 函數**：
   * 這是為了模擬 C++ 中的 `lower_bound`，使用二分搜尋來找到 `arr` 中大於等於 `target` 的最小索引，保持 `lis` 的有效性。
3. **`minimumMountainRemovals` 函數**：
   * 計算從左至右的 LIS 長度 `lis`，並計算從右至左的 LIS 長度（這裡是 Longest Decreasing Subsequence，LDS）。因為從右至左計算完畢後需要將陣列 `lds` 反轉，以對應原始陣列位置。
   * 對每個可能的「山峰」位置，判斷其左右是否都形成了遞增和遞減的序列。若 `lis[i]` 和 `lds[i]` 都大於 1，則計算所需的移除次數並更新最小值。

```typescript
function lisLength(v: number[]): number[] {
    const lis: number[] = [v[0]];               // 初始 LIS 為第一個元素
    const lisLen: number[] = new Array(v.length).fill(1);

    for (let i = 1; i < v.length; i++) {
        if (v[i] > lis[lis.length - 1]) {       // 若當前元素比 LIS 最後一個大，則延長序列
            lis.push(v[i]);
        } else {
            const index = lowerBound(lis, v[i]);
            lis[index] = v[i];                  // 更新序列
        }
        lisLen[i] = lis.length;                 // 記錄到當前位置的 LIS 長度
    }
    return lisLen;
}

function lowerBound(arr: number[], target: number): number {
    let left = 0, right = arr.length;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] < target) left = mid + 1;
        else right = mid;
    }
    return left;
}

function minimumMountainRemovals(nums: number[]): number {
    const n = nums.length;
    const lis = lisLength(nums);      // 從左至右計算 LIS
    nums.reverse();
    const lds = lisLength(nums);      // 反轉後計算 LIS (即 LDS)
    lds.reverse();
    nums.reverse();                   // 還原原始陣列
    
    let removals = Number.MAX_SAFE_INTEGER;
    
    for (let i = 0; i < n; i++) {
        if (lis[i] > 1 && lds[i] > 1) {   // 若符合山峰條件
            removals = Math.min(removals, n + 1 - lis[i] - lds[i]);
        }
    }
    return removals;
}

```

<figure><img src="../.gitbook/assets/截圖 2024-10-30 晚上11.32.45.png" alt=""><figcaption></figcaption></figure>

