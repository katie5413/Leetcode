# Circular Sentence (E)

[2490. Circular Sentence](https://leetcode.com/problems/circular-sentence/)



A **sentence** is a list of words that are separated by a **single** space with no leading or trailing spaces.

* For example, `"Hello World"`, `"HELLO"`, `"hello world hello world"` are all sentences.

Words consist of **only** uppercase and lowercase English letters. Uppercase and lowercase English letters are considered different.

A sentence is **circular** if:

* The last character of a word is equal to the first character of the next word.
* The last character of the last word is equal to the first character of the first word.

For example, `"leetcode exercises sound delightful"`, `"eetcode"`, `"leetcode eats soul"` are all circular sentences. However, `"Leetcode is cool"`, `"happy Leetcode"`, `"Leetcode"` and `"I like Leetcode"` are **not** circular sentences.

Given a string `sentence`, return `true` _if it is circular_. Otherwise, return `false`.



1. 頭尾的字要一樣
2. 每個單字的頭等於前個單字的尾&#x20;



**Example 1:**

<pre><code><strong>Input: sentence = "leetcode exercises sound delightful"
</strong><strong>Output: true
</strong><strong>Explanation: The words in sentence are ["leetcode", "exercises", "sound", "delightful"].
</strong>- leetcode's last character is equal to exercises's first character.
- exercises's last character is equal to sound's first character.
- sound's last character is equal to delightful's first character.
- delightful's last character is equal to leetcode's first character.
The sentence is circular.
</code></pre>

**Example 2:**

<pre><code><strong>Input: sentence = "eetcode"
</strong><strong>Output: true
</strong><strong>Explanation: The words in sentence are ["eetcode"].
</strong>- eetcode's last character is equal to eetcode's first character.
The sentence is circular.
</code></pre>

**Example 3:**

<pre><code><strong>Input: sentence = "Leetcode is cool"
</strong><strong>Output: false
</strong><strong>Explanation: The words in sentence are ["Leetcode", "is", "cool"].
</strong><strong>- Leetcode's last character is not equal to is's first character.
</strong><strong>The sentence is not circular.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= sentence.length <= 500`
* `sentence` consist of only lowercase and uppercase English letters and spaces.
* The words in `sentence` are separated by a single space.
* There are no leading or trailing spaces.



Ref. [https://leetcode.com/problems/circular-sentence/solutions/5995054/beats-100-working-02-11-2024-explained-step-by-step-most-common-interview-string](https://leetcode.com/problems/circular-sentence/solutions/5995054/beats-100-working-02-11-2024-explained-step-by-step-most-common-interview-string)

```typescript
function isCircularSentence(sentence: string): boolean {
    // 獲取句子的長度
    const n: number = sentence.length;
    
    // 第一步檢查：比較句子的首字母和尾字母
    // 若不相同，則不是環形句
    if (sentence[0] !== sentence[n-1]) return false;
    
    // 從索引 1 到 n-2 逐一檢查
    // 無需再次檢查首尾字母
    for (let i = 1; i < n-1; i++) {
        // 當遇到空格字元時
        if (sentence[i] === ' ') {
            // 檢查空格前後的字元是否相同
            if (sentence[i-1] !== sentence[i+1]) return false;
        }
    }
    
    // 若通過所有檢查，則句子為環形句
    return true;
}

```
