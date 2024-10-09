# Minimum Add to Make Parentheses Valid (M)

[921. Minimum Add to Make Parentheses Valid](https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/)



A parentheses string is valid if and only if:

* It is the empty string,
* It can be written as `AB` (`A` concatenated with `B`), where `A` and `B` are valid strings, or
* It can be written as `(A)`, where `A` is a valid string.

You are given a parentheses string `s`. In one move, you can insert a parenthesis at any position of the string.

* For example, if `s = "()))"`, you can insert an opening parenthesis to be `"(`**`(`**`)))"` or a closing parenthesis to be `"())`**`)`**`)"`.

Return _the minimum number of moves required to make_ `s` _valid_.

&#x20;

**Example 1:**

<pre><code><strong>Input: s = "())"
</strong><strong>Output: 1
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: s = "((("
</strong><strong>Output: 3
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= s.length <= 1000`
* `s[i]` is either `'('` or `')'`.



### Greedy

```typescript
function minAddToMakeValid(s: string): number {
    let res: number = 0; // 記錄需要插入的括號數量
    let leftCount: number = 0; // 記錄未匹配的左括號數量

    // 遍歷每個字符
    for (const char of s) {
        if (char === '(') {
            // 如果是左括號，增加 leftCount
            leftCount++;
        } else {
            // 如果是右括號，且有未匹配的左括號
            if (leftCount > 0) {
                leftCount--; // 配對一個左括號
            } else {
                res++; // 否則需要插入一個左括號
            }
        }
    }

    // 最後剩餘的左括號需要插入對應的右括號
    return res + leftCount;
}

```
