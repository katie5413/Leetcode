# Find the Distance Value Between Two Arrays (E)

[1385. Find the Distance Value Between Two Arrays](https://leetcode.com/problems/find-the-distance-value-between-two-arrays/)



Given two integer arrays `arr1` and `arr2`, and the integer `d`, _return the distance value between the two arrays_.

The distance value is defined as the number of elements `arr1[i]` such that there is not any element `arr2[j]` where `|arr1[i]-arr2[j]| <= d`.

&#x20;

**Example 1:**

<pre><code><strong>Input: arr1 = [4,5,8], arr2 = [10,9,1,8], d = 2
</strong><strong>Output: 2
</strong><strong>Explanation: 
</strong>For arr1[0]=4 we have: 
|4-10|=6 > d=2 
|4-9|=5 > d=2 
|4-1|=3 > d=2 
|4-8|=4 > d=2 
For arr1[1]=5 we have: 
|5-10|=5 > d=2 
|5-9|=4 > d=2 
|5-1|=4 > d=2 
|5-8|=3 > d=2
For arr1[2]=8 we have:
<strong>|8-10|=2 &#x3C;= d=2
</strong><strong>|8-9|=1 &#x3C;= d=2
</strong>|8-1|=7 > d=2
<strong>|8-8|=0 &#x3C;= d=2
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: arr1 = [1,4,2,3], arr2 = [-4,-3,6,10,20,30], d = 3
</strong><strong>Output: 2
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: arr1 = [2,1,100,3], arr2 = [-5,-2,10,-3,7], d = 6
</strong><strong>Output: 1
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= arr1.length, arr2.length <= 500`
* `-1000 <= arr1[i], arr2[j] <= 1000`
* `0 <= d <= 100`



時間複雜度：O(n \* m)

```typescript
function findTheDistanceValue(arr1: number[], arr2: number[], d: number): number {
    let sum: number = 0

    for (let i = 0; i < arr1.length; i++) {
        let valid: boolean = true
        for (let j = 0; j < arr2.length; j++) {

            if (Math.abs(arr1[i] - arr2[j]) <= d) {
                valid = false
                break
            }
        }

        if (valid) {
            sum++
        }
    }

    return sum

};
```



### 先排序再用二分法

時間複雜度：O(n \* log m)，其中 n 是 arr1 的長度，m 是 arr2 的長度

在 array  很大的時候效能會比較好

```typescript
function findTheDistanceValue(arr1: number[], arr2: number[], d: number): number {
    // 將 arr2 進行排序
    arr2.sort((a, b) => a - b);

    let count = 0;

    for (let i = 0; i < arr1.length; i++) {
        let valid = true;
        
        // 使用二分搜尋法查找最近的元素
        let left = 0, right = arr2.length - 1;
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (Math.abs(arr1[i] - arr2[mid]) <= d) {
                valid = false;
                break;
            } else if (arr2[mid] < arr1[i]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        if (valid) {
            count++;
        }
    }

    return count;
}
```
