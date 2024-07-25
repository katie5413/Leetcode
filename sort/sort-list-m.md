# Sort List (M)

[148. Sort List](https://leetcode.com/problems/sort-list/)

Related to [sort-colors-m.md](sort-colors-m.md "mention")



Given the `head` of a linked list, return _the list after sorting it in **ascending order**_.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/09/14/sort\_list\_1.jpg)

<pre><code><strong>Input: head = [4,2,1,3]
</strong><strong>Output: [1,2,3,4]
</strong></code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/09/14/sort\_list\_2.jpg)

<pre><code><strong>Input: head = [-1,5,3,4,0]
</strong><strong>Output: [-1,0,3,4,5]
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: head = []
</strong><strong>Output: []
</strong></code></pre>

&#x20;

**Constraints:**

* The number of nodes in the list is in the range `[0, 5 * 104]`.
* `-105 <= Node.val <= 105`

&#x20;

**Follow up:** Can you sort the linked list in `O(n logn)` time and `O(1)` memory (i.e. constant space)?



時間複雜度 O(n \log n)

空間複雜度 O(1) ：使用了合併排序

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

function sortList(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head;

    // 分割鏈表
    const middle = getMiddle(head);
    const left = head;
    const right = middle.next;
    middle.next = null;

    // 遞歸排序
    const sortedLeft = sortList(left);
    const sortedRight = sortList(right);

    // 合併排序好的鏈表
    return merge(sortedLeft, sortedRight);
}

// 獲取鏈表中間節點
function getMiddle(head: ListNode): ListNode {
    let slow = head;
    let fast = head;

    while (fast.next && fast.next.next) {
        slow = slow.next!;
        fast = fast.next.next;
    }

    return slow;
}

// 合併兩個排序好的鏈表
function merge(left: ListNode | null, right: ListNode | null): ListNode | null {
    const dummy = new ListNode(0);
    let current = dummy;

    while (left && right) {
        if (left.val < right.val) {
            current.next = left;
            left = left.next;
        } else {
            current.next = right;
            right = right.next;
        }
        current = current.next;
    }

    // 當左邊或右邊還有剩餘節點
    if (left) current.next = left;
    if (right) current.next = right;

    return dummy.next;
}
```



### 遍歷後存在陣列，排序陣列後，建造新鏈結

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

function sortList(head: ListNode | null): ListNode | null {
    if (!head) return null;
    let current = head;
    const list: number[] = []
    while (current) {
        list.push(current.val);
        current = current.next;
    }
    list.sort((a,b) => a - b);
    let newHead: ListNode = new ListNode(list[0]);
    let currentNode: ListNode = newHead;
    let index = 1;
    while (index < list.length) {
        currentNode.next = new ListNode(list[index]); 
        currentNode = currentNode.next;
        index++;
    }
    return newHead;
};
```
