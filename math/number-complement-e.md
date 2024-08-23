# Number Complement (E)

[476. Number Complement](https://leetcode.com/problems/number-complement/)

Related to [complement-of-base-10-integer-e.md](complement-of-base-10-integer-e.md "mention")



The **complement** of an integer is the integer you get when you flip all the `0`'s to `1`'s and all the `1`'s to `0`'s in its binary representation.

* For example, The integer `5` is `"101"` in binary and its **complement** is `"010"` which is the integer `2`.

Given an integer `num`, return _its complement_.

&#x20;

**Example 1:**

<pre><code><strong>Input: num = 5
</strong><strong>Output: 2
</strong><strong>Explanation: The binary representation of 5 is 101 (no leading zero bits), and its complement is 010. So you need to output 2.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: num = 1
</strong><strong>Output: 0
</strong><strong>Explanation: The binary representation of 1 is 1 (no leading zero bits), and its complement is 0. So you need to output 0.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= num < 2^31`



```typescript
function findComplement(num: number): number {
    // 把 num 轉成二進制
    const bit: string = num.toString(2)
    // 用陣列儲存轉換後的數字
    let ans: number[] = []
    for (let i = 0; i < bit.length; i++) {
        const n: number = 1 - parseInt(bit[i], 10)
        ans.push(n)
    }

    // 二進制轉回十進制
    return parseInt(ans.join(''), 2)
};
```



### 正規表達式

別人分享的

```typescript
function findComplement(num: number): number {
    return Number.parseInt(num.toString(2).replace(/[01]/g, n => `${1 - +n}`), 2);
};
```

* 轉換為二進位字串 (num.toString(2))：
  * num.toString(2) 將數字 num 轉換成二進位的字串。例如，如果 num 是 5，則會轉換成二進位字串 "101"。
* 使用正則表達式進行替換 (replace(/\[01]/g, n => ${1 - +n}))：
  * 這段代碼使用正則表達式 \[01] 配合全域標誌 (g) 來匹配字串中的每個 0 和 1。
  * 將每個匹配的 0 替換成 1，將每個 1 替換成 0。這是通過 n => ${1 - +n}\`\` 來實現的：
  * \+n 將字元 n 轉換成數字（例如 '1' 變成 1）。
  * 1 - +n 計算出補數（1 - 1 得到 0，1 - 0 得到 1）。
  * &#x20;最後，將結果拼接成字串進行替換。
* 轉換回十進位數字 (Number.parseInt(..., 2))：
  * Number.parseInt(..., 2) 將反轉後的二進位字串再轉換回十進位數字。例如，若反轉後的字串是 "010"，則會轉換成數字 2。

### log

別人分享的，看不太懂，問 chatgpt 的結果

```typescript
function findComplement(num: number): number {

    // 計算 num 的位元長度
    // Math.log2(num) 計算 num 的以 2 為底的對數，結果表示 num 的二進位表示中最高位元的位置（從 0 開始）。
    // +'' 會將數字轉成字串，但這裡似乎多餘了，所以可以省略。
    // parseInt(..., 10) 將結果轉換為整數，再加 1 得到 num 的位元長度 n。
    const n = parseInt(Math.log2(num) + '') + 1

    // 計算一個所有位元都為 1 且位元長度為 n 的二進位數字
    // 2**n 計算 2 的 n 次方（即一個位元長度為 n 的數字，其二進位表示為 100...0）
    // 減去 1，將該數字的所有位元設為 1，結果就是 n 個 1 組成的二進位數字。
    const binaryN = 2**n - 1
    
    // 使用 XOR 運算子 ^ 計算 num 的補數
    // XOR (亦或) 運算子的特性是：若位元相同則結果為 0，不同則結果為 1。
    // 將 num 與 binaryN 進行 XOR 運算，可以將 num 的位元反轉。
    return num ^ binaryN
};
```

1. 計算 num 的位元長度 (n)：
   * Math.log2(num) 計算 num 的以 2 為底的對數，表示 num 的二進位表示中最高位元的位置。例如，num = 5 時，Math.log2(5) 會得到 2.32（約略值）。
   * 將這個結果轉換為整數，再加上 1，得到二進位表示的長度 n。
2. 計算全為 1 的二進位數字 (binaryN)：
   * 2\*\*n 計算 2 的 n 次方（即一個位元長度為 n 的數字，其二進位表示為 100...0）。
   * 減去 1，將這個數字的所有位元設為 1。例如，當 n = 3 時，2\*\*3 - 1 得到 7，其二進位表示為 111。
3. 使用 XOR 運算計算補數：
   * 將 num 與 binaryN 進行 XOR 運算，這會將 num 的位元反轉。例如，若 num = 5 (101)，binaryN = 7 (111)，則 num ^ binaryN = 2 (010)，得到 num 的補數。
