# 3Sum

20230501

key-words: `Medium`, `Array & String`, `two-pointer`

題目要求：

給數字陣列，並回傳一個陣列，裡面裝三個一組相加為 0 的數字


```
nums = [-1, 0, 1, 2, -1, -4],
ans:
[
  [-1, 0, 1],
  [-1, -1, 2]
]
```

### note

2-Sum 的變形

在排除重複的地方卡了好久，最後還是偷看了答案



```jsx

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let res = []
    // sort asc
    nums = nums.sort((a,b) => a-b)
    let len = nums.length;
    for(let i = 0; i < len; i++){
        // 如果最小的已經大於 0 ，就不用玩了
        if(nums[i] > 0){
            break;
        }
        
        // 排除相同答案 
        if(i > 0 && nums[i] == nums[i - 1]){
            continue;
        }

        let temp = -nums[i] // 固定 num[i] 後，剩下兩個的和
        let a = i + 1 // i 往後一個
        let b = len - 1 // 由後往前
        while(a < b){
            if(nums[a] + nums[b] === temp){
                // 找到，丟進 res 裏面暫存
                res.push([nums[i],nums[a],nums[b]])
                // 排除相同答案
                while(a < b && nums[a] === nums[a+1]) a++;
                while(a < b && nums[b] === nums[b-1]) b--;
                // 移動兩個pointer
                a++;b--;
            }else if(nums[a] + nums[b] < temp){
                // 加起來太小就移動a
                a++;
            }else if(nums[a] + nums[b] > temp){
                // 加起來太大就移動b
                b--;
            }
        }
    }
    return res;
};

```