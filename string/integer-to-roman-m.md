# Integer to Roman (M)

Related to [roman-to-integer-e.md](roman-to-integer-e.md "mention")

Seven different symbols represent Roman numerals with the following values:

| Symbol | Value |
| ------ | ----- |
| I      | 1     |
| V      | 5     |
| X      | 10    |
| L      | 50    |
| C      | 100   |
| D      | 500   |
| M      | 1000  |

Roman numerals are formed by appending the conversions of decimal place values from highest to lowest. Converting a decimal place value into a Roman numeral has the following rules:

* If the value does not start with 4 or 9, select the symbol of the maximal value that can be subtracted from the input, append that symbol to the result, subtract its value, and convert the remainder to a Roman numeral.
* If the value starts with 4 or 9 use the **subtractive form** representing one symbol subtracted from the following symbol, for example, 4 is 1 (`I`) less than 5 (`V`): `IV` and 9 is 1 (`I`) less than 10 (`X`): `IX`. Only the following subtractive forms are used: 4 (`IV`), 9 (`IX`), 40 (`XL`), 90 (`XC`), 400 (`CD`) and 900 (`CM`).
* Only powers of 10 (`I`, `X`, `C`, `M`) can be appended consecutively at most 3 times to represent multiples of 10. You cannot append 5 (`V`), 50 (`L`), or 500 (`D`) multiple times. If you need to append a symbol 4 times use the **subtractive form**.

Given an integer, convert it to a Roman numeral.

&#x20;

**Example 1:**

**Input:** num = 3749

**Output:** "MMMDCCXLIX"

**Explanation:**

```
3000 = MMM as 1000 (M) + 1000 (M) + 1000 (M)
 700 = DCC as 500 (D) + 100 (C) + 100 (C)
  40 = XL as 10 (X) less of 50 (L)
   9 = IX as 1 (I) less of 10 (X)
Note: 49 is not 1 (I) less of 50 (L) because the conversion is based on decimal places
```

**Example 2:**

**Input:** num = 58

**Output:** "LVIII"

**Explanation:**

```
50 = L
 8 = VIII
```

**Example 3:**

**Input:** num = 1994

**Output:** "MCMXCIV"

**Explanation:**

```
1000 = M
 900 = CM
  90 = XC
   4 = IV
```

&#x20;

**Constraints:**

* `1 <= num <= 3999`

### `從大到小一路除下去，除一次寫一次，直到為 0`

```typescript
function intToRoman(num: number): string {
    const romanToIntMap: Record<string, number> = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }
    let res = ''
    while (num !== 0) {
        for (const key in romanToIntMap) {
            res += key.repeat(num / romanToIntMap[key])
            num = num % romanToIntMap[key]
        }
    }
    return res

};
```

* **實作邏輯**：這個寫法使用了嵌套的 `while` 迴圈和 `for...in` 迴圈。在 `while (num !== 0)` 迴圈內，透過 `for (const key in romanToIntMap)` 遍歷 `romanToIntMap` 物件的屬性，然後使用 `key.repeat(num / romanToIntMap[key])` 來建構羅馬數字字串，同時更新 `num` 的值。
* **效能**：由於使用了字串的 `repeat` 方法和多次的除法與餘數操作，可能導致性能損耗較大，特別是在 `num` 較大時，字串的重複操作會消耗大量記憶體和時間。

### 推薦)用扣的

跟除法的原理也蠻像，能扣一次就寫一次，比起原本上面用除的，再拿餘數，較為有效率

```typescript
function intToRoman(num: number): string {
    const romanToIntMap: Record<string, number> = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }

    let roman = '';
    for(const key in romanToIntMap){        
            while(num >= romanToIntMap[key]){
                roman += key;
                num -= romanToIntMap[key];
            }    
    }

    return roman;
};
```

* **實作邏輯**：這個寫法僅使用了單層的 `for...in` 迴圈和內部的 `while` 迴圈。在 `for(const key in romanToIntMap)` 迴圈中，直接判斷 `num` 是否大於等於 `romanToIntMap[key]`，如果是則將 `key` 加入到 `roman` 字串中，同時更新 `num` 的值。
* **效能**：這個寫法避免了使用字串的重複操作，而是直接透過迴圈和數值比較來建構最終的羅馬數字字串。相較於第一種寫法，這個寫法更有效率，特別在處理大數值時，性能優勢更為明顯。

### 看到別人寫的爆破法

跟前面兩種在小範圍內的效率差不多，但若是在大範圍，直接索引的速度較快

缺點：和方法二相比，沒有明顯的缺點，但也沒有特別的擴展性或修改性，因為它固定了轉換規則。

```typescript
const ones = ['','I','II','III','IV','V','VI','VII','VIII','IX'];
const tens = ['','X','XX','XXX','XL','L','LX','LXX','LXXX','XC'];
const hundreds = ['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM'];
const thousands = ['','M','MM','MMM'];

function intToRoman(num: number): string {
    return thousands[Math.floor(num / 1000)] + hundreds[Math.floor(num / 100) % 10] + tens[Math.floor(num / 10) % 10] + ones[num % 10];
};
```

