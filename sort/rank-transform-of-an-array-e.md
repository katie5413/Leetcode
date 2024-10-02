# Rank Transform of an Array (E)

[1331. Rank Transform of an Array](https://leetcode.com/problems/rank-transform-of-an-array/)



Given an array of integers `arr`, replace each element with its rank.

The rank represents how large the element is. The rank has the following rules:

* Rank is an integer starting from 1.
* The larger the element, the larger the rank. If two elements are equal, their rank must be the same.
* Rank should be as small as possible.

&#x20;

**Example 1:**

<pre><code><strong>Input: arr = [40,10,20,30]
</strong><strong>Output: [4,1,2,3]
</strong><strong>Explanation: 40 is the largest element. 10 is the smallest. 20 is the second smallest. 30 is the third smallest.
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: arr = [100,100,100]
</strong><strong>Output: [1,1,1]
</strong><strong>Explanation: Same elements share the same rank.
</strong></code></pre>

**Example 3:**

<pre><code><strong>Input: arr = [37,12,28,9,100,56,80,5,12]
</strong><strong>Output: [5,3,4,2,8,6,7,1,3]
</strong></code></pre>

&#x20;

**Constraints:**

* `0 <= arr.length <= 10^5`
* `-10^9 <= arr[i] <= 10^9`



### 複製，排序後重新對應數字

```typescript
function arrayRankTransform(arr: number[]): number[] {
    const n = arr.length; // 紀錄陣列的長度

    // 建立原始陣列的副本
    const tempArr = [...arr]; // 使用擴展運算子創建一個新的陣列副本

    // 將原始陣列進行排序
    arr.sort((a, b) => a - b); // 將陣列由小到大排序

    // 建立一個 Map 來儲存每個數字的排名
    const map = new Map<number, number>(); // 使用 Map 來記錄每個數字對應的排名
    let index = 1; // 初始化排名索引，從 1 開始
    for (const num of arr) { // 遍歷排序後的陣列
        if (!map.has(num)) { // 如果該數字尚未被分配排名
            map.set(num, index++); // 將數字與當前排名對應，並自增排名索引
        }
    }

    // 將副本陣列中的數字替換為對應的排名
    const result = tempArr.map(num => map.get(num) as number); // 使用 Map 取得每個數字的排名，並生成新的結果陣列
    return result; // 回傳結果陣列
}
```

### 類似的做法

```typescript
function arrayRankTransform(arr: number[]): number[] {
    const set = new Set(arr); // 使用 Set 去除陣列中的重複值
    const arrSort = Array.from(set).sort((a, b) => a - b); // 將 Set 轉換成陣列，並對陣列進行排序
    const map = new Map(); // 建立一個 Map 來儲存每個數字的排名

    // 對排序後的數字分配排名，並儲存在 Map 中
    for (let i = 0; i < arrSort.length; i++) {
        map.set(arrSort[i], i + 1); // 設置數字對應的排名，排名從 1 開始
    }

    // 將原始陣列中的數字替換為對應的排名
    for (let i = 0; i < arr.length; i++) {
        arr[i] = map.get(arr[i]); // 使用 Map 取得原始數字的排名，並替換原始陣列中的數字
    }

    return arr; // 回傳轉換後的陣列
};
```
