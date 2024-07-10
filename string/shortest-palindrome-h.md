# Shortest Palindrome (H)

Related to [longest-palindromic-substring-m.md](longest-palindromic-substring-m.md "mention")



You are given a string `s`. You can convert `s` to a&#x20;

palindrome by adding characters in front of it.

Return _the shortest palindrome you can find by performing this transformation_.

&#x20;

**Example 1:**

<pre><code><strong>Input: s = "aacecaaa"
</strong><strong>Output: "aaacecaaa"
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: s = "abcd"
</strong><strong>Output: "dcbabcd"
</strong></code></pre>

&#x20;

**Constraints:**

* `0 <= s.length <= 5 * 104`
* `s` consists of lowercase English letters only.



### 反轉字串

```typescript
function shortestPalindrome(s: string): string {
    // 反轉字串 s
    const rev_s = s.split('').reverse().join('');
    const l = s.length;
    
    // 遍歷字串的每個字符
    for (let i = 0; i < l; i++) {
        // 比較 s 的前 l-i 個字符與反轉字串 rev_s 的從 i 開始的子字串
        // 如果這兩個子字串相等，表示找到匹配點
        if (s.substring(0, l - i) === rev_s.substring(i)) {
            // 將 rev_s 的前 i 個字符添加到 s 前面，構造最短的回文
            return rev_s.substring(0, i) + s;
        }
    }
    
    // 如果沒有匹配點（不太可能發生），返回空字串
    return '';
}
```

* **反轉字串**：首先，將字串 `s` 反轉，得到 `rev_s`。
* **尋找回文的匹配點**：從原字串的開始處逐步比較反轉後的字串，尋找完全相同的部分。
* **組合回文**：找到匹配點後，將反轉字串中未匹配的部分添加到原字串的前面。

<figure><img src="../.gitbook/assets/截圖 2024-07-09 下午8.08.21.png" alt=""><figcaption></figcaption></figure>
