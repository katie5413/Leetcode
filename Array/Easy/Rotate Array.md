# Rotate Array

Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.

**Example 1:**

```
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]

```

**Example 2:**

```
Input: nums = [-1,-100,3,99], k = 2
Output: [3,99,-1,-100]
Explanation:
rotate 1 steps to the right: [99,-1,-100,3]
rotate 2 steps to the right: [3,99,-1,-100]

```

**Constraints:**

- `1 <= nums.length <= 10^5`
- `2^31 <= nums[i] <= 2^31 - 1`
- `0 <= k <= 10^5`

**Follow up:**

- Try to come up with as many solutions as you can. There are at least **three** different ways to solve this problem.
- Could you do it in-place with `O(1)` extra space?

[Explore - LeetCode](https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/646/)

### ### Note: 發現大多數問題是沒看清楚題意

k 可以大於陣列的數字，因此原本的寫法會噴錯

```jsx
push(): 添加一個或多個元素至陣列的末端，並且回傳陣列的新長度
pop(): 移除並回傳陣列的最後一個元素。此方法會改變陣列的長度

unshift(''): 添加一個或多個元素至陣列的開頭，並且回傳陣列的新長度
shift(): 移除並回傳陣列的第一個元素。此方法會改變陣列的長度
```

```jsx
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    // ex. [1,2,3] k=5  與 [1,2,3] k=2 相同  
    let step = k%nums.length;
    let temp = [];

    // 將向右旋轉的元素裝到temp, [1,2,3] k=2, temp = [2,3] 
    for(let i = step - 1 ; i >= 0 ; i--) {
        let index = nums.length-1-i;
        temp.push(nums[index]);
    }

    for(let j = nums.length - 1; j >= 0 ; j--){
        if( j >= step){
            // 將nums內沒被旋轉的元素往後移k格，[1,2,3] -> [x,x,1] 
            nums[j] = nums[j-step];
        } else {
            // 將temp放到nums的前面 [2,3,1]
            nums[j] = temp[j];
        }
    }
}
```

## 方法一：使用額外的陣列

我們可以創建一個新的陣列，然後將原陣列中的元素按旋轉後的位置放入新的陣列中，最後將新的陣列的值複製回原陣列中。

### 程式碼

```tsx

function rotate(nums: number[], k: number): void {
    const n = nums.length;
    k = k % n; // 處理 k 大於陣列長度的情況
    const rotated = new Array(n);

    for (let i = 0; i < n; i++) {
        rotated[(i + k) % n] = nums[i];
    }

    for (let i = 0; i < n; i++) {
        nums[i] = rotated[i];
    }
}

```

### 解釋

1. `k = k % n`：處理當 k 大於陣列長度時的情況，這樣就只需要旋轉 k % n 次即可。
2. 創建一個新的陣列 `rotated`。
3. 遍歷原陣列，將每個元素移動到新的位置 `(i + k) % n`。
4. 將 `rotated` 中的值複製回原陣列 `nums` 中。

## 方法二：原地旋轉（O(1) 空間）

這種方法不需要額外的陣列，只需要在原陣列上進行操作。具體做法如下：

1. 先將整個陣列反轉。
2. 然後反轉前 k 個元素。
3. 最後反轉剩下的元素。

### 程式碼

```tsx
function rotate(nums: number[], k: number): void {
    const n = nums.length;
    k = k % n;

    reverse(nums, 0, n - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, n - 1);
}

function reverse(nums: number[], start: number, end: number): void {
    while (start < end) {
        [nums[start], nums[end]] = [nums[end], nums[start]];
        start++;
        end--;
    }
}

```

### 解釋

1. `k = k % n`：處理當 k 大於陣列長度時的情況。
2. `reverse(nums, 0, n - 1)`：反轉整個陣列。
3. `reverse(nums, 0, k - 1)`：反轉前 k 個元素。
4. `reverse(nums, k, n - 1)`：反轉剩下的元素。

這樣就能在 O(1) 的額外空間內完成旋轉。