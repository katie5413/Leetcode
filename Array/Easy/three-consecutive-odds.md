# Three Consecutive Odds

Given an integer array `arr`, return `true`

if there are three consecutive odd numbers in the array. Otherwise, return `false`.

**Example 1:**

```
Input: arr = [2,6,4,1]
Output: false
Explanation: There are no three consecutive odds.

```

**Example 2:**

```
Input: arr = [1,2,34,3,4,5,7,23,12]
Output: true
Explanation: [5,7,23] are three consecutive odds.

```

**Constraints:**

- `1 <= arr.length <= 1000`
- `1 <= arr[i] <= 1000`

```tsx
function threeConsecutiveOdds(arr: number[]): boolean {
    // 初始化計數器
    let count = 0;
    
    // 遍歷數組
    for (let i = 0; i < arr.length; i++) {
        // 是奇數，計數器加一
        if (arr[i] % 2 !== 0) {
            count++;
            // 如果連續奇數的數量達到 3，返回 true
            if (count === 3) {
                return true;
            }
        } else {
            // 不是奇數，重置計數器
            count = 0;
        }
    }

    // 如果遍歷完整個數組後沒有找到連續三個奇數，返回 false
    return false;
}

```

```tsx
function threeConsecutiveOdds(arr: number[]): boolean {
    // 遍歷數組，檢查連續三個元素是否都是奇數
    for (let i = 0; i < arr.length - 2; i++) {
        if (arr[i] % 2 !== 0 && arr[i + 1] % 2 !== 0 && arr[i + 2] % 2 !== 0) {
            return true;
        }
    }
    return false;
}
```

```tsx
function threeConsecutiveOdds(arr: number[]): boolean {
    let lastEven = -1;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            lastEven = i;
        }
        if (i - lastEven === 3) {
            return true;
        }
    }
    return false;
};
```