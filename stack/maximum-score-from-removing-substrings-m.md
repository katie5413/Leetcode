# Maximum Score From Removing Substrings (M)

You are given a string `s` and two integers `x` and `y`. You can perform two types of operations any number of times.

* Remove substring `"ab"` and gain `x` points.
  * For example, when removing `"ab"` from `"cabxbae"` it becomes `"cxbae"`.
* Remove substring `"ba"` and gain `y` points.
  * For example, when removing `"ba"` from `"cabxbae"` it becomes `"cabxe"`.

Return _the maximum points you can gain after applying the above operations on_ `s`.

&#x20;

**Example 1:**

<pre><code><strong>Input: s = "cdbcbbaaabab", x = 4, y = 5
</strong><strong>Output: 19
</strong><strong>Explanation:
</strong>- Remove the "ba" underlined in "cdbcbbaaabab". Now, s = "cdbcbbaaab" and 5 points are added to the score.
- Remove the "ab" underlined in "cdbcbbaaab". Now, s = "cdbcbbaa" and 4 points are added to the score.
- Remove the "ba" underlined in "cdbcbbaa". Now, s = "cdbcba" and 5 points are added to the score.
- Remove the "ba" underlined in "cdbcba". Now, s = "cdbc" and 5 points are added to the score.
Total score = 5 + 4 + 5 + 5 = 19.
</code></pre>

**Example 2:**

<pre><code><strong>Input: s = "aabbaaxybbaabb", x = 5, y = 4
</strong><strong>Output: 20
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= s.length <= 105`
* `1 <= x, y <= 104`
* `s` consists of lowercase English letters.



```typescript
function maximumGain(s: string, x: number, y: number): number {
    let totalPoints = 0;

    // 定義兩個輔助函數用於移除 "ab" 和 "ba"
    function removeAb(s: string): [string, number] {
        let stack: string[] = [];
        let points = 0;

        for (let char of s) {
            if (stack.length > 0 && stack[stack.length - 1] === 'a' && char === 'b') {
                stack.pop();
                points += x;
            } else {
                stack.push(char);
            }
        }

        return [stack.join(''), points];
    }

    function removeBa(s: string): [string, number] {
        let stack: string[] = [];
        let points = 0;

        for (let char of s) {
            if (stack.length > 0 && stack[stack.length - 1] === 'b' && char === 'a') {
                stack.pop();
                points += y;
            } else {
                stack.push(char);
            }
        }

        return [stack.join(''), points];
    }

    // 根據 x 和 y 的大小決定移除順序
    if (x > y) {
        // 先移除 "ab"，再移除 "ba"
        let result = removeAb(s);
        totalPoints += result[1];
        result = removeBa(result[0]);
        totalPoints += result[1];
    } else {
        // 先移除 "ba"，再移除 "ab"
        let result = removeBa(s);
        totalPoints += result[1];
        result = removeAb(result[0]);
        totalPoints += result[1];
    }

    return totalPoints;
}
```



<figure><img src="../.gitbook/assets/截圖 2024-07-13 下午10.34.08.png" alt=""><figcaption></figcaption></figure>
