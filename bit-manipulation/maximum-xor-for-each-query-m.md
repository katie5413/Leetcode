# Maximum XOR for Each Query (M)

[1829. Maximum XOR for Each Query](https://leetcode.com/problems/maximum-xor-for-each-query/)



You are given a **sorted** array `nums` of `n` non-negative integers and an integer `maximumBit`. You want to perform the following query `n` **times**:

1. Find a non-negative integer `k < 2maximumBit` such that `nums[0] XOR nums[1] XOR ... XOR nums[nums.length-1] XOR k` is **maximized**. `k` is the answer to the `ith` query.
2. Remove the **last** element from the current array `nums`.

Return _an array_ `answer`_, where_ `answer[i]` _is the answer to the_ `ith` _query_.

&#x20;

**Example 1:**

<pre><code><strong>Input: nums = [0,1,1,3], maximumBit = 2
</strong><strong>Output: [0,3,2,3]
</strong><strong>Explanation: The queries are answered as follows:
</strong>1st query: nums = [0,1,1,3], k = 0 since 0 XOR 1 XOR 1 XOR 3 XOR 0 = 3.
2nd query: nums = [0,1,1], k = 3 since 0 XOR 1 XOR 1 XOR 3 = 3.
3rd query: nums = [0,1], k = 2 since 0 XOR 1 XOR 2 = 3.
4th query: nums = [0], k = 3 since 0 XOR 3 = 3.
</code></pre>

**Example 2:**

<pre><code><strong>Input: nums = [2,3,4,7], maximumBit = 3
</strong><strong>Output: [5,2,6,5]
</strong><strong>Explanation: The queries are answered as follows:
</strong>1st query: nums = [2,3,4,7], k = 5 since 2 XOR 3 XOR 4 XOR 7 XOR 5 = 7.
2nd query: nums = [2,3,4], k = 2 since 2 XOR 3 XOR 4 XOR 2 = 7.
3rd query: nums = [2,3], k = 6 since 2 XOR 3 XOR 6 = 7.
4th query: nums = [2], k = 5 since 2 XOR 5 = 7.
</code></pre>

**Example 3:**

<pre><code><strong>Input: nums = [0,1,2,2,5,7], maximumBit = 3
</strong><strong>Output: [4,3,6,4,6,7]
</strong></code></pre>

&#x20;

**Constraints:**

* `nums.length == n`
* `1 <= n <= 10^5`
* `1 <= maximumBit <= 20`
* `0 <= nums[i] < 2maximumBit`
* `nums`​​​ is sorted in **ascending** order.





Ref. [https://leetcode.com/problems/maximum-xor-for-each-query/solutions/6021112/beats-100-very-short-simple-solution](https://leetcode.com/problems/maximum-xor-for-each-query/solutions/6021112/beats-100-very-short-simple-solution)

#### 解釋

1. **遮罩 `mask` 計算**：`mask` 使用 `(1 << maximumBit) - 1` 計算，用來限制位元長度。當 `maximumBit` 為 3 時，`mask` 為 7（二進位為 `111`），表示結果僅保留三個位元。
2. **逐步累積 XOR 運算**：透過 `curr ^= nums[i]` 逐一計算所有數字的 XOR 累積值。
3. **取反並應用遮罩**：透過 `(~curr & mask)`，將當前 XOR 結果的補數限制在指定位元長度內，以獲得最大化 XOR 的數字。
4. **倒序填充結果**：依照題意要求將結果放入倒序的 `res` 陣列中，最終返回這個結果陣列。

```typescript
function getMaximumXor(nums: number[], maximumBit: number): number[] {
    // 設定 mask，用來限制 XOR 運算的位元長度
    const mask: number = (1 << maximumBit) - 1;  // 例如 maximumBit = 3 時，mask = 111 (二進位) = 7
    const n: number = nums.length;  // nums 的長度
    const res: number[] = new Array(n);  // 初始化結果陣列
    let curr: number = 0;  // 用來儲存目前所有數字的 XOR 結果
    
    // 逐一將每個數字與 curr 進行 XOR
    for (let i = 0; i < n; i++) {
        curr ^= nums[i];  // 更新 curr 為目前所有數字的 XOR 值
        // 求出 `~curr & mask`，即為最大化 XOR 的數字，並將結果存入 res 陣列的倒數位置
        res[n - i - 1] = (~curr & mask);  // `~curr` 為 curr 的位元取反後限制在 mask 範圍
    }
    
    return res;  // 返回結果陣列
}

```

<figure><img src="../.gitbook/assets/截圖 2024-11-08 晚上11.41.02.png" alt=""><figcaption></figcaption></figure>

