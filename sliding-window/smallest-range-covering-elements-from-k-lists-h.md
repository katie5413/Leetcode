# Smallest Range Covering Elements from K Lists (H)

[632. Smallest Range Covering Elements from K Lists](https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/)



You have `k` lists of sorted integers in **non-decreasing order**. Find the smallest range that includes at least one number from each of the `k` lists.

We define the range `[a, b]` is smaller than range `[c, d]` if `b - a < d - c` **or** `a < c` if `b - a == d - c`.

&#x20;

**Example 1:**

<pre><code><strong>Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
</strong><strong>Output: [20,24]
</strong><strong>Explanation: 
</strong>List 1: [4, 10, 15, 24,26], 24 is in range [20,24].
List 2: [0, 9, 12, 20], 20 is in range [20,24].
List 3: [5, 18, 22, 30], 22 is in range [20,24].
</code></pre>

**Example 2:**

<pre><code><strong>Input: nums = [[1,2,3],[1,2,3],[1,2,3]]
</strong><strong>Output: [1,1]
</strong></code></pre>

&#x20;

**Constraints:**

* `nums.length == k`
* `1 <= k <= 3500`
* `1 <= nums[i].length <= 50`
* `-10^5 <= nums[i][j] <= 10^5`
* `nums[i]` is sorted in **non-decreasing** order.

### Sliding Window

Ref. [https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/solutions/5905077/beats-100-working-13-10-2024](https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/solutions/5905077/beats-100-working-13-10-2024)



* **時間複雜度**：`O(n log n)`，其中 `n` 是所有列表中數字的總數。需要將展平後的數組進行排序。
* **空間複雜度**：`O(n)`，用來存儲展平後的數組和其他輔助數據結構。

```typescript
type NumElement = {
    num: number;
    index: number; // 紀錄這個數字來自哪個列表
};

function smallestRange(nums: number[][]): number[] {
    // k 代表有多少個列表
    const k: number = nums.length;
    
    // 用來記錄當前範圍內每個列表的出現次數
    const coverMap: Map<number, number> = new Map();
    
    // 展平 nums 並記錄每個數字來自於哪個列表
    const elements: NumElement[] = nums.reduce((result: NumElement[], list: number[], index: number) => {
        for (const num of list) {
            result.push({ num, index }); // 將數字和它來自的列表索引存入結果
        }
        return result;
    }, []);
    
    // 初始化滑動視窗的變量
    let left: number = 0;  // 左指標
    let coverCount: number = 0;  // 當前範圍內覆蓋了多少個列表
    let minRange: number = Number.MAX_SAFE_INTEGER;  // 初始化最小範圍為一個非常大的數字
    let result: number[] = [];  // 用來存放最小區間的結果
    
    // 將展平的數組按數字大小進行排序
    elements.sort((a, b) => a.num - b.num);
    
    // 遍歷排序後的數組
    for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        const count = coverMap.get(element.index) ?? 0; // 查詢該列表的出現次數
        
        // 如果這是該列表的第一個數字，則覆蓋的列表數量加一
        if (!count) coverCount += 1;
        coverMap.set(element.index, count + 1); // 更新該列表的出現次數
        
        // 當滑動視窗內覆蓋了所有 k 個列表時，嘗試縮小區間範圍
        while (coverCount === k) {
            const leftElement = elements[left]; // 左指標指向的數字
            const range = element.num - leftElement.num; // 計算當前區間的範圍
            const leftCount = coverMap.get(leftElement.index)!; // 查詢左指標數字來自的列表的出現次數
            
            // 如果發現更小的區間，更新最小範圍
            if (range < minRange) {
                minRange = range;
                result = [leftElement.num, element.num]; // 更新最小區間的範圍
            }
            
            // 移動左指標，並更新滑動視窗
            coverMap.set(leftElement.index, leftCount - 1); // 減少左指標數字對應的列表的出現次數
            if (leftCount - 1 === 0) coverCount -= 1; // 如果該列表不再出現在滑動視窗中，覆蓋列表數量減一
            left += 1; // 左指標右移
        }
    }
    
    // 返回找到的最小區間
    return result;
}

```

#### 解題思路：

