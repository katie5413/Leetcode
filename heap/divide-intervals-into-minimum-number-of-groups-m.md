# Divide Intervals Into Minimum Number of Groups (M)

[2406. Divide Intervals Into Minimum Number of Groups](https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups/)



You are given a 2D integer array `intervals` where `intervals[i] = [lefti, righti]` represents the **inclusive** interval `[lefti, righti]`.

You have to divide the intervals into one or more **groups** such that each interval is in **exactly** one group, and no two intervals that are in the same group **intersect** each other.

Return _the **minimum** number of groups you need to make_.

Two intervals **intersect** if there is at least one common number between them. For example, the intervals `[1, 5]` and `[5, 8]` intersect.

&#x20;\> 找出最少需要多少「群組」來容納一組間隔（intervals），保證每個群組內的間隔互不重疊。

**Example 1:**

<pre><code><strong>Input: intervals = [[5,10],[6,8],[1,5],[2,3],[1,10]]
</strong><strong>Output: 3
</strong><strong>Explanation: We can divide the intervals into the following groups:
</strong>- Group 1: [1, 5], [6, 8].
- Group 2: [2, 3], [5, 10].
- Group 3: [1, 10].
It can be proven that it is not possible to divide the intervals into fewer than 3 groups.
</code></pre>

**Example 2:**

<pre><code><strong>Input: intervals = [[1,3],[5,6],[8,10],[11,13]]
</strong><strong>Output: 1
</strong><strong>Explanation: None of the intervals overlap, so we can put all of them in one group.
</strong></code></pre>

&#x20;

**Constraints:**

* `1 <= intervals.length <= 105`
* `intervals[i].length == 2`
* `1 <= left_i <= right_i <= 10^6`



Ref. [https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups/solutions/5901263/37ms-nlogn-beats-100-two-sorted-vecs-for-start-and-end-of-interval-count-up-and-down-and-track](https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups/solutions/5901263/37ms-nlogn-beats-100-two-sorted-vecs-for-start-and-end-of-interval-count-up-and-down-and-track)

```typescript
function minGroups(intervals: number[][]): number {
    // 將開始時間和結束時間分別存入 starts 和 ends 陣列
    const [starts, ends] = intervals.reduce(
        (a, inter) => {
            a[0].push(inter[0]);  // 存入開始時間
            a[1].push(inter[1]);  // 存入結束時間
            return a;
        }, [[], []]);

    // 將開始時間和結束時間分別排序
    starts.sort((a, b) => a - b);
    ends.sort((a, b) => a - b);

    let total = 0;  // 當前同時存在的間隔數量
    let maxTotal = 0;  // 最多同時存在的間隔數量
    let si = 0;  // 開始時間指標
    let ei = 0;  // 結束時間指標

    // 遍歷所有的開始時間
    while (si < intervals.length) {
        if (starts[si] <= ends[ei]) {
            // 有新間隔開始，間隔數量加 1
            total += 1;
            si += 1;
            // 更新最多同時存在的間隔數量
            maxTotal = Math.max(maxTotal, total);
        } else {
            // 有間隔結束，間隔數量減 1
            total -= 1;
            ei += 1;
        }
    }

    // 返回需要的最少群組數量
    return maxTotal;
};

```

<figure><img src="../.gitbook/assets/截圖 2024-10-12 上午11.37.13.png" alt=""><figcaption></figcaption></figure>

