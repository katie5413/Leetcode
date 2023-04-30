/**
 * @param {number[]} nums
 * @return {number}
 */

```javascript
var removeDuplicates = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == nums[i + 1]) {
      nums.splice(i, 1);
      i--;
    }
  }
  return nums.length;
};


// 從後面檢查，可以避免 splice 會讓陣列位置改變的問題
var removeDuplicates = function(nums) {
  for (let i = nums.length + 1; i > 0; i--) {
    if (nums[i] == nums[i-1]) {
      nums.splice(i, 1);
    }
  }
  return nums.length;
};

```