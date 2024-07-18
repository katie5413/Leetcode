# Design HashMap (E)

[706. Design HashMap](https://leetcode.com/problems/design-hashmap/)



Design a HashMap without using any built-in hash table libraries.

Implement the `MyHashMap` class:

* `MyHashMap()` initializes the object with an empty map.
* `void put(int key, int value)` inserts a `(key, value)` pair into the HashMap. If the `key` already exists in the map, update the corresponding `value`.
* `int get(int key)` returns the `value` to which the specified `key` is mapped, or `-1` if this map contains no mapping for the `key`.
* `void remove(key)` removes the `key` and its corresponding `value` if the map contains the mapping for the `key`.

&#x20;

**Example 1:**

<pre><code><strong>Input
</strong>["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]
[[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]
<strong>Output
</strong>[null, null, null, 1, -1, null, 1, null, -1]

<strong>Explanation
</strong>MyHashMap myHashMap = new MyHashMap();
myHashMap.put(1, 1); // The map is now [[1,1]]
myHashMap.put(2, 2); // The map is now [[1,1], [2,2]]
myHashMap.get(1);    // return 1, The map is now [[1,1], [2,2]]
myHashMap.get(3);    // return -1 (i.e., not found), The map is now [[1,1], [2,2]]
myHashMap.put(2, 1); // The map is now [[1,1], [2,1]] (i.e., update the existing value)
myHashMap.get(2);    // return 1, The map is now [[1,1], [2,1]]
myHashMap.remove(2); // remove the mapping for 2, The map is now [[1,1]]
myHashMap.get(2);    // return -1 (i.e., not found), The map is now [[1,1]]
</code></pre>

&#x20;

**Constraints:**

* `0 <= key, value <= 10^6`
* At most `104` calls will be made to `put`, `get`, and `remove`.



### Linked List

```typescript
class LinkedListNode {
    key: number;               // 鏈表節點的鍵
    value: number;             // 鏈表節點的值
    next: LinkedListNode | null;  // 指向下一個鏈表節點的指針，可以為空

    constructor(key: number, value: number, next: LinkedListNode | null = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

class MyHashMap {
    private buckets: Array<LinkedListNode | null>;  // 哈希表存儲桶，每個桶是一個指向鏈表節點的指針
    private size: number;                          // 哈希表大小，影響哈希函數的運算結果

    constructor() {
        this.size = 1000;                          // 初始化哈希表大小為 1000
        this.buckets = new Array(this.size).fill(null);  // 初始化哈希表，每個桶都為空
    }

    private hash(key: number): number {
        return key % this.size;  // 簡單的餘數哈希函數，計算鍵的哈希碼
    }

    put(key: number, value: number): void {
        const index = this.hash(key);  // 使用哈希函數計算鍵的索引
        if (this.buckets[index] === null) {
            // 如果該索引位置的桶為空，則創建一個新的鏈表節點並插入
            this.buckets[index] = new LinkedListNode(key, value);
        } else {
            // 如果該索引位置已經有節點存在，則遍歷鏈表
            let current = this.buckets[index] as LinkedListNode;
            while (current !== null) {
                if (current.key === key) {
                    // 如果找到相同鍵的節點，則更新其值並返回
                    current.value = value;
                    return;
                }
                if (current.next === null) {
                    // 如果遍歷到鏈表末尾仍未找到相同鍵的節點，則插入新節點
                    current.next = new LinkedListNode(key, value);
                    return;
                }
                current = current.next;
            }
        }
    }

    get(key: number): number {
        const index = this.hash(key);  // 使用哈希函數計算鍵的索引
        let current = this.buckets[index] as LinkedListNode;
        while (current !== null) {
            if (current.key === key) {
                // 如果找到相同鍵的節點，返回其值
                return current.value;
            }
            current = current.next;  // 向下一個節點移動
        }
        return -1;  // 如果找不到相應的鍵，返回 -1
    }

    remove(key: number): void {
        const index = this.hash(key);  // 使用哈希函數計算鍵的索引
        let current = this.buckets[index] as LinkedListNode;
        if (current === null) {
            return;  // 如果該索引位置為空，直接返回
        }
        if (current.key === key) {
            // 如果要移除的節點恰好是鏈表的第一個節點
            this.buckets[index] = current.next;  // 將桶指向下一個節點
            return;
        }
        while (current.next !== null) {
            // 遍歷鏈表，找到要移除的節點並移除
            if (current.next.key === key) {
                current.next = current.next.next;
                return;
            }
            current = current.next;
        }
    }
}

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */
```

<figure><img src="../.gitbook/assets/截圖 2024-07-19 凌晨12.10.58.png" alt=""><figcaption></figcaption></figure>
