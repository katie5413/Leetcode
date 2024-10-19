# Find Kth Bit in Nth Binary String (M)

[1545. Find Kth Bit in Nth Binary String](https://leetcode.com/problems/find-kth-bit-in-nth-binary-string/)



Given two positive integers `n` and `k`, the binary string `Sn` is formed as follows:

* `S1 = "0"`
* `Si = Si - 1 + "1" + reverse(invert(Si - 1))` for `i > 1`

Where `+` denotes the concatenation operation, `reverse(x)` returns the reversed string `x`, and `invert(x)` inverts all the bits in `x` (`0` changes to `1` and `1` changes to `0`).

For example, the first four strings in the above sequence are:

* `S1 = "0"`
* `S2 = "0`**`1`**`1"`
* `S3 = "011`**`1`**`001"`
* `S4 = "0111001`**`1`**`0110001"`

Return _the_ `kth` _bit_ _in_ `Sn`. It is guaranteed that `k` is valid for the given `n`.



這段程式碼的目的是在一個構造的字串中找到第 `k` 位的字元。該字串是根據一些規則遞迴生成的。

#### 題目解析：

* 第 `n` 層的字串 `S(n)` 是由 `S(n-1)`、一個 '1'、以及 `S(n-1)` 的翻轉和反轉組成。
* 比如：
  * `S(1) = "0"`
  * `S(2) = "011"`
  * `S(3) = "0111001"`
  * `S(4) = "011100110110001"`
* 目標是找到這樣的字串中第 `k` 位的字元。

&#x20;

**Example 1:**

<pre><code><strong>Input: n = 3, k = 1
</strong><strong>Output: "0"
</strong><strong>Explanation: S3 is "0111001".
</strong>The 1st bit is "0".
</code></pre>

**Example 2:**

<pre><code><strong>Input: n = 4, k = 11
</strong><strong>Output: "1"
</strong><strong>Explanation: S4 is "011100110110001".
</strong>The 11th bit is "1".
</code></pre>

&#x20;

**Constraints:**

* `1 <= n <= 20`
* `1 <= k <= 2^n - 1`





Ref.&#x20;

[https://leetcode.com/problems/find-kth-bit-in-nth-binary-string/solutions/5935309/6-lines-of-code-beats-96-00](https://leetcode.com/problems/find-kth-bit-in-nth-binary-string/solutions/5935309/6-lines-of-code-beats-96-00)

```typescript
function findKthBit(n: number, k: number): string {
    // 如果是 S(1)，直接返回 '0'
    if (n === 1) return '0';
    
    // S(n) 的長度為 2^n - 1
    let length = (1 << n) - 1;
    
    // 中點位置
    let mid = Math.floor(length / 2) + 1;
    
    // 如果 k 等於中點，則該位一定是 '1'
    if (k === mid) return '1';
    
    // 如果 k 小於中點，則在 S(n-1) 中查找第 k 位
    if (k < mid) return findKthBit(n - 1, k);
    
    // 如果 k 大於中點，則在 S(n-1) 的反轉中查找相應位置
    // 如果該位是 '0'，則反轉後是 '1'；如果是 '1'，反轉後是 '0'
    return findKthBit(n - 1, length - k + 1) === '0' ? '1' : '0';
}

```

#### 思路：

1. **字串的長度**：每一層的字串長度是上一層字串長度的兩倍再加一。可以發現 `S(n)` 的長度是 `2^n - 1`。
2. **中點**：第 `n` 層的字串 `S(n)` 中間的字元一定是 '1'，它位於字串的正中間。這個字元的位置是 `mid = (長度 // 2) + 1`。
3. **遞迴查找**：根據 `k` 的位置，可以將問題轉化為查找更小層的字串：
   * 如果 `k` 位於字串的前半部分（即 `k < mid`），則問題等同於在 `S(n-1)` 中查找第 `k` 位。
   * 如果 `k` 位於字串的後半部分（即 `k > mid`），則問題等同於在 `S(n-1)` 的反轉中查找相應位置的字元。

#### 具體步驟：

1. **基礎情況**：如果 `n === 1`，此時字串是 "0"，因此返回 '0'。
2. **計算長度**：`S(n)` 的長度是 `2^n - 1`，可以用位移運算 `(1 << n) - 1` 計算。
3. **找到中點**：`mid` 是字串的中點，即 `Math.floor(length / 2) + 1`。
4. **遞迴**：根據 `k` 的值，決定遞迴查找的方向。
   * 如果 `k === mid`，直接返回 '1'，因為中點字元一定是 '1'。
   * 如果 `k < mid`，在 `S(n-1)` 中遞迴查找第 `k` 位。
   * 如果 `k > mid`，在 `S(n-1)` 的反轉中查找，並取反。
