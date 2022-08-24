
### 迴圈結束之後再用 unshift 補一

```javascript
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    
    for(let i = digits.length -1;i>=0;i--){
        // 先加
        digits[i] = digits[i]+1
        
        // general case
        if(digits[i] < 10){  
            return digits
        }else{
            digits[i] = 0
        }
        
    }
    digits.unshift(1);
    
    return digits

};
```

### better
```javascript
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