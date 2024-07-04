# Roman to Integer

Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.

<pre><code><strong>Symbol       Value
</strong>I             1
V             5
X             10
L             50
C             100
D             500
M             1000
</code></pre>

For example, `2` is written as `II` in Roman numeral, just two ones added together. `12` is written as `XII`, which is simply `X + II`. The number `27` is written as `XXVII`, which is `XX + V + II`.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as `IX`. There are six instances where subtraction is used:

* `I` can be placed before `V` (5) and `X` (10) to make 4 and 9.&#x20;
* `X` can be placed before `L` (50) and `C` (100) to make 40 and 90.&#x20;
* `C` can be placed before `D` (500) and `M` (1000) to make 400 and 900.

Given a roman numeral, convert it to an integer.

&#x20;

**Example 1:**

<pre><code><strong>Input: s = "III"
</strong><strong>Output: 3
</strong><strong>Explanation: III = 3.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: s = "LVIII"
</strong><strong>Output: 58
</strong><strong>Explanation: L = 50, V= 5, III = 3.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: s = "MCMXCIV"
</strong><strong>Output: 1994
</strong><strong>Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= s.length <= 15`
* `s` contains only the characters `('I', 'V', 'X', 'L', 'C', 'D', 'M')`.
* It is **guaranteed** that `s` is a valid roman numeral in the range `[1, 3999]`.





### 當前面的數字比後面大時，就減去當前的值；否則就加上當前的值

使用單個循環迭代整個字串 `s`，時間複雜度為 O(n)，其中 n 是字串的長度。

```typescript
function romanToInt(s: string): number {
    const romanToIntMap = {I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000}
    let res = 0

    for (let i = 0; i < s.length; i++) {
        let val = romanToIntMap[s[i]]
        if (val < (romanToIntMap[s[i+1]])) {
            res -= val
        } else {
            res += val
        }
    }

    return res
}
```

### Map

```typescript
function romanToInt(s: string): number {
    const romanNumMap = new Map<string, number>([
        ["I", 1],
        ["V", 5],
        ["X", 10],
        ["L", 50],
        ["C", 100],
        ["D", 500],
        ["M", 1000],
    ]);

    let total = 0;
    for (let i = 0; i < s.length; i++) {
        const current = romanNumMap.get(s[i]) || 0;
        const next = romanNumMap.get(s[i + 1]) || 0;

        if (current < next) {
            total -= current;
        } else {
            total += current;
        }
    }

    return total;
};
```

### Reduce

看起來很帥的寫法，但效能不太好

使用了 `split('')` 和 `map` 方法來創建整數數組，然後使用 `reduce` 來計算結果。這種方法包含了額外的數組創建和遍歷操作

```typescript
const roman = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
};
function romanToInt(s: string): number {
    const integer = s.split('').map(str => roman[str])
    return integer.reduce((acc, curr, i, arr) => curr < arr[i + 1] ? acc - curr : acc + curr, 0)
}
```
