# Intersection of Two Arrays II (E)

[350. Intersection of Two Arrays II](https://leetcode.com/problems/intersection-of-two-arrays-ii/)



Given two integer arrays `nums1` and `nums2`, return _an array of their intersection_. Each element in the result must appear as many times as it shows in both arrays and you may return the result in **any order**.

**Example 1:**

```
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]

```

**Example 2:**

```
Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [4,9]
Explanation: [9,4] is also accepted.

```

**Constraints:**

* `1 <= nums1.length, nums2.length <= 1000`
* `0 <= nums1[i], nums2[i] <= 1000`

**Follow up:**

* What if the given array is already sorted? How would you optimize your algorithm?
* What if `nums1`'s size is small compared to `nums2`'s size? Which algorithm is better?
* What if elements of `nums2` are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?



### IndexOf

```jsx
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
  let check = []

  const longer = nums1.length>=nums2.length?nums1:nums2;
  const shorter = nums1.length<nums2.length?nums1:nums2;
  
  for(let i in shorter){
    // 找到的位置
    let index = longer.indexOf(shorter[i]);
    // 如果長的有找到
    if(index>-1){
      // 把數字加進去
      check.push(shorter[i]);
      // 從長的抽掉，避免重複
      longer.splice(index,1);
    }
  }
  return check
};
```

### Map

```jsx
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  let map = new Map();
  let result = [];
  let n1 = nums2.length;
  let n2 = nums1.length;  
 
  for (let i = 0; i < n1; i++) {
    if (map.has(nums2[i])) {
      map.set(nums2[i], map.get(nums2[i]) + 1);
    } else {
      map.set(nums2[i], 1);
    }
  }

  for (let i = 0; i < n2; i++) {
    if (map.has(nums1[i]) && map.get(nums1[i]) >= 1) {
      result.push(nums1[i]);
      map.set(nums1[i], map.get(nums1[i]) - 1);
    }
  }
  
  return result;
};
```

### bucket

時間 _O_(_M_+_N_) 空間 _O_(_M_)

```jsx
function intersect(nums1: number[], nums2: number[]): number[] {
    const count: { [key: number]: number } = {};
    const result: number[] = []

    // 有重複也要重複多次，因此要記錄次數
    // 計算陣列中元素的頻率，並產生 hash table
    for (const num of nums1) {
        count[num] = (count[num] || 0) + 1;
    }

    for (const num of nums2) {
        // 遍歷時，有重複就扣一並傳到 result 
        if(count[num]){
            count[num] --;
            result.push(num);
        }
    }

    return result
};
```
