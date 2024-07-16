# Valid Palindrome (E)

[125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)

Related to&#x20;

[palindromic-substrings-m.md](palindromic-substrings-m.md "mention")

&#x20;[shortest-palindrome-h.md](shortest-palindrome-h.md "mention")

&#x20;[longest-palindromic-substring-m.md](longest-palindromic-substring-m.md "mention")



A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string `s`, return `true` _if it is a **palindrome**, or_ `false` _otherwise_.

&#x20;

**Example 1:**

<pre><code><strong>Input: s = "A man, a plan, a canal: Panama"
</strong><strong>Output: true
</strong><strong>Explanation: "amanaplanacanalpanama" is a palindrome.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: s = "race a car"
</strong><strong>Output: false
</strong><strong>Explanation: "raceacar" is not a palindrome.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: s = " "
</strong><strong>Output: true
</strong><strong>Explanation: s is an empty string "" after removing non-alphanumeric characters.
</strong>Since an empty string reads the same forward and backward, it is a palindrome.
</code></pre>

&#x20;

**Constraints:**

* `1 <= s.length <= 2 * 10^5`
* `s` consists only of printable ASCII characters.



### 先過濾再檢查是否和 reverse 結果相同

```typescript
function isPalindrome(s: string): boolean {
    // lowercase, trim, remove special chars
    const str = s.toLowerCase().replace(/[^a-z0-9]/g, '')

    return str === str.split('').reverse().join('')
};
```

### 一次迴圈檢查前後是否相同

空間複雜度是 O(n)：因為需要存儲過濾後的字符

```typescript
function isPalindrome(s: string): boolean {
    const inp = s.toLowerCase().split('').filter(c => c >='a' && c <='z' || c >= '0' && c<='9').join('');

    for (let i = 0; i< inp.length / 2; i++) {
        if (inp[i] != inp[inp.length - 1 - i]) {
            return false;
        }
    }

    return true;
};
```



### 雙指針

空間複雜度是 O(1)：只使用常數空間來保存指針和變數

```typescript
function isPalindrome(s: string): boolean {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }

        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}

function isAlphanumeric(char: string): boolean {
    return /^[a-z0-9]$/i.test(char);
}
```

