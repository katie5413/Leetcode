# Find the Index of the First Occurrence in a String (E)

[28. Find the Index of the First Occurrence in a String](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/)



Given two strings `needle` and `haystack`, return the index of the first occurrence of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.

&#x20;

**Example 1:**

<pre><code><strong>Input: haystack = "sadbutsad", needle = "sad"
</strong><strong>Output: 0
</strong><strong>Explanation: "sad" occurs at index 0 and 6.
</strong>The first occurrence is at index 0, so we return 0.
</code></pre>

**Example 2:**

<pre><code><strong>Input: haystack = "leetcode", needle = "leeto"
</strong><strong>Output: -1
</strong><strong>Explanation: "leeto" did not occur in "leetcode", so we return -1.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= haystack.length, needle.length <= 10^4`
* `haystack` and `needle` consist of only lowercase English characters.

### 暴力解

```typescript
function strStr(haystack: string, needle: string): number {
    for (let i = 0; i < haystack.length; i++) {
        let check = 0
        for (let j = 0; j < needle.length; j++) {
            if (haystack[i + j] === needle[j]) {
                check++
            }
        }
        if (check === needle.length) {
            return i
        }
    }

    return -1

};
```



### IndexOf

```typescript
function strStr(haystack: string, needle: string): number {
    return haystack.indexOf(needle)
};
```

* indexOf 是 JavaScript 字串物件的內建方法。
* 語法：str.indexOf(searchValue, fromIndex?)，其中 searchValue 是要搜尋的子字串，fromIndex 是可選參數，表示開始搜尋的索引位置，預設為 0。
* 返回值：indexOf 返回 searchValue 在字串中首次出現的索引。如果未找到，則返回 -1。



### 字串切割

```typescript
function strStr(haystack: string, needle: string): number {    
    // 遍歷 haystack 字串
    for (let i = 0; i <= haystack.length - needle.length; i++) {
        // 檢查從當前索引開始的子字串是否與 needle 相等
        if (haystack.substring(i, i + needle.length) === needle) {
            return i;
        }
    }
    
    // 如果沒找到，返回 -1
    return -1;
}
```

### 類似的解法

```typescript
function strStr(haystack: string, needle: string): number {
    // First
    for (let i = 0; i < haystack.length - needle.length + 1; i++) {
        if (haystack.slice(i, i + needle.length) === needle) return i;
    }

    return -1;
};
```
