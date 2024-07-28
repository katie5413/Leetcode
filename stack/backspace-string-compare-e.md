# Backspace String Compare (E)

[844. Backspace String Compare](https://leetcode.com/problems/backspace-string-compare/)



Given two strings `s` and `t`, return `true` _if they are equal when both are typed into empty text editors_. `'#'` means a backspace character.

Note that after backspacing an empty text, the text will continue empty.

&#x20;

**Example 1:**

<pre><code><strong>Input: s = "ab#c", t = "ad#c"
</strong><strong>Output: true
</strong><strong>Explanation: Both s and t become "ac".
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: s = "ab##", t = "c#d#"
</strong><strong>Output: true
</strong><strong>Explanation: Both s and t become "".
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: s = "a#c", t = "b"
</strong><strong>Output: false
</strong><strong>Explanation: s becomes "c" while t becomes "b".
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= s.length, t.length <= 200`
* `s` and `t` only contain lowercase letters and `'#'` characters.

&#x20;

**Follow up:** Can you solve it in `O(n)` time and `O(1)` space?



### Simulation

```typescript
function backspaceCompare(s: string, t: string): boolean {
    let ns: string[] = [], nt: string[] = []
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '#') {
            ns.pop()
        } else {
            ns.push(s[i])
        }
    }
    for (let j = 0; j < t.length; j++) {
        if (t[j] === '#') {
            nt.pop()
        } else {
            nt.push(t[j])
        }
    }

    if (nt.length !== ns.length) return false

    for (let k = 0; k < ns.length; k++) {
        if (ns[k] !== nt[k]) return false
    }

    return true
};
```

### 抽出 function

```typescript
/*

'ab#c'
 ^
  ^
   ^
    ^

Steps
1. Create empty string.
2. Loop through s and check current and next character in s.
3. If the next character in s is a backspace skip current character.
4. Else add current character
*/

function buildStr(str: string) {
    const ans = []

    for (let i = 0; i < str.length; i++) {
        const curr = str[i];

        if (curr !== '#') ans.push(curr)
        else if (ans.length > 0) ans.pop();
    }

    return ans.join('')
}

function backspaceCompare(s: string, t: string): boolean {
    return buildStr(s) === buildStr(t)
};
```



### 累計退格並回傳下一個有效字符，並同時比較

```typescript
function backspaceCompare(s: string, t: string): boolean {
    // 初始化 s 和 t 的索引，從最後一個字符開始
    let sIndex = s.length - 1
    let tIndex = t.length - 1

    // 當 s 或 t 還有字符時繼續迴圈
    while (sIndex >= 0 || tIndex >= 0) {
        // 如果 s 的當前字符是 '#'
        if (s[sIndex] === '#') {
            // 取得處理退格後的新索引
            sIndex = getNextIndex(s, sIndex)
        } 
        // 如果 t 的當前字符是 '#'
        else if (t[tIndex] === '#') {
            // 取得處理退格後的新索引
            tIndex = getNextIndex(t, tIndex)
        } 
        // 如果 s 和 t 的當前字符不相等
        else if (s[sIndex] !== t[tIndex]) {
            // 返回 false，表示 s 和 t 不相等
            return false
        } 
        // 如果 s 和 t 的當前字符相等
        else {
            // 移動到前一個字符
            sIndex--
            tIndex--
        }
    }

    // 如果 s 和 t 的索引都到達起點，表示 s 和 t 相等
    if (sIndex <= 0 && tIndex <= 0) {
        return true
    }
    // 否則返回 false
    return false
}

// 處理退格並返回新索引的函數
function getNextIndex(text: string, index: number): number {
    let count = 0 // 退格計數
    while (index >= 0) {
        if (text[index] === '#') {
            count++ // 遇到 '#'，增加退格計數
        } else if (count > 0) {
            count-- // 遇到非 '#' 且有退格計數，減少退格計數
        }
        if (count === 0) {
            // 退格計數為 0 時返回新索引
            return index - 1
        }
        index-- // 移動到前一個字符
    }
    return index // 返回索引
}
```
