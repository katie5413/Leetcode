# Different Ways to Add Parentheses (M)

[241. Different Ways to Add Parentheses](https://leetcode.com/problems/different-ways-to-add-parentheses/)



Given a string `expression` of numbers and operators, return _all possible results from computing all the different possible ways to group numbers and operators_. You may return the answer in **any order**.

The test cases are generated such that the output values fit in a 32-bit integer and the number of different results does not exceed `104`.

&#x20;

**Example 1:**

<pre><code><strong>Input: expression = "2-1-1"
</strong><strong>Output: [0,2]
</strong><strong>Explanation:
</strong>((2-1)-1) = 0 
(2-(1-1)) = 2
</code></pre>

**Example 2:**

<pre><code><strong>Input: expression = "2*3-4*5"
</strong><strong>Output: [-34,-14,-10,-10,10]
</strong><strong>Explanation:
</strong>(2*(3-(4*5))) = -34 
((2*3)-(4*5)) = -14 
((2*(3-4))*5) = -10 
(2*((3-4)*5)) = -10 
(((2*3)-4)*5) = 10
</code></pre>

&#x20;

**Constraints:**

* `1 <= expression.length <= 20`
* `expression` consists of digits and the operator `'+'`, `'-'`, and `'*'`.
* All the integer values in the input expression are in the range `[0, 99]`.
* The integer values in the input expression do not have a leading `'-'` or `'+'` denoting the sign.



### Recursive + DP

時間/空間複雜度：O(2^n)

Ref [https://leetcode.com/problems/different-ways-to-add-parentheses/solutions/5807483/beats-super-easy-and-simple](https://leetcode.com/problems/different-ways-to-add-parentheses/solutions/5807483/beats-super-easy-and-simple)

```typescript
function diffWaysToCompute(expression: string): number[] {
    // 建立一個結果陣列，用來儲存所有可能的計算結果
    const results: number[] = [];
    
    // 如果表達式只是一個數字，直接將它轉換為整數並回傳
    if (isNumeric(expression)) return [parseInt(expression)];

    // 遍歷整個表達式的每一個字元
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        
        // 如果字元是運算符號（+、- 或 *）
        if (['+', '-', '*'].includes(char)) {
            // 將表達式從該運算符號處分割，分別計算左邊與右邊的結果
            const leftResults = diffWaysToCompute(expression.substring(0, i));  // 左側表達式
            const rightResults = diffWaysToCompute(expression.substring(i + 1)); // 右側表達式

            // 將左右兩邊的結果依序組合，並根據運算符號進行計算
            for (const left of leftResults) {
                for (const right of rightResults) {
                    if (char === '+') {
                        results.push(left + right);  // 如果是加號，計算左+右
                    } else if (char === '-') {
                        results.push(left - right);  // 如果是減號，計算左-右
                    } else if (char === '*') {
                        results.push(left * right);  // 如果是乘號，計算左*右
                    }
                }
            }
        }
    }

    // 回傳所有可能的計算結果
    return results;
}

// 檢查字串是否為數字
function isNumeric(s: string): boolean {
    // 使用Number函式將字串轉換為數字，並判斷是否是NaN​⬤
```
