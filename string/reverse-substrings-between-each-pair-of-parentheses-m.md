# Reverse Substrings Between Each Pair of Parentheses (M)

You are given a string `s` that consists of lower case English letters and brackets.

Reverse the strings in each pair of matching parentheses, starting from the innermost one.

Your result should **not** contain any brackets.

&#x20;

**Example 1:**

<pre><code><strong>Input: s = "(abcd)"
</strong><strong>Output: "dcba"
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: s = "(u(love)i)"
</strong><strong>Output: "iloveu"
</strong><strong>Explanation: The substring "love" is reversed first, then the whole string is reversed.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: s = "(ed(et(oc))el)"
</strong><strong>Output: "leetcode"
</strong><strong>Explanation: First, we reverse the substring "oc", then "etco", and finally, the whole string.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= s.length <= 2000`
* `s` only contains lower case English characters and parentheses.
* It is guaranteed that all parentheses are balanced.



```typescript
function reverseParentheses(s: string): string {
    let stack: string[] = [];
    
    for (let char of s) {
        if (char === ')') {
            let temp: string[] = [];
            while (stack.length && stack[stack.length - 1] !== '(') {
                temp.push(stack.pop()!);
            }
            stack.pop(); // 移除左括號 '('
            stack.push(...temp);
        } else {
            stack.push(char);
        }
    }
    
    return stack.join('');
}

```



* 初始化一個堆疊（`stack`）。
* 遍歷字串 `s` 中的每一個字符：
  * 如果字符是閉括號 `)`，則開始反轉內部的字串，直到遇到開括號 `(` 為止。
  * 將反轉後的字串重新推入堆疊中。
  * 如果字符不是閉括號 `)`，則直接將字符推入堆疊中。
* 最後，將堆疊中的所有字符連接起來並返回。
