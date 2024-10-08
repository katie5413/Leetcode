# Minimum Number of Swaps to Make the String Balanced (M)

[1963. Minimum Number of Swaps to Make the String Balanced](https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-string-balanced/)



You are given a **0-indexed** string `s` of **even** length `n`. The string consists of **exactly** `n / 2` opening brackets `'['` and `n / 2` closing brackets `']'`.

A string is called **balanced** if and only if:

* It is the empty string, or
* It can be written as `AB`, where both `A` and `B` are **balanced** strings, or
* It can be written as `[C]`, where `C` is a **balanced** string.

You may swap the brackets at **any** two indices **any** number of times.

Return _the **minimum** number of swaps to make_ `s` _**balanced**_.

&#x20;

**Example 1:**

<pre><code><strong>Input: s = "][]["
</strong><strong>Output: 1
</strong><strong>Explanation: You can make the string balanced by swapping index 0 with index 3.
</strong>The resulting string is "[[]]".
</code></pre>

**Example 2:**

<pre><code><strong>Input: s = "]]][[["
</strong><strong>Output: 2
</strong><strong>Explanation: You can do the following to make the string balanced:
</strong>- Swap index 0 with index 4. s = "[]][][".
- Swap index 1 with index 5. s = "[[][]]".
The resulting string is "[[][]]".
</code></pre>

**Example 3:**

<pre><code><strong>Input: s = "[]"
</strong><strong>Output: 0
</strong><strong>Explanation: The string is already balanced.
</strong></code></pre>

&#x20;

**Constraints:**

* `n == s.length`
* `2 <= n <= 10^6`
* `n` is even.
* `s[i]` is either `'['` or `']'`.
* The number of opening brackets `'['` equals `n / 2`, and the number of closing brackets `']'` equals `n / 2`.



Ref&#x20;

[https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-string-balanced/solutions/5886395/2-solutions-one-using-2-pointers-and-the-other-a-math-based-greedy-solution](https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-string-balanced/solutions/5886395/2-solutions-one-using-2-pointers-and-the-other-a-math-based-greedy-solution)

```typescript
function minSwaps(s: string): number {
  let close = 0;
  let maxClose = 0;

  // Count the number of closing brackets there are at any given point, and
  // calculate the highest possible number of closing brackets at any point.
  for (let i = 0; i < s.length; i++) {
    s[i] === "]" ? close++ : close--;
    maxClose = Math.max(maxClose, close);
  }

  // For every closing bracket swapped, it balances out 2 things, which is why
  // we divide it by 2.
  return Math.trunc((maxClose + 1) / 2);
}
```
