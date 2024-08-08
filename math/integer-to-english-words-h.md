# Integer to English Words (H)

[273. Integer to English Words](https://leetcode.com/problems/integer-to-english-words/)



Convert a non-negative integer `num` to its English words representation.

&#x20;

**Example 1:**

<pre><code><strong>Input: num = 123
</strong><strong>Output: "One Hundred Twenty Three"
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: num = 12345
</strong><strong>Output: "Twelve Thousand Three Hundred Forty Five"
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: num = 1234567
</strong><strong>Output: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
</strong></code></pre>

&#x20;

**Constraints:**

* `0 <= num <= 2^31 - 1`



```typescript
function numberToWords(num: number): string {
    if (num === 0) return "Zero"; // 如果數字是0，直接返回"Zero"

    const lessThan20 = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", 
                        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", 
                        "Eighteen", "Nineteen"]; // 小於20的數字對應的英文單詞
    
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]; // 十位數的英文單詞
    
    const thousands = ["", "Thousand", "Million", "Billion"]; // 千、百萬、十億等數量級的英文單詞

    function helper(num: number): string { // 處理小於1000的數字
        if (num === 0) {
            return "";
        } else if (num < 20) {
            return lessThan20[num] + " "; // 小於20的數字
        } else if (num < 100) {
            return tens[Math.floor(num / 10)] + " " + helper(num % 10); // 小於100的數字
        } else {
            return lessThan20[Math.floor(num / 100)] + " Hundred " + helper(num % 100); // 小於1000的數字
        }
    }

    let result = ""; // 最終結果字符串
    for (let i = 0, unit = 1; i < thousands.length; i++, unit *= 1000) { // 迭代處理每個數量級
        if (Math.floor(num / unit) % 1000 !== 0) { // 如果這個數量級不為0
            result = helper(Math.floor(num / unit) % 1000) + thousands[i] + " " + result; // 拼接當前數量級的英文單詞
        }
    }

    return result.trim(); // 去除結果字符串兩端的空格並返回
}
```
