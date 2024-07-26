# Reverse Linked List (E)

[206. Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)



Given the `head` of a singly linked list, reverse the list, and return _the reversed list_.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg)

<pre><code><strong>Input: head = [1,2,3,4,5]
</strong><strong>Output: [5,4,3,2,1]
</strong></code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/02/19/rev1ex2.jpg)

<pre><code><strong>Input: head = [1,2]
</strong><strong>Output: [2,1]
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: head = []
</strong><strong>Output: []
</strong></code></pre>

&#x20;

**Constraints:**

* The number of nodes in the list is the range `[0, 5000]`.
* `-5000 <= Node.val <= 5000`

&#x20;

**Follow up:** A linked list can be reversed either iteratively or recursively. Could you implement both?



### 迭代法

一次遍歷整個鏈結串列，並在遍歷的過程中逐個反轉每個節點的 next 指標。

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

function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null; // 先前的節點，初始化為 null
    let curr: ListNode | null = head; // 當前節點，初始化為頭節點

    while (curr !== null) {
        let nextTemp: ListNode | null = curr.next; // 保存當前節點的下一個節點
        curr.next = prev; // 將當前節點的 next 指標指向先前的節點
        prev = curr; // 將先前的節點更新為當前節點
        curr = nextTemp; // 將當前節點更新為下一個節點
    }

    return prev; // 返回反轉後的頭節點
};
```

視覺化

<pre><code>1 -> 2 -> 3 -> 4 -> 5
  ^    ^    ^    ^    ^
 prev curr nextTemp
<strong>
</strong><strong>
</strong><strong>prev = null
</strong>curr = 1 -> 2 -> 3 -> 4 -> 5
---
nextTemp = 2 -> 3 -> 4 -> 5
curr.next = prev (null)
prev = 1 -> null
curr = 2 -> 3 -> 4 -> 5

1 -> null
---
nextTemp = 3 -> 4 -> 5
curr.next = prev (1 -> null)
prev = 2 -> 1 -> null
curr = 3 -> 4 -> 5

2 -> 1 -> null
---
nextTemp = 4 -> 5
curr.next = prev (2 -> 1 -> null)
prev = 3 -> 2 -> 1 -> null
curr = 4 -> 5

3 -> 2 -> 1 -> null
---
nextTemp = 5
curr.next = prev (3 -> 2 -> 1 -> null)
prev = 4 -> 3 -> 2 -> 1 -> null
curr = 5

4 -> 3 -> 2 -> 1 -> null
---
nextTemp = null
curr.next = prev (4 -> 3 -> 2 -> 1 -> null)
prev = 5 -> 4 -> 3 -> 2 -> 1 -> null
curr = null

5 -> 4 -> 3 -> 2 -> 1 -> null
</code></pre>



精簡版

```typescript
function reverseList(head: ListNode | null): ListNode | null {
  let pre: ListNode | null = null;
  while (head) {
    // 先暫存後面的
    const nextNode = head.next;

    // 把之前的串到當前的後面
    head.next = pre;
    // 更新之前的最後一個
    pre = head;
    // 把當前指到後面的，準備往下處理
    head = nextNode;
  }

  return pre;
};
```



### 遞迴法

遞迴地反轉鏈結串列的其餘部分，然後將當前節點設置為反轉後鏈結串列的尾端

• 初始狀態：將每個節點的 next 指標逐步調整，最終形成反轉鏈結串列。

• 反轉鏈結串列的過程是從最後一個節點回推到第一個節點。

```typescript
/**
 * 單向鏈結串列的定義
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function reverseList(head: ListNode | null): ListNode | null {
    if (head === null || head.next === null) {
        return head; // 基本情況：如果鏈結串列為空或只有一個節點，直接返回頭節點
    }

    let p: ListNode | null = reverseList(head.next); // 遞迴地反轉其餘部分的鏈結串列
    head.next.next = head; // 將當前節點的下一個節點的 next 指標指向當前節點
    head.next = null; // 將當前節點的 next 指標設置為 null，成為新的尾端節點

    return p; // 返回反轉後的頭節點
}
```
