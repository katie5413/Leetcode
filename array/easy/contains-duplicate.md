# Contains Duplicate

Given an integer array `nums`, return `true`  if any value appears **at least twice**  in the array, and return `false`  if every element is distinct.

**Example 1:**

```
Input: nums = [1,2,3,1]
Output: true
```

**Example 2:**

```
Input: nums = [1,2,3,4]
Output: false
```

**Example 3:**

```
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true

```

### 用陣列儲存檢查過的

indexOf 如果陣列中有符合的就會回傳會該索引值，若無則為 -1

```jsx
/**
 * @param {number[]} nums
 * @return {boolean}
 */

var containsDuplicate = function(nums) {
    let check = [];
    for(let i in nums){
        if(check.indexOf(nums[i])<0){
            check.push(nums[i]);
        } else {
            return true;
        }
    }
    return false;
};
```

## ChatGPT 的回答

```tsx
function containsDuplicate(nums: number[]): boolean {
    const seen = new Set<number>();

    for (const num of nums) {
        if (seen.has(num)) {
            return true;
        }
        seen.add(num);
    }

    return false;
}
```
