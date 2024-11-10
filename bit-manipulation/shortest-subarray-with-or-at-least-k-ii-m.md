# Shortest Subarray With OR at Least K II (M)

[3097. Shortest Subarray With OR at Least K II](https://leetcode.com/problems/shortest-subarray-with-or-at-least-k-ii/)



You are given an array `nums` of **non-negative** integers and an integer `k`.

An array is called **special** if the bitwise `OR` of all of its elements is **at least** `k`.

Return _the length of the **shortest**_ _**special**_ _**non-empty**_&#x20;

_subarray of_ `nums`, _or return_ `-1` _if no special subarray exists_.

&#x20;

找出一個最短的子陣列，使得該子陣列中所有元素的位元「或」（bitwise OR）運算結果至少等於 `k`，並返回該子陣列的長度。如果不存在符合條件的子陣列，則返回 `-1`。



**Example 1:**

**Input:** nums = \[1,2,3], k = 2

**Output:** 1

**Explanation:**

The subarray `[3]` has `OR` value of `3`. Hence, we return `1`.

**Example 2:**

**Input:** nums = \[2,1,8], k = 10

**Output:** 3

**Explanation:**

The subarray `[2,1,8]` has `OR` value of `11`. Hence, we return `3`.

**Example 3:**

**Input:** nums = \[1,2], k = 0

**Output:** 1

**Explanation:**

The subarray `[1]` has `OR` value of `1`. Hence, we return `1`.

&#x20;

**Constraints:**

* `1 <= nums.length <= 2 * 10^5`
* `0 <= nums[i] <= 10^9`
* `0 <= k <= 10^9`



### Slide Window

Ref. [https://leetcode.com/problems/shortest-subarray-with-or-at-least-k-ii/solutions/6028830/optimal-solution-in-typescript-beats-100](https://leetcode.com/problems/shortest-subarray-with-or-at-least-k-ii/solutions/6028830/optimal-solution-in-typescript-beats-100)

#### 程式碼解析

1. **初始化**：
   * `n`：儲存 `nums` 陣列的長度。
   * `ans`：設為 `n + 1`（比 `n` 大 1），用於追蹤找到的最短子陣列長度。
   * `cnt`：用來統計各位元位置（bit position）上出現的「1」次數，並初始化為 32 個「0」，表示 32 位元的每個位元位置初始值都是 0。
   * `s`：用來儲存目前子陣列的位元「或」的結果。
2. **雙指針滑動窗口**：
   * `j`：代表子陣列的右邊界。
   * `i`：代表子陣列的左邊界。
   * 當 `j` 向右移動並加入新的元素時，更新 `s` 為目前窗口中所有元素的位元「或」結果。
3. **更新位元計數器**：
   * 對於 `nums[j]` 的每個位元位置 `h`，如果該位元為「1」，則將 `cnt[h]` 對應位置的計數器加 1。
4. **縮減左邊界 i**：
   * 當 `s` 大於等於 `k` 時，說明我們找到了符合條件的子陣列。
   * 更新 `ans` 為目前子陣列長度 `j - i + 1` 的最小值。
   * 將 `i` 右移一格，以縮小子陣列範圍，並更新每個位元位置的計數器：
     * 如果 `nums[i]` 的某個位元位置為「1」，將 `cnt[h]` 減 1。
     * 當某個位元位置的計數為 0 時，表示此位元位置已不再有「1」，則將該位元位置從 `s` 中移除。
5. **回傳結果**：
   * 若 `ans` 為 `n + 1`，說明沒有符合條件的子陣列，返回 `-1`；否則，返回 `ans`，即最短子陣列長度。



```typescript
function minimumSubarrayLength(nums: number[], k: number): number {
    // 取得陣列長度
    const n = nums.length;
    // 設定初始最短長度為陣列長度 + 1（用來表示未找到符合條件的子陣列）
    let ans = n + 1;
    
    // 記錄每個位元位置（0~31）中，該位置上「1」的出現次數
    const cnt: number[] = new Array<number>(32).fill(0);
    
    // 儲存目前子陣列的位元「或」結果
    let s = 0;

    // 使用雙指針 i 和 j 來處理滑動窗口
    for (let i = 0, j = 0; j < n; ++j) {
        // 更新當前子陣列的位元「或」結果
        s |= nums[j];

        // 計算 nums[j] 的每一個位元位置上「1」的次數
        for (let h = 0; h < 32; ++h) {
            // 如果 nums[j] 的第 h 位元是 1，則 cnt[h] 加 1
            if ((nums[j] >> h) & 1) {
                ++cnt[h];
            }
        }

        // 當位元「或」結果大於等於 k，開始縮小左邊界
        while (s >= k && i <= j) {
            // 計算目前窗口的長度，並更新最小長度
            ans = Math.min(ans, j - i + 1);

            // 更新子陣列左邊界 i，並調整位元計數器
            for (let h = 0; h < 32; ++h) {
                // 如果 nums[i] 的第 h 位元是 1
                if ((nums[i] >> h) & 1) {
                    // 將 cnt[h] 減 1
                    if (--cnt[h] === 0) {
                        // 如果某個位元的計數為 0，則從 s 中移除該位元
                        s ^= (1 << h);
                    }
                }
            }
            // 左邊界 i 右移一位
            i++;
        }
    }

    // 如果沒有找到符合條件的子陣列，則返回 -1
    return ans === n + 1 ? -1 : ans;
};

```

<figure><img src="../.gitbook/assets/截圖 2024-11-10 下午3.52.39.png" alt=""><figcaption></figcaption></figure>

