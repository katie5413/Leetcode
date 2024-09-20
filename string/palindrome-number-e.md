# Palindrome Number (E)

[9. Palindrome Number](https://leetcode.com/problems/palindrome-number/)



Given an integer `x`, return `true` _if_ `x` _is a_&#x20;

_**palindrome**, and_ `false` _otherwise_.

&#x20;

**Example 1:**

<pre><code><strong>Input: x = 121
</strong><strong>Output: true
</strong><strong>Explanation: 121 reads as 121 from left to right and from right to left.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: x = -121
</strong><strong>Output: false
</strong><strong>Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: x = 10
</strong><strong>Output: false
</strong><strong>Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
</strong></code></pre>

&#x20;

**Constraints:**

* `-2^31 <= x <= 2^31 - 1`

&#x20;

**Follow up:** Could you solve it without converting the integer to a string?



### Reverse

```typescript
function isPalindrome(x: number): boolean {
    const strX: string = x.toString()
    return strX === strX.split('').reverse().join('')
};
```



### Two Pointer

```typescript
function isPalindrome(x: number): boolean {
  const s = x.toString();
  let i = 0,
    j = s.length - 1;
  while (i < j) {
    if (s[i++] !== s[j--]) return false;
  }
  return true;
}
```
