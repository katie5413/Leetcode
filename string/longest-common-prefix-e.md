# Longest Common Prefix (E)

[14. Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/)



Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string `""`.

&#x20;

**Example 1:**

<pre><code><strong>Input: strs = ["flower","flow","flight"]
</strong><strong>Output: "fl"
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: strs = ["dog","racecar","car"]
</strong><strong>Output: ""
</strong><strong>Explanation: There is no common prefix among the input strings.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= strs.length <= 200`
* `0 <= strs[i].length <= 200`
* `strs[i]` consists of only lowercase English letters.



### 暴力解

跟 [find-the-index-of-the-first-occurrence-in-a-string-e.md](find-the-index-of-the-first-occurrence-in-a-string-e.md "mention") 類似

用 Array 紀錄，最後再用 join 組成字串

```typescript
function longestCommonPrefix(strs: string[]): string {
    const ans: string[] = []

    for (let j = 0; j < strs[0].length; j++) {
        let check = 0
        for (let i = 1; i < strs.length; i++) {
            if (strs[0][j] === strs[i][j]) {
                check++
            }
        }
        if (check === strs.length - 1) {
            ans.push(strs[0][j])
        } else {
            break
        }
    }

    return ans.join('')

};
```



### Slice

#### 假設第一個字段為前綴，去比對每一個字是否符合，若不符合則切掉

```typescript
function longestCommonPrefix(strs: string[]): string {
    let prefix = strs[0];
    strs.forEach(str => {
        if (str !== prefix) {
            for(let i = 0; i < prefix.length; i++) {
                if(prefix[i] !== str[i]) {
                    prefix = str.slice(0, i);
                    break;
                }
            }
        }
    });
    return prefix;
};
```



### Slice(0, -1) 切掉最後一個＋StartsWith() 檢查開頭

```typescript
const longestCommonPrefix = (strs: string[]): string => {
  let prefix: string = strs[0];

  for (let i: number = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
    }
  }
  
  return prefix;
};
```



### Sort

```typescript
function longestCommonPrefix(strs: string[]): string {
    strs = strs.sort();

    let ans = [];

    for (let i = 0; i < strs[0].length; i++) {
        // 比較排序後的第一個字串和最後一個字串的對應字符
        if (strs[0][i] === strs[strs.length - 1][i]) {
            ans.push(strs[0][i]);
        } else {
            break;
        }
    }
    return ans.join('');
};
```

排序後的字串陣列具有以下特性：如果有共同前綴，這個前綴會出現在排序後的第一個字串和最後一個字串中。通過比較這兩個字串的字符，我們可以確定共同前綴的長度。這種方法有效地縮小了比較範圍，提高了效率。
