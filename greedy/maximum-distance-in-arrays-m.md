# Maximum Distance in Arrays (M)

[624. Maximum Distance in Arrays](https://leetcode.com/problems/maximum-distance-in-arrays/)



You are given `m` `arrays`, where each array is sorted in **ascending order**.

排序好的 m 個陣列

You can pick up two integers from two different arrays (each array picks one) and calculate the distance. We define the distance between two integers `a` and `b` to be their absolute difference `|a - b|`.

一個陣列只能選一個數字，共需兩個

Return _the maximum distance_.

回傳兩個數字的最大絕對值

**Example 1:**

<pre><code><strong>Input: arrays = [[1,2,3],[4,5],[1,2,3]]
</strong><strong>Output: 4
</strong><strong>Explanation: One way to reach the maximum distance 4 is to pick 1 in the first or third array and pick 5 in the second array.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: arrays = [[1],[1]]
</strong><strong>Output: 0
</strong></code></pre>

&#x20;

**Constraints:**

* `m == arrays.length`
* `2 <= m <= 10^5`
* `1 <= arrays[i].length <= 500`
* `-10^4 <= arrays[i][j] <= 10^4`
* `arrays[i]` is sorted in **ascending order**.
* There will be at most `10^5` integers in all the arrays.

### 紀錄個陣列最大跟最小的位置以及目前最大、最小，檢查是否在同一陣列

```typescript
function maxDistance(arrays: number[][]): number {
    const small: number[][] = []
    const big: number[][] = []
    let smallest: number[] = [0, Infinity]
    let biggest: number[] = [0, -Infinity]

    for (let i = 0; i < arrays.length; i++) {
        const s: number = arrays[i][0]
        const b: number = arrays[i][arrays[i].length - 1]

        if (s < smallest[1]) {
            smallest = [i, s]
        }
        if (b > biggest[1]) {
            biggest = [i, b]
        }

        small.push([i, s])
        big.push([i, b])
    }

    // 如果最大跟最小同時出現在同一陣列
    if (smallest[0] === biggest[0]) {
        // sort
        small.sort((a, b) => a[1] - b[1])
        big.sort((a, b) => b[1] - a[1])

        // s_1 - b_2
        const s1b2 = Math.abs(small[0][1] - big[1][1] )
        const s2b1 = Math.abs(small[1][1]  - big[0][1] )
        return Math.max(s1b2, s2b1)
    }
    
    return Math.abs(smallest[1] - biggest[1])
};
```

### 別人分享的

原本想太多，一直卡在如果最高最低在同一組要額外處理，但這裡比較的是轉換前的，剛好避開這個問題

```typescript
function maxDistance(arrays: number[][]): number {
    /*
    Find the max and min element - just take into consideration the first and the last element

    iterate for the m arrays identifyin the max and min


    keep track of the max and preMax and save its indexes and values, save the index of min as well

    if index of min and max are equal then return preMax - min

    return Math.abs(max - min)




    0,700.  | 1, 400

    max 700
    prevMax 400

    stackMax
    700
    400


    stackMin
    0
    1

    keep track of max and prevMax and min and prevMin
    */


    let res = 0;
    let n = arrays[0].length;
    let minVal = arrays[0][0];
    let maxVal = arrays[0][arrays[0].length - 1];

    for (let i = 1; i < arrays.length; i++) {
        n = arrays[i].length;
        res = Math.max(
            res,
            Math.max(
                Math.abs(arrays[i][n - 1] - minVal),
                Math.abs(maxVal - arrays[i][0])
            )
        );
        minVal = Math.min(minVal, arrays[i][0]);
        maxVal = Math.max(maxVal, arrays[i][n - 1]);
    }

    return res;

};
```

