# Merge Two Sorted Lists (E)

[21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)



You are given the heads of two sorted linked lists `list1` and `list2`.

Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return _the head of the merged linked list_.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/03/merge\_ex1.jpg)

<pre><code><strong>Input: list1 = [1,2,4], list2 = [1,3,4]
</strong><strong>Output: [1,1,2,3,4,4]
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: list1 = [], list2 = []
</strong><strong>Output: []
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: list1 = [], list2 = [0]
</strong><strong>Output: [0]
</strong></code></pre>

&#x20;

**Constraints:**

* The number of nodes in both lists is in the range `[0, 50]`.
* `-100 <= Node.val <= 100`
* Both `list1` and `list2` are sorted in **non-decreasing** order.



### 迭代

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

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    const dummy = new ListNode(0);  // 建立一個虛擬節點，初始值為0
    let current = dummy;  // 用 current 來跟蹤合併後鏈結串列的最後一個節點

    while (list1 !== null && list2 !== null) {  // 當 list1 和 list2 都不為 null 時進行迴圈
        if (list1.val <= list2.val) {  // 如果 list1 的值小於等於 list2 的值
            current.next = list1;  // 將 list1 的節點連接到 current 的 next
            list1 = list1.next;  // 移動 list1 到下一個節點
        } else {  // 如果 list1 的值大於 list2 的值
            current.next = list2;  // 將 list2 的節點連接到 current 的 next
            list2 = list2.next;  // 移動 list2 到下一個節點
        }
        current = current.next;  // 移動 current 到新連接的節點
    }

    // 如果 list1 仍有剩餘節點，將它們連接到 current 的 next
    if (list1 !== null) {
        current.next = list1;
    } else {  // 如果 list2 仍有剩餘節點，將它們連接到 current 的 next
        current.next = list2;
    }

    return dummy.next;  // 返回虛擬節點的下一個節點，這是合併後的鏈結串列的頭節點
}
```



### 遞迴

```typescript
class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {

    if (!list1) return list2;  // 如果 list1 為空，直接返回 list2
    if (!list2) return list1;  // 如果 list2 為空，直接返回 list1

    if (list1.val < list2.val) {  // 如果 list1 的值小於 list2 的值
        list1.next = mergeTwoLists(list1.next, list2);  // 將 list1 的下一個節點設為合併 list1.next 和 list2 的結果
        return list1;  // 返回 list1 作為合併後的節點
    } else {  // 如果 list2 的值小於等於 list1 的值
        list2.next = mergeTwoLists(list2.next, list1);  // 將 list2 的下一個節點設為合併 list2.next 和 list1 的結果
        return list2;  // 返回 list2 作為合併後的節點
    }

}
```



1. 遞迴 vs 迭代：
   * 遞迴：每次比較當前節點的值，然後遞迴合併剩餘的節點。
   * 迭代：使用一個虛擬節點 (dummy) 來簡化操作，並用一個指針 (current) 來構建新的鏈結串列。
2. 簡潔性：
   * 遞迴方法較為簡潔，代碼量少，容易理解，但需要注意遞迴深度問題。如果鏈結串列長度較大，可能會導致堆疊溢出。
   * 迭代方法相對複雜一些，但沒有遞迴深度限制，更適合長鏈結串列。
3. 性能：
   * 遞迴方法在理論上和迭代方法的時間複雜度都是 O(n)，其中 n 是兩個鏈結串列節點總數。
   * 迭代方法在實際運行中可能更快，因為它避免了遞迴調用的額外開銷。
4. 可讀性：
   * 遞迴方法因其簡潔性，對於理解基本遞迴概念的人來說，可讀性較高。
   * 迭代方法的可讀性也不錯，特別是對於習慣使用迭代的人來說。

小結

* 遞迴方法適合用於鏈結串列較短，且不會導致遞迴深度過深的情況。
* 迭代方法更適合處理長鏈結串列，因為它避免了遞迴深度限制。
* 根據具體需求選擇合適的方法，兩者在邏輯上都是正確且有效的。
