# 3Sum

Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.

Notice that the solution set must not contain duplicate triplets.

**Example 1:**

```
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation:
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.

```

**Example 2:**

```
Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.

```

**Example 3:**

```
Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.

```

**Constraints:**

- `3 <= nums.length <= 3000`
- `10^5 <= nums[i] <= 10^5`

```markdown
題目要求：

給數字陣列，並回傳一個陣列，裡面裝三個一組相加為 0 的數字
```

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