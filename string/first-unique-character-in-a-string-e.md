# First Unique Character in a String (E)

Given a string `s`, _find the first non-repeating character in it and return its index_. If it does not exist, return `-1`.

&#x20;

**Example 1:**

<pre><code><strong>Input: s = "leetcode"
</strong><strong>Output: 0
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: s = "loveleetcode"
</strong><strong>Output: 2
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: s = "aabb"
</strong><strong>Output: -1
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= s.length <= 105`
* `s` consists of only lowercase English letters.

### 迴圈＋計數

* 時間複雜度：O(n)
  * 第一次遍歷字符串的時間複雜度為 O(n)。
  * 第二次遍歷字符串的時間複雜度也是 O(n)。
  * &#x20;總的時間複雜度為 O(n) + O(n) = O(n)。
* 空間複雜度：O(n)
  * 使用了一個物件 char 來存儲每個字符的出現次數，最壞情況下需要存儲 n 個字符。
* 優點：
  * 時間複雜度較低，適合處理較長的字符串。
  * 程式碼清晰明了，易於理解。
* 缺點：
  * 使用了額外的空間來存儲字符的出現次數，對於非常大的字符串可能會佔用較多記憶體。

```typescript
function firstUniqChar(s: string): number {
    const char: { [key: string]: number } = {}

    // 遍歷 s
    for (const letter of s) {
        // 如果出現過，就將次數 +1
        if (char[letter]) {
            char[letter]++
        } else {
            // 未出現過就設為 1
            char[letter] = 1
        }
    }

    // 再遍歷一次
    for (let i = 0; i < s.length; i++) {
        // 當有字元的出現數為 1 則 return，並跳出
        if (char[s[i]] === 1) {
            return i
        }
    }

    // 若皆超過，則回傳-1
    return -1
};
```

*

### 相同概念但用 Map 儲存

```typescript
function firstUniqChar(s: string): number {
    // 使用 Map 來統計每個字符出現的次數
    const charCount: Map<string, number> = new Map();

    // 遍歷字符串，統計每個字符的出現次數
    for (let char of s) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }

    // 再次遍歷字符串，找到第一個出現次數為 1 的字符
    for (let i = 0; i < s.length; i++) {
        if (charCount.get(s[i]) === 1) {
            return i;
        }
    }

    // 如果沒有找到不重複的字符，返回 -1
    return -1;
}
```



### IndexOf + LastIndexOf

* 時間複雜度： O(n^2)，因為對於每個字符，indexOf 和 lastIndexOf 方法都需要在最壞情況下遍歷整個字符串，所以嵌套的遍歷使得時間複雜度更高。
* 空間複雜度： O(1)，因為沒有使用額外的數據結構，只是進行了字符串操作。
* 優點：實現簡單，不需要額外的空間。
* 缺點：時間複雜度較高，對於長字符串來說性能較差。

```typescript
function firstUniqChar(s: string): number {
    for (let i = 0; i < s.length; i++) {
        const char = s[i]
        if (s.indexOf(char) === s.lastIndexOf(char)) {
            return i
        }
    }

    return -1
};
```

1. 遍歷字符串中的每一個字符。
2. 對於每個字符，使用 indexOf 和 lastIndexOf 方法檢查它是否是唯一的：
   1. s.indexOf(char) 返回字符 char 在字符串中第一次出現的位置。
   2. s.lastIndexOf(char) 返回字符 char 在字符串中最後一次出現的位置。
   3. 如果這兩個位置相同，說明該字符在字符串中只出現了一次，則返回這個字符的索引。
3. 如果遍歷完所有字符後沒有找到唯一的字符，則返回 -1。



### Array(26)＋charCodeAt

* 時間複雜度：O(n)
  * 第一次遍歷字符串的時間複雜度為 O(n)。
  * 第二次遍歷字符串的時間複雜度也是 O(n)。
  * 總的時間複雜度為 O(n) + O(n) = O(n)。
* 空間複雜度：O(1)
  * 使用了一個固定大小的數組（大小為 26），這與字符串的長度無關，因此空間複雜度是 O(1)。
* 優點：
  * 時間複雜度較低，適合處理較長的字符串。
  * 空間複雜度低，使用了一個固定大小的數組，不會因字符串長度增加而增加額外的空間使用。
  * 由於只處理小寫英文字母，這段程式碼比使用物件的解法更高效。
* 缺點：
  * 只適用於小寫英文字母的字符串，如果包含其他字符，需要進行額外處理。

```typescript
function firstUniqChar(s: string): number {
    const chars: number[] = new Array(26).fill(0);
    for(let i = 0; i < s.length; i++){
        chars[s[i].charCodeAt(0) - 97]++;
    };

    for(let i = 0; i < s.length; i++){
        if(chars[s[i].charCodeAt(0) - 97] === 1) return i;
    }


    return  -1;
};
```



與前面用 Map 來統計字符出現次數的解法相比：\


1\. 時間複雜度：兩者都是 O(n)，但是這段程式碼在常數時間上可能更快，因為數組訪問比物件訪問要快。

2\. 空間複雜度：這段程式碼的空間複雜度是 O(1)，而用 Map 的解法是 O(n)。



總結來說，這段程式碼在處理只有小寫英文字母的字符串時性能會更好，而用 Map 的解法更通用，適用於所有字符。
