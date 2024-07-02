# Rotate List

Given the `head` of a linked list, rotate the list to the right by `k` places.

**Example 1:**

!https://assets.leetcode.com/uploads/2020/11/13/rotate1.jpg

```
Input: head = [1,2,3,4,5], k = 2
Output: [4,5,1,2,3]

```

**Example 2:**

!https://assets.leetcode.com/uploads/2020/11/13/roate2.jpg

```
Input: head = [0,1,2], k = 4
Output: [2,0,1]

```

**Constraints:**

- The number of nodes in the list is in the range `[0, 500]`.
- `100 <= Node.val <= 100`
- `0 <= k <= 2 * 10^9`

## ChatGPT 的回答

- **計算鏈表的長度**：這樣我們就可以知道鏈表中有多少個節點。
- **計算實際需要旋轉的步數**：由於旋轉次數可能超過鏈表的長度，實際旋轉次數可以用 `k % length` 來計算。
- **將鏈表連成環狀**：這樣我們可以輕鬆找到新的頭部。
- **找到新的頭部和尾部**：然後斷開環狀鏈表，形成新的鏈表。

```tsx
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

function rotateRight(head: ListNode | null, k: number): ListNode | null {
    if (!head || !head.next || k === 0) {
        return head;
    }
    
    // 計算鏈表的長度
    let length = 1;
    let current = head;
    while (current.next) {
        current = current.next;
        length++;
    }
    
    // 計算實際需要旋轉的步數
    k = k % length;
    if (k === 0) {
        return head;
    }
    
    // 將鏈表連成環狀
    // 此時 current 是最後一個節點
    current.next = head;
    
    // 找到新的尾部，新尾部是從頭部開始算第 (length - k) 個節點
    let newTail = head;
    for (let i = 0; i < length - k - 1; i++) {
        newTail = newTail.next!;
    }
    
    // 新的頭部是新尾部的下一個節點
    let newHead = newTail.next;
    
    // 斷開環狀鏈表
    newTail.next = null;
    
    return newHead;
}
```

- **初始化檢查**：
    - 如果鏈表為空 (`head` 為 `null`)，或者鏈表只有一個節點 (`head.next` 為 `null`)，或者 `k` 為 0，直接返回頭節點 (`head`)。
- **計算鏈表的長度**：
    - 使用 `current` 指針遍歷鏈表，計算節點數 (`length`)。
- **計算實際需要旋轉的步數**：
    - 由於旋轉次數 `k` 可能大於鏈表長度，使用 `k = k % length` 計算實際需要旋轉的步數。
    - 如果 `k` 為 0，表示旋轉後鏈表不變，直接返回頭節點。
- **將鏈表連成環狀**：
    - 將當前節點的 `next` 指向頭節點，形成環狀鏈表。
- **找到新的尾部和新的頭部**：
    - 新的尾部節點是從頭部開始算第 `(length - k)` 個節點。
    - 新的頭部節點是新尾部節點的下一個節點。
- **斷開環狀鏈表**：
    - 將新尾部節點的 `next` 設置為 `null`，斷開環狀鏈表。