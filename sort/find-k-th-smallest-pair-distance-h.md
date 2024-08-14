# Find K-th Smallest Pair Distance (H)

[719. Find K-th Smallest Pair Distance](https://leetcode.com/problems/find-k-th-smallest-pair-distance/)



The **distance of a pair** of integers `a` and `b` is defined as the absolute difference between `a` and `b`.

Given an integer array `nums` and an integer `k`, return _the_ `kth` _smallest **distance among all the pairs**_ `nums[i]` _and_ `nums[j]` _where_ `0 <= i < j < nums.length`.

&#x20;

**Example 1:**

<pre><code><strong>Input: nums = [1,3,1], k = 1
</strong><strong>Output: 0
</strong><strong>Explanation: Here are all the pairs:
</strong>(1,3) -> 2
(1,1) -> 0
(3,1) -> 2
Then the 1st smallest distance pair is (1,1), and its distance is 0.
</code></pre>

**Example 2:**

<pre><code><strong>Input: nums = [1,1,1], k = 2
</strong><strong>Output: 0
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: nums = [1,6,1], k = 3
</strong><strong>Output: 5
</strong></code></pre>

&#x20;

**Constraints:**

* `n == nums.length`
* `2 <= n <= 10^4`
* `0 <= nums[i] <= 10^6`
* `1 <= k <= n * (n - 1) / 2`



### 失敗紀錄

一開始沒有看提示，用直覺寫

發現在數量大的時候會 TLE

反思：每次更新之後就要重排，多花了不必要的時間在排已經排過的東西

```typescript
function smallestDistancePair(nums: number[], k: number): number {
    const distances: number[] = []
    // 找到每個陣列元素之間的距離
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            // 在還沒滿 k 個之前都視為潛在選手
            if (distances.length < k) {
                distances.push(Math.abs(nums[i] - nums[j]))
            } else {
                // 等於或超過後只要跟最後一個比再決定要不要讓他進來
                // 如果超過就踢掉，並推入最新的
                if (distances[k - 1] > Math.abs(nums[i] - nums[j])) {
                    distances.pop()
                    distances.push(Math.abs(nums[i] - nums[j]))
                }
                distances.sort((a, b) => a - b)
            }

        }
    }

    return distances[k - 1]

};
```



### Binary Search

看到別人分享的思路 [https://leetcode.com/problems/find-k-th-smallest-pair-distance/solutions/5633266/simple-solution-using-binary-search-96-beats-in-every-languages-with-explanation](https://leetcode.com/problems/find-k-th-smallest-pair-distance/solutions/5633266/simple-solution-using-binary-search-96-beats-in-every-languages-with-explanation)



#### 方法

1. **排序**: 將數組排序以便於計算配對距離。
2. **二分搜尋**: 使用二分搜尋來查找配對距離。左指標從 0 開始，右指標從可能的最大距離（數組中最大數字與最小數字之間的差）開始。
3. **計算配對數量**: 對於每個中間值，計算有多少對配對的距離小於或等於中間值。如果數量大於或等於 k，則將右指標移動到中間值；否則，將左指標移動到中間值 + 1。
4. **結果**: 當循環結束時，左指標的值將是第 k 小的配對距離。

#### 複雜度

* **時間複雜度**: O(N LogN)
* **空間複雜度**: O(1)

```typescript
function smallestDistancePair(nums: number[], k: number): number {
    // 將數組進行排序，方便計算配對距離
    nums.sort((a, b) => a - b);
    let n = nums.length;
    // 設定左指標為 0，右指標為數組中最大數字與最小數字之間的差
    let left = 0, right = nums[n - 1] - nums[0];

    while (left < right) {
        // 計算中間值
        let mid = Math.floor((left + right) / 2);
        let count = 0, j = 0;

        // 計算配對距離小於或等於 mid 的對數
        for (let i = 0; i < n; i++) {
            while (j < n && nums[j] - nums[i] <= mid) j++;
            count += j - i - 1;
        }

        // 根據配對數量來調整左右指標
        if (count >= k) right = mid;  // 如果配對數量大於或等於 k，移動右指標
        else left = mid + 1;          // 否則，移動左指標
    }

    // 返回第 k 小的配對距離
    return left;
};

```

