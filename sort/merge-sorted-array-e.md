# Merge Sorted Array (E)

[88. Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)



You are given two integer arrays `nums1` and `nums2`, sorted in **non-decreasing order**, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively.

**Merge** `nums1` and `nums2` into a single array sorted in **non-decreasing order**.

The final sorted array should not be returned by the function, but instead be _stored inside the array_ `nums1`. To accommodate this, `nums1` has a length of `m + n`, where the first `m` elements denote the elements that should be merged, and the last `n` elements are set to `0` and should be ignored. `nums2` has a length of `n`.

&#x20;

**Example 1:**

<pre><code><strong>Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
</strong><strong>Output: [1,2,2,3,5,6]
</strong><strong>Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
</strong>The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
</code></pre>

**Example 2:**

<pre><code><strong>Input: nums1 = [1], m = 1, nums2 = [], n = 0
</strong><strong>Output: [1]
</strong><strong>Explanation: The arrays we are merging are [1] and [].
</strong>The result of the merge is [1].
</code></pre>

**Example 3:**

<pre><code><strong>Input: nums1 = [0], m = 0, nums2 = [1], n = 1
</strong><strong>Output: [1]
</strong><strong>Explanation: The arrays we are merging are [] and [1].
</strong>The result of the merge is [1].
Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.
</code></pre>

&#x20;

**Constraints:**

* `nums1.length == m + n`
* `nums2.length == n`
* `0 <= m, n <= 200`
* `1 <= m + n <= 200`
* `-10^9 <= nums1[i], nums2[j] <= 10^9`



### 先裁，再插，最後排

```typescript
/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    // crop
    nums1.splice(m, nums1.length - m)
    nums2.splice(n, n)

    // insert
    for (let i = 0; i < n; i++) {
        nums1.push(nums2[i])
    }

    nums1.sort((a, b) => a - b)
};
```

### 把 num1 第 m  個之後的用 nums2 的覆蓋，再排

因為題目已知要替換的長度與 nums2 相同

```typescript
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    for (let i = m, j = 0; j < n; i++, j++) {
        nums1[i] = nums2[j];
    }
    nums1.sort((a,b) => a - b);
};
```



### 結合 splice 與 sort

```typescript
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    nums1.splice(m, n, ...nums2);
    nums1.sort((a, b) => a - b);
}
```
