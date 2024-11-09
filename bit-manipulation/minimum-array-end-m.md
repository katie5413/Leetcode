# Minimum Array End (M)

[3133. Minimum Array End](https://leetcode.com/problems/minimum-array-end/)



You are given two integers `n` and `x`. You have to construct an array of **positive** integers `nums` of size `n` where for every `0 <= i < n - 1`, `nums[i + 1]` is **greater than** `nums[i]`, and the result of the bitwise `AND` operation between all elements of `nums` is `x`.

Return the **minimum** possible value of `nums[n - 1]`.

&#x20;

給定兩個整數 `n` 和 `x`，需要構建一個大小為 `n` 的正整數陣列 `nums`，要求滿足以下條件：

1. 對於每個 0≤i\<n−10 \leq i < n - 10≤i\<n−1，`nums[i + 1]` 必須大於 `nums[i]`。
2. `nums` 中所有元素的位元「與」運算（bitwise AND）結果必須等於 `x`。
3. 返回 `nums[n - 1]` 的最小可能值。

目標是找到一個符合條件的陣列，使得陣列最後一個數值（`nums[n - 1]`）最小。



**Example 1:**

**Input:** n = 3, x = 4

**Output:** 6

**Explanation:**

`nums` can be `[4,5,6]` and its last element is 6.

**Example 2:**

**Input:** n = 2, x = 7

**Output:** 15

**Explanation:**

`nums` can be `[7,15]` and its last element is 15.

&#x20;

**Constraints:**

* `1 <= n, x <= 10^8`





#### 解釋

1. **初始化 `result` 和 `remaining`**：
   * `result` 變數一開始設定為 `x` 的 BigInt 版本。
   * `remaining` 表示我們剩餘的調整次數，初始值為 `n - 1`，並轉為 BigInt。
2. **位元逐步檢查和調整**：
   * 迴圈的主要目的是遍歷 `position` 位元，判斷是否可以改變 `result` 的值。
   * 如果 `x` 的當前位元為 0（即 `(BigInt(x) & position) === 0n`），則檢查 `remaining` 當前位元，若此位元為 1 則將 `result` 的此位元設為 1。
   * `remaining` 右移一位，用來檢查下一位是否符合設置條件。
3. **返回結果**：
   * 最後，將 BigInt `result` 轉為數字型別並返回。

Ref. [https://leetcode.com/problems/minimum-array-end/solutions/6024884/beats-100-o-1-short-simple-explained-bitmasking](https://leetcode.com/problems/minimum-array-end/solutions/6024884/beats-100-o-1-short-simple-explained-bitmasking)

```typescript
function minEnd(n: number, x: number): number {
    // 將 x 轉為 BigInt 型別，並初始化為 result
    let result: bigint = BigInt(x);
    
    // 剩餘計數為 n - 1，將 n 轉為 BigInt
    let remaining: bigint = BigInt(n - 1);
    
    // 位置指標，用來檢查每個位元，初始值為 1n（二進位最右側）
    let position: bigint = 1n;
    
    // 當還有剩餘計數需要處理時，進行迴圈
    while (remaining > 0n) {
        
        // 檢查 x 在當前 position 的位元是否為 0，如果為 0 則表示可以修改
        if ((BigInt(x) & position) === 0n) {
            
            // 如果 remaining 在當前位元為 1，則將 result 在該位元設為 1
            result |= (remaining & 1n) * position;
            
            // 將 remaining 右移一位，準備下一位的檢查
            remaining >>= 1n;
        }
        
        // 將 position 左移一位，以便檢查下一位元
        position <<= 1n;
    }
    
    // 將最終結果轉回 Number 類型並返回
    return Number(result);
}

```

<figure><img src="../.gitbook/assets/截圖 2024-11-09 晚上11.19.10.png" alt=""><figcaption></figcaption></figure>

