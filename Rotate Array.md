

```
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
```
### Note: 發現大多數問題是沒看清楚題意

k 可以大於陣列的數字，因此原本的寫法會噴錯

#### push(): 添加一個或多個元素至陣列的末端，並且回傳陣列的新長度
#### pop(): 移除並回傳陣列的最後一個元素。此方法會改變陣列的長度

#### unshift(''): 添加一個或多個元素至陣列的開頭，並且回傳陣列的新長度
#### shift(): 移除並回傳陣列的第一個元素。此方法會改變陣列的長度
 

```javascript
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