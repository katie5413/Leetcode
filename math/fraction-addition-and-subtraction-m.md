# Fraction Addition and Subtraction (M)

[592. Fraction Addition and Subtraction](https://leetcode.com/problems/fraction-addition-and-subtraction/)



Given a string `expression` representing an expression of fraction addition and subtraction, return the calculation result in string format.

The final result should be an [irreducible fraction](https://en.wikipedia.org/wiki/Irreducible\_fraction). If your final result is an integer, change it to the format of a fraction that has a denominator `1`. So in this case, `2` should be converted to `2/1`.

&#x20;

**Example 1:**

<pre><code><strong>Input: expression = "-1/2+1/2"
</strong><strong>Output: "0/1"
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: expression = "-1/2+1/2+1/3"
</strong><strong>Output: "1/3"
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: expression = "1/3-1/2"
</strong><strong>Output: "-1/6"
</strong></code></pre>

&#x20;

**Constraints:**

* The input string only contains `'0'` to `'9'`, `'/'`, `'+'` and `'-'`. So does the output.
* Each fraction (input and output) has the format `±numerator/denominator`. If the first input fraction or the output is positive, then `'+'` will be omitted.
* The input only contains valid **irreducible fractions**, where the **numerator** and **denominator** of each fraction will always be in the range `[1, 10]`. If the denominator is `1`, it means this fraction is actually an integer in a fraction format defined above.
* The number of given fractions will be in the range `[1, 10]`.
* The numerator and denominator of the **final result** are guaranteed to be valid and in the range of **32-bit** int.

### GCD, LCM

```typescript
function fractionAddition(expression: string): string {
    // 解析所有的分數，並將它們儲存在 fractions 陣列中
    const fractions = expression.match(/[+-]?\d+\/\d+/g)!;
    
    // LCM（最小公倍數）輔助函式
    const lcm = (a: number, b: number): number => {
        // GCD（最大公因數）輔助函式，使用遞迴來計算
        const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
        return (a * b) / gcd(a, b); // 根據 GCD 計算 LCM
    };

    // 初始化分母和分子
    let denominator = 1;
    let numerator = 0;

    fractions.forEach(fraction => {
        const [num, denom] = fraction.split('/').map(Number);
        const newDenominator = lcm(denominator, denom); // 計算新的最小公倍數
        
        // 調整之前的分子以適應新的分母
        numerator = numerator * (newDenominator / denominator) + num * (newDenominator / denom);
        
        // 更新分母
        denominator = newDenominator;
    });

    // 簡化分數，計算分子與分母的最大公因數
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(Math.abs(numerator), denominator);

    // 將分子和分母分別除以最大公因數來化簡分數
    numerator /= divisor;
    denominator /= divisor;

    // 返回結果分數的字串格式
    return `${numerator}/${denominator}`;
}
```
