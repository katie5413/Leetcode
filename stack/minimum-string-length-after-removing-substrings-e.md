# Minimum String Length After Removing Substrings (E)

[2696. Minimum String Length After Removing Substrings](https://leetcode.com/problems/minimum-string-length-after-removing-substrings/)



You are given a string `s` consisting only of **uppercase** English letters.

You can apply some operations to this string where, in one operation, you can remove **any** occurrence of one of the substrings `"AB"` or `"CD"` from `s`.

Return _the **minimum** possible length of the resulting string that you can obtain_.

**Note** that the string concatenates after removing the substring and could produce new `"AB"` or `"CD"` substrings.



&#x20;`minLength` 函式的目的是移除字串中的特定配對 `'AB'` 或 `'CD'`，直到無法再移除為止，最終返回剩餘字串的長度。

&#x20;

**Example 1:**

<pre><code><strong>Input: s = "ABFCACDB"
</strong><strong>Output: 2
</strong><strong>Explanation: We can do the following operations:
</strong>- Remove the substring "ABFCACDB", so s = "FCACDB".
- Remove the substring "FCACDB", so s = "FCAB".
- Remove the substring "FCAB", so s = "FC".
So the resulting length of the string is 2.
It can be shown that it is the minimum length that we can obtain.
</code></pre>

**Example 2:**

<pre><code><strong>Input: s = "ACBBD"
</strong><strong>Output: 5
</strong><strong>Explanation: We cannot do any operations on the string so the length remains the same.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= s.length <= 100`
* `s` consists only of uppercase English letters.



### Stack

Ref [https://leetcode.com/problems/minimum-string-length-after-removing-substrings/solutions/3950755/easy-solution-using-only-stack-o-n](https://leetcode.com/problems/minimum-string-length-after-removing-substrings/solutions/3950755/easy-solution-using-only-stack-o-n)

```typescript
function minLength(s: string): number {
    const stack: string[] = []; // 建立一個空的堆疊

    // 遍歷字串中的每個字元
    for (let i = 0; i < s.length; i++) {
        // 檢查當前堆疊的頂部元素與當前字元組合是否為 'AB' 或 'CD'
        if (stack[stack.length - 1] + s[i] !== 'AB' && stack[stack.length - 1] + s[i] !== 'CD') {
            // 如果不是 'AB' 或 'CD'，將當前字元推入堆疊
            stack.push(s[i]);
        } else {
            // 如果是 'AB' 或 'CD'，將堆疊的頂部元素彈出，表示這對字元被移除
            stack.pop();
        }
    }

    // 返回堆疊中剩餘的字元數量
    return stack.length;
}

```



