# Most Beautiful Item for Each Query (M)

[2070. Most Beautiful Item for Each Query](https://leetcode.com/problems/most-beautiful-item-for-each-query/)



You are given a 2D integer array `items` where `items[i] = [pricei, beautyi]` denotes the **price** and **beauty** of an item respectively.

You are also given a **0-indexed** integer array `queries`. For each `queries[j]`, you want to determine the **maximum beauty** of an item whose **price** is **less than or equal** to `queries[j]`. If no such item exists, then the answer to this query is `0`.

Return _an array_ `answer` _of the same length as_ `queries` _where_ `answer[j]` _is the answer to the_ `jth` _query_.

&#x20;

**Example 1:**

<pre><code><strong>Input: items = [[1,2],[3,2],[2,4],[5,6],[3,5]], queries = [1,2,3,4,5,6]
</strong><strong>Output: [2,4,5,5,6,6]
</strong><strong>Explanation:
</strong>- For queries[0]=1, [1,2] is the only item which has price &#x3C;= 1. Hence, the answer for this query is 2.
- For queries[1]=2, the items which can be considered are [1,2] and [2,4]. 
  The maximum beauty among them is 4.
- For queries[2]=3 and queries[3]=4, the items which can be considered are [1,2], [3,2], [2,4], and [3,5].
  The maximum beauty among them is 5.
- For queries[4]=5 and queries[5]=6, all items can be considered.
  Hence, the answer for them is the maximum beauty of all items, i.e., 6.
</code></pre>

**Example 2:**

<pre><code><strong>Input: items = [[1,2],[1,2],[1,3],[1,4]], queries = [1]
</strong><strong>Output: [4]
</strong><strong>Explanation: 
</strong>The price of every item is equal to 1, so we choose the item with the maximum beauty 4. 
Note that multiple items can have the same price and/or beauty.  
</code></pre>

**Example 3:**

<pre><code><strong>Input: items = [[10,1000]], queries = [5]
</strong><strong>Output: [0]
</strong><strong>Explanation:
</strong>No item has a price less than or equal to 5, so no item can be chosen.
Hence, the answer to the query is 0.
</code></pre>

&#x20;

**Constraints:**

* `1 <= items.length, queries.length <= 10^5`
* `items[i].length == 2`
* `1 <= pricei, beautyi, queries[j] <= 10^9`



Ref. [https://leetcode.com/problems/most-beautiful-item-for-each-query/solutions/6036515/easy-understanding-solution-binary-search-100-beats](https://leetcode.com/problems/most-beautiful-item-for-each-query/solutions/6036515/easy-understanding-solution-binary-search-100-beats)

```typescript
function maximumBeauty(items: number[][], queries: number[]): number[] {
    items.sort((a, b) => a[0] - b[0])

    for (let i = 1; i < items.length; i++) {
        items[i][1] = Math.max(items[i - 1][1], items[i][1])
    }

    const res: number[] = []

    for (let i = 0; i < queries.length; i++) {
        let max = 0
        let left = 0, right = items.length - 1

        while (left <= right) {
            let mid = Math.floor((left + right) / 2)
            if (items[mid][0] > queries[i]) right = mid - 1
            else {
                max = Math.max(max, items[mid][1])
                left = mid + 1
            }
        }

        res.push(max)
    }

    return res
};
```

<figure><img src="../.gitbook/assets/截圖 2024-11-13 凌晨12.00.25.png" alt=""><figcaption></figcaption></figure>

