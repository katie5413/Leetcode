# XOR Queries of a Subarray (M)

[1310. XOR Queries of a Subarray](https://leetcode.com/problems/xor-queries-of-a-subarray/)



You are given an array `arr` of positive integers. You are also given the array `queries` where `queries[i] = [left_i, right_i]`.

For each query `i` compute the **XOR** of elements from `left_i` to `right_i` (that is, `arr[left_i] XOR arr[left_i + 1] XOR ... XOR arr[right_i]` ).

Return an array `answer` where `answer[i]` is the answer to the `i_th` query.

&#x20;

**Example 1:**

<pre><code><strong>Input: arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]
</strong><strong>Output: [2,7,14,8] 
</strong><strong>Explanation: 
</strong>The binary representation of the elements in the array are:
1 = 0001 
3 = 0011 
4 = 0100 
8 = 1000 
The XOR values for queries are:
[0,1] = 1 xor 3 = 2 
[1,2] = 3 xor 4 = 7 
[0,3] = 1 xor 3 xor 4 xor 8 = 14 
[3,3] = 8
</code></pre>

**Example 2:**

<pre><code><strong>Input: arr = [4,8,2,10], queries = [[2,3],[1,3],[0,0],[0,3]]
</strong><strong>Output: [8,0,4,4]
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= arr.length, queries.length <= 3 * 10^4`
* `1 <= arr[i] <= 10^9`
* `queries[i].length == 2`
* `0 <= left_i <= right_i < arr.length`



### Bit Manipulation

（推薦）

```typescript
function xorQueries(arr: number[], queries: number[][]): number[] {
    const ans = []; // 初始化結果陣列，用於存儲每個查詢的結果
    const prefix = [0, arr[0]]; // 初始化前綴 XOR 陣列，prefix[0] 設為 0，prefix[1] 設為 arr[0]

    // 計算前綴 XOR 值
    for (let i = 1; i < arr.length; i++) {
        prefix.push(prefix[i] ^ arr[i]); 
        // 前綴 XOR: prefix[i + 1] = prefix[i] XOR arr[i]
        // 這樣可以快速取得從 arr[0] 到 arr[i] 的所有元素的 XOR 結果
    }

    // 處理每個查詢
    for (const [left, right] of queries) {
        // 根據前綴 XOR 的性質，計算區間 [left, right] 的 XOR 結果
        ans.push(prefix[left] ^ prefix[right + 1]);
        // 這裡使用 prefix[right + 1] XOR prefix[left] 來計算範圍內的 XOR 值
        // 原理是：prefix[right + 1] 包含了從 0 到 right 的 XOR 結果，
        // prefix[left] 則包含了從 0 到 left - 1 的 XOR 結果，
        // 當兩者 XOR 時，範圍 [0, left - 1] 的部分會相互抵消，剩下的就是 [left, right] 的 XOR 結果。
    }

    return ans; // 返回結果陣列
}
```

<figure><img src="../.gitbook/assets/截圖 2024-09-13 晚上11.21.52.png" alt=""><figcaption></figcaption></figure>





Ref [https://leetcode.com/problems/xor-queries-of-a-subarray/solutions/5778700/beats-100-explained-with-video-c-java-python-js-prefix-xor-explained-in-detail](https://leetcode.com/problems/xor-queries-of-a-subarray/solutions/5778700/beats-100-explained-with-video-c-java-python-js-prefix-xor-explained-in-detail)

```typescript
function xorQueries(arr: number[], queries: number[][]): number[] {
    const n = arr.length;
    const pre = new Array(n);
    
    // 初始化前綴 XOR 陣列，第一個元素與原始陣列相同
    pre[0] = arr[0];
    
    // 計算每個位置的前綴 XOR 值
    for (let i = 1; i < n; i++) {
        pre[i] = pre[i - 1] ^ arr[i]; // 前綴 XOR 是前一個 XOR 結果與當前元素的 XOR
    }
    
    const res = [];
    
    // 處理每個查詢區間
    for (const [left, right] of queries) {
        if (left === 0) {
            // 如果區間起點是 0，直接返回 pre[right] 的值
            res.push(pre[right]);
        } else {
            // 否則，返回 pre[right] 與 pre[left - 1] 的 XOR 值
            res.push(pre[right] ^ pre[left - 1]);
        }
    }
    
    // 返回結果陣列
    return res;
};
```
