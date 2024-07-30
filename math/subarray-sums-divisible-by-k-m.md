# Subarray Sums Divisible by K (M)

[974. Subarray Sums Divisible by K](https://leetcode.com/problems/subarray-sums-divisible-by-k/)



Given an integer array `nums` and an integer `k`, return _the number of non-empty **subarrays** that have a sum divisible by_ `k`.

A **subarray** is a **contiguous** part of an array. **（重點：子陣列要是連續的！！！）**

&#x20;

**Example 1:**

<pre><code><strong>Input: nums = [4,5,0,-2,-3,1], k = 5
</strong><strong>Output: 7
</strong><strong>Explanation: There are 7 subarrays with a sum divisible by k = 5:
</strong>[4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]
</code></pre>

**Example 2:**

<pre><code><strong>Input: nums = [5], k = 9
</strong><strong>Output: 0
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= nums.length <= 3 * 10^4`
* `-104 <= nums[i] <= 10^4`
* `2 <= k <= 10^4`



### 前綴和（Prefix Sum）

前綴和是指一個陣列中從起始位置到索引 i 的所有元素的總和。如果我們知道前綴和，我們可以輕鬆計算任何子陣列的和。

例如，如果 nums = \[4, 5, 0, -2, -3, 1]，那麼前綴和為 \[4, 9, 9, 7, 4, 5]。

### 前綴和的餘數性質

模運算（Modulo Operation）： 如果兩個前綴和在除以 k 後有相同的餘數，這兩個索引之間的元素的總和是 k 的倍數。這是因為這兩個和之間的差是可以被 k 整除的。

假設 prefixSum\[i] 是從陣列起點到索引 i 的前綴和，prefixSum\[j] 是從陣列起點到索引 j 的前綴和（i < j），並且這兩個前綴和的餘數相同，即：

prefixSum\[i] % k = prefixSum\[j] % k

這表示：

(prefixSum\[j] - prefixSum\[i]) % k = 0

即從索引 i+1 到 j 的子陣列和能被 k 整除。

```typescript
function subarraysDivByK(nums: number[], k: number): number {
    let res = 0; // 初始化結果變數，儲存總和能被 k 整除的子陣列數量
    let prefix = 0; // 初始化前綴和變數，儲存累積和的餘數
    let arr = new Array(k).fill(0); // 長度為 k 的陣列，預設為 0，用來計數不同餘數的出現次數
    arr[0] = 1; // 將 arr[0] 設為 1，代表 0 出現過一次，以處理一開始前綴和就能被 k 整除的情況

    // 遍歷 nums 陣列中的每個元素
    for (let num of nums) {
        // 更新累積前綴和的餘數
        // 對 num 取餘數，再加上 k，最後再取餘數，使結果在範圍 [0, k-1] 內確保餘數為非負數
        prefix = (prefix + num % k + k) % k;

        // 如果當前前綴和的餘數在 arr 中已出現過，
        // 表示存在一些子陣列的總和能被 k 整除，因為兩個具有相同餘數的前綴和之間的子陣列和必然能被 k 整除
        // 將這些子陣列的數量累加到結果中
        res += arr[prefix];

        // 更新當前餘數的計數
        arr[prefix]++;
    }

    return res; // 返回結果
}
```



```typescript
function subarraysDivByK(nums: number[], k: number): number {
    // 建立一個哈希表來存儲每個餘數出現的頻率，初始化為 {0: 1} 以處理前綴和本身可以被 k 整除的情況
    const prefixCount = new Map<number, number>();
    prefixCount.set(0, 1);

    let prefixSum = 0; // 用於跟踪累積和
    let count = 0; // 用於存儲符合條件的子陣列數量

    // 遍歷陣列中的每個元素
    for (let num of nums) {
        prefixSum += num; // 更新累積和
        // 計算累積和對 k 取模的餘數，並將其調整為非負值
        let remainder = ((prefixSum % k) + k) % k;

        // 如果這個餘數之前已經出現過，意味著存在以當前索引結尾的子陣列可以被 k 整除
        if (prefixCount.has(remainder)) {
            count += prefixCount.get(remainder)!; // 增加計數器
        }

        // 更新哈希表中當前餘數的出現次數
        prefixCount.set(remainder, (prefixCount.get(remainder) || 0) + 1);
    }

    return count; // 返回所有和可以被 k 整除的子陣列數量
}
```



nums = \[5,3,3], k = 3

\[5] => 5 / 3 = 1...2

\[5, 3] => 8 / 3 = 2...2

\[5, 3, 3] => 11 / 3 = 3...2

餘數 2 總共出現三次

原本不懂 5, 8, 11 哪裡可以被 3 整除

&#x20;\[3],  \[3, 3] 怎麼算都是兩個而已，後來意識到是有兩個 3 ，可以視為獨立的子陣列

所以是  \[3],   \[3],  \[3, 3] &#x20;



最終這個還是數學問題ＲＲＲＲＲ
