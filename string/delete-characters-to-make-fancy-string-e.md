# Delete Characters to Make Fancy String (E)

[1957. Delete Characters to Make Fancy String](https://leetcode.com/problems/delete-characters-to-make-fancy-string/)



A **fancy string** is a string where no **three** **consecutive** characters are equal.

Given a string `s`, delete the **minimum** possible number of characters from `s` to make it **fancy**.

Return _the final string after the deletion_. It can be shown that the answer will always be **unique**.

&#x20;

**Example 1:**

<pre><code><strong>Input: s = "leeetcode"
</strong><strong>Output: "leetcode"
</strong><strong>Explanation:
</strong>Remove an 'e' from the first group of 'e's to create "leetcode".
No three consecutive characters are equal, so return "leetcode".
</code></pre>

**Example 2:**

<pre><code><strong>Input: s = "aaabaaaa"
</strong><strong>Output: "aabaa"
</strong><strong>Explanation:
</strong>Remove an 'a' from the first group of 'a's to create "aabaaaa".
Remove two 'a's from the second group of 'a's to create "aabaa".
No three consecutive characters are equal, so return "aabaa".
</code></pre>

**Example 3:**

<pre><code><strong>Input: s = "aab"
</strong><strong>Output: "aab"
</strong><strong>Explanation: No three consecutive characters are equal, so return "aab".
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= s.length <= 10^5`
* `s` consists only of lowercase English letters.

```typescript
function makeFancyString(s: string): string {
    let stack: string[] = [];
    for (let i: number = 0; i < s.length; i++) {
        if (stack.length >= 2 && stack[stack.length - 2] === s[i] && stack[stack.length - 1] === s[i]) {
            continue; 
        }
        stack.push(s[i]);
    }
    return stack.join('');
}
```
