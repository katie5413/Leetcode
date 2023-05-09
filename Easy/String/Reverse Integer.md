# Reverse Integer

key words: `Easy`, `Math.pow`


反轉數字

### Note

1. 負號要維持
2. 範圍在 [-2^31, 2^31 - 1] 之間，否則回傳 0
3. 去頭 0 

```
Example 1:

Input: x = 123
Output: 321

Example 2:

Input: x = -123
Output: -321

Example 3:

Input: x = 120
Output: 21
```



20230501-還是要靠數學
```
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    const sign = Math.sign(x); // 獲取x的符號
  let reversed = 0;
  x = Math.abs(x); // 轉換為正整數

  while (x > 0) {
    // 取出x的最後一位數字
    const digit = x % 10;
    // 將最後一位數字添加到翻轉後的整數中
    reversed = reversed * 10 + digit;
    // 去掉x的最後一位數字
    x = Math.floor(x / 10);
  }

  const result = sign * reversed;
  // 檢查結果是否超出範圍
  if (result < Math.pow(-2, 31) || result > Math.pow(2, 31) - 1) {
    return 0;
  } else {
    return result;
  }  
};
```



20230501- first try
```
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {


    if(x===0){
       return 0
       }

    x=x.toString()
    let ans = ''


    if(x[0]==='-'){
       x=x.substring(1)
        ans+="-"
     }
    x=x.split('')
    x=x.reverse()

    let zeroNum = 0;
    let firstZero = x[0]===0;

    for(let i=0;i< x.length -1;i++){

        if(firstZero&&x[i]==0){

            x.splice(i,1)
        }else{
            break

        }
    }

    ans+=x.join('')


    if(Number(ans)>Math.pow(2,31) - 1){
        return 0
    }

    if(Number(ans)< -Math.pow(2,31)){
        return 0
    }

    return ans


};
```
