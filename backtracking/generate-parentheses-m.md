# Generate Parentheses (M)

[22. Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)



Given `n` pairs of parentheses, write a function to _generate all combinations of well-formed parentheses_.

&#x20;

**Example 1:**

<pre><code><strong>Input: n = 3
</strong><strong>Output: ["((()))","(()())","(())()","()(())","()()()"]
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: n = 1
</strong><strong>Output: ["()"]
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= n <= 8`



### Backtracking

參考 [letter-combinations-of-a-phone-number-m.md](letter-combinations-of-a-phone-number-m.md "mention") 的寫法

把每次的問題拆解成是否可以加左括號跟右括號

並設定停止線：當 str 長度為 n\*2 時，紀錄到 ans 陣列

一開始可以先塞一個左括號，可以少算一步

```typescript
function generateParenthesis(n: number): string[] {
    let ans: string[] = []

    // 紀錄左右括號的數量
    const bt = (left: number, right: number, str: string) => {
        if (str.length === n * 2) {
            ans.push(str)
            return
        }
        // 是否可以加左掛號
        if (left < n) {
            bt(left + 1, right, str.concat('('))
        }
        // 是否可以加右掛號
        if (left > right) {
            bt(left, right + 1, str.concat(')'))
        }

    }

    bt(1, 0, '(')

    return ans
};
```



<figure><img src="../.gitbook/assets/截圖 2024-08-06 下午6.45.14.png" alt=""><figcaption></figcaption></figure>
