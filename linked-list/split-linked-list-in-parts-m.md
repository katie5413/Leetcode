# Split Linked List in Parts (M)

[725. Split Linked List in Parts](https://leetcode.com/problems/split-linked-list-in-parts/)



Given the `head` of a singly linked list and an integer `k`, split the linked list into `k` consecutive linked list parts.

The length of each part should be as equal as possible: no two parts should have a size differing by more than one. This may lead to some parts being null.

The parts should be in the order of occurrence in the input list, and parts occurring earlier should always have a size greater than or equal to parts occurring later.

Return _an array of the_ `k` _parts_.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/06/13/split1-lc.jpg)

<pre><code><strong>Input: head = [1,2,3], k = 5
</strong><strong>Output: [[1],[2],[3],[],[]]
</strong><strong>Explanation:
</strong>The first element output[0] has output[0].val = 1, output[0].next = null.
The last element output[4] is null, but its string representation as a ListNode is [].
</code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/06/13/split2-lc.jpg)

<pre><code><strong>Input: head = [1,2,3,4,5,6,7,8,9,10], k = 3
</strong><strong>Output: [[1,2,3,4],[5,6,7],[8,9,10]]
</strong><strong>Explanation:
</strong>The input has been split into consecutive parts with size difference at most 1, and earlier parts are a larger size than the later parts.
</code></pre>

&#x20;

**Constraints:**

* The number of nodes in the list is in the range `[0, 1000]`.
* `0 <= Node.val <= 1000`
* `1 <= k <= 50`



```typescript
/**
 * 單向鏈結串列的定義
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val === undefined ? 0 : val)
 *         this.next = (next === undefined ? null : next)
 *     }
 * }
 */

function splitListToParts(head: ListNode | null, k: number): Array<ListNode | null> {
    // 初始化結果陣列，預設為長度 k 的 null 陣列
    let ans = new Array(k).fill(null);

    // 計算鏈結串列的總長度
    let size = 0;
    let current = head;
    while (current) {
        size++; // 計算每個節點
        current = current.next; // 遍歷到下一個節點
    }

    // 計算每個部分的最小大小
    let splitSize = Math.floor(size / k); // 每一部分最少的節點數
    let remainder = size % k; // 剩餘無法均分的節點數

    current = head; // 重置當前節點為鏈結串列的頭節點
    let prev = null; // 用於跟蹤前一個節點，方便切斷鏈結
    for (let i = 0; i < k; i++) {
        // 將當前的鏈結部分分配給結果陣列的第 i 個位置
        ans[i] = current;

        // 計算當前部分的大小，若有剩餘節點則加 1
        let currentSize = splitSize + (remainder > 0 ? 1 : 0);
        remainder--; // 每分配一個多餘節點就減少一個

        // 遍歷當前部分的節點，移動指標到該部分的尾部
        for (let j = 0; j < currentSize; j++) {
            prev = current; // 跟蹤當前節點
            current = current.next; // 移動到下一個節點
        }

        // 切斷當前部分的鏈結串列，使其獨立
        if (prev) prev.next = null;
    }

    // 返回分割後的鏈結串列部分
    return ans;
};
```
