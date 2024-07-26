# Palindrome Linked List (E)

[234. Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/)



Given the `head` of a singly linked list, return `true` _if it is a_&#x20;

_palindrome or_ `false` _otherwise_.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/03/03/pal1linked-list.jpg)

<pre><code><strong>Input: head = [1,2,2,1]
</strong><strong>Output: true
</strong></code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/03/03/pal2linked-list.jpg)

<pre><code><strong>Input: head = [1,2]
</strong><strong>Output: false
</strong></code></pre>

&#x20;

**Constraints:**

* The number of nodes in the list is in the range `[1, 10^5]`.
* `0 <= Node.val <= 9`

&#x20;

**Follow up:** Could you do it in `O(n)` time and `O(1)` space?



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

function isPalindrome(head: ListNode | null): boolean {
    if (!head.next) return true
    let slow = head
    let fast = head

    // 找中點
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
    }

    // 此時 slow 在中點，反轉後半段
    let prev: ListNode | null = null;
    while (slow) {
        let temp = slow.next;
        slow.next = prev;
        prev = slow;
        slow = temp;
    }

    // 比較前後兩段
    let left: ListNode | null = head; // 原始的頭
    let right: ListNode | null = prev; // 反轉過的後半段

    while (right) {
        if (left!.val !== right.val) {
            return false;
        }
        left = left!.next;
        right = right.next;
    }

    return true;
};
```
