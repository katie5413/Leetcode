# Count Common Words With One Occurrence (E)

[2085. Count Common Words With One Occurrence](https://leetcode.com/problems/count-common-words-with-one-occurrence/)

Related to [uncommon-words-from-two-sentences-e.md](uncommon-words-from-two-sentences-e.md "mention")



Given two string arrays `words1` and `words2`, return _the number of strings that appear **exactly once** in each of the two arrays._

&#x20;

**Example 1:**

<pre><code><strong>Input: words1 = ["leetcode","is","amazing","as","is"], words2 = ["amazing","leetcode","is"]
</strong><strong>Output: 2
</strong><strong>Explanation:
</strong>- "leetcode" appears exactly once in each of the two arrays. We count this string.
- "amazing" appears exactly once in each of the two arrays. We count this string.
- "is" appears in each of the two arrays, but there are 2 occurrences of it in words1. We do not count this string.
- "as" appears once in words1, but does not appear in words2. We do not count this string.
Thus, there are 2 strings that appear exactly once in each of the two arrays.
</code></pre>

**Example 2:**

<pre><code><strong>Input: words1 = ["b","bb","bbb"], words2 = ["a","aa","aaa"]
</strong><strong>Output: 0
</strong><strong>Explanation: There are no strings that appear in each of the two arrays.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: words1 = ["a","ab"], words2 = ["a","a","a","ab"]
</strong><strong>Output: 1
</strong><strong>Explanation: The only string that appears exactly once in each of the two arrays is "ab".
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= words1.length, words2.length <= 1000`
* `1 <= words1[i].length, words2[j].length <= 30`
* `words1[i]` and `words2[j]` consists only of lowercase English letters.



### Reduce+Map

```typescript
function countWords(words1: string[], words2: string[]): number {
    let count = 0; // 計算符合條件的單字數量

    // 透過 reduce 來統計 words1 中每個單字出現的次數，並存入 map1
    const map1 = words1.reduce((acc, el) => acc.set(el, (acc.get(el) || 0) + 1), new Map());

    // 透過 reduce 來統計 words2 中每個單字出現的次數，並存入 map2
    const map2 = words2.reduce((acc, el) => acc.set(el, (acc.get(el) || 0) + 1), new Map());

    // 遍歷 map1 中的所有鍵值對
    for (const [key, value] of map1.entries()) {
        // 如果單字在 words1 中只出現一次，且在 words2 中也只出現一次，則計數加一
        if (value === 1 && map2.get(key) === 1) count++;
    }

    // 返回符合條件的單字數量
    return count;
};
```

<figure><img src="../.gitbook/assets/截圖 2024-09-17 晚上11.53.01.png" alt=""><figcaption></figcaption></figure>
