# Check If Array Pairs Are Divisible by k (M)

[1497. Check If Array Pairs Are Divisible by k](https://leetcode.com/problems/check-if-array-pairs-are-divisible-by-k/)



Given an array of integers `arr` of even length `n` and an integer `k`.

We want to divide the array into exactly `n / 2` pairs such that the sum of each pair is divisible by `k`.

Return `true` _If you can find a way to do that or_ `false` _otherwise_.

&#x20;檢查一個數組中的元素是否可以兩兩配對，使得每一對數字的和都可以被一個整數 k 整除

**Example 1:**

<pre><code><strong>Input: arr = [1,2,3,4,5,10,6,7,8,9], k = 5
</strong><strong>Output: true
</strong><strong>Explanation: Pairs are (1,9),(2,8),(3,7),(4,6) and (5,10).
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: arr = [1,2,3,4,5,6], k = 7
</strong><strong>Output: true
</strong><strong>Explanation: Pairs are (1,6),(2,5) and(3,4).
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: arr = [1,2,3,4,5,6], k = 10
</strong><strong>Output: false
</strong><strong>Explanation: You can try all possible pairs to see that there is no way to divide arr into 3 pairs each with sum divisible by 10.
</strong></code></pre>

&#x20;

**Constraints:**

* `arr.length == n`
* `1 <= n <= 10^5`
* `n` is even.
* `-10^9 <= arr[i] <= 10^9`
* `1 <= k <= 10^5`



```typescript
function canArrange(arr: number[], k: number): boolean {

    const freq = new Array(k).fill(0);
    // 建立一個長度為 k 的陣列，初始化為 0，用來記錄每個餘數的出現次數

    for (const num of arr) {
        let rem = num % k;
        // 計算數字對 k 的餘數

        if (rem < 0) {
            rem += k;
            // 若餘數為負數，將其轉為正餘數
        }

        freq[rem]++;
        // 將該餘數對應的次數加一
    }

    if (freq[0] % 2 !== 0) {
        return false;
        // 如果能被 k 整除的數字 (餘數為 0) 出現的次數不是偶數，則無法配對，返回 false
    }

    for (let i = 1; i <= Math.floor(k / 2); i++) {
        if (freq[i] !== freq[k - i]) {
            return false;
            // 檢查餘數 i 和 k - i 的數量是否相等，若不相等則無法配對，返回 false
        }
    }

    return true;
    // 若所有條件都滿足，則返回 true，表示可以兩兩配對使得每對數字的和能被 k 整除
};
```
