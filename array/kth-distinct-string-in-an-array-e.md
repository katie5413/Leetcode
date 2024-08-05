# Kth Distinct String in an Array (E)

[2053. Kth Distinct String in an Array](https://leetcode.com/problems/kth-distinct-string-in-an-array/)



A **distinct string** is a string that is present only **once** in an array.

Given an array of strings `arr`, and an integer `k`, return _the_ `kth` _**distinct string** present in_ `arr`. If there are **fewer** than `k` distinct strings, return _an **empty string**_ `""`.

Note that the strings are considered in the **order in which they appear** in the array.

&#x20;

**Example 1:**

<pre><code><strong>Input: arr = ["d","b","c","b","c","a"], k = 2
</strong><strong>Output: "a"
</strong><strong>Explanation:
</strong>The only distinct strings in arr are "d" and "a".
"d" appears 1st, so it is the 1st distinct string.
"a" appears 2nd, so it is the 2nd distinct string.
Since k == 2, "a" is returned. 
</code></pre>

**Example 2:**

<pre><code><strong>Input: arr = ["aaa","aa","a"], k = 1
</strong><strong>Output: "aaa"
</strong><strong>Explanation:
</strong>All strings in arr are distinct, so the 1st string "aaa" is returned.
</code></pre>

**Example 3:**

<pre><code><strong>Input: arr = ["a","b","a"], k = 3
</strong><strong>Output: ""
</strong><strong>Explanation:
</strong>The only distinct string is "b". Since there are fewer than 3 distinct strings, we return an empty string "".
</code></pre>

&#x20;

**Constraints:**

* `1 <= k <= arr.length <= 1000`
* `1 <= arr[i].length <= 5`
* `arr[i]` consists of lowercase English letters.



### 用 Map 紀錄每個字出現幾次，找出只出現一次的，檢查有沒有第 k 個

```typescript
function kthDistinct(arr: string[], k: number): string {
    const map = new Map<string, number>()

    for (const str of arr) {
        map.set(str, (map.get(str) || 0) + 1)
    }

    const distintStr = Array.from(map).filter((item) => item[1] === 1)

    if (distintStr.length >= k) {
        return distintStr[k - 1][0]
    }

    return ""
};
```
