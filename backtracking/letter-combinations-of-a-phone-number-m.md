# Letter Combinations of a Phone Number (M)

[17. Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)



Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in **any order**.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

![](https://assets.leetcode.com/uploads/2022/03/15/1200px-telephone-keypad2svg.png)

&#x20;

**Example 1:**

<pre><code><strong>Input: digits = "23"
</strong><strong>Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: digits = ""
</strong><strong>Output: []
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: digits = "2"
</strong><strong>Output: ["a","b","c"]
</strong></code></pre>

&#x20;

**Constraints:**

* `0 <= digits.length <= 4`
* `digits[i]` is a digit in the range `['2', '9']`.



### Backtracking

```typescript
const map = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["x", "y", "z", "w"]
};

function letterCombinations(digits: string): string[] {
    let result: string[] = [];

    const bt = (i: number, str: string) => {
        // 如果 str 的長度等於 digits 的長度，說明已經生成了一個完整的字母組合，將其加入結果列表 result
        if (str.length === digits.length) {
            result.push(str);
            return;
        }

        // 否則，對應 digits[i] 的所有字母，遞迴調用 bt 函數，將當前字母添加到 str 中，並進入下一個索引
        map[digits[i]].forEach((char) => {
            bt(i + 1, str + char)
        })
    }

    // 如果 digits 非空，從索引 0 和空字串開始調用回溯函數
    digits && bt(0, "");

    return result;
}
```



{% code fullWidth="true" %}
```
                                      ("", 0)
                    /                   |                   \
               ("a", 1)             ("b", 1)             ("c", 1)
             /    |    \           /    |    \           /    |    \
       ("ad", 2) ("ae", 2) ("af", 2) ("bd", 2) ("be", 2) ("bf", 2) ("cd", 2) ("ce", 2) ("cf", 2)
       /  |  \   /  |  \   /  |  \   /  |  \   /  |  \   /  |  \   /  |  \   /  |  \   /  |  \
("adg") ("adh") ("adi") ("aeg") ("aeh") ("aei") ("afg") ("afh") ("afi") ("bdg") ("bdh") ("bdi") ("beg") ("beh") ("bei") ("bfg") ("bfh") ("bfi") ("cdg") ("cdh") ("cdi") ("ceg") ("ceh") ("cei")("cfg") ("cfh") ("cfi")
```
{% endcode %}
