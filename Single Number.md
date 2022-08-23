/**
 * @param {number[]} nums
 * @return {number}
 */

```javascript
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

### 先排再仿造 Remove Duplicates from Sorted Array 的做法
```javascript
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

### XOR
```javascript
var singleNumber = function(nums) {
    let result = 0;
    for (let i = 0; i < nums.length; i++) {
        result ^= nums[i];
    }
    return result;
};
```