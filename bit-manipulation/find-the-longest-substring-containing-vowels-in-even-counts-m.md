# Find the Longest Substring Containing Vowels in Even Counts (M)

[1371. Find the Longest Substring Containing Vowels in Even Counts](https://leetcode.com/problems/find-the-longest-substring-containing-vowels-in-even-counts/)



Given the string `s`, return the size of the longest substring containing each vowel an even number of times. That is, 'a', 'e', 'i', 'o', and 'u' must appear an even number of times.

&#x20;

**Example 1:**

<pre><code><strong>Input: s = "eleetminicoworoep"
</strong><strong>Output: 13
</strong><strong>Explanation: The longest substring is "leetminicowor" which contains two each of the vowels: e, i and o and zero of the vowels: a and u.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: s = "leetcodeisgreat"
</strong><strong>Output: 5
</strong><strong>Explanation: The longest substring is "leetc" which contains two e's.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: s = "bcbcbc"
</strong><strong>Output: 6
</strong><strong>Explanation: In this case, the given string "bcbcbc" is the longest because all vowels: a, e, i, o and u appear zero times.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= s.length <= 5 x 10^5`
* `s` contains only lowercase English letters.



### Bit manipulation

Ref [https://leetcode.com/problems/find-the-longest-substring-containing-vowels-in-even-counts/solutions/5790619/simple-logic](https://leetcode.com/problems/find-the-longest-substring-containing-vowels-in-even-counts/solutions/5790619/simple-logic)

```typescript
function findTheLongestSubstring(s: string): number {
    // 定義一個元音對應的位元掩碼映射
    const vowMap: { [key: string]: number } = { 'a': 0, 'e': 1, 'i': 2, 'o': 3, 'u': 4 };
    
    // 初始化一個 Map 來記錄每種位元掩碼第一次出現的位置，初始狀態為 0，位置為 -1
    const firstIndexMap: Map<number, number> = new Map([[0, -1]]);
    
    let mask: number = 0;  // 用來記錄當前字串的位元掩碼狀態
    let resLen: number = 0;  // 用來記錄結果中最長的符合條件的子字串長度

    // 遍歷字串的每個字符
    for (let i = 0; i < s.length; i++) {
        // 如果當前字符是元音，更新對應的位元掩碼
        if (s[i] in vowMap) {
            mask ^= 1 << vowMap[s[i]];  // 將元音對應的位元反轉
        }

        // 檢查當前的位元掩碼狀態是否已經出現過
        if (firstIndexMap.has(mask)) {
            // 如果出現過，計算當前子字串的長度並更新結果
            resLen = Math.max(resLen, i - firstIndexMap.get(mask)!);
        } else {
            // 如果未出現過，記錄當前位元掩碼第一次出現的位置
            firstIndexMap.set(mask, i);
        }
    }

    // 返回結果中最長的符合條件的子字串長度
    return resLen;
};
```

1. vowMap (元音映射): 這個物件將元音字母對應到一個數字，a 對應 0，e 對應 1，依此類推。這是為了在稍後的位元運算中，根據元音字母對應的位元進行狀態更新。
2. firstIndexMap (記錄位元掩碼首次出現的位置):這個 Map 用來記錄不同的位元掩碼狀態第一次出現的位置。起初將位元掩碼 0 對應到位置 -1，表示當所有元音字母的個數都是偶數時，這是起始狀態
3. mask (位元掩碼):位元掩碼是用來記錄當前元音狀態的，根據元音出現次數進行更新。每當元音字母出現時，會根據 vowMap 中對應的位元反轉，當該元音出現奇數次時，該位元為 1，出現偶數次時則為 0。
4. 主要邏輯:
   * 在遍歷字串時，當遇到元音字母時，更新對應的位元狀態。
   * 如果當前的位元掩碼狀態在 firstIndexMap 中已出現過，說明從上次該狀態出現到現在，所有元音字母的出現次數都是偶數次，因此可以計算當前子字串的長度並更新結果。
   * 如果該位元掩碼狀態第一次出現，則將該狀態對應的索引記錄下來。
5. 最終結果:
   * 返回的是找到的符合條件的最長子字串長度。
