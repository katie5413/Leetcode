# Sort the Jumbled Numbers (M)

[2191. Sort the Jumbled Numbers](https://leetcode.com/problems/sort-the-jumbled-numbers/)



You are given a **0-indexed** integer array `mapping` which represents the mapping rule of a shuffled decimal system. `mapping[i] = j` means digit `i` should be mapped to digit `j` in this system.

The **mapped value** of an integer is the new integer obtained by replacing each occurrence of digit `i` in the integer with `mapping[i]` for all `0 <= i <= 9`.

You are also given another integer array `nums`. Return _the array_ `nums` _sorted in **non-decreasing** order based on the **mapped values** of its elements._

**Notes:**

* Elements with the same mapped values should appear in the **same relative order** as in the input.
* The elements of `nums` should only be sorted based on their mapped values and **not be replaced** by them.

&#x20;

**Example 1:**

<pre><code><strong>Input: mapping = [8,9,4,0,2,1,3,5,7,6], nums = [991,338,38]
</strong><strong>Output: [338,38,991]
</strong><strong>Explanation: 
</strong>Map the number 991 as follows:
1. mapping[9] = 6, so all occurrences of the digit 9 will become 6.
2. mapping[1] = 9, so all occurrences of the digit 1 will become 9.
Therefore, the mapped value of 991 is 669.
338 maps to 007, or 7 after removing the leading zeros.
38 maps to 07, which is also 7 after removing leading zeros.
Since 338 and 38 share the same mapped value, they should remain in the same relative order, so 338 comes before 38.
Thus, the sorted array is [338,38,991].
</code></pre>

**Example 2:**

<pre><code><strong>Input: mapping = [0,1,2,3,4,5,6,7,8,9], nums = [789,456,123]
</strong><strong>Output: [123,456,789]
</strong><strong>Explanation: 789 maps to 789, 456 maps to 456, and 123 maps to 123. Thus, the sorted array is [123,456,789].
</strong></code></pre>

&#x20;

**Constraints:**

* `mapping.length == 10`
* `0 <= mapping[i] <= 9`
* All the values of `mapping[i]` are **unique**.
* `1 <= nums.length <= 3 * 10^4`
* `0 <= nums[i] < 10^9`



### Map 紀錄轉換前後的值，Sort 時，用轉換後的做比較

```typescript
function sortJumbled(mapping: number[], nums: number[]): number[] {
    const record = new Map<number, number>()
    for (let i = 0; i < nums.length; i++) {
        const digit = nums[i].toString().split('')

        for (let j = 0; j < digit.length; j++) {
            digit[j] = mapping[digit[j]].toString()
        }

        record.set(nums[i], parseInt(digit.join(''), 10))
    }

    return nums.sort((a, b) => record.get(a) - record.get(b))
};
```



### 濃縮版用一個 Fn 包住

```typescript
function sortJumbled(mapping: number[], nums: number[]): number[] {
    // 將數字轉換為對應的映射數字
    const convertNumber = (num: number): number => {
        return parseInt(
            String(num)
            .split('')
            .map(digit => mapping[parseInt(digit)]) // 根據映射轉換每個數位
            .join('') // 組合成新的字串
        );
    };

    // 生成包含轉換後數字和原始數字的二元組
    const mappedNums = nums.map(num => [convertNumber(num), num] as [number, number]);

    // 使用穩定排序按轉換後的數字排序
    mappedNums.sort((a, b) => a[0] - b[0]);

    // 提取排序後的原始數字
    return mappedNums.map(item => item[1]);
}
```
