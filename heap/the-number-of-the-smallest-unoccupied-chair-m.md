# The Number of the Smallest Unoccupied Chair (M)

[1942. The Number of the Smallest Unoccupied Chair](https://leetcode.com/problems/the-number-of-the-smallest-unoccupied-chair/)



There is a party where `n` friends numbered from `0` to `n - 1` are attending. There is an **infinite** number of chairs in this party that are numbered from `0` to `infinity`. When a friend arrives at the party, they sit on the unoccupied chair with the **smallest number**.

* For example, if chairs `0`, `1`, and `5` are occupied when a friend comes, they will sit on chair number `2`.

When a friend leaves the party, their chair becomes unoccupied at the moment they leave. If another friend arrives at that same moment, they can sit in that chair.

You are given a **0-indexed** 2D integer array `times` where `times[i] = [arrival_i, leaving_i]`, indicating the arrival and leaving times of the `i_th` friend respectively, and an integer `targetFriend`. All arrival times are **distinct**.

Return _the **chair number** that the friend numbered_ `targetFriend` _will sit on_.



1. 當朋友到達派對時，他們會選擇編號最小的空椅子坐下。
2. 當朋友離開派對時，他們的椅子會變得空閒。
3. 你的任務是找到編號為 `targetFriend` 的朋友在到達派對時會坐在哪張椅子上。

#### 具體解題過程：

所有朋友的到達時間都是唯一的，也就是說沒有兩個朋友在同一時間到達。你需要返回目標朋友 `targetFriend` 會坐的椅子編號。

題目提供了一個 0-indexed 的 2D 整數陣列 `times`，其中 `times[i] = [arrival_i, leaving_i]`，表示第 `i` 位朋友的到達和離開時間，並給了一個整數 `targetFriend`，表示目標朋友的編號（也就是我們需要找出這位朋友會坐在哪張椅子上）。

當朋友離開派對時，他坐的椅子立即空出。如果有其他朋友在同一時刻到達，他們可以坐在這張剛空出的椅子上。

例如，如果椅子 `0, 1, 5` 已被佔用，當一位新朋友到達時，他會坐在編號為 `2` 的椅子上，因為這是最小的空椅子。

在一個派對上，有 `n` 個朋友參加，他們的編號是從 `0` 到 `n-1`。這個派對有無限多的椅子，椅子按順序編號為 `0, 1, 2,...`。每當一位朋友到達派對時，他會選擇編號最小且尚未被佔用的椅子坐下。

&#x20;



**Example 1:**

<pre><code><strong>Input: times = [[1,4],[2,3],[4,6]], targetFriend = 1
</strong><strong>Output: 1
</strong><strong>Explanation: 
</strong>- Friend 0 arrives at time 1 and sits on chair 0.
- Friend 1 arrives at time 2 and sits on chair 1.
- Friend 1 leaves at time 3 and chair 1 becomes empty.
- Friend 0 leaves at time 4 and chair 0 becomes empty.
- Friend 2 arrives at time 4 and sits on chair 0.
Since friend 1 sat on chair 1, we return 1.
</code></pre>

**Example 2:**

<pre><code><strong>Input: times = [[3,10],[1,5],[2,6]], targetFriend = 0
</strong><strong>Output: 2
</strong><strong>Explanation: 
</strong>- Friend 1 arrives at time 1 and sits on chair 0.
- Friend 2 arrives at time 2 and sits on chair 1.
- Friend 0 arrives at time 3 and sits on chair 2.
- Friend 1 leaves at time 5 and chair 0 becomes empty.
- Friend 2 leaves at time 6 and chair 1 becomes empty.
- Friend 0 leaves at time 10 and chair 2 becomes empty.
Since friend 0 sat on chair 2, we return 2.
</code></pre>

&#x20;

**Constraints:**

* `n == times.length`
* `2 <= n <= 10^4`
* `times[i].length == 2`
* `1 <= arrival_i < leaving_i <= 10^5`
* `0 <= targetFriend <= n - 1`
* Each `arrival_i` time is **distinct**.



Ref.[https://leetcode.com/problems/the-number-of-the-smallest-unoccupied-chair/submissions/1419150797?envType=daily-question\&envId=2024-10-11](https://leetcode.com/problems/the-number-of-the-smallest-unoccupied-chair/submissions/1419150797?envType=daily-question\&envId=2024-10-11)

```typescript
function smallestChair(times: number[][], t: number): number {
    // 初始化 `levTime` 陣列來存儲每張椅子何時變得可用（-1 表示椅子當前空閒）
    const levTime = new Array(times.length).fill(-1);

    // 獲取目標朋友的到達時間（我們需要找到椅子的朋友）
    const tarFrnd = times[t][0];

    // 將 times 陣列按到達時間排序，這有助於按正確順序處理每個朋友的到達
    times.sort((a, b) => a[0] - b[0]);

    // 遍歷每個朋友的到達和離開時間
    for (let [arv, lev] of times) {
        let i = 0;
        // 找到第一個可用的椅子，或是在當前朋友到達時已經釋放的椅子
        while (levTime[i] > arv && levTime[i] !== -1) i++;
        
        // 如果當前朋友的到達時間與目標朋友的到達時間匹配，則返回椅子的索引
        if (arv === tarFrnd) return i;

        // 將此椅子標記為已被佔用，直到當前朋友的離開時間
        levTime[i] = lev;
    }

    // 這個返回值是備用的，理論上函式應該會在迴圈內返回
    return -1;
};

```

<figure><img src="../.gitbook/assets/截圖 2024-10-11 晚上11.47.52.png" alt=""><figcaption></figcaption></figure>



