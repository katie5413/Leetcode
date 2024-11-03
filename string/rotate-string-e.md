# Rotate String (E)

[796. Rotate String](https://leetcode.com/problems/rotate-string/)



Given two strings `s` and `goal`, return `true` _if and only if_ `s` _can become_ `goal` _after some number of **shifts** on_ `s`.

A **shift** on `s` consists of moving the leftmost character of `s` to the rightmost position.

* For example, if `s = "abcde"`, then it will be `"bcdea"` after one shift.

&#x20;

**Example 1:**

<pre><code><strong>Input: s = "abcde", goal = "cdeab"
</strong><strong>Output: true
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: s = "abcde", goal = "abced"
</strong><strong>Output: false
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= s.length, goal.length <= 100`
* `s` and `goal` consist of lowercase English letters.



```typescript
function rotateString(s: string, goal: string): boolean {
    // 如果 s 和 goal 的長度不同，則不可能是旋轉關係
    if (s.length !== goal.length) {
        return false;
    }
    // 檢查 s + s 是否包含 goal，若包含則表示 goal 是 s 的旋轉
    return (s + s).includes(goal);
}

```

<figure><img src="../.gitbook/assets/截圖 2024-11-03 晚上11.17.28.png" alt=""><figcaption></figcaption></figure>

