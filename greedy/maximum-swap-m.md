# Maximum Swap (M)

[670. Maximum Swap](https://leetcode.com/problems/maximum-swap/)



You are given an integer `num`. You can swap two digits at most once to get the maximum valued number.

Return _the maximum valued number you can get_.

&#x20;

交換只允許一次。該演算法的核心是找出能夠進行交換的最佳兩位數字，使得結果最大化



**Example 1:**

<pre><code><strong>Input: num = 2736
</strong><strong>Output: 7236
</strong><strong>Explanation: Swap the number 2 and the number 7.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: num = 9973
</strong><strong>Output: 9973
</strong><strong>Explanation: No swap.
</strong></code></pre>

&#x20;

**Constraints:**

* `0 <= num <= 10^8`



Greedy

遍歷陣列找到最大值與最小值的 index，最後決定要不要換

#### 解題思路：

1. **轉換數字為字串陣列**：先將數字轉換為字串並將每一位數字分解為陣列，這樣可以方便對每一位數字進行操作。
2. **從右至左遍歷數字**：遍歷數字的目的是找到能夠進行交換的最佳兩位數字。遍歷過程中會記錄當前的最大值，以及它的索引位置。
3. **條件判斷**：
   * 如果某個數字大於當前的最大值，則更新最大值及其位置，因為這表明有一個更大的數字可以參與交換。
   * 如果某個數字小於當前的最大值，則記錄這個數字的索引和最大值的索引，因為這可能是最佳交換機會，可以使得整體數字更大。
4. **進行交換**：如果在遍歷結束後找到了可以交換的兩個位置，則進行交換；如果沒有找到可交換的數字，表示原本的數字已經是最大值，無需進行交換。
5. **返回結果**：將數字陣列重新拼接回字串並轉回數字作為最終結果返回。

```typescript
function maximumSwap(num: number): number {
    // 將數字轉換為字串陣列
    const digits = num.toString().split("");
    // 記錄當前最大值、最大值的索引，以及最佳交換的位置
    let max = -1, maxIdx = -1, leftIdx = -1, rightIdx = -1;

    // 從右至左遍歷數字
    for (let i = digits.length - 1; i >= 0; i--) {
        const digit = parseInt(digits[i]);

        // 如果當前數字大於最大值，更新最大值和其索引位置
        if (digit > max) {
            max = digit;
            maxIdx = i;
        }
        // 如果當前數字小於最大值，記錄當前位置和最大值位置（可交換）
        else if (digit < max) {
            leftIdx = i;
            rightIdx = maxIdx;
        }
    }

    // 如果 leftIdx 為 -1，表示原數字已經是最大值
    if (leftIdx === -1) return num;

    // 交換兩個位置的數字
    [digits[leftIdx], digits[rightIdx]] = [digits[rightIdx], digits[leftIdx]];

    // 重新組合字串並轉回數字返回
    return parseInt(digits.join(""));
};
```

<figure><img src="../.gitbook/assets/截圖 2024-10-17 晚上11.33.11.png" alt=""><figcaption></figcaption></figure>

