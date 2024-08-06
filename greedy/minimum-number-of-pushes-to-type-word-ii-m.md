# Minimum Number of Pushes to Type Word II (M)

[3016. Minimum Number of Pushes to Type Word II](https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-ii/)



You are given a string `word` containing lowercase English letters.

Telephone keypads have keys mapped with **distinct** collections of lowercase English letters, which can be used to form words by pushing them. For example, the key `2` is mapped with `["a","b","c"]`, we need to push the key one time to type `"a"`, two times to type `"b"`, and three times to type `"c"` _._

It is allowed to remap the keys numbered `2` to `9` to **distinct** collections of letters. The keys can be remapped to **any** amount of letters, but each letter **must** be mapped to **exactly** one key. You need to find the **minimum** number of times the keys will be pushed to type the string `word`.

Return _the **minimum** number of pushes needed to type_ `word` _after remapping the keys_.

An example mapping of letters to keys on a telephone keypad is given below. Note that `1`, `*`, `#`, and `0` do **not** map to any letters.

![](https://assets.leetcode.com/uploads/2023/12/26/keypaddesc.png)

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2023/12/26/keypadv1e1.png)

<pre><code><strong>Input: word = "abcde"
</strong><strong>Output: 5
</strong><strong>Explanation: The remapped keypad given in the image provides the minimum cost.
</strong>"a" -> one push on key 2
"b" -> one push on key 3
"c" -> one push on key 4
"d" -> one push on key 5
"e" -> one push on key 6
Total cost is 1 + 1 + 1 + 1 + 1 = 5.
It can be shown that no other mapping can provide a lower cost.
</code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2023/12/26/keypadv2e2.png)

<pre><code><strong>Input: word = "xyzxyzxyzxyz"
</strong><strong>Output: 12
</strong><strong>Explanation: The remapped keypad given in the image provides the minimum cost.
</strong>"x" -> one push on key 2
"y" -> one push on key 3
"z" -> one push on key 4
Total cost is 1 * 4 + 1 * 4 + 1 * 4 = 12
It can be shown that no other mapping can provide a lower cost.
Note that the key 9 is not mapped to any letter: it is not necessary to map letters to every key, but to map all the letters.
</code></pre>

**Example 3:**

![](https://assets.leetcode.com/uploads/2023/12/27/keypadv2.png)

<pre><code><strong>Input: word = "aabbccddeeffgghhiiiiii"
</strong><strong>Output: 24
</strong><strong>Explanation: The remapped keypad given in the image provides the minimum cost.
</strong>"a" -> one push on key 2
"b" -> one push on key 3
"c" -> one push on key 4
"d" -> one push on key 5
"e" -> one push on key 6
"f" -> one push on key 7
"g" -> one push on key 8
"h" -> two pushes on key 9
"i" -> one push on key 9
Total cost is 1 * 2 + 1 * 2 + 1 * 2 + 1 * 2 + 1 * 2 + 1 * 2 + 1 * 2 + 2 * 2 + 6 * 1 = 24.
It can be shown that no other mapping can provide a lower cost.
</code></pre>

&#x20;

**Constraints:**

* `1 <= word.length <= 10^5`
* `word` consists of lowercase English letters.



### Greedy

一開始以為跟以前按鍵式手機一樣，可以建好數字表之後直接暴力累加，後來發現按鍵是可以任意填的，所以要改成按照頻率，出現次數多得讓他少按一點，且只有八個鍵盤可以放，因此如果八種以內的字，權重為 1 就直接累加 1，超過八種就每八個權重就多加一

```typescript
function minimumPushes(word: string): number {
    let map: Map<string, number> = new Map();

    // 建立頻率表
    for (const letter of word) {
        map.set(letter, (map.get(letter) || 0) + 1)
    }

    // 按頻率排序，且多的在前面
    const sortMap = Array.from(map).sort((a, b) => b[1] - a[1])
    let sum: number = 0;

    // 初始為 1，每 8 個多加 1
    for (let i = 0; i < sortMap.length; i++) {
        const count = (1 + Math.floor(i / 8)) * sortMap[i][1]
        sum += count
    }

    return sum

};
```



```typescript
function minimumPushes(word: string): number {
    /**
        Greedy
        Count chars and map
        Then arrange the dial according to most used char
        then just count 
     */
    const charCount: Map<string, number> = word.split('').reduce((a, c) => {
        a.set(c, (a.get(c) ?? 0) + 1)
        return a;
    }, new Map<string, number>())
    const sortedKeys: string[] = [...charCount.entries()].sort((a, c) => c[1] - a[1]).map(([key, entry]) => key)
    let result = 0
    let coeff = 1
    for (let i = 0; i < sortedKeys.length; i++) {
        result += charCount.get(sortedKeys[i]) * coeff
        if ((i + 1) % 8 === 0) coeff++
    }
    return result;
};
```
