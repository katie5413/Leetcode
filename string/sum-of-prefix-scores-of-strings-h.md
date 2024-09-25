# Sum of Prefix Scores of Strings (H)

[2416. Sum of Prefix Scores of Strings](https://leetcode.com/problems/sum-of-prefix-scores-of-strings/)



You are given an array `words` of size `n` consisting of **non-empty** strings.

We define the **score** of a string `term` as the **number** of strings `words[i]` such that `term` is a **prefix** of `words[i]`.

* For example, if `words = ["a", "ab", "abc", "cab"]`, then the score of `"ab"` is `2`, since `"ab"` is a prefix of both `"ab"` and `"abc"`.

Return _an array_ `answer` _of size_ `n` _where_ `answer[i]` _is the **sum** of scores of every **non-empty** prefix of_ `words[i]`.

**Note** that a string is considered as a prefix of itself.

&#x20;

**Example 1:**

<pre><code><strong>Input: words = ["abc","ab","bc","b"]
</strong><strong>Output: [5,4,3,2]
</strong><strong>Explanation: The answer for each string is the following:
</strong>- "abc" has 3 prefixes: "a", "ab", and "abc".
- There are 2 strings with the prefix "a", 2 strings with the prefix "ab", and 1 string with the prefix "abc".
The total is answer[0] = 2 + 2 + 1 = 5.
- "ab" has 2 prefixes: "a" and "ab".
- There are 2 strings with the prefix "a", and 2 strings with the prefix "ab".
The total is answer[1] = 2 + 2 = 4.
- "bc" has 2 prefixes: "b" and "bc".
- There are 2 strings with the prefix "b", and 1 string with the prefix "bc".
The total is answer[2] = 2 + 1 = 3.
- "b" has 1 prefix: "b".
- There are 2 strings with the prefix "b".
The total is answer[3] = 2.
</code></pre>

**Example 2:**

<pre><code><strong>Input: words = ["abcd"]
</strong><strong>Output: [4]
</strong><strong>Explanation:
</strong>"abcd" has 4 prefixes: "a", "ab", "abc", and "abcd".
Each prefix has a score of one, so the total is answer[0] = 1 + 1 + 1 + 1 = 4.
</code></pre>

&#x20;

**Constraints:**

* `1 <= words.length <= 1000`
* `1 <= words[i].length <= 1000`
* `words[i]` consists of lowercase English letters.



Ref [https://leetcode.com/problems/sum-of-prefix-scores-of-strings/solutions/5832566/typescript-approach-o-n-m-time-space](https://leetcode.com/problems/sum-of-prefix-scores-of-strings/solutions/5832566/typescript-approach-o-n-m-time-space)

```typescript
function sumPrefixScores(words: string[]): number[] {
    const trie = new Trie()
    const n = words.length

    for (const word of words) {
        trie.insert(word)
    }

    const result = new Array(n).fill(0)
    for (let i = 0; i < n; i++) {
        result[i] = trie.getPrefixScores(words[i])
    }

    return result
}

class TrieNode {
    children: Map<string, TrieNode>
    count: number

    constructor() {
        this.children = new Map()
        this.count = 0
    }
}

class Trie {
    root: TrieNode

    constructor() {
        this.root = new TrieNode()
    }

    insert(word: string): void {
        let node = this.root
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode())
            }
            node = node.children.get(char)!
            node.count++
        }
    }

    getPrefixScores(word: string): number {
        let node = this.root
        let score = 0
        for (const char of word) {
            if (!node.children.has(char)) {
                break
            }
            node = node.children.get(char)!;
            score += node.count
        }
        return score
    }
}
```
