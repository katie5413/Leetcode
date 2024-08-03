# Make Two Arrays Equal by Reversing Subarrays (E)

[1460. Make Two Arrays Equal by Reversing Subarrays](https://leetcode.com/problems/make-two-arrays-equal-by-reversing-subarrays/)



You are given two integer arrays of equal length `target` and `arr`. In one step, you can select any **non-empty subarray** of `arr` and reverse it. You are allowed to make any number of steps.

Return `true` _if you can make_ `arr` _equal to_ `target` _or_ `false` _otherwise_.

&#x20;

**Example 1:**

<pre><code><strong>Input: target = [1,2,3,4], arr = [2,4,1,3]
</strong><strong>Output: true
</strong><strong>Explanation: You can follow the next steps to convert arr to target:
</strong>1- Reverse subarray [2,4,1], arr becomes [1,4,2,3]
2- Reverse subarray [4,2], arr becomes [1,2,4,3]
3- Reverse subarray [4,3], arr becomes [1,2,3,4]
There are multiple ways to convert arr to target, this is not the only way to do so.
</code></pre>

**Example 2:**

<pre><code><strong>Input: target = [7], arr = [7]
</strong><strong>Output: true
</strong><strong>Explanation: arr is equal to target without any reverses.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: target = [3,7,9], arr = [3,7,11]
</strong><strong>Output: false
</strong><strong>Explanation: arr does not have value 9 and it can never be converted to target.
</strong></code></pre>

&#x20;

**Constraints:**

* `target.length == arr.length`
* `1 <= target.length <= 1000`
* `1 <= target[i] <= 1000`
* `1 <= arr[i] <= 1000`



### 先排序，檢查有沒有全部一樣

```typescript
function canBeEqual(target: number[], arr: number[]): boolean {
    if (target.length !== arr.length) {
        return false
    }
    const sortTarget = target.sort((a, b) => a - b)
    const sortArr = arr.sort((a, b) => a - b)

    for (let i = 0; i < sortTarget.length; i++) {
        if (sortTarget[i] !== sortArr[i]) return false
    }

    return true

};
```



sort 會影響原本的陣列，因此可以不用額外的變數記住，直接用原本的 target, arr

```typescript
function canBeEqual(target: number[], arr: number[]): boolean {
  target.sort();
  arr.sort();
  return target.every((e, i) => e === arr[i])  
};
```

### 先排序，再用 join 串成字串來比較

```typescript
function canBeEqual(target: number[], arr: number[]): boolean {
    const tgtSorted = target.sort((a, b) => a - b);
    const arrSorted = arr.sort((a, b) => a - b);

    return tgtSorted.join(',') === arrSorted.join(',');
};
```



### 用 every 來檢查

every 要每個都是 true 才會回傳 true

```typescript
function canBeEqual(target: number[], arr: number[]): boolean {
  let targetSorted = target.sort((a, b) => a - b)
  let arrSorted = arr.sort((a, b) => a - b)
  
  return targetSorted.every((e, i) => e == arrSorted[i])
}
```
