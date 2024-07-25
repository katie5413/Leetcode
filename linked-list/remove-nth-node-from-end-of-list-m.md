# Remove Nth Node From End of List (M)

[19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)



Given the `head` of a linked list, remove the `nth` node from the end of the list and return its head.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/03/remove\_ex1.jpg)

<pre><code><strong>Input: head = [1,2,3,4,5], n = 2
</strong><strong>Output: [1,2,3,5]
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: head = [1], n = 1
</strong><strong>Output: []
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: head = [1,2], n = 1
</strong><strong>Output: [1]
</strong></code></pre>

&#x20;

**Constraints:**

* The number of nodes in the list is `sz`.
* `1 <= sz <= 30`
* `0 <= Node.val <= 100`
* `1 <= n <= sz`

&#x20;

**Follow up:** Could you do this in one pass?



時間複雜度: O(n)

• 第一次遍歷計算鏈結串列的長度，耗費 O(n) 時間。

• 第二次遍歷找到要移除的節點，耗費 O(n) 時間。

• 總共需要 O(n) + O(n) = O(n) 時間。



空間複雜度: O(1)

• 僅使用了常數空間來儲存指標和變數（如 current, fast, length 等）。

```typescript
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    // Only one
    if (!head.next) return null
    // Target head
    let ans = head
    let current = head;
    let fast = head;
    let length = 1

    // get total length
    while (fast.next) {
        fast = fast.next;
        length++
    }

    // go to n-1
    for (let i = 0; i < length - n - 1; i++) {
        current = current.next
    }

    // if need to remove head
    if (length - n === 0) {
        ans = ans.next
    } else {
        current.next = current.next.next
    }


    return ans

};
```





### 優化後解法（一次遍歷）

時間複雜度: O(n)

• 使用快慢指標遍歷一次鏈結串列，耗費 O(n) 時間。

\
空間複雜度: O(1)

• 僅使用了常數空間來儲存指標和變數（如 dummy, slow, fast 等）。

```typescript
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    const dummy = new ListNode(0, head);
    let slow: ListNode | null = dummy;
    let fast: ListNode | null = dummy;

    // Move fast pointer n steps ahead
    for (let i = 0; i < n + 1; i++) {
        fast = fast.next;
    }

    // Move both pointers until fast reaches the end
    while (fast !== null) {
        slow = slow.next;
        fast = fast.next;
    }

    // Remove the nth node from the end
    slow.next = slow.next!.next;

    return dummy.next;
}
```

1. 使用 dummy 節點來簡化邊界情況（例如移除第一個節點）。
2. 使用 fast 指標先移動 n+1 步，然後同時移動 fast 和 slow 指標直到 fast 到達鏈表末尾。此時，slow 指標將正好位於需要移除的節點之前。
3. 移除 slow.next 所指向的節點。
