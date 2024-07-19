# Uncommon Words from Two Sentences (E)

[884. Uncommon Words from Two Sentences](https://leetcode.com/problems/uncommon-words-from-two-sentences/)



A **sentence** is a string of single-space separated words where each word consists only of lowercase letters.

A word is **uncommon** if it appears exactly once in one of the sentences, and **does not appear** in the other sentence.

Given two **sentences** `s1` and `s2`, return _a list of all the **uncommon words**_. You may return the answer in **any order**.

&#x20;

**Example 1:**

<pre><code><strong>Input: s1 = "this apple is sweet", s2 = "this apple is sour"
</strong><strong>Output: ["sweet","sour"]
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: s1 = "apple apple", s2 = "banana"
</strong><strong>Output: ["banana"]
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= s1.length, s2.length <= 200`
* `s1` and `s2` consist of lowercase English letters and spaces.
* `s1` and `s2` do not have leading or trailing spaces.
* All the words in `s1` and `s2` are separated by a single space.



### 先合併在一起

```typescript
function uncommonFromSentences(s1: string, s2: string): string[] {
    const mergedList = [...s1.split(' '), ...s2.split(' ')], result = []

    let obj = {}

    mergedList.forEach(word => obj[word] = (obj[word] || 0) + 1)

    for (const [word, frequency] of Object.entries(obj)) {
        if (frequency === 1) {
            result.push(word)
        }
    }

    return result
}
```



這個效能不好，用上面的 Object 有內建的方法，比較省事

```typescript
function uncommonFromSentences(s1: string, s2: string): string[] {
    const bucket = new Map()
    const ans: string[] = []

    for (const word of s1.split(' ')) {
        bucket.set(word, (bucket.get(word) || 0) + 1)
    }
    for (const word of s2.split(' ')) {
        bucket.set(word, (bucket.get(word) || 0) + 1)
    }

    for (const [key, value] of bucket) {
        if (value === 1) {
            ans.push(key)
        }
    }

    return ans
}; 
```



請 Claude 優化後長這樣

看起來漂亮多了

```typescript
function uncommonFromSentences(s1: string, s2: string): string[] {
    const wordCount = new Map<string, number>();
    const words = s1.split(' ').concat(s2.split(' '));

    for (const word of words) {
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }

    return Array.from(wordCount)
        .filter(([_, count]) => count === 1)
        .map(([word]) => word);
}
```
