# Minimum Difference Between Largest and Smallest Value in Three Moves

You are given an integer array `nums`.

In one move, you can choose one element of `nums` and change it to **any value**.

Return *the minimum difference between the largest and smallest value of `nums` **after performing at most three moves***.

**Example 1:**

```
Input: nums = [5,3,2,4]
Output: 0
Explanation: We can make at most 3 moves.
In the first move, change 2 to 3. nums becomes [5,3,3,4].
In the second move, change 4 to 3. nums becomes [5,3,3,3].
In the third move, change 5 to 3. nums becomes [3,3,3,3].
After performing 3 moves, the difference between the minimum and maximum is 3 - 3 = 0.

```

**Example 2:**

```
Input: nums = [1,5,0,10,14]
Output: 1
Explanation: We can make at most 3 moves.
In the first move, change 5 to 0. nums becomes [1,0,0,10,14].
In the second move, change 10 to 0. nums becomes [1,0,0,0,14].
In the third move, change 14 to 1. nums becomes [1,0,0,0,1].
After performing 3 moves, the difference between the minimum and maximum is 1 - 0 = 1.
It can be shown that there is no way to make the difference 0 in 3 moves.
```

**Example 3:**

```
Input: nums = [3,100,20]
Output: 0
Explanation: We can make at most 3 moves.
In the first move, change 100 to 7. nums becomes [3,7,20].
In the second move, change 20 to 7. nums becomes [3,7,7].
In the third move, change 3 to 7. nums becomes [7,7,7].
After performing 3 moves, the difference between the minimum and maximum is 7 - 7 = 0.

```

**Constraints:**

- `1 <= nums.length <= 10^5`
- `10^9 <= nums[i] <= 10^9`

```tsx
function minDifference(nums: number[]): number {
    const n = nums.length;
    if (n <= 4) {
        // 如果數組長度不超過4，那麼最多三次操作可以把所有數變成一樣的
        return 0;
    }
    
    // 排序
    nums.sort((a, b) => a - b);
    
    // 計算四種情況的最小差值
    const option1 = nums[n - 1] - nums[3];   // 改變前三個最小值
    const option2 = nums[n - 2] - nums[2];   // 改變最小的三個數
    const option3 = nums[n - 3] - nums[1];   // 改變最小的兩個數和最大的數
    const option4 = nums[n - 4] - nums[0];   // 改變最小值

    // 返回最小的差值
    return Math.min(option1, option2, option3, option4);
};
```