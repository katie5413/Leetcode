/**
 * @param {number[]} nums
 * @return {boolean}
 */

### 用陣列儲存檢查過的

### indexOf 如果陣列中有符合的就會回傳會該索引值，若無則為 -1

```javascript
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