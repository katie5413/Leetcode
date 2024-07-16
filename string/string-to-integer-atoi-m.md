# String to Integer (atoi) (M)

[8. String to Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/)



Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer.

The algorithm for `myAtoi(string s)` is as follows:

1. **Whitespace**: Ignore any leading whitespace (`" "`).
2. **Signedness**: Determine the sign by checking if the next character is `'-'` or `'+'`, assuming positivity is neither present.
3. **Conversion**: Read the integer by skipping leading zeros until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is 0.
4. **Rounding**: If the integer is out of the 32-bit signed integer range `[-2^31, 2^31 - 1]`, then round the integer to remain in the range. Specifically, integers less than `-2^31` should be rounded to `-2^31`, and integers greater than `2^31 - 1` should be rounded to `2^31 - 1`.

Return the integer as the final result.

&#x20;

**Example 1:**

**Input:** s = "42"

**Output:** 42

**Explanation:**

```
The underlined characters are what is read in and the caret is the current reader position.
Step 1: "42" (no characters read because there is no leading whitespace)
         ^
Step 2: "42" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "42" ("42" is read in)
           ^
```

**Example 2:**

**Input:** s = " -042"

**Output:** -42

**Explanation:**

```
Step 1: "   -042" (leading whitespace is read and ignored)
            ^
Step 2: "   -042" ('-' is read, so the result should be negative)
             ^
Step 3: "   -042" ("042" is read in, leading zeros ignored in the result)
               ^
```

**Example 3:**

**Input:** s = "1337c0d3"

**Output:** 1337

**Explanation:**

```
Step 1: "1337c0d3" (no characters read because there is no leading whitespace)
         ^
Step 2: "1337c0d3" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "1337c0d3" ("1337" is read in; reading stops because the next character is a non-digit)
             ^
```

**Example 4:**

**Input:** s = "0-1"

**Output:** 0

**Explanation:**

```
Step 1: "0-1" (no characters read because there is no leading whitespace)
         ^
Step 2: "0-1" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "0-1" ("0" is read in; reading stops because the next character is a non-digit)
          ^
```

**Example 5:**

**Input:** s = "words and 987"

**Output:** 0

**Explanation:**

Reading stops at the first non-digit character 'w'.

&#x20;

**Constraints:**

* `0 <= s.length <= 200`
* `s` consists of English letters (lower-case and upper-case), digits (`0-9`), `' '`, `'+'`, `'-'`, and `'.'`.



### 累加

```typescript
function myAtoi(s: string): number {
    // 移除開頭的空白字符
    s = s.trim();

    // 如果字串為空，返回 0
    if (s.length === 0) return 0;

    let index = 0;
    let sign = 1;  // 假設正號
    const maxInt = Math.pow(2, 31) - 1;
    const minInt = -Math.pow(2, 31);

    // 處理符號
    if (s[index] === '-' || s[index] === '+') {
        sign = s[index] === '-' ? -1 : 1;
        index++;
    }

    let num = 0;

    // 讀取數字字符，直到非數字字符
    while (index < s.length) {
        const char = s[index];
        if (char < '0' || char > '9') break;

        num = num * 10 + (char.charCodeAt(0) - '0'.charCodeAt(0));

        // 檢查是否超出範圍
        if (sign * num > maxInt) return maxInt;
        if (sign * num < minInt) return minInt;

        index++;
    }

    return sign * num;
}
```

1. 移除空白字符：
   * 使用 trim 方法移除字串開頭和結尾的空白字符。
2. 處理空字串：
   * 如果處理後的字串為空，直接返回 0。
3. 處理符號：
   * 檢查第一個字符是否為 ‘-’ 或 ‘+’。若是，則設定 sign 變數，並將索引移到下一個字符。
4. 讀取數字：
   * 一個迴圈來逐一讀取字串中的字符，直到遇到非數字字符。將每個數字字符轉換為對應的數值並累積到 num 變數中。
5. 範圍檢查：
   * 在每次累積數值之後，檢查 num 是否超出 32 位元有符號整數的範圍。如果超出範圍，返回相應的極值。
6. 返回結果：
   * 根據符號 sign 返回最終的數值。



### 正規表達式

```typescript
function myAtoi(s: string): number {
  let ans = 0
  const match = s.match(/^\s*([\-|\+]?)(\d+)/)
  // 如果正規表達式匹配成功，match 會是一個陣列，否則為 null。
  if (match) {
    // Number(match[2])：將匹配到的數字部分（即第二個捕獲群組）轉換為數字型別並賦值給 ans
    ans = Number(match[2])
    if (match[1] === "-") {
      ans = ans * -1
    }
    ans = Math.max(Math.pow(-2, 31), Math.min(Math.pow(2, 31) - 1, ans))
  }
  return ans
}
```

使用正規表達式匹配字串， (/^\s\*(\[-|+]?)(\d+)/) 這個正規表達式的解釋如下：

* ^\s\*：匹配開頭的零或多個空白字符。
* (\[\\-|\\+]?)(\d+)：分成兩個捕獲群組：
  * &#x20;(\[\\-|\\+]?)：匹配一個可選的符號（- 或 +）。
  * &#x20;(\d+)：匹配一個或多個數字字符。

匹配成功時，match 變數將會是一個包含匹配結果的陣列。例如，對於字串 " -123abc"，match 的值將是：

```
[
  '  -123',
  '-',
  '123',
  index: 0,
  input: '  -123abc',
  groups: undefined
]
```

在這個陣列中：

* match\[0] 是整個匹配到的字串。
* match\[1] 是第一個捕獲群組（即符號 -）。
* match\[2] 是第二個捕獲群組（即數字 123）。

如果沒有匹配成功，match 將會是 null。



### 陣列＋列舉條件

```typescript
const allNumber = new Set(["0","1","2","3","4","5","6","7","8","9"])
function myAtoi(s: string): number {
    
    var pos = true
    const nums: string[] = []
    for(var i = 0; i < s.length; i++) {
        const c = s[i]
        if(allNumber.has(c)) {
            nums.push(c)
        } else if(c == "-" && nums.length == 0) {
            nums.push("-")
        } else if(c == "+" && nums.length == 0) {
            nums.push("+")
        }
        else if(c != ' ' && nums.length==0) {
            break;
        } else if(c == ' ' && nums.length > 0 ) {
            break;
        } else if( nums.length > 0) {
            break;
        }     
    }
    if(nums.length == 1 && (nums[0] == '-' || nums[0] == '+')) nums[0] = "0"

    const r = Number(nums.join(''))
    if(r < -2147483648) return -2147483648
    if(r > 2147483647) return 2147483647
    return r
};
```
