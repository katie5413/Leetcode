# Linked List Cycle (E)

[141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)



Given `head`, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, `pos` is used to denote the index of the node that tail's `next` pointer is connected to. **Note that `pos` is not passed as a parameter**.

Return `true` _if there is a cycle in the linked list_. Otherwise, return `false`.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png)

<pre><code><strong>Input: head = [3,2,0,-4], pos = 1
</strong><strong>Output: true
</strong><strong>Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
</strong></code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist\_test2.png)

<pre><code><strong>Input: head = [1,2], pos = 0
</strong><strong>Output: true
</strong><strong>Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
</strong></code></pre>

**Example 3:**

![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist\_test3.png)

<pre><code><strong>Input: head = [1], pos = -1
</strong><strong>Output: false
</strong><strong>Explanation: There is no cycle in the linked list.
</strong></code></pre>

&#x20;

**Constraints:**

* The number of the nodes in the list is in the range `[0, 10^4]`.
* `-10^5 <= Node.val <= 10^5`
* `pos` is `-1` or a **valid index** in the linked-list.

&#x20;

**Follow up:** Can you solve it using `O(1)` (i.e. constant) memory?



快慢指針，如果有環就會碰上

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

function hasCycle(head: ListNode | null): boolean {
    if(!head) return false
    let slow = head
    let fast = head.next

    while (fast&&fast.next) {
        slow = slow.next
        fast = fast.next.next

        if (slow === fast) {
            return true
        }
    }
    return false

};
```

### 上面的濃縮版

```typescript
function hasCycle(head: ListNode | null): boolean {
    if (!head || !head.next) return false;  // 合併初始判斷

    let slow = head;
    let fast = head.next;

    while (fast !== slow) {  // 直接在條件中進行比較
        if (!fast || !fast.next) return false;  // 在迴圈中做出條件檢查

        slow = slow.next;
        fast = fast.next.next;
    }

    return true;
}
```



```typescript
function hasCycle(head: ListNode | null): boolean {
    if (!head || !head.next) return false;

    let fast = head.next;

    while (head !== fast) {
        if (!fast || !fast.next) return false;

        head = head.next;
        fast = fast.next.next;
    }

    return true;
}
```

### 精簡版

可以在 while條件式裡面順便判斷 head 是否為空，且不用另外宣告 slow，可以直接用 head 來遍歷

```typescript
function hasCycle(head: ListNode | null): boolean {
    let fast = head;
    while (fast != null && fast.next != null && fast.next.next != null) {
        head = head.next;
        fast = fast.next.next;
        if (head == fast) {
            return true;
        }
    }
    return false;
};
```

