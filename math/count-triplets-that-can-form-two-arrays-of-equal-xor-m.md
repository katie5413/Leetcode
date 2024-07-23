# Count Triplets That Can Form Two Arrays of Equal XOR (M)

[1442. Count Triplets That Can Form Two Arrays of Equal XOR](https://leetcode.com/problems/count-triplets-that-can-form-two-arrays-of-equal-xor/)



Given an array of integers `arr`.

We want to select three indices `i`, `j` and `k` where `(0 <= i < j <= k < arr.length)`.

Let's define `a` and `b` as follows:

* `a = arr[i] ^ arr[i + 1] ^ ... ^ arr[j - 1]`
* `b = arr[j] ^ arr[j + 1] ^ ... ^ arr[k]`

Note that **^** denotes the **bitwise-xor** operation.

Return _the number of triplets_ (`i`, `j` and `k`) Where `a == b`.

&#x20;

**Example 1:**

<pre><code><strong>Input: arr = [2,3,1,6,7]
</strong><strong>Output: 4
</strong><strong>Explanation: The triplets are (0,1,2), (0,2,2), (2,3,4) and (2,4,4)
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: arr = [1,1,1,1,1]
</strong><strong>Output: 10
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= arr.length <= 300`
* `1 <= arr[i] <= 108`



### XOR

時間複雜度 O(n^3)

```typescript
function countTriplets(arr: number[]): number {
    let ans = 0
    // 前綴異或數組
    let prefixXor = new Array(arr.length + 1).fill(0);
    for (let i = 0; i < arr.length; i++) {
        prefixXor[i + 1] = prefixXor[i] ^ arr[i];
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            for (let k = j; k < arr.length; k++) {
                // 如果 prefixXor[i] == prefixXor[k + 1]，說明 a == b
                if (prefixXor[i] == prefixXor[k + 1]) {
                    ans++;
                }
            }
        }

    }

    return ans

};
```

* prefixXor\[0] = 0 （一開始設置為0）
* prefixXor\[i] = arr\[0] ^ arr\[1] ^ ... ^ arr\[i-1] 對於 1 <= i <= n，其中 n 是數組 arr 的長度。
* arr\[i] ^ arr\[i+1] ^ ... ^ arr\[j] = prefixXor\[j+1] ^ prefixXor\[i]\


這是因為異或運算具有如下性質：

* 自反性：a ^ a = 0
* 結合性：a ^ (b ^ c) = (a ^ b) ^ c

```
prefixXor[4] = arr[0] ^ arr[1] ^ arr[2] ^ arr[3]
prefixXor[1] = arr[0]
arr[1] ^ arr[2] ^ arr[3] = prefixXor[4] ^ prefixXor[1]
```

因此根據題目所規定的

```
a = arr[i] ^ arr[i + 1] ^ ... ^ arr[j - 1]
b = arr[j] ^ arr[j + 1] ^ ... ^ arr[k]
```

這可以轉化為檢查 prefixXor\[i] == prefixXor\[k+1]。如果滿足這個條件，則 a == b。





時間複雜度 O(n^2)

```typescript
function countTriplets(arr: number[]): number {
    let count = 0;
    let n = arr.length;

    // 前綴異或數組
    let prefixXor = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefixXor[i + 1] = prefixXor[i] ^ arr[i];
    }

    // 遍歷所有可能的 (i, k) 對
    for (let i = 0; i < n; i++) {
        for (let k = i + 1; k < n; k++) {
            // 如果 prefixXor[i] == prefixXor[k + 1]，則對於所有 i < j <= k，a == b
            if (prefixXor[i] == prefixXor[k + 1]) {
                count += (k - i);
            }
        }
    }

    return count;
}
```

如果 prefixXor\[i] == prefixXor\[k + 1]，則對於所有 j 在 i < j <= k 的情況下，a == b。

因此只需要算有多少組 i, k 符合

如果 prefixXor\[i] == prefixXor\[k + 1]，則對於每個 i < j <= k，都滿足 a == b，這樣的 j 的數量為 (k - i)，所以計數器增加 (k - i)。



### 類似的做法

但不用紀錄前綴異或數組，因此空間複雜度較少

時間複雜度: O(n^2)。雙重循環遍歷所有可能的區間

空間複雜度: O(1)。只使用了常數空間來存儲變數 triplets 和 xorValue

```typescript
function countTriplets(input: number[]): number {
      let triplets = 0;

    for (let start = 0; start < input.length; ++start) {
        let xorValue = input[start];

        for (let end = start + 1; end < input.length; ++end) {
            xorValue = xorValue ^ input[end];

            if (xorValue === 0) {
                triplets += end - start;
            }
        }
    }
    return triplets;
};
```

計算從 start 到 end 的所有元素的異或值 xorValue。

如果 xorValue 為 0，則意味著 a == b，此時更新三元組數量 triplets。

### 推薦）Map

```typescript
// Time: O(n)
// Space: O(n)
function countTriplets(arr: number[]): number {
    const n = arr.length
    const freqMap = new Map<number, number>()
    const totalMap = new Map<number, number>()
    let prefixXor = 0
    freqMap.set(0, 1)  // 初始化，處理從頭開始的異或值情況
    let cnt = 0

    for (let i = 1; i <= n; i++) {
        prefixXor ^= arr[i - 1]  // 計算當前的前綴異或值
        const freq = freqMap.get(prefixXor) ?? 0  // 查詢前綴異或值的出現次數
        const total = totalMap.get(prefixXor) ?? 0  // 查詢前綴異或值的索引和
        cnt += freq * (i - 1) - total  // 更新符合條件的三元組數量
        freqMap.set(prefixXor, freq + 1)  // 更新前綴異或值的出現次數
        totalMap.set(prefixXor, total + i)  // 更新前綴異或值的索引和
    }

    return cnt
}
```

* 初始化：
  * freqMap 設置 prefixXor 值 0 出現 1 次，這是為了處理從頭開始的異或值情況。
  * totalMap 初始化為空。
  * prefixXor 初始化為 0。
* 遍歷數組 arr：
  * 在每一個位置 i，計算當前的 prefixXor。
  * 查詢 prefixXor 出現的次數 freq 和其對應的索引和 total。
  * 更新 cnt：cnt += freq \* (i - 1) - total。這是因為對於每個出現過相同 prefixXor 的索引 j，都可以形成一組 (i, j, k)，並且 (i - 1) 是表示考慮到數組索引從 0 開始的情況。
  * 更新 freqMap 和 totalMap，將當前的 prefixXor 出現次數和索引和更新到映射中。
