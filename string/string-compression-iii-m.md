# String Compression III (M)

[3163. String Compression III](https://leetcode.com/problems/string-compression-iii/)



Given a string `word`, compress it using the following algorithm:

* Begin with an empty string `comp`. While `word` is **not** empty, use the following operation:
  * Remove a maximum length prefix of `word` made of a _single character_ `c` repeating **at most** 9 times.
  * Append the length of the prefix followed by `c` to `comp`.

Return the string `comp`.

&#x20;

**Example 1:**

**Input:** word = "abcde"

**Output:** "1a1b1c1d1e"

**Explanation:**

Initially, `comp = ""`. Apply the operation 5 times, choosing `"a"`, `"b"`, `"c"`, `"d"`, and `"e"` as the prefix in each operation.

For each prefix, append `"1"` followed by the character to `comp`.

**Example 2:**

**Input:** word = "aaaaaaaaaaaaaabb"

**Output:** "9a5a2b"

**Explanation:**

Initially, `comp = ""`. Apply the operation 3 times, choosing `"aaaaaaaaa"`, `"aaaaa"`, and `"bb"` as the prefix in each operation.

* For prefix `"aaaaaaaaa"`, append `"9"` followed by `"a"` to `comp`.
* For prefix `"aaaaa"`, append `"5"` followed by `"a"` to `comp`.
* For prefix `"bb"`, append `"2"` followed by `"b"` to `comp`.

&#x20;

**Constraints:**

* `1 <= word.length <= 2 * 10^5`
* `word` consists only of lowercase English letters.



**O(n)**，其中 `n` 是字串長度

#### 程式解析

1. **初始化結果字串**：
   * `comp` 用於儲存壓縮結果。
2. **逐字元遍歷**：
   * 透過 `for` 循環並在每次成功計數一組後增量移動指標 `i`。
   * 設置 `k` 限制計數上限到 `i + 9`，確保不會超過9個連續字符。
3. **計數連續字符**：
   * 使用 `while` 迴圈來計算連續的相同字符數量 `length`。
   * 在以下三種情況中跳出計數：
     * 到達字串結尾。
     * 超過9個相同字符。
     * 下一個字符不同。
4. **壓縮結果更新**：
   * 將計數 `length` 和當前字符 `char` 附加到 `comp`。
5. **返回壓縮後的結果**。

Ref. [https://leetcode.com/problems/string-compression-iii/solutions/6004708/beats-100-simple-explained-step-by-step-most-common-interview-string](https://leetcode.com/problems/string-compression-iii/solutions/6004708/beats-100-simple-explained-step-by-step-most-common-interview-string)

```typescript
function compressedString(word: string): string {
    // 初始化結果字串
    let comp: string = "";
    let n: number = word.length;

    // 遍歷字串
    for (let i: number = 0; i < n;) {
        let char: string = word[i]; // 目前字符
        let k: number = i + 9; // 計數上限設為 i + 9
        let length: number = 0; // 當前字符的計數

        // 計算連續字符數量
        while (i < n && i < k && word[i] === char) {
            length += 1;
            i += 1;
        }

        // 加入計數和字符到結果字串
        comp += length.toString() + char;
    }

    return comp;
}

```

<figure><img src="../.gitbook/assets/截圖 2024-11-04 晚上11.41.53.png" alt=""><figcaption></figcaption></figure>

