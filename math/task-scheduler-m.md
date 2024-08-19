# Task Scheduler (M)

[621. Task Scheduler](https://leetcode.com/problems/task-scheduler/)



You are given an array of CPU `tasks`, each represented by letters A to Z, and a cooling time, `n`. Each cycle or interval allows the completion of one task. Tasks can be completed in any order, but there's a constraint: **identical** tasks must be separated by at least `n` intervals due to cooling time.

​Return the _minimum number of intervals_ required to complete all tasks.

&#x20;

**Example 1:**

**Input:** tasks = \["A","A","A","B","B","B"], n = 2

**Output:** 8

**Explanation:** A possible sequence is: A -> B -> idle -> A -> B -> idle -> A -> B.

After completing task A, you must wait two cycles before doing A again. The same applies to task B. In the 3rd interval, neither A nor B can be done, so you idle. By the 4th cycle, you can do A again as 2 intervals have passed.

**Example 2:**

**Input:** tasks = \["A","C","A","B","D","B"], n = 1

**Output:** 6

**Explanation:** A possible sequence is: A -> B -> C -> D -> A -> B.

With a cooling interval of 1, you can repeat a task after just one other task.

**Example 3:**

**Input:** tasks = \["A","A","A", "B","B","B"], n = 3

**Output:** 10

**Explanation:** A possible sequence is: A -> B -> idle -> idle -> A -> B -> idle -> idle -> A -> B.

There are only two types of tasks, A and B, which need to be separated by 3 intervals. This leads to idling twice between repetitions of these tasks.

&#x20;

**Constraints:**

* `1 <= tasks.length <= 10^4`
* `tasks[i]` is an uppercase English letter.
* `0 <= n <= 100`



### Math

排列，最常出現的先排，後面要跟 n 個空格（可填入其他種類的符號）

時間複雜度：O(n)

空間複雜度：O(n)



* 計算初步的最小時間 ans：
  * 每個區塊的時間是 (n + 1)，因為要執行一個最多出現次數的任務，並且在其後插入 n 個冷卻時間。
  * &#x20;(maxFreq - 1) 是去掉最後一個區塊的區塊數（最後一個區塊不需要插入冷卻時間，因此不包含在這個計算內）。
  * 然後，如果有多個任務的出現次數等於 maxFreq，需要額外增加時間來執行這些任務。
* 如果計算得到的 ans 小於總任務數，說明冷卻時間不夠，無法插入冷卻時間，因此直接返回總任務數。

```typescript
function leastInterval(tasks: string[], n: number): number {
    // 建立一個 bucket 物件來儲存每個任務的出現次數
    const bucket: { [key: string]: number } = {}
    // maxFreq 用來記錄目前任務中最高的出現次數
    let maxFreq: number = 0
    // totalCount 用來記錄所有任務的總數
    let totalCount:number =0;

    // 計數每個任務出現的次數
    for (const task of tasks) {
        // 如果該任務已在 bucket 中，則其次數加 1，否則設為 1
        bucket[task] = (bucket[task] || 0) + 1
        // 更新目前最高的任務出現次數
        maxFreq = Math.max(bucket[task], maxFreq);
        // 更新任務總數
        totalCount++;
    }

    // 計算基本的最小時間：
    // (n + 1) 表示每個區塊包含的時間（包括最大頻率的任務和其後的冷卻時間）
    // (maxFreq - 1) 表示去掉最後一個區塊後的區塊數
    let ans: number = (n + 1) * (maxFreq - 1);

    // 如果有多個任務的出現次數等於 maxFreq，需要額外的時間來執行這些任務
    for (let key in bucket) {
        if (bucket[key] === maxFreq) {
            ans++
        }
    }

    // 最後答案應取 `ans` 與 `totalCount` 的最大值
    // 如果冷卻時間夠短，不需產生間隔，那就直接返回總任務數
    return Math.max(ans, totalCount)
};
```
