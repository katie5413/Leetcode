# Design Circular Deque (M)

[641. Design Circular Deque](https://leetcode.com/problems/design-circular-deque/)



Design your implementation of the circular double-ended queue (deque).

Implement the `MyCircularDeque` class:

* `MyCircularDeque(int k)` Initializes the deque with a maximum size of `k`.
* `boolean insertFront()` Adds an item at the front of Deque. Returns `true` if the operation is successful, or `false` otherwise.
* `boolean insertLast()` Adds an item at the rear of Deque. Returns `true` if the operation is successful, or `false` otherwise.
* `boolean deleteFront()` Deletes an item from the front of Deque. Returns `true` if the operation is successful, or `false` otherwise.
* `boolean deleteLast()` Deletes an item from the rear of Deque. Returns `true` if the operation is successful, or `false` otherwise.
* `int getFront()` Returns the front item from the Deque. Returns `-1` if the deque is empty.
* `int getRear()` Returns the last item from Deque. Returns `-1` if the deque is empty.
* `boolean isEmpty()` Returns `true` if the deque is empty, or `false` otherwise.
* `boolean isFull()` Returns `true` if the deque is full, or `false` otherwise.

&#x20;

**Example 1:**

<pre><code><strong>Input
</strong>["MyCircularDeque", "insertLast", "insertLast", "insertFront", "insertFront", "getRear", "isFull", "deleteLast", "insertFront", "getFront"]
[[3], [1], [2], [3], [4], [], [], [], [4], []]
<strong>Output
</strong>[null, true, true, true, false, 2, true, true, true, 4]

<strong>Explanation
</strong>MyCircularDeque myCircularDeque = new MyCircularDeque(3);
myCircularDeque.insertLast(1);  // return True
myCircularDeque.insertLast(2);  // return True
myCircularDeque.insertFront(3); // return True
myCircularDeque.insertFront(4); // return False, the queue is full.
myCircularDeque.getRear();      // return 2
myCircularDeque.isFull();       // return True
myCircularDeque.deleteLast();   // return True
myCircularDeque.insertFront(4); // return True
myCircularDeque.getFront();     // return 4
</code></pre>

&#x20;

**Constraints:**

* `1 <= k <= 1000`
* `0 <= value <= 1000`
* At most `2000` calls will be made to `insertFront`, `insertLast`, `deleteFront`, `deleteLast`, `getFront`, `getRear`, `isEmpty`, `isFull`.



```typescript
class MyCircularDeque {
    private q: number[];
    private size: number;

    constructor(k: number) {
        this.q = [];
        this.size = k;
    }

    insertFront(value: number): boolean {
        if(this.isFull()) {
            return false;
        }

        this.q.unshift(value);
        return true;
    }

    insertLast(value: number): boolean {
        if(this.isFull()) {
            return false;
        }
        this.q.push(value);
        return true;
    }

    deleteFront(): boolean {
        if(this.isEmpty()) {
            return false;
        }
        this.q.shift();
        return true;
    }

    deleteLast(): boolean {
        if(this.isEmpty()) {
            return false;
        }
        this.q.pop();
        return true;
    }

    getFront(): number {
        if(this.isEmpty()) {
            return -1;
        }
        return this.q[0];
    }

    getRear(): number {
        if(this.isEmpty()) {
            return -1;
        }
        return this.q[this.q.length-1];
    }

    isEmpty(): boolean {
        return this.q.length === 0 ? true : false;
    }

    isFull(): boolean {
        return this.q.length === this.size ? true : false;
    }
}

/**
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = new MyCircularDeque(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */
```
