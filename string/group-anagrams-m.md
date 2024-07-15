# Group Anagrams (M)

[49. Group Anagrams](https://leetcode.com/problems/group-anagrams/)

Related to [valid-anagram-e.md](valid-anagram-e.md "mention")



Given an array of strings `strs`, group **the anagrams** together. You can return the answer in **any order**.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

&#x20;

**Example 1:**

<pre><code><strong>Input: strs = ["eat","tea","tan","ate","nat","bat"]
</strong><strong>Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: strs = [""]
</strong><strong>Output: [[""]]
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: strs = ["a"]
</strong><strong>Output: [["a"]]
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= strs.length <= 10^4`
* `0 <= strs[i].length <= 100`
* `strs[i]` consists of lowercase English letters.



### Sorting each string and using the sorted version as a key in a map to collect the anagrams together

這個解法的時間複雜度主要由排序操作決定，因此對每個字串進行排序的時間複雜度為 $$O(n \log n)$$，整體複雜度為  $$O(NK \log K)$$，其中 N 是字串數量，K 是每個字串的平均長度。

```typescript
function groupAnagrams(strs: string[]): string[][] {
    // Create an empty map to store the groups of anagrams
    const map: { [key: string]: string[] } = {};

    // Iterate through each string in the input array
    for (const str of strs) {
        // Sort the string and use it as the key
        const sortedStr = str.split('').sort().join('');
        
        // If the key does not exist in the map, initialize it with an empty array
        if (!map[sortedStr]) {
            map[sortedStr] = [];
        }
        
        // Add the original string to the corresponding key's array
        map[sortedStr].push(str);
    }

    // Return all the values in the map, which are the groups of anagrams
    return Object.values(map);
}
```

1. 建立一個映射（map）： 使用一個物件 map 來存儲異位詞組。
2. 遍歷字串陣列： 對於陣列中的每個字串，將其字母排序，這樣相同字母組成的字串就會得到相同的排序結果。
3. 將排序後的字串作為鍵值存入映射： 將排序後的字串作為鍵，如果這個鍵不存在於映射中，則創建一個新鍵，並將原始字串添加到相應的值陣列中。
4. 返回所有值： 最後，返回映射中的所有值，這些值就是異位詞分組的結果。

### PrimeHash

看到別人寫的酷方法，運用每個字元的 ASCII 值乘以一個對應的質數，來生成一個獨特的哈希值

```typescript
function groupAnagrams(strs: string[]): string[][] {
    // Create a new Map to store hash values and their corresponding anagram groups
    const map = new Map();

    // Iterate through each string in the input array
    for (let i = 0; i < strs.length; i++) {
        const curr = strs[i]; // Current string being processed
        const hash = primeHash(curr); // Calculate the hash value for the current string

        // Check if the hash already exists in the map
        if (map.has(hash)) {
            // If it exists, push the current string to the existing array
            map.get(hash).push(curr);
        } else {
            // If it does not exist, create a new entry in the map
            map.set(hash, [curr]);
        }
    }

    // Return all the values in the map as an array of anagram groups
    return Array.from(map.values());
}
```



primeHash 函數是一個用來計算字串哈希值的函數，通常用於將異位詞映射到同一個哈希值。雖然具體的實現可能有所不同，但以下是一個典型的 primeHash 函數的基本概念：



主要概念

1\. 質數的使用： 使用質數可以有效地減少哈希碰撞的機會，因為質數的特性有助於更均勻地分佈哈希值。

2\. 字符的乘積： 通過將字串中的每個字符的 ASCII 值乘以一個對應的質數，來生成一個獨特的哈希值。



範例實現

以下是一個簡單的 primeHash 函數範例：

```typescript
function primeHash(str: string): number {
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101];
    let hash = 1;

    for (let i = 0; i < str.length; i++) {
        // 取得字母對應的質數，並乘到哈希值上
        hash *= primes[str.charCodeAt(i) - 'a'.charCodeAt(0)];
    }

    return hash;
}
```

1\.  質數陣列： primes 陣列包含了小於 100 的前 25 個質數，對應於英文字母 a 到 z。

2\. 初始哈希值： hash 變數初始化為 1，因為我們會將所有質數乘起來。

3\. 遍歷字串： 使用 for 迴圈遍歷字串中的每個字符，計算其 ASCII 值並對應到 primes 陣列中。

4\. 計算哈希值： 將每個字符對應的質數與當前的 hash 相乘，生成最終的哈希值。



這樣生成的哈希值能夠有效地將異位詞映射到同一個值，使得在後續的分組過程中可以輕鬆找到它們。
