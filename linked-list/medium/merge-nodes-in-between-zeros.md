# Merge Nodes in Between Zeros

You are given the `head` of a linked list, which contains a series of integers **separated** by `0`'s. The **beginning** and **end** of the linked list will have `Node.val == 0`.

For **every** two consecutive `0`'s, **merge** all the nodes lying in between them into a single node whose value is the **sum** of all the merged nodes. The modified list should not contain any `0`'s.

Return *the* `head` *of the modified linked list*.

**Example 1:**

![](https://assets.leetcode.com/uploads/2022/02/02/ex1-1.png)

```
Input: head = [0,3,1,0,4,5,2,0]
Output: [4,11]
Explanation:
The above figure represents the given linked list. The modified list contains
- The sum of the nodes marked in green: 3 + 1 = 4.
- The sum of the nodes marked in red: 4 + 5 + 2 = 11.

```
**Example 2:**

![](https://assets.leetcode.com/uploads/2022/02/02/ex2-1.png)

```
Input: head = [0,1,0,3,0,2,2,0]
Output: [1,3,4]
Explanation:
The above figure represents the given linked list. The modified list contains
- The sum of the nodes marked in green: 1 = 1.
- The sum of the nodes marked in red: 3 = 3.
- The sum of the nodes marked in yellow: 2 + 2 = 4.

```

**Constraints:**

- The number of nodes in the list is in the range `[3, 2 * 10^5]`.
- `0 <= Node.val <= 1000`
- There are **no** two consecutive nodes with `Node.val == 0`.
- The **beginning** and **end** of the linked list have `Node.val == 0`.

## 用一個新的 list 來記錄並回傳

1. 建立虛擬節點 res 並塞暫時的預設值
2. 初始化變數：建立 current 紀錄當前 新節點的位置，以及 sum 來紀錄當前的加總
3. 因為已知第一個必為 0 因此跳過
4. 遍歷節點：如果當前節點值是0，表示已經到達一段的結尾，將累加的值 `sum` 新增為新鏈結串列的一個節點，然後重置 `sum`
5. 回傳 res.next 因為 res 第一個塞了一個暫時的數字

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

function mergeNodes(head: ListNode | null): ListNode | null {

    let res = new ListNode(0)
    let current = res
    let sum = 0

    // past first zero
    head = head!.next;

    while (head !== null) {
        // sum val
        if (head.val !== 0) {
            sum += head.val
        } else {
            // update sum to res
            current.next = new ListNode(sum)
            // current pointed to next
            current = current.next
            // reset sum
            sum = 0
        }
        // go next
        head = head.next

    }

    // get rid of first zero
    return res.next

};
```

## 看到一個更簡潔的解法

定義一個 currNew 指向 head

運用初始為 0 的這個特性，如下一個節點非零累加，遇到零就指到下一個，重複直到沒有下個，並且把最後的 next 指定為 Null，切掉最後的 0

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

function mergeNodes(head: ListNode | null): ListNode | null {
    // 直接跳過第一個
    let currMain = head.next
    // 追蹤最新的鏈結
    let currNew = head
    while(currMain){
		    // 非零累加
        if(currMain.val !== 0){
            currNew.val += currMain.val
        }
        else if(currMain.next){
            // 如果當前節點的值為0且當前節點有下一個節點，這表示一個合併區段的結束，並且新的區段即將開始
            // 將 currNew.next 指向 currMain（即當前的0節點）
            currNew.next = currMain
            // 並將 currNew 移動到 currMain
            currNew = currNew.next
        }else{
            currNew.next = null
        }
        // 往下一個走
        currMain = currMain.next
    }
    return head
};
```

### 變數定義：

1. **`let currMain = head.next, currNew = head`**：
    - `currMain` 指向 `head` 的下一個節點，這是我們用來遍歷鏈結串列的指標。
    - `currNew` 指向 `head`，這是我們用來構建新鏈結串列的指標。

### 主要邏輯：

1. **`while(currMain)`**：
    - 只要 `currMain` 不為 `null`，即鏈結串列尚未遍歷完畢，迴圈就會繼續。
2. **`if(currMain.val !== 0)`**：
    - 如果當前節點的值不為0，將該值累加到 `currNew` 的值中。這一步實現了合併節點的功能。
3. **`else if(currMain.next)`**：
    - 如果當前節點的值為0且當前節點有下一個節點，這表示一個合併區段的結束，並且新的區段即將開始。
    - 將 `currNew.next` 指向 `currMain`（即當前的0節點），並將 `currNew` 移動到 `currMain`。
4. **`else`**：
    - 如果當前節點的值為0且當前節點沒有下一個節點，這表示鏈結串列的結尾。
    - 將 `currNew.next` 設為 `null`，以移除多餘的尾部0節點。
5. **`currMain = currMain.next`**：
    - 將 `currMain` 移動到下一個節點，繼續遍歷鏈結串列。

### 返回值：

1. **`return head`**：
    - 最後，返回修改後的鏈結串列的頭節點。

### 總結：

這段程式碼通過遍歷鏈結串列來合併節點值，並在遇到0節點時開始新的區段。通過這種方式，最終生成的鏈結串列不包含0節點，只有每個區段的累加值。

以下是這段程式碼的執行過程圖示：

假設鏈結串列為：`[0, 3, 1, 0, 4, 5, 2, 0]`：

1. 開始時，`currMain` 指向值為 `3` 的節點，`currNew` 指向頭節點（值為 `0`）。
2. `currMain.val` 不為 `0`，將 `3` 加到 `currNew.val`，即 `currNew.val` 現在為 `3`。
3. `currMain` 移動到下一個節點（值為 `1`）。
4. `currMain.val` 不為 `0`，將 `1` 加到 `currNew.val`，即 `currNew.val` 現在為 `4`。
5. `currMain` 移動到下一個節點（值為 `0`）。
6. `currMain.val` 為 `0`，且 `currMain.next` 存在，將 `currNew.next` 指向 `currMain`，並將 `currNew` 移動到 `currMain`。
7. `currMain` 移動到下一個節點（值為 `4`），並重複上述步驟直到結束。

最終，鏈結串列為 `[4, 11]`。