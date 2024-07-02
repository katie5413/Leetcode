# Single Number

Given a **non-empty** array of integers `nums`, every element appears *twice* except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

**Example 1:**

```
Input: nums = [2,2,1]
Output: 1

```

**Example 2:**

```
Input: nums = [4,1,2,1,2]
Output: 4

```

**Example 3:**

```
Input: nums = [1]
Output: 1

```

**Constraints:**

- `1 <= nums.length <= 3 * 10^4`
- `3 * 10^4 <= nums[i] <= 3 * 10^4`
- Each element in the array appears twice except for one element which appears only once.

```jsx
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let check = [];
    let double = [];
    
    for(let i in nums){
        if(check.indexOf(nums[i])<0){
            check.push(nums[i]);
        } else {
            double.push(nums[i])
        }
    }
    for(let j in nums){
        // 未出現過
        if(double.indexOf(nums[j])<0){
            return(nums[j])
        }
    }
};
```

## 先排再仿造 **Remove Duplicates from Sorted Array** 的做法

```jsx
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let sortedNums = nums.sort()
    for(i=0;i<sortedNums.length;i++){
       if( sortedNums[i]!==sortedNums[i+1]) return sortedNums[i]
        i++;
    }
};
```

## XOR

- XOR 操作的特性：
    - 對於任意數字 `a`，`a ^ a = 0`。
    - 對於任意數字 `a` 和 `0`，`a ^ 0 = a`。
    - XOR 操作是交換律和結合律的，因此順序不影響結果。

由於每個數字與自己異或結果為 0，且異或操作是交換律和結合律的，因此所有出現兩次的數字都會相互抵消（結果為 0），剩下唯一沒有被抵消的數字就是那個只出現一次的數字。

```jsx
var singleNumber = function(nums) {
    let result = 0;
    for (let i = 0; i < nums.length; i++) {
        result ^= nums[i];
    }
    return result;
};
```

這段代碼利用 XOR 操作的特性找到數組中唯一不重複的數字。

時間複雜度為 O(n)，空間複雜度為 O(1)