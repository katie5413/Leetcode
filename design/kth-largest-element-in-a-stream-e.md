# Kth Largest Element in a Stream (E)

[703. Kth Largest Element in a Stream](https://leetcode.com/problems/kth-largest-element-in-a-stream/)



Design a class to find the `kth` largest element in a stream. Note that it is the `kth` largest element in the sorted order, not the `kth` distinct element.

Implement `KthLargest` class:

* `KthLargest(int k, int[] nums)` Initializes the object with the integer `k` and the stream of integers `nums`.
* `int add(int val)` Appends the integer `val` to the stream and returns the element representing the `kth` largest element in the stream.

&#x20;

**Example 1:**

<pre><code><strong>Input
</strong>["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
<strong>Output
</strong>[null, 4, 5, 5, 8, 8]

<strong>Explanation
</strong>KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
kthLargest.add(3);   // return 4
kthLargest.add(5);   // return 5
kthLargest.add(10);  // return 5
kthLargest.add(9);   // return 8
kthLargest.add(4);   // return 8
</code></pre>

&#x20;

**Constraints:**

* `1 <= k <= 10^4`
* `0 <= nums.length <= 10^4`
* `-10^4 <= nums[i] <= 10^4`
* `-10^4 <= val <= 10^4`
* At most `10^4` calls will be made to `add`.
* It is guaranteed that there will be at least `k` elements in the array when you search for the `kth` element.





```typescript
class KthLargest {
    // 儲存最小優先佇列，用來保持流中的前 k 大元素
    private minPriorityQueue: MinPriorityQueue<number>;
    // 儲存 k 的值
    private k: number;

    constructor(k: number, nums: number[]) {
        this.k = k;
        // 初始化最小優先佇列，元素會按照從小到大的順序排列
        this.minPriorityQueue = new MinPriorityQueue<number>((a, b) => a - b);
        
        // 將 nums 陣列中的每個數字添加到優先佇列中
        for (const num of nums) {
            this.minPriorityQueue.enqueue(num);
        }
        
        // 確保優先佇列的大小不超過 k
        while (this.minPriorityQueue.size() > k) {
            this.minPriorityQueue.dequeue(); // 刪除最小的元素
        }
    }

    add(val: number): number {
        // 將新元素添加到優先佇列中
        this.minPriorityQueue.enqueue(val);
        
        // 如果優先佇列的大小超過 k，刪除最小的元素
        if (this.minPriorityQueue.size() > this.k) {
            this.minPriorityQueue.dequeue();
        }
        
        // 返回優先佇列的最小元素，即第 k 大的元素
        return this.minPriorityQueue.front().element;
    }
}

```



```kotlin
class KthLargest {
    minHeap: number[];  // 儲存最小堆積（最小堆）的數字
    k: number;          // 要求的第 k 大數字
    ready: boolean;    // 用來指示是否準備好，這裡沒有使用到

    constructor(k: number, nums: number[]) {
        this.k = k;
        this.minHeap = [];
        // 初始化堆積，將所有數字加入堆積
        for (let x of nums) {
            this.add(x);
        }
    }

    // 從堆積中彈出最小的數字（最小堆的根元素），並調整堆積
    pop(): number {
        // 將堆積的最後一個元素與根元素交換
        [this.minHeap[0], this.minHeap[this.minHeap.length - 1]] = [this.minHeap[this.minHeap.length - 1], this.minHeap[0]];
        // 彈出最小元素（根元素）
        let ret = this.minHeap.pop();
        
        let ci = 0; // 當前索引，從根元素開始
        // 調整堆積以保持最小堆的性質
        while ((ci * 2) + 1 < this.minHeap.length) {
            let li = (ci * 2) + 1; // 左子節點索引
            let ri = (ci * 2) + 2; // 右子節點索引
            // 選擇較小的子節點（如果存在）
            let si = ri < this.minHeap.length && this.minHeap[ri] < this.minHeap[li] ? ri : li;
            // 如果當前節點小於子節點，則不需要交換，退出循環
            if (this.minHeap[ci] < this.minHeap[si]) {
                break;
            }

            // 否則，交換當前節點和較小的子節點
            [this.minHeap[si], this.minHeap[ci]] = [this.minHeap[ci], this.minHeap[si]];
            ci = si; // 更新當前索引為子節點的索引
        }
        return ret; // 返回彈出的最小元素
    }

    // 將新數字加入堆積，並返回當前第 k 大數字
    add(val: number): number {
        // 將新數字添加到堆積中
        this.minHeap.push(val);

        let ci = this.minHeap.length - 1; // 當前索引，從新插入的元素開始
        // 調整堆積以保持最小堆的性質
        while (ci > 0) {
            let pi = Math.ceil(ci / 2) - 1; // 父節點索引
            // 如果父節點小於當前節點，則不需要交換，退出循環
            if (this.minHeap[pi] < this.minHeap[ci]) {
                break;
            }

            // 否則，交換當前節點和父節點
            [this.minHeap[ci], this.minHeap[pi]] = [this.minHeap[pi], this.minHeap[ci]];
            ci = pi; // 更新當前索引為父節點的索引
        }

        // 如果堆積的大小超過了 k，彈出最小的元素（根元素）
        if (this.minHeap.length > this.k) {
            this.pop();
        }

        // 返回當前的第 k 大數字，即堆積的根元素
        return this.minHeap[0];
    }
}

```
