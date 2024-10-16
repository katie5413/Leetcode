# Longest Happy String (M)

[1405. Longest Happy String](https://leetcode.com/problems/longest-happy-string/)



A string `s` is called **happy** if it satisfies the following conditions:

* `s` only contains the letters `'a'`, `'b'`, and `'c'`.
* `s` does not contain any of `"aaa"`, `"bbb"`, or `"ccc"` as a substring.
* `s` contains **at most** `a` occurrences of the letter `'a'`.
* `s` contains **at most** `b` occurrences of the letter `'b'`.
* `s` contains **at most** `c` occurrences of the letter `'c'`.

Given three integers `a`, `b`, and `c`, return _the **longest possible happy** string_. If there are multiple longest happy strings, return _any of them_. If there is no such string, return _the empty string_ `""`.

A **substring** is a contiguous sequence of characters within a string.



生成一個最長且「多樣」的字串，其中不會出現連續三個相同的字母。給定字母 'a'、'b' 和 'c' 的數量，程式會動態生成滿足條件的字串。

&#x20;

**Example 1:**

<pre><code><strong>Input: a = 1, b = 1, c = 7
</strong><strong>Output: "ccaccbcc"
</strong><strong>Explanation: "ccbccacc" would also be a correct answer.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: a = 7, b = 1, c = 0
</strong><strong>Output: "aabaa"
</strong><strong>Explanation: It is the only correct answer in this case.
</strong></code></pre>

&#x20;

**Constraints:**

* `0 <= a, b, c <= 100`
* `a + b + c > 0`



### Greedy

* **時間複雜度**：`O(n log n)`，主要是由於每次迴圈內的排序操作，其中 `n` 是字母的總數。
* **空間複雜度**：`O(n)`，儲存生成的結果字串。

Ref. [https://leetcode.com/problems/longest-happy-string/solutions/5918603/explained-step-by-step-beats-100-o-n-working-16-10-2024](https://leetcode.com/problems/longest-happy-string/solutions/5918603/explained-step-by-step-beats-100-o-n-working-16-10-2024)



```typescript
function longestDiverseString(a: number, b: number, c: number): string {
    // 創建一個包含字母及其數量的陣列
    const chars: [string, number][] = [
        ['a', a],
        ['b', b],
        ['c', c]
    ];
    
    // 初始化結果陣列和字母總數
    const ans: string[] = [];
    const sum: number = a + b + c;

    // 迴圈生成字串，直到用完所有字母或無法再添加字母
    while (ans.length < sum) {
        const n: number = ans.length;

        // 根據剩餘數量對字母進行排序，數量多的排在前面
        chars.sort(([, c1], [, c2]) => c2 - c1);

        // 選擇下一個要添加的字母
        // 如果結果的最後兩個字母和剩餘最多的字母相同，選擇次多的字母
        const char: [string, number] = 
            (ans[n - 1] === ans[n - 2] && ans[n - 1] === chars[0][0]) ? chars[1] : chars[0];
        
        // 如果選擇的字母數量為 0，則結束迴圈
        if (char[1] === 0) break;
        
        // 添加選擇的字母到結果陣列
        ans.push(char[0]);

        // 減少該字母的數量
        char[1]--;
    }

    // 將結果陣列轉換為字串並返回
    return ans.join('');
}

```



#### 解題思路：

1. **字元與計數的陣列**：用來儲存字母 'a'、'b'、'c' 及其各自的數量。這個陣列隨時按字母剩餘的數量進行排序，以便確保每次選擇當前數量最多的字母。
2. **避免三個相同字母連續出現**：每次從剩餘字母中選擇數量最多的字母，但如果選擇的字母與前面兩個字母相同，則選擇第二多的字母，避免產生三個相同字母的情況。
3. **生成結果字串**：一旦選擇了某個字母，將其加入結果字串中，並將其剩餘數量減 1。這個過程不斷重複，直到所有字母都被使用完畢或無法再選擇字母。

#### 詳細步驟：

1. 將字母 'a'、'b' 和 'c' 及其數量存入 `chars` 陣列。
2. 不斷排序 `chars` 陣列，確保每次都能優先選擇剩餘數量最多的字母。
3. 如果當前選擇的字母與前面兩個字母相同，則選擇次多的字母，避免三個相同字母連續出現。
4. 持續這樣添加字母，直到無法再添加字母為止。
5. 最後將字母陣列轉換為字串並返回。
