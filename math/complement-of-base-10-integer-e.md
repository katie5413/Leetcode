# Complement of Base 10 Integer (E)

[1009. Complement of Base 10 Integer](https://leetcode.com/problems/complement-of-base-10-integer/)

Related to [number-complement-e.md](number-complement-e.md "mention")



The **complement** of an integer is the integer you get when you flip all the `0`'s to `1`'s and all the `1`'s to `0`'s in its binary representation.

* For example, The integer `5` is `"101"` in binary and its **complement** is `"010"` which is the integer `2`.

Given an integer `n`, return _its complement_.

&#x20;

**Example 1:**

<pre><code><strong>Input: n = 5
</strong><strong>Output: 2
</strong><strong>Explanation: 5 is "101" in binary, with complement "010" in binary, which is 2 in base-10.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: n = 7
</strong><strong>Output: 0
</strong><strong>Explanation: 7 is "111" in binary, with complement "000" in binary, which is 0 in base-10.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: n = 10
</strong><strong>Output: 5
</strong><strong>Explanation: 10 is "1010" in binary, with complement "0101" in binary, which is 5 in base-10.
</strong></code></pre>

&#x20;

**Constraints:**

* `0 <= n < 10^9`

&#x20;

**Note:** This question is the same as 476: [https://leetcode.com/problems/number-complement/](https://leetcode.com/problems/number-complement/)



### 補數

```typescript
function bitwiseComplement(n: number): number {
    // 1. 將 n 轉換為二進位字串，並計算其長度
    // 2. 使用 '1'.repeat() 生成一個與 n 的位元長度相同，且所有位元為 '1' 的字串
    // 3. 將這個字串轉換為十進位數字
    // 4. 用該數字減去 n，得到補數

    return parseInt('1'.repeat((n >>> 0).toString(2).length), 2) - n;
};
```

1. 將 n 轉換為二進位字串並計算長度：
   * n >>> 0 是一個無符號右移操作，用於確保 n 被視為無符號整數來處理，即使 n 是負數。
   * &#x20;(n >>> 0).toString(2) 將 n 轉換為二進位字串，例如，n = 5 時，會得到 "101"。
   * .length 計算這個二進位字串的長度。對於 n = 5，這個長度是 3。
2. 生成全為 1 的二進位字串：
   * '1'.repeat(...) 生成一個與 n 的二進位表示長度相同的字串，所有位元都是 1。
   * 例如，當 n = 5，生成的字串是 "111"。
3. 將全為 1 的字串轉換為十進位數字：
   * parseInt(..., 2) 將這個字串從二進位轉換為十進位數字。例如，"111" 會被轉換為 7。
4. 計算補數：
   * 用這個全為 1 的數字減去 n，即 7 - 5，得到 2，這就是 n 的補數。



### 比較像正常人的解法

```typescript
function bitwiseComplement(n: number): number {
        
    const binaryStr = n.toString(2);
    
    let complement = '';
    for(const c of binaryStr){
        if (c == '1'){
            complement +='0'
        }else{
            complement +='1'
        }
    }
    
    return parseInt(complement,2);

};
```
