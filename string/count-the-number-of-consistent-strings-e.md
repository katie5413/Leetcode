# Count the Number of Consistent Strings (E)

[1684. Count the Number of Consistent Strings](https://leetcode.com/problems/count-the-number-of-consistent-strings/)



You are given a string `allowed` consisting of **distinct** characters and an array of strings `words`. A string is **consistent** if all characters in the string appear in the string `allowed`.

Return _the number of **consistent** strings in the array_ `words`.

&#x20;

**Example 1:**

<pre><code><strong>Input: allowed = "ab", words = ["ad","bd","aaab","baa","badab"]
</strong><strong>Output: 2
</strong><strong>Explanation: Strings "aaab" and "baa" are consistent since they only contain characters 'a' and 'b'.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: allowed = "abc", words = ["a","b","c","ab","ac","bc","abc"]
</strong><strong>Output: 7
</strong><strong>Explanation: All strings are consistent.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: allowed = "cad", words = ["cc","acd","b","ba","bac","bad","ac","d"]
</strong><strong>Output: 4
</strong><strong>Explanation: Strings "cc", "acd", "ac", and "d" are consistent.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= words.length <= 10^4`
* `1 <= allowed.length <= 26`
* `1 <= words[i].length <= 10`
* The characters in `allowed` are **distinct**.
* `words[i]` and `allowed` contain only lowercase English letters.



### RegExp

```typescript
function countConsistentStrings(allowed: string, words: string[]): number {
    let ans: number = 0
    // 將允許的字母串用 '|' 分隔，表示允許的任意一個字母
    const re = new RegExp(allowed.split('').join('|'), 'g');
    for (const word of words) {
        // 當原先的字串長度與符合的字串長度相同，代表全部都符合
        if (word.length === word.match(re)?.length) ans++
    }
    return ans
};
```



### 用 Set 來紀錄可通過的字元

```typescript
function countConsistentStrings(allowed: string, words: string[]): number {
    // 將允許的字母集合存入 Set 以便快速查詢
    const allowedSet = new Set(allowed);

    // 定義函式來判斷單詞是否為一致字串
    function isConsistent(word: string): boolean {
        // 檢查單詞中的每個字母是否都在允許的字母集合中
        for (const letter of word) {
            if (!allowedSet.has(letter)) {
                return false; // 若有不允許的字母，則返回 false
            }
        }
        return true; // 若所有字母都在允許的集合中，則返回 true
    }

    // 使用 map 來檢查每個單詞是否為一致字串，並用 filter 過濾出 true 的結果，最後計算長度
    return words.map(w => isConsistent(w)).filter(x => x).length;
};

```
