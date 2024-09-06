# Delete Nodes From Linked List Present in Array (M)

[3217. Delete Nodes From Linked List Present in Array](https://leetcode.com/problems/delete-nodes-from-linked-list-present-in-array/)



You are given an array of integers `nums` and the `head` of a linked list. Return the `head` of the modified linked list after **removing** all nodes from the linked list that have a value that exists in `nums`.

&#x20;

**Example 1:**

**Input:** nums = \[1,2,3], head = \[1,2,3,4,5]

**Output:** \[4,5]

**Explanation:**

![](https://assets.leetcode.com/uploads/2024/06/11/linkedlistexample0.png)

Remove the nodes with values 1, 2, and 3.

**Example 2:**

**Input:** nums = \[1], head = \[1,2,1,2,1,2]

**Output:** \[2,2,2]

**Explanation:**

![](https://assets.leetcode.com/uploads/2024/06/11/linkedlistexample1.png)

Remove the nodes with value 1.

**Example 3:**

**Input:** nums = \[5], head = \[1,2,3,4]

**Output:** \[1,2,3,4]

**Explanation:**

![](https://assets.leetcode.com/uploads/2024/06/11/linkedlistexample2.png)

No node has value 5.

&#x20;

**Constraints:**

* `1 <= nums.length <= 10^5`
* `1 <= nums[i] <= 10^5`
* All elements in `nums` are unique.
* The number of nodes in the given list is in the range `[1, 10^5]`.
* `1 <= Node.val <= 10^5`
* The input is generated such that there is at least one node in the linked list that has a value not present in `nums`.



### Set

```typescript
function modifiedList(nums: number[], head: ListNode | null): ListNode | null {
    const valuesToRemove = new Set(nums);
    let dummy = new ListNode(0, head);
    let current = dummy;

    while (current.next !== null) {
        if (valuesToRemove.has(current.next.val)) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }

    return dummy.next;
}
```
