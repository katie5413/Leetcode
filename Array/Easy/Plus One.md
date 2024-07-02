# Plus one

You are given a **large integer** represented as an integer array `digits`, where each `digits[i]` is the `ith` digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading `0`'s.

Increment the large integer by one and return `*the resulting array of digits*.`

**Example 1:**

```
Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
Incrementing by one gives 123 + 1 = 124.
Thus, the result should be [1,2,4].

```

**Example 2:**

```
Input: digits = [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.
Incrementing by one gives 4321 + 1 = 4322.
Thus, the result should be [4,3,2,2].

```

**Example 3:**

```
Input: digits = [9]
Output: [1,0]
Explanation: The array represents the integer 9.
Incrementing by one gives 9 + 1 = 10.
Thus, the result should be [1,0].

```

## 比較好的寫法

```jsx
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    
    // 反過來做
    for(let i = digits.length -1;i>=0;i--){
        // 先加
        digits[i] = digits[i]+1
        
        // general case
        if(digits[i] < 10){  
            return digits
        }
        
        // 能到這邊都是 >=10
    
        if(i==0){
            digits[i] = 1
            digits.push(0) 
            return digits    
        }else{
            digits[i] = 0
        }
        
    }
    
    return digits
    
    
};
```

## 迴圈結束之後再用 unshift 補一

```jsx
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    for(let i = digits.length-1;i>=0;i--){
        digits[i]++;
        if(digits[i]<=9) return digits;
        else digits[i] = 0;
    }
    digits.unshift(1);
    return digits;
};
```

## ChatGPT 的回答

```tsx
function plusOne(digits: number[]): number[] {
    // 從最右邊的位數開始處理
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i] += 1;
            return digits;
        } 
        // 若當前位數為9，則將其置為0，繼續處理更高位
        digits[i] = 0;
    }
    // 若所有位數皆為9，則需在最左邊新增一位1
    digits.unshift(1);
    return digits;
}
```