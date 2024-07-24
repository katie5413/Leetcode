# Sort Colors (M)

[75. Sort Colors](https://leetcode.com/problems/sort-colors/)



Given an array `nums` with `n` objects colored red, white, or blue, sort them [**in-place**](https://en.wikipedia.org/wiki/In-place\_algorithm) so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers `0`, `1`, and `2` to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

&#x20;

**Example 1:**

<pre><code><strong>Input: nums = [2,0,2,1,1,0]
</strong><strong>Output: [0,0,1,1,2,2]
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: nums = [2,0,1]
</strong><strong>Output: [0,1,2]
</strong></code></pre>

&#x20;

**Constraints:**

* `n == nums.length`
* `1 <= n <= 300`
* `nums[i]` is either `0`, `1`, or `2`.

&#x20;

**Follow up:** Could you come up with a one-pass algorithm using only constant extra space?



### Edsger W. Dijkstra 荷蘭國旗問題演算法

在陣列內進行排序，時間複雜度為 O(n)，空間複雜度為 O(1)

```typescript
/**
 Do not return anything, modify nums in-place instead.
 */
function sortColors(nums: number[]): void {
    // 初始化指針
    let low = 0;   // 用於處理紅色（0）的區域的指針
    let mid = 0;   // 當前考慮的元素的指針
    let high = nums.length - 1;  // 用於處理藍色（2）的區域的指針

    // 遍歷陣列直到 mid 超過 high
    while (mid <= high) {
        if (nums[mid] === 0) {
            // 如果當前元素是紅色（0），將其移動到紅色區域
            // 交換 nums[low] 和 nums[mid]
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;   // 遞增紅色區域的結束指針
            mid++;   // 遞增當前考慮的元素指針
        } else if (nums[mid] === 1) {
            // 如果當前元素是白色（1），它已經在正確的位置
            mid++;   // 遞增當前考慮的元素指針
        } else {
            // 如果當前元素是藍色（2），將其移動到藍色區域
            // 交換 nums[mid] 和 nums[high]
            [nums[high], nums[mid]] = [nums[mid], nums[high]];
            high--;  // 遞減藍色區域的開始指針
            // 注意：不遞增 mid，因為交換後的新 nums[mid] 需要重新檢查
        }
    }
}
```





時間複雜度：由於 splice 方法會重新排列陣列，因此整體時間複雜度可能接近 O(n^2)。

空間複雜度：使用了額外的 left 和 right 陣列，空間複雜度為 O(n)。

```typescript
function sortColors(nums: number[]): void {
    // 用於存儲紅色（0）和藍色（2）的暫存陣列
    let left: number[] = [];  // 存儲值為0的元素
    let right: number[] = []; // 存儲值為2的元素

    // 遍歷 nums 陣列
    for (let i = 0; i < nums.length;) {
        if (nums[i] < 1) {
            // 如果當前元素是紅色（0），將其移到 left 陣列
            left.push(...nums.splice(i, 1));  // 從 nums 中刪除當前元素並推送到 left
        } else if (nums[i] > 1) {
            // 如果當前元素是藍色（2），將其移到 right 陣列
            right.push(...nums.splice(i, 1));  // 從 nums 中刪除當前元素並推送到 right
        } else {
            // 如果當前元素是白色（1），則不做任何操作，僅遞增 i
            i++;
        }
    }

    // 將紅色（0）的元素插入到 nums 的開頭
    nums.splice(0, 0, ...left);
    // 將藍色（2）的元素添加到 nums 的末尾
    nums.push(...right);
}
```

1. 初始化：
   1. left：用來存儲值為0的元素。
   2. &#x20;right：用來存儲值為2的元素。
2. 遍歷陣列：
   1. 使用 for 循環遍歷 nums 陣列。
   2. 根據當前元素的值（0、1或2）進行不同處理：
   3. 如果 nums\[i] < 1（即 nums\[i] 是 0），將該元素移到 left 陣列中。
   4. 如果 nums\[i] > 1（即 nums\[i] 是 2），將該元素移到 right 陣列中。
   5. 如果 nums\[i] 是 1，則不進行任何操作，遞增 i 來處理下一個元素。
3.  更新陣列：

    1. 將 left 陣列中的元素插入到 nums 陣列的開頭。
    2. 將 right 陣列中的元素添加到 nums 陣列的末尾。



splice 方法：splice 用來刪除或插入陣列中的元素。在這裡，nums.splice(i, 1) 會刪除 nums 中索引 i 的元素，並返回這個被刪除的元素。push(...items) 方法會將 items 陣列中的元素添加到 right 陣列的末尾。

i++ 的影響：當前元素是 1 時，i 遞增是必需的，因為元素的長度在變化。如果當前元素是 0 或 2，對應的元素會被從 nums 中移除，這會導致 nums 長度減少，因此不需要遞增
