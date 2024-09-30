# All O\`one Data Structure (H)

[432. All O\`one Data Structure](https://leetcode.com/problems/all-oone-data-structure/)



Design a data structure to store the strings' count with the ability to return the strings with minimum and maximum counts.

Implement the `AllOne` class:

* `AllOne()` Initializes the object of the data structure.
* `inc(String key)` Increments the count of the string `key` by `1`. If `key` does not exist in the data structure, insert it with count `1`.
* `dec(String key)` Decrements the count of the string `key` by `1`. If the count of `key` is `0` after the decrement, remove it from the data structure. It is guaranteed that `key` exists in the data structure before the decrement.
* `getMaxKey()` Returns one of the keys with the maximal count. If no element exists, return an empty string `""`.
* `getMinKey()` Returns one of the keys with the minimum count. If no element exists, return an empty string `""`.

**Note** that each function must run in `O(1)` average time complexity.

&#x20;

**Example 1:**

<pre><code><strong>Input
</strong>["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey"]
[[], ["hello"], ["hello"], [], [], ["leet"], [], []]
<strong>Output
</strong>[null, null, null, "hello", "hello", null, "hello", "leet"]

<strong>Explanation
</strong>AllOne allOne = new AllOne();
allOne.inc("hello");
allOne.inc("hello");
allOne.getMaxKey(); // return "hello"
allOne.getMinKey(); // return "hello"
allOne.inc("leet");
allOne.getMaxKey(); // return "hello"
allOne.getMinKey(); // return "leet"
</code></pre>

&#x20;

**Constraints:**

* `1 <= key.length <= 10`
* `key` consists of lowercase English letters.
* It is guaranteed that for each call to `dec`, `key` is existing in the data structure.
* At most `5 * 10^4` calls will be made to `inc`, `dec`, `getMaxKey`, and `getMinKey`.



Ref [https://leetcode.com/problems/all-oone-data-structure/solutions/5845755/typescript-approach-o-n-space-o-1-time](https://leetcode.com/problems/all-oone-data-structure/solutions/5845755/typescript-approach-o-n-space-o-1-time)

```typescript
class AllOne {
    private keyCount: Map<string, number>
    private countNodes: Map<number, Node>
    private head: Node
    private tail: Node

    constructor() {
        this.keyCount = new Map()
        this.countNodes = new Map()

        this.head = new Node(0)
        this.tail = new Node(0)
        this.head.next = this.tail
        this.tail.prev = this.head
    }

    private addNodeAfter(prevNode: Node, count: number): Node {
        const newNode = new Node(count)
        newNode.next = prevNode.next
        newNode.prev = prevNode
        prevNode.next!.prev = newNode
        prevNode.next = newNode
        this.countNodes.set(count, newNode)
        return newNode
    }

    private removeNodeIfEmpty(node: Node): void {
        if (node.keys.size === 0) {
            node.prev!.next = node.next
            node.next!.prev = node.prev
            this.countNodes.delete(node.count)
        }
    }

    inc(key: string): void {
        const currentCount = this.keyCount.get(key) || 0
        const newCount = currentCount + 1

        this.keyCount.set(key, newCount)

        let currentNode = this.countNodes.get(currentCount)
        let newNode = this.countNodes.get(newCount)

        if (!newNode) {
            newNode = this.addNodeAfter(currentNode || this.head, newCount)
        }

        newNode.keys.add(key)

        if (currentNode) {
            currentNode.keys.delete(key)
            this.removeNodeIfEmpty(currentNode)
        }
    }

    dec(key: string): void {
        const currentCount = this.keyCount.get(key)

        if (!currentCount) return

        if (currentCount === 1) {
            this.keyCount.delete(key)
        } else {
            this.keyCount.set(key, currentCount - 1)
        }

        const currentNode = this.countNodes.get(currentCount)
        const newCount = currentCount - 1
        let newNode = this.countNodes.get(newCount)

        if (newCount > 0 && !newNode) {
            newNode = this.addNodeAfter(currentNode!.prev!, newCount)
        }

        if (newNode) {
            newNode.keys.add(key)
        }

        currentNode!.keys.delete(key)
        this.removeNodeIfEmpty(currentNode!)
    }

    getMaxKey(): string {
        return this.tail.prev !== this.head ? Array.from(this.tail.prev!.keys)[0] : ""
    }

    getMinKey(): string {
        return this.head.next !== this.tail ? Array.from(this.head.next!.keys)[0] : ""
    }

}

class Node {
    count: number
    keys: Set<string>
    prev: Node | null
    next: Node | null

    constructor(count: number) {
        this.count = count
        this.keys = new Set()
        this.prev = null
        this.next = null
    }
}
```
