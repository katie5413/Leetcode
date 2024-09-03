# Sum of Digits of String After Convert (E)

[1945. Sum of Digits of String After Convert](https://leetcode.com/problems/sum-of-digits-of-string-after-convert/)



You are given a string `s` consisting of lowercase English letters, and an integer `k`.

First, **convert** `s` into an integer by replacing each letter with its position in the alphabet (i.e., replace `'a'` with `1`, `'b'` with `2`, ..., `'z'` with `26`). Then, **transform** the integer by replacing it with the **sum of its digits**. Repeat the **transform** operation `k` **times** in total.

For example, if `s = "zbax"` and `k = 2`, then the resulting integer would be `8` by the following operations:

* **Convert**: `"zbax" ➝ "(26)(2)(1)(24)" ➝ "262124" ➝ 262124`
* **Transform #1**: `262124 ➝ 2 + 6 + 2 + 1 + 2 + 4 ➝ 17`
* **Transform #2**: `17 ➝ 1 + 7 ➝ 8`

Return _the resulting integer after performing the operations described above_.

&#x20;

**Example 1:**

<pre><code><strong>Input: s = "iiii", k = 1
</strong><strong>Output: 36
</strong><strong>Explanation: The operations are as follows:
</strong>- Convert: "iiii" ➝ "(9)(9)(9)(9)" ➝ "9999" ➝ 9999
- Transform #1: 9999 ➝ 9 + 9 + 9 + 9 ➝ 36
Thus the resulting integer is 36.
</code></pre>

**Example 2:**

<pre><code><strong>Input: s = "leetcode", k = 2
</strong><strong>Output: 6
</strong><strong>Explanation: The operations are as follows:
</strong>- Convert: "leetcode" ➝ "(12)(5)(5)(20)(3)(15)(4)(5)" ➝ "12552031545" ➝ 12552031545
- Transform #1: 12552031545 ➝ 1 + 2 + 5 + 5 + 2 + 0 + 3 + 1 + 5 + 4 + 5 ➝ 33
- Transform #2: 33 ➝ 3 + 3 ➝ 6
Thus the resulting integer is 6.
</code></pre>

**Example 3:**

<pre><code><strong>Input: s = "zbax", k = 2
</strong><strong>Output: 8
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= s.length <= 100`
* `1 <= k <= 10`
* `s` consists of lowercase English letters.



### CharCodeAt 拿到索引後轉成文字再加

```typescript
function getLucky(s: string, k: number): number {
    let num: string = '';
    // 將字串 s 中的每個字母轉換為其在字母表中的位置數字並拼接成一個字串
    for (let i = 0; i < s.length; i++) {
        num += (s.charCodeAt(i) - 96).toString(); // 96 是 'a' 前一個字符的 ASCII 值，因此 'a' 對應 1
    }

    let res: number = 0;

    // 進行 k 次轉換操作
    while (k > 0) {
        // 將字串 num 中的每個數字相加
        for (let i = 0; i < num.length; i++) {
            res += parseInt(num[i]);
        }
        // 將相加結果轉換為字串並更新 num
        num = res.toString();
        // 重置 res 以便進行下一次迭代
        res = 0;
        // k 減少一次
        k--;
    }

    // 返回最終轉換後的結果，轉換為數字型別
    return parseInt(num);
};
```

### Math

直接拿除以十的商，加上餘數，就是二位數字的加總

```typescript
function getLucky(s: string, k: number): number {
    // 定義字母 'a' 的 Unicode 編碼值作為基礎值
    const base = 'a'.charCodeAt(0);
    
    let sum = 0;
    // 遍歷字串 s 中的每個字母
    for (let i = 0; i < s.length; i++) {
        // 計算字母在字母表中的位置值 (1-26)
        const val = s.charCodeAt(i) - base + 1;
        // 將位置值的每個位數相加，並累加到 sum
        sum += Math.floor(val / 10) + val % 10;
    }
    
    // 重複進行 k-1 次操作
    for (let i = 1; i < k; i++) {
        // 將 sum 轉換為字串形式
        let numStr = sum.toString();
        sum = 0;
        // 將字串中每個數字相加
        for (let j = 0; j < numStr.length; j++) {
            sum += Number(numStr[j]);
        }
    }
    
    // 返回最終的 sum 值
    return sum;
};
```