1. **滑動視窗 (Sliding Window)**：
   * 把這個問題視為在一個已排序的數組上，找一個最小的區間，使得這個區間至少包含每個列表中的一個數字。
   * 每當有一個包含所有列表中數字的區間時，嘗試縮小這個區間，並儘量使其範圍最小。
2. **步驟詳解**：
   * 首先，將每個列表的數字展平，並將每個數字和它所屬的列表的索引一起存儲。
   * 然後將這個展平的數組按照數字大小進行排序。
   * 使用兩個指標 `left` 和 `right` 來表示滑動視窗的左右邊界，然後通過滑動這個視窗來找最小的區間。
3. **主要變量**：
   * `coverMap`：這是一個 `Map`，用來記錄滑動視窗中每個列表的數字出現次數。
   * `coverCount`：當前區間中覆蓋了多少個不同的列表。
   * `minRange`：當前找到的最小區間範圍。
   * `result`：存放最小區間的結果。





### Heap

* **時間複雜度**：`O(n log k)`，其中 `n` 是所有數字的總數，`k` 是列表的數量。每次插入和取出堆的操作都需要 `O(log k)` 的時間。
* **空間複雜度**：`O(k)`，因為最小堆中最多會有 `k` 個元素。

```typescript
function smallestRange(nums: number[][]): number[] {
    // 初始化最小優先佇列，根據數字排序
    const minHeap = new MinPriorityQueue({ priority: (a) => a[0] });
    let rangeStart = 0;
    let rangeEnd = Infinity;
    let maxNumber = -Infinity; // 用來追蹤當前範圍內的最大數字
    
    // 將每個列表的第一個數字加入最小堆
    for (let num of nums) {
        minHeap.enqueue([num[0], 0, num]); // 每個元素為 [數字, 索引, 數字所在的列表]
        maxNumber = Math.max(maxNumber, num[0]); // 更新最大數字
    }
    
    // 當最小堆的大小等於列表數量時，說明當前範圍內涵蓋了所有列表
    while (minHeap.size() == nums.length) {
        // 取出最小數字
        let [num, i, list] = minHeap.dequeue().element;
        
        // 嘗試更新最小範圍
        if (rangeEnd - rangeStart > maxNumber - num) {
            rangeStart = num;
            rangeEnd = maxNumber;
        }
        
        // 如果該列表中還有下一個數字，將其加入最小堆
        if (list.length > i + 1) {
            minHeap.enqueue([list[i + 1], i + 1, list]); // 加入下一個數字
            maxNumber = Math.max(maxNumber, list[i + 1]); // 更新最大數字
        }
    }
    
    // 返回最小範圍
    return [rangeStart, rangeEnd];
}

```



#### 解題思路：

1. 有 `k` 個已排序的數列，目標是找到一個最小的範圍 `[rangeStart, rangeEnd]`，使這個範圍至少包含每個數列中的一個數字。
2. 使用最小堆（Min Heap）來追蹤當前範圍內的最小數字。
3. 在每次的迭代中，選取最小的數字並嘗試更新範圍，同時確保範圍內始終包含來自每個列表的一個數字。

#### 步驟詳解：

1. **初始化變量**：
   * `minHeap`：一個最小優先佇列，用來存儲當前範圍中的最小數字。每個元素是 `[num, i, list]`，分別表示數字、數字在列表中的索引、數字所在的列表。
   * `maxNumber`：用來追蹤當前範圍內的最大數字，這樣可以計算出當前範圍的範圍大小。
   * `rangeStart` 和 `rangeEnd`：用來追蹤最小區間的範圍。
2. **將每個列表的第一個元素放入最小堆**：
   * 將每個列表的第一個數字與它所在列表的信息一起加入 `minHeap`，並同時更新 `maxNumber` 為這些數字中的最大值。
3. **不斷更新範圍**：
   * 每次從 `minHeap` 取出當前最小的數字，並更新當前的範圍。
   * 然後，從該列表中取出下一個數字，並將其加入 `minHeap`，同時更新 `maxNumber`。
   * 當最小堆中的元素個數等於 `k`（也就是每個列表都有一個數字在當前範圍內）時，嘗試縮小範圍。
4. **返回結果**：
   * 最終返回的區間 `[rangeStart, rangeEnd]` 是最小的範圍。
