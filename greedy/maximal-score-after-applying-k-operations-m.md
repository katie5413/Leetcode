# Maximal Score After Applying K Operations (M)

[2530. Maximal Score After Applying K Operations](https://leetcode.com/problems/maximal-score-after-applying-k-operations/)



You are given a **0-indexed** integer array `nums` and an integer `k`. You have a **starting score** of `0`.

In one **operation**:

1. choose an index `i` such that `0 <= i < nums.length`,
2. increase your **score** by `nums[i]`, and
3. replace `nums[i]` with `ceil(nums[i] / 3)`.

Return _the maximum possible **score** you can attain after applying **exactly**_ `k` _operations_.

The ceiling function `ceil(val)` is the least integer greater than or equal to `val`.

&#x20;從給定的數組 `nums` 中選出最大值，將其累加到一個總分 `score`，然後將該數字除以3，向上取整後再放回到數組中。這個過程重複 `k` 次，最後返回累加的總分

**Example 1:**

<pre><code><strong>Input: nums = [10,10,10,10,10], k = 5
</strong><strong>Output: 50
</strong><strong>Explanation: Apply the operation to each array element exactly once. The final score is 10 + 10 + 10 + 10 + 10 = 50.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: nums = [1,10,3,3,3], k = 3
</strong><strong>Output: 17
</strong><strong>Explanation: You can do the following operations:
</strong><strong>Operation 1: Select i = 1, so nums becomes [1,4,3,3,3]. Your score increases by 10.
</strong><strong>Operation 2: Select i = 1, so nums becomes [1,2,3,3,3]. Your score increases by 4.
</strong><strong>Operation 3: Select i = 2, so nums becomes [1,1,1,3,3]. Your score increases by 3.
</strong>The final score is 10 + 4 + 3 = 17.
</code></pre>

&#x20;

**Constraints:**

* `1 <= nums.length, k <= 10^5`
* `1 <= nums[i] <= 10^9`



* **時間複雜度**：每次從優先佇列中取出或加入元素的時間複雜度是 `O(log n)`，共進行 `k` 次操作，時間複雜度為 `O(k log n)`，其中 `n` 是 `nums` 的長度。
* **空間複雜度**：`O(n)`，因為優先佇列最多會存放 `n` 個元素。

Ref. [https://leetcode.com/problems/maximal-score-after-applying-k-operations/solutions/5909284/easy-with-10lines-of-code](https://leetcode.com/problems/maximal-score-after-applying-k-operations/solutions/5909284/easy-with-10lines-of-code)

```typescript
const maxKelements = function (nums: number[], k: number): number {
  // 初始化最大優先佇列，確保可以快速取得當前最大值
  const pq = new MaxPriorityQueue({ compare: (a, b) => b - a });
  
  // 將 nums 中的每個數字加入優先佇列
  for (const num of nums) {
    pq.enqueue(num);
  }

  let score = 0; // 初始化累積分數
  
  // 重複 k 次操作
  while (k) {
    // 取出當前佇列中的最大值
    const ele = pq.dequeue();
    
    // 將最大值加入到總分中
    score += ele;
    
    // 將該數字除以 3 向上取整後重新加入佇列
    pq.enqueue(Math.ceil(ele / 3));
    
    // 減少 k 次數
    k--;
  }
  
  // 返回最終累積的總分
  return score;
}

```

#### 步驟詳解：

1. **初始化最大優先佇列**：
   * 透過 `MaxPriorityQueue` 來實現自動排序，使得每次可以方便地取出數組中的最大值。
2. **將數組中的每個數字加入優先佇列**：
   * 迭代 `nums`，將每個數字加入到優先佇列中。
3. **處理 k 次操作**：
   * 取出優先佇列中的最大值，將其累加到 `score`。
   * 然後將該數字除以3，並向上取整，將結果重新放回優先佇列。
   * 重複這個操作 `k` 次。
4. **返回結果**：
   * 當 `k` 次操作結束後，返回最終的 `score`。
