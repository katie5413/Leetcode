# Insert Greatest Common Divisors in Linked List (M)

[2807. Insert Greatest Common Divisors in Linked List](https://leetcode.com/problems/insert-greatest-common-divisors-in-linked-list/)



Given the head of a linked list `head`, in which each node contains an integer value.

Between every pair of adjacent nodes, insert a new node with a value equal to the **greatest common divisor** of them.

Return _the linked list after insertion_.

The **greatest common divisor** of two numbers is the largest positive integer that evenly divides both numbers.

&#x20;

**Example 1:**

![](https://assets.leetcode.com/uploads/2023/07/18/ex1\_copy.png)

<pre><code><strong>Input: head = [18,6,10,3]
</strong><strong>Output: [18,6,6,2,10,1,3]
</strong><strong>Explanation: The 1st diagram denotes the initial linked list and the 2nd diagram denotes the linked list after inserting the new nodes (nodes in blue are the inserted nodes).
</strong>- We insert the greatest common divisor of 18 and 6 = 6 between the 1st and the 2nd nodes.
- We insert the greatest common divisor of 6 and 10 = 2 between the 2nd and the 3rd nodes.
- We insert the greatest common divisor of 10 and 3 = 1 between the 3rd and the 4th nodes.
There are no more adjacent nodes, so we return the linked list.
</code></pre>

**Example 2:**

![](https://assets.leetcode.com/uploads/2023/07/18/ex2\_copy1.png)

<pre><code><strong>Input: head = [7]
</strong><strong>Output: [7]
</strong><strong>Explanation: The 1st diagram denotes the initial linked list and the 2nd diagram denotes the linked list after inserting the new nodes.
</strong>There are no pairs of adjacent nodes, so we return the initial linked list.
</code></pre>

&#x20;

**Constraints:**

* The number of nodes in the list is in the range `[1, 5000]`.
* `1 <= Node.val <= 1000`



### GCD

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

function insertGreatestCommonDivisors(head: ListNode | null): ListNode | null {
    // 先指向原點
    let current: ListNode | null = head
    //  如果有下一個
    while (current.next) {
        // 指向下一個
        const next: ListNode = current.next
        // 產生新結點，值為 目前節點與下一節點的 gcd
        let dummy: ListNode = new ListNode(gcd(current.val, next.val))
        // 定義新節點的下一節點為原先的下一節點
        dummy.next = next
        // 將當前節點的下一節點改成 dummy
        current.next = dummy
        // 往下一節點前進，注意，新產生的要跳過
        current = next
    }

    return head

};

function gcd(a: number, b: number | null): number {
    if (!b) {
        return a;
    }

    return gcd(b, a % b);
}
```

### 原理相同，但更簡潔一點的寫法

```typescript
const gcd = (a: number, b: number) => b === 0 ? a : gcd(b, a % b);

const insertGreatestCommonDivisors = (head: ListNode | null) => {
  const root = head;

  while (head?.next) {
    const divisor = gcd(head.val, head.next.val);
    head.next = new ListNode(divisor, head.next);
    head = head.next.next;
  }

  return root;
};
```



### Recursive

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

function insertGreatestCommonDivisors(head: ListNode | null): ListNode | null {
    // 若鏈結串列為空或只有一個節點，直接返回
    if (!head || !head.next) return head;

    // 插入兩個節點之間的最大公因數 (GCD) 節點
    head.next = { 
        val: euclideanGCD(head.val, head.next.val), // 計算當前節點與下一個節點的 GCD
        next: head.next // 將新的 GCD 節點插入到當前節點和下一個節點之間
    };

    // 遞迴處理鏈結串列的下一個部分
    insertGreatestCommonDivisors(head.next.next);

    // 返回處理過的鏈結串列
    return head;
};

function euclideanGCD(a: number, b: number): number {
    // 使用歐幾里得算法計算兩個數字的最大公因數
    while (b) {
        [a, b] = [b, a % b]; // 交換 a 和 b，並用 a 對 b 取餘數
    }
    return a; // 當 b 為 0 時，a 即為最大公因數
}
```

