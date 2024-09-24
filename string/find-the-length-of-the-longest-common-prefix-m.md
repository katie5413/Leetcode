# Find the Length of the Longest Common Prefix (M)

[3043. Find the Length of the Longest Common Prefix](https://leetcode.com/problems/find-the-length-of-the-longest-common-prefix/)

Related to [longest-common-prefix-e.md](longest-common-prefix-e.md "mention")



You are given two arrays with **positive** integers `arr1` and `arr2`.

A **prefix** of a positive integer is an integer formed by one or more of its digits, starting from its **leftmost** digit. For example, `123` is a prefix of the integer `12345`, while `234` is **not**.

A **common prefix** of two integers `a` and `b` is an integer `c`, such that `c` is a prefix of both `a` and `b`. For example, `5655359` and `56554` have a common prefix `565` while `1223` and `43456` **do not** have a common prefix.

You need to find the length of the **longest common prefix** between all pairs of integers `(x, y)` such that `x` belongs to `arr1` and `y` belongs to `arr2`.

Return _the length of the **longest** common prefix among all pairs_. _If no common prefix exists among them_, _return_ `0`.

&#x20;

**Example 1:**

<pre><code><strong>Input: arr1 = [1,10,100], arr2 = [1000]
</strong><strong>Output: 3
</strong><strong>Explanation: There are 3 pairs (arr1[i], arr2[j]):
</strong>- The longest common prefix of (1, 1000) is 1.
- The longest common prefix of (10, 1000) is 10.
- The longest common prefix of (100, 1000) is 100.
The longest common prefix is 100 with a length of 3.
</code></pre>

**Example 2:**

<pre><code><strong>Input: arr1 = [1,2,3], arr2 = [4,4,4]
</strong><strong>Output: 0
</strong><strong>Explanation: There exists no common prefix for any pair (arr1[i], arr2[j]), hence we return 0.
</strong>Note that common prefixes between elements of the same array do not count.
</code></pre>

&#x20;

**Constraints:**

* `1 <= arr1.length, arr2.length <= 5 * 10^4`
* `1 <= arr1[i], arr2[i] <= 10^8`





```typescript
function longestCommonPrefix(arr1: number[], arr2: number[]): number {
    const trie = {}; // 建立一個字典樹的根節點，空的物件用來儲存每個數字的前綴
    for (const x of arr1) { // 針對第一個數字陣列中的每個數字進行處理
        let node = trie; // 從字典樹的根節點開始
        for (const d of String(x)) { // 將數字轉成字串，逐字元處理
            if (!node[d]) node[d] = {}; // 如果節點不存在，創建一個新的子節點
            node = node[d]; // 將當前節點移動到子節點
        }
    }

    let ans = 0; // 儲存最長共同前綴的長度
    for (const x of arr2) { // 針對第二個數字陣列中的每個數字進行處理
        let node = trie, prefix = 0; // 初始化當前節點為字典樹的根節點，並設定初始前綴長度為 0
        for (const d of String(x)) { // 將數字轉成字串，逐字元處理
            if (!node[d]) break; // 如果在字典樹中找不到對應的子節點，則結束搜尋
            ++prefix; // 若子節點存在，則增加前綴的長度
            node = node[d]; // 將當前節點移動到子節點
        }
        ans = Math.max(ans, prefix); // 更新最長共同前綴的長度
    }

    return ans; // 回傳最長共同前綴的長度
}
```
