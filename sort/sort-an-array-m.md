# Sort an Array (M)

[912. Sort an Array](https://leetcode.com/problems/sort-an-array/)



Given an array of integers `nums`, sort the array in ascending order and return it.

You must solve the problem **without using any built-in** functions in `O(nlog(n))` time complexity and with the smallest space complexity possible.

&#x20;

**Example 1:**

<pre><code><strong>Input: nums = [5,2,3,1]
</strong><strong>Output: [1,2,3,5]
</strong><strong>Explanation: After sorting the array, the positions of some numbers are not changed (for example, 2 and 3), while the positions of other numbers are changed (for example, 1 and 5).
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: nums = [5,1,1,2,0,0]
</strong><strong>Output: [0,0,1,1,2,5]
</strong><strong>Explanation: Note that the values of nums are not necessairly unique.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= nums.length <= 5 * 10^4`
* `-5 * 104 <= nums[i] <= 5 * 10^4`



### MergeSort

時間複雜度：O(nlog(n))&#x20;

```typescript
function sortArray(nums: number[]): number[] {
    if (nums.length <= 1) {
        return nums; // 基礎情況：數組長度為 0 或 1 時，直接返回數組
    }

    const mid = Math.floor(nums.length / 2);
    const left = sortArray(nums.slice(0, mid));
    const right = sortArray(nums.slice(mid));

    return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
    const sortedArray: number[] = [];
    let i = 0, j = 0;

    // 合併兩個已排序的數組
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            sortedArray.push(left[i]);
            i++;
        } else {
            sortedArray.push(right[j]);
            j++;
        }
    }

    // 如果左邊數組還有剩餘元素
    while (i < left.length) {
        sortedArray.push(left[i]);
        i++;
    }

    // 如果右邊數組還有剩餘元素
    while (j < right.length) {
        sortedArray.push(right[j]);
        j++;
    }

    return sortedArray;
}
```

1. 基礎情況:
   * 如果數組長度小於等於 1，直接返回數組，這樣可以正確退出遞迴。
2. 分割:
   * 將數組分成兩部分：左半部分和右半部分。
3. 遞迴:
   * 對左半部分和右半部分分別進行遞迴排序。
4. 合併:
   * 使用 merge 函數將兩個已排序的數組合併成一個排序好的數組。
5. 合併過程:
   * 初始化一個空的數組 sortedArray。
   * 使用兩個指針 i 和 j 分別遍歷 left 和 right 數組，將較小的元素依次加入 sortedArray 中。
   * 如果 left 或 right 數組還有剩餘元素，將其加入 sortedArray 中。
