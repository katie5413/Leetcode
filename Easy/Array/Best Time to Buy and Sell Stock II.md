/**
 * @param {number[]} prices
 * @return {number}
 */

### 如果後面大於前面，則加上兩者的差

```javascript
var maxProfit = function(prices) {
    let currentProfit = 0;
    for(let i=0;i<prices.length;i++){
        if(prices[i+1]>prices[i]){
            currentProfit+= prices[i+1]-prices[i]
        }
    }
    
    return currentProfit
};
```

