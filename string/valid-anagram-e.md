# Valid Anagram (E)

Given two strings `s` and `t`, return `true` _if_ `t` _is an anagram of_ `s`_, and_ `false` _otherwise_.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

&#x20;

**Example 1:**

<pre><code><strong>Input: s = "anagram", t = "nagaram"
</strong><strong>Output: true
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: s = "rat", t = "car"
</strong><strong>Output: false
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= s.length, t.length <= 5 * 104`
* `s` and `t` consist of lowercase English letters.

&#x20;

**Follow up:** What if the inputs contain Unicode characters? How would you adapt your solution to such a case?



### 兩個 Map 計數器＋比對次數

參考 [first-unique-character-in-a-string-e.md](first-unique-character-in-a-string-e.md "mention") 的 map 寫法

時間複雜度為 O(n)，其中 n 是字串的長度，因為每個字串都需要遍歷兩次（一次計算次數，一次比對次數）

```typescript
function isAnagram(s: string, t: string): boolean {
    const charCountS: Map<string, number> = new Map();
    const charCountT: Map<string, number> = new Map();

    if (s.length !== t.length) {
        return false
    }

    for (let i = 0; i < s.length; i++) {
        charCountS.set(s[i], (charCountS.get(s[i]) || 0) + 1);
        charCountT.set(t[i], (charCountT.get(t[i]) || 0) + 1);
    }

    for (const [key, value] of charCountS) {
        if (charCountT.get(key) !== value) {
            return false
        }
    }

    return true
};
```

上面的程式碼可以處理 Unicode 字符，因為 Map 可以儲存任何字符串作為鍵，包括 Unicode 字符



1. 定義計數器：
   1. 使用 Map 來記錄字串中每個字符的出現次數。
2. 長度檢查：
   1. 如果兩個字串長度不同，則直接返回 false。
3. 計算字符出現次數：
   1. 遍歷字串 s 和 t，記錄每個字符的出現次數。
4. 比對字符出現次數：
   1. &#x20;遍歷 charCountS，檢查每個字符在 charCountT 中的次數是否相同。
5. 返回結果：
   1. 如果所有字符的次數都一致，則返回 true。



### 推薦）一個 Map 計數器&#x20;

跟上面的解法蠻像，在同一次迭代中增加和減少計數，最後檢查是否全為 0

**時間複雜度** O(n)

這段代碼的時間複雜度是 O(k)，其中 k 是 mapOfCalc 中的鍵值對數量。在最壞的情況下，k 最多等於字串的長度 n，所以可以認為這部分的時間複雜度是 O(n)。

**空間複雜度** O(n)

在最壞的情況下，mapOfCalc 會儲存所有不同的字符。對於長度為 n 的字串，最多可能有 n 個不同的字符，所以 mapOfCalc 的空間複雜度是 O(n)。



```typescript
function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) {
        return false;
    }

    const mapOfCalc = new Map<string, number>();

    for (let i = 0; i < s.length; i++) {
        const sChar = s[i];
        const tChar = t[i];

        mapOfCalc.set(sChar, (mapOfCalc.get(sChar) || 0) + 1);
        mapOfCalc.set(tChar, (mapOfCalc.get(tChar) || 0) - 1);
    }

    for (const value of mapOfCalc.values()) {
        if (value !== 0) {
            return false;
        }
    }

    return true;
}
```
