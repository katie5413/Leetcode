# Minimum Time Difference (M)

[539. Minimum Time Difference](https://leetcode.com/problems/minimum-time-difference/)



Given a list of 24-hour clock time points in **"HH:MM"** format, return _the minimum minutes difference between any two time-points in the list_.

&#x20;

**Example 1:**

<pre><code><strong>Input: timePoints = ["23:59","00:00"]
</strong><strong>Output: 1
</strong></code></pre>

**Example 2:**

<pre><code><strong>Input: timePoints = ["00:00","23:59","00:00"]
</strong><strong>Output: 0
</strong></code></pre>

&#x20;

**Constraints:**

* `2 <= timePoints.length <= 2 * 10^4`
* `timePoints[i]` is in the format **"HH:MM"**.



### Set + Sort

```typescript
function findMinDifference(timePoints: string[]): number {
    // 用 set 記錄轉換後的分鐘值，避免重複
    const minuteSet = new Set<number>();

    // 遍歷時間點，將時間轉換為分鐘
    for (let i = 0; i < timePoints.length; i++) {
        const [hours, minutes] = timePoints[i].split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;

        // 如果有重複的分鐘，直接回傳 0
        if (minuteSet.has(totalMinutes)) {
            return 0;
        } else {
            minuteSet.add(totalMinutes);
        }
    }

    // 將分鐘數排序
    const sortedMinutes = Array.from(minuteSet).sort((a, b) => a - b);
    let minDifference = Infinity;

    // 比較相鄰兩個時間點之間的差，找出最小差值
    for (let j = 1; j < sortedMinutes.length; j++) {
        const diff = sortedMinutes[j] - sortedMinutes[j - 1];
        minDifference = Math.min(minDifference, diff);
    }

    // 比較最早和最晚時間點跨午夜的情況
    const firstLastDiff = 1440 - sortedMinutes[sortedMinutes.length - 1] + sortedMinutes[0];
    minDifference = Math.min(minDifference, firstLastDiff);

    return minDifference;
}
```



<figure><img src="../.gitbook/assets/截圖 2024-09-16 晚上10.31.52.png" alt=""><figcaption></figcaption></figure>



### 別人分享的解法

先整理好格式後排序

用第一個值 + 1440 的做法，額外加入一個跨午夜的值來在最後做比較

```typescript
const TWENTY_FOUR_HOURS = 60 * 24; // 一天等於 1440 分鐘

function findMinDifference(timePoints: string[]): number {

    // 將時間點排序，並且將每個時間點轉換為分鐘數
    const parsedTime = timePoints.sort().map(parse);
    parsedTime.push(parsedTime[0] + TWENTY_FOUR_HOURS); // 加入跨午夜的時間（第一個時間點加上一天）

    // 遍歷時間點，找出兩個時間點之間的最小差值
    let min = Infinity;
    for (let leader = 1, follower = 0; leader < parsedTime.length; leader++, follower++) {
        const temp = Math.abs(parsedTime[leader] - parsedTime[follower]); // 計算兩個時間點的差
        min = Math.min(min, temp); // 更新最小差值
    }
    return min; // 回傳最小時間差
}

// 將 "HH:MM" 格式的時間轉換為分鐘數
const parse = (val: string) => {
    const [hour, min] = val.split(':'); // 將時間以 ":" 分隔為小時和分鐘
    return parseInt(hour) * 60 + parseInt(min); // 將小時轉換為分鐘並加上分鐘
}
```
