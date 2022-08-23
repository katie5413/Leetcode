
```javascript
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

### 用 library 

```javascript
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